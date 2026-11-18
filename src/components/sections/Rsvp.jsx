import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { IconClose, IconWhatsApp } from '../motifs/Icons'
import { AlponaLotus } from '../motifs/Motifs'
import config, { WHATSAPP_NUMBER } from '../../config/inviteConfig'

function RsvpModal({ onClose }) {
  const [form, setForm] = useState({ name: '', phone: '', guests: 1, attending: 'Joyfully accepts', events: [], message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | done
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))
  const toggleEvent = (title) =>
    setForm((f) => ({ ...f, events: f.events.includes(title) ? f.events.filter((t) => t !== title) : [...f.events, title] }))

  const submit = (e) => {
    e.preventDefault()
    setStatus('sending')
    const payload = { ...form, events: form.events.join(', '), submittedAt: new Date().toISOString() }

    // 1) Google Sheet (if configured). Fire-and-forget (keepalive) so WhatsApp can open
    //    synchronously inside the tap — iOS Safari blocks window.open after an await.
    //    no-cors: Apps Script web apps don't send CORS headers.
    if (config.rsvp.sheetUrl) {
      fetch(config.rsvp.sheetUrl, { method: 'POST', mode: 'no-cors', keepalive: true, body: new URLSearchParams(payload) }).catch(() => {})
    }

    // 2) WhatsApp with a pre-filled message
    const text = [
      `🪔 RSVP — ${config.couple.groom.name} & ${config.couple.bride.name}`,
      `Name: ${form.name}`,
      form.phone && `Phone: ${form.phone}`,
      `Response: ${form.attending}`,
      form.attending !== 'Regretfully declines' && `Guests: ${form.guests}`,
      form.events.length && `Attending: ${form.events.join(', ')}`,
      form.message && `Message: ${form.message}`,
    ]
      .filter(Boolean)
      .join('\n')
    setStatus('done')
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank', 'noopener')
  }

  const field = 'w-full rounded-xl border border-black/10 bg-white/80 px-4 py-3 font-sans text-sm text-neutral-800 outline-none focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold)]/30'

  return (
    <motion.div className="fixed inset-0 z-50 flex items-end justify-center bg-black/55 backdrop-blur-sm md:items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="RSVP form"
        onClick={(e) => e.stopPropagation()}
        initial={{ y: '100%', rotateX: 15 }}
        animate={{ y: 0, rotateX: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 26, stiffness: 240 }}
        className="relative max-h-[92svh] w-full max-w-lg overflow-y-auto rounded-t-[32px] bg-[#fdf6e8] px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-8 text-[#3a1a12] md:rounded-[32px]"
        style={{ boxShadow: 'inset 0 -6px 0 #b3121f' }}
      >
        <button onClick={onClose} aria-label="Close" className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-black/5">
          <IconClose className="h-5 w-5" />
        </button>
        {status === 'done' ? (
          <div className="py-10 text-center">
            <AlponaLotus size={110} color="#c9a24b" className="mx-auto" />
            <h3 className="mt-4 font-display text-2xl tracking-wider">Dhanyavaad · ধন্যবাদ</h3>
            <p className="mt-2 font-serif text-lg italic">Your RSVP is on its way. We can't wait to celebrate with you!</p>
            <button onClick={onClose} className="btn mt-6 bg-[#b3121f] text-white">
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4">
            <div className="text-center">
              <h3 className="font-display text-2xl tracking-[0.12em]">QUICK RSVP</h3>
              <p className="font-serif italic opacity-80">{config.rsvp.note}</p>
            </div>
            <input required className={field} placeholder="Your name" value={form.name} onChange={set('name')} autoComplete="name" />
            <input className={field} placeholder="Phone (optional)" value={form.phone} onChange={set('phone')} inputMode="tel" autoComplete="tel" />
            <div className="grid grid-cols-2 gap-2">
              {['Joyfully accepts', 'Regretfully declines'].map((opt) => (
                <button
                  type="button"
                  key={opt}
                  onClick={() => setForm((f) => ({ ...f, attending: opt }))}
                  className={`rounded-xl border px-3 py-3 font-sans text-sm font-medium ${form.attending === opt ? 'border-[#b3121f] bg-[#b3121f] text-white' : 'border-black/10 bg-white/70'}`}
                >
                  {opt}
                </button>
              ))}
            </div>
            {form.attending === 'Joyfully accepts' && (
              <>
                <label className="flex items-center justify-between gap-3 font-sans text-sm">
                  Number of guests
                  <span className="flex items-center gap-2">
                    <button type="button" className="h-9 w-9 rounded-full border border-black/15" onClick={() => setForm((f) => ({ ...f, guests: Math.max(1, f.guests - 1) }))} aria-label="Fewer guests">
                      −
                    </button>
                    <span className="w-6 text-center font-semibold">{form.guests}</span>
                    <button type="button" className="h-9 w-9 rounded-full border border-black/15" onClick={() => setForm((f) => ({ ...f, guests: Math.min(20, f.guests + 1) }))} aria-label="More guests">
                      +
                    </button>
                  </span>
                </label>
                <div>
                  <p className="mb-2 font-sans text-sm">Which celebrations will you join?</p>
                  <div className="flex flex-wrap gap-2">
                    {config.events.map((ev) => {
                      const on = form.events.includes(ev.title)
                      return (
                        <button
                          type="button"
                          key={ev.id}
                          onClick={() => toggleEvent(ev.title)}
                          className={`rounded-full border px-3 py-1.5 font-sans text-xs ${on ? 'border-[#0d4a41] bg-[#0d4a41] text-white' : 'border-black/15 bg-white/70'}`}
                          aria-pressed={on}
                        >
                          {ev.title}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </>
            )}
            <textarea className={`${field} min-h-[80px]`} placeholder="A blessing or message for the couple (optional)" value={form.message} onChange={set('message')} />
            <button disabled={status === 'sending'} className="btn w-full bg-[#25D366] py-3.5 text-white disabled:opacity-60">
              <IconWhatsApp className="h-5 w-5" /> {status === 'sending' ? 'Sending…' : 'Send RSVP via WhatsApp'}
            </button>
          </form>
        )}
      </motion.div>
    </motion.div>
  )
}

export default function Rsvp() {
  const [open, setOpen] = useState(false)
  return (
    <section id="rsvp" className="texture relative overflow-hidden px-6 py-28 text-center md:py-36" style={{ background: 'var(--rsvp-bg)', color: 'var(--rsvp-fg)' }}>
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-15">
        <AlponaLotus size={560} color="white" />
      </div>
      <div className="relative">
        <h2 className="font-display text-[clamp(2.4rem,10vw,4.5rem)] leading-none tracking-[0.1em]">
          PLEASE
          <br />
          RSVP
        </h2>
        <p className="mx-auto mt-4 max-w-sm font-serif text-lg italic opacity-85">{config.rsvp.note}</p>

        {/* concentric animated tap button */}
        <a href={config.rsvp.whatsappLink} target="_blank" rel="noreferrer" className="group relative mx-auto mt-12 grid h-36 w-36 place-items-center" aria-label="RSVP on WhatsApp">
          {[0, 0.8, 1.6].map((d) => (
            <span key={d} className="ring absolute inset-0 rounded-full border-2" style={{ borderColor: 'currentColor', animationDelay: `${d}s` }} />
          ))}
          <span className="absolute inset-3 rounded-full border border-current opacity-50" />
          <span className="absolute inset-6 rounded-full border border-current opacity-70" />
          <motion.span whileTap={{ scale: 0.9 }} className="relative grid h-16 w-16 place-items-center rounded-full text-white shadow-xl transition-transform group-hover:scale-110" style={{ background: 'var(--sindoor)' }}>
            <IconWhatsApp className="h-7 w-7" />
          </motion.span>
        </a>
        <p className="mt-6 font-sans text-xs uppercase tracking-[0.35em] opacity-80">Tap to RSVP on WhatsApp</p>

        <button onClick={() => setOpen(true)} className="btn mt-8 border border-current">
          Or fill the quick RSVP form
        </button>
      </div>
      <AnimatePresence>{open && <RsvpModal onClose={() => setOpen(false)} />}</AnimatePresence>
    </section>
  )
}
