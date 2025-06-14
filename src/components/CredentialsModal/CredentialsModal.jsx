// src/components/CredentialsModal/CredentialsModal.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CredentialsModal.css';

// Importa tus funciones de alertas y tokens desde tu archivo de helpers.
import { alertSuccessful, alertError, alertRedirection, generateTokens } from '../../helpers/funciones';

const API_URL = "https://back-json-server-sabado.onrender.com/usuarios/";

function CredentialsModal({ onClose }) { // No necesitas initialRole aquí, lo leemos de localStorage
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [displayRole, setDisplayRole] = useState(''); // Para mostrar "Iniciar Sesión como X"
    const [userList, setUserList] = useState([]); // Para cargar la lista de usuarios para autenticación
    const [selectedRoleFromLS, setSelectedRoleFromLS] = useState(''); // Estado para el rol seleccionado del localStorage

    useEffect(() => {
        // Leer el rol seleccionado de localStorage al montar el componente
        const role = localStorage.getItem('selectedRole');
        if (role) {
            setSelectedRoleFromLS(role);
            setDisplayRole(role.charAt(0).toUpperCase() + role.slice(1));
        } else {
            // Si no hay rol en localStorage, redirigir o mostrar un error,
            // ya que este modal no debería abrirse sin un rol seleccionado.
            console.error("DEBUG CredentialsModal: No se encontró un rol seleccionado en localStorage.");
            // Opcional: onClose(); navigate('/'); // Cerrar modal y volver a la página principal
        }
        fetchUsers();
    }, []); // Dependencia vacía para que se ejecute solo al montar

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
                console.error("Error al cargar usuarios en CredentialsModal:", err);
                alertError("Error de Conexión", "No se pudieron cargar los usuarios. Intenta de nuevo más tarde.", "error");
            });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // **MODIFICACIÓN CLAVE AQUÍ:** Filtrar por usuario, contraseña Y ROL seleccionado
        const user = userList.find(
            (item) => 
                item.usuario === username && 
                item.password === password && 
                item.rol === selectedRoleFromLS // <--- ¡VERIFICACIÓN DEL ROL AÑADIDA!
        );

        if (user) {
            const token = generateTokens(); // Genera un token de sesión
            localStorage.setItem("token", token);
            localStorage.setItem("usuario", JSON.stringify(user)); // Guarda los datos del usuario en localStorage
            console.log("DEBUG CredentialsModal: Usuario autenticado y guardado en localStorage:", user);

            onClose(); // Cierra este modal DE CREDENCIALES (el pequeño)

            alertRedirection(
                `Bienvenido/a 🎉 ${user.nombre} (${user.rol})`,
                '/curso', // Siempre redirige a /curso
                navigate
            );
        } else {
            // Mensaje de error más específico para ayudar al usuario
            alertError("Error", "Usuario, contraseña o rol incorrectos. Verifica tus credenciales para el rol seleccionado.", "error");
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Iniciar Sesión {displayRole && `como ${displayRole}`}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Usuario"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Acceder</button>
                </form>
                <button onClick={onClose} className="modal-close-button">X</button>
            </div>
        </div>
    );
}

export default CredentialsModal;