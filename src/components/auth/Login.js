import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AlertaContext from "../../context/alertas/alertaContext";
import AuthContext from "../../context/autentiacion/authContext";

const Login = props => {
  //creamos una variable para usar el context de Alerta
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;
  //creamos una variable para usar el context de autenticacion
  const authContext = useContext(AuthContext);
  const { mensaje, autenticado, iniciarSesion } = authContext;

  const [usuario, guardarUsuario] = useState({
    email: "",
    password: ""
  });
  const { email, password } = usuario;

  //en caso de que el password o email sean incorrectos

  useEffect(() => {
    if (autenticado) {
      props.history.push("./proyectos");
    }
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
    //eslint-disable-next-line
  }, [mensaje, autenticado, props.history]);

  const onChange = e => {
    guardarUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    //validar que los campos no esten vacios
    if (email.trim() === "" || password.trim() === "") {
      mostrarAlerta("Todos los campos son obligatorios", "alerta-error");
    }
    //pasarlo al action
    iniciarSesion({ email, password });
  };

  return (
    //
    <div className="form-usuario">
      {alerta ? (
        <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
      ) : null}
      <div className="contenedor-form sombra-dark">
        <h1>Iniciar Sesión</h1>
        <form onSubmit={onSubmit}>
          <div className="campo-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="example@example.com"
              id="email"
              value={email}
              onChange={onChange}
            />
          </div>

          <div className="campo-form">
            <label htmlFor="email">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              id="password"
              value={password}
              onChange={onChange}
            />
          </div>

          <div className="campo-from">
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Iniciar Sesión"
            />
          </div>
        </form>

        <Link to="/nueva-cuenta" className="enlace-cuenta">
          Regístrate
        </Link>
      </div>
    </div>
  );
};

export default Login;
