import React, { useState, useEffect } from "react";
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
  const [isMobile, setIsMobile] = useState(false);

  // Detectar tamaño de pantalla para saber si es mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    handleResize(); // Inicial
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      {/* Botón Hamburguesa SOLO para mobile */}
      {isMobile && (
        <button
          className="fixed top-4 right-4
           z-[999] md:hidden bg-black p-2 rounded-md text-white shadow-md"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen  border-r-2 border-white bg-[#080808] text-white shadow-xl z-[998] flex flex-col transition-all duration-500       ${
            isMobile
              ? menuOpen
                ? "translate-x-0 w-64"
                : "-translate-x-full w-64"
              : isOpen
              ? "w-64 translate-x-0"
              : "w-20 translate-x-0"
          }
        `}
        onMouseEnter={() => !isMobile && setIsOpen(true)}
        onMouseLeave={() => !isMobile && setIsOpen(false)}
      >
        {/* Logo */}
        <div
          className={`flex items-center justify-center border-b border-gray-700 ${
            isOpen || isMobile ? "p-6" : "p-4"
          }`}
        >
          {(isOpen || isMobile) && (
            <h2 className="text-lg font-bold text-[#8575eed7]">Admin Panel</h2>
          )}
        </div>

        {/* Nav Links */}
        <nav className="flex-grow py-6">
          <ul className="flex flex-col gap-1 px-2">
            {navItems.map(({ to, icon: Icon, label }) => (
              <li
                key={to}
                onClick={() => isMobile && setMenuOpen(false)}
                className={`flex items-center hover:bg-red-600 rounded-lg p-3 cursor-pointer transition
                ${isOpen || isMobile ? "justify-start" : "justify-center"}`}
              >
                <Icon size={20} />
                {(isOpen || isMobile) && (
                  <Link to={to} className="ml-4 text-sm">
                    {label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="mt-auto px-2 border-t border-gray-700 mb-6">
          <button
            onClick={() => {
              handleLogout();
              if (isMobile) setMenuOpen(false);
            }}
            className={`flex items-center bg-red-500 w-full p-3 mt-2 rounded-lg hover:bg-red-600 transition
            ${isOpen || isMobile ? "justify-start" : "justify-center"}`}
          >
            <FiLogOut size={20} />
            {(isOpen || isMobile) && (
              <span className="ml-4 text-sm">Cerrar Sesión</span>
            )}
          </button>
        </div>
      </aside>

      {/* Backdrop mobile */}
      {isMobile && menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[997]"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
