import axios from "axios";

const API_BASE = "http://localhost:5000/api";  // Change this if your backend runs on a different port

export const login = async (email, password) => {
  return axios.post(`${API_BASE}/users/login`, { email, password });
};

export const register = async (email, password) => {
  return axios.post(`${API_BASE}/users/register`, { email, password });
};

export const getTasks = async (token) => {
  return axios.get(`${API_BASE}/tasks`, { headers: { Authorization: `Bearer ${token}` } });
};

export const createTask = async (token, title) => {
  return axios.post(`${API_BASE}/tasks`, { title }, { headers: { Authorization: `Bearer ${token}` } });
};

export const updateTask = async (token, id, title) => {
  return axios.put(`${API_BASE}/tasks/${id}`, { title }, { headers: { Authorization: `Bearer ${token}` } });
};

export const deleteTask = async (token, id) => {
  return axios.delete(`${API_BASE}/tasks/${id}`, { headers: { Authorization: `Bearer ${token}` } });
};
