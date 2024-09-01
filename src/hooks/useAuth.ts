import axios from "axios";
import create from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  login: (body: any) => void;
  logout: () => void;
  checkAuthStatus: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  login: async (body) => {
    try {
      const response = await axios.post("http://localhost:8000/users", body);

      if (response.status === 201) {
        set({ isAuthenticated: true });
      }
    } catch (error) {
      console.log(error);
      set({ isAuthenticated: false });
    }
  },
  logout: () => {},
  checkAuthStatus: () => {},
}));

export default useAuthStore;
