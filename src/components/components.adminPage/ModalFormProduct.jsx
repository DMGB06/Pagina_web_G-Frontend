import React from "react";
import { FiUpload, FiX } from "react-icons/fi";

const ModalFormProduct = ({
  title,
  handleSubmit,
  closeModal,
  newProduct,
  handleInputChange,
  handleImageChange,
  previewImage,
  loadingCategories,
  categories,
  buttonText,
  errors = [],
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="bg-[#1f1f1f] p-8 rounded-2xl shadow-2xl w-[95%] max-w-lg transition-all duration-300 border border-gray-700 max-h-screen overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          <button
            onClick={closeModal}
            className="text-gray-400 hover:text-red-500 transition text-xl"
            title="Cerrar"
          >
            <FiX size={24} />
          </button>
        </div>
        {errors.length > 0 && (
          <div className="mb-4 p-4 rounded-lg bg-red-600 text-white animate-pulse">
            <ul className="list-disc list-inside space-y-1">
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Nombre */}
          <div>
            <label className="text-sm font-medium text-gray-300">Nombre</label>
            <input
              type="text"
              name="name"
              placeholder="Nombre del producto"
              value={newProduct.name}
              onChange={handleInputChange}
              className="mt-1 w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-gray-800 focus:outline-none transition"
            />
          </div>

          {/* Descripción */}
          <div>
            <label className="text-sm font-medium text-gray-300">
              Descripción
            </label>
            <textarea
              name="description"
              placeholder="Descripción breve"
              value={newProduct.description}
              onChange={handleInputChange}
              rows="3"
              className="mt-1 w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-gray-800 focus:outline-none transition"
            />
          </div>

          {/* Precio y Stock */}
          <div className="flex gap-4 flex-col sm:flex-row">
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-300">
                Precio
              </label>
              <input
                type="number"
                name="price"
                placeholder="Precio S/."
                value={newProduct.price}
                onChange={handleInputChange}
                className="mt-1 w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-gray-800 focus:outline-none transition"
              />
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-300">Stock</label>
              <input
                type="number"
                name="stock"
                placeholder="Cantidad en stock"
                value={newProduct.stock}
                onChange={handleInputChange}
                className="mt-1 w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-gray-800 focus:outline-none transition"
              />
            </div>
          </div>

          {/* Categoría */}
          <div>
            <label className="text-sm font-medium text-gray-300">
              Categoría
            </label>
            <select
              name="category"
              value={newProduct.category}
              onChange={(e) =>
                handleInputChange({
                  target: { name: "category", value: e.target.value },
                })
              }
              className="mt-1 w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-gray-800 focus:outline-none transition"
            >
              <option value="">Seleccione una categoría</option>
              {!loadingCategories &&
                categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
            </select>
          </div>

          {/* Imagen */}
          <div>
            <label className="text-sm font-medium text-gray-300">
              Imagen del producto
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-gray-800 focus:outline-none transition file:cursor-pointer"
            />
          </div>

          {/* Previsualización */}
          {previewImage && (
            <div className="mt-4 flex justify-center">
              <img
                src={previewImage}
                alt="Vista previa"
                className="w-32 h-32 object-cover rounded-md border border-gray-600 shadow"
              />
            </div>
          )}

          {/* Botones */}
          <div className="flex flex-col sm:flex-row justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={closeModal}
              className="flex items-center justify-center gap-2 bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition"
            >
              <FiX size={18} /> Cancelar
            </button>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-500 transition shadow-md"
            >
              <FiUpload size={18} /> {buttonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalFormProduct;
