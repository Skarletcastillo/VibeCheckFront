// src/pages/Welcome/Welcome.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// Usando alias '@' porque es más robusto y tu vite.config.js lo soporta.
import LoginModal from '@/components/LoginModal/LoginModal.jsx'; //
import CredentialsModal from '@/components/CredentialsModal/CredentialsModal.jsx';

// IMPORTS DE IMÁGENES - ¡Usando alias '@' y nombres correctos!
import adminlogo from '@/assets/adminlogo.png'; //
import vibecheckLogo from '@/assets/vibecheck-logo.png'; // CORREGIDO: Nombre de archivo a 'vibecheck-logo.png'
import studentlogo from '@/assets/studentlogo.png'; //
import teacherlogo from '@/assets/teacherlogo.png'; //
import rightCharacterImage from '@/assets/happy-Character.png'; //

import './Welcome.css';

function Welcome() {
  const navigate = useNavigate();
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isCredentialsModalOpen, setCredentialsModalOpen] = useState(false);
  const [selectedRoleForCredentials, setSelectedRoleForCredentials] = useState('');

  const openLoginModal = () => {
    setLoginModalOpen(true);
    console.log("DEBUG Welcome: Abriendo TU LoginModal (el de roles) desde navbar.");
  };
  const closeLoginModal = () => setLoginModalOpen(false);

  const openCredentialsModal = (role = '') => {
    setSelectedRoleForCredentials(role);
    setCredentialsModalOpen(true);
    console.log(`DEBUG Welcome: Abriendo TU CredentialsModal (modal de usuario/contraseña). Rol: ${role}`);
  };
  const closeCredentialsModal = () => {
    setCredentialsModalOpen(false);
    setSelectedRoleForCredentials('');
  };

  const handleRoleCardClick = (role) => {
    openCredentialsModal(role);
    console.log(`DEBUG Welcome: Clic en tarjeta de rol para ${role}. Abriendo directamente TU CredentialsModal.`);
  };

  return (
    <div className="welcome-container-final">
      {/* Navbar */}
      <nav className="welcome-navbar">
        <div className="navbar-logo-container">
          <img src={vibecheckLogo} alt="VibeCheck Logo" className="navbar-logo" />
          <span className="navbar-app-name">VibeCheck</span>
        </div>
        <div className="navbar-auth-buttons">
          <button className="navbar-btn navbar-btn-login" onClick={openLoginModal}>
            Iniciar sesión
          </button>
        </div>
      </nav>

      {/* Contenido principal */}
      <main className="welcome-main-content-final">
        <section className="hero-section-vibecheck">
          <div className="hero-text-container">
            <h1 className="hero-title-vibecheck">
              Bienvenido al sistema de <br /> control  de asistencia <br /> <span style={{ color: '#e7343d' }}>VibeCheck</span>
            </h1>
            <p className="hero-subtitle">
              Donde cada asistencia ¡cuenta!
            </p>
            <p className="hero-subtitle-vibecheck">
              Simplifica la asistencia hoy mismo
            </p>
          </div>
          <div className="hero-image-container">
            <img src={rightCharacterImage} alt="Character Image" className="hero-character-img" />
          </div>
        </section>

        <section className="roles-section">
          <h2 className="titulo">Empieza como...</h2>
          <div className="roles-grid">
            <div className="role-card" onClick={() => handleRoleCardClick('profesor')}>
              <div className="role-icon-circle" style={{ backgroundColor: '#ffda79' }}>
                <img src={teacherlogo} alt="Icono Docente" className="role-icon" />
              </div>
              <h3 className="role-title">Docente</h3>
              <span className="role-arrow">&rarr;</span>
            </div>

            <div className="role-card" onClick={() => handleRoleCardClick('alumno')}>
              <div className="role-icon-circle" style={{ backgroundColor: '#bada55' }}>
                <img src={studentlogo} alt="Icono Estudiante" className="role-icon" />
              </div>
              <h3 className="role-title">Estudiante</h3>
              <span className="role-arrow">&rarr;</span>
            </div>

            <div className="role-card" onClick={() => handleRoleCardClick('admin')}>
              <div className="role-icon-circle" style={{ backgroundColor: '#d1a8e5' }}>
                <img src={adminlogo} alt="Icono Director" className="role-icon" />
              </div>
              <h3 className="role-title">Admin</h3>
              <span className="role-arrow">&rarr;</span>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="welcome-footer-vibecheck">
        <p className="welcome-copyright-vibecheck">&copy; 2025 VibeCheck. Todos los derechos reservados.</p>
      </footer>

      {/* Renderiza TU LoginModal (el de roles) */}
      {isLoginModalOpen && (
        <LoginModal
          onClose={closeLoginModal}
        />
      )}

      {/* Renderiza TU CredentialsModal (el de usuario/contraseña que se abre desde las tarjetas) */}
      {isCredentialsModalOpen && (
        <CredentialsModal
          onClose={closeCredentialsModal}
          initialRole={selectedRoleForCredentials}
        />
      )}
    </div>
  );
}

export default Welcome;