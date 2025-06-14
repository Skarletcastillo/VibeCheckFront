// src/components/LoginModal/LoginModal.jsx (ESTE ES TU MODAL DE ROLES)
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginModal.css';

// Importa los logos de tus roles - Rutas verificadas
// Como estamos en 'src/components/LoginModal/', '../../assets/' es correcto.
import adminlogo from '../../assets/adminlogo.png';
import studentlogo from '../../assets/studentlogo.png';
import teacherlogo from '../../assets/teacherlogo.png';

function LoginModal({ onClose }) {
    const navigate = useNavigate();

    const handleRoleClick = (role) => {
        // --- ¡¡¡ESTA LÍNEA ES LA CLAVE!!! ---
        localStorage.setItem('selectedRole', role); // Guarda el rol seleccionado en localStorage

        onClose(); // Cierra este modal de roles
        navigate('/login'); // Redirige a /login
        console.log(`DEBUG LoginModal: Rol '${role}' seleccionado y guardado en localStorage. Redirigiendo a /login.`);
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Selecciona tu rol</h2>
                <div className="role-options-grid">
                    <div className="role-option-card" onClick={() => handleRoleClick('admin')}>
                        <img src={adminlogo} alt="Admin" className="role-icon-small" />
                        <h3>Admin</h3>
                    </div>
                    <div className="role-option-card" onClick={() => handleRoleClick('profesor')}>
                        <img src={teacherlogo} alt="Docente" className="role-icon-small" />
                        <h3>Docente</h3>
                    </div>
                    <div className="role-option-card" onClick={() => handleRoleClick('alumno')}>
                        <img src={studentlogo} alt="Estudiante" className="role-icon-small" />
                        <h3>Estudiante</h3>
                    </div>
                </div>
                <button onClick={onClose} className="modal-close-button">X</button>
            </div>
        </div>
    );
}

export default LoginModal;