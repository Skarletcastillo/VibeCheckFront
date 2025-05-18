import { Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import VistaAdmin from "./components/View/Admin/VistaAdmin";
import VistaEstudiante from "./components/View/Estudiante/VistaEstudiante";
import VistaProfesor from "./components/View/Profesor/VistaProfesor";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/admin" element={<VistaAdmin />} />
      <Route path="/profesor" element={<VistaProfesor />} />
      <Route path="/estudiante" element={<VistaEstudiante />} />
    </Routes>
  );
};

export default App;
