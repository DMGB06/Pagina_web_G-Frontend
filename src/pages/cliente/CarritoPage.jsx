import React, { useState, useEffect } from "react";
import {
  FaTrash,
  FaPlus,
  FaMinus,
  FaBoxOpen,
} from "react-icons/fa";
import { useOrder } from "../../context/orderscontext";
import { useNavigate } from "react-router-dom";

function CarritoPage() {
  const [cart, setCart] = useState([]);
  const [sending, setSending] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { createOrderContext } = useOrder();
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart && storedCart.length > 0) {
      setCart(storedCart);
    }
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  const increaseQuantity = (_id) => {
    setCart(cart.map((item) =>
      item._id === _id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const decreaseQuantity = (_id) => {
    setCart(cart.map((item) =>
      item._id === _id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    ));
  };

  const removeItem = (_id) => {
    const updatedCart = cart.filter((item) => item._id !== _id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert("El carrito está vacío.");
      return;
    }

    const orderPayload = {
      products: cart.map((item) => ({
        product: item._id,
        quantity: item.quantity,
      })),
    };

    try {
      setSending(true);
      const res = await createOrderContext(orderPayload);
      console.log("✅ Orden creada con éxito:", res);

      setCart([]);
      localStorage.removeItem("cart");
      navigate("/cliente/compras");
    } catch (error) {
      console.error("❌ Error al crear la orden:", error.message);
      setErrorMessage(error.message);
      setShowConfirmModal(false);
    } finally {
      setSending(false);
    }
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal;

  return (
    <div className="min-h-screen bg-[#121212] text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-10 text-white">
        Carrito de Compras
      </h1>

      {cart.length === 0 ? (
        <div className="flex flex-col justify-center items-center h-[60vh]">
          <FaBoxOpen className="text-gray-500 text-7xl mb-4" />
          <p className="text-gray-400">Tu carrito está vacío.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Tabla Productos */}
          <div className="lg:col-span-2 bg-[#1e1e1e] p-6 rounded-lg shadow-md">
            <div className="hidden md:grid grid-cols-4 font-semibold text-gray-400 border-b border-gray-700 pb-3 mb-3 uppercase text-sm">
              <div className="text-left">Producto</div>
              <div className="text-center">Precio</div>
              <div className="text-center">Cantidad</div>
              <div className="text-center">Subtotal</div>
            </div>

            {cart.map((item) => (
              <div
                key={item._id}
                className="grid grid-cols-1 md:grid-cols-4 items-center border-b border-gray-800 py-4 gap-4"
              >
                {/* Producto */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => removeItem(item._id)}
                    className="text-red-600 hover:text-red-400 text-sm"
                  >
                    <FaTrash />
                  </button>
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image || "https://via.placeholder.com/100"}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md border border-gray-700"
                    />
                    <span className="font-medium text-white text-sm">{item.name}</span>
                  </div>
                </div>

                {/* Precio */}
                <div className="text-center text-white font-semibold text-sm md:text-base">
                  S/ {item.price.toFixed(2)}
                </div>

                {/* Cantidad */}
                <div className="flex justify-center items-center space-x-2">
                  <button
                    onClick={() => decreaseQuantity(item._id)}
                    className="bg-gray-700 hover:bg-red-600 text-white px-2 py-1 rounded-md"
                  >
                    <FaMinus />
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(item._id)}
                    className="bg-gray-700 hover:bg-green-600 text-white px-2 py-1 rounded-md"
                  >
                    <FaPlus />
                  </button>
                </div>

                {/* Subtotal */}
                <div className="text-center text-white font-semibold text-sm md:text-base">
                  S/ {(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          {/* Totales */}
          <div className="bg-[#1e1e1e] p-6 rounded-lg shadow-md space-y-6 border border-gray-700 h-fit">
            <h2 className="text-xl font-semibold text-white border-b pb-4 border-gray-700">
              Totales del carrito
            </h2>

            <div className="flex justify-between text-sm text-gray-400">
              <span>Subtotal</span>
              <span className="text-white font-semibold">S/ {subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between border-t pt-4 border-gray-700 text-lg font-semibold">
              <span>Total</span>
              <span className="text-red-500">S/ {total.toFixed(2)}</span>
            </div>

            <button
              onClick={() => setShowConfirmModal(true)}
              disabled={sending}
              className={`w-full ${sending ? "bg-gray-600" : "bg-red-600 hover:bg-red-700"} text-white py-3 rounded-md font-bold text-sm transition-all`}
            >
              {sending ? "Procesando..." : "Finalizar compra"}
            </button>
          </div>
        </div>
      )}

      {/* Modal Confirmación */}
      {showConfirmModal && !errorMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-[#1f1f1f] text-white p-8 rounded-lg shadow-xl w-full max-w-sm space-y-6">
            <h2 className="text-xl font-bold text-center">Confirmar compra</h2>
            <p className="text-center text-gray-400">
              ¿Estás seguro de realizar el pago por{" "}
              <span className="text-red-500 font-bold">S/ {total.toFixed(2)}</span>?
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="w-1/2 bg-gray-600 hover:bg-gray-700 py-2 px-4 rounded-md"
              >
                Cancelar
              </button>
              <button
                onClick={handleCheckout}
                disabled={sending}
                className={`w-1/2 ${sending ? "bg-gray-600" : "bg-green-600 hover:bg-green-700"} py-2 px-4 rounded-md`}
              >
                {sending ? "Procesando..." : "Confirmar"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Error */}
      {errorMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-[#1f1f1f] text-white p-8 rounded-lg shadow-xl w-full max-w-sm space-y-6">
            <h2 className="text-xl font-bold text-center text-red-500">¡Error!</h2>
            <p className="text-center text-gray-400">{errorMessage}</p>
            <button
              onClick={() => setErrorMessage("")}
              className="w-full bg-red-600 hover:bg-red-700 py-2 px-4 rounded-md"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CarritoPage;
