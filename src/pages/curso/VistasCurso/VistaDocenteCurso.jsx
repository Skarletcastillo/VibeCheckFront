// src/pages/curso/VistasCurso/VistaDocenteCurso.jsx
import React, { useState } from 'react';
import './VistaDocenteCurso.css';
import AsistenciaContent from './AsistenciaContent'; // Importa el componente de asistencia

// Importa las imágenes locales (asegúrate de que las rutas sean correctas en tu proyecto)
import teacherLogo from '../../../assets/teacherlogo.png';
import studentAvatarDefault from '../../../assets/student-avatar-default.png';


function VistaDocenteCurso() {
  // Estado para controlar qué pestaña está activa en el encabezado principal (Aula, Historia, Chats, etc.)
  const [activeHeaderTab, setActiveHeaderTab] = useState('aula');

  // Estado para controlar qué sub-pestaña está activa dentro de 'Aula' (Alumnos/Grupos)
  const [activeAulaSubTab, setActiveAulaSubTab] = useState('alumnos');

  // Estado para controlar qué herramienta del footer está activa
  // Inicialmente, no hay ninguna herramienta activa a menos que la configures.
  // Si queremos que Asistencia se muestre por defecto al cargar la página, lo inicializaríamos con 'asistencia'.
  const [activeFooterTool, setActiveFooterTool] = useState(null);

  // Función para manejar el clic en las pestañas del encabezado
  const handleHeaderTabClick = (tabName) => {
    setActiveHeaderTab(tabName);
    setActiveFooterTool(null); // Desactiva cualquier herramienta del footer al cambiar de pestaña superior
  };

  // Función para manejar el clic en las herramientas del footer
  const handleFooterToolClick = (toolName) => {
    setActiveFooterTool(toolName);
    setActiveHeaderTab(null); // Desactiva cualquier pestaña del header al activar una herramienta del footer
    // Esto asegura que solo se vea la Asistencia cuando se le da clic.
  };


  return (
    <div className="docente-dashboard-container">
      {/* Sidebar */}
      <aside className="docente-sidebar">
        <div className="sidebar-profile">
          <img src={teacherLogo} alt="Perfil Docente" className="profile-avatar" />
          <h3 className="profile-name">IE FÉLIX HENAO BOTERO</h3>
          <p className="profile-role">1.profesores(as)</p>
          <i className="fas fa-chevron-down dropdown-arrow"></i>
        </div>

        <nav className="sidebar-nav">
          <ul>
            <li><a href="#" className="nav-item">
              <i className="nav-icon fas fa-chart-line"></i>Historia
            </a></li>
            <li><a href="#" className="nav-item">
              <i className="nav-icon fas fa-calendar-alt"></i>Calendario
            </a></li>
            <li><a href="#" className="nav-item">
              <i className="nav-icon fas fa-comment-dots"></i>Chats
            </a></li>
            <li><a href="#" className="nav-item active-class">
              <i className="nav-icon fas fa-star"></i>Puntos
              <span className="novedad-tag">NOVEDAD</span>
            </a></li>
            <li><a href="#" className="nav-item">
              <i className="nav-icon fas fa-sitemap"></i>Directorio
            </a></li>
            <li><a href="#" className="nav-item">
              <i className="nav-icon fas fa-search"></i>Perspectivas
            </a></li>
          </ul>

          <h4 className="nav-section-title">TUS CLASES</h4>
          <ul>
            <li><a href="#" className="nav-item">
              <i className="nav-icon fas fa-school"></i>Todas las clases
            </a></li>
          </ul>
        </nav>

        <button className="new-class-btn">
          + Nueva Clase
        </button>

        <footer className="sidebar-footer">
          <button className="logout-button">Cerrar Sesión</button>
          <p>&copy; 2024 VibeCheck</p>
        </footer>
      </aside>

      {/* Contenido Principal del Dashboard */}
      <main className="docente-main-content">
        <header className="main-header">
          <h1 className="class-name">
            {activeFooterTool === 'asistencia' ? 'Asistencia' : 'Aula'}
          </h1> {/* Título principal dinámico */}
          <nav className="header-nav">
            <a
              href="#"
              className={`header-nav-item ${activeHeaderTab === 'aula' ? 'active' : ''}`}
              onClick={() => handleHeaderTabClick('aula')}
            >
              Aula
            </a>
            <a
              href="#"
              className={`header-nav-item ${activeHeaderTab === 'historia' ? 'active' : ''}`}
              onClick={() => handleHeaderTabClick('historia')}
            >
              Historia de la clase
            </a>
            <a
              href="#"
              className={`header-nav-item ${activeHeaderTab === 'chats' ? 'active' : ''}`}
              onClick={() => handleHeaderTabClick('chats')}
            >
              Chats
            </a>
            <a
              href="#"
              className={`header-nav-item ${activeHeaderTab === 'calendario' ? 'active' : ''}`}
              onClick={() => handleHeaderTabClick('calendario')}
            >
              Calendario
            </a>
            <a
              href="#"
              className={`header-nav-item ${activeHeaderTab === 'familias' ? 'active' : ''}`}
              onClick={() => handleHeaderTabClick('familias')}
            >
              Familias
            </a>
          </nav>
          <div className="header-right-icons">
            <span className="family-connection-status">0% Conexiones familiares</span>
            <div className="options-dropdown-container">
              <button className="options-btn">
                Opciones <i className="fas fa-chevron-down"></i>
              </button>
              {/* Menú desplegable de opciones (oculto por defecto, se mostraría con JS/estado) */}
            </div>
          </div>
        </header>

        {/* Contenido principal que cambia según la pestaña del header o la herramienta del footer activa */}
        {activeFooterTool === 'asistencia' ? (
          <AsistenciaContent />
        ) : (
          <>
            {activeHeaderTab === 'aula' && (
              <section className="class-overview-section">
                <h2>Contenido del Aula</h2>
                <p>Aquí verás la vista principal de tu clase, alumnos y grupos.</p>
                <div className="tab-navigation">
                  <button
                    className={`tab-button ${activeAulaSubTab === 'alumnos' ? 'active' : ''}`}
                    onClick={() => setActiveAulaSubTab('alumnos')}
                  >
                    Alumnos
                  </button>
                  <button
                    className={`tab-button ${activeAulaSubTab === 'grupos' ? 'active' : ''}`}
                    onClick={() => setActiveAulaSubTab('grupos')}
                  >
                    Grupos
                  </button>
                </div>

                {activeAulaSubTab === 'alumnos' && (
                  <div className="students-grid">
                    <div className="student-card all-class-card">
                      <img src={teacherLogo} alt="Toda la clase" />
                      <span>Toda la clase</span>
                    </div>
                    <div className="student-card add-student-card">
                      <span className="add-icon">+</span>
                      <span>Añadir alumnos</span>
                    </div>
                    {/* Aquí podrías mapear tus estudiantes reales */}
                  </div>
                )}

                {activeAulaSubTab === 'grupos' && (
                  <div className="groups-content">
                    <p>Contenido de la sección de Grupos...</p>
                  </div>
                )}

                <div className="create-class-action">
                  <p>¡Crea una nueva clase y comienza a usar VibeCheck!</p>
                  <button className="create-class-btn">Crear Nueva Clase</button>
                </div>
              </section>
            )}

            {activeHeaderTab === 'historia' && (
              <section className="class-overview-section">
                <h2>Historia de la Clase</h2>
                <p>Aquí se mostrará el historial de actividades y eventos de la clase.</p>
              </section>
            )}

            {activeHeaderTab === 'chats' && (
              <section className="class-overview-section">
                <h2>Chats</h2>
                <p>Aquí verás tus conversaciones con estudiantes y familias.</p>
              </section>
            )}

            {activeHeaderTab === 'calendario' && (
              <section className="class-overview-section">
                <h2>Calendario</h2>
                <p>Visualiza y gestiona los eventos de tu clase.</p>
              </section>
            )}

            {activeHeaderTab === 'familias' && (
              <section className="class-overview-section">
                <h2>Conexiones con Familias</h2>
                <p>Administra las conexiones y comunicaciones con los padres y tutores.</p>
              </section>
            )}
            {/* Aquí irían los otros componentes de contenido si tienes */}
            {/* {activeFooterTool === 'kit-herramientas' && <KitHerramientasContent />} */}
            {/* etc. */}
          </>
        )}


        {/* Este es el footer de herramientas inferior, siempre visible */}
        <footer className="bottom-tools-footer">
          <a
            href="#"
            className={`tool-item ${activeFooterTool === 'kit-herramientas' ? 'active' : ''}`}
            onClick={() => handleFooterToolClick('kit-herramientas')}
          >
            <i className="footer-icon fas fa-chalkboard"></i>Kit de herramientas
          </a>
          <a
            href="#"
            className={`tool-item ${activeFooterTool === 'asistencia' ? 'active' : ''}`}
            onClick={() => handleFooterToolClick('asistencia')}
          >
            <i className="footer-icon fas fa-clipboard-check"></i>Asistencia
          </a>
          <a
            href="#"
            className={`tool-item ${activeFooterTool === 'seleccionar-varios' ? 'active' : ''}`}
            onClick={() => handleFooterToolClick('seleccionar-varios')}
          >
            <i className="footer-icon fas fa-users-cog"></i>Seleccionar varios
          </a>
          <a
            href="#"
            className={`tool-item ${activeFooterTool === 'aleatorio' ? 'active' : ''}`}
            onClick={() => handleFooterToolClick('aleatorio')}
          >
            <i className="footer-icon fas fa-random"></i>Aleatorio
          </a>
          <a
            href="#"
            className={`tool-item ${activeFooterTool === 'temporizador' ? 'active' : ''}`}
            onClick={() => handleFooterToolClick('temporizador')}
          >
            <i className="footer-icon fas fa-hourglass-half"></i>Temporizador
          </a>
          <a
            href="#"
            className={`tool-item ${activeFooterTool === 'portafolios' ? 'active' : ''}`}
            onClick={() => handleFooterToolClick('portafolios')}
          >
            <i className="footer-icon fas fa-folder-open"></i>Portafolios
          </a>
          <a
            href="#"
            className={`tool-item ${activeFooterTool === 'big-ideas' ? 'active' : ''}`}
            onClick={() => handleFooterToolClick('big-ideas')}
          >
            <i className="footer-icon fas fa-lightbulb"></i>Big Ideas
          </a>
        </footer>
      </main>
    </div>
  );
}

export default VistaDocenteCurso;