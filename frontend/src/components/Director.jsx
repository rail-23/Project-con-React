import React, { useEffect, useState } from 'react';
import { getNotas, updateNota, deleteNota } from '../api/services';
import { useNavigate } from 'react-router-dom';
import '../css/Director.css'; 

const Director = () => {
    const [notas, setNotas] = useState([]);
    const [editData, setEditData] = useState({ id: '', materia: '', calificacion: '' });
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
        localStorage.removeItem('token'); // Elimina el token
        navigate('/login'); // Redirige al login
    };

    const handleEdit = async (e) => {
        e.preventDefault();
        try {
            await updateNota(editData.id, { materia: editData.materia, calificacion: editData.calificacion });
            alert('Nota actualizada con éxito');
        } catch (error) {
            console.error('Error al actualizar nota:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteNota(id);
            alert('Nota eliminada con éxito');
        } catch (error) {
            console.error('Error al eliminar nota:', error);
        }
    };

    return (
        <div className="director-container">
            <div className="header">
                <h2 className="title">Administración de Notas</h2>
                <button onClick={handleLogout} className="btn danger">Cerrar Sesión</button>
            </div>

            <ul>
                {notas.map((nota) => (
                    <li key={nota._id}>
                        {nota.materia}: {nota.calificacion}
                        <button onClick={() => handleDelete(nota._id)}>Eliminar</button>
                    </li>
                ))}
            </ul>

            <h2>Editar Nota</h2>
            <form onSubmit={handleEdit}>
                <label>
                    ID de la Nota:
                    <input type="text" name="id" value={editData.id} onChange={(e) => setEditData({ ...editData, id: e.target.value })} required />
                </label>
                <label>
                    Materia:
                    <input type="text" name="materia" value={editData.materia} onChange={(e) => setEditData({ ...editData, materia: e.target.value })} required />
                </label>
                <label>
                    Calificación:
                    <input type="number" name="calificacion" value={editData.calificacion} onChange={(e) => setEditData({ ...editData, calificacion: e.target.value })} required />
                </label>
                <button type="submit">Actualizar Nota</button>
            </form>
        </div>
    );
};

export default Director;
