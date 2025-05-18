import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (tipo) => {
    if (tipo === "admin") navigate("/admin");
    else if (tipo === "profesor") navigate("/profesor");
    else if (tipo === "estudiante") navigate("/estudiante");
  };

  return (
    <div className="ContainerPrincipal">
      <div className="ContainerForm">
        <div className="ContainerTitulo">
          <h2 className="Titulo">Iniciar Sesión</h2>
          <p>Ingresa como</p>
        </div>

        <div className="Contenedorbuttons">
          <button className="Button" onClick={() => handleLogin("admin")}>
            Admin
          </button>
          <button className="Button" onClick={() => handleLogin("profesor")}>
            Profesor
          </button>
          <button className="Button" onClick={() => handleLogin("estudiante")}>
            Estudiante
          </button>
        </div>
        <p>¿No has iniciado sesión? Regístrate</p>
      </div>
    </div>
  );
};

export default Login;
