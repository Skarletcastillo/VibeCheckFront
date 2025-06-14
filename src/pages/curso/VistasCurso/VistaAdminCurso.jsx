// src/pages/curso/VistasCurso/VistaAdminCurso.jsx
import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import axios from 'axios';

// Usando alias '@' para la imagen del avatar.
import adminAvatar from '@/assets/adminlogo.png'; // CORREGIDO: Usando adminlogo.png y alias

import './VistaAdminCurso.css'; // Asegúrate de que tienes este archivo CSS

function VistaAdministrador({ curso }) { //
    const location = useLocation();
    const [nombreUsuario, setNombreUsuario] = useState('Admin'); // Nombre predeterminado
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserName = async () => {
            try {
                setLoading(false);
            } catch (err) {
                setError('Error al cargar el nombre del admin.');
                setLoading(false);
            }
        };
        fetchUserName();
    }, []);

    if (loading) {
        return <div>Cargando vista de administrador...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const getNavLinkClass = (path) => {
        return location.pathname.includes(path) ? 'nav-link-item active' : 'nav-link-item';
    };

    return (
        <div className="admin-dashboard-container">
            <header className="admin-header">
                <div className="admin-profile-section">
                    <img src={adminAvatar} alt="Admin Avatar" className="admin-avatar" />
                    <span className="admin-name">Bienvenido, {nombreUsuario}</span>
                </div>
                <h1 className="admin-course-title">Curso: {curso ? curso.nombre : 'Cargando...'}</h1>
            </header>

            <nav className="admin-nav-bar">
                <NavLink to={`/curso/${curso.id}/estudiantes`} className={getNavLinkClass('/estudiantes')}>
                    Gestión de Estudiantes
                </NavLink>
                <NavLink to={`/curso/${curso.id}/asistencia`} className={getNavLinkClass('/asistencia')}>
                    Control de Asistencia
                </NavLink>
                <NavLink to={`/curso/${curso.id}/configuracion`} className={getNavLinkClass('/configuracion')}>
                    Configuración del Curso
                </NavLink>
            </nav>

            <main className="admin-main-content">
                <Outlet />
            </main>

            <footer className="admin-footer">
                <p>&copy; 2025 VibeCheck Admin Dashboard</p>
            </footer>
        </div>
    );
}

export default VistaAdministrador; 