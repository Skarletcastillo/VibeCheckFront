import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="ContainerImg">
        <img
          src="src\assets\LogoAncho.png"
          alt="Logo app asistencias"
          className="LogoApp"
        />
      </div>

      <div className="ContainerLinks">
        <Link to="/">Cerrar sesión</Link>
        <Link to="/admin">Admin</Link>
        <Link to="/profesor">Profesor</Link>
        <Link to="/estudiante">Estudiante</Link>
      </div>
    </nav>
  );
};

export default Navbar;
