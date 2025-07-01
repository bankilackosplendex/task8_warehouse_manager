import api from "./api";

export const getProducts = async () => {
  const res = await api.get("/products");
  return res.data;
};

export const getProductById = async (id: number) => {
  const res = await api.get(`/products/${id}`);
  return res.data;
};

export const createProduct = async (data: {
  name: string;
  sku: string;
  unit: string;
}) => {
  const res = await api.post("/products", data);
  return res.data;
};

export const updateProduct = async (id: number, data: any) => {
  const res = await api.put(`/products/${id}`, data);
  return res.data;
};

export const deleteProduct = async (id: number) => {
  const res = await api.delete(`/products/${id}`);
  return res.data;
};
