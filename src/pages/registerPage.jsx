import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/contextoAutenticacion";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

  // Estados para ver u ocultar contraseñas
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/Home");
    }
  }, [isAuthenticated]);

  const onSubmit = handleSubmit((values) => {
    const { password, confirmPassword } = values;

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    signup(values);
  });

  return (
    <div
      className="h-screen w-screen bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: "url(gym-image3.jpg)" }}
    >
      {/* Formulario de Registro */}
      <div className="flex items-center justify-center md:justify-end h-full px-4 md:pr-16">
        <div className="bg-white bg-opacity-50 backdrop-blur-lg p-8 rounded-2xl w-full max-w-md">
          <h2 className="text-white text-2xl font-bold mb-4 text-center">
            SIGN UP
          </h2>

          {/* Errores de registro */}
          {registerErrors.map((error, i) => (
            <div className="bg-red-500 p-2 mb-2 rounded-lg text-white text-center" key={i}>
              {error}
            </div>
          ))}

          <form onSubmit={onSubmit}>
            {/* Email */}
            <div className="mb-4">
              <label className="block text-white text-base font-semibold mb-1 drop-shadow-md">
                Enter your email address
              </label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                placeholder="Email"
                autoComplete="email"
                className="w-full p-3 bg-white text-black placeholder-gray-600 rounded-md border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none"
              />
              {errors.email && (
                <p className="text-red-500 mt-1 font-semibold">{errors.email.message}</p>
              )}
            </div>

            {/* Username */}
            <div className="mb-4">
              <label className="block text-white text-base font-semibold mb-1 drop-shadow-md">
                User Name
              </label>
              <input
                type="text"
                {...register("username", { required: true })}
                placeholder="User Name"
                className="w-full p-3 bg-white text-black placeholder-gray-600 rounded-md border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none"
              />
              {errors.username && (
                <p className="text-red-500 mb-2 font-semibold">User name is required</p>
              )}
            </div>

            {/* Password */}
            <div className="mb-4 relative">
              <label className="block text-white text-base font-semibold mb-1 drop-shadow-md">
                Enter your password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: "Password is required" })}
                placeholder="Password"
                autoComplete="new-password"
                className="w-full p-3 pr-12 bg-white text-black placeholder-gray-600 rounded-md border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none"
              />
              <div
                className="absolute right-3 top-[2.8rem] cursor-pointer text-gray-600 hover:text-gray-800"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </div>
              {errors.password && (
                <p className="text-red-600 mt-1 font-semibold">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="mb-4 relative">
              <label className="block text-white text-base font-semibold mb-1 drop-shadow-md">
                Confirm your password
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword", { required: "Confirm your password" })}
                placeholder="Confirm Password"
                autoComplete="new-password"
                className="w-full p-3 pr-12 bg-white text-black placeholder-gray-600 rounded-md border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none"
              />
              <div
                className="absolute right-3 top-[2.8rem] cursor-pointer text-gray-600 hover:text-gray-800"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </div>
              {/* Validación de confirmación de contraseña */}
              {watch("confirmPassword") !== watch("password") &&
                watch("confirmPassword") !== undefined && (
                  <p className="text-red-600 mt-1 font-semibold">Las contraseñas no coinciden</p>
                )}
            </div>

            {/* Link Login */}
            <p className="flex justify-end text-sm text-white">
              Have an Account?{" "}
              <a href="/login" className="ml-1 text-white hover:underline">
                Login
              </a>
            </p>

            {/* Botón Sign Up */}
            <button
              type="submit"
              className="w-full bg-red-600 text-white font-bold py-3 mt-4 rounded-md hover:bg-red-500 transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
