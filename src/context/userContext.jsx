import { createContext, useContext, useState, useEffect } from "react";
import {
  createUser as createUserAPI,
  getUser as getUserAPI,
  getUsers as getUsersAPI,
  deleteUser as deleteUserAPI,
  updateUser as updateUserAPI,

} from "../api/user";
import { useAuth } from "../context/contextoAutenticacion";

export const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [users, setUsers] = useState([]); // Todos los usuarios
  const [selectedUser, setSelectedUser] = useState(null); // Usuario autenticado
  const [errors, setErrors] = useState([]);

  // 🔥 Obtener el usuario autenticado y su membresía
  const fetchAuthenticatedUser = async () => {
    if (!isAuthenticated || !user || !user.id) {
      console.error("❌ No hay usuario autenticado.");
      return;
    }

    try {
      const res = await getUserAPI(user.id); // ✅ Obtenemos el usuario autenticado por ID
      setSelectedUser(res.data); // ✅ Guardamos el usuario en el contexto
      console.log("✅ Usuario autenticado:", res.data);
    } catch (error) {
      console.error("❌ Error al obtener el usuario autenticado:", error);
      setSelectedUser(null);
    }
  };
  useEffect(() => {
    if (isAuthenticated && user?.id) {
      fetchAuthenticatedUser();
    }
  }, [isAuthenticated, user]); // 🔄 Se ejecuta si el usuario cambia

  // 🔍 Obtener todos los usuarios y actualizar estado
  const getUsersContext = async () => {
    try {
      const res = await getUsersAPI();
      console.log(res.data);
      setUsers(res.data);
    } catch (error) {
      console.error("❌ Error al obtener los usuarios:", error);
    }
  };

  // 🔍 Obtener un solo usuario por ID
  const getUserContext = async (id) => {
    try {
      const res = await getUserAPI(id);
      return res.data;
    } catch (error) {
      console.error("❌ Error al obtener el usuario:", error);
    }
  };

  // ➕ Crear un nuevo usuario y actualizar estado
  const createUserContext = async (data) => {
    try {
      const res = await createUserAPI(data);
      if (res.status === 201) {
        setUsers([...users, res.data]); // Agregar nuevo usuario al estado
      }
    } catch (error) {
      console.error("❌ Error al crear usuario:", error);

      // ✅ Capturar errores y establecer en el estado para que el frontend los muestre
      if (error.response && error.response.data) {
        setErrors([error.response.data]); // Asegurar que el backend envíe un mensaje correcto
      } else {
        setErrors(["Hubo un error al crear el usuario. Intenta nuevamente."]);
      }
    }
  };

  // ✏️ Actualizar usuario y actualizar estado
  const updateUserContext = async (id, data) => {
    try {
      console.log("🔄 Actualizando usuario:", { id, ...data });
  
      const payload = {};
  
      if (data.username !== undefined) {
        payload.username = data.username.trim();
      }
  
      if (data.email !== undefined) {
        payload.email = data.email;
      }
  
      if (data.password !== undefined) {
        payload.password = data.password;
      }
  
      if (data.currentPassword !== undefined && data.newPassword !== undefined) {
        payload.currentPassword = data.currentPassword;
        payload.newPassword = data.newPassword;
      }
  
      await updateUserAPI(id, payload);
  
      fetchAuthenticatedUser(); // Para refrescar el usuario autenticado
  
    } catch (error) {
      console.error("❌ Error actualizando usuario:", error);
      throw error; // para que el componente pueda mostrar el error
    }
  };
  
  

  // 🗑️ Eliminar usuario y actualizar estado
  const deleteUserContext = async (id) => {
    try {
      const res = await deleteUserAPI(id);
      if (res.status === 200) {
        setUsers(users.filter((user) => user._id !== id));
      }
    } catch (error) {
      console.error("❌ Error al eliminar usuario:", error);
    }
  };

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  return (
    <UserContext.Provider
      value={{
        users,
        selectedUser, // ✅ Usuario autenticado con su membresía
        getUsersContext,
        fetchAuthenticatedUser,
        getUserContext,
        deleteUserContext,
        updateUserContext,
        createUserContext,
        errors,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
