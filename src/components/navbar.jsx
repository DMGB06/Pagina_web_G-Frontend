import React from "react";
import { Link } from "react-router-dom";
import { FaDumbbell } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/95 backdrop-blur-md  border-black shadow-md ">
      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
        
        {/* LOGO / BRAND */}
        <Link to="/Home" className="flex items-center space-x-3 group">
          <FaDumbbell className="text-4xl text-red-600 group-hover:rotate-12 transition-transform duration-300" />
          <span className="text-white text-3xl font-extrabold tracking-widest group-hover:text-red-500 transition duration-300">
            Brave Gym
          </span>
        </Link>

        {/* NAV LINKS */}
        <ul className="hidden md:flex items-center space-x-10 uppercase text-sm font-semibold">
          
          <li className="relative group">
            <Link
              to="/Home"
              className="text-gray-300 hover:text-red-500 transition duration-300"
            >
              Home
            </Link>
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
          </li>

          <li className="relative group">
            <Link
              to="/AboutUs"
              className="text-gray-300 hover:text-red-500 transition duration-300"
            >
              About Us
            </Link>
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
          </li>

          {/* LOGIN BUTTON */}
          <li>
            <Link
              to="/login"
              className="px-6 py-2 rounded-full border-2 border-red-500 text-red-500 hover:bg-red-600 hover:text-white transition duration-300 shadow-md"
            >
              Login
            </Link>
          </li>

          {/* SIGN UP BUTTON */}
          <li>
            <Link
              to="/register"
              className="px-6 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white transition duration-300 shadow-md"
            >
              Sign Up
            </Link>
          </li>
        </ul>

        {/* MOBILE MENU - Optional */}
        {/* Agrega aquí el botón para el menú responsive si quieres */}
      </div>
    </nav>
  );
};

export default Navbar;
