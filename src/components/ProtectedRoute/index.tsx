import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "../../hooks/useStore";

interface ProtectedRouteProps {
  children: ReactElement;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isTokenValid } = useAuthStore();

  if (!isTokenValid()) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
