import React, { useEffect, useRef } from "react";
import { useProduct } from "../context/productcontext";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ProductosCliente = () => {
  const { products, getProductsContext, loading } = useProduct();
  const scrollRef = useRef(null);

  useEffect(() => {
    getProductsContext();
  }, []);

  const scroll = (scrollOffset) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: scrollOffset,
        behavior: "smooth",
      });
    }
  };

  if (loading) {
    return (
      <div className="text-center text-white py-10">
        Cargando productos...
      </div>
    );
  }

  return (
    <section className="bg-[#111111] text-white py-14 px-6 relative">
      <h2 className="text-center text-3xl md:text-4xl font-bold mb-10 text-white tracking-wide">
        Nuestros Productos
      </h2>

      <div className="relative">
        {/* Botón Izquierda */}
        <button
          onClick={() => scroll(-300)}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-60 text-white p-2 rounded-full z-10 hover:bg-opacity-80"
        >
          <FaChevronLeft size={20} />
        </button>

        {/* Contenedor de Productos con scroll horizontal */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto space-x-4 px-10 hide-scrollbar"
        >
          {products.length === 0 ? (
            <p className="text-center text-gray-400">
              No hay productos disponibles.
            </p>
          ) : (
            products.map((product) => (
              <div
                key={product._id}
                className="min-w-[280px] bg-[#1f1f1f] rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 flex flex-col"
              >
                {/* Imagen */}
                <div className="w-full h-56 bg-white flex justify-center items-center p-4">
                  <img
                    src={product.image || "https://via.placeholder.com/150"}
                    alt={product.name}
                    className="h-full object-contain"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 flex flex-col justify-between p-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      {product.name}
                    </h3>

                    <div className="flex items-center mb-3">
                      {product.discountPrice && (
                        <span className="line-through text-sm text-gray-500 mr-2">
                          S/ {product.price.toFixed(2)}
                        </span>
                      )}
                      <span className="text-red-500 font-bold text-lg">
                        S/{" "}
                        {product.discountPrice
                          ? product.discountPrice.toFixed(2)
                          : product.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Botón Derecha */}
        <button
          onClick={() => scroll(300)}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-60 text-white p-2 rounded-full z-10 hover:bg-opacity-80"
        >
          <FaChevronRight size={20} />
        </button>
      </div>
    </section>
  );
};

export default ProductosCliente;
