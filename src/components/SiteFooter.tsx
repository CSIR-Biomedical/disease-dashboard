import { Link } from "react-router-dom"
import logoImg from "@/assets/logo.webp"

const QUICK_LINKS = [
  { label: "About the Center", to: "/about" },
  { label: "Research Areas", to: "/#research" },
  { label: "Publications", to: "/publications" },
  { label: "Researcher Profiles", to: "/researchers" },
]

const PLATFORM_LINKS = [
  { label: "Epidemiology Dashboard", to: "/dashboard" },
  { label: "Disease Surveillance", to: "/dashboard/disease?id=malaria" },
  { label: "Publications Library", to: "/publications" },
]

export default function SiteFooter() {
  return (
    <footer className="bg-[#1a153a] text-slate-400 py-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <Link to="/" className="flex items-start gap-3 mb-4 w-fit">
            <img
              src={logoImg}
              alt=""
              className="w-8 h-8 object-contain bg-white rounded-full p-1 shrink-0 mt-0.5"
            />
            <div>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-1">
                A CSIR center
              </p>
              <span className="font-['Merriweather',serif] font-bold text-lg text-white leading-snug block">
                Center for Health Research and Innovation
              </span>
            </div>
          </Link>
          <p className="text-sm leading-relaxed max-w-sm mb-2">
            The Center for Health Research and Innovation advances evidence-based public health
            through rigorous, data-driven research and epidemiological excellence.
          </p>
          <p className="text-xs text-slate-500 max-w-sm">
            Council for Scientific and Industrial Research (CSIR)
          </p>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">
            Quick Links
          </h4>
          <ul className="space-y-3 text-sm">
            {QUICK_LINKS.map((link) => (
              <li key={link.label}>
                <Link to={link.to} className="hover:text-primary transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">
            Data Platforms
          </h4>
          <ul className="space-y-3 text-sm">
            {PLATFORM_LINKS.map((link) => (
              <li key={link.label}>
                <Link to={link.to} className="hover:text-primary transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-white/10 text-xs flex flex-col md:flex-row justify-between items-center gap-4">
        <p>
          © {new Date().getFullYear()} CSIR Center for Health Research and Innovation. All rights
          reserved.
        </p>
        <div className="flex space-x-6">
          <Link to="/about" className="hover:text-white transition-colors">
            About
          </Link>
          <Link to="/publications" className="hover:text-white transition-colors">
            Publications
          </Link>
          <Link to="/researchers" className="hover:text-white transition-colors">
            Profiles
          </Link>
        </div>
      </div>
    </footer>
  )
}
