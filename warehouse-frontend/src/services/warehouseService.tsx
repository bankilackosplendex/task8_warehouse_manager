import api from "./api.tsx";

export const getWarehouses = async () => {
  const response = await api.get("/warehouses");
  return response.data;
};

export const getWarehouseById = async (id: number) => {
  const response = await api.get(`/warehouses/${id}`);
  return response.data;
};

export const createWarehouse = async (data: {
  name: string;
  address: string;
  description?: string;
}) => {
  const response = await api.post("/warehouses", data);
  return response.data;
};

export const updateWarehouse = async (id: number, data: any) => {
  const response = await api.put(`/warehouses/${id}`, data);
  return response.data;
};

export const deleteWarehouse = async (id: number) => {
  const response = await api.delete(`/warehouses/${id}`);
  return response.data;
};
