import axios from "./axios"


export const createMembership = (membreship) => axios.post(`/memberships`)
export const getMembership = (id) => axios.get(`/memberships/${id}`)
export const getMemberships = () => axios.get(`/memberships`)       