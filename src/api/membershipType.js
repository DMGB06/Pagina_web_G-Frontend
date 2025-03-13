import axios from "./axios"; 

export const getMembershipsTypes = () => axios.get("/membership-types");

export const deleteMembershipTypes = (id) => axios.delete(`/membership-types/${id}`);

export const getMembershipType = (id) => axios.get(`/membership-types/${id}`);

export const createMembershipType = (membership) => axios.post("/membership-types", membership);

export const updateMembershipTypes = (id, data) => axios.put(`/membership-types/${id}`, data);
