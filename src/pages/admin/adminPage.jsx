import React, { useEffect } from "react";
import { useProduct } from "../../context/productcontext.jsx";
import { useOrder } from "../../context/orderscontext";
import { useUser } from "../../context/userContext";
import {
  FiUsers,
  FiShoppingBag,
  FiBox,
  FiDollarSign,
  FiTrendingUp,
} from "react-icons/fi";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AdminDashboard = () => {
  const { users, getUsersContext, loading: loadingUsers } = useUser();
  const { orders, getAllOrdersContext, loading: loadingOrders } = useOrder();
  const { products, getProductsContext, loading: loadingProducts } = useProduct();

  useEffect(() => {
    getUsersContext();
    getAllOrdersContext();
    getProductsContext();
  }, []);

  // Manejo de carga
  if (loadingUsers || loadingOrders || loadingProducts) {
    return (
      <div className="flex justify-center items-center min-h-screen text-white">
        Cargando datos del administrador...
      </div>
    );
  }

  // Ganancias totales reales
  const totalGanancias = orders.reduce((acc, order) => acc + (order.totalPrice || 0), 0);

  // Ventas mensuales reales
  const ventasMensualesMap = {};

  orders.forEach((order) => {
    const fecha = new Date(order.createdAt);
    const mes = fecha.toLocaleString("default", { month: "short" });

    if (!ventasMensualesMap[mes]) {
      ventasMensualesMap[mes] = 0;
    }

    ventasMensualesMap[mes] += order.totalPrice || 0;
  });

  const ventasMensuales = Object.keys(ventasMensualesMap).map((mes) => ({
    name: mes,
    ventas: ventasMensualesMap[mes],
  }));

  // Últimos usuarios reales
  const sortedUsers = [...users].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  const latestUsers = sortedUsers.slice(0, 5);

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white flex flex-col gap-8 px-4 sm:px-6 lg:px-10 py-6 transition-all duration-300">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold">
            Dashboard Administrativo
          </h1>
          <p className="text-gray-400 text-sm sm:text-base mt-1">
            Bienvenido, aquí tienes el resumen general del sistema.
          </p>
        </div>
      </header>

      {/* Métricas */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <MetricCard
          title="Usuarios"
          value={users.length}
          icon={<FiUsers size={28} />}
          color="bg-gradient-to-tr from-blue-600 to-blue-400"
        />
        <MetricCard
          title="Órdenes"
          value={orders.length}
          icon={<FiShoppingBag size={28} />}
          color="bg-gradient-to-tr from-green-600 to-green-400"
        />
        <MetricCard
          title="Productos"
          value={products.length}
          icon={<FiBox size={28} />}
          color="bg-gradient-to-tr from-yellow-600 to-yellow-400"
        />
        <MetricCard
          title="Ganancia Total"
          value={`S/ ${totalGanancias.toFixed(2)}`}
          icon={<FiDollarSign size={28} />}
          color="bg-gradient-to-tr from-purple-600 to-purple-400"
        />
      </section>

      {/* Gráfico del Servidor */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Gráfico de ventas */}
        <div className="lg:col-span-2 bg-[#1a1a1a] rounded-xl p-4 sm:p-6 shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg sm:text-xl font-semibold">
              Rendimiento de Ventas
            </h2>
            <FiTrendingUp size={24} className="text-green-400" />
          </div>
          <div className="h-[250px] sm:h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={ventasMensuales}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="name" stroke="#aaa" />
                <YAxis stroke="#aaa" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="ventas"
                  stroke="#10b981"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Últimos Usuarios Registrados */}
      <section className="bg-[#1a1a1a] rounded-xl p-4 sm:p-6 shadow-md overflow-x-auto">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">
          Últimos Usuarios Registrados
        </h2>
        <table className="min-w-[500px] w-full text-sm sm:text-base text-left">
          <thead>
            <tr className="text-gray-400 border-b border-gray-700">
              <th className="pb-2">Nombre</th>
              <th className="pb-2">Correo</th>
            </tr>
          </thead>
          <tbody>
            {latestUsers.map((user, idx) => (
              <tr
                key={idx}
                className="border-b border-gray-700 hover:bg-[#2a2a2a] transition-all"
              >
                <td className="py-3">{user.username || "Sin nombre"}</td>
                <td>{user.email || "Sin correo"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <footer className="text-center text-gray-600 text-xs mt-10">
        © {new Date().getFullYear()} Brave Gym. Todos los derechos reservados.
      </footer>
    </div>
  );
};

const MetricCard = ({ title, value, icon, color }) => (
  <div
    className={`rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg transition-transform transform hover:scale-105 ${color}`}
  >
    <div className="flex items-center justify-between mb-4">{icon}</div>
    <h3 className="text-white text-lg sm:text-xl font-semibold">{title}</h3>
    <p className="text-2xl sm:text-3xl font-bold text-white">{value}</p>
  </div>
);

const StatusItem = ({ label, status, color }) => (
  <div className="flex justify-between items-center">
    <span>{label}</span>
    <span className={`font-bold text-${color}-400`}>{status}</span>
  </div>
);

export default AdminDashboard;
