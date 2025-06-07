import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import userIcon from "../../assets/user-icon.png";
import homeIcon from "../../assets/home-icon.png";
import coursesIcon from "../../assets/courses-icon.png";
import checkIcon from "../../assets/check-icon.png";
import "./Sidebar.css";

function Sidebar() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const userName = usuario?.nombre || "Usuario";
  const navigate = useNavigate();
  const location = useLocation();

  const [theme, setTheme] = useState("light");
  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  const handleLogout = () => {
    localStorage.clear();
    alert("Has cerrado sesión (simulado).");
    navigate("/");
  };

  return (
    <aside className={`sidebar ${theme}`}>
      <div className="sidebar-profile">
        <img src={userIcon} alt="User Avatar" className="profile-avatar" />
        <p className="profile-role">{userName}</p>
      </div>

      <nav className="sidebar-nav">
        <Link
          to="/home"
          className={`nav-item ${
            location.pathname === "/home" ? "active" : ""
          }`}
        >
          <img src={homeIcon} alt="Home Icon" className="nav-icon" />
          Home
        </Link>
        <Link
          to="/home/curso"
          className={`nav-item ${
            location.pathname === "/home/curso" ? "active" : ""
          }`}
        >
          <img src={coursesIcon} alt="Courses Icon" className="nav-icon" />
          Cursos
        </Link>
      </nav>

      <div className="sidebar-bottom">
        <div className="mode-toggle">
          <span>{theme === "light" ? "Light Mode" : "Dark Mode"}</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={theme === "dark"}
              onChange={toggleTheme}
            />
            <span className="slider round" />
          </label>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          <img src={checkIcon} alt="Logout Icon" className="logout-icon" />{" "}
          Salir
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
