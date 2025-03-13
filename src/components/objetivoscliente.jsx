import {
    FaDumbbell,
    FaHeartbeat,
    FaBolt,
    FaWeight,
    FaRunning,
    FaRegSmile,
  } from "react-icons/fa";
  
  const ObjetivosCliente = () => {
    return (
      <div className="bg-[#222222] text-white py-10 px-4 sm:px-6">
        <h2 className="text-center text-xl sm:text-3xl md:text-4xl font-bold mb-8 tracking-wide text-white">
          Te ayudamos con tu objetivo
        </h2>
  
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-y-8 gap-x-4 max-w-6xl mx-auto">
          {/* Item Template */}
          {objetivos.map((objetivo, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center md:hover:scale-105 transition-transform duration-300 cursor-pointer"
            >
              <div className="bg-[#2A2A2A] p-3 sm:p-4 md:p-5 rounded-full shadow-md flex justify-center items-center">
                {<objetivo.icon className="text-3xl sm:text-4xl md:text-5xl text-white" />}
              </div>
              <p className="font-medium text-xs sm:text-sm md:text-base mt-2 sm:mt-3">
                {objetivo.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  // Opcional: Lista de objetivos para mayor limpieza del código 👇
  const objetivos = [
    { icon: FaDumbbell, label: "Ganar Músculo" },
    { icon: FaRunning, label: "Recuperación" },
    { icon: FaWeight, label: "Pérdida de Peso" },
    { icon: FaBolt, label: "Energía" },
    { icon: FaRegSmile, label: "Bienestar" },
    { icon: FaHeartbeat, label: "Resistencia" },
  ];
  
  export default ObjetivosCliente;
  