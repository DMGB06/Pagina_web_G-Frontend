import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const banners = [
  {
    id: 1,
    image:
      "https://www.empacke.com/wp-content/uploads/2018/01/BIOSPORT-SLIDER-CYCLONE.jpg",
    link: "/cliente/products",
    alt: "Volumen Limpio",
  },
  {
    id: 2,
    image:
      "https://www.empacke.com/wp-content/uploads/2018/01/BIOSPORT-SLIDER-ISO-ZERO.jpg",
    link: "/cliente/products",
    alt: "Potencia y Resistencia",
  },
  {
    id: 3,
    image: "bannersuplemento.jpg",
    link: "/cliente/products",
    alt: "Recuperación Máxima",
  },
  {
    id: 4,
    image:
      "https://d2r9epyceweg5n.cloudfront.net/stores/001/157/893/rte/BANNER9.jpg",
    link: "/cliente/products",
    alt: "Productos",
  },
  {
    id: 5,
    image: "ropa-de-mujer.jpg",
    link: "/cliente/products",
    alt: "Ropa de mujer",
  },

  {
    id: 6,
    image:
      "Banner_Fuerza_desktop_1920x550.jpg",
    link: "/cliente/products",
    alt: "Productos de gimnasio",
  },
  {
    id: 7,
    image:
      "https://www.elevenfit.es/modules/bonslick/views/img/961a55057f5c917394d9b6a121c2b09cfb951e4c_sample--SLIDER-SUPLS.jpg",
    link: "/cliente/products",
    alt: "Whey pro",
  },
  {
    id: 8,
    image:
      "https://eu.rehband.com/cdn/shop/files/rehband_slider_crosfit-lifestyle_1.jpg?v=1729823550&width=2000",
    link: "/cliente/products",
    alt: "Personas cargando peso .x d",
  },
];

const BannerSlider = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const length = banners.length;

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(timer);
  }, [current]);

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  const handleClickBanner = (link) => {
    navigate(link);
  };

  if (!Array.isArray(banners) || banners.length === 0) return null;

  return (
    <div className="relative w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] overflow-hidden">
      {/* Botón Izquierda */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 sm:p-2 rounded-full z-10 hover:bg-opacity-80 transition"
      >
        <FaChevronLeft size={16} className="sm:size-5" />
      </button>

      {/* Botón Derecha */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 sm:p-2 rounded-full z-10 hover:bg-opacity-80 transition"
      >
        <FaChevronRight size={16} className="sm:size-5" />
      </button>

      {/* Imágenes */}
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
            index === current ? "opacity-100 z-0" : "opacity-0 z-0"
          }`}
        >
          {index === current && (
            <img
              src={banner.image}
              alt={banner.alt}
              onClick={() => handleClickBanner(banner.link)}
              className="w-full h-full object-cover cursor-pointer transition-transform duration-500 hover:scale-[1.02]"
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default BannerSlider;
