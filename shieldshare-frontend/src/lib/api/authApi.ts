import api from "@/src/lib/axios"

import { LoginInput, RegisterInput } from "@/src/types/auth"

export const loginUser = async (data: LoginInput) => {
  const res = await api.post("/auth/login", data)
  return res.data
}

export const registerUser = async (data: RegisterInput) => {
  const res = await api.post("/auth/register", data)
  return res.data
}