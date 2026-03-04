"use client"

import { useForm } from "react-hook-form"
import Link from "next/link"
import { Shield, AlertCircle } from "lucide-react"

import { useRegister } from "@/src/hooks/useRegister"
import { RegisterInput } from "@/src/types/auth"

export function RegisterForm() {

  const { register: formRegister, handleSubmit } = useForm<RegisterInput>()

  const { register, loading, error } = useRegister()

  return (
    <>
      <div className="text-center mb-10">

        <div className="inline-flex items-center justify-center w-11 h-11 border border-border bg-surface mb-5">
          <Shield size={18} className="text-primary" />
        </div>

        <h1 className="font-display text-2xl font-bold tracking-tight">
          Create account
        </h1>

        <p className="font-mono text-xs text-muted">
          Start sharing securely with ShieldShare
        </p>

      </div>

      <div className="card space-y-5">

        {error && (
          <div className="flex items-center gap-2 border border-red-500/30 bg-red-500/5 px-3 py-2.5">
            <AlertCircle size={13} className="text-red-400 shrink-0" />
            <p className="font-mono text-xs text-red-400">{error}</p>
          </div>
        )}

        <form
          onSubmit={handleSubmit(register)}
          className="space-y-5"
        >

          <div className="space-y-1.5">

            <label className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted">
              Email
            </label>

            <input
              placeholder="you@example.com"
              {...formRegister("email")}
              className="input-base"
            />

          </div>

          <div className="space-y-1.5">

            <label className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted">
              Password
            </label>

            <input
              type="password"
              placeholder="••••••••"
              {...formRegister("password")}
              className="input-base"
            />

          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full justify-center disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>

        </form>

        <p className="font-mono text-[10px] text-muted/50 text-center pt-1 flex items-center justify-center gap-1.5">
          <Shield size={10} className="text-primary" />
          Your data is encrypted end-to-end
        </p>

      </div>

      {/* Login link */}
      <p className="text-center font-mono text-xs text-muted mt-6">

        Already have an account?{" "}
        
        <Link
          href="/login"
          className="text-primary hover:opacity-70"
        >
          Sign in →
        </Link>

      </p>
    </>
  )
}