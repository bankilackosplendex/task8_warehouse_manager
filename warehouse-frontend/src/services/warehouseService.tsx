import { Warehouse } from "../types/WarehouseType.tsx";
import api from "./api.tsx";
import { getAccessToken } from "./authService.tsx";

export const getWarehouses = async () => {
  const token = getAccessToken();
  const response = await api.get("/warehouses", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getWarehouseById = async (id: number) => {
  const token = getAccessToken();
  const response = await api.get(`/warehouses/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  return response.data;
};

export const createWarehouse = async (data: Warehouse) => {
  const token = getAccessToken();
  const response = await api.post("/warehouses", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  return response.data;
};

export const updateWarehouse = async (id: number, data: Warehouse) => {
  const token = getAccessToken();
  const response = await api.put(`/warehouses/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  return response.data;
};

export const deleteWarehouse = async (id: number) => {
  const token = getAccessToken();
  const response = await api.delete(`/warehouses/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  return response.data;
};

export const getWarehouseProductsById = async (warehouseId: number) => {
  const token = getAccessToken();
  const response = await api.get(`/warehouses/${warehouseId}/products`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  return response.data;
};
