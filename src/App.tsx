import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import useAuthStore from "./hooks/useAuth";
import { Register } from "./pages/Register";
import { useEffect } from "react";
import { DashboardPage } from "./pages/Dashboard";
import { ProfilePage } from "./pages/ProfilePage";
import './index.css'

export default function App() {
  const { isAuthenticated, checkAuthStatus } = useAuthStore();

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  return (
    <Router>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/register" element={<Register />} />

        {/* Rotas privadas */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? <DashboardPage /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/profile"
          element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />}
        />

        {/* Redirecionamento padrão */}
        <Route
          path="/"
          element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />}
        />
      </Routes>
    </Router>
  );
}
