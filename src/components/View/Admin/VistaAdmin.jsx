import Navbar from "../../Navbar/Navbar";
import "./VistaAdmin.css";

export default function VistaAdmin() {
  return (
    <>
      <Navbar />
      <div className="admin-container">
        <h2>Panel Administrador</h2>
        <p>Aquí gestionas usuarios y tareas.</p>
      </div>
    </>
  );
}
