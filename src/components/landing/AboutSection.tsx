import { Link } from "react-router-dom"

export default function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-4">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-slate-500 mb-4">
              About the Center
            </p>
            <h2 className="font-['Merriweather',serif] text-3xl md:text-4xl font-bold text-secondary leading-tight">
              A national mandate for health research
            </h2>
            <div className="w-16 h-0.5 bg-primary mt-6" />
          </div>

          <div className="lg:col-span-8 space-y-6">
            <p className="text-lg text-slate-600 leading-relaxed">
              The Center for Health Research and Innovation advances evidence-based responses
              to infectious and chronic disease across the region. Our teams combine laboratory
              science, epidemiology, and digital surveillance to strengthen national health systems.
            </p>
            <p className="text-base text-slate-600 leading-relaxed">
              We work with ministries of health, district partners, and academic collaborators to
              turn research into policy guidance, community interventions, and open scientific
              insight — so discoveries move from bench to population impact.
            </p>

            <div className="grid sm:grid-cols-3 gap-8 pt-6 border-t border-slate-200">
              {[
                { title: "Surveillance", body: "Real-time monitoring of disease patterns and outbreak risk." },
                { title: "Discovery", body: "Laboratory and translational research across core health pillars." },
                { title: "Partnership", body: "Aligned with public institutions to scale what works." },
              ].map((item) => (
                <div key={item.title}>
                  <h3 className="font-['Merriweather',serif] font-bold text-secondary mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>

            <Link
              to="/about"
              className="inline-flex text-sm font-semibold text-secondary underline-offset-4 hover:underline hover:text-primary pt-2"
            >
              Learn more about the Center
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
