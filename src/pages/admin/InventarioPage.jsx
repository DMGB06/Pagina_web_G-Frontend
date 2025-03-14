import React, { useEffect, useState } from "react";
import { FiEdit, FiTrash, FiPlusCircle, FiSearch } from "react-icons/fi";

import { useProduct } from "../../context/productcontext";
import { useCategory } from "../../context/categorycontext";
import ModalFormProduct from "../../components/components.adminPage/ModalFormProduct";

const ProductsPage = () => {
  const {
    products,
    getProductsContext,
    createProductContext,
    updateProductContext,
    deleteProductContext,
    loading,
    error,
  } = useProduct();

  const { categories, loading: loadingCategories } = useCategory();

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const [errors, setErrors] = useState([]);

  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    image: null,
  });

  const [previewImage, setPreviewImage] = useState(null);

  // Carga inicial de productos
  useEffect(() => {
    getProductsContext();
  }, []);

  //Limpia formulario
  const limpiarFormulario = () => {
    setNewProduct({
      name: "",
      description: "",
      price: "",
      stock: "",
      category: "",
      image: null,
    });
    setPreviewImage(null);
    setSelectedProduct(null);
    setErrors([]);
  };

  // Filtrado de productos
  const filteredProducts = Array.isArray(products)
    ? products.filter(
        (product) =>
          (selectedCategory === "all" ||
            product.category?._id === selectedCategory) &&
          product.name?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  // Handlers del formulario
  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProduct({ ...newProduct, image: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  //  Crear Producto
  const handleCreateProduct = async (e) => {
    e.preventDefault();
    setErrors([]); // limpiamos errores antes de validar
  
    if (
      !newProduct.name.trim() ||
      !newProduct.description.trim() ||
      !newProduct.price ||
      !newProduct.stock ||
      !newProduct.category
    ) {
      setErrors(["Todos los campos son obligatorios."]);
      return;
    }
  
    const formData = new FormData();
    formData.append("name", newProduct.name.trim());
    formData.append("description", newProduct.description.trim());
    formData.append("category", newProduct.category);
    formData.append("price", newProduct.price);
    formData.append("stock", newProduct.stock);
    if (newProduct.image) {
      formData.append("image", newProduct.image);
    }
  
    try {
      await createProductContext(formData);
  
      limpiarFormulario();       // Limpiar formulario solo si no hay error
      setShowCreateModal(false); // Cerrar modal solo si fue exitoso
      getProductsContext();      //Recargar productos
    } catch (error) {
      console.error("Error creando producto:", error);
  
      if (Array.isArray(error.response?.data)) {
        setErrors(error.response.data); // Errores de validación (array)
      } else if (error.response?.data?.message) {
        setErrors([error.response.data.message]); // Mensaje de error del servidor
      } else {
        setErrors(["Error desconocido al crear el producto."]);
      }
  
    }
  };
  

  //Actualizar Producto
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    setErrors([]);

    if (
      !newProduct.name.trim() ||
      !newProduct.description.trim() ||
      !newProduct.price ||
      !newProduct.stock ||
      !newProduct.category
    ) {
      setErrors(["Todos los campos son obligatorios."]);
      return;
    }

    const formData = new FormData();
    formData.append("name", newProduct.name.trim());
    formData.append("description", newProduct.description.trim());
    formData.append("category", newProduct.category);
    formData.append("price", newProduct.price);
    formData.append("stock", newProduct.stock);
    if (newProduct.image) {
      formData.append("image", newProduct.image);
    }

    try {
      await updateProductContext(selectedProduct._id, formData);

      limpiarFormulario();
      setShowUpdateModal(false);
      getProductsContext();
    } catch (error) {
      console.error("Error actualizando producto:", error);

      if (Array.isArray(error.response?.data)) {
        setErrors(error.response.data);
      } else if (error.response?.data?.message) {
        setErrors([error.response.data.message]);
      } else {
        setErrors(["Error desconocido al actualizar el producto."]);
      }
    }
  };

  // Eliminar Producto
  const handleDeleteProduct = async () => {
    try {
      await deleteProductContext(selectedProduct._id);
      setShowConfirm(false);
      getProductsContext();
    } catch (error) {
      console.error("Error eliminando producto:", error);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-10 min-h-screen bg-[#0d0d0d] text-white flex flex-col gap-10 transition-all duration-300">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#ffffff]">
          📦 Gestión de Productos
        </h2>
      </div>

      {/* BÚSQUEDA Y FILTROS */}
      <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-4 w-full">
        <div className="flex w-full sm:w-auto flex-col md:flex-row gap-4">
          <div className="relative w-full sm:w-72">
            <FiSearch
              className="absolute left-3 top-3 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Buscar producto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#151515] text-white border border-gray-700"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full sm:w-56 py-2 px-3 rounded-lg bg-[#151515] text-white border border-gray-700"
          >
            <option value="all">Todas las categorías</option>
            {!loadingCategories &&
              categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
          </select>
        </div>

        <button
          onClick={() => {
            limpiarFormulario();
            setShowCreateModal(true);
          }}
          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-xl shadow-md transition hover:scale-105"
        >
          <FiPlusCircle size={20} /> Nuevo Producto
        </button>
      </div>

      {/* LISTA DE PRODUCTOS */}
      <div className="bg-[#000000] bg-opacity-70 rounded-xl p-6 shadow-lg border border-gray-700">
        {loading ? (
          <p className="text-center text-gray-400 animate-pulse">
            Cargando productos...
          </p>
        ) : error && !showCreateModal && !showUpdateModal ? (
          <p className="text-center text-red-500">❌ {error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.length === 0 ? (
              <p className="text-center col-span-full text-gray-400">
                No se encontraron productos.
              </p>
            ) : (
              filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className="bg-[#2e2e2e] rounded-lg shadow-lg border border-gray-700 hover:border-gray-500 transition hover:-translate-y-2"
                >
                  <div className="h-48 bg-white flex justify-center items-center">
                    <img
                      src={product.image || "https://via.placeholder.com/300"}
                      alt={product.name}
                      className="w-32 h-32 object-cover rounded-md"
                    />
                  </div>

                  <div className="p-4 flex flex-col justify-between min-h-[200px]">
                    <h3 className="text-xl font-semibold">{product.name}</h3>
                    <p className="text-sm text-gray-400">
                      {product.description || "Sin descripción"}
                    </p>

                    <div className="mt-3">
                      <p className="text-yellow-400 font-bold">
                        S/ {product.price}
                      </p>
                      <p className="text-sm text-gray-300">
                        <strong>Categoría:</strong>{" "}
                        {product.category?.name || "Sin categoría"}
                      </p>
                      <p className="text-sm text-gray-300">
                        <strong>Stock:</strong> {product.stock}
                      </p>
                    </div>

                    <div className="flex justify-between mt-4">
                      <button
                        onClick={() => {
                          setSelectedProduct(product);
                          setNewProduct({
                            name: product.name,
                            description: product.description,
                            price: product.price,
                            stock: product.stock,
                            category: product.category?._id || "",
                            image: null,
                          });
                          setPreviewImage(product.image);
                          setErrors([]);
                          setShowUpdateModal(true);
                        }}
                        className="text-blue-400 border border-gray-700 px-3 py-2 rounded-md hover:bg-blue-500 hover:text-white"
                      >
                        <FiEdit className="inline mr-1" /> Editar
                      </button>

                      <button
                        onClick={() => {
                          setSelectedProduct(product);
                          setShowConfirm(true);
                        }}
                        className="text-red-400 border border-gray-700 px-3 py-2 rounded-md hover:bg-red-500 hover:text-white"
                      >
                        <FiTrash className="inline mr-1" /> Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* MODAL DE CONFIRMACIÓN */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-[#1a1a1a] p-8 rounded-xl border border-gray-700">
            <h3 className="text-xl font-bold">¿Eliminar este producto?</h3>
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={handleDeleteProduct}
                className="bg-red-600 hover:bg-red-500 px-5 py-2 rounded-lg text-white"
              >
                Sí, eliminar
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-gray-600 hover:bg-gray-500 px-5 py-2 rounded-lg text-white"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {showCreateModal && (
        <ModalFormProduct
          title="Crear Nuevo Producto"
          handleSubmit={handleCreateProduct}
          closeModal={() => {
            setShowCreateModal(false);
            setErrors([]); // Limpia los errores
          }}
          newProduct={newProduct}
          handleInputChange={handleInputChange}
          handleImageChange={handleImageChange}
          previewImage={previewImage}
          loadingCategories={loadingCategories}
          categories={categories}
          buttonText="Crear Producto"
          errors={errors} // Pasamos los errrores
        />
      )}

      {showUpdateModal && (
        <ModalFormProduct
          title="Actualizar Producto"
          handleSubmit={handleUpdateProduct}
          closeModal={() => {
            setShowUpdateModal(false);
            setErrors([]);
          }}
          newProduct={newProduct}
          handleInputChange={handleInputChange}
          handleImageChange={handleImageChange}
          previewImage={previewImage}
          loadingCategories={loadingCategories} 
          categories={categories}
          buttonText="Actualizar Producto"
          errors={errors} //Pasamos los errores
        />
      )}
    </div>
  );
};

export default ProductsPage;
