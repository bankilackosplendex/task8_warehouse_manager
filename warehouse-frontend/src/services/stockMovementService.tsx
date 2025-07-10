import api from "./api.tsx";
import { StockMovement } from "../types/StockMovementType.tsx";
import { getAccessToken } from "./authService.tsx";

// --- GET ALL MOVEMENTS ---
export const getStockMovements = async () => {
  const token = getAccessToken();
  const res = await api.get("/stockmovements", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// --- GET A SPECIFIC MOVEMENT BY ID ---
export const getStockMovementById = async (id: number) => {
  const token = getAccessToken();
  const res = await api.get(`/stockmovements/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// --- CREATE A NEW MOVEMENT ---
export const createStockMovement = async (data: StockMovement) => {
  const token = getAccessToken();
  const res = await api.post("/stockmovements", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// --- UPDATE A MOVEMENT BY ID ---
export const updateStockMovement = async (id: number, data: StockMovement) => {
  const token = getAccessToken();
  const res = await api.patch(`/stockmovements/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// --- DELETE A MOVEMENT BY ID ---
export const deleteStockMovement = async (id: number) => {
  const token = getAccessToken();
  const res = await api.delete(`/stockmovements/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
