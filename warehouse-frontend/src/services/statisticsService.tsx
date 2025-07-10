import api from "./api.tsx";
import { getAccessToken } from "./authService.tsx";

// --- GET ALL STATISTICS ---
export const getStatisticByType = async (type: string) => {
  const token = getAccessToken();

  const res = await api.get(`/statistics/${type}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

// --- GET A COMPANY'S NAME BY ID ---
export async function getCompanyNameById(id: number) {
  const token = getAccessToken();

  const response = await api.get(`/companies/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.name;
}

// --- GET A PRODUCT'S NAME BY ID ---
export async function getProductNameById(id: number) {
  const token = getAccessToken();

  const response = await api.get(`/products/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.name;
}
