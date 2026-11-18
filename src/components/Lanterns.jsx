import { useMemo } from 'react'
import { rng } from '../lib/random'

/**
 * A 3D-looking paper sky lantern (kongming): tapered paper shell lit from the flame at its open base,
 * cylindrical shading, bamboo ribs that slowly turn past (the lantern rotating as it drifts), a glowing
 * rim and a soft halo. Pure CSS with transform/opacity animations only — cheap on mobile GPUs.
 */
export function Lantern({ size = 24, style, className = '', seed = 0, lite = false }) {
  // lite: for rising lanterns (opener/finale) — already moving, so skip the sway + turning ribs
  const detailed = size >= 18 && !lite
  const t = (seed * 7.3) % 1
  return (
    <div className={`absolute ${className}`} style={{ width: size, height: size * 1.36, ...style }} aria-hidden>
      <div className={lite ? 'absolute inset-0' : 'lantern-sway'} style={lite ? undefined : { animationDuration: `${5.5 + t * 3}s`, animationDelay: `${-t * 8}s` }}>
        <span className="lantern-halo" />
        <span className="lantern-body">
          {detailed && <span className="lantern-ribs" style={{ animationDuration: `${10 + t * 8}s`, animationDirection: t > 0.5 ? 'reverse' : 'normal' }} />}
          <span className="lantern-shade" />
        </span>
        <span className="lantern-rim" />
        {size >= 18 && <span className="lantern-flame flicker" style={{ animationDelay: `${-t * 3}s` }} />}
      </div>
    </div>
  )
}

/**
 * A field of lanterns. mode="static" → positioned only (parent moves the layer with scroll).
 * mode="rise" → each lantern continuously rises with CSS keyframes (opener / finale).
 */
export default function LanternField({ count = 16, seed = 1, minSize = 14, maxSize = 34, mode = 'static', height = 100, opacity = 1, className = '' }) {
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
    <div className={`pointer-events-none absolute inset-0 ${className}`} style={{ opacity }} aria-hidden>
      {lanterns.map((l, i) =>
        mode === 'rise' ? (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${l.left}%`,
              bottom: '-12vh',
              animation: `lantern-rise ${l.dur}s cubic-bezier(.45,.05,.55,.95) ${l.delay}s infinite`,
              '--drift': `${l.drift}px`,
            }}
          >
            <Lantern size={l.size} seed={i + 1} lite style={{ position: 'relative' }} />
          </div>
        ) : (
          <Lantern key={i} size={l.size} seed={i + 1 + seed} style={{ left: `${l.left}%`, top: `${l.top}%` }} />
        ),
      )}
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
          className="star absolute rounded-full bg-white"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.s, height: s.s, animation: `twinkle ${s.d}s ease-in-out ${s.o}s infinite`, boxShadow: '0 0 4px #fff' }}
        />
      ))}
    </div>
  )
}
