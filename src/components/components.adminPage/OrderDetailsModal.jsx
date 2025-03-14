import React from "react";
import { FiX } from "react-icons/fi";
import { format } from "date-fns";

const OrderDetailsModal = ({ order, loading, onClose }) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm px-4">
      <div className="bg-[#1a1a1a] p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-3xl border border-gray-700 relative overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition"
          aria-label="Cerrar"
        >
          <FiX size={24} />
        </button>

        <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">
          Detalles de la Orden
        </h2>

        {/* Información general */}
        <div className="space-y-4 text-sm sm:text-base">
          <p><span className="font-medium text-gray-400">ID Orden:</span> {order._id}</p>
          <p><span className="font-medium text-gray-400">Usuario:</span> {order.user?.username || "Sin usuario"}</p>
          <p><span className="font-medium text-gray-400">Correo:</span> {order.user?.email || "Sin correo"}</p>
          <p><span className="font-medium text-gray-400">Fecha de compra:</span> {format(new Date(order.createdAt), "dd/MM/yyyy HH:mm")}</p>
          <p><span className="font-medium text-gray-400">Total:</span> <span className="text-green-400 font-bold">S/ {order.totalPrice.toFixed(2)}</span></p>
        </div>

        {/* Productos */}
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-4 text-white">Productos comprados</h3>

          {order.products?.length > 0 ? (
            <div className="space-y-3">
              {order.products.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-[#2a2a2a] p-4 rounded-lg gap-4"
                >
                  <div className="flex items-center gap-4 w-full">
                    <img
                      src={item.product?.image || "https://via.placeholder.com/100"}
                      alt={item.product?.name || "Producto"}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-white">{item.product?.name || "Producto"}</p>
                      <p className="text-sm text-gray-400">Cantidad: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="text-green-400 font-bold self-end sm:self-center">
                    S/ {(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No hay productos en esta orden.</p>
          )}
        </div>

        {/* Cerrar */}
        <div className="flex justify-end mt-8">
          <button
            onClick={onClose}
            className="bg-gray-600 hover:bg-gray-500 text-white px-6 py-2 rounded-lg transition"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
