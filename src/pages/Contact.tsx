import { FormEvent, useState } from "react"
import { Button } from "@/components/ui/button"

export default function Contact() {
  const [sent, setSent] = useState(false)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="max-w-3xl mx-auto space-y-12">
      <header>
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-slate-500 mb-4">
          Contact
        </p>
        <h1 className="font-['Merriweather',serif] text-3xl md:text-5xl font-bold text-secondary leading-tight mb-5">
          Get in touch
        </h1>
        <div className="w-16 h-0.5 bg-primary mb-6" />
        <p className="text-lg text-slate-600 leading-relaxed">
          Reach the Center for Health Research and Innovation for partnerships, media inquiries,
          or general questions. This form is a demo — messages are not submitted to a live inbox yet.
        </p>
      </header>

      <div className="grid sm:grid-cols-2 gap-8 border-t border-[#e0e0e0] pt-10">
        <div>
          <h2 className="font-['Merriweather',serif] font-bold text-secondary mb-2">Email</h2>
          <a
            href="mailto:info@csir-chri.example.com"
            className="text-sm text-slate-600 underline-offset-4 hover:underline hover:text-primary"
          >
            info@csir-chri.example.com
          </a>
        </div>
        <div>
          <h2 className="font-['Merriweather',serif] font-bold text-secondary mb-2">Location</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Council for Scientific and Industrial Research
            <br />
            Accra, Ghana
          </p>
        </div>
      </div>

      {sent ? (
        <div className="border border-[#e0e0e0] bg-[#f5f5f5] p-8">
          <h2 className="font-['Merriweather',serif] text-xl font-bold text-secondary mb-2">
            Thank you
          </h2>
          <p className="text-slate-600 mb-6">
            Your message was recorded locally for this demo. A live mail endpoint can be wired later.
          </p>
          <Button
            type="button"
            variant="outline"
            className="rounded-none border-secondary/25"
            onClick={() => setSent(false)}
          >
            Send another message
          </Button>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-5 border-t border-[#e0e0e0] pt-10">
          <div className="grid sm:grid-cols-2 gap-5">
            <label className="block space-y-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Name
              </span>
              <input
                required
                name="name"
                type="text"
                className="w-full border border-[#e0e0e0] bg-white px-3 py-2.5 text-sm outline-none focus:border-secondary"
              />
            </label>
            <label className="block space-y-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Email
              </span>
              <input
                required
                name="email"
                type="email"
                className="w-full border border-[#e0e0e0] bg-white px-3 py-2.5 text-sm outline-none focus:border-secondary"
              />
            </label>
          </div>
          <label className="block space-y-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Subject
            </span>
            <input
              required
              name="subject"
              type="text"
              className="w-full border border-[#e0e0e0] bg-white px-3 py-2.5 text-sm outline-none focus:border-secondary"
            />
          </label>
          <label className="block space-y-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Message
            </span>
            <textarea
              required
              name="message"
              rows={6}
              className="w-full border border-[#e0e0e0] bg-white px-3 py-2.5 text-sm outline-none focus:border-secondary resize-y"
            />
          </label>
          <Button
            type="submit"
            className="bg-primary hover:bg-[#c40069] text-white rounded-none shadow-none px-8 h-11 font-semibold"
          >
            Send message
          </Button>
        </form>
      )}
    </div>
  )
}
