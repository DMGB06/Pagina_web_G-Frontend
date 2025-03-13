import React, { useState } from "react";
import { useUser } from "../../context/userContext";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEdit,
  FaSave,
  FaEye,
  FaEyeSlash,
  FaKey,
} from "react-icons/fa";

const settingsPage = () => {
  const { selectedUser, updateUserContext } = useUser();

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

      setSuccess("✅ Nombre de usuario actualizado.");
      setEditMode({ ...editMode, username: false });
    } catch (error) {
      console.error("❌ Error al actualizar el nombre:", error);
      setError(
        error.response?.data?.message ||
          "Ocurrió un error al actualizar el nombre de usuario."
      );
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
      console.error("❌ Error al cambiar contraseña:", error);
      setError(
        error.response?.data?.message ||
          "Ocurrió un error al cambiar la contraseña."
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#0d0d0d] text-white px-4 py-10">
      <div className="bg-gradient-to-br from-[#111] to-[#1a1a1a] p-10 rounded-3xl shadow-2xl w-full max-w-3xl border border-[#2c2c2c] space-y-12">

        {/* Titulo */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-white mb-2">
            Bienvenido, {selectedUser?.username || "Administrador"}!
          </h1>
          <p className="text-gray-500 text-sm">
            Configura los datos de tu cuenta
          </p>
        </div>

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
                {showPassword ? (
                  <FaEyeSlash className="mr-2" />
                ) : (
                  <FaEye className="mr-2" />
                )}
                {showPassword ? "Ocultar contraseñas" : "Mostrar contraseñas"}
              </button>

              <button
                onClick={handleChangePassword}
                type="button"
                className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md transition-all"
              >
                Guardar contraseña
              </button>

              {error && (
                <p className="text-red-500 text-center text-sm">{error}</p>
              )}
              {success && (
                <p className="text-green-500 text-center text-sm">{success}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default settingsPage;
