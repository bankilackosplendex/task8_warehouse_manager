import api from "./api.tsx";
import { Warehouse } from "../types/WarehouseType.tsx";
import { getAccessToken } from "./authService.tsx";

// --- GET ALL WAREHOUSES ---
export const getWarehouses = async () => {
  const token = getAccessToken();
  const response = await api.get("/warehouses", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// --- GET A SPECIFIC WAREHOUSE BY ID ---
export const getWarehouseById = async (id: number) => {
  const token = getAccessToken();
  const response = await api.get(`/warehouses/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  return response.data;
};

// --- CREATE A NEW WAREHOUSE ---
export const createWarehouse = async (data: Warehouse) => {
  const token = getAccessToken();
  const response = await api.post("/warehouses", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  return response.data;
};

// --- UPDATE A WAREHOUSE BY ID ---
export const updateWarehouse = async (id: number, data: Warehouse) => {
  const token = getAccessToken();
  const response = await api.patch(`/warehouses/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  return response.data;
};

// --- DELETE A WAREHOUSE BY ID ---
export const deleteWarehouse = async (id: number) => {
  const token = getAccessToken();
  const response = await api.delete(`/warehouses/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  return response.data;
};

// --- GET SPECIFIC WAREHOUSE'S PRODUCTS BY ID ---
export const getWarehouseProductsById = async (warehouseId: number) => {
  const token = getAccessToken();
  const response = await api.get(`/warehouses/${warehouseId}/products`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  return response.data;
};
