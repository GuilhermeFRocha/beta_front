import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

interface ProtectedRouteProps {
  children: ReactElement;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isTokenValid } = useAuth();

  if (!isTokenValid()) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
