import React, { createContext, useState, useEffect } from "react";
import { User } from "../types/UserType";
import { jwtDecode } from "jwt-decode";
import { DecodedAccessToken } from "../types/DecodedAccessTokenType";

export const AuthContext = createContext<{
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
} | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const decoded = jwtDecode<DecodedAccessToken>(token);
        setUser({ id: +decoded.sub, role: decoded.role });
      } catch (e) {
        console.error("Invalid token:", e);
        setUser(null);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
