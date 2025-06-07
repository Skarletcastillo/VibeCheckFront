// src/pages/DashboardPage.jsx
import { Outlet } from "react-router-dom";
import Sidebar from "../components/SideBar/SideBar";

function DashboardPage() {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-content">
        <Outlet /> {/* Aquí se inyecta <Home /> o <Cursos /> */}
      </main>
    </div>
  );
}

export default DashboardPage;
