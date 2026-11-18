import { useRef } from 'react'
import { motion, useTransform } from 'framer-motion'
import useSmoothProgress from '../../lib/useSmoothProgress'
import LanternField, { Stars } from '../Lanterns'
import RumiDarwazaScene from '../motifs/RumiDarwaza'
import { AlponaLotus, Footprint, Kite, Toran } from '../motifs/Motifs'
import { archPath } from '../motifs/Arch'
import config from '../../config/inviteConfig'
import { LITE } from '../../lib/perf'

/** Ornate crest: cusped arch + Alpona lotus + names. */
function Crest() {
  const { groom, bride } = config.couple
  return (
    <div className="relative mx-auto flex w-[min(94vw,1000px)] flex-col items-center text-center">
      {/* Emblem: Rumi-Darwaza cusped arch enclosing an Alpona lotus */}
      <div className="relative mx-auto h-[118px] w-[96px] drop-shadow-[0_0_14px_rgba(255,210,122,.45)]">
        <svg viewBox="-4 -14 108 138" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
          <path d={archPath(100, 120, { lobes: 9 })} fill="rgba(255,255,255,.06)" stroke="var(--gold-light)" strokeWidth="1.6" />
          <path d={archPath(100, 120, { lobes: 9, inset: 6 })} fill="none" stroke="var(--gold-light)" strokeWidth=".8" strokeDasharray="2 3" />
          <circle cx="50" cy="-6" r="3" fill="var(--gold-light)" />
        </svg>
        <div className="absolute inset-x-0 bottom-[10px] grid place-items-center">
          <AlponaLotus size={70} color="var(--gold-light)" />
        </div>
      </div>
      <p className="mt-2 font-hindi text-sm text-white/85 drop-shadow">शुभ विवाह · <span className="font-bangla">শুভ বিবাহ</span></p>
      <h1 className="mt-2 font-display text-[clamp(2.2rem,10vw,4.6rem)] font-semibold leading-[0.95] tracking-[0.08em] text-white drop-shadow-[0_4px_18px_rgba(0,0,0,.45)]">
        {groom.name.toUpperCase()}
      </h1>
      <p className="font-sans text-[11px] font-medium uppercase tracking-[0.6em] text-white/90">— weds —</p>
      <h1 className="font-display text-[clamp(2.2rem,10vw,4.6rem)] font-semibold leading-[0.95] tracking-[0.08em] text-white drop-shadow-[0_4px_18px_rgba(0,0,0,.45)]">
        {bride.name.toUpperCase()}
      </h1>
      <p className="mt-4 font-sans text-xs uppercase tracking-[0.35em] text-white/85">{config.wedding.dateDisplay}</p>
    </div>
  )
}

