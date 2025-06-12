import "./Curso.css";

const Cursos = () => {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  if (!usuario) return <p>No autorizado</p>;

  // Vista Admin
  if (usuario.rol === "admin") {
    return (
      <div className="ContainerViewAdmin">
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis,
        </p>
      </div>
    );

    // Vista Profesor
  } else if (usuario.rol === "profesor") {
    return (
      <div className="ContainerViewProfesor">
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis,
        </p>
      </div>
    );

    // Vista Alumno
  } else {
    <div className="ContainerViewAlumno">
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis, id!
      </p>
    </div>;
  }
};

export default Cursos;
