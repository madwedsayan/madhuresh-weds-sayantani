import { useLayoutEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  show: (i = 0) => ({
    pathLength: 1,
    opacity: 1,
    transition: { pathLength: { duration: 1.6, delay: i * 0.08, ease: 'easeInOut' }, opacity: { duration: 0.2, delay: i * 0.08 } },
  }),
}

/** Bengali Alpona divider: lotus centre, conch spirals and paddy-grain creepers, drawn on scroll. */
export function AlponaDivider({ color = 'currentColor', className = '' }) {
  const petals = Array.from({ length: 8 })
  return (
    <motion.svg
      viewBox="0 0 360 60"
      className={`mx-auto block h-auto w-full max-w-[420px] ${className}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-40px' }}
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {/* creepers */}
      {[1, -1].map((dir, k) => (
        <g key={k} transform={dir === -1 ? 'translate(360 0) scale(-1 1)' : undefined}>
          <motion.path custom={1} variants={draw} strokeWidth="1.6" d="M150 30 C 130 30, 125 14, 108 18 S 90 42, 72 36 S 50 16, 32 24 S 14 38, 4 30" />
          <motion.path custom={2} variants={draw} strokeWidth="1.2" d="M108 18 c -4 -8 2 -14 8 -10 c 4 3 1 9 -4 7" />
          <motion.path custom={3} variants={draw} strokeWidth="1.2" d="M72 36 c -2 8 5 12 10 8 c 3 -3 0 -8 -4 -6" />
          {/* paddy grains */}
          {[118, 96, 60, 44, 20].map((x, i) => (
            <motion.ellipse key={x} custom={4 + i} variants={draw} cx={x} cy={i % 2 ? 38 : 22} rx="2.2" ry="5" strokeWidth="1" transform={`rotate(${i % 2 ? 30 : -30} ${x} ${i % 2 ? 38 : 22})`} />
          ))}
          {[132, 84, 26].map((x, i) => (
            <circle key={x} cx={x} cy={i % 2 ? 22 : 38} r="1.6" fill={color} stroke="none" opacity=".9" />
          ))}
        </g>
      ))}
      {/* lotus */}
      <g transform="translate(180 30)">
        {petals.map((_, i) => (
          <motion.path key={i} custom={i * 0.5} variants={draw} strokeWidth="1.4" transform={`rotate(${i * 45})`} d="M0 -4 C 6 -10, 6 -20, 0 -26 C -6 -20, -6 -10, 0 -4 Z" />
        ))}
        <motion.circle custom={2} variants={draw} r="6" strokeWidth="1.4" />
        <circle r="2.2" fill="var(--sindoor)" stroke="none" />
      </g>
    </motion.svg>
  )
}

/** Concentric Alpona lotus mandala (used inside arches and as background ornaments). */
export function AlponaLotus({ size = 200, color = 'currentColor', className = '', animate = true }) {
  const ring = (n, r1, r2, w) =>
    Array.from({ length: n }).map((_, i) => (
      <path
        key={`${n}-${i}`}
        transform={`rotate(${(360 / n) * i})`}
        d={`M0 ${-r1} C ${w} ${-(r1 + (r2 - r1) * 0.4)}, ${w * 0.8} ${-(r1 + (r2 - r1) * 0.85)}, 0 ${-r2} C ${-w * 0.8} ${-(r1 + (r2 - r1) * 0.85)}, ${-w} ${-(r1 + (r2 - r1) * 0.4)}, 0 ${-r1} Z`}
      />
    ))
  const G = animate ? motion.g : 'g'
  return (
    <svg viewBox="-100 -100 200 200" width={size} height={size} className={className} aria-hidden>
      <G
        fill="none"
        stroke={color}
        strokeWidth="1.2"
        {...(animate ? { animate: { rotate: 360 }, transition: { duration: 120, repeat: Infinity, ease: 'linear' } } : {})}
      >
        <circle r="10" />
        {ring(8, 10, 34, 12)}
        {ring(16, 36, 62, 9)}
        <circle r="66" strokeDasharray="2 5" />
        {ring(24, 68, 92, 7)}
        {Array.from({ length: 24 }).map((_, i) => (
          <circle key={i} cx="0" cy="-96" r="1.8" fill={color} transform={`rotate(${15 * i + 7.5})`} />
        ))}
      </G>
      <circle r="4" fill="var(--sindoor)" />
    </svg>
  )
}

/** Lucknowi chikankari spray: murri rice-grain petals, phanda knots and tepchi vines. */
export function ChikanSpray({ className = '', color = 'white', opacity = 0.7 }) {
  const flower = (x, y, s = 1, rot = 0) => (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      {Array.from({ length: 6 }).map((_, i) => (
        <ellipse key={i} cx="0" cy="-9" rx="3.2" ry="8" transform={`rotate(${i * 60})`} fill={color} fillOpacity=".18" stroke={color} strokeWidth=".9" />
      ))}
      {[0, 120, 240].map((r) => (
        <circle key={r} cx="0" cy="-2.6" r="1.5" fill={color} transform={`rotate(${r})`} />
      ))}
    </g>
  )
  return (
    <svg viewBox="0 0 220 120" className={className} style={{ opacity }} aria-hidden>
      <g fill="none" stroke={color} strokeWidth="1" strokeDasharray="3 2.5" strokeLinecap="round">
        <path d="M10 110 C 40 90, 60 60, 110 58 S 180 30, 210 12" />
        <path d="M70 72 C 66 56, 76 44, 88 40" />
        <path d="M140 46 C 150 60, 168 66, 182 62" />
      </g>
      {flower(110, 58, 1.2)}
      {flower(88, 38, 0.8, 20)}
      {flower(182, 62, 0.75, -15)}
      {flower(36, 94, 0.7, 10)}
      {[
        [60, 80],
        [150, 36],
        [200, 22],
        [128, 74],
      ].map(([x, y], i) => (
        <g key={i} fill={color}>
          <circle cx={x} cy={y} r="1.6" />
          <circle cx={x + 4} cy={y + 2} r="1.3" />
          <circle cx={x + 1} cy={y + 5} r="1.3" />
        </g>
      ))}
      {[
        [52, 64, -30],
        [160, 76, 40],
        [96, 92, 10],
      ].map(([x, y, r], i) => (
        <ellipse key={i} cx={x} cy={y} rx="2.4" ry="7" transform={`rotate(${r} ${x} ${y})`} fill={color} fillOpacity=".25" stroke={color} strokeWidth=".8" />
      ))}
    </svg>
  )
}

/** Minimal Ganesha line-art. */
export function Ganesha({ className = '', color = 'currentColor' }) {
  return (
    <svg viewBox="0 0 120 130" className={className} fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-label="Shri Ganesha">
      {/* crown */}
      <path d="M44 34 L48 18 L54 26 L60 10 L66 26 L72 18 L76 34" />
      <path d="M42 36 Q60 30 78 36" />
      <circle cx="60" cy="8" r="2" fill={color} stroke="none" />
      {/* ears */}
      <path d="M44 40 C 22 30, 8 48, 16 66 C 22 80, 36 78, 44 70" />
      <path d="M76 40 C 98 30, 112 48, 104 66 C 98 80, 84 78, 76 70" />
      <path d="M40 48 C 30 46, 24 54, 28 62" strokeWidth="1.2" opacity=".6" />
      <path d="M80 48 C 90 46, 96 54, 92 62" strokeWidth="1.2" opacity=".6" />
      {/* head + trunk */}
      <path d="M44 40 C 44 60, 50 70, 56 76 C 58 92, 56 104, 64 112 C 72 120, 84 114, 82 104 C 80 98, 72 100, 74 106" />
      <path d="M76 40 C 76 58, 72 68, 64 76" />
      {/* eyes, tilak, tusk */}
      <path d="M50 52 q3 -3 6 0" />
      <path d="M64 52 q3 -3 6 0" />
      <path d="M60 38 v8" stroke="var(--sindoor)" strokeWidth="2.6" />
      <path d="M68 78 q8 2 10 10" />
      {/* modak */}
      <path d="M34 112 q6 -14 12 0 z" strokeWidth="1.6" />
    </svg>
  )
}

/** Prajapati (butterfly) — Bengali marriage invocation motif. */
export function Butterfly({ className = '', color = 'currentColor' }) {
  return (
    <svg viewBox="0 0 60 40" className={className} fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" aria-hidden>
      <path d="M30 12 C 22 0, 4 2, 6 14 C 7 22, 20 22, 30 20" />
      <path d="M30 12 C 38 0, 56 2, 54 14 C 53 22, 40 22, 30 20" />
      <path d="M30 20 C 22 22, 12 30, 18 36 C 24 40, 29 30, 30 24" />
      <path d="M30 20 C 38 22, 48 30, 42 36 C 36 40, 31 30, 30 24" />
      <path d="M30 10 V 32" strokeWidth="2" />
      <path d="M30 10 C 28 6, 26 4, 24 3 M30 10 C 32 6, 34 4, 36 3" />
      <circle cx="16" cy="12" r="2" fill="var(--sindoor)" stroke="none" />
      <circle cx="44" cy="12" r="2" fill="var(--sindoor)" stroke="none" />
    </svg>
  )
}

/** Betel (paan) leaf — heart-shaped with veins. Used for the Shubho Drishti opener. */
export function PaanLeaf({ className = '', flip = false, id = 'paan' }) {
  return (
    <svg viewBox="-12 -8 224 290" className={className} style={flip ? { transform: 'scaleX(-1)' } : undefined} aria-hidden>
      <defs>
        <radialGradient id={`${id}-g`} cx="40%" cy="35%" r="75%">
          <stop offset="0" stopColor="#8fd16a" />
          <stop offset=".55" stopColor="#3f8f3a" />
          <stop offset="1" stopColor="#1f5a26" />
        </radialGradient>
        <linearGradient id={`${id}-sheen`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".35" />
          <stop offset=".5" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={`${id}-shadow`} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#000" stopOpacity=".38" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* soft shadow baked into the SVG — cheaper than a CSS drop-shadow while animating */}
      <ellipse cx="104" cy="150" rx="104" ry="122" fill={`url(#${id}-shadow)`} transform="translate(6 14)" />
      <path
        d="M100 252 C 96 236, 40 200, 18 150 C -6 96, 14 36, 58 22 C 80 15, 94 26, 100 40 C 106 26, 120 15, 142 22 C 186 36, 206 96, 182 150 C 160 200, 104 236, 100 252 Z"
        fill={`url(#${id}-g)`}
        stroke="#1a4a1f"
        strokeWidth="2"
      />
      <path d="M100 252 C 96 236, 40 200, 18 150 C -6 96, 14 36, 58 22 C 80 15, 94 26, 100 40 Z" fill={`url(#${id}-sheen)`} />
      <g fill="none" stroke="#c9e8a6" strokeOpacity=".7" strokeLinecap="round">
        <path d="M100 44 C 100 110, 100 180, 100 248" strokeWidth="2.4" />
        <path d="M100 90 C 76 80, 50 74, 30 84" strokeWidth="1.4" />
        <path d="M100 90 C 124 80, 150 74, 170 84" strokeWidth="1.4" />
        <path d="M100 130 C 76 124, 46 124, 24 140" strokeWidth="1.3" />
        <path d="M100 130 C 124 124, 154 124, 176 140" strokeWidth="1.3" />
        <path d="M100 172 C 82 170, 60 178, 46 194" strokeWidth="1.2" />
        <path d="M100 172 C 118 170, 140 178, 154 194" strokeWidth="1.2" />
      </g>
      {/* chandan dots */}
      <g fill="#fff8e8">
        {[60, 74, 88, 100, 112, 126, 140].map((x, i) => (
          <circle key={x} cx={x} cy={112 - Math.sin((i / 6) * Math.PI) * 14} r="2.4" />
        ))}
      </g>
      <circle cx="100" cy="150" r="5" fill="#b3121f" />
    </svg>
  )
}

/**
 * Marigold + mango-leaf toran (door garland).
 * The viewBox follows the element's real aspect ratio, so wide screens get MORE strands
 * (never a zoomed-in, cropped garland).
 */
export function Toran({ className = '' }) {
  const ref = useRef(null)
  const [vbW, setVbW] = useState(400)
  const H = 92
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () => {
      const r = el.getBoundingClientRect()
      if (r.width && r.height) setVbW(Math.max(200, Math.round((r.width / r.height) * H)))
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const gap = 44
  const strands = Math.max(5, Math.round((vbW - 40) / gap) + 1)
  const step = (vbW - 40) / (strands - 1)
  const sag = 16
  const yAt = (x) => 6 + Math.sin((x / vbW) * Math.PI) * sag
  return (
    <svg ref={ref} viewBox={`0 0 ${vbW} ${H}`} preserveAspectRatio="xMidYMin meet" className={className} aria-hidden>
      <path d={`M0 6 Q${vbW / 2} ${6 + sag * 2} ${vbW} 6`} stroke="var(--gold)" strokeWidth="3" fill="none" />
      {Array.from({ length: strands }).map((_, i) => {
        const x = 20 + i * step
        const y0 = yAt(x)
        const len = i % 2 ? 40 : 56
        return (
          <g key={i} className="sway" style={{ transformOrigin: `${x}px ${y0}px`, animationDelay: `${(i % 7) * 0.3}s` }}>
            {Array.from({ length: Math.round(len / 9) }).map((_, j) => (
              <circle key={j} cx={x} cy={y0 + 6 + j * 9} r="5" fill={j % 3 === 2 ? '#d9480f' : j % 2 ? '#f59f00' : '#ffb703'} />
            ))}
            <path d={`M${x} ${y0 + len + 6} q-6 10 0 20 q6 -10 0 -20`} fill="#2f6b3a" />
          </g>
        )
      })}
      {Array.from({ length: strands - 1 }).map((_, i) => {
        const x = 20 + (i + 0.5) * step
        const y0 = yAt(x)
        return <path key={i} d={`M${x} ${y0} q-8 13 0 28 q8 -15 0 -28`} fill="#3d8a47" stroke="#1f4d27" strokeWidth=".6" />
      })}
    </svg>
  )
}

/** Lucknowi kite (patang). */
export function Kite({ className = '', color = '#e63946', color2 = '#ffd166', style }) {
  return (
    <svg viewBox="0 0 60 110" className={className} style={style} aria-hidden>
      <path d="M30 2 L56 34 L30 66 L4 34 Z" fill={color} />
      <path d="M30 2 L56 34 L30 34 Z" fill={color2} />
      <path d="M30 2 V66 M4 34 H56" stroke="#00000033" strokeWidth="1" />
      <path d="M30 66 l-6 8 h12 z" fill={color2} />
      <path d="M30 74 C 20 84, 40 92, 28 108" fill="none" stroke="#ffffff99" strokeWidth="1" />
    </svg>
  )
}

/** Lakshmi footprints (Alpona style) — always pointing forward/inward. */
export function Footprint({ className = '', color = 'white' }) {
  return (
    <svg viewBox="0 0 40 70" className={className} aria-hidden>
      <path d="M20 22 C 32 22, 34 40, 30 54 C 27 64, 13 64, 10 54 C 6 40, 8 22, 20 22 Z" fill={color} fillOpacity=".9" />
      {[
        [9, 14, 4],
        [16, 8, 4.4],
        [24, 7, 4],
        [31, 11, 3.4],
        [35, 18, 2.8],
      ].map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill={color} fillOpacity=".9" />
      ))}
      <circle cx="20" cy="42" r="3.2" fill="var(--sindoor)" />
    </svg>
  )
}

/** Shankha (conch) icon. */
export function Shankha({ className = '', color = 'currentColor' }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" aria-hidden>
      <path d="M10 40 C 6 24, 22 8, 40 10 C 54 12, 60 26, 52 36 C 46 44, 34 42, 34 34 C 34 28, 42 26, 44 32" />
      <path d="M10 40 C 18 52, 34 58, 50 54 L 56 58" />
      <path d="M18 30 C 24 34, 30 38, 40 40" opacity=".6" />
    </svg>
  )
}
