import api from "./api.tsx";
import { Company } from "../types/CompanyType.tsx";
import { getAccessToken } from "./authService.tsx";

// --- GET ALL COMPANIES ---
export const getCompanies = async () => {
  const token = getAccessToken();
  const res = await api.get("/companies", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// --- GET A SPECIFIC COMPANY BY ID ---
export const getCompanyById = async (id: number) => {
  const token = getAccessToken();
  const res = await api.get(`/companies/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// --- CREATE A NEW COMPANY ---
export const createCompany = async (data: Company) => {
  const token = getAccessToken();
  const res = await api.post("/companies", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// --- UPDATE A COMPANY BY ID ---
export const updateCompany = async (id: number, data: Company) => {
  const token = getAccessToken();
  const res = await api.patch(`/companies/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};


// --- DELETE A COMPANY BY ID ---
export const deleteCompany = async (id: number) => {
  const token = getAccessToken();
  const res = await api.delete(`/companies/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
