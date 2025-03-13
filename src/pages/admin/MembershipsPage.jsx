import React, { useEffect, useState } from "react";
import { FiEdit, FiTrash, FiPlusCircle } from "react-icons/fi";
import { FaIdCard } from "react-icons/fa";
import { useMembershipType } from "../../context/membershiptypecontext";

const MembershipsPage = () => {
  const {
    membershipType,
    getMshipsTypes,
    deleteMshipTypes,
    updateMshipTypes,
    createMshipType,
  } = useMembershipType();

  
  const [showConfirm, setShowConfirm] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedMembership, setSelectedMembership] = useState(null);
  const [editedMembership, setEditedMembership] = useState({
    name: "",
    price: "",
    duration: "",
  });

  useEffect(() => {
    getMshipsTypes();
  }, []);

  // 🗑️ Maneja la eliminación
  const handleDeleteClick = (membership) => {
    setSelectedMembership(membership);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    await deleteMshipTypes(selectedMembership._id);
    setShowConfirm(false);
    setSelectedMembership(null);
  };

  // ✏️ Maneja la edición
  const handleEditClick = (membership) => {
    setSelectedMembership(membership);
    setEditedMembership({
      name: membership.name,
      price: membership.price,
      duration: membership.duration || "",
    });
    setShowEditModal(true);
  };

  const handleChange = (e) => {
    setEditedMembership({
      ...editedMembership,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleUpdate = async () => {
    if (!editedMembership.name.trim()) {
      alert("⚠️ El nombre de la membresía es obligatorio");
      return;
    }
    if (!editedMembership.price || isNaN(editedMembership.price)) {
      alert("⚠️ El precio debe ser un número válido");
      return;
    }
    if (!editedMembership.duration || isNaN(editedMembership.duration)) {
      alert("⚠️ La duración debe ser un número válido");
      return;
    }
  
    try {
      await updateMshipTypes(selectedMembership._id, {
        name: editedMembership.name.trim(),
        price: Number(editedMembership.price),
        duration: Number(editedMembership.duration),
      });
  
      setShowEditModal(false);
    } catch (error) {
      console.error("❌ Error al actualizar la membresía:", error.response?.data || error);
      alert("❌ Hubo un error al actualizar la membresía.");
    }
  };

  // ➕ Maneja la creación de una nueva membresía
  const handleCreate = async () => {
    if (!editedMembership.name.trim()) {
      alert("⚠️ El nombre de la membresía es obligatorio");
      return;
    }
    if (!editedMembership.price || isNaN(editedMembership.price)) {
      alert("⚠️ El precio debe ser un número válido");
      return;
    }
    if (!editedMembership.duration || isNaN(editedMembership.duration)) {
      alert("⚠️ La duración debe ser un número válido");
      return;
    }
  
    console.log("🚀 Enviando datos a la API:", [...formData.entries()]);

    try {
      await createMshipType({
        name: editedMembership.name.trim(),
        price: Number(editedMembership.price), // Convertimos a número, prque no acepta el backend
        duration: Number(editedMembership.duration), //Convertimos a número, lo mismo 
      });
  
      setShowCreateModal(false);
      setEditedMembership({ name: "", price: "", duration: "" });
      getMshipsTypes(); // Refrescar lista de membresías
    } catch (error) {
      console.error("Error al crear la membresía:", error.response?.data || error);
      alert("Hubo un error al crear la membresía. Revisa los datos e inténtalo de nuevo.");
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-white p-6"
    
    >
      <div className="bg-gray-800 bg-opacity-90 shadow-xl rounded-lg p-8 w-full max-w-5xl">
        <div className="flex justify-between items-center mb-6 border-b border-gray-600 pb-4">
          <h2 className="text-3xl font-bold text-gray-100 flex items-center">
            <span className="mr-2">🏋️‍♂️</span> Administrar Membresías
          </h2>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center bg-green-500 text-white px-5 py-3 rounded-lg hover:bg-green-400 transition transform hover:scale-105 shadow-lg"
          >
            <FiPlusCircle className="mr-2 text-xl" /> Nueva Membresía
          </button>
        </div>

        {/* Lista de membresías con scroll */}
        <div className="max-h-[500px] overflow-y-auto space-y-4 pr-2">
          {membershipType.length === 0 ? (
            <p className="text-gray-400 text-center">
              No hay membresías disponibles.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {membershipType.map((membership) => (
                <div
                  key={membership._id}
                  className="bg-gray-700 p-6 rounded-xl shadow-md flex justify-between items-center"
                >
                  <div className="flex items-center space-x-4 min-w-0">
                    <div className="bg-gray-800 p-4 rounded-full">
                      <FaIdCard className="text-yellow-400 text-3xl" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-xl font-semibold truncate max-w-[300px]">
                        {membership.name}
                      </h3>
                      <p className="text-gray-400">
                        {membership.duration || "Sin duración especificada"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 min-w-fit">
                    <span className="text-lg font-bold text-green-400">
                      S/{membership.price || "0"}
                    </span>
                    <button
                      onClick={() => handleEditClick(membership)}
                      className="text-blue-400 p-2 bg-gray-800 rounded-md"
                    >
                      <FiEdit size={20} />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(membership)}
                      className="text-red-400 p-2 bg-gray-800 rounded-md"
                    >
                      <FiTrash size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal de Confirmación para Eliminar */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold text-gray-100 text-center mb-4">
              ¿Estás seguro de que deseas eliminar esta membresía?
            </h2>
            <p className="text-gray-300 text-center">
              {selectedMembership?.name}
            </p>
            <div className="flex justify-around mt-6">
              <button
                onClick={confirmDelete}
                className="bg-red-600 px-5 py-2 rounded-md text-white font-bold hover:bg-red-500 transition"
              >
                Sí, eliminar
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-gray-600 px-5 py-2 rounded-md text-white font-bold hover:bg-gray-500 transition"
              >
                No, cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/*Modal de Edición */}
      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-gray-900 p-8 rounded-lg shadow-2xl w-96 transform transition-all scale-105">
            {/* Encabezado del Modal */}
            <h2 className="text-xl font-bold text-white text-center mb-4 flex items-center justify-center">
              ✏️ Editar Membresía
            </h2>

            {/* Campos de edición */}
            <div className="space-y-4">
              {/* Input Nombre */}
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={editedMembership.name}
                  onChange={handleChange}
                  className="w-full p-3 pl-10 rounded-md bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:outline-none"
                  placeholder="Nombre de la Membresía"
                />
                <span className="absolute left-3 top-3 text-gray-400">🏷️</span>
              </div>

              {/* Input Precio */}
              <div className="relative">
                <input
                  type="number"
                  name="price"
                  value={editedMembership.price}
                  onChange={handleChange}
                  className="w-full p-3 pl-10 rounded-md bg-gray-800 text-white border border-gray-700 focus:border-green-500 focus:outline-none"
                  placeholder="Precio (S/)"
                />
                <span className="absolute left-3 top-3 text-gray-400">💰</span>
              </div>

              {/* Input Duración */}
              <div className="relative">
                <input
                  type="text"
                  name="duration"
                  value={editedMembership.duration}
                  onChange={handleChange}
                  className="w-full p-3 pl-10 rounded-md bg-gray-800 text-white border border-gray-700 focus:border-yellow-500 focus:outline-none"
                  placeholder="Duración (Ejemplo: 3 Meses)"
                />
                <span className="absolute left-3 top-3 text-gray-400">⏳</span>
              </div>
            </div>

            {/* Botones de Acción */}
            <div className="flex justify-between mt-6">
              <button
                onClick={handleUpdate}
                className="w-1/2 bg-blue-600 text-white font-bold py-3 rounded-md hover:bg-blue-500 transition"
              >
                💾 Guardar
              </button>
              <button
                onClick={() => setShowEditModal(false)}
                className="w-1/2 bg-gray-700 text-white font-bold py-3 rounded-md hover:bg-gray-600 transition ml-2"
              >
                ❌ Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ➕ Modal de Creación */}
      {showCreateModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-gray-900 p-8 rounded-lg shadow-2xl w-96 transform transition-all scale-105">
            {/* Encabezado */}
            <h2 className="text-xl font-bold text-white text-center mb-4 flex items-center justify-center">
              ➕ Crear Nueva Membresía
            </h2>

            {/* 📝 Campos de entrada */}
            <div className="space-y-4">
              {/* Input Nombre */}
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={editedMembership.name}
                  onChange={handleChange}
                  className="w-full p-3 pl-10 rounded-md bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:outline-none"
                  placeholder="Nombre de la Membresía"
                />
                <span className="absolute left-3 top-3 text-gray-400">🏷️</span>
              </div>

              {/* Input Precio */}
              <div className="relative">
                <input
                  type="number"
                  name="price"
                  value={editedMembership.price}
                  onChange={handleChange}
                  className="w-full p-3 pl-10 rounded-md bg-gray-800 text-white border border-gray-700 focus:border-green-500 focus:outline-none"
                  placeholder="Precio (S/)"
                />
                <span className="absolute left-3 top-3 text-gray-400">💰</span>
              </div>

              {/* Input Duración */}
              <div className="relative">
                <input
                  type="text"
                  name="duration"
                  value={editedMembership.duration}
                  onChange={handleChange}
                  className="w-full p-3 pl-10 rounded-md bg-gray-800 text-white border border-gray-700 focus:border-yellow-500 focus:outline-none"
                  placeholder="Duración (Ejemplo: 3 Meses)"
                />
                <span className="absolute left-3 top-3 text-gray-400">⏳</span>
              </div>
            </div>

            {/* ⚡ Botones de Acción */}
            <div className="flex justify-between mt-6">
              <button
                onClick={handleCreate}
                className="w-1/2 bg-green-600 text-white font-bold py-3 rounded-md hover:bg-green-500 transition"
              >
                ✅ Crear
              </button>
              <button
                onClick={() => setShowCreateModal(false)}
                className="w-1/2 bg-gray-700 text-white font-bold py-3 rounded-md hover:bg-gray-600 transition ml-2"
              >
                ❌ Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MembershipsPage;
