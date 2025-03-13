import { createContext, useContext, useState, useEffect } from "react";
import { getCategories as fetchCategories } from "../api/category";

const CategoryContext = createContext();

export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategory debe usarse dentro de un CategoryProvider");
  }
  return context;
};

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getCategories = async () => {
    try {
      const res = await fetchCategories(); // ✅ Usamos la función correcta de la API
      setCategories(res.data);
    } catch (error) {
      console.error("Error obteniendo las categorías", error);
      setError("Error al obtener categorías");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <CategoryContext.Provider value={{ categories, loading, error }}>
      {children}
    </CategoryContext.Provider>
  );
};
