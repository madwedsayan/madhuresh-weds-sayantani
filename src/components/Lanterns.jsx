import { useMemo } from 'react'
import { rng } from '../lib/random'

/** A single glowing sky lantern (pure CSS — cheap on mobile GPUs). */
export function Lantern({ size = 24, style, className = '' }) {
  return (
    <div className={`absolute ${className}`} style={{ width: size, height: size * 1.32, ...style }} aria-hidden>
      <div
        className="flicker h-full w-full"
        style={{
          borderRadius: `${size * 0.28}px ${size * 0.28}px ${size * 0.18}px ${size * 0.18}px`,
          background: 'radial-gradient(ellipse at 50% 72%, #fff6d0 0%, #ffd27a 22%, #ff9b3d 55%, #d9480f 100%)',
          boxShadow: `0 0 ${size * 0.8}px ${size * 0.15}px rgba(255,155,60,.55), inset 0 -${size * 0.12}px ${size * 0.2}px rgba(255,255,255,.35)`,
          animationDelay: style?.animationDelay,
        }}
      />
    </div>
  )
}

/**
 * A field of lanterns. mode="static" → positioned only (parent moves the layer with scroll).
 * mode="rise" → each lantern continuously rises with CSS keyframes (opener / finale).
 */
export default function LanternField({ count = 16, seed = 1, minSize = 14, maxSize = 34, mode = 'static', height = 100, blur = 0, opacity = 1, className = '' }) {
  const lanterns = useMemo(() => {
    const r = rng(seed)
    return Array.from({ length: count }).map(() => ({
      left: r() * 96,
      top: r() * height,
      size: minSize + r() * (maxSize - minSize),
      delay: r() * -24,
      dur: 16 + r() * 18,
      drift: (r() - 0.5) * 60,
      flick: r() * 3,
    }))
  }, [count, seed, minSize, maxSize, height])

  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} style={{ filter: blur ? `blur(${blur}px)` : undefined, opacity }} aria-hidden>
      {lanterns.map((l, i) =>
        mode === 'rise' ? (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${l.left}%`,
              bottom: '-12vh',
              animation: `rise ${l.dur}s linear ${l.delay}s infinite`,
              '--drift': `${l.drift}px`,
            }}
          >
            <Lantern size={l.size} style={{ position: 'relative', animationDelay: `${l.flick}s` }} />
          </div>
        ) : (
          <Lantern key={i} size={l.size} style={{ left: `${l.left}%`, top: `${l.top}%`, animationDelay: `${l.flick}s` }} />
        ),
      )}
      <style>{`@keyframes rise { 0% { transform: translate(0,0); opacity: 0 } 8% { opacity: 1 } 85% { opacity: 1 } 100% { transform: translate(var(--drift), -125vh); opacity: 0 } }`}</style>
    </div>
  )
}

/** Twinkling star field. */
export function Stars({ count = 70, seed = 9, className = '' }) {
  const stars = useMemo(() => {
    const r = rng(seed)
    return Array.from({ length: count }).map(() => ({ x: r() * 100, y: r() * 100, s: r() * 1.8 + 0.6, d: 2 + r() * 4, o: r() * -5 }))
  }, [count, seed])
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden>
      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.s, height: s.s, animation: `twinkle ${s.d}s ease-in-out ${s.o}s infinite`, boxShadow: '0 0 4px #fff' }}
        />
      ))}
    </div>
  )
}
