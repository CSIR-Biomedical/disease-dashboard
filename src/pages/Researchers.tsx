import { ResearcherProfiles } from "@/components/ResearcherProfiles"

export default function Researchers() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground">Active Research Team</h2>
        <p className="text-sm text-muted-foreground mt-0.5">
          Key personnel leading surveillance and intervention efforts at the Health Research and Innovation Center
        </p>
      </div>

      <ResearcherProfiles />
    </div>
  )
}
