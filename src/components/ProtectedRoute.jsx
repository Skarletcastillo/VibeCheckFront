import { alertError, alertRedirection } from "../helpers/funciones";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  if (!usuario) {
    alertError("Acceso denegado", "Debes iniciar sesión para acceder");
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(usuario.rol)) {
    alertRedirection("Acceso denegado", "/home", navigate);
    return null;
  }

  return <Outlet />;
};

export default ProtectedRoute;
