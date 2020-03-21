import React, { useContext } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";

const Proyecto = ({ proyecto }) => {
  //Definimos la variable para usar el Context de Proyecto
  const proyectosContext = useContext(proyectoContext);
  const { proyectoActual } = proyectosContext;

  //Definimos la variable para usar el Context de Tareas
  const tareasContext = useContext(tareaContext);
  const { obtenerTareas } = tareasContext;

  //Funcion para seleccionar el proyecto actual

  const seleccionarProyecto = id => {
    proyectoActual(id); //Fijar el proyecto Actual
    obtenerTareas(id); //Obtener las tareas del proyecto actual
  };

  return (
    <li>
      <button
        type="button"
        className="btn btn-blank"
        onClick={() => seleccionarProyecto(proyecto._id)}
      >
        {proyecto.nombre}
      </button>
    </li>
  );
};

export default Proyecto;
