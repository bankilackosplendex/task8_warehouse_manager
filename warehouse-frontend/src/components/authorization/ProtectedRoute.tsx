import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.tsx";

const RequireAuth = ({ allowedRoles, children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <h2>Access Denied</h2>;
  }

  return children;
};

export default RequireAuth;
