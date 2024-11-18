import axios from './axios';

// Servicio de registro de usuario
export const registerUser = async (userData) => {
  try {
    const response = await axios.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    throw error;
  }
};

// Servicio de inicio de sesión
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token); // Guardar el token en localStorage
    }
    return response.data;
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    throw error;
  }
};

// Servicio para obtener las notas del usuario autenticado
export const getNotas = async () => {
  try {
    const response = await axios.get('/notas');
    return response.data;
  } catch (error) {
    console.error('Error al obtener notas:', error);
    throw error;
  }
};

// Servicio para crear una nota (solo accesible para profesores)
export const createNota = async (notaData) => {
  try {
    const response = await axios.post('/notas', notaData);
    return response.data;
  } catch (error) {
    console.error('Error al crear nota:', error);
    throw error;
  }
};

// Servicio para editar una nota (solo accesible para directores)
export const updateNota = async (id, notaData) => {
  try {
    const response = await axios.put(`/notas/${id}`, notaData);
    return response.data;
  } catch (error) {
    console.error('Error al editar nota:', error);
    throw error;
  }
};

// Servicio para eliminar una nota (solo accesible para directores)
export const deleteNota = async (id) => {
  try {
    const response = await axios.delete(`/notas/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar nota:', error);
    throw error;
  }
};
