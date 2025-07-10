import api from "./api.tsx";

// --- SIGN IN ---
export const login = async (credentials: {
  email: string;
  password: string;
}) => {
  const res = await api.post("/authentication/sign-in", credentials);
  return res.data;
};

// --- SIGN UP ---
export const register = async (userData: {
  email: string;
  password: string;
  role?: "USER";
}) => {
  const res = await api.post("/authentication/sign-up", userData);
  return res.data;
};

// --- GET ACCESS TOKEN ---
export function getAccessToken (): string | null {
  return localStorage.getItem("accessToken");
}

// --- GET REFRESH TOKEN ---
export function getRefreshToken (): string | null {
  return localStorage.getItem("refreshToken");
}
