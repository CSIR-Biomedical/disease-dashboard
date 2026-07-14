import { ArrowRight } from "lucide-react"
import impactImg from "@/assets/public_health_impact_1783948120839.png"
import { Button } from "@/components/ui/button"

export default function PublicHealthImpact() {
  return (
    <section className="py-0 bg-white">
      <div className="grid lg:grid-cols-2 min-h-[600px]">
        <div className="bg-[#E0F5FF] flex items-center justify-center p-12 lg:p-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-20 rounded-full blur-[80px]" />

          <div className="relative z-10 max-w-xl">
            <h4 className="text-sm font-bold tracking-widest text-primary uppercase mb-4">Our Commitment</h4>
            <h2 className="font-['Merriweather',serif] text-4xl lg:text-5xl font-black text-slate-900 leading-tight mb-6">
              Translating Science into Public Health Impact
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed mb-8">
              At CSIR, we believe that research must transcend the laboratory. Our findings directly inform national health policies, shape community health interventions, and drive the equitable distribution of resources to the communities that need them most.
            </p>
            <Button size="lg" className="bg-primary hover:bg-[#c40069] text-white font-semibold rounded-md shadow-md text-base px-8 h-14 group">
              Read our 2025 Impact Report
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        <div className="relative min-h-[400px] lg:min-h-full">
          <img
            src={impactImg}
            alt="Public Health Impact in Community"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  )
}
