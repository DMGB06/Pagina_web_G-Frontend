import axios from "./axios";

//Primero definimos la función para manejar errores
const errorHandler = (error) => {
    console.error("Error en la API de productos:", error.response?.data || error);
    throw error;
};

// Funciones de la API de productos
export const createProduct = (product) => axios.post("/products", product).catch(errorHandler);

export const deleteProduct = (id) => axios.delete(`/products/${id}`).catch(errorHandler);

export const updateProduct = (id, data) => axios.put(`/products/${id}`, data).catch(errorHandler);

export const getProduct = (id) => axios.get(`/products/${id}`).catch(errorHandler);

export const getProducts = () => axios.get(`/products`).catch(errorHandler); 

