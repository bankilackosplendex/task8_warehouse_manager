import { Product } from "../types/ProductType.tsx";
import api from "./api.tsx";
import { getAccessToken } from "./authService.tsx";

export const getProducts = async () => {
  const token = getAccessToken();
  const res = await api.get("/products", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
  return res.data;
};

export const getProductById = async (id: number) => {
  const token = getAccessToken();
  const res = await api.get(`/products/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  return res.data;
};

export const createProduct = async (data: Product) => {
  const token = getAccessToken();
  const res = await api.post("/products", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  return res.data;
};

export const updateProduct = async (id: number, data: Product) => {
  const token = getAccessToken();
  const res = await api.patch(`/products/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  return res.data;
};

export const deleteProduct = async (id: number) => {
  const token = getAccessToken();
  const res = await api.delete(`/products/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  return res.data;
};

export const getProductWarehousesById = async (id:number) => {
  const token = getAccessToken();
  const res = await api.get(`/products/${id}/warehouses`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  return res.data;
}
