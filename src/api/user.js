import axios from "./axios";

// Obtener un usuario por ID
export const getUser = (id) => axios.get(`/users/${id}`).catch(errorHandler);

// Obtener todos los usuarios
export const getUsers = () => axios.get("/users").catch(errorHandler);

// Eliminar un usuario
export const deleteUser = (id) => axios.delete(`/users/${id}`).catch(errorHandler);

// Crear un usuario
export const createUser = (user) => axios.post(`/users`, user).catch(errorHandler);

// Actualizar un usuario
export const updateUser = (id, data) => axios.put(`/users/${id}`, data).catch(errorHandler);

//Manejo de errores
const errorHandler = (error) => {
  console.error("Error en la API de Usuarios:", error.response?.data || error);
  throw error;
};
