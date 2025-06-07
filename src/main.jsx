// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, useRoutes } from "react-router-dom";
import { enrutador } from "./routes/enrutador";

function AppRouter() {
  // Aquí es donde React lee tu enrutador y monta las rutas
  return useRoutes(enrutador);
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  </React.StrictMode>
);
