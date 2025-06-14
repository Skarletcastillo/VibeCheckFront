import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import happyCharacter from "../../assets/happy-Character.png";
import registerIllustration from "../../assets/register-illustration.png";

import "./Login.css";
import {
  alertSuccessful,
  alertError,
  alertRedirection,
  generateTokens,
} from "../../helpers/funciones.jsx";

const API_URL = "https://back-json-server-sabado.onrender.com/usuarios/";

function Login() {
  const [isLogin, setIsLogin] = useState(true); // Controla si se muestra el formulario de login o registro
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [userList, setUserList] = useState([]);
  const navigate = useNavigate();

  // Carga los usuarios al inicio del componente
  useEffect(() => {
    fetchUsers();
  }, []);

  // Función para obtener la lista de usuarios desde la API
  function fetchUsers() {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setUserList(data))
      .catch((err) => {
        console.error("Error al cargar usuarios:", err);
        alertError("Error de Conexión", "No se pudieron cargar los usuarios. Intenta de nuevo más tarde.", "error");
      });
  }

  // Función para iniciar sesión
  function startSession() {
    const user = userList.find(
      (item) => item.usuario === username && item.password === password
    );

    if (user) {
      const token = generateTokens(); // Genera un token de sesión
      localStorage.setItem("token", token);
      localStorage.setItem("usuario", JSON.stringify(user)); // Guarda los datos del usuario en localStorage

      // *** MODIFICACIÓN CLAVE AQUÍ: Redirección directa a /curso ***
      // El componente Curso.jsx se encargará de determinar la vista del rol
      alertRedirection(
        `Bienvenido/a 🎉 ${user.nombre} (${user.rol})`,
        "/curso", // Siempre redirigir a /curso
        navigate
      );
    } else {
      alertError("Error", "Usuario y/o contraseña incorrectos", "error");
    }
  }

  // Función para registrar un nuevo usuario
  function registerUser() {
    const validRoles = ["admin", "profesor", "alumno"];
    if (!validRoles.includes(role.toLowerCase())) {
      alertError(
        "Error",
        `Rol inválido. Debe ser uno de: ${validRoles.join(", ")}`,
        "error"
      );
      return;
    }

    const exists = userList.find(
      (item) => item.usuario === username || item.correo === email
    );

    if (exists) {
      alertError("Error", "El usuario o correo ya están registrados", "error");
      return;
    }

    const newUser = {
      usuario: username,
      password: password,
      nombre: fullname,
      correo: email,
      rol: role.toLowerCase(),
    };

    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error en el registro del usuario.");
        return res.json();
      })
      .then((registeredUser) => { // 'registeredUser' es la respuesta del servidor con el nuevo usuario
        fetchUsers(); // Vuelve a cargar la lista de usuarios (opcional, para mantener el estado local actualizado)
        
        // *** MODIFICACIÓN CLAVE AQUÍ: Simular login y redirección tras registro exitoso ***
        const token = generateTokens(); // Genera un token para el nuevo usuario
        localStorage.setItem("token", token);
        // Guarda los datos del usuario registrado en localStorage para que Curso.jsx los use
        localStorage.setItem("usuario", JSON.stringify(registeredUser)); 

        alertRedirection(
          `¡Registro exitoso! Bienvenida/o 🎉 ${newUser.nombre} (${newUser.rol})`,
          "/curso", // Siempre redirigir a /curso
          navigate
        );
        // clearForm(); // Puedes mantener esto si quieres limpiar los campos después del registro y la redirección
        // setIsLogin(true); // Puedes mantener esto si quieres regresar al formulario de login DESPUÉS del registro y la redirección
      })
      .catch((err) => {
        console.error(err);
        alertError("Error", "No se pudo registrar el usuario. Intenta de nuevo.", "error");
      });
  }

  // Función para limpiar los campos del formulario
  function clearForm() {
    setFullname("");
    setUsername("");
    setEmail("");
    setPassword(""); // Limpiar la contraseña también
    setRole("");
  }

  // Función para alternar entre el formulario de login y registro
  const handleToggleForm = (isLoginForm) => {
    setIsLogin(isLoginForm);
    clearForm(); // Limpia los campos al cambiar de formulario
  };

  return (
    <div className="login-page-container">
      {/* Sección de la ilustración que cambia según el estado */}
      <div className="login-illustration-section">
        {isLogin ? (
          <img
            src={happyCharacter}
            alt="Personaje feliz, ilustración de bienvenida"
            className="illustration-image"
          />
        ) : (
          <img
            src={registerIllustration}
            alt="Ilustración de registro de usuario"
            className="illustration-image"
          />
        )}
      </div>

      {/* Sección del formulario - Contenedor principal de la tarjeta con volteo */}
      {/* La clase 'is-flipped' se añade cuando isLogin es false (modo registro) */}
      <div className={`login-form-section ${!isLogin ? "is-flipped" : ""}`}>
        {/* Este es el contenedor que contendrá ambas caras y rotará en 3D */}
        <div className="login-card-flipper">
          {/* Cara frontal: Formulario de Iniciar Sesión */}
          <div className="form login-card-front">
            <h2 className="form_details">Iniciar Sesión</h2>

            <div className="form-group">
              <label htmlFor="username-login">Usuario</label>
              <input
                id="username-login" // Añadir ID para accesibilidad
                type="text"
                className="login-input"
                placeholder="Nombre de usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password-login">Contraseña</label>
              <input
                id="password-login" // Añadir ID para accesibilidad
                type="password"
                className="login-input"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="button"
              className="login-btn"
              onClick={startSession}
            >
              Iniciar Sesión
            </button>

            <p className="signup-link">
              ¿No tienes cuenta?{" "}
              <span className="signup_tog" onClick={() => handleToggleForm(false)}>
                Regístrate
              </span>
            </p>
          </div>

          {/* Cara trasera: Formulario de Registro */}
          <div className="form login-card-back">
            <h2 className="form_details">Registrarse</h2>

            <div className="form-group">
              <label htmlFor="fullname-register">Nombre completo</label>
              <input
                id="fullname-register"
                type="text"
                className="login-input"
                placeholder="Nombre completo"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="username-register">Usuario</label>
              <input
                id="username-register"
                type="text"
                className="login-input"
                placeholder="Nombre de usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password-register">Contraseña</label>
              <input
                id="password-register"
                type="password"
                className="login-input"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email-register">Correo electrónico</label>
              <input
                id="email-register"
                type="email"
                className="login-input"
                placeholder="ejemplo@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="rol-register">Rol (admin, profesor, alumno)</label>
              <input
                id="rol-register"
                type="text"
                className="login-input"
                placeholder="admin, profesor o alumno"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              />
            </div>

            <button
              type="button"
              className="login-btn"
              onClick={registerUser}
            >
              Registrarse
            </button>

            <p className="signup-link">
              ¿Ya tienes cuenta?{" "}
              <span className="signup_tog" onClick={() => handleToggleForm(true)}>
                Inicia sesión
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;