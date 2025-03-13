import axios from "./axios";

const errorHandler = (error) => {
  console.error("Error en la API de órdenes:", error.response?.data || error);
  throw error;
};

// Crear una orden
export const createOrder = (orderData) =>
  axios.post("/orders", orderData).catch((error) => {
    console.error("Error al crear la orden", error.response?.data || error);
    throw error;
  });

// Obtener TODAS las órdenes (solo admin)
export const getAllOrders = () => axios.get("/orders").catch(errorHandler);

// Obtener SOLO las órdenes del usuario autenticado
export const getUserOrders = () => axios.get("/my-order").catch(errorHandler); 

// Obtener UNA orden por ID
export const getOrderById = (id) => axios.get(`/orders/${id}`).catch(errorHandler);

// Eliminar una orden
export const deleteOrder = (id) => axios.delete(`/orders/${id}`).catch(errorHandler);
