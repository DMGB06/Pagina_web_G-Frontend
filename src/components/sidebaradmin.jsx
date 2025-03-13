import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/contextoAutenticacion";
import {
  FiPackage,
  FiSettings,
  FiLogOut,
  FiUsers,
  FiClipboard,
  FiCalendar,
  FiMenu,
  FiX,
} from "react-icons/fi";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { user, isAuthenticated, logoutContext } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  if (!isAuthenticated || user?.role !== "admin") return null;

  const handleLogout = () => {
    logoutContext();
    navigate("/home");
  };

  const navItems = [
    { to: "/adminPage", icon: FiClipboard, label: "Dashboard" },
    { to: "/admin/users", icon: FiUsers, label: "Usuarios" },
    { to: "/admin/inventario", icon: FiPackage, label: "Inventario" },
    { to: "/admin/compras", icon: FiCalendar, label: "Compras" },
    { to: "/admin/settings", icon: FiSettings, label: "Configuraciones" },
  ];

  return (
    <>
      {/* Hamburguesa solo en mobile */}
      <button
        className="fixed top-4 right-4 z-[999] md:hidden bg-black p-2 rounded-md text-white shadow-md"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar fijo */}
      <aside
        className={`fixed top-0  left-0 h-screen border-r-2 border-white bg-[#080808] text-white shadow-xl z-[998] flex flex-col
          ${menuOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:flex
          ${isOpen ? "w-64" : "w-20"}
          transition-all duration-150
        `}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        {/* Logo */}
        {isOpen && (
          <div className="p-6 flex items-center justify-center border-b border-white">
            <h2 className="text-lg font-bold text-[#8575eed7]">Admin Panel</h2>
          </div>
        )}

        {/* Navegación */}
        <nav className="flex-grow py-6">
          <ul className="flex flex-col gap-1 px-2">
            {navItems.map(({ to, icon: Icon, label }) => (
              <li
                key={to}
                onClick={() => setMenuOpen(false)}
                className="flex items-center hover:bg-red-600 rounded-lg p-3 cursor-pointer transition justify-center md:justify-start"
              >
                <Icon size={20} />
                {isOpen && <Link to={to} className="ml-4 text-sm">{label}</Link>}
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout */}
        <div className="mt-auto px-2 border-t border-gray-700 mb-6">
          <button
            onClick={() => {
              handleLogout();
              setMenuOpen(false);
            }}
            className="flex items-center bg-red-500  w-full p-3 mt-2 rounded-lg hover:bg-red-600 transition justify-center md:justify-start"
          >
            <FiLogOut size={20} />
            {isOpen && <span className="ml-4 text-sm">Cerrar Sesión</span>}
          </button>
        </div>
      </aside>

      {/* Backdrop mobile */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[997] md:hidden"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}
    </>
  );
};


export default Sidebar;
  