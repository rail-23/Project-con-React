import Nota from '../models/Nota';

// Obtener notas - Estudiantes solo ven sus notas, profesores ven todas
export const verNotas = async (req, res) => {
    try {
        if (req.roles.includes("profesor")) {
            // Los profesores ven todas las notas
            const notas = await Nota.find().populate('estudiante', 'nombre email');
            return res.status(200).json(notas);
        } else if (req.roles.includes("estudiante")) {
            // Los estudiantes solo ven sus propias notas
            const notas = await Nota.find({ estudiante: req.userId });
            return res.status(200).json(notas);
        }
        return res.status(403).json({ message: "Acceso denegado" });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener notas', error });
    }
};

// Agregar nota - Solo profesores pueden agregar
export const agregarNota = async (req, res) => {
    const { estudianteId, materia, calificacion } = req.body;

    try {
        const newNota = new Nota({ estudiante: estudianteId, materia, calificacion });
        await newNota.save();
        res.status(201).json({ message: 'Nota registrada con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar nota', error });
    }
};

// Editar nota - Solo el director puede editar
export const editarNota = async (req, res) => {
    const { id } = req.params;
    const { materia, calificacion } = req.body;

    try {
        const notaActualizada = await Nota.findByIdAndUpdate(id, { materia, calificacion }, { new: true });
        res.status(200).json(notaActualizada);
    } catch (error) {
        res.status(500).json({ message: 'Error al editar la nota', error });
    }
};

// Eliminar nota - Solo el director puede eliminar
export const eliminarNota = async (req, res) => {
    const { id } = req.params;

    try {
        await Nota.findByIdAndDelete(id);
        res.status(200).json({ message: 'Nota eliminada con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la nota', error });
    }
};
