import { BrowserRouter, Routes, Route } from "react-router-dom";
import clsx from "clsx";
// Páginas
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/registerPage";
import Home from "./pages/home";
import AboutUsGeneral from "./pages/AboutUs-general";

//paginas de admin
import AdminPage from "./pages/admin/adminPage";
import UsersPage from "./pages/admin/usersPage";
import MembershipsPage from "./pages/admin/MembershipsPage";
import InventarioPage from "./pages/admin/InventarioPage";
import SettingsPage from "./pages/admin/settingsPage";
import ComprasPageAdmin from "./pages/admin/ComprasPageAdmin"

//paginas de cliente
import ClientePage from "./pages/cliente/ClientePage";
import ProductsclientePage from "./pages/cliente/ProductClientePage";
import ComprasPage from "./pages/cliente/ComprasPage";
import ClienteProfile from "./pages/cliente/ClienteProfile";
import AboutUs from "./pages/cliente/AboutUs";
import CarritoPage from "./pages/cliente/CarritoPage";

// Proteger rutas
import ProtectedAdminRoute from "./ProtectedAdminRoute";
import ProtectedClientRoute from "./ProtectedclienteRoute";

// Contextos
import { MembershipTypeProvider } from "./context/membershiptypecontext";
import { AuthProvider } from "./context/contextoAutenticacion";
import { UserProvider } from "./context/userContext";
import { ProductProvider } from "./context/productcontext";
import { CategoryProvider } from "./context/categorycontext";
import { OrderProvider } from "./context/orderscontext";

// Componentes
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebaradmin";
import NavbarCliente from "./components/navbarcliente";
import { useLocation } from "react-router-dom";
import { useState } from "react";

function Layout({ children }) {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const adminRoutes = [
    "/adminPage",
    "/admin/users",
    "/admin/memberships",
    "/admin/inventario",
    "/admin/settings",
    "/admin/reservations",
    "/admin/compras",
  ];

  const clientRoutes = [
    "/clientePage",
    "/cliente/aboutUs",
    "/cliente/profile",
    "/cliente/compras",
    "/cliente/products",
    "/cliente/cart",
  ];

  const isAdminRoute = adminRoutes.includes(location.pathname);
  const isClientRoute = clientRoutes.includes(location.pathname);

  if (isAdminRoute) {
    return (
      <div className="flex bg-[#1f1f1f] min-h-screen text-white">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

        {/* Main content */}
        <main
          className={clsx(
            "transition-all duration-300 flex-1",
            isSidebarOpen ? "ml-64" : "ml-20"
          )}
        >
          <div >{children}</div>
        </main>
      </div>
    );
  }

  if (isClientRoute) {
    return (
      <div className="flex flex-col min-h-screen bg-[#f5f5f5] text-black">
        <NavbarCliente />
        <main className="flex-1 pt-20">{children}</main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#f5f5f5] text-black">
      <Navbar />
      <main className="flex-1 pt-16">{children}</main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <MembershipTypeProvider>
        <UserProvider>
          <ProductProvider>
            <OrderProvider>
              <CategoryProvider>
                <BrowserRouter>
                  <Layout>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/home" element={<Home />} />
                      <Route path="/AboutUs" element={<AboutUsGeneral />} />
                      <Route path="/login" element={<LoginPage />} />
                      <Route path="/register" element={<RegisterPage />} />

                      {/* 🔥 RUTA PROTEGIDA PARA ADMIN */}
                      <Route element={<ProtectedAdminRoute />}>
                        <Route path="/adminPage" element={<AdminPage />} />
                        <Route path="/admin/users" element={<UsersPage />} />
                        <Route
                          path="/admin/aboutUs"
                          element={<MembershipsPage />}
                        />
                        <Route
                          path="/admin/inventario"
                          element={<InventarioPage />}
                        />
                        <Route
                          path="/admin/compras"
                          element={<ComprasPageAdmin />}
                        />
                        <Route
                          path="/admin/settings"
                          element={<SettingsPage />}
                        />
                      </Route>

                      {/* 🔥 RUTA PROTEGIDA PARA CLIENTE */}
                      <Route element={<ProtectedClientRoute />}>
                        <Route path="/clientePage" element={<ClientePage />} />
                        <Route path="/cliente/AboutUs" element={<AboutUs />} />
                        <Route
                          path="/cliente/profile"
                          element={<ClienteProfile />}
                        />
                        <Route
                          path="/cliente/compras"
                          element={<ComprasPage />}
                        />
                        <Route
                          path="/cliente/products"
                          element={<ProductsclientePage />}
                        />
                        <Route path="/cliente/cart" element={<CarritoPage />} />
                      </Route>
                    </Routes>
                  </Layout>
                </BrowserRouter>
              </CategoryProvider>
            </OrderProvider>
          </ProductProvider>
        </UserProvider>
      </MembershipTypeProvider>
    </AuthProvider>
  );
}

export default App;
