import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import happyCharacter from "../../assets/happy-Character.png";

import "./Login.css";
import {
  alertSuccessful,
  alertError,
  alertRedirection,
  generateTokens,
} from "../../helpers/funciones";

const API_URL = "https://back-json-server-sabado.onrender.com/usuarios/";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [userList, setUserList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  function fetchUsers() {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setUserList(data))
      .catch((err) => console.error("Error loading users:", err));
  }

  function startSession() {
    const user = userList.find(
      (item) => item.usuario === username && item.password === password
    );

    if (user) {
      const token = generateTokens();
      localStorage.setItem("token", token);
      localStorage.setItem("usuario", JSON.stringify(user));

      let ruta = "/home";
      if (user.rol === "admin") ruta = "/home/admin";
      else if (user.rol === "profesor") ruta = "/home/profesor";
      else if (user.rol === "alumno") ruta = "/home/alumno";

      alertRedirection(
        `Bienvenido/a 🎉 ${user.nombre} (${user.rol})`,
        ruta,
        navigate
      );
    } else {
      alertError("Error", "Usuario y/o contraseña incorrectos", "error");
    }
  }

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
        if (!res.ok) throw new Error("Registro fallido");
        return res.json();
      })
      .then(() => {
        fetchUsers();
        alertSuccessful("Éxito", "Usuario registrado exitosamente 🎉");
        clearForm();
        setIsLogin(true); // 👈 Volver al login
      })
      .catch((err) => {
        console.error(err);
        alertError("Error", "No se pudo registrar el usuario", "error");
      });
  }

  function clearForm() {
    setFullname("");
    setUsername("");
    setPassword("");
    setEmail("");
    setRole("");
  }

  return (
    <div className="login-page-container">
      <div className="login-illustration-section">
        <img
          src={happyCharacter}
          alt="Happy character illustration"
          className="happy-character"
        />
      </div>

      <div className="login-form-section">
        <form className="form" onSubmit={(e) => e.preventDefault()}>
          {isLogin ? (
            <div className="form_front">
              <h2 className="form_details">Iniciar Sesión</h2>

              <div className="form-group">
                <label htmlFor="username">Usuario</label>
                <input
                  type="text"
                  className="login-input"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <input
                  type="password"
                  className="login-input"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                <span className="signup_tog" onClick={() => setIsLogin(false)}>
                  Regístrate
                </span>
              </p>
            </div>
          ) : (
            <div className="form_back">
              <h2 className="form_details">Registrarse</h2>

              <div className="form-group">
                <label htmlFor="fullname">Nombre completo</label>
                <input
                  type="text"
                  className="login-input"
                  placeholder="Full Name"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="username">Usuario</label>
                <input
                  type="text"
                  className="login-input"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <input
                  type="password"
                  className="login-input"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Correo electrónico</label>
                <input
                  type="email"
                  className="login-input"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="rol">Rol (admin, profesor, alumno)</label>
                <input
                  type="text"
                  className="login-input"
                  placeholder="Role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
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
                <span className="signup_tog" onClick={() => setIsLogin(true)}>
                  Inicia sesión
                </span>
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
