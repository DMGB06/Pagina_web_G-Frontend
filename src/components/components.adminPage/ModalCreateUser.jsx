import React, { useState, useEffect } from "react";
import {
  FiUser,
  FiMail,
  FiKey,
  FiEye,
  FiEyeOff,
  FiSettings,
  FiX,
} from "react-icons/fi";

const ModalCreateUser = ({ closeModal, createUserContext, registerErrors }) => {
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "cliente",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (registerErrors.length === 0) {
      closeModal();
    }
  }, [registerErrors]);

  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
    setError("");
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();

    if (!newUser.username.trim() || !newUser.email.trim() || !newUser.password.trim()) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    if (newUser.password !== newUser.confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      await createUserContext(newUser);
    } catch (err) {
      console.error("Error creando usuario:", err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm px-4">
      <div className="relative bg-[#1f1f1f] p-8 md:p-10 rounded-2xl shadow-2xl w-full max-w-lg border border-gray-700 animate-fadeIn transition-all duration-300 ease-in-out">
        <div className="flex justify-between items-center mb-8 border-b border-gray-700 pb-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white">Crear Nuevo Usuario</h2>
          <button
            onClick={closeModal}
            className="text-gray-400 hover:text-red-500 bg-transparent transition"
            title="Cerrar"
          >
            <FiX size={26} />
          </button>
        </div>

        {error && (
          <div className="bg-red-600/80 text-white text-sm rounded-md p-4 mb-4 shadow-md">
            {error}
          </div>
        )}

        {registerErrors.length > 0 && (
          <div className="bg-red-600/80 text-white text-sm rounded-md p-4 mb-4 shadow-md space-y-2">
            {registerErrors.map((err, i) => (
              <p key={i}>{err}</p>
            ))}
          </div>
        )}

        <form onSubmit={handleCreateUser} className="space-y-5">
          <div>
            <label className="text-sm text-gray-300 mb-1 flex items-center gap-2">
              <FiUser className="text-blue-400" /> Nombre de usuario
            </label>
            <input
              type="text"
              name="username"
              value={newUser.username}
              onChange={handleInputChange}
              placeholder="Nombre de usuario"
              className="w-full p-3 rounded-lg bg-[#2e2e2e] text-white border border-gray-600"
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-300 mb-1 flex items-center gap-2">
              <FiMail className="text-green-400" /> Correo electrónico
            </label>
            <input
              type="email"
              name="email"
              value={newUser.email}
              onChange={handleInputChange}
              placeholder="Correo electrónico"
              className="w-full p-3 rounded-lg bg-[#2e2e2e] text-white border border-gray-600"
              required
            />
          </div>

          <div className="relative">
            <label className="text-sm text-gray-300 mb-1 flex items-center gap-2">
              <FiKey className="text-red-400" /> Contraseña
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={newUser.password}
              onChange={handleInputChange}
              placeholder="Contraseña"
              className="w-full p-3 rounded-lg bg-[#2e2e2e] text-white border border-gray-600"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-[30px] right-3 text-gray-400 hover:text-white"
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>

          <div className="relative">
            <label className="text-sm text-gray-300 mb-1 flex items-center gap-2">
              <FiKey className="text-purple-400" /> Confirmar Contraseña
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={newUser.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirmar contraseña"
              className="w-full p-3 rounded-lg bg-[#2e2e2e] text-white border border-gray-600"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute top-[30px] right-3 text-gray-400 hover:text-white"
            >
              {showConfirmPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>

          <div>
            <label className="text-sm text-gray-300 mb-1 flex items-center gap-2">
              <FiSettings className="text-purple-400" /> Rol del usuario
            </label>
            <select
              name="role"
              value={newUser.role}
              onChange={handleInputChange}
              className="w-full p-3 rounded-lg bg-[#2e2e2e] text-white border border-gray-600"
            >
              <option value="cliente">Cliente</option>
              <option value="admin">Administrador</option>
            </select>
          </div>

          <div className="flex justify-end gap-4 pt-6">
            <button
              type="button"
              onClick={closeModal}
              className="px-6 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold"
            >
              Crear Usuario
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalCreateUser;
