// src/routes/enrutador.jsx
import { Navigate } from "react-router-dom";

// Páginas públicas
import WelcomePage from "../pages/Welcome/Welcome";
import Login from "../pages/Login/Login";

// Dashboard protegido
import ProtectedRoute from "../components/ProtectedRoute";
import DashboardLayout from "../components/DashboardPage"; // Layout con Sidebar

// Contenido interno del dashboard
import Home from "../pages/Home/Home"; // Muestra mensaje según rol
import Cursos from "../pages/curso/Curso";

export const enrutador = [
  {
    path: "/",
    element: <WelcomePage />,
  },
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/home",
    element: <ProtectedRoute proteger={<DashboardLayout />} />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "curso",
        element: <Cursos />,
      },
      {
        path: "*",
        element: <Navigate to="/home" replace />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
];
