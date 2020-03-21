import React, { Fragment, useState, useContext } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";

const NuevoProyecto = () => {
  const [proyecto, guardarProyecto] = useState({ nombre: "" });
  const { nombre } = proyecto;

  //obtener el formulario del state principal (en proyectoState.js)
  const proyectosContext = useContext(proyectoContext);
  const {
    formulario,
    errorformulario,
    mostrarFormulario,
    agregarProyecto,
    mostrarError
  } = proyectosContext;

  //Lee el contenido del input y los coloca en el state
  const onChangeProyecto = e => {
    guardarProyecto({
      ...proyecto,
      [e.target.name]: e.target.value
    });
  };
  //Cuando se envia el proyecto
  const onSubmitProyecto = e => {
    e.preventDefault();
    //validar proyecto
    if (nombre === "") {
      mostrarError();
      return;
    }
    //agregar al state
    agregarProyecto(proyecto);
    //reiniciar el form
    guardarProyecto({
      nombre: ""
    });
  };

  const onClickFormulario = () => {
    mostrarFormulario();
  };

  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-block btn-primario"
        onClick={onClickFormulario}
      >
        Nuevo Proyecto
      </button>

      {formulario ? (
        <form className="formulario-nuevo-proyecto" onSubmit={onSubmitProyecto}>
          <input
            type="text"
            name="nombre"
            className="input-text"
            placeholder="Nombre del Proyecto"
            value={nombre}
            onChange={onChangeProyecto}
          />

          <input
            type="submit"
            className="btn btn-primario btn-block"
            value="Agregar Proyecto"
          />
        </form>
      ) : null}

      {errorformulario ? (
        <p className="mensaje error">El nombre del Proyecto es Obligatorio</p>
      ) : null}
    </Fragment>
  );
};

export default NuevoProyecto;
