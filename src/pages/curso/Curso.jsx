// src/pages/curso/Curso.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Curso.css'; // ¡Asegúrate de que este import esté presente y sea el primero!

// Importaciones de las vistas específicas por rol
// Asegúrate de que las rutas a estos archivos sean correctas.
import VistaAdministrador from '@/pages/curso/VistasCurso/VistaAdminCurso.jsx';
import VistaDocenteCurso from '@/pages/curso/VistasCurso/VistaDocenteCurso.jsx';
import VistaEstudianteCurso from '@/pages/curso/VistasCurso/VistaEstudianteCurso.jsx';


function Curso() {
    const navigate = useNavigate();
    const [userRole, setUserRole] = useState(null);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const storedUser = localStorage.getItem('usuario');
        console.log("DEBUG Curso.jsx: Contenido de localStorage 'usuario':", storedUser);

        if (storedUser) {
            try {
                const user = JSON.parse(storedUser);
                setUserRole(user.rol);
                setUserName(user.nombre);
                console.log("DEBUG Curso.jsx: Rol de usuario detectado:", user.rol);
                console.log("DEBUG Curso.jsx: Nombre de usuario detectado:", user.nombre);
            } catch (e) {
                console.error("DEBUG Curso.jsx: Error al parsear el usuario de localStorage:", e);
                // Si hay un error, limpiar y redirigir
                localStorage.removeItem('usuario');
                localStorage.removeItem('token');
                localStorage.removeItem('selectedRole');
                navigate('/login');
            }
        } else {
            console.log("DEBUG Curso.jsx: No se encontró usuario en localStorage. Redirigiendo a /login.");
            navigate('/login');
        }
    }, [navigate]);

    // Renderizado condicional del contenido del curso
    let contentToRender = null;

    if (userRole === null) {
        contentToRender = <div>Cargando contenido del curso...</div>; // O un spinner
    } else {
        switch (userRole) {
            case 'admin':
                console.log("DEBUG Curso.jsx: Renderizando VistaAdministrador.");
                contentToRender = <VistaAdministrador userName={userName} />;
                break;
            case 'profesor':
                console.log("DEBUG Curso.jsx: Renderizando VistaDocenteCurso.");
                contentToRender = <VistaDocenteCurso userName={userName} />;
                break;
            case 'alumno':
                console.log("DEBUG Curso.jsx: Renderizando VistaEstudianteCurso.");
                contentToRender = <VistaEstudianteCurso userName={userName} />;
                break;
            default:
                console.log("DEBUG Curso.jsx: Rol desconocido:", userRole, ". Redirigiendo a /login.");
                // Limpiar si el rol es desconocido o inválido
                localStorage.removeItem('usuario');
                localStorage.removeItem('token');
                localStorage.removeItem('selectedRole');
                navigate('/login');
                contentToRender = null; // No renderizar nada si el rol es inválido
                break;
        }
    }

    return (
        // AÑADIDO: className="curso-page-container" al div principal
        // Este div contendrá toda la estructura del dashboard (sidebar + contenido principal)
        <div className="curso-page-container">
            {contentToRender}
        </div>
    );
}

export default Curso;