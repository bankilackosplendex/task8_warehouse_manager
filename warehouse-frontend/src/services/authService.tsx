import api from "./api.tsx";

export const login = async (credentials: {
  email: string;
  password: string;
}) => {
  const res = await api.post("/authentication/sign-in", credentials);
  return res.data;
};

export const register = async (userData: {
  email: string;
  password: string;
  role?: "USER";
}) => {
  const res = await api.post("/authentication/sign-up", userData);
  return res.data;
};
