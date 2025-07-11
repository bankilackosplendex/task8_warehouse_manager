import axios from "axios";
import { refreshAccessToken, getAccessToken } from "../services/authService.tsx";
import { jwtDecode } from "jwt-decode";

// --- BACKEND BASE URL ---
const URL = "http://localhost:4000/";

// --- BACKEND API  ---
const api = axios.create({
  baseURL: URL
});

// --- CHECK IF TOKEN IS EXPIRED ---
function isTokenExpired(token: string): boolean {
  try {
    const { exp } = jwtDecode(token);
    return !exp || Date.now() >= exp * 1000;
  } catch {
    return true;
  }
}

// --- REQUEST INTERCEPTOR: ADD ACCESS TOKEN ---
api.interceptors.request.use(async (config) => {
  const accessToken = getAccessToken();

  if (accessToken && !isTokenExpired(accessToken)) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

// --- RESPONSE INTERCEPTOR: HANDLE 401 & REFRESH TOKEN ---
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

api.interceptors.response.use(
  res => res,
  async (err) => {
    const originalRequest = err.config;

    // If 401 error and we haven't retried yet
    if (err.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((e) => {
            return Promise.reject(e);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newToken = await refreshAccessToken();
        localStorage.setItem("accessToken", newToken);

        processQueue(null, newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(err);
  }
);

export default api;
