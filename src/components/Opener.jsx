import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, MotionConfig, motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import LanternField, { Stars } from './Lanterns'
import { LITE } from '../lib/perf'
import { PaanLeaf, AlponaLotus, Butterfly } from './motifs/Motifs'
import { archPath } from './motifs/Arch'
import { playMusic, preloadMusic } from '../lib/music'
import { rng } from '../lib/random'
import config from '../config/inviteConfig'

/**
 * Shubho Drishti opener — like the Bengali bride hiding her face behind paan leaves,
 * the invitation is veiled by two betel leaves. A tap parts them (CSS 3D),
 * fades in the music, showers marigold petals and glides the guest through the arch.
 */
export default function Opener({ onOpen, onReveal, onExitComplete }) {
  const [stage, setStage] = useState('closed') // closed → parting → entering → gone
  const { groom, bride } = config.couple

  // light 3D: leaves tilt with pointer / device motion
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 80, damping: 15 })
  const sy = useSpring(my, { stiffness: 80, damping: 15 })
  const rotY = useTransform(sx, [-1, 1], [-14, 14])
  const rotX = useTransform(sy, [-1, 1], [10, -10])

  useEffect(() => {
    const move = (e) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1)
      my.set((e.clientY / window.innerHeight) * 2 - 1)
    }
    const orient = (e) => {
      if (e.gamma == null) return
      mx.set(Math.max(-1, Math.min(1, e.gamma / 30)))
      my.set(Math.max(-1, Math.min(1, (e.beta - 45) / 30)))
    }
    window.addEventListener('pointermove', move)
    window.addEventListener('deviceorientation', orient)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('deviceorientation', orient)
    }
  }, [mx, my])

  const open = () => {
    if (stage !== 'closed') return
    setStage('parting')
    // The tap starts the wedding music (no sound effects). Must run inside the tap for mobile autoplay rules.
    if (config.audio.playMusicOnOpen) playMusic({ fadeMs: 3000 })
    // Slow, graceful reveal: leaves drift apart, then we glide through the arch.
    setTimeout(() => {
      setStage('entering')
      onReveal?.()
    }, 3400)
    setTimeout(() => {
      setStage('gone')
      onOpen()
    }, 5900)
  }

  useEffect(() => {
    if (config.audio.playMusicOnOpen) preloadMusic()
  }, [])

  const petals = useMemo(() => {
    const r = rng(42)
    return Array.from({ length: 26 }).map(() => ({
      x: r() * 100,
      d: 4.5 + r() * 3.5,
      delay: r() * 1.8,
      s: 8 + r() * 10,
      c: ['#f59f00', '#ffb703', '#f77f00', '#d9480f', '#fff3bf'][Math.floor(r() * 5)],
      rot: r() * 720 - 360,
      drift: (r() - 0.5) * 120,
    }))
  }, [])

  const parted = stage !== 'closed'

  return (
    // The reveal is slow and gentle, so it plays even with iOS "Reduce Motion" on
    // (otherwise Framer skips every transform and the opener cuts instantly).
    <MotionConfig reducedMotion="never">
    <AnimatePresence onExitComplete={() => requestAnimationFrame(() => onExitComplete?.())}>
      {stage !== 'gone' && (
        <motion.div
          key="opener"
          className="fixed inset-0 z-50 cursor-pointer select-none overflow-hidden"
          onClick={open}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && open()}
          role="button"
          tabIndex={0}
          aria-label="Tap to open the invitation"
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
          style={{ background: 'linear-gradient(180deg, var(--sky-1) 0%, var(--sky-2) 55%, var(--sky-3) 100%)' }}
        >
          <Stars count={60} />
          <LanternField mode="rise" count={LITE ? 10 : 18} seed={3} minSize={10} maxSize={26} />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3" style={{ background: 'radial-gradient(ellipse at 50% 120%, var(--sky-glow) 0%, transparent 65%)', opacity: 0.55 }} />

          <motion.div
            className="absolute inset-0 grid place-items-center"
            animate={stage === 'entering' ? { scale: 1.6, opacity: 0 } : { scale: 1, opacity: 1 }}
            transition={{ duration: 2.4, ease: [0.45, 0, 0.25, 1] }}
            style={{ perspective: 1000, willChange: 'transform, opacity' }}
          >
            {/* The arched card behind the leaves */}
            <motion.div className="relative w-[min(82vw,420px,50svh)]" style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d' }}>
              <svg viewBox="0 0 300 420" className="block h-auto w-full drop-shadow-[0_20px_40px_rgba(0,0,0,.45)]">
                <defs>
                  <linearGradient id="op-gold" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="var(--gold-light)" />
                    <stop offset=".5" stopColor="var(--gold)" />
                    <stop offset="1" stopColor="var(--gold-light)" />
                  </linearGradient>
                  <linearGradient id="op-card" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#7a1220" />
                    <stop offset="1" stopColor="#4a0a12" />
                  </linearGradient>
                </defs>
                <path d={archPath(300, 420, { lobes: 11 })} fill="url(#op-gold)" />
                <path d={archPath(300, 420, { lobes: 11, inset: 8 })} fill="url(#op-card)" />
                <path d={archPath(300, 420, { lobes: 11, inset: 16 })} fill="none" stroke="url(#op-gold)" strokeWidth="1.2" strokeDasharray="2 4" />
                {/* laal-paar border at bottom */}
                <rect x="8" y="396" width="284" height="16" fill="#fdf6e8" />
                <rect x="8" y="400" width="284" height="8" fill="#b3121f" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center px-8 pt-16 text-center" style={{ transform: 'translateZ(30px)' }}>
                <AlponaLotus size={70} color="var(--gold-light)" className="mb-3 opacity-90" />
                <p className="font-bangla text-sm text-[var(--gold-light)]/90">শুভ দৃষ্টি</p>
                <h1 className="gold-text mt-2 font-display text-[clamp(1.5rem,7vw,2.3rem)] leading-tight tracking-[0.12em]">{groom.name.toUpperCase()}</h1>
                <p className="my-1 font-script text-2xl text-[var(--gold-light)]">weds</p>
                <h1 className="gold-text font-display text-[clamp(1.5rem,7vw,2.3rem)] leading-tight tracking-[0.12em]">{bride.name.toUpperCase()}</h1>
                <p className="mt-3 font-sans text-[11px] uppercase tracking-[0.3em] text-[var(--gold-light)]/80">Lucknow × Kolkata</p>
                <Butterfly className="mt-3 h-7 w-10" color="var(--gold-light)" />
              </div>
            </motion.div>

            {/* Two paan leaves veiling the card */}
            {[-1, 1].map((side) => (
              <motion.div
                key={side}
                className="absolute top-1/2 w-[min(58vw,330px,40svh)]"
                style={{
                  right: side === -1 ? 'calc(50% - min(12vw, 66px, 8svh))' : undefined,
                  left: side === 1 ? 'calc(50% - min(12vw, 66px, 8svh))' : undefined,
                  marginTop: 'max(-34vw, -192px, -27svh)',
                  transformOrigin: side === -1 ? '0% 60%' : '100% 60%',
                  zIndex: side === -1 ? 2 : 1,
                  willChange: 'transform, opacity',
                }}
                initial={{ rotate: side * 10, x: '0vw' }}
                animate={
                  parted
                    ? {
                        // 1) leaves gently swing open like a veil being lowered, 2) then float away
                        x: ['0vw', `${side * 7}vw`, `${side * 18}vw`, `${side * 80}vw`],
                        y: ['0vh', '-1vh', '-3vh', '-12vh'],
                        rotate: [side * 10, side * 18, side * 26, side * 44],
                        rotateY: [0, side * -38, side * -48, side * -60],
                        opacity: [1, 1, 1, 0],
                      }
                    : { rotate: [side * 10, side * 6, side * 10] }
                }
                transition={
                  parted
                    ? { duration: 3.8, times: [0, 0.35, 0.6, 1], ease: ['easeOut', 'linear', 'easeIn'] }
                    : { duration: 4, repeat: Infinity, ease: 'easeInOut' }
                }
              >
                <motion.div style={parted ? undefined : { rotateY: rotY, rotateX: rotX }}>
                  <PaanLeaf id={`paan${side}`} flip={side === 1} className="h-auto w-full" />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* tap prompt */}
          <AnimatePresence>
            {!parted && (
              <motion.div
                className="pointer-events-none absolute inset-x-0 bottom-[max(2.5rem,env(safe-area-inset-bottom))] flex flex-col items-center gap-3 text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.6 } }}
                exit={{ opacity: 0, y: 20 }}
              >
                <div className="relative grid h-14 w-14 place-items-center">
                  <span className="ring absolute inset-0 rounded-full border-2 border-[var(--gold-light)]" />
                  <span className="ring absolute inset-0 rounded-full border-2 border-[var(--gold-light)]" style={{ animationDelay: '1.2s' }} />
                  <span className="h-4 w-4 rounded-full bg-[var(--gold-light)] shadow-[0_0_20px_var(--gold-light)]" />
                </div>
                <p className="font-serif text-lg italic tracking-wide">Tap to unveil the invitation</p>
                <p className="font-sans text-[10px] uppercase tracking-[0.35em] opacity-70">Best with sound on</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* marigold petal shower */}
          {parted &&
            petals.map((p, i) => (
              <span
                key={i}
                className="petal pointer-events-none absolute top-[-5vh] block rounded-[50%_50%_50%_0]"
                style={{
                  left: `${p.x}%`,
                  width: p.s,
                  height: p.s,
                  background: p.c,
                  animationDuration: `${p.d}s`,
                  animationDelay: `${p.delay}s`,
                  '--drift': `${p.drift}px`,
                  '--spin': `${p.rot}deg`,
                }}
              />
            ))}
        </motion.div>
      )}
    </AnimatePresence>
    </MotionConfig>
  )
}
