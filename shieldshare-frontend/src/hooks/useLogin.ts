"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { loginUser } from "@/src/lib/api/authApi"
import { useAuthStore } from "@/src/store/authStore"
import { LoginInput } from "@/src/types/auth"

export function useLogin() {

  const router = useRouter()
  const login = useAuthStore((state) => state.login)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (data: LoginInput) => {

    try {

      setError("")
      setLoading(true)

      const res = await loginUser(data)

      login(res.token)

      router.push("/dashboard")

    } catch {

      setError("Invalid email or password.")

    } finally {

      setLoading(false)

    }

  }

  return { handleLogin, loading, error }
}