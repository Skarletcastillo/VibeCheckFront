import "./SideBar.css";
import { Link } from "react-router-dom";

function SideBar() {
  return (
    <div className="SideBarContainer">
      <div className="SeccionTop">
        {/* aca van las modificaciones dependiente el perfil  */}
        <img
          className="ImgPerfil"
          src="{fotoPerfil}"
          alt="Imagen perfil usuario"
        />
        <p className="InformacionUsuario">{NombreUsuario}</p>
      </div>
      <hr />

      <div className="SeccionMid">
        <img src="#" alt="IconoCasa" />
        <Link to="/home">Home</Link>
        <img src="#" alt="IconoCursos" />
        <Link to="/Cusos">Cursos</Link>
      </div>

      <hr />

      <div className="SeccionBott">
        <img src="" alt="IconoSalir" />
        <Link to="/NavPages">Salir</Link>
        <img src="" alt="IconoModo" />
        <p>Modo</p>
      </div>
    </div>
  );
}

export default SideBar;
