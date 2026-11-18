import { useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import ArchFrame from '../motifs/Arch'
import EventArt from '../motifs/EventArt'
import { AlponaDivider, AlponaLotus } from '../motifs/Motifs'
import { IconCalendar, IconClock, IconPin } from '../motifs/Icons'
import { downloadIcs, googleCalendarUrl } from '../../lib/calendar'
import config from '../../config/inviteConfig'

const coupleLine = `${config.couple.groom.name} & ${config.couple.bride.name}`

function CalendarButton({ ev, light }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <button onClick={() => setOpen((o) => !o)} className={`btn border ${light ? 'border-white/50 text-white' : ''}`} aria-expanded={open}>
        <IconCalendar className="h-4 w-4" /> Add to Calendar
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6 }}
            className="absolute bottom-full left-1/2 z-20 mb-2 w-48 -translate-x-1/2 overflow-hidden rounded-2xl bg-white text-left font-sans text-sm text-neutral-800 shadow-xl"
          >
            <a href={googleCalendarUrl(ev, coupleLine)} target="_blank" rel="noreferrer" className="block px-4 py-3 hover:bg-neutral-100" onClick={() => setOpen(false)}>
              Google Calendar
            </a>
            <button
              className="block w-full px-4 py-3 text-left hover:bg-neutral-100"
              onClick={() => {
                downloadIcs(ev, coupleLine)
                setOpen(false)
              }}
            >
              Apple / Outlook (.ics)
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function EventCard({ ev, index }) {
  const ref = useRef(null)
  // Light 3D: card tilts toward the pointer (desktop) — springs keep it 60fps.
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 150, damping: 18 })
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), { stiffness: 150, damping: 18 })

  const onMove = (e) => {
    if (e.pointerType !== 'mouse') return
    const r = ref.current.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  const reset = () => (mx.set(0), my.set(0))

  const crimson = ev.tone === 'crimson'
  const bg = crimson ? 'var(--card-crimson)' : 'var(--card-emerald)'

  return (
    <motion.article
      initial={{ opacity: 0, y: 80, rotateX: 28 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, delay: (index % 2) * 0.12, ease: [0.2, 0.7, 0.2, 1] }}
      className="tilt-scene"
    >
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={reset}
        style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d', background: bg }}
        className={`relative overflow-hidden rounded-t-[160px] rounded-b-[28px] p-[3px] text-white shadow-[0_30px_60px_-20px_rgba(0,0,0,.5)] ${ev.featured ? 'ring-2 ring-[var(--gold-light)]' : ''}`}
      >
        {/* gold border */}
        <div className="pointer-events-none absolute inset-[6px] rounded-t-[154px] rounded-b-[24px] border border-[var(--gold)]/70" />
        <div className="jaali pointer-events-none absolute inset-0 opacity-30" />
        {/* laal-paar band for crimson cards */}
        {crimson && <div className="pointer-events-none absolute inset-x-0 bottom-0 h-3 bg-[#fdf6e8]" style={{ boxShadow: 'inset 0 -5px 0 #b3121f' }} />}

        <div className="relative px-5 pb-7 pt-6 md:px-7" style={{ transform: 'translateZ(30px)' }}>
          {ev.featured && (
            <div className="absolute right-5 top-10 z-10 rotate-12 rounded-full bg-[var(--gold-light)] px-3 py-1 font-sans text-[10px] font-bold uppercase tracking-widest text-[var(--maroon)] shadow">
              The Big Day
            </div>
          )}
          <div className="mx-auto w-[78%]">
            <ArchFrame image={ev.image} label={ev.imageLabel} w={300} h={400} lobes={9}>
              <EventArt kind={ev.art} />
            </ArchFrame>
          </div>
          {!ev.image && <p className="mt-2 text-center font-sans text-[9px] uppercase tracking-[0.2em] opacity-50">{ev.imageLabel}</p>}

          <div className="mt-4 text-center">
            <p className="font-hindi text-sm text-[var(--gold-light)]">{ev.native}</p>
            <h3 className="mt-1 font-display text-2xl leading-tight tracking-[0.08em] md:text-[1.7rem]">{ev.title.toUpperCase()}</h3>
            <p className="mt-1 font-serif text-lg italic opacity-90">{ev.subtitle}</p>
            <p className="mx-auto mt-3 max-w-xs font-sans text-[13px] leading-relaxed opacity-80">{ev.blurb}</p>
          </div>

          <div className="mt-5 space-y-2 rounded-2xl bg-black/20 px-4 py-3 font-sans text-[13px]">
            <p className="flex items-start gap-2">
              <IconClock className="mt-0.5 h-4 w-4 shrink-0 text-[var(--gold-light)]" /> {ev.dateDisplay}
            </p>
            <p className="flex items-start gap-2">
              <IconPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--gold-light)]" /> {ev.venue}
            </p>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            <a href={ev.mapsUrl} target="_blank" rel="noreferrer" className="btn text-[var(--maroon)]" style={{ background: 'linear-gradient(135deg, var(--gold-light), var(--gold))' }}>
              <IconPin className="h-4 w-4" /> See the Route
            </a>
            <CalendarButton ev={ev} light />
          </div>
        </div>
      </motion.div>
    </motion.article>
  )
}

export default function Events() {
  return (
    <section
      id="events"
      className="texture relative overflow-hidden px-5 py-24 md:px-10 md:py-32"
      style={{ background: 'linear-gradient(180deg, var(--events-bg), color-mix(in srgb, var(--events-bg) 70%, black))', color: 'var(--events-fg)' }}
    >
      <div className="jaali pointer-events-none absolute inset-0 opacity-20" />
      <div className="pointer-events-none absolute -right-32 top-20 opacity-20">
        <AlponaLotus size={420} color="white" />
      </div>
      <div className="pointer-events-none absolute -left-40 bottom-40 opacity-15">
        <AlponaLotus size={380} color="white" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="text-center">
          <p className="font-hindi text-lg opacity-80">
            उत्सव · <span className="font-bangla">উৎসব</span>
          </p>
          <h2 className="mt-2 font-display text-4xl tracking-[0.1em] md:text-6xl">The Celebrations</h2>
          <p className="mx-auto mt-3 max-w-md font-serif text-xl italic opacity-85">Eight moments, two traditions — one beautiful beginning.</p>
          <div className="mt-6 opacity-70">
            <AlponaDivider />
          </div>
        </div>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {config.events.map((ev, i) => (
            <EventCard key={ev.id} ev={ev} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
