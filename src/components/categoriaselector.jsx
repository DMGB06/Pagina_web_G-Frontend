import React from "react";

const categorias = [
  {
    nombre: "Suplementos",
    imagen:
      "suplementos.png",
  },
  {
    nombre: "Accesorios de Entrenamiento",
    imagen:
      "Accesorios.png",
  },
  {
    nombre: "Equipamiento Deportivo",
    imagen:
      "mancuerna.png",
  },
  {
    nombre: "Ropa Deportiva",
    imagen:
      "polo-negro.png",
  },
];

const CategoriasCliente = () => {
  return (
    <div className="bg-[#1a1a1a] py-16 px-4 sm:px-6">
      <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold mb-12 tracking-wide text-white">
        Nuestras Categorías
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {categorias.map((cat, index) => (
          <div
            key={index}
            className="group relative bg-[#111111] rounded-lg shadow-lg overflow-hidden border border-gray-900 hover:border-gray-500 transition-all duration-300 cursor-pointer"
          >
            <div className="p-6 flex flex-col justify-between h-full">
              <h3 className="text-lg font-semibold text-white mb-6 group-hover:text-gray-700 transition-all duration-300">
                {cat.nombre}
              </h3>

              {/* Imagen que se levanta al hacer hover */}
              <div className="flex justify-center items-center">
                <img
                  src={cat.imagen}
                  alt={cat.nombre}
                  className="w-32 h-32 object-contain transition-transform duration-500 group-hover:-translate-y-4"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriasCliente;
