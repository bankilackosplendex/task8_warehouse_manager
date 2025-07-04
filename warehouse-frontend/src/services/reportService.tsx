import { Report } from "../types/ReportType.tsx";
import api from "./api.tsx";
import { getAccessToken } from "./authService.tsx";

export const getReports = async () => {
  const token = getAccessToken();
  const res = await api.get("/reports", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
  return res.data;
};

export const getReportById = async (id: number) => {
  const token = getAccessToken();
  const res = await api.get(`/reports/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  return res.data;
};

export const createReport = async (data: Report) => {
  const token = getAccessToken();
  const res = await api.post("/reports", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  return res.data;
};

export const updateReport = async (id: number, data: Report) => {
  const token = getAccessToken();
  const res = await api.put(`/reports/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  return res.data;
};

export const deleteReport = async (id: number) => {
  const token = getAccessToken();
  const res = await api.delete(`/reports/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  return res.data;
};
