import React, { createContext, useState, useEffect } from "react";
import { User } from "../types/UserType";
import { jwtDecode } from "jwt-decode";
import { DecodedAccessToken } from "../types/DecodedAccessTokenType.tsx";
import { refreshAccessToken } from "../services/authService.tsx";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext<{
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
} | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      try {
        const decoded = jwtDecode<DecodedAccessToken>(token);
        if (Date.now() >= decoded.exp * 1000) {
          refreshAccessToken()
            .then((newToken) => {
              const decoded = jwtDecode<DecodedAccessToken>(newToken);
              setUser({ id: +decoded.sub, role: decoded.role });
            })
            .catch(() => {
              setUser(null);
              localStorage.removeItem("accessToken");
              localStorage.removeItem("refreshToken");
              window.location.href = "/login";
            });
        } else {
          setUser({ id: +decoded.sub, role: decoded.role });
        }
      } catch (e) {
        console.error("Token error:", e);
        setUser(null);
      }
    }

    setLoading(false);
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
