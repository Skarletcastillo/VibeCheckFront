// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importa tus componentes de página
import Welcome from './pages/Welcome/Welcome.jsx';
import Curso from './pages/curso/Curso.jsx';
// Importación de tu componente Login.jsx
import Login from './pages/Login/Login.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Rutas de tu aplicación */}
        <Route path="/welcome" element={<Welcome />} />
        {/* Ruta raíz */}
        <Route path="/" element={<Welcome />} /> 

        {/* RUTA CRÍTICA: Ruta explícita para el componente de Login */}
        <Route path="/login" element={<Login />} />

        {/* Ruta para el componente Curso - ¡AÑADIDA Y MODIFICADA! */}
        {/* Esta ruta coincidirá exactamente con /curso */}
        <Route path="/curso" element={<Curso />} /> 
        
        {/* Si en el futuro necesitas rutas con :cursoId o subrutas anidadas dentro de curso, puedes mantener esta, 
            pero la anterior es la que necesitas para /curso directamente. */}
        <Route path="/curso/:cursoId/*" element={<Curso />} />

        {/* Si tienes otras rutas de nivel superior, añádelas aquí */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);