import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.tsx";
import ErrorWindow from "../common/ErrorWindow.tsx";

const RequireAuth = ({ allowedRoles, children }) => {
  // --- USER INFO ---
  const { user } = useAuth();

  // NO USER -> navigate to login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // NO ADMIN ROLE -> display access denied error message
  if (!allowedRoles.includes(user.role)) {
    return <ErrorWindow text="Access Denied" statusCode={401}/>;
  }

  // ADMIN -> display childrem component
  return children;
};

export default RequireAuth;
