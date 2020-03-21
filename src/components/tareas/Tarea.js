import React, { useContext } from "react";
import tareaContext from "../../context/tareas/tareaContext";
import proyectoContext from "../../context/proyectos/proyectoContext";

const Tarea = ({ tarea }) => {
  const proyectosContext = useContext(proyectoContext);
  const { proyecto } = proyectosContext;

  const tareasContext = useContext(tareaContext);
  const {
    eliminarTarea,
    obtenerTareas,
    actualizarTarea,
    guardarTareaActual
  } = tareasContext;

  //Extraer el proyecto actual
  const [proyectoActual] = proyecto;

  //funcion para eliminar tarea

  const tareaEliminar = id => {
    eliminarTarea(id, proyectoActual._id);
    obtenerTareas(proyectoActual._id);
  };

  //funcion que modifica el estado de las tareas

  const cambiarEstado = tarea => {
    if (tarea.estado === true) {
      tarea.estado = false;
    } else {
      tarea.estado = true;
    }

    actualizarTarea(tarea);
  };
  //Agrega la tarea actual cuando el usuario clickea editar
  const seleccionarTarea = tarea => {
    guardarTareaActual(tarea);
  };

  return (
    //
    <li className="tarea sombra">
      <p> {tarea.nombre} </p>
      <div className="estado">
        {tarea.estado ? (
          <button
            type="button"
            className="completo"
            onClick={() => cambiarEstado(tarea)} //Tiene que ser un arrow function para poderle pasar un parametro
          >
            Completo
          </button>
        ) : (
          <button
            type="button"
            className="incompleto"
            onClick={() => cambiarEstado(tarea)} // Tiene que ser un arrow function para poderle pasar un parametro
          >
            Incompleto
          </button>
        )}
      </div>

      <div className="acciones">
        <button
          type="button"
          className="btn btn-primario"
          onClick={() => seleccionarTarea(tarea)}
        >
          Editar
        </button>

        <button
          type="button"
          className="btn btn-secundario"
          onClick={() => tareaEliminar(tarea._id)}
        >
          Eliminar
        </button>
      </div>
    </li>
  );
};

export default Tarea;
