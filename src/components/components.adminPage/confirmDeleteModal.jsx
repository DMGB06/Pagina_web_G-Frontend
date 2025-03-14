import React from "react";
import { FiX } from "react-icons/fi";

const ConfirmDeleteModal = ({ message, confirmAction, cancelAction }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm px-4">
      <div className="relative bg-[#1f1f1f] p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Confirmación</h2>
          <button
            onClick={cancelAction}
            className="text-gray-400 hover:text-red-500"
          >
            <FiX size={24} />
          </button>
        </div>
        <p className="text-white mb-6">{message}</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={cancelAction}
            className="px-5 py-2 rounded-lg bg-gray-600 hover:bg-gray-500 text-white"
          >
            Cancelar
          </button>
          <button
            onClick={confirmAction}
            className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white"
          >
            Sí, eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
