import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import LanternField, { Stars } from '../Lanterns'
import { TwilightSkyline } from '../motifs/Scenery'
import { AlponaDivider } from '../motifs/Motifs'
import { archPath } from '../motifs/Arch'
import config from '../../config/inviteConfig'

function useCountdown(targetISO) {
  const target = new Date(targetISO).getTime()
  const calc = () => Math.max(0, target - Date.now())
  const [ms, setMs] = useState(calc)
  useEffect(() => {
    const t = setInterval(() => setMs(calc()), 1000)
    return () => clearInterval(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target])
  const s = Math.floor(ms / 1000)
  return { done: ms === 0 || Number.isNaN(target), d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), s: s % 60 }
}

function Tile({ value, label }) {
  return (
    <div className="relative w-[21vw] max-w-[110px]">
      <svg viewBox="0 0 100 120" className="block h-auto w-full" aria-hidden>
        <path d={archPath(100, 120, { lobes: 7 })} fill="rgba(255,255,255,.06)" stroke="var(--gold)" strokeWidth="1.2" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-[18%]">
        <motion.span key={value} initial={{ rotateX: -90, opacity: 0 }} animate={{ rotateX: 0, opacity: 1 }} transition={{ duration: 0.4 }} className="gold-text font-display text-[clamp(1.6rem,7vw,2.8rem)] leading-none tabular-nums">
          {String(value).padStart(2, '0')}
        </motion.span>
        <span className="mt-1 font-sans text-[9px] uppercase tracking-[0.25em] text-white/70 md:text-[10px]">{label}</span>
      </div>
    </div>
  )
}

export default function Finale() {
  const { finale, couple, audio } = config
  const c = useCountdown(finale.targetISO)
  return (
    <footer className="relative overflow-hidden text-white" style={{ background: 'linear-gradient(180deg, var(--finale-1) 0%, var(--finale-2) 70%, #3a2a6a 100%)' }}>
      <Stars count={90} seed={77} />
      <LanternField mode="rise" count={16} seed={88} minSize={10} maxSize={28} />

      <div className="relative z-10 px-6 pb-[42vw] pt-28 text-center md:pb-[30vw] md:pt-36 lg:pb-[24vw]">
        <p className="font-hindi text-lg text-[var(--gold-light)]/90">
          शुभ विवाह · <span className="font-bangla">শুভ বিবাহ</span>
        </p>
        <h2 className="mt-3 font-script text-[clamp(2.6rem,11vw,5rem)] leading-tight text-[var(--gold-light)]">{finale.heading}</h2>

        {c.done ? (
          <p className="mt-8 font-serif text-2xl italic">The celebrations have begun! 🪔</p>
        ) : (
          <div className="tilt-scene mt-10 flex items-end justify-center gap-2 md:gap-5">
            <Tile value={c.d} label="Days" />
            <Tile value={c.h} label="Hours" />
            <Tile value={c.m} label="Minutes" />
            <Tile value={c.s} label="Seconds" />
          </div>
        )}

        <div className="mx-auto mt-12 max-w-md opacity-60">
          <AlponaDivider color="var(--gold-light)" />
        </div>
        <p className="mt-6 font-display text-2xl tracking-[0.15em] md:text-3xl">
          {couple.groom.name.toUpperCase()} <span className="text-[var(--sindoor)]">✦</span> {couple.bride.name.toUpperCase()}
        </p>
        <p className="mt-2 font-sans text-sm tracking-[0.3em] text-white/70">{couple.hashtag}</p>
        <p className="mt-6 font-serif text-lg italic text-white/80">{finale.closing}</p>
      </div>

      <TwilightSkyline className="absolute inset-x-0 bottom-0 z-0 h-auto w-full min-h-[200px]" />
      {audio.credit && <p className="absolute inset-x-0 bottom-2 z-10 px-16 text-center font-sans text-[9px] leading-tight text-white/40">{audio.credit}</p>}
    </footer>
  )
}
