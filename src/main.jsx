import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Interfaz from "./Views/Interfaz";

document.title = "Iniciar Sesión";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Interfaz />
  </StrictMode>
);
