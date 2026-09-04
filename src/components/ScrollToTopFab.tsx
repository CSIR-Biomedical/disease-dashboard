import { useEffect, useState } from "react"
import { ChevronUp } from "lucide-react"

interface ScrollToTopFabProps {
  /** DOM id of a scrollable container (e.g. dashboard main). Defaults to window. */
  containerId?: string
  threshold?: number
}

export default function ScrollToTopFab({
  containerId,
  threshold = 400,
}: ScrollToTopFabProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = containerId ? document.getElementById(containerId) : null

    const getTop = () => (el ? el.scrollTop : window.scrollY)
    const onScroll = () => setVisible(getTop() > threshold)
    onScroll()

    const target: HTMLElement | Window = el ?? window
    target.addEventListener("scroll", onScroll, { passive: true })
    return () => target.removeEventListener("scroll", onScroll)
  }, [containerId, threshold])

  if (!visible) return null

  return (
    <button
      type="button"
      aria-label="Go to top"
      onClick={() => {
        const el = containerId ? document.getElementById(containerId) : null
        if (el) {
          el.scrollTo({ top: 0, behavior: "smooth" })
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" })
        }
      }}
      className="fixed bottom-6 right-6 z-40 inline-flex h-12 w-12 items-center justify-center rounded-none bg-secondary text-white shadow-none border border-secondary hover:bg-[#1a153a] transition-colors dark:bg-slate-800 dark:border-slate-700 dark:hover:bg-slate-700"
    >
      <ChevronUp size={22} strokeWidth={2} />
    </button>
  )
}
