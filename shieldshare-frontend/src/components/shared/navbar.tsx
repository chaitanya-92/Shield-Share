"use client"

import Link from "next/link"
import { Shield } from "lucide-react"
import { useRouter } from "next/navigation"

import { useAuthStore } from "@/src/store/authStore"
import { ConfirmationModal } from "@/src/components/shared/confirmation-modal"
import { notify } from "@/src/lib/toast"

export function Navbar() {

  const router = useRouter()

  const token = useAuthStore((state) => state.token)
  const logout = useAuthStore((state) => state.logout)
  const hasHydrated = useAuthStore((state) => state.hasHydrated)

  const handleLogout = () => {

    logout()

    notify.success("Logged out successfully")

    router.push("/")
  }

  if (!hasHydrated) {
    return (
      <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center">
          <div className="flex items-center gap-2 font-mono text-sm font-semibold tracking-[0.12em] uppercase">
            <Shield size={16} className="text-primary" />
            ShieldShare
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-xl">

      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-mono text-sm font-semibold tracking-[0.12em] uppercase text-foreground hover:opacity-80 transition-opacity"
        >
          <Shield size={16} className="text-primary" />
          ShieldShare
          <span className="w-[2px] h-3 bg-primary animate-blink" />
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-3">

          {!token ? (
            <>
              <Link href="/login" className="nav-link px-3 py-1.5">
                Login
              </Link>

              <Link href="/register" className="nav-link px-3 py-1.5">
                Register
              </Link>
            </>
          ) : (
            <>
              <Link href="/dashboard">
                <button className="btn-primary py-2 px-4 flex items-center gap-2 text-xs">
                  Upload
                </button>
              </Link>

              <ConfirmationModal
                trigger={
                  <button className="nav-link px-3 py-1.5">
                    Logout
                  </button>
                }
                title="Logout"
                description="Are you sure you want to logout from ShieldShare?"
                confirmText="Logout"
                onConfirm={handleLogout}
              />
            </>
          )}

        </div>

      </div>

    </nav>
  )
}