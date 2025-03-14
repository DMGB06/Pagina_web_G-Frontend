import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Backend en Render o local
  withCredentials: true, // Esto es lo importante para que la cookie viaje
});

export default instance;
