// src/pages/curso/VistasCurso/VistaEstudianteCurso.jsx
import React from 'react';
import './VistaEstudianteCurso.css';

// Usando alias '@' para la imagen del avatar.
import userAvatar from '@/assets/studentlogo.png'; //

function VistaEstudianteCurso({ userName, onClearSession }) {
  const storedUser = localStorage.getItem("usuario");
  const user = storedUser ? JSON.parse(storedUser) : null;

  if (!user || user.rol.toLowerCase() !== 'alumno') {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Acceso Denegado</h2>
        <p>Esta vista es solo para alumnos.</p>
        <button onClick={onClearSession}>Volver a Inicio</button>
      </div>
    );
  }

  return (
    <div className="vista-estudiante-container">
      <header className="estudiante-header">
        <div className="estudiante-profile">
          <img src={userAvatar} alt="Avatar de Usuario" className="estudiante-avatar" />
          <span className="estudiante-name">{userName || user.nombre || 'Estudiante'}</span>
        </div>
        <h1>Mi Curso</h1>
        <button onClick={onClearSession} className="logout-button">Cerrar Sesión</button>
      </header>
      <main className="estudiante-main">
        <section className="estudiante-clases">
          <h2>Mis Clases Actuales</h2>
          <div className="clase-card">
            <h3>Matemáticas Básicas</h3>
            <p>Profesor: Juan Pérez</p>
            <p>Progreso: 75%</p>
            <button>Ver Detalles</button>
          </div>
          <div className="clase-card">
            <h3>Historia Universal</h3>
            <p>Profesor: María Gómez</p>
            <p>Progreso: 50%</p>
            <button>Ver Detalles</button>
          </div>
        </section>
        <section className="estudiante-tareas">
          <h2>Próximas Tareas</h2>
          <ul>
            <li>Tarea 1: Ecuaciones (Fecha Límite: 15/06/2025)</li>
            <li>Tarea 2: Revolución Francesa (Fecha Límite: 20/06/2025)</li>
          </ul>
        </section>
      </main>
      <footer className="estudiante-footer">
        <p>&copy; 2025 VibeCheck - Plataforma para Alumnos</p>
      </footer>
    </div>
  );
}

export default VistaEstudianteCurso;