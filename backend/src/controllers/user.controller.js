import User from '../models/User';
import Role from '../models/Role';
import bcrypt from 'bcryptjs';

export const crearUsuario = async (req, res) => {
    const { nombre, email, password, roles } = req.body;

    if (!nombre || !email || !password) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: 'El usuario ya existe' });
    }

    try {
        // Buscar roles proporcionados
        const newUser = new User({
            nombre,
            email,
            password: await User.encryptPassword(password),
            roles: roles || ["estudiante"]
        });

        // Guardar usuario
        await newUser.save();
        res.status(201).json({ message: 'Usuario creado con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el usuario', error });
    }
};
