import { useRef } from 'react'
import { motion, useTransform } from 'framer-motion'
import useSmoothProgress from '../../lib/useSmoothProgress'
import { AlponaDivider, Butterfly, ChikanSpray, Ganesha } from '../motifs/Motifs'
import { IconCalendar, IconPin } from '../motifs/Icons'
import config from '../../config/inviteConfig'

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.8, delay: i * 0.1, ease: [0.2, 0.7, 0.2, 1] } }),
}

/** Draped parda curtain, tied back. */
function Curtain({ side }) {
  return (
    <svg viewBox="0 0 120 600" preserveAspectRatio="none" className={`h-full w-full ${side === 'right' ? '-scale-x-100' : ''}`} aria-hidden>
      <defs>
        <linearGradient id={`cur-${side}`} x1="0" x2="1">
          <stop offset="0" stopColor="var(--curtain)" />
          <stop offset=".35" stopColor="var(--curtain)" stopOpacity=".75" />
          <stop offset=".6" stopColor="var(--curtain)" />
          <stop offset="1" stopColor="var(--curtain)" stopOpacity=".7" />
        </linearGradient>
      </defs>
      <path d="M0 0 H120 C 100 120, 40 200, 34 300 C 30 360, 40 460, 60 600 H0 Z" fill={`url(#cur-${side})`} />
      <path d="M0 0 H120 C 100 120, 40 200, 34 300" fill="none" stroke="var(--gold)" strokeWidth="3" />
      {[20, 50, 80].map((x) => (
        <path key={x} d={`M${x} 0 C ${x - 4} 120, ${x * 0.3} 220, ${x * 0.25} 300`} stroke="#00000022" strokeWidth="2" fill="none" />
      ))}
      <ellipse cx="36" cy="300" rx="22" ry="8" fill="var(--gold)" />
      <path d="M36 306 v40 M30 306 l-6 36 M42 306 l6 36" stroke="var(--gold)" strokeWidth="2" />
    </svg>
  )
}

export default function Family() {
  const { groom, bride } = config.couple
  const { invocation, wedding } = config
  const ref = useRef(null)
  const scrollYProgress = useSmoothProgress(ref, ['start end', 'start start'])
  const curtainL = useTransform(scrollYProgress, [0, 1], ['-40%', '0%'])
  const curtainR = useTransform(scrollYProgress, [0, 1], ['40%', '0%'])

  return (
    <section ref={ref} className="texture relative overflow-hidden px-6 py-24 md:py-32" style={{ background: 'var(--family-bg)', color: 'var(--family-fg)' }} id="invite">
      <motion.div className="pointer-events-none absolute left-0 top-0 h-full w-[22vw] max-w-[220px]" style={{ x: curtainL }}>
        <Curtain side="left" />
      </motion.div>
      <motion.div className="pointer-events-none absolute right-0 top-0 h-full w-[22vw] max-w-[220px]" style={{ x: curtainR }}>
        <Curtain side="right" />
      </motion.div>
      <ChikanSpray className="pointer-events-none absolute -left-6 bottom-6 w-56 md:left-[18%]" color="white" opacity={0.45} />
      <ChikanSpray className="pointer-events-none absolute -right-6 top-10 w-56 -scale-x-100 md:right-[18%]" color="white" opacity={0.45} />

      <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} className="relative mx-auto flex max-w-xl flex-col items-center text-center">
        <motion.div variants={fade} custom={0}>
          <Ganesha className="mx-auto h-20 w-20 md:h-24 md:w-24" />
        </motion.div>
        <motion.p variants={fade} custom={1} className="mt-3 font-hindi text-xl md:text-2xl">
          {invocation.hindi}
        </motion.p>
        <motion.div variants={fade} custom={2} className="mt-2 flex items-center gap-2">
          <Butterfly className="h-5 w-8" />
          <p className="font-bangla text-lg md:text-xl">{invocation.bengali}</p>
          <Butterfly className="h-5 w-8" />
        </motion.div>

        <motion.div variants={fade} custom={3} className="my-6 w-full opacity-80">
          <AlponaDivider />
        </motion.div>

        <motion.p variants={fade} custom={4} className="font-serif text-lg italic md:text-xl">
          With the blessings of our elders, we request the honour of your presence at the wedding of
        </motion.p>

        <motion.div variants={fade} custom={5} className="mt-8">
          <h2 className="font-display text-4xl tracking-[0.08em] md:text-5xl">{groom.name}</h2>
          <p className="mt-2 font-sans text-sm">
            Son of <strong className="font-semibold">{groom.father}</strong> &amp; <strong className="font-semibold">{groom.mother}</strong>
          </p>
          <p className="font-sans text-xs uppercase tracking-[0.25em] opacity-75">
            ({groom.city}, {groom.stateShort})
          </p>
        </motion.div>

        <motion.p variants={fade} custom={6} className="my-4 font-script text-5xl" style={{ color: 'var(--sindoor)' }}>
          &amp;
        </motion.p>

        <motion.div variants={fade} custom={7}>
          <h2 className="font-display text-4xl tracking-[0.08em] md:text-5xl">{bride.name}</h2>
          <p className="mt-2 font-sans text-sm">
            Daughter of <strong className="font-semibold">{bride.father}</strong> &amp; <strong className="font-semibold">{bride.mother}</strong>
          </p>
          <p className="font-sans text-xs uppercase tracking-[0.25em] opacity-75">
            ({bride.city}, {bride.stateShort})
          </p>
        </motion.div>

        <motion.div variants={fade} custom={8} className="mt-10 w-full rounded-[28px] border px-5 py-6 backdrop-blur-sm" style={{ borderColor: 'var(--gold)', background: 'color-mix(in srgb, var(--paper) 45%, transparent)' }}>
          <div className="flex flex-col items-center gap-2 font-sans text-sm md:flex-row md:justify-center md:gap-4">
            <span className="inline-flex items-center gap-2 font-semibold tracking-wide">
              <IconCalendar className="h-4 w-4" /> {wedding.dateDisplay}
            </span>
            <span className="hidden opacity-50 md:inline">•</span>
            <span className="inline-flex items-center gap-2">
              <IconPin className="h-4 w-4" /> {wedding.venueDisplay}
            </span>
          </div>
          <a href={wedding.mapsUrl} target="_blank" rel="noreferrer" className="btn mt-4 text-white" style={{ background: 'var(--sindoor)' }}>
            <IconPin className="h-4 w-4" /> Open in Google Maps
          </a>
        </motion.div>

        <motion.div variants={fade} custom={9} className="mt-8 space-y-1">
          <p className="font-hindi text-base">{invocation.blessingHindi}</p>
          <p className="font-bangla text-base">{invocation.blessingBengali}</p>
        </motion.div>
      </motion.div>
    </section>
  )
}
