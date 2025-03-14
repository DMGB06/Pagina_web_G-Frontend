import React, { useEffect, useState } from "react";
import { useUser } from "../../context/userContext";
import { FaUserCircle, FaUsers } from "react-icons/fa";
import { FiSearch, FiPlusCircle, FiTrash2 } from "react-icons/fi";
import ModalCreateUser from "../../components/components.adminPage/ModalCreateUser";
import ConfirmDeleteModal from "../../components/components.adminPage/confirmDeleteModal";

function UsersPage() {
  const {
    users,
    getUsersContext,
    createUserContext,
    deleteUserContext,
    errors: registerErrors,
  } = useUser();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [selectedUserToDelete, setSelectedUserToDelete] = useState(null);

  useEffect(() => {
    getUsersContext();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedRole === "all" || user.role === selectedRole)
  );

  const handleDeleteUser = async () => {
    if (!selectedUserToDelete) return;
    await deleteUserContext(selectedUserToDelete._id);
    setSelectedUserToDelete(null);
    setShowConfirmDeleteModal(false);
  };

  return (
    <div className="p-4 md:p-8 min-h-screen bg-[#080808] text-white flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl md:text-4xl font-extrabold text-white flex items-center gap-3">
          <FaUsers className="text-3xl md:text-4xl" /> Gestión de Usuarios
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
                    <th className="py-4 px-4 md:px-6 text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="text-center py-6 text-gray-400">
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
                        <td className="py-4 px-4 md:px-6 text-center">
                          <button
                            onClick={() => {
                              setSelectedUserToDelete(user);
                              setShowConfirmDeleteModal(true);
                            }}
                            className="text-red-500 hover:text-red-600 transition bg-transparent"
                          >
                            <FiTrash2 size={20} />
                          </button>
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

      {/* Modals */}
      {showCreateModal && (
        <ModalCreateUser
          closeModal={() => setShowCreateModal(false)}
          createUserContext={createUserContext}
          registerErrors={registerErrors}
        />
      )}

      {showConfirmDeleteModal && (
        <ConfirmDeleteModal
          message={`¿Estás seguro de eliminar a ${selectedUserToDelete.username}?`}
          confirmAction={handleDeleteUser}
          cancelAction={() => setShowConfirmDeleteModal(false)}
        />
      )}
    </div>
  );
}

export default UsersPage;
