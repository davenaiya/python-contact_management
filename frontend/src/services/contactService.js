import axios from "axios";

const api = axios.create({ baseURL: "http://127.0.0.1:8000" });

export const getContacts = (search = "") => api.get("/contacts", { params: { search } });
export const createContact = (contact) => api.post("/contacts", contact);
export const updateContact = (id, contact) => api.put(`/contacts/${id}`, contact);
export const deleteContact = (id) => api.delete(`/contacts/${id}`);
