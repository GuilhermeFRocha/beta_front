import axios from "axios";
import { toast } from "react-toastify";
import create from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  registerUser: (body: any) => Promise<void>;
  logout: () => void;
  checkAuthStatus: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  registerUser: async (body) => {
    try {
      const response = await axios.post("http://localhost:8000/users", body);

      if (response.status === 201) {
        toast.success("Registration successful!");
        set({ isAuthenticated: true });
      }
    } catch (error) {
      toast.error("Already registered user!");
      set({ isAuthenticated: false });
    }
  },
  logout: () => {},
  checkAuthStatus: () => {},
}));

export default useAuthStore;
