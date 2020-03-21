import {
  FORMULARIO_PROYECTO,
  OBTENER_PROYECTOS,
  AGREGAR_PROYECTO,
  VALIDAR_FORMULARIO,
  PROYECTO_ACTUAL,
  ELIMINAR_PROYECTO,
  PROYECTO_ERROR
} from "../../types";

//en los case se hace primero una copia del state, y luego me pregunto, ¿En que modificara el state la accion?

export default (state, action) => {
  switch (action.type) {
    case FORMULARIO_PROYECTO:
      return {
        ...state,
        formulario: true
      };

    case OBTENER_PROYECTOS:
      return {
        ...state,
        proyectos: action.payload
      };

    case AGREGAR_PROYECTO:
      return {
        ...state, //el initialState
        proyectos: [...state.proyectos, action.payload], //la variable proyecto que esta en el initialState
        formulario: false,
        errorformulario: false
      };

    case VALIDAR_FORMULARIO:
      return {
        ...state,
        errorformulario: true
      };

    case PROYECTO_ACTUAL:
      return {
        ...state,
        proyecto: state.proyectos.filter(
          proyecto => proyecto._id === action.payload
        )
      };

    case ELIMINAR_PROYECTO:
      return {
        ...state,
        proyectos: state.proyectos.filter(
          proyecto => proyecto._id !== action.payload
        ),
        proyecto: null
      };

    case PROYECTO_ERROR:
      return {
        ...state,
        mensaje: action.payload
      };

    default:
      return state;
  }
};
