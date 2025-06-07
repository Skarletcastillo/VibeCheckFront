import Sidebar from "../../components/SideBar/SideBar"; // Ajusta la ruta si hiciera falta
// import "./Home.css"; // Opcional, para tus estilos de layout

const Home = () => {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  return (
    <div className="dashboard-layout">
      {/* El Sidebar con tu nav de Cursos, Home, etc */}
      <Sidebar />

      {/* Aquí tu contenido principal */}
      <main className="dashboard-content">
        <h1>
          Bienvenido/a {usuario?.nombre || "Invitado"} - Rol:{" "}
          {usuario?.rol || "Alumno"}
        </h1>
        <p>
          {usuario?.rol === "admin" && "Admin: Aquí tienes el control total."}
          {usuario?.rol === "profesor" && "Aquí están tus cursos para enseñar."}
          {usuario?.rol === "alumno" && "Aquí están tus cursos para aprender."}
        </p>
      </main>
    </div>
  );
};

export default Home;
