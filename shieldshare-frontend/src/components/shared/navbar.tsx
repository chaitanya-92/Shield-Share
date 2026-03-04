"use client"

import Link from "next/link"
import { Shield } from "lucide-react"
import { ThemeToggle } from "@/src/components/shared/theme-toggle"

export function Navbar() {
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

        {/* Center Nav */}
        <div className="hidden md:flex items-center gap-8">
          {["Docs", "Security", "Pricing", "About"].map((item) => (
            <Link key={item} href="#" className="nav-link">
              {item}
            </Link>
          ))}
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">

          <ThemeToggle />

          <Link href="/login" className="nav-link px-3 py-1.5">
            Login
          </Link>

          <Link href="/dashboard">
            <button className="btn-primary py-2 px-4 flex items-center gap-2 normal-case tracking-wider text-xs">
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path d="M5.5 1v9M1 5.5l4.5-4.5 4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Upload
            </button>
          </Link>

        </div>
      </div>
    </nav>
  )
}