import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.tsx";
import PopUpWindow from "../common/PopUpWindow.tsx";
import ErrorWindow from "../common/ErrorWindow.tsx";

const RequireAuth = ({ allowedRoles, children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <ErrorWindow text="Access Denied" statusCode={401}/>;
  }

  return children;
};

export default RequireAuth;
