import { GridBackground } from "@/src/components/background/gridbackground"

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-background overflow-hidden">

      <GridBackground />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-16">

        <div className="w-full max-w-sm">
          {children}
        </div>

      </div>

    </div>
  )
}