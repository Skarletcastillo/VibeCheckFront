import React, { useState } from "react";
import "./VistaProfesor.css";
import Navbar from "../../Navbar/Navbar";

export default function VistaProfesor() {
  const [records, setRecords] = useState([
    { id: 1, name: "Juan Pérez", date: "2025-05-18", status: "Presente" },
    { id: 2, name: "Ana Gómez", date: "2025-05-18", status: "Ausente" },
  ]);

  const handleChange = (id, newStatus) => {
    setRecords((rs) =>
      rs.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
  };

  return (
    <>
      <Navbar />
      <table className="attendance-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Fecha</th>
            <th>Asistencia</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r) => (
            <tr key={r.id}>
              <td>{r.name}</td>
              <td>{r.date}</td>
              <td>
                <select
                  value={r.status}
                  onChange={(e) => handleChange(r.id, e.target.value)}
                  className="select-status"
                >
                  <option className="selector">Presente</option>
                  <option className="selector">Ausente</option>
                  <option className="selector">Pendiente</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
