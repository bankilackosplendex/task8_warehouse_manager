import api from "./api.tsx";

export const getCompanies = async () => {
  const res = await api.get("/companies");
  return res.data;
};

export const getCompanyById = async (id: string) => {
  const res = await api.get(`/companies/${id}`);
  return res.data;
};

export const createCompany = async (data: {
  name: string;
}) => {
  const res = await api.post("/companies", data);
  return res.data;
};

export const updateCompany = async (id: string, data: any) => {
  const res = await api.put(`/companies/${id}`, data);
  return res.data;
};

export const deleteCompany = async (id: string) => {
  const res = await api.delete(`/companies/${id}`);
  return res.data;
};
