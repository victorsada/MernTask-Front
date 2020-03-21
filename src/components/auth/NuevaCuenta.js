import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import alertaContext from "../../context/alertas/alertaContext";
import AuthContext from "../../context/autentiacion/authContext";
const NuevaCuenta = props => {
  //creamos la variable para usar el context de alerta y obtenemos sus valores con destructuring
  const alertasContext = useContext(alertaContext);
  const { alerta, mostrarAlerta } = alertasContext;

  //creamos la variable para usar el context de Autenticacion y obtenemos sus valores con destructuring
  const authContext = useContext(AuthContext);
  const { mensaje, autenticado, registrarUsuario } = authContext;

  //en caso de que el usuario se haya registrado o haya colocado un usuario ya existente
  useEffect(() => {
    if (autenticado) {
      props.history.push("/proyectos"); //de react-router-dom.. redirije a otro enlace
    }

    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
    //eslint-disable-next-line
  }, [autenticado, mensaje, props.history]);

  const [usuario, guardarUsuario] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmar: ""
  });
  const { nombre, email, password, confirmar } = usuario;

  const onChange = e => {
    guardarUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    //validar que los campos no esten vacios
    if (
      nombre.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      confirmar.trim() === ""
    ) {
      //si nos fijamos en alertaState.js, la funcion mostrarAlerta tiene dos parametros: msg, categoria:
      mostrarAlerta("Todos los campos son obligatorios", "alerta-error");
      return;
    }
    //password minimode 6 caracteres validacion
    if (password.length < 6) {
      mostrarAlerta(
        "El password debe ser de al menos 6 digitos",
        "alerta-error"
      );
      return;
    }
    //validar que los dos password sean igual
    if (password !== confirmar) {
      mostrarAlerta("Las contraseñas deben ser iguales", "alerta-error");
      return;
    }
    //pasarlo al action
    registrarUsuario({ nombre, email, password });
  };

  return (
    //
    <div className="form-usuario">
      {alerta ? (
        <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div>
      ) : null}
      <div className="contenedor-form sombra-dark">
        <h1>Crea una Cuenta</h1>

        <div className="campo-form">
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            id="nombre"
            value={nombre}
            onChange={onChange}
          />
        </div>

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

          <div className="campo-form">
            <label htmlFor="confirmar">Confirmar Password</label>
            <input
              type="password"
              name="confirmar"
              placeholder="Coloca nuevamente tu contraseña"
              id="confirmar"
              value={confirmar}
              onChange={onChange}
            />
          </div>

          <div className="campo-from">
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Registrar"
            />
          </div>
        </form>

        <Link to="/" className="enlace-cuenta">
          Iniciar Sesión
        </Link>
      </div>
    </div>
  );
};

export default NuevaCuenta;
