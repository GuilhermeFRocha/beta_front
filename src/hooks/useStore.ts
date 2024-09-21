import axios from "axios";
import { toast } from "react-toastify";
import create from "zustand";

interface User {
  id: number;
  email: string;
  role: string;
}

interface StoreState {
  user: User | null;
  registerUser: (body: any) => Promise<void>;
  loginUser: (body: any) => Promise<void>;
  logout: () => void;
  getToken: () => string | null;
  isTokenValid: () => boolean;
  getTransactions: (userId: number) => Promise<any>;
  fetchUserFromToken: () => void;
  createTransaction: (userId: any, transactionData: any) => Promise<any>;
}

interface FormProps {
  email: string;
  password: string;
}

const useAuthStore = create<StoreState>((set) => ({
  user: null,
  registerUser: async (body: FormProps) => {
    try {
      const response = await axios.post("http://localhost:8000/register", body);
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
  getTransactions: async (userId: number) => {
    try {
      const response = await axios.get(
        "http://localhost:8000/transaction/" + userId
      );
      return response.data;
    } catch (error) {
      toast.error("Error fetching transactions");
      throw error;
    }
  },
  createTransaction: async (userId: number, transactionData: any) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/transaction/" + userId,
        transactionData
      );
      return response.data;
    } catch (error) {
      toast.error("Error fetching transactions");
      throw error;
    }
  },

  fetchUserFromToken: () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken: any = JSON.parse(atob(token.split(".")[1]));
        set(() => ({ user: decodedToken }));
      } catch (error) {
        toast.error("Erro ao decodificar o token");
      }
    }
  },
}));

export default useAuthStore;
