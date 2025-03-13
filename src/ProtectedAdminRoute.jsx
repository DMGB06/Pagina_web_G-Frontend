import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/contextoAutenticacion";
import { useEffect, useState } from "react";

function ProtectedAdminRoute() {
  const { loading, isAuthenticated, user } = useAuth();
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  console.log(loading, isAuthenticated, user); // 👀 Debugging

  if (loading || showLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0d0d0d]">
        <div className="flex flex-col items-center space-y-6 animate-fadeIn">
          {/* Spinner elegante */}
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 rounded-full border-4 border-gray-600 border-t-transparent animate-spin"></div>
            <div className="absolute inset-4 rounded-full border-4 border-gray-800"></div>
            <div className="absolute inset-[10px] flex items-center justify-center">
              <div className="w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
            </div>
          </div>
  
          {/* Texto de carga */}
          <p className="text-white text-lg font-semibold tracking-wide">
            Cargando datos...
          </p>
  
        </div>
      </div>
    );
  }
  

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!user || user.role !== "admin") return <Navigate to="/adminPage" replace />;

  return <Outlet />;
}

export default ProtectedAdminRoute;
