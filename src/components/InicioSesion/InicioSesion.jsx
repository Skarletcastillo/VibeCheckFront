import { Link } from "react-router-dom";

import "./InicioSesion.css";

function IniciarSesion() {
  return (
    <div className="ContainerForm">
      <h2>Iniciar Sesión</h2>

      <form className="Form">
        <label for="usuario" className="Label">
          {" "}
          E-mail o usuario{" "}
        </label>
        <input
          id="usuario"
          className="Input"
          type="text"
          placeholder="Correo"
        />

        <label for="Contraseña" className="Label">
          {" "}
          Contraseña
        </label>
        <input
          id="Contraseña"
          className="Input"
          type="password"
          placeholder="Contraseña"
        />
      </form>

      <section>
        {/* <Link to={/}  className="Button">Iniciar Sesión</Link> */}
        {/* MIentras pruebo lo de la validacion xd */}
        {/* <button className="Button">Iniciar Sesión</button> */}
        <p className="PieTexto">
          ¿No has iniciado sesión?{" "}
          <a className="PieTextoUrl" href="#">
            Regístrate
          </a>{" "}
        </p>
      </section>
    </div>
  );
}

export default IniciarSesion;
