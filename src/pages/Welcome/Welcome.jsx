// src/pages/Welcome.jsx
import { Link } from "react-router-dom";
import charactersImage from "../../assets/characters.png";
import "./Welcome.css"; // si tienes estilos

function Welcome() {
  return (
    <div className="welcome-container">
      <header className="header">
        <img
          src="/src/assets/vibecheck-logo.png"
          alt="VibeCheck Logo"
          className="logo"
        />
      </header>

      <main className="main-content">
        <div className="text-section">
          <p id="text">
            ¡Bienvenido al sistema de control de asistencia
            <h2>VibeCheck!</h2>
          </p>
          <p>
            Tu plataforma centralizada para la gestión eficiente del tiempo y la
            asistencia.
          </p>
          <div className="buttons-section">
            <Link to="/login" className="btn primary">
              Iniciar Sesión
            </Link>
          </div>
        </div>
        <div className="image-section">
          <img
            src={charactersImage}
            alt="Personajes de VibeCheck"
            className="characters-illustration"
          />
        </div>
      </main>

      <footer className="footer">
        <p>2025 Todos los derechos reservados</p>
      </footer>
    </div>
  );
}

export default Welcome;
