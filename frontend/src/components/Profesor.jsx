import React, { useEffect, useState } from 'react';
import { getNotas, createNota } from '../api/services';
import { useNavigate } from 'react-router-dom';
import '../css/Profesor.css'; 

const Profesor = () => {
    const [notas, setNotas] = useState([]);
    const [notaData, setNotaData] = useState({ estudianteId: '', materia: '', calificacion: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNotas = async () => {
            try {
                const data = await getNotas();
                setNotas(data);
            } catch (error) {
                console.error('Error al obtener notas:', error);
            }
        };

        fetchNotas();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token'); 
        navigate('/login'); 
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNotaData({ ...notaData, [name]: value });
    };

    const handleAddNota = async (e) => {
        e.preventDefault();
        try {
            await createNota(notaData);
            alert('Nota agregada con éxito');
            setNotaData({ estudianteId: '', materia: '', calificacion: '' }); 
        } catch (error) {
            console.error('Error al agregar nota:', error);
        }
    };

    return (
        
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 className="title">Notas de los Estudiantes</h2>
                <button onClick={handleLogout} className="btn danger">Cerrar Sesión</button>
            </div>
            <ul>
                {notas.map((nota) => (
                    <li key={nota._id}>
                        {nota.materia}: {nota.calificacion}
                    </li>
                ))}
            </ul>

            <h2>Agregar Nota</h2>
            <form onSubmit={handleAddNota}>
                <label>
                    ID del Estudiante:
                    <input type="text" name="estudianteId" value={notaData.estudianteId} onChange={handleChange} required />
                </label>
                <label>
                    Materia:
                    <input type="text" name="materia" value={notaData.materia} onChange={handleChange} required />
                </label>
                <label>
                    Calificación:
                    <input type="number" name="calificacion" value={notaData.calificacion} onChange={handleChange} required />
                </label>
                <button type="submit">Agregar Nota</button>
            </form>
        </div>
        
    );
};

export default Profesor;
