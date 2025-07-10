import { Company } from "../types/CompanyType.tsx";
import api from "./api.tsx";
import { getAccessToken } from "./authService.tsx";

export const getCompanies = async () => {
  const token = getAccessToken();
  const res = await api.get("/companies", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getCompanyById = async (id: number) => {
  const token = getAccessToken();
  const res = await api.get(`/companies/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const createCompany = async (data: Company) => {
  const token = getAccessToken();
  const res = await api.post("/companies", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const updateCompany = async (id: number, data: Company) => {
  const token = getAccessToken();
  const res = await api.patch(`/companies/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const deleteCompany = async (id: number) => {
  const token = getAccessToken();
  const res = await api.delete(`/companies/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
