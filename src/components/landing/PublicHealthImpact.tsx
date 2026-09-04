import { useNavigate } from "react-router-dom"
import impactImg from "@/assets/public_health_impact_1783948120839.png"
import { Button } from "@/components/ui/button"

export default function PublicHealthImpact() {
  const navigate = useNavigate()

  return (
    <section className="bg-white border-y border-slate-100">
      <div className="grid lg:grid-cols-2 min-h-[560px]">
        <div className="bg-[#1a153a] flex items-center p-10 sm:p-14 lg:p-20">
          <div className="max-w-xl">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-white/60 mb-5">
              Our commitment
            </p>
            <h2 className="font-['Merriweather',serif] text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-white leading-tight mb-6">
              Translating science into public health impact
            </h2>
            <p className="text-base md:text-lg text-slate-200/85 leading-relaxed mb-10">
              Research must move beyond the laboratory. Our findings inform national health
              policy, shape community interventions, and guide resources to the populations
              that need them most.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                onClick={() => navigate("/publications")}
                className="bg-white text-secondary hover:bg-slate-100 font-semibold px-8 h-12 rounded-none shadow-none text-base"
              >
                Read impact publications
              </Button>
              <Button
                size="lg"
                variant="ghost"
                onClick={() => navigate("/about")}
                className="text-white/80 hover:text-white hover:bg-white/10 font-medium px-4 h-12 rounded-none text-base underline-offset-4 hover:underline"
              >
                About the Center
              </Button>
            </div>
          </div>
        </div>

        <div className="relative min-h-[360px] lg:min-h-full order-first lg:order-last">
          <img
            src={impactImg}
            alt="Public health impact in the community"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  )
}
