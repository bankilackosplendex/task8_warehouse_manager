import api from "./api.tsx";
import { getAccessToken } from "./authService.tsx";

export const getStatisticByType = async (type: string) => {
  const token = getAccessToken();

  const res = await api.get(`/statistics/${type}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export async function getCompanyNameById(id: number) {
  const token = getAccessToken();

  const response = await api.get(`/companies/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.name;
}

export async function getProductNameById(id: number) {
  const token = getAccessToken();

  const response = await api.get(`/products/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.name;
}
