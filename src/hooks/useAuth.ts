import axios from "axios";
import { toast } from "react-toastify";
import create from "zustand";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface AuthState {
  registerUser: (body: any) => Promise<void>;
  loginUser: (body: any) => Promise<void>;
  logout: () => void;
  getToken: () => string | null;
  isTokenValid: () => boolean;
}

const useAuthStore = create<AuthState>((set) => ({
  registerUser: async (body) => {
    try {
      const response = await axios.post("http://localhost:8000/users", body);
      if (response.status === 201) {
        toast.success("Registration successful!");
        localStorage.setItem("token", response.data.token);
      }
    } catch (error) {
      toast.error("Already registered user!");
    }
  },
  loginUser: async (body: any) => {
    try {
      const response = await axios.post("http://localhost:8000/login", body);
      if (response.status === 200) {
        toast.success("Login successful!");
        localStorage.setItem("token", response.data.token);
      }
    } catch (error) {
      toast.error("Login Failed!");
    }
  },
  logout: () => {
    localStorage.removeItem("token");
  },
  getToken: () => localStorage.getItem("token"),
  isTokenValid: () => {
    const token = localStorage.getItem("token");
    if (!token) return false;

    try {
      const decodedToken: any = JSON.parse(atob(token.split(".")[1]));
      const currentTime = Date.now() / 1000;
      return decodedToken.exp > currentTime;
    } catch {
      return false;
    }
  },
}));

export default useAuthStore;
