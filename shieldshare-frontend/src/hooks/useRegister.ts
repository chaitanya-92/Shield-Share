"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { registerUser } from "@/src/lib/api/authApi"
import { RegisterInput } from "@/src/types/auth"

export function useRegister() {

  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const register = async (data: RegisterInput) => {

    try {

      setError("")
      setLoading(true)

      await registerUser(data)

      router.push("/login")

    } catch (err) {

      setError("Registration failed. Please try again.")

    } finally {

      setLoading(false)

    }

  }

  return { register, loading, error }
}