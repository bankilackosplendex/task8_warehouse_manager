import { Navigate, Route } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.tsx";
import { Role } from "../../enums/UserRoleEnum.tsx";
import { JSX, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext.tsx";

type ProtectedRouteProps = {
  allowedRoles: Role[];
  element: JSX.Element;
  path: string;
};

export const ProtectedRoute = ({ allowedRoles, element, path }: ProtectedRouteProps) => {
  const { user } = useAuth();

  if (!user) return <Route path={path} element={<Navigate to="/login" />} />;
  if (!allowedRoles.includes(user.role)) return <Route path={path} element={<h2>Access Denied</h2>} />;

  return <Route path={path} element={element} />;
};
