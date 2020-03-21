import React, { useReducer } from "react";
import AuthContext from "./authContext";
import AuthReducer from "./authReducer";
import clienteAxios from "../../config/axios";
import tokenAuth from "../../config/token";
import {
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  OBTENER_USUARIO,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  CERRAR_SESION
} from "../../types";

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem("token"), //obtenemos el token del storage y lo guardamos en el state
    autenticado: null,
    usuario: null,
    mensaje: null,
    cargando: true
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  //funciones

  const registrarUsuario = async datos => {
    try {
      const respuesta = await clienteAxios.post("/api/usuarios", datos);

      dispatch({
        type: REGISTRO_EXITOSO,
        payload: respuesta.data //aca esta el token, el cual pasaremos al reducer
      });
      //Obtener el usuario
      usuarioAutenticado();
    } catch (error) {
      const alerta = {
        msg: error.response.data.msg,
        categoria: "alerta-error"
      };

      dispatch({
        type: REGISTRO_ERROR,
        payload: alerta
      });
    }
  };

  //Retorna el usuario autenticado
  const usuarioAutenticado = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      tokenAuth(token);
    }
    try {
      const respuesta = await clienteAxios.get("/api/auth");
      dispatch({
        type: OBTENER_USUARIO,
        payload: respuesta.data.usuario
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: LOGIN_ERROR
      });
    }
  };

  //Cuando el usuario inicia sesion
  const iniciarSesion = async datos => {
    try {
      const respuesta = await clienteAxios.post("/api/auth", datos);

      dispatch({
        type: LOGIN_EXITOSO,
        payload: respuesta.data //aca esta el token, ver authController.js al firmar el token lo obtenemos.
      });
      usuarioAutenticado();
    } catch (error) {
      console.log(error.response.data.msg);
      const alerta = {
        msg: error.response.data.msg,
        categoria: "alerta-error"
      };
      dispatch({
        type: LOGIN_ERROR,
        payload: alerta
      });
    }
  };

  // Cierra la sesión del usuario
  const cerrarSesion = () => {
    dispatch({
      type: CERRAR_SESION
    });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        autenticado: state.autenticado,
        usuario: state.usuario,
        mensaje: state.mensaje,
        cargando: state.cargando,
        registrarUsuario,
        iniciarSesion,
        usuarioAutenticado,
        cerrarSesion
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthState;
