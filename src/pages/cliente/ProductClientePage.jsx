import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaShoppingCart,
  FaSearch,
  FaInfoCircle,
  FaCheckCircle,
  FaFilter,
  FaTags,
} from "react-icons/fa";
import { useProduct } from "../../context/productcontext";
import { useCategory } from "../../context/categorycontext";
import Footer from "../../components/footer2";

function ProductsClientePage() {
  const { products, getProductsContext, loading } = useProduct();
  const { categories, loading: loadingCategories } = useCategory();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [cart, setCart] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500);
  const [appliedMinPrice, setAppliedMinPrice] = useState(0);
  const [appliedMaxPrice, setAppliedMaxPrice] = useState(500);

  useEffect(() => {
    getProductsContext();
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item._id === product._id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });

    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
  };

  const handlePriceFilter = () => {
    setAppliedMinPrice(minPrice);
    setAppliedMaxPrice(maxPrice);
  };

  const filteredProducts = products.filter((product) => {
    const matchName = product.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "" || product.category?._id === category;
    const matchPrice =
      product.price >= appliedMinPrice && product.price <= appliedMaxPrice;

    return matchName && matchCategory && matchPrice;
  });

  return (
    <div className="relative min-h-screen bg-[#111111] text-white flex flex-col lg:flex-row">
      {/* LATERAL FILTROS */}
      <aside className="w-full lg:w-1/4 p-6 bg-[#1a1a1a] border-r border-gray-800">
        {/* Buscar producto */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <FaSearch className="mr-2" /> Buscar producto
          </h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#2a2a2a] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>

        {/* Categorías */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <FaFilter className="mr-2" /> Filtrar por tipo
          </h2>
          <select
            className="w-full bg-[#2a2a2a] text-white border border-gray-600 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Todos los tipos</option>
            {!loadingCategories &&
              categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
          </select>
        </div>

        {/* Filtro por precio */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <FaTags className="mr-2" /> Filtrar por precio
          </h2>

          {/* Sliders */}
          <div className="flex items-center justify-between mb-4">
            <span>S/{minPrice}</span>
            <span>S/{maxPrice}</span>
          </div>

          <input
            type="range"
            min={0}
            max={maxPrice - 10}
            value={minPrice}
            step={10}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            className="w-full appearance-none h-2 bg-blue-600 rounded-full mb-4 focus:ring-2 focus:ring-blue-600"
          />

          <input
            type="range"
            min={minPrice + 10}
            max={500}
            value={maxPrice}
            step={10}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full appearance-none h-2 bg-blue-600 rounded-full mb-4 focus:ring-2 focus:ring-blue-600"
          />

          <div className="flex justify-between text-sm text-gray-400 mb-4">
            <span>Precio: S/{minPrice}</span>
            <span>S/{maxPrice}</span>
          </div>

          <button
            onClick={handlePriceFilter}
            className="bg-blue-500 hover:bg-blue-700 w-full text-white font-semibold py-2 rounded-md transition shadow-md"
          >
            Filtrar
          </button>
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Productos disponibles</h2>
          <p className="text-gray-400 text-sm">
            Mostrando {filteredProducts.length} de {products.length} resultados
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
          {loading ? (
            <p className="text-center text-gray-400 col-span-full">
              Cargando productos...
            </p>
          ) : filteredProducts.length === 0 ? (
            <p className="text-center text-gray-400 col-span-full">
              No se encontraron productos.
            </p>
          ) : (
            filteredProducts.map((product) => (
              <div
                key={product._id}
                className="bg-[#1a1a1a] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition hover:scale-105 flex flex-col"
              >
                <div className="h-52 bg-[#2a2a2a] flex justify-center items-center p-4">
                  <img
                    src={product.image || "https://via.placeholder.com/300"}
                    alt={product.name}
                    className="h-full object-contain"
                  />
                </div>

                <div className="flex flex-col flex-grow p-4">
                  <h3 className="text-lg font-semibold mb-2 truncate">
                    {product.name}
                  </h3>

                  <p className="text-green-400 font-bold text-xl mb-2">
                    S/ {product.price.toFixed(2)}
                  </p>

                  <p className="text-sm text-gray-400 mb-4 flex items-center">
                    <FaInfoCircle className="mr-2" />{" "}
                    {product.description.length > 60
                      ? product.description.substring(0, 60) + "..."
                      : product.description}
                  </p>

                  <span className="text-xs bg-blue-600 text-white py-1 px-3 rounded-full self-start mb-4">
                    {product.category?.name || "Sin categoría"}
                  </span>

                  <button
                    onClick={() => addToCart(product)}
                    className="mt-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md flex items-center justify-center transition"
                  >
                    <FaShoppingCart className="mr-2" /> Añadir al carrito
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {/* Botón flotante del carrito */}
      <Link
        to="/cliente/cart"
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-xl flex items-center justify-center z-50"
      >
        <FaShoppingCart className="text-2xl" />
        {cart.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-white text-blue-600 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md">
            {cart.reduce((acc, item) => acc + item.quantity, 0)}
          </span>
        )}
      </Link>


      {/* Popup confirmación */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-md flex justify-center items-center z-50 animate-fadeIn">
          <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2e2e2e] border border-gray-700 rounded-xl shadow-2xl p-8 text-center w-80 scale-100 transition-transform duration-300 ease-out animate-popupZoom">
            {/* Icono */}
            <div className="flex justify-center mb-4">
              <div className="bg-green-600 p-4 rounded-full shadow-md transform hover:rotate-12 transition">
                <FaCheckCircle className="text-white text-5xl" />
              </div>
            </div>

            {/* Mensaje */}
            <h3 className="text-xl font-bold text-white mb-2">
              ¡Producto añadido!
            </h3>
            <p className="text-sm text-gray-400 mb-6">
              Ahora está en tu carrito de compras.
            </p>

            {/* Botón */}
            <button
              onClick={() => setShowPopup(false)}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2 rounded-lg transition shadow-lg border border-blue-800"
            >
              Seguir Comprando
            </button>
          </div>
        </div>
      )}
    </div>

  );
}

export default ProductsClientePage;
