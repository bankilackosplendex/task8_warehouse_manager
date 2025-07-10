import axios from "axios";

// --- BACKEND BASE URL ---
const URL = "http://localhost:4000/";

// --- BACKEND API  ---
const api = axios.create({
  baseURL: URL
});

export default api;
