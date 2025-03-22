import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Interfaz from './Interfaz'

document.title = 'Iniciar Sesión';

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Interfaz />
  </StrictMode>,
)
