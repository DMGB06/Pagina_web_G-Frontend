import React, { useState, useEffect } from "react";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaInfoCircle,
} from "react-icons/fa";
import { useOrder } from "../../context/orderscontext";
import Footer from "../../components/footer2"; // Ajusta la ruta según tu estructura

function ComprasPage() {
  const { orders, getUserOrdersContext, getOrderByIdContext, order, loading } =
    useOrder();

  const [showDetailModal, setShowDetailModal] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);

  useEffect(() => {
    getUserOrdersContext();
  }, []);

  const handleVerDetalles = async (orderId) => {
    setLoadingDetails(true);
    setShowDetailModal(true);
    await getOrderByIdContext(orderId);
    setLoadingDetails(false);
  };

  const closeModal = () => {
    setShowDetailModal(false);
  };

  return (
    <div className="bg-[#121212] text-white min-h-screen flex flex-col justify-between">
      <main className="flex-grow p-6">
        <h1 className="text-4xl font-bold text-center mb-10">Mis Compras</h1>

        <div className="max-w-5xl mx-auto space-y-6">
          {loading && (
            <div className="text-center text-gray-400 animate-pulse text-lg">
              Cargando tus compras...
            </div>
          )}

          {!loading && orders.length === 0 && (
            <p className="text-center text-gray-500 text-lg">
              Aún no has realizado ninguna compra.
            </p>
          )}

          {!loading &&
            orders.map((compra) => (
              <div
                key={compra._id}
                className="bg-[#1f1f1f] p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
              >
                <div className="flex-1">
                  <p className="text-xl font-semibold mb-2">
                    Compra realizada el{" "}
                    <span className="text-red-400">
                      {new Date(compra.createdAt).toLocaleDateString()}
                    </span>
                  </p>
                  <p className="text-gray-400 text-lg">
                    Total:{" "}
                    <span className="text-green-400 font-bold">
                      S/ {compra.totalPrice.toFixed(2)}
                    </span>
                  </p>
                </div>

                <div className="flex items-center flex-wrap gap-3 sm:gap-5">
                  <span
                    className={`flex items-center px-3 py-1 rounded-full text-sm font-medium transition-all duration-300
                  ${
                    compra.status === "Pagado"
                      ? "bg-green-600 text-white"
                      : compra.status === "Pendiente"
                      ? "bg-yellow-500 text-gray-900"
                      : "bg-red-600 text-white"
                  }`}
                  >
                    {compra.status === "Pagado" && (
                      <FaCheckCircle className="mr-2 text-lg" />
                    )}
                    {compra.status === "Pendiente" && (
                      <FaClock className="mr-2 text-lg" />
                    )}
                    {compra.status === "Cancelado" && (
                      <FaTimesCircle className="mr-2 text-lg" />
                    )}
                    {compra.status}
                  </span>

                  <button
                    onClick={() => handleVerDetalles(compra._id)}
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md flex items-center text-sm font-semibold justify-center transition-all duration-300 shadow-md"
                  >
                    <FaInfoCircle className="mr-2" /> Ver Detalles
                  </button>
                </div>
              </div>
            ))}
        </div>
      </main>

      {/* MODAL DETALLES DE COMPRA */}
      {showDetailModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-md flex justify-center items-center z-50 animate-fadeIn">
          <div className="relative bg-gradient-to-br from-[#1a1a1a] to-[#2b2b2b] text-white rounded-2xl shadow-2xl w-full max-w-xl border border-gray-700 p-8 transform transition-all duration-300 scale-100">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-all text-lg"
            >
              ✕
            </button>

            <h2 className="text-3xl font-extrabold mb-6 text-center text-white tracking-wide">
              Detalles de la Compra
            </h2>

            {loadingDetails ? (
              <div className="flex flex-col justify-center items-center text-gray-400 animate-pulse py-12">
                <svg
                  className="animate-spin h-8 w-8 text-gray-500 mb-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
                <p className="text-lg">Cargando detalles...</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center mb-6">
                  <div className="p-4 bg-[#222] rounded-lg shadow-inner">
                    <p className="text-sm text-gray-400 mb-1">Fecha</p>
                    <p className="font-bold text-white">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="p-4 bg-[#222] rounded-lg shadow-inner">
                    <p className="text-sm text-gray-400 mb-1">Total Pagado</p>
                    <p className="font-bold text-green-400 text-lg">
                      S/ {order.totalPrice.toFixed(2)}
                    </p>
                  </div>
                  <div className="p-4 bg-[#222] rounded-lg shadow-inner">
                    <p className="text-sm text-gray-400 mb-1">Estado</p>
                    <p
                      className={`font-bold ${
                        order.status === "Pagado"
                          ? "text-green-400"
                          : order.status === "Pendiente"
                          ? "text-yellow-400"
                          : "text-red-400"
                      }`}
                    >
                      {order.status}
                    </p>
                  </div>
                </div>

                <div className="space-y-4 max-h-64 overflow-y-auto px-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                  {order.products.map((item) => (
                    <div
                      key={item.product._id}
                      className="flex justify-between items-center bg-[#1f1f1f] border border-gray-700 rounded-lg p-4 hover:shadow-lg transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={
                            item.product.image ||
                            "https://via.placeholder.com/50"
                          }
                          alt={item.product.name}
                          className="w-16 h-16 rounded-md object-cover border border-gray-600"
                        />
                        <div>
                          <p className="font-semibold text-white">
                            {item.product.name}
                          </p>
                          <p className="text-sm text-gray-400">
                            Cantidad:{" "}
                            <span className="font-medium">{item.quantity}</span>
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-400 text-lg">
                          S/{" "}
                          {(
                            item.product.price * item.quantity
                          ).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center mt-8">
                  <button
                    onClick={closeModal}
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-10 rounded-full shadow-lg transition-all duration-300"
                  >
                    Cerrar
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

export default ComprasPage;
