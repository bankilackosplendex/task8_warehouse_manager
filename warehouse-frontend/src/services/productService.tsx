import api from "./api.tsx";
import { Product } from "../types/ProductType.tsx";
import { getAccessToken } from "./authService.tsx";

// --- GET ALL PRODUCTS ---
export const getProducts = async () => {
  const token = getAccessToken();
  const res = await api.get("/products", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
  return res.data;
};

// --- GET A SPECIFIC PRODUCT BY ID ---
export const getProductById = async (id: number) => {
  const token = getAccessToken();
  const res = await api.get(`/products/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  return res.data;
};

// --- CREATE A NEW PRODUCT ---
export const createProduct = async (data: Product) => {
  const token = getAccessToken();
  const res = await api.post("/products", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  return res.data;
};

// --- UPDATE A PRODUCT BY ID ---
export const updateProduct = async (id: number, data: Product) => {
  const token = getAccessToken();
  const res = await api.patch(`/products/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  return res.data;
};

// --- DELETE A PRODUCT BY ID ---
export const deleteProduct = async (id: number) => {
  const token = getAccessToken();
  const res = await api.delete(`/products/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  return res.data;
};

// --- GET SPECIFIC PRODUCT'S WAREHOUSE BY ID ---
export const getProductWarehousesById = async (id:number) => {
  const token = getAccessToken();
  const res = await api.get(`/products/${id}/warehouses`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  return res.data;
}
