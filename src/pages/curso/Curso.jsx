const Cursos = () => {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  if (!usuario) return <p>No autorizado</p>;

  if (usuario.rol === "admin") {
    return <p>Vista de cursos para administrador</p>;
  } else if (usuario.rol === "profesor") {
    return <p>Vista de cursos para profesor</p>;
  } else {
    return <p>Vista de cursos para alumno</p>;
  }
};

export default Cursos;
