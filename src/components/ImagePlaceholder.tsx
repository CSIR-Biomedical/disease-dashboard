import { cn } from "@/lib/utils"
import { ImageIcon } from "lucide-react"

interface ImagePlaceholderProps {
  label?: string
  className?: string
  iconClassName?: string
}

export default function ImagePlaceholder({
  label = "Image placeholder",
  className,
  iconClassName,
}: ImagePlaceholderProps) {
  return (
    <div
      className={cn(
        "w-full h-full bg-slate-100 flex flex-col items-center justify-center gap-2 text-slate-400",
        className
      )}
      role="img"
      aria-label={label}
    >
      <ImageIcon className={cn("w-8 h-8 opacity-60", iconClassName)} />
      <span className="text-[11px] font-medium uppercase tracking-wider text-center px-3">
        {label}
      </span>
    </div>
  )
}
