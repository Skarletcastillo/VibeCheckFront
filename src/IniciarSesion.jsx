function IniciarSesion() {
  return (
    <div className="IniciarSesion">
      <h2>Iniciar Sesión</h2>
      <form>
        <label className="Label"> E-mail o usuario </label>
        <input className="Input" type="text" placeholder="Correo" />

        <label className="Label"> Contraseña</label>
        <input className="Input" type="password" placeholder="Contraseña" />

        <button className="Button">Iniciar Sesión</button>
      </form>
    </div>
  );
}

export default IniciarSesion