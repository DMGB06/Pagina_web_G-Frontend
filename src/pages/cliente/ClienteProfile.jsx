import { useUser } from "../../context/userContext";
import { useOrder } from "../../context/orderscontext";
import { useState, useEffect } from "react";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEdit,
  FaSave,
  FaEye,
  FaEyeSlash,
  FaKey,
  FaShoppingBag,
  FaMoneyBillWave,
  FaCheckCircle,
} from "react-icons/fa";

function ClienteProfile() {
  const { selectedUser, updateUserContext } = useUser();
  const { orders, getUserOrdersContext } = useOrder();

  const [editMode, setEditMode] = useState({
    username: false,
    password: false,
  });

  const [formData, setFormData] = useState({
    username: selectedUser?.username || "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    getUserOrdersContext();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSaveUsername = async () => {
    setError("");
    setSuccess("");

    if (!formData.username.trim()) {
      setError("El nombre de usuario no puede estar vacío.");
      return;
    }

    try {
      await updateUserContext(selectedUser._id, {
        username: formData.username.trim(),
      });

      setSuccess("Nombre de usuario actualizado.");
      setEditMode({ ...editMode, username: false });
    } catch (error) {
      console.error("Error al actualizar el nombre:", error);
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Ocurrió un error al actualizar el nombre de usuario.");
      }
    }
  };

  const handleChangePassword = async () => {
    setError("");
    setSuccess("");

    const { currentPassword, newPassword, confirmNewPassword } = formData;

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setError("Todos los campos de contraseña son obligatorios.");
      return;
    }

    if (newPassword.length < 6) {
      setError("La nueva contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setError("Las nuevas contraseñas no coinciden.");
      return;
    }

    try {
      await updateUserContext(selectedUser._id, {
        currentPassword,
        newPassword,
      });

      setSuccess("✅ Contraseña actualizada correctamente.");
      setFormData({
        ...formData,
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
      setEditMode({ ...editMode, password: false });
    } catch (error) {
      console.error("Error al cambiar contraseña:", error);
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Ocurrió un error al cambiar la contraseña.");
      }
    }
  };

  const sortedOrders = [...orders].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const totalGastado = orders
    .reduce((acc, order) => acc + order.totalPrice, 0)
    .toFixed(2);

  const ultimaCompra =
    sortedOrders.length > 0
      ? sortedOrders[0].totalPrice.toFixed(2)
      : "0.00";

  return (
    <div className="flex justify-center items-start min-h-screen bg-[#0d0d0d] text-white px-4 py-10">
      <div className="bg-gradient-to-br from-[#111] to-[#1a1a1a] p-10 rounded-3xl shadow-2xl w-full max-w-5xl border border-[#2c2c2c] space-y-12">

        {/* Encabezado */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-white mb-2">
            ¡Bienvenido, {selectedUser?.username || "Cliente"}!
          </h1>
          <p className="text-gray-500 text-sm">
            Gestiona tu cuenta y revisa tus compras
          </p>
        </div>

        {/* Resumen General */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <ResumenCard
            icon={<FaShoppingBag className="text-green-400 text-4xl mb-4" />}
            label="Compras realizadas"
            value={orders.length}
          />
          <ResumenCard
            icon={<FaMoneyBillWave className="text-yellow-400 text-4xl mb-4" />}
            label="Total gastado"
            value={`S/ ${totalGastado}`}
          />
          <ResumenCard
            icon={<FaCheckCircle className="text-blue-400 text-4xl mb-4" />}
            label="Última compra"
            value={`S/ ${ultimaCompra}`}
          />
        </div>

        {/* Datos de Usuario */}
        <div className="space-y-8">
          {/* Username */}
          <div className="flex items-center bg-[#1a1a1a] p-5 rounded-xl border border-[#2c2c2c]">
            <FaUser className="text-blue-400 text-xl mr-4" />
            {editMode.username ? (
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="bg-[#121212] text-white border border-[#333] p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-lg text-white">{selectedUser.username}</p>
            )}
            <button
              onClick={() =>
                editMode.username
                  ? handleSaveUsername()
                  : setEditMode({ ...editMode, username: true })
              }
              className={`ml-3 p-3 rounded-lg transition-all ${
                editMode.username
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-blue-500 hover:bg-blue-600"
              } text-white`}
            >
              {editMode.username ? <FaSave /> : <FaEdit />}
            </button>
          </div>

          {/* Email */}
          <div className="flex items-center bg-[#1a1a1a] p-5 rounded-xl border border-[#2c2c2c]">
            <FaEnvelope className="text-blue-400 text-xl mr-4" />
            <p className="text-lg text-white">{selectedUser.email}</p>
          </div>

          {/* Cambiar Contraseña */}
          <div className="bg-[#1a1a1a] p-5 rounded-xl border border-[#2c2c2c] space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FaLock className="text-blue-400 text-xl mr-4" />
                <p className="text-lg text-white">••••••••••••</p>
              </div>
              <button
                onClick={() =>
                  setEditMode({ ...editMode, password: !editMode.password })
                }
                className="p-3 rounded-lg bg-blue-500 hover:bg-blue-600 transition-all text-white"
              >
                <FaKey />
              </button>
            </div>

            {editMode.password && (
              <div className="space-y-4">
                <input
                  type="password"
                  name="currentPassword"
                  placeholder="Contraseña actual"
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                  className="w-full bg-[#121212] text-white border border-[#333] p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  name="newPassword"
                  placeholder="Nueva contraseña"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  className="w-full bg-[#121212] text-white border border-[#333] p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmNewPassword"
                  placeholder="Confirmar nueva contraseña"
                  value={formData.confirmNewPassword}
                  onChange={handleInputChange}
                  className="w-full bg-[#121212] text-white border border-[#333] p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
                />

                <button
                  onClick={() => setShowPassword(!showPassword)}
                  type="button"
                  className="flex items-center text-gray-400 hover:text-blue-400 transition text-sm"
                >
                  {showPassword ? <FaEyeSlash className="mr-2" /> : <FaEye className="mr-2" />}
                  {showPassword ? "Ocultar contraseñas" : "Mostrar contraseñas"}
                </button>

                <button
                  onClick={handleChangePassword}
                  type="button"
                  className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md transition-all"
                >
                  Guardar contraseña
                </button>

                {error && <p className="text-red-500 text-center text-sm">{error}</p>}
                {success && <p className="text-green-500 text-center text-sm">{success}</p>}
              </div>
            )}
          </div>
        </div>

        {/* Últimas Compras */}
        <div className="bg-[#1a1a1a] p-6 rounded-xl border border-[#2c2c2c]">
          <h2 className="text-lg font-bold text-white mb-4">🛍️ Últimas compras</h2>
          <ul className="space-y-4">
            {sortedOrders.slice(0, 3).map((order) => (
              <li
                key={order._id}
                className="flex justify-between items-center text-sm border-b border-[#2c2c2c] pb-3"
              >
                <p className="text-gray-400">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <p className="font-semibold text-green-400">
                  S/ {order.totalPrice.toFixed(2)}
                </p>
              </li>
            ))}

            {sortedOrders.length === 0 && (
              <p className="text-gray-500 text-center">Aún no tienes compras</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

const ResumenCard = ({ icon, label, value }) => (
  <div className="flex flex-col items-center bg-[#1a1a1a] p-6 rounded-2xl border border-[#2c2c2c] shadow-inner hover:shadow-lg transition-all duration-300">
    {icon}
    <p className="text-xs text-gray-400 uppercase tracking-widest">{label}</p>
    <p className="text-3xl font-bold text-white">{value}</p>
  </div>
);

export default ClienteProfile;
