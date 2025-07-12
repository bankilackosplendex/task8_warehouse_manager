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

// --- REFRESH ACCESS TOKEN ---
export const refreshAccessToken = async () => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) throw new Error("Missing refresh token");

  const response = await api.post("/authentication/refresh-tokens", {
    refreshToken,
  });

  localStorage.setItem("accessToken", response.data.accessToken);
  localStorage.setItem("refreshToken", response.data.refreshToken);
  return response.data.accessToken;
};

