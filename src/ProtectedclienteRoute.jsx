import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/contextoAutenticacion";

function ProtectedClientRoute() {
  const { loading, isAuthenticated, user } = useAuth();
  console.log(loading, isAuthenticated);
  
  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-gray-200 border-t-red-600 rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-200 text-lg font-semibold">Cargando datos...</p>
      </div>
    </div>
  );
  
  if (!loading && !isAuthenticated) return <Navigate to="/login" replace />;
  if (user.role !== "cliente") return <Navigate to="/clientePage" replace />; // 🔥 SOLO CLIENTE PUEDE PASAR

  return <Outlet />;
}

export default ProtectedClientRoute;
