import { create } from "zustand"
import { AuthState } from "../types/auth.types";

export const useAuthStore = create<AuthState>((set) => ({
  token: null,

  login: (token) => {
    localStorage.setItem("token", token)
    set({ token })
  },

  logout: () => {
    localStorage.removeItem("token")
    set({ token: null })
  },
}))