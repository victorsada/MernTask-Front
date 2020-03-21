import React, { useContext, useState, useEffect } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";

const FormTarea = () => {
  //Creamos la variable para usar el context de Proyecto

  const proyectosContext = useContext(proyectoContext);
  const { proyecto } = proyectosContext;

  //Creamos la variable para usar el context de Tarea
  const tareasContext = useContext(tareaContext);
  const {
    tareaseleccionada,
    errortarea,
    agregarTarea,
    validarTarea,
    obtenerTareas,
    actualizarTarea,
    limpiarTarea
  } = tareasContext;

  //Effect que detecta si hay una tarea seleccionada
  useEffect(() => {
    if (tareaseleccionada !== null) {
      guardarTarea(tareaseleccionada);
    } else {
      guardarTarea({
        nombre: ""
      });
    }
  }, [tareaseleccionada]);

  //State para leer datos del formulario
  const [tarea, guardarTarea] = useState({
    nombre: ""
  });
  //obtenemos el atributo nombre del state tarea
  const { nombre } = tarea;

  //si no hay un proyecto seleccionado
  if (!proyecto) return null;

  const [proyectoActual] = proyecto;

  const onSubmit = e => {
    e.preventDefault();
    //validar
    if (nombre.trim() === "") {
      validarTarea();
      return;
    }

    //Si es Editar tarea o si es agregar nueva tarea
    if (tareaseleccionada === null) {
      //agregar la nueva tarea al state de tarea
      tarea.proyecto = proyectoActual._id;
      agregarTarea(tarea);
    } else {
      //Actualizar tarea existente
      actualizarTarea(tarea);
      //Eliminar Tarea seleccionada
      limpiarTarea();
    }

    //Obtener y filtrar las tareas del proyecto actual
    obtenerTareas(proyectoActual.id);

    //reiniciar el form
    guardarTarea({
      nombre: ""
    });
  };

  const handleChange = e => {
    guardarTarea({
      ...tarea,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="formulario">
      <form onSubmit={onSubmit}>
        <div className="contenedor-input">
          <input
            type="text"
            className="input-text"
            placeholder="Nombre de la Tarea"
            name="nombre"
            value={nombre}
            onChange={handleChange}
          />
        </div>

        <div className="contenedor-input">
          <input
            type="submit"
            className="btn btn-primario btn-block"
            value={tareaseleccionada ? "Editar Tarea" : "Agregar Tarea"}
          />
        </div>
      </form>
      {errortarea ? (
        <p className="mensaje error">Coloque el nombre de la Tarea</p>
      ) : null}
    </div>
  );
};

export default FormTarea;
