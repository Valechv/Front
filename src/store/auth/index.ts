import { create } from "zustand";

type User = {
  id: string;
  email: string;
  name: string;
  lastname: string;
  token: string;
};

interface AuthStore {
  isAuth: boolean;
  isLoading: boolean;
  user: User | null;
  logoutAction: () => void;
  loginAction: (user: User | null) => void;
}

export const useAuth = create<AuthStore>((set) => ({
  user: null,
  isAuth: false,
  isLoading: false,
  logoutAction: () => set({ isAuth: false, user: null }),
  loginAction: (user: User | null) => set({ isAuth: true, user }),
}));
