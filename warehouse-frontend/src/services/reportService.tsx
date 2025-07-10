import api from "./api.tsx";
import { getAccessToken } from "./authService.tsx";

// --- DOWNLOAD A WAREHOUSE REPORT BY ID ---
export const downloadWarehouseReportById = async (warehouseId: number) => {
  const token = getAccessToken();
  const res = await api.get(`/reports/warehouse/${warehouseId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    responseType: "blob",
  });

  const blob = new Blob([res.data], { type: "application/pdf" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = `warehouse-report-${warehouseId}.pdf`;
  link.click();

  setTimeout(() => window.URL.revokeObjectURL(url), 1000);

  return res.data;
};

// --- GET A WAREHOUSE REPORT BY ID ---
export const getWarehouseReportById = async (warehouseId: number) => {
  const token = getAccessToken();
  const res = await api.get(`/reports/warehouse/${warehouseId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    responseType: "blob",
  });

  return res.data;
};