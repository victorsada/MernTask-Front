import clienteAxios from "./axios";
//se usara en el authState.js para pasarle el token que hay en localStorage, y aca lo pasamos en el header
const tokenAuth = token => {
  //en caso de que haya un token, lo pasaremos en el header, y lo vamos a enviar
  if (token) {
    clienteAxios.defaults.headers.common["x-auth-token"] = token;
  } //en caso contrario, lo eliminaremos del objeto cliente exios
  else {
    delete clienteAxios.defaults.headers.common["x-auth-token"];
  }
};

export default tokenAuth;
