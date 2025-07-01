import api from "./api";

export const getUsers = async () => {
  const res = await api.get("/users");
  return res.data;
};

export const getUserById = async (id: number) => {
  const res = await api.get(`/users/${id}`);
  return res.data;
};

export const createUser = async (data: {
  email: string;
  password: string;
  role: "ADMIN" | "USER";
}) => {
  const res = await api.post("/users", data);
  return res.data;
};

export const updateUser = async (id: number, data: any) => {
  const res = await api.put(`/users/${id}`, data);
  return res.data;
};

export const deleteUser = async (id: number) => {
  const res = await api.delete(`/users/${id}`);
  return res.data;
};
