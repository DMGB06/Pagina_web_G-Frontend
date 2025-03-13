import React, { useEffect, useState } from "react";
import { useOrder } from "../../context/orderscontext";
import { useAuth } from "../../context/contextoAutenticacion";
import { FiSearch, FiEye, FiX } from "react-icons/fi";
import { format } from "date-fns";

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
      const orderDate = new Date(order.createdAt);
      return orderDate >= fromDate && orderDate <= toDate;
    });

    setFilteredOrders(filtered);
  };

  const handleViewDetails = async (orderId) => {
    setLoadingDetails(true);
    try {
      const orderDetails = await getOrderByIdContext(orderId);
      console.log("Detalles de la orden:", orderDetails);
      setSelectedOrder(orderDetails);
    } catch (error) {
      console.error("❌ Error al obtener detalles de la orden:", error);
    } finally {
      setLoadingDetails(false);
    }
  };

  if (!user || user.role !== "admin") {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500 text-xl">
        ❌ Acceso denegado. Solo admins.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white p-8 space-y-10">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold text-white">🛒 Gestión de Compras</h1>

        {/* Filtros de fecha */}
        <div className="flex gap-4 items-end bg-[#1a1a1a] p-4 rounded-xl border border-gray-700">
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
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition"
          >
            <FiSearch /> Buscar
          </button>
        </div>
      </header>

      {/* Tabla de compras */}
      <div className="bg-[#1a1a1a] rounded-xl p-6 shadow-lg border border-gray-700">
        {loading ? (
          <p className="text-center text-gray-400">Cargando órdenes...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : filteredOrders.length === 0 ? (
          <p className="text-center text-gray-500">No se encontraron compras.</p>
        ) : (
          <table className="w-full table-auto">
            <thead>
              <tr className="text-gray-400 text-sm">
                <th className="p-3 text-left">#ID Orden</th>
                <th className="p-3 text-left">Usuario</th>
                <th className="p-3 text-left">Correo</th>
                <th className="p-3 text-left">Fecha</th>
                <th className="p-3 text-left">Total</th>
                <th className="p-3 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order._id} className="border-b border-gray-700 hover:bg-[#2a2a2a]">
                  <td className="p-3 text-sm">{order._id}</td>
                  <td className="p-3 text-sm">{order.user?.username}</td>
                  <td className="p-3 text-sm">{order.user?.email}</td>
                  <td className="p-3 text-sm">{format(new Date(order.createdAt), "dd/MM/yyyy")}</td>
                  <td className="p-3 text-sm font-bold text-green-400">S/ {order.totalPrice.toFixed(2)}</td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => handleViewDetails(order._id)}
                      className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg text-sm transition"
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

/* Modal de detalles */

const OrderDetailsModal = ({ order, onClose }) => {
    console.log("Order in modal:", order);
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0d0d0d] bg-opacity-70 backdrop-blur-sm">
        <div className="bg-[#1a1a1a] p-8 rounded-2xl shadow-2xl w-[95%] max-w-3xl border border-gray-700 relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-red-500">
            <FiX size={24} />
          </button>
  
          <h2 className="text-2xl font-bold text-white mb-6">Detalles de la Orden</h2>
  
          <div className="space-y-4 text-sm">
            <p><span className="font-medium text-gray-400">ID Orden:</span> {order._id}</p>
            <p><span className="font-medium text-gray-400">Usuario:</span> {order.user?.username || "Usuario desconocido"}</p>
            <p><span className="font-medium text-gray-400">Correo:</span> {order.user?.email || "Correo desconocido"}</p>
            <p><span className="font-medium text-gray-400">Fecha de compra:</span> {format(new Date(order.createdAt), "dd/MM/yyyy HH:mm")}</p>
            <p><span className="font-medium text-gray-400">Total:</span> <span className="text-green-400 font-bold">S/ {order.totalPrice.toFixed(2)}</span></p>
          </div>
  
          <div className="mt-6">
            <h3 className="text-lg font-bold mb-4 text-white">Productos comprados</h3>
  
            {order.products?.length > 0 ? (
              <div className="space-y-3">
                {order.products.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-[#2a2a2a] p-4 rounded-lg">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.product?.image || "https://via.placeholder.com/100"}
                        alt={item.product?.name || "Producto"}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div>
                        <p className="font-semibold text-white">{item.product?.name}</p>
                        <p className="text-sm text-gray-400">Cantidad: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="text-green-400 font-bold">
                      S/ {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No hay productos en esta orden.</p>
            )}
          </div>
  
          <div className="flex justify-end mt-8">
            <button onClick={onClose} className="bg-gray-600 hover:bg-gray-500 text-white px-6 py-2 rounded-lg transition">Cerrar</button>
          </div>
        </div>
      </div>
    );
  };
  
