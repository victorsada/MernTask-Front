import React, { useContext, useEffect } from "react";
import Proyecto from "./Proyecto";
import proyectoContext from "../../context/proyectos/proyectoContext";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import AlertaContext from "../../context/alertas/alertaContext";

const ListadoProyectos = () => {
  //extraer datos del Alerta Context
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  //extraer datos del state principal (initailState)
  const proyectosContext = useContext(proyectoContext);
  const { mensaje, proyectos, obtenerProyectos } = proyectosContext;

  //Antes de un useEffect NUNCA debe haber un RETURN
  //Obtener proyectos cuando cargue el componte
  useEffect(() => {
    //si hay un error
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }

    obtenerProyectos();
    //eslint-disable-next-line
  }, [mensaje]);

  //validar y revisar que proyectos tenga informacion
  if (proyectos.length === 0)
    return <p>No hay Proyectos, comienza creando uno...</p>;

  return (
    <ul className="listado-proyectos">
      {alerta ? (
        <div className={`alerta ${mensaje.categoria}`}> {mensaje.msg} </div>
      ) : null}

      <TransitionGroup>
        {proyectos.map(proyecto => (
          <CSSTransition key={proyecto._id} timeout={200} classNames="proyecto">
            <Proyecto proyecto={proyecto} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ul>
  );
};

export default ListadoProyectos;
