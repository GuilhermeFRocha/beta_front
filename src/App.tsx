import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import useAuthStore from "./hooks/useAuth";
import { ToastContainer } from 'react-toastify';
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { DashboardPage } from "./pages/Dashboard";
import { ProfilePage } from "./pages/ProfilePage";
import 'react-toastify/dist/ReactToastify.css';
import './index.css'

export default function App() {
  const { isAuthenticated, checkAuthStatus } = useAuthStore();

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

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
        <Route
          path="/"
          element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />}
        />
      </Routes>
      <ToastContainer />
    </Router>
  );
}
