import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaDumbbell,
  FaUserCircle,
  FaHome,
  FaBoxOpen,
  FaInfoCircle,
  FaShoppingBag,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useAuth } from "../context/contextoAutenticacion";

function NavbarCliente() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { logoutContext, user } = useAuth();
  const navigate = useNavigate(); // 👈 Importante para redirección

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  const toggleMenu = () => setMenuOpen((prev) => !prev);
  

  const handleLogout = async () => {
    try {
      await logoutContext();
      navigate("/Home"); // 👈 Redirige al Home (puedes cambiar por /login si quieres)
    } catch (error) {
      console.error("Error cerrando sesión:", error);
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-[#000000] via-[#171717] to-black text-white shadow-lg">
      <nav className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <Link to="/clientePage" className="flex items-center group">
            <FaDumbbell className="text-4xl text-red-600 group-hover:rotate-12 transition-transform duration-300" />
            <span className="ml-3 text-3xl font-extrabold tracking-widest drop-shadow-lg group-hover:text-red-400 transition">
              Brave Gym
            </span>
          </Link>
        </div>

        {/* Hamburguesa mobile */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="bg-transparent focus:outline-none"
          >
            {menuOpen ? (
              <FaTimes className="text-3xl text-white" />
            ) : (
              <FaBars className="text-3xl text-white" />
            )}
          </button>
        </div>

        {/* Menú de navegación - Escritorio */}
        <ul className="hidden md:flex items-center space-x-8 text-lg font-semibold">
          <li className="hover:text-red-400 transition-all">
            <Link to="/clientePage" className="flex items-center">
              <FaHome className="mr-2" />
              Inicio
            </Link>
          </li>
          <li className="hover:text-red-400 transition-all">
            <Link to="/cliente/products" className="flex items-center">
              <FaBoxOpen className="mr-2" />
              Productos
            </Link>
          </li>
          <li className="hover:text-red-400 transition-all">
            <Link to="/cliente/aboutUs" className="flex items-center">
              <FaInfoCircle className="mr-2" />
              About Us
            </Link>
          </li>
          <li className="hover:text-red-400 transition-all">
            <Link to="/cliente/compras" className="flex items-center">
              <FaShoppingBag className="mr-2" />
              Compras
            </Link>
          </li>
        </ul>

        {/* Dropdown usuario */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="relative focus:outline-none hover:text-red-400 transition-all bg-transparent"
          >
            <FaUserCircle className="text-4xl" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-3 w-48 bg-white text-gray-800 rounded-lg shadow-lg ring-1 ring-gray-300 animate-fadeIn z-50">
              <ul className="py-2 text-sm">
                <li className="px-4 py-2 hover:bg-gray-200 transition-all cursor-pointer">
                  <Link to="/cliente/profile" className="text-gray-900">Mi Perfil</Link>
                </li>
                {user && (
                  <li
                    onClick={handleLogout}
                    className="cursor-pointer text-center bg-red-600 hover:bg-red-700 text-white py-2 rounded-md mx-4 mt-2 transition"
                  >
                    Cerrar sesión
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </nav>

      {/* Menú lateral mobile */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-gradient-to-b from-black to-gray-900 text-white transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out shadow-2xl z-50`}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <Link
            to="/clientePage"
            className="flex items-center"
            onClick={toggleMenu}
          >
            <FaDumbbell className="text-3xl text-red-500 mr-2" />
            <span className="text-xl font-bold">Brave Gym</span>
          </Link>
          <button onClick={toggleMenu} className="text-2xl hover:text-red-400">
            <FaTimes />
          </button>
        </div>

        <ul className="mt-10 space-y-6 p-6 font-medium">
          <li>
            <Link
              to="/clientePage"
              className="flex items-center text-lg hover:text-red-400 transition-all"
              onClick={toggleMenu}
            >
              <FaHome className="mr-3" /> Inicio
            </Link>
          </li>
          <li>
            <Link
              to="/cliente/products"
              className="flex items-center text-lg hover:text-red-400 transition-all"
              onClick={toggleMenu}
            >
              <FaBoxOpen className="mr-3" /> Productos
            </Link>
          </li>
          <li>
            <Link
              to="/cliente/aboutUs"
              className="flex items-center text-lg hover:text-red-400 transition-all"
              onClick={toggleMenu}
            >
              <FaInfoCircle className="mr-3" /> About Us
            </Link>
          </li>
          <li>
            <Link
              to="/cliente/compras"
              className="flex items-center text-lg hover:text-red-400 transition-all"
              onClick={toggleMenu}
            >
              <FaShoppingBag className="mr-3" /> Compras
            </Link>
          </li>
          <li>
            <Link
              to="/cliente/profile"
              className="flex items-center text-lg hover:text-red-400 transition-all"
              onClick={toggleMenu}
            >
              <FaUserCircle className="mr-3" /> Mi Perfil
            </Link>
          </li>
          <li>
            <button
              onClick={() => {
                handleLogout();
                toggleMenu(); // Cierra menú después de logout
              }}
              className="flex items-center text-lg text-red-500 hover:text-red-600 transition-all w-full"
            >
              <FaTimes className="mr-3" /> Cerrar Sesión
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default NavbarCliente;
