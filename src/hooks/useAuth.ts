import axios from "axios";
import { toast } from "react-toastify";
import create from "zustand";
import { AuthState, FormProps } from "../utils/interfaces";
const baseUrl = import.meta.env.VITE_API_URL;

const useAuth = create<AuthState>(() => ({
  registerUser: async (body: FormProps) => {
    try {
      const response = await axios.post(`${baseUrl}/register`, body);
      if (response.status === 201) {
        toast.success("Registration successful!");
        localStorage.setItem("token", response.data.token);
      }
    } catch (error) {
      toast.error("Already registered user!");
    }
  },
  loginUser: async (body: FormProps) => {
    try {
      const response = await axios.post(`${baseUrl}/login`, body);
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
      const decodedToken: { exp: number } = JSON.parse(
        atob(token.split(".")[1])
      );
      const currentTime = Date.now() / 1000;
      return decodedToken.exp > currentTime;
    } catch {
      return false;
    }
  },
}));

export default useAuth;
