import { useAuth } from "./useAuth.tsx";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    navigate("/");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
  };

  return logout;
};
