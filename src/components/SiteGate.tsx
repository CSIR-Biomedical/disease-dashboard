import { useState, FormEvent } from "react"
import logo from "@/assets/logo.webp"

const GATE_PASSWORD = "csir2025"

interface SiteGateProps {
  onUnlock: () => void
}

export function SiteGate({ onUnlock }: SiteGateProps) {
  const [value, setValue] = useState("")
  const [error, setError] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (value === GATE_PASSWORD) {
      onUnlock()
    } else {
      setError(true)
      setValue("")
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo + title */}
        <div className="flex flex-col items-center mb-8 gap-4">
          <img src={logo} alt="CSIR Logo" className="w-20 h-20 object-contain" />
          <div className="text-center">
            <h1 className="text-lg font-bold text-foreground">CSIR Disease Dashboard</h1>
            <p className="text-xs text-muted-foreground mt-1">
              Council for Scientific and Industrial Research · Ghana
            </p>
          </div>
        </div>

        {/* Gate form */}
        <form onSubmit={handleSubmit} className="bg-card border rounded-xl p-6 space-y-4 shadow-sm">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1.5">
              Access Password
            </label>
            <input
              id="password"
              type="password"
              value={value}
              onChange={e => { setValue(e.target.value); setError(false) }}
              placeholder="Enter password"
              autoFocus
              className={`w-full px-3 py-2 rounded-md border bg-background text-sm text-foreground
                placeholder:text-muted-foreground outline-none transition-colors
                focus:ring-2 focus:ring-primary/50
                ${error ? "border-red-500 focus:ring-red-500/50" : "border-border"}`}
            />
            {error && (
              <p className="mt-1.5 text-xs text-red-500">Incorrect password. Please try again.</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium
              hover:opacity-90 transition-opacity"
          >
            Enter Dashboard
          </button>
        </form>

        <p className="text-center text-xs text-muted-foreground mt-6">
          NTD &amp; Infectious Disease Surveillance · Preview
        </p>
      </div>
    </div>
  )
}
