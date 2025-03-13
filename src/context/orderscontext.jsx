import { createContext, useContext, useState, useEffect } from "react";

// Importamos las funciones de la API que ya tienes
import { 
  createOrder,
  getAllOrders, 
  getUserOrders, 
  getOrderById, 
  deleteOrder 
} from "../api/order";
import { useAuth } from "./contextoAutenticacion";
// Creamos el contexto
const OrderContext = createContext();

// Hook para consumir el contexto
export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return context;
};

// Provider para envolver la app o componentes
export const OrderProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Función para crear una orden
// Función para crear una orden
const createOrderContext = async (orderData) => {
    try {
      setLoading(true);
      const res = await createOrder(orderData);
      setOrders((prevOrders) => [...prevOrders, res.data.order]);
      return res.data;
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Error al crear la orden";
      setError(errorMsg);
  
      // 🔥 Lanza el error para que se capture en el componente que lo llama
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  };
  


  const getAllOrdersContext = async () => {
    if (!isAuthenticated || user?.role !== "admin") {
      setError("Acceso denegado. Solo admins.");
      return;
    }

    try {
      setLoading(true);
      const res = await getAllOrders();
      setOrders(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Error al obtener órdenes");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  // Obtener las órdenes del usuario autenticado
  const getUserOrdersContext = async () => {
    try {
      setLoading(true);
      const res = await getUserOrders();
      setOrders(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Error al obtener tus órdenes");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Obtener una orden por ID
  const getOrderByIdContext = async (id) => {
    try {
      setLoading(true);
      const res = await getOrderById(id); // 🚀 Esta es tu llamada API
      setOrder(res.data);                // Guardas en el estado
      return res.data;                   // ✅ RETORNA la data al componente que lo pide
    } catch (err) {
      setError(err.response?.data?.message || "Error al obtener la orden");
      console.error(err);
      throw err; // Opcional si quieres manejar el error en el componente
    } finally {
      setLoading(false);
    }
  };
  

  // Eliminar una orden
  const deleteOrderContext = async (id) => {
    try {
      setLoading(true);
      await deleteOrder(id);
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Error al eliminar la orden");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        order,
        loading,
        error,
        createOrderContext,
        getAllOrdersContext,
        getUserOrdersContext,
        getOrderByIdContext,
        deleteOrderContext,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