export default function Hero() {
  const ref = useRef(null)
  const p = useSmoothProgress(ref, ['start start', 'end end'])

  // camera pans down: sky drifts up, palace rises in from below
  const skyY = useTransform(p, [0, 1], ['0%', '-30%'])
  const starsY = useTransform(p, [0, 1], ['0%', '-20%'])
  const farY = useTransform(p, [0, 1], ['10vh', '-70vh'])
  const midY = useTransform(p, [0, 1], ['20vh', '-130vh'])
  const nearY = useTransform(p, [0, 1], ['35vh', '-220vh'])
  const nearScale = useTransform(p, [0, 1], [1, 1.25])
  const kiteX = useTransform(p, [0, 1], ['0vw', '30vw'])
  const kiteY = useTransform(p, [0, 1], ['0vh', '-40vh'])
  const crestY = useTransform(p, [0, 0.4], ['0vh', '-28vh'])
  const crestOpacity = useTransform(p, [0, 0.28, 0.42], [1, 1, 0])
  const crestScale = useTransform(p, [0, 0.4], [1, 0.9])
  const palaceY = useTransform(p, [0, 0.7], ['88%', '0%'])
  const glowOpacity = useTransform(p, [0.35, 0.7], [0, 1])
  const capOpacity = useTransform(p, [0.62, 0.78], [0, 1])
  const capY = useTransform(p, [0.62, 0.78], [30, 0])
  const cueOpacity = useTransform(p, [0, 0.08], [1, 0])

  return (
    <section ref={ref} className="relative h-[330vh]" aria-label="Madhuresh weds Sayantani">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* Sky (taller than the viewport so it can pan) */}
        <motion.div
          className="absolute inset-x-0 top-0 h-[150%]"
          style={{
            y: skyY,
            background: 'linear-gradient(180deg, var(--sky-1) 0%, var(--sky-2) 45%, var(--sky-3) 80%, var(--sky-glow) 100%)',
          }}
        />
        <motion.div className="absolute inset-0" style={{ y: starsY }}>
          <Stars count={LITE ? 36 : 80} />
        </motion.div>

        {/* lantern layers: far → near */}
        <motion.div className="absolute inset-x-0 top-0 h-[220vh]" style={{ y: farY }}>
          <LanternField count={LITE ? 10 : 22} seed={11} minSize={7} maxSize={13} height={100} opacity={0.8} />
        </motion.div>
        <motion.div className="absolute inset-x-0 top-0 h-[260vh]" style={{ y: midY }}>
          <LanternField count={LITE ? 9 : 18} seed={23} minSize={16} maxSize={26} height={100} />
        </motion.div>

        {/* Lucknow kites */}
        <motion.div className="absolute inset-0" style={{ x: kiteX, y: kiteY }}>
          <Kite className="sway absolute left-[8%] top-[18%] w-7 opacity-90" />
          <Kite className="sway absolute right-[16%] top-[10%] w-5 opacity-80" color="#2a9d8f" color2="#e9c46a" style={{ animationDelay: '1.5s' }} />
          <Kite className="sway absolute left-[62%] top-[42%] w-4 opacity-70" color="#f72585" color2="#ffd166" style={{ animationDelay: '.7s' }} />
        </motion.div>

        <Toran className="absolute inset-x-0 top-0 z-10 h-[70px] w-full md:h-[90px]" />

        {/* Crest */}
        <motion.div className="absolute inset-x-0 top-[17svh] z-10 md:top-[14svh]" style={{ y: crestY, opacity: crestOpacity, scale: crestScale }}>
          <Crest />
        </motion.div>

        {/* Palace courtyard rising into view */}
        <motion.div className="absolute inset-x-0 bottom-0 h-[78svh] origin-bottom md:h-[82svh]" style={{ y: palaceY }}>
          <motion.div className="absolute inset-x-0 bottom-[30%] mx-auto h-[60%] w-[80%] rounded-full" style={{ opacity: glowOpacity, background: 'radial-gradient(closest-side, var(--sky-glow), transparent)' }} />
          <RumiDarwazaScene className="absolute inset-0 h-full w-full" />
        </motion.div>

        {/* near lanterns pass in front of the palace */}
        <motion.div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[340vh]" style={{ y: nearY, scale: nearScale }}>
          <LanternField count={LITE ? 6 : 12} seed={37} minSize={30} maxSize={52} height={100} />
        </motion.div>

        {/* caption over the courtyard */}
        <motion.div className="absolute inset-x-0 top-[12svh] z-20 px-6 text-center text-white" style={{ opacity: capOpacity, y: capY }}>
          <p className="font-sans text-[11px] uppercase tracking-[0.45em] opacity-90">Together with their families</p>
          <p className="mt-3 font-serif text-[clamp(1.6rem,6vw,2.8rem)] italic leading-tight drop-shadow-lg">invite you to a celebration of love</p>
          <p className="mt-2 font-sans text-xs tracking-[0.3em] opacity-80">FROM THE ARCHES OF LUCKNOW TO THE BANKS OF THE HOOGHLY</p>
        </motion.div>

        {/* Lakshmi footprints scroll cue — walking inward */}
        <motion.div className="absolute inset-x-0 bottom-[max(1.5rem,env(safe-area-inset-bottom))] z-30 flex flex-col items-center text-white" style={{ opacity: cueOpacity }}>
          <div className="relative h-24 w-14">
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{ left: i % 2 ? 26 : 6, top: 72 - i * 22 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{ duration: 2.8, delay: i * 0.45, repeat: Infinity, repeatDelay: 0.4 }}
              >
                <Footprint className="h-6 w-4" />
              </motion.div>
            ))}
          </div>
          <p className="mt-1 font-sans text-[10px] uppercase tracking-[0.4em] opacity-80">Scroll to enter</p>
        </motion.div>
      </div>
    </section>
  )
}
