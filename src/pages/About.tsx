import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

const FOCUS_AREAS = [
  {
    title: "Surveillance",
    body: "Real-time monitoring of disease patterns and outbreak risk across partner districts.",
  },
  {
    title: "Discovery",
    body: "Laboratory and translational research across parasitology, immunology, pharmacology, and microbiology.",
  },
  {
    title: "Partnership",
    body: "Aligned with ministries of health and academic collaborators to scale what works.",
  },
]

export default function About() {
  const navigate = useNavigate()

  return (
    <div className="space-y-16 max-w-4xl">
      <header>
        <p className="text-sm font-bold tracking-widest text-primary uppercase mb-3">About the Center</p>
        <h1 className="font-['Merriweather',serif] text-3xl md:text-5xl font-bold text-secondary leading-tight mb-5">
          Science in service of public health
        </h1>
        <div className="w-16 h-1 bg-primary mb-8" />
        <p className="text-lg text-slate-600 leading-relaxed">
          The CSIR Center for Health Research and Innovation advances evidence-based responses to
          infectious and chronic disease across the region. Our teams combine laboratory science,
          epidemiology, and digital surveillance to strengthen national health systems.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="font-['Merriweather',serif] text-2xl font-bold text-secondary">Our mission</h2>
        <p className="text-base text-slate-600 leading-relaxed">
          We work with ministries of health, district partners, and academic collaborators to turn
          research into policy guidance, community interventions, and open scientific insight — so
          discoveries move from bench to population impact.
        </p>
        <p className="text-base text-slate-600 leading-relaxed">
          Through integrated surveillance platforms and field-linked research programs, the Center
          supports decision-makers with timely, rigorous evidence when public health stakes are highest.
        </p>
      </section>

      <section>
        <h2 className="font-['Merriweather',serif] text-2xl font-bold text-secondary mb-6">How we work</h2>
        <div className="grid sm:grid-cols-3 gap-8">
          {FOCUS_AREAS.map((item) => (
            <div key={item.title} className="border-t border-slate-200 pt-5">
              <h3 className="font-['Merriweather',serif] font-bold text-secondary mb-2">{item.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl bg-white border border-slate-200 p-8 md:p-10">
        <h2 className="font-['Merriweather',serif] text-2xl font-bold text-secondary mb-3">
          Meet our research team
        </h2>
        <p className="text-slate-600 leading-relaxed mb-6">
          Explore profiles of scientists leading surveillance, intervention research, and climate-linked
          health analysis at the Center.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button
            onClick={() => navigate("/researchers")}
            className="bg-primary hover:bg-[#c40069] text-white"
          >
            Researcher Profiles
          </Button>
          <Button variant="outline" onClick={() => navigate("/dashboard")} className="border-slate-200">
            Access Dashboard
          </Button>
        </div>
      </section>
    </div>
  )
}
