
// src/pages/curso/VistasCurso/AsistenciaContent.jsx
import React, { useState } from 'react';
// No necesitamos importar avatares aquí si usaremos una tabla simple como en la imagen de referencia.

const AsistenciaContent = () => {
    // Estado para la fecha seleccionada
    const [selectedDate, setSelectedDate] = useState('');
    // Estado para los estudiantes y su asistencia
    // Puedes precargar esto con datos reales de tu base de datos si ya los tienes.
    const [students, setStudents] = useState(
        Array.from({ length: 20 }, (_, i) => ({ // Genera 20 estudiantes de ejemplo
            id: i + 1,
            name: `Estudiante ${i + 1}`,
            entry: '', // Hora de entrada
            exit: '',  // Hora de salida
            signature: '', // Campo para la firma (aquí será solo texto)
            status: null // Puedes mantener un estado interno si quieres aplicar lógica de 'presente/ausente/tarde'
        }))
    );

    const handleEntryChange = (id, value) => {
        setStudents(prevStudents =>
            prevStudents.map(student =>
                student.id === id ? { ...student, entry: value } : student
            )
        );
    };

    const handleExitChange = (id, value) => {
        setStudents(prevStudents =>
            prevStudents.map(student =>
                student.id === id ? { ...student, exit: value } : student
            )
        );
    };

    const handleSignatureChange = (id, value) => {
        setStudents(prevStudents =>
            prevStudents.map(student =>
                student.id === id ? { ...student, signature: value } : student
            )
        );
    };

    const handleSaveAttendance = () => {
        console.log('Asistencia guardada:', { date: selectedDate, students });
        alert('¡Asistencia guardada con éxito!');
        // Aquí iría la lógica para enviar los datos al backend
    };

    return (
        <div className="asistencia-planilla-container">
            <h3 className="asistencia-title">Planilla de asistencia</h3>

            <div className="asistencia-header-inputs">
                <div className="input-group">
                    <label htmlFor="class-name">Clase:</label>
                    <input type="text" id="class-name" placeholder="Nombre de la clase" />
                </div>
                <div className="input-group">
                    <label htmlFor="attendance-date">Fecha:</label>
                    {/* El input type="date" automáticamente proporciona un calendario en la mayoría de los navegadores */}
                    <input
                        type="date"
                        id="attendance-date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                    />
                </div>
            </div>

            <div className="asistencia-table-wrapper">
                <table className="asistencia-table">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nombre</th>
                            <th>Entrada</th>
                            <th>Salida</th>
                            <th>Firma</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map(student => (
                            <tr key={student.id}>
                                <td>{student.id}</td>
                                <td className="student-name-cell">{student.name}</td>
                                <td>
                                    <input
                                        type="time" // Usar type="time" para la hora
                                        value={student.entry}
                                        onChange={(e) => handleEntryChange(student.id, e.target.value)}
                                        className="time-input"
                                    />
                                </td>
                                <td>
                                    <input
                                        type="time" // Usar type="time" para la hora
                                        value={student.exit}
                                        onChange={(e) => handleExitChange(student.id, e.target.value)}
                                        className="time-input"
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={student.signature}
                                        onChange={(e) => handleSignatureChange(student.id, e.target.value)}
                                        className="signature-input"
                                        placeholder="Firma"
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <button className="save-attendance-btn" onClick={handleSaveAttendance}>
                Guardar Asistencia
            </button>
        </div>
    );
};

export default AsistenciaContent;