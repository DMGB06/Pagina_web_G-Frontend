import { FaCheckCircle, FaDollarSign, FaShieldAlt } from "react-icons/fa";

const BeneficiosCliente = () => {
  return (
    <div className="hidden md:flex w-full bg-black text-white py-8 px-4 justify-around items-center gap-6 border-t border-gray-800">
      
      {/* Producto de Calidad */}
      <div className="flex items-center space-x-4 hover:scale-105 transition-transform duration-300">
        <FaCheckCircle className="text-4xl text-white" />
        <div>
          <h4 className="font-bold text-lg">Calidad Garantizada</h4>
          <p className="text-sm text-gray-400">Productos 100% certificados.</p>
        </div>
      </div>

      {/* Precios Bajos */}
      <div className="flex items-center space-x-4 hover:scale-105 transition-transform duration-300">
        <FaDollarSign className="text-4xl text-white" />
        <div>
          <h4 className="font-bold text-lg">Precios Competitivos</h4>
          <p className="text-sm text-gray-400">Ofertas directas de fábrica.</p>
        </div>
      </div>

      {/* Satisfacción Garantizada */}
      <div className="flex items-center space-x-4 hover:scale-105 transition-transform duration-300">
        <FaShieldAlt className="text-4xl text-white" />
        <div>
          <h4 className="font-bold text-lg">Compra Segura</h4>
          <p className="text-sm text-gray-400">Protección en cada transacción.</p>
        </div>
      </div>

    </div>
  );
};

export default BeneficiosCliente;
