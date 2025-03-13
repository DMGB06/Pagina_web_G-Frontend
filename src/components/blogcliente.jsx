import React, { useState } from 'react';

const articulos = [
  {
    id: 1,
    titulo: 'Importancia de los Suplementos Deportivos',
    fecha: '10 marzo, 2024',
    resumen: '¿Por qué son clave para mejorar el rendimiento y la recuperación en el entrenamiento?',
    imagen: 'https://etenonfitness.com/wp-content/uploads/2023/11/suplementos-crossfit-fitness-lifestyle.jpeg',
    contenido: 'Los suplementos deportivos ayudan a cubrir los requerimientos nutricionales que a veces no logramos obtener solo con la dieta. Creatina, BCAAs, proteínas y preentrenos son fundamentales para ganar masa muscular, mejorar la resistencia y acelerar la recuperación post entrenamiento.'
  },
  {
    id: 2,
    titulo: '¿Por qué usar buena ropa para hacer ejercicio?',
    fecha: '12 marzo, 2024',
    resumen: 'Descubre cómo la ropa deportiva de calidad impacta en tu rendimiento y comodidad.',
    imagen: 'https://performancetech.com.pe/wp-content/uploads/2023/03/ropa-de-deporte-1024x683.jpg',
    contenido: 'Una buena ropa deportiva no solo es cuestión de estilo. Ofrece transpirabilidad, ajuste perfecto, y evita lesiones por rozaduras o mala postura. Busca ropa con telas técnicas que mantengan tu piel seca y te den libertad de movimiento.'
  },
  {
    id: 3,
    titulo: 'La importancia de una hidratación correcta',
    fecha: '15 marzo, 2024',
    resumen: 'El agua y los electrolitos en el rendimiento deportivo. Evita la fatiga y mejora tu recuperación.',
    imagen: 'https://blog.benefitargentina.com/wp-content/uploads/2022/03/fotonoticia_20171126082939_1200-1024x620.jpg',
    contenido: 'Mantenerse hidratado es clave para evitar la fatiga muscular, calambres y mantener un buen desempeño físico. Los electrolitos ayudan a reponer las sales minerales perdidas durante el entrenamiento intenso.'
  }
];

const BlogCliente = () => {
  const [activo, setActivo] = useState(null);

  const toggleArticulo = (id) => {
    setActivo((prev) => (prev === id ? null : id));
  };

  return (
    <div className="bg-[#1a1a1a] text-white py-16 px-4 sm:px-6">
      <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold mb-12 tracking-wide text-white">
        Mantente al día con las novedades
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {articulos.map((articulo) => (
          <div
            key={articulo.id}
            onClick={() => toggleArticulo(articulo.id)}
            className="bg-[#111111] rounded-lg overflow-hidden shadow-lg cursor-pointer hover:shadow-gray-700/50 transition-shadow duration-300"
          >
            <img
              src={articulo.imagen}
              alt={articulo.titulo}
              className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
            />

            <div className="p-6">
              <p className="text-sm text-gray-400 mb-2">{articulo.fecha}</p>
              <h3 className="font-bold text-lg mb-3">{articulo.titulo}</h3>
              <p className="text-gray-300 mb-4">{articulo.resumen}</p>
              <span className="text-white underline">Leer artículo</span>

              {/* Contenido desplegable */}
              {activo === articulo.id && (
                <div className="mt-4 border-t border-gray-700 pt-4 text-sm text-gray-300 animate-fadeIn">
                  {articulo.contenido}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogCliente;
