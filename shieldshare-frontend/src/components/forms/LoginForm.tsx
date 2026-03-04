"use client"

import { useForm } from "react-hook-form"
import Link from "next/link"
import { Shield, AlertCircle } from "lucide-react"

import { useLogin } from "@/src/hooks/useLogin"
import { LoginInput } from "@/src/types/auth"

export function LoginForm() {

  const { register, handleSubmit } = useForm<LoginInput>()

  const { handleLogin, loading, error } = useLogin()

  return (
    <>
      {/* Header */}
      <div className="text-center mb-10">

        <div className="inline-flex items-center justify-center w-11 h-11 border border-border bg-surface mb-5">
          <Shield size={18} className="text-primary" />
        </div>

        <h1 className="font-display text-2xl font-bold tracking-tight text-foreground">
          Welcome back
        </h1>

        <p className="font-mono text-xs text-muted">
          Sign in to your ShieldShare account
        </p>

      </div>

      {/* Card */}
      <div className="card space-y-5">

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 border border-red-500/30 bg-red-500/5 px-3 py-2.5">
            <AlertCircle size={13} className="text-red-400 shrink-0" />
            <p className="font-mono text-xs text-red-400">
              {error}
            </p>
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="space-y-5"
        >

          {/* Email */}
          <div className="space-y-1.5">

            <label className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted">
              Email
            </label>

            <input
              placeholder="you@example.com"
              {...register("email")}
              className="input-base"
            />

          </div>

          {/* Password */}
          <div className="space-y-1.5">

            <div className="flex items-center justify-between">

              <label className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted">
                Password
              </label>

              <Link
                href="#"
                className="font-mono text-[10px] text-primary hover:opacity-70"
              >
                Forgot password?
              </Link>

            </div>

            <input
              type="password"
              placeholder="••••••••"
              {...register("password")}
              className="input-base"
            />

          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

        </form>

      </div>

      {/* Footer */}
      <p className="text-center font-mono text-xs text-muted mt-6">

        No account?{" "}
        
        <Link
          href="/register"
          className="text-primary hover:opacity-70"
        >
          Create one →
        </Link>

      </p>
    </>
  )
}