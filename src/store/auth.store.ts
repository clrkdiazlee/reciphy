import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "@supabase/supabase-js";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthState = {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      loading: true,

      setUser: (user) => set({ user }),
      setLoading: (loading) => set({ loading }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user }),
      storage: {
        getItem: async (name) =>
          JSON.parse((await AsyncStorage.getItem(name)) || "null"),
        setItem: async (name, value) =>
          AsyncStorage.setItem(name, JSON.stringify(value)),
        removeItem: async (name) => AsyncStorage.removeItem(name),
      },
    }
  )
);
