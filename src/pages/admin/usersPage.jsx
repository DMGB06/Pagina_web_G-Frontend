import React, { useEffect, useState } from "react";
import { useUser } from "../../context/userContext";
import { FaUserCircle, FaUsers } from "react-icons/fa";
import {
  FiSearch,
  FiPlusCircle,
  FiUser,
  FiMail,
  FiKey,
  FiSettings,
  FiX,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";

function UsersPage() {
  const {
    users,
    getUsersContext,
    createUserContext,
    errors: registerErrors,
  } = useUser();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState(""); // Error de validación local

  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "cliente",
  });

  // 🔥 Traer los usuarios al cargar el componente
  useEffect(() => {
    getUsersContext();
  }, []);

  // 🔄 Limpieza del formulario y cierre del modal si no hay errores del registro
  useEffect(() => {
    if (registerErrors.length === 0 && showCreateModal) {
      closeModal();
    }
  }, [registerErrors]);

  // Filtrar usuarios por búsqueda y rol
  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedRole === "all" || user.role === selectedRole)
  );

  // Manejo de inputs
  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
    setError(""); // Limpiar errores al escribir
  };

  // Cerrar modal y limpiar campos
  const closeModal = () => {
    setShowCreateModal(false);
    setError("");
    setNewUser({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "cliente",
    });
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  // Crear usuario con validación
  const handleCreateUser = async (e) => {
    e.preventDefault();

    // Validaciones simples
    if (!newUser.username.trim() || !newUser.email.trim() || !newUser.password.trim()) {
      setError(" Todos los campos son obligatorios.");
      return;
    }

    if (newUser.password !== newUser.confirmPassword) {
      setError(" Las contraseñas no coinciden.");
      return;
    }

    try {
      await createUserContext(newUser);
      closeModal();
    } catch (err) {
      console.error(" Error al crear el usuario:", err);
    }
  };

  return (
    <div className="p-4 md:p-8 min-h-screen bg-[#080808] text-white flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl md:text-4xl font-extrabold text-white flex items-center gap-3">
          <FaUsers className="text-3xl md:text-4xl" />
          Gestión de Usuarios
        </h1>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row justify-between gap-4 w-full">
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative w-full sm:w-72">
            <FiSearch className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar usuario..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#1d1c1c] text-white border border-gray-700 focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="w-full sm:w-60 py-2 px-3 rounded-lg bg-[#1d1c1c] text-white border border-gray-700 focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="all">Todos los roles</option>
            <option value="admin">Administrador</option>
            <option value="cliente">Cliente</option>
          </select>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center justify-center gap-2 bg-green-500 text-white px-5 py-2 rounded-lg shadow-md transition transform hover:scale-105 md:w-auto w-full"
        >
          <FiPlusCircle size={20} /> Crear Usuario
        </button>
      </div>

      {/* Users Table */}
      <div className="flex-1 w-full rounded-xl shadow-lg border border-black bg-[#232222]">
        <div className="overflow-x-auto">
          <div className="min-w-[600px] md:min-w-full">
            <div className="max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
              <table className="w-full text-left text-sm">
                <thead className="bg-black sticky top-0 z-10">
                  <tr>
                    <th className="py-4 px-4 md:px-6">Usuario</th>
                    <th className="py-4 px-4 md:px-6">Correo</th>
                    <th className="py-4 px-4 md:px-6 text-center">Rol</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="text-center py-6 text-gray-400">
                        No hay usuarios disponibles.
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user) => (
                      <tr
                        key={user._id}
                        className="border-b border-gray-700 hover:bg-[#333333] transition"
                      >
                        <td className="py-4 px-4 md:px-6 flex items-center gap-3">
                          <FaUserCircle className="text-yellow-400 text-xl md:text-2xl" />
                          <span>{user.username}</span>
                        </td>
                        <td className="py-4 px-4 md:px-6">{user.email}</td>
                        <td className="py-4 px-4 md:px-6 text-center">
                          <span
                            className={`px-3 py-1 text-xs md:text-sm rounded-full font-semibold ${
                              user.role === "admin"
                                ? "bg-red-600 text-white"
                                : "bg-green-600 text-white"
                            }`}
                          >
                            {user.role === "admin" ? "Administrador" : "Cliente"}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Create User Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm px-4">
          <div className="relative bg-[#1f1f1f] p-8 md:p-10 rounded-2xl shadow-2xl w-full max-w-lg border border-gray-700 animate-fadeIn transition-all duration-300 ease-in-out">
            {/* HEADER */}
            <div className="flex justify-between items-center mb-8 border-b border-gray-700 pb-4">
              <h2 className="text-2xl md:text-3xl font-bold text-white">Crear Nuevo Usuario</h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-red-500 bg-transparent transition"
                title="Cerrar"
              >
                <FiX   size={26} />
              </button>
            </div>

            {/* Mensaje de error local */}
            {error && (
              <div className="bg-red-600/80 text-white text-sm rounded-md p-4 mb-4 shadow-md">
                {error}
              </div>
            )}

            {/* Errores desde el backend */}
            {registerErrors.length > 0 && (
              <div className="bg-red-600/80 text-white text-sm rounded-md p-4 mb-4 shadow-md space-y-2">
                {registerErrors.map((err, i) => (
                  <p key={i}> error {err}</p>
                ))}
              </div>
            )}

            {/* FORMULARIO */}
            <form onSubmit={handleCreateUser} className="space-y-5">
              {/* Username */}
              <div>
                <label className="text-sm text-gray-300 mb-1 flex items-center gap-2">
                  <FiUser className="text-blue-400" /> Nombre de usuario
                </label>
                <input
                  type="text"
                  name="username"
                  value={newUser.username}
                  onChange={handleInputChange}
                  placeholder="Ingresa el nombre de usuario"
                  className="w-full p-3 rounded-lg bg-[#2e2e2e] text-white border border-gray-600 focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-sm text-gray-300 mb-1 flex items-center gap-2">
                  <FiMail className="text-green-400" /> Correo electrónico
                </label>
                <input
                  type="email"
                  name="email"
                  value={newUser.email}
                  onChange={handleInputChange}
                  placeholder="Ingresa el correo electrónico"
                  className="w-full p-3 rounded-lg bg-[#2e2e2e] text-white border border-gray-600 focus:ring-2 focus:ring-green-500 placeholder-gray-400"
                  required
                />
              </div>

              {/* Contraseña */}
              <div className="relative">
                <label className="text-sm text-gray-300 mb-1 flex items-center gap-2">
                  <FiKey className="text-red-400" /> Contraseña
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={newUser.password}
                  onChange={handleInputChange}
                  placeholder="Ingresa la contraseña"
                  className="w-full p-3 rounded-lg bg-[#2e2e2e] text-white border border-gray-600 focus:ring-2 focus:ring-red-500 placeholder-gray-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-[30px] right-3 bg-transparent text-gray-400 hover:text-white"
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>

              {/* Confirmar Contraseña */}
              <div className="relative">
                <label className="text-sm text-gray-300 mb-1 flex items-center gap-2">
                  <FiKey className="text-purple-400" /> Confirmar Contraseña
                </label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={newUser.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Repite la contraseña"
                  className="w-full p-3 rounded-lg bg-[#2e2e2e] text-white border border-gray-600 focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute top-[30px] right-3 bg-transparent text-gray-400 hover:text-white"
                >
                  {showConfirmPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>

              {/* Rol */}
              <div>
                <label className="text-sm text-gray-300 mb-1 flex items-center gap-2">
                  <FiSettings className="text-purple-400" /> Rol del usuario
                </label>
                <select
                  name="role"
                  value={newUser.role}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg bg-[#2e2e2e] text-white border border-gray-600 focus:ring-2 focus:ring-purple-500"
                >
                  <option value="cliente">Cliente</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>

              {/* Botones */}
              <div className="flex justify-end gap-4 pt-6">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold shadow-md transform hover:scale-105"
                >
                  Crear Usuario
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default UsersPage;
