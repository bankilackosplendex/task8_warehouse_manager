import api from "./api.tsx";
import { getAccessToken } from "./authService.tsx";

// --- GET ALL USERS ---
export const getUsers = async () => {
  const token = getAccessToken();
  const res = await api.get("/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
