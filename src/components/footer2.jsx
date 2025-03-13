import React from "react";
import {
  FaShoppingBag,
  FaUserCircle,
  FaWhatsapp,
  FaLock,
} from "react-icons/fa";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="bg-black text-white pt-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 pb-10">
        {/* Logo y derechos */}
        <div>
          <h1 className="text-3xl font-bold mb-4">Brave Gym</h1>
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Brave Gym. Todos los derechos
            reservados.
          </p>
        </div>

        {/* Links importantes */}
        <div>
          <h3 className="font-bold mb-4">LINKS IMPORTANTES</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>
              <a href="#" className="hover:text-white transition">
                Política de Privacidad
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Política de Cookies
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Términos y Condiciones
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Preguntas Frecuentes
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Libro de Reclamaciones
              </a>
            </li>
          </ul>
        </div>

        {/* Categorías */}
        <div>
          <h3 className="font-bold mb-4">BENEFICIOS</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>
              <a href="#" className="hover:text-white transition">
                Bienestar y Salud
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Ganancia Muscular
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Energía
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Pérdida de Peso
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Recuperación Muscular
              </a>
            </li>
          </ul>
        </div>

        {/* Contacto */}
        <div>
          <h3 className="font-bold mb-4">ATENCIÓN Y SOPORTE</h3>
          <p className="text-gray-400 text-sm mb-2">Contáctanos:</p>
          <div className="flex items-center text-gray-400 text-sm mb-4">
            <FaWhatsapp className="mr-2 text-green-500" />
            <span>955301065 - 966344962</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
