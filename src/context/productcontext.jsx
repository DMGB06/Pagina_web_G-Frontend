import { createContext, useContext, useState } from "react";
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../api/products"; // ✅ Importa las funciones de la API

const ProductContext = createContext();

// Hook personalizado para usar el contexto
export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
};

// Proveedor del contexto
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]); // Estado para productos
  const [error, setError] = useState(null); // Estado de errores
  const [loading, setLoading] = useState(false); // Estado de carga

  // Obtener todos los productos
  const getProductsContext = async () => {
    setLoading(true);
    try {
      const res = await getProducts();
      setProducts(res.data);
    } catch (error) {
      console.error("❌ Error obteniendo productos:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Obtener un solo producto
  const getProductContext = async (id) => {
    setLoading(true);
    try {
      const res = await getProduct(id);
      return res.data; // 🔥 Retorna el producto en vez de modificar `products`
    } catch (error) {
      console.error("❌ Error obteniendo el producto:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Crear un producto
  const createProductContext = async (data) => {
    setLoading(true);
    try {
      const res = await createProduct(data);
      setProducts([...products, res.data]); // Agrega el nuevo producto
    } catch (error) {
      console.error("❌ Error creando producto:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Actualizar un producto
  const updateProductContext = async (id, data) => {
    setLoading(true);
    try {
      const res = await updateProduct(id, data);
      setProducts(products.map((product) =>
        product._id === id ? res.data : product
      ));

      
    } catch (error) {
      console.error(" Error actualizando producto:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Eliminar un producto
  const deleteProductContext = async (id) => {
    setLoading(true);
    try {
      const res = await deleteProduct(id);
      if (res.status === 200 || res.status === 201) {
        setProducts(products.filter(product => product._id !== id));
      }
    } catch (error) {
      console.error("Error eliminando el producto:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        error,
        loading,
        getProductContext,
        getProductsContext,
        createProductContext,
        updateProductContext,
        deleteProductContext,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
