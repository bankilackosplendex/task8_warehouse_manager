import { StockMovement } from "../types/StockMovementType.tsx";
import api from "./api.tsx";
import { getAccessToken } from "./authService.tsx";

export const getStockMovements = async () => {
  const token = getAccessToken();
  const res = await api.get("/stockmovements", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getStockMovementById = async (id: string) => {
  const token = getAccessToken();
  const res = await api.get(`/stockmovements/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const createStockMovement = async (data: StockMovement) => {
  const token = getAccessToken();
  const res = await api.post("/stockmovements", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const updateStockMovement = async (id: string, data: StockMovement) => {
  const token = getAccessToken();
  const res = await api.put(`/stockmovements/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const deleteStockMovement = async (id: string) => {
  const token = getAccessToken();
  const res = await api.delete(`/stockmovements/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
