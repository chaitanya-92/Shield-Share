import Link from "next/link"
import { Shield } from "lucide-react"

const links = {
  Product:   ["Features", "Security", "Pricing", "Changelog"],
  Developers:["Docs", "API Reference", "SDKs", "Status"],
  Company:   ["About", "Blog", "Privacy", "Terms"],
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">

      {/* Main footer grid */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-10">

        {/* Brand col */}
        <div className="col-span-2 md:col-span-1 space-y-4">
          <div className="flex items-center gap-2 font-mono text-sm font-semibold tracking-[0.12em] uppercase text-foreground">
            <Shield size={15} className="text-primary" />
            ShieldShare
          </div>
          <p className="font-mono text-[11px] leading-relaxed text-muted max-w-[180px]">
            End-to-end encrypted file sharing. Zero knowledge. Built for privacy.
          </p>

          {/* Encryption badge */}
          <div className="inline-flex items-center gap-2 border border-border px-3 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="font-mono text-[10px] tracking-widest uppercase text-muted">
              256-bit AES
            </span>
          </div>
        </div>

        {/* Link cols */}
        {Object.entries(links).map(([group, items]) => (
          <div key={group} className="space-y-4">
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-foreground/30">
              {group}
            </p>
            <ul className="space-y-3">
              {items.map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="font-mono text-xs text-muted hover:text-foreground transition-colors duration-150"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-mono text-[11px] text-foreground/20 tracking-wide">
            © {new Date().getFullYear()} ShieldShare. All rights reserved.
          </p>
          <p className="font-mono text-[11px] text-foreground/20 tracking-wide">
            Secure file sharing built with privacy in mind.
          </p>
        </div>
      </div>

    </footer>
  )
}