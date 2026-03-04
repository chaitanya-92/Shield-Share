import { GridBackground } from "@/src/components/background/gridbackground"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">

      <GridBackground />

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-16">
        {children}
      </div>

    </div>
  )
}