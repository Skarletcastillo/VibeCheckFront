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
import Cursos from "../pages/curso/Curso"; // Tu componente Curso

export const enrutador = [
  {
    path: "/",
    element: <WelcomePage />,
  },
  {
    path: "/login/teacher",
    element: <Login role="teacher" />,
  },
  {
    path: "/login/student",
    element: <Login role="student" />,
  },
  {
    path: "/login/admin",
    element: <Login role="admin" />,
  },
  // CAMBIO CLAVE AQUÍ: Ruta para /curso ahora es de nivel superior
  {
    path: "/curso",
    element: <Cursos />, // Apunta directamente a tu componente Cursos
  },

  {
    path: "/home", // Mantén la ruta /home si la necesitas
    element: <ProtectedRoute proteger={<DashboardLayout />} />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      // Si la ruta /home/curso ya no es necesaria aquí, puedes eliminarla
      // {
      //   path: "curso",
      //   element: <Cursos />,
      // },
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