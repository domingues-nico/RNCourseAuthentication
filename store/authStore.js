import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  token: null,
  isAuthenticated: false,
  authenticate: (token) => {
    set({ token: token, isAuthenticated: true });
    AsyncStorage.setItem("token", token);
  },
  logout: () => {
    set({ token: null, isAuthenticated: false });
    AsyncStorage.removeItem('token');
},
  retrieveAuth: async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      set({ token: token, isAuthenticated: true });
    }
  },
}));
