import React, { useEffect, useState } from 'react';
import { getNotas } from '../api/services';
import { useNavigate } from 'react-router-dom';
import '../css/Estudiante.css'; 

const Estudiante = () => {
    const [notas, setNotas] = useState([]);
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

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 className="title">Mis Notas</h2>
                <button onClick={handleLogout} className="btn danger">Cerrar Sesión</button>
            </div>
            <ul>
                {notas.map((nota) => (
                    <li key={nota._id}>
                        {nota.materia}: {nota.calificacion}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Estudiante;
