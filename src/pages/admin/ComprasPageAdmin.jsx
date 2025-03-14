import React, { useEffect, useState } from "react";
import { useOrder } from "../../context/orderscontext";
import { useAuth } from "../../context/contextoAutenticacion";
import { FiSearch, FiEye, FiX } from "react-icons/fi";
import { format } from "date-fns";
import OrderDetailsModal from "../../components/components.adminPage/OrderDetailsModal";
import { parseISO, isAfter, isBefore } from 'date-fns';


const ComprasPageAdmin = () => {
  const { user } = useAuth();
  const { orders, getAllOrdersContext, getOrderByIdContext, loading, error } = useOrder();

  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchDate, setSearchDate] = useState({ from: "", to: "" });
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  useEffect(() => {
    if (user?.role === "admin") {
      getAllOrdersContext();
    }
  }, [user]);

  useEffect(() => {
    setFilteredOrders(orders);
  }, [orders]);

  const handleSearchByDate = () => {
    if (!searchDate.from || !searchDate.to) return;
  
    const fromDate = new Date(searchDate.from);
    const toDate = new Date(searchDate.to);
    toDate.setHours(23, 59, 59, 999);
  
    const filtered = orders.filter((order) => {
      const orderDate = parseISO(order.createdAt);
  
      return (
        (isAfter(orderDate, fromDate) || orderDate.getTime() === fromDate.getTime()) &&
        (isBefore(orderDate, toDate) || orderDate.getTime() === toDate.getTime())
      );
    });
  
    setFilteredOrders(filtered);
  };
  

  const handleViewDetails = async (orderId) => {
    setLoadingDetails(true);
    try {
      const orderDetails = await getOrderByIdContext(orderId);
      setSelectedOrder(orderDetails);
    } catch (error) {
      console.error("Error al obtener detalles de la orden:", error);
    } finally {
      setLoadingDetails(false);
    }
  };

  if (!user || user.role !== "admin") {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500 text-xl">
        Acceso denegado. Solo administradores.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white px-4 sm:px-8 py-8 space-y-10">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          Gestión de Compras
        </h1>

        {/* Filtros de fecha */}
        <div className="flex flex-col sm:flex-row gap-4 bg-[#1a1a1a] p-4 rounded-xl border border-gray-700 w-full sm:w-auto">
          <div className="flex flex-col">
            <label className="text-sm text-gray-400 mb-1">Desde</label>
            <input
              type="date"
              value={searchDate.from}
              onChange={(e) => setSearchDate({ ...searchDate, from: e.target.value })}
              className="bg-[#121212] text-white border border-gray-600 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-gray-400 mb-1">Hasta</label>
            <input
              type="date"
              value={searchDate.to}
              onChange={(e) => setSearchDate({ ...searchDate, to: e.target.value })}
              className="bg-[#121212] text-white border border-gray-600 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={handleSearchByDate}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition"
          >
            <FiSearch /> Buscar
          </button>
        </div>
      </header>

      {/* Tabla de compras */}
      <div className="bg-[#1a1a1a] rounded-xl p-4 sm:p-6 shadow-lg border border-gray-700 overflow-x-auto">
        {loading ? (
          <p className="text-center text-gray-400">Cargando órdenes...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : filteredOrders.length === 0 ? (
          <p className="text-center text-gray-500">No se encontraron compras en el rango seleccionado.</p>
        ) : (
          <table className="min-w-[600px] w-full table-auto">
            <thead>
              <tr className="text-gray-400 text-sm">
                <th className="p-3 text-left">ID Orden</th>
                <th className="p-3 text-left">Usuario</th>
                <th className="p-3 text-left">Correo</th>
                <th className="p-3 text-left">Fecha</th>
                <th className="p-3 text-left">Total</th>
                <th className="p-3 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b border-gray-700 hover:bg-[#2a2a2a] text-sm"
                >
                  <td className="p-3">{order._id}</td>
                  <td className="p-3">{order.user?.username || "Sin usuario"}</td>
                  <td className="p-3">{order.user?.email || "Sin correo"}</td>
                  <td className="p-3">
                    {format(new Date(order.createdAt), "dd/MM/yyyy")}
                  </td>
                  <td className="p-3 font-bold text-green-400">
                    S/ {order.totalPrice.toFixed(2)}
                  </td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => handleViewDetails(order._id)}
                      className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg transition"
                    >
                      <FiEye className="mr-2" /> Ver Detalles
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal de Detalles */}
      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          loading={loadingDetails}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
};

export default ComprasPageAdmin;
