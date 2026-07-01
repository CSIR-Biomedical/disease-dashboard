import { useState, FormEvent } from "react"
import { Eye, EyeOff } from "lucide-react"
import logo from "@/assets/logo.webp"

const GATE_PASSWORD = import.meta.env.VITE_GATE_PASSWORD ?? "csir2025"

interface SiteGateProps {
  onUnlock: () => void
}

export function SiteGate({ onUnlock }: SiteGateProps) {
  const [value, setValue] = useState("")
  const [error, setError] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

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
            <h1 className="text-lg font-bold text-foreground leading-tight">CSIR - Health Research and Innovation Center</h1>
            <p className="text-[11px] text-muted-foreground mt-1.5">
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
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={value}
                onChange={e => { setValue(e.target.value); setError(false) }}
                placeholder="Enter password"
                autoFocus
                className={`w-full px-3 py-2 pr-9 rounded-md border bg-background text-sm text-foreground
                  placeholder:text-muted-foreground outline-none transition-colors
                  focus:ring-2 focus:ring-primary/50
                  ${error ? "border-red-500 focus:ring-red-500/50" : "border-border"}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(s => !s)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
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
