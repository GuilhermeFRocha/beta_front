import axios from "axios";
import { toast } from "react-toastify";
import create from "zustand";
import { StoreState, Transaction, User } from "../utils/interfaces";
const baseUrl = import.meta.env.VITE_API_URL;

const useStore = create<StoreState>((set) => ({
  user: null,
  getTransactions: async (userId: number) => {
    try {
      const response = await axios.get(`${baseUrl}/transaction/${userId}`);
      return response.data;
    } catch (error) {
      toast.error("Error fetching transactions");
      throw error;
    }
  },
  createTransaction: async (userId: number, transactionData: Transaction) => {
    try {
      const response = await axios.post(
        `${baseUrl}/transaction/${userId}`,
        transactionData
      );
      return response.data;
    } catch (error) {
      toast.error("Error fetching transactions");
      throw error;
    }
  },

  deleteTransaction: async (transactionId: number) => {
    try {
      const response = await axios.delete(
        `${baseUrl}/transaction/${transactionId}`
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
        const decodedToken: User = JSON.parse(atob(token.split(".")[1]));
        set(() => ({ user: decodedToken }));
      } catch (error) {
        toast.error("Erro ao decodificar o token");
      }
    }
  },
}));

export default useStore;
