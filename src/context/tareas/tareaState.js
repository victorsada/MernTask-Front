import React, { useReducer } from "react";
import TareaReducer from "./tareaReducer";
import tareaContext from "./tareaContext";
import clienteAxios from "../../config/axios";

import {
  TAREAS_PROYECTOS,
  AGREGAR_TAREA,
  VALIDAR_TAREA,
  ELIMINAR_TAREA,
  TAREA_ACTUAL,
  ACTUALIZAR_TAREA,
  LIMPIAR_TAREA
} from "../../types";

const TareaState = props => {
  const initialState = {
    tareasproyecto: [],
    errortarea: false,
    tareaseleccionada: null
  };

  //Crear Dispatch y State
  const [state, Dispatch] = useReducer(TareaReducer, initialState);

  //Series de funciones para el CRUD

  //Obtener las tareas de un proyecto
  const obtenerTareas = async proyecto => {
    try {
      const respuesta = await clienteAxios.get("/api/tareas", {
        params: { proyecto } //si se hace de esta manera, en el
      }); //controller el request debe ser req.query en lugar de req.body

      Dispatch({
        type: TAREAS_PROYECTOS,
        payload: respuesta.data.tareas
      });
    } catch (error) {
      console.log(error);
    }
  };

  //Agregando las tareas al proyecto seleccionado
  const agregarTarea = async tarea => {
    try {
      const resultado = await clienteAxios.post("/api/tareas", tarea);
      console.log(resultado);
      Dispatch({
        type: AGREGAR_TAREA,
        payload: tarea
      });
    } catch (error) {
      console.log(error);
    }
  };
  //Validando la Tarea y muestra un error en caso que sea necesario
  const validarTarea = () => {
    Dispatch({
      type: VALIDAR_TAREA
    });
  };

  const eliminarTarea = async (id, proyecto) => {
    try {
      await clienteAxios.delete(`api/tareas/${id}`, {
        params: { proyecto: proyecto }
      });
      Dispatch({
        type: ELIMINAR_TAREA,
        payload: id
      });
    } catch (error) {
      console.log(error);
    }
  };

  //Actualizando la tarea (editar)
  const actualizarTarea = async tarea => {
    try {
      const resultado = await clienteAxios.put(
        `/api/tareas/${tarea._id}`,
        tarea //como segundo parametro colocamos el objeto tarea para que lo reescriba
      );

      Dispatch({
        type: ACTUALIZAR_TAREA,
        payload: resultado.data.tarea
      });
    } catch (error) {
      console.log(error);
    }
  };

  //Extrae una tarea para edicion
  const guardarTareaActual = tarea => {
    Dispatch({
      type: TAREA_ACTUAL,
      payload: tarea
    });
  };

  //Elimina la tarea seleccionada
  const limpiarTarea = () => {
    Dispatch({
      type: LIMPIAR_TAREA
    });
  };

  return (
    <tareaContext.Provider
      value={{
        tareasproyecto: state.tareasproyecto,
        errortarea: state.errortarea,
        tareaseleccionada: state.tareaseleccionada,
        obtenerTareas,
        agregarTarea,
        validarTarea,
        eliminarTarea,
        guardarTareaActual,
        actualizarTarea,
        limpiarTarea
      }}
    >
      {props.children}
    </tareaContext.Provider>
  );
};

export default TareaState;
