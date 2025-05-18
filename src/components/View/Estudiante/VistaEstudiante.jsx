import Navbar from "../../Navbar/Navbar";
import "./VistaEstudiante.css";

export default function VistaEstudiante() {
  const records = [
    { id: 1, date: "2025-05-18", subject: "Química", status: "Presente" },
    { id: 2, date: "2025-05-17", subject: "Biología", status: "Ausente" },
  ];

  return (
    <>
      <Navbar />
      <table className="attendance-table">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Materia</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r) => (
            <tr key={r.id}>
              <td>{r.date}</td>
              <td>{r.subject}</td>
              <td>
                <span
                  className={
                    r.status === "Presente"
                      ? "status-present"
                      : r.status === "Ausente"
                      ? "status-absent"
                      : "status-pending"
                  }
                >
                  {r.status === "Presente" ? "Asistió" : "No asistió"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
