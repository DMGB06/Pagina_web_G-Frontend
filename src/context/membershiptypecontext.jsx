import { createContext, useContext, useState } from "react";
import { 
  getMembershipType, 
  getMembershipsTypes, 
  deleteMembershipTypes, 
  updateMembershipTypes,
  createMembershipType // Importamos la API para crear
} from "../api/membershipType"; 

export const MembershipTypeContext = createContext();

export const useMembershipType = () => {
  const context = useContext(MembershipTypeContext);
  if (!context) {
    throw new Error("useMembershipType debe usarse dentro de un MembershipTypeProvider");
  }
  return context;
};

export const MembershipTypeProvider = ({ children }) => {
  const [membershipType, setMembershipType] = useState([]);

  // Obtener UNA membresía por ID
  const getMshipType = async (id) => {
    try {
      const res = await getMembershipType(id);
      return res.data;
    } catch (error) {
      console.error("Error obteniendo la membresía:", error);
    }
  };

  // Obtener TODAS las membresías
  const getMshipsTypes = async () => {
    try {
      const res = await getMembershipsTypes();
      setMembershipType(res.data);
    } catch (error) {
      console.error("Error obteniendo las membresías:", error);
    }
  };

  // 🔄 Actualizar una membresía
  const updateMshipTypes = async (id, data) => {
    try {
      console.log("📤 Enviando datos para actualizar:", { id, ...data });
  
      const res = await updateMembershipTypes(id, {
        name: data.name.trim(),
        price: Number(data.price), // 🔥 Convertimos a número
        duration: Number(data.duration), // 🔥 Convertimos a número
      });
  
      if (res.status === 200) {
        console.log("✅ Membresía actualizada correctamente");
        getMshipsTypes(); // 🔥 Refrescar lista después de actualizar
      }
    } catch (error) {
      console.error("❌ Error actualizando la membresía:", error.response?.data || error);
      alert("❌ Hubo un error al actualizar la membresía. Revisa los datos.");
    }
  };

  // Eliminar una membresía
  const deleteMshipTypes = async (id) => {
    try {
      const res = await deleteMembershipTypes(id);
      if (res.status === 200 || res.status === 204) {
        setMembershipType(membershipType.filter(m => m._id !== id));
      }
    } catch (error) {
      console.error("Error eliminando la membresía:", error);
    }
  };

  // ➕ Crear una nueva membresía
  const createMshipType = async (data) => {
    try {
      const res = await createMembershipType(data);
      if (res.status === 201) { // Código 201 = Creado con éxito
        setMembershipType([...membershipType, res.data]); // Agregar la nueva membresía a la lista
      }
    } catch (error) {
      console.error("Error creando la membresía:", error);
    }
  };

  return (
    <MembershipTypeContext.Provider
      value={{ 
        membershipType, 
        getMshipsTypes, 
        deleteMshipTypes, 
        getMshipType, 
        updateMshipTypes,
        createMshipType // 🔥 Ahora podemos usarla en la página
      }}
    >
      {children}
    </MembershipTypeContext.Provider>
  );
};
