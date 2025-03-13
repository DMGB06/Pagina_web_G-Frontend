import axios from "./axios"


export const registerRequest = (user) => axios.post(`/register`, user).catch(errorHandler);

export const loginRequest = (user) => axios.post(`/login`, user).catch(errorHandler);

export const verifyTokenRequest = () => axios.post(`/verify`).catch(errorHandler);

export const logOut = () => axios.post("/logout").catch(errorHandler)

const errorHandler = (error) => {
    console.error("Error en la api de usuarios" ,error.response?.data || error);
    throw error;
}