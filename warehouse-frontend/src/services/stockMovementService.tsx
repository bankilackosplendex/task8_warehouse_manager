import api from "./api.tsx";

export const getStockMovements = async () => {
  const res = await api.get("/stockmovements");
  return res.data;
};

export const getStockMovementById = async (id: string) => {
  const res = await api.get(`/stockmovements/${id}`);
  return res.data;
};

export const createStockMovement = async (data: {
  date: string;
  productId: string;
  warehouseId: string;
  quantity: number;
  movementType: "import" | "export" | string;
  companyId: string;
}) => {
  const res = await api.post("/stockmovements", data);
  return res.data;
};

export const updateStockMovement = async (id: string, data: any) => {
  const res = await api.put(`/stockmovements/${id}`, data);
  return res.data;
};

export const deleteStockMovement = async (id: string) => {
  const res = await api.delete(`/stockmovements/${id}`);
  return res.data;
};
