import { useEffect, useId, useState } from 'react'
import { rng } from '../../lib/random'
import { LITE } from '../../lib/perf'

/** True on wide/fine-pointer screens — the animated displacement filter is desktop-only. */
function useRichWater() {
  const [rich, setRich] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 900px) and (pointer: fine) and (prefers-reduced-motion: no-preference)')
    const set = () => setRich(mq.matches)
    set()
    mq.addEventListener?.('change', set)
    return () => mq.removeEventListener?.('change', set)
  }, [])
  return rich
}

const Diya = ({ x, y, s = 1, delay = 0, id }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    {/* expanding ripple rings */}
    {[0, 1.3].map((d) => (
      <ellipse key={d} rx="30" ry="7" fill="none" stroke="#ffe7b0" strokeWidth="1.2" className="ripple-ring" style={{ animationDelay: `${delay + d}s` }} />
    ))}
    {/* light reflected straight down into the water */}
    <rect x="-5" y="2" width="10" height="60" fill={`url(#${id}-streak)`} className="river-glint" style={{ animationDelay: `${delay}s` }} />
    <g className="bob" style={{ animationDelay: `${delay}s` }}>
      <ellipse cy="-6" rx="26" ry="16" fill="#ffd27a" opacity=".22" className="flicker" />
      <path d="M-15 0 q15 11 30 0 q-6 -4 -15 -4 q-9 0 -15 4z" fill="#b5562d" />
      <path d="M-15 0 q15 5 30 0" stroke="#7a3a1d" strokeWidth="1" fill="none" />
      <path d="M0 -5 q-5 -8 0 -16 q5 8 0 16" fill="#ffb703" className="flicker" />
      <path d="M0 -7 q-2 -4 0 -8 q2 4 0 8" fill="#fff3bf" />
    </g>
  </g>
)

const Lotus = ({ x, y, s = 1, flower = true, rot = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <g className="bob" style={{ animationDuration: '7s' }}>
      {/* lily pad lies flat on the water: a foreshortened disc with a notch (rot only moves the notch) */}
      <ellipse rx="26" ry="8" fill="#2f6b3a" opacity=".92" />
      <path d={`M0 0 L${26 * Math.cos((rot * Math.PI) / 180)} ${8 * Math.sin((rot * Math.PI) / 180) - 1.5} L${26 * Math.cos(((rot + 16) * Math.PI) / 180)} ${8 * Math.sin(((rot + 16) * Math.PI) / 180) + 1.5} Z`} fill="var(--pool)" />
      <path d="M-20 1 a20 5 0 0 0 40 0" fill="none" stroke="#5b9a5f" strokeWidth="1" opacity=".7" />
      {flower && (
        <g transform="translate(0 -4)">
          {[-36, -18, 0, 18, 36].map((r) => (
            <path key={r} transform={`rotate(${r})`} d="M0 0 C 6 -6, 5 -16, 0 -22 C -5 -16, -6 -6, 0 0 Z" fill={Math.abs(r) === 36 ? '#f2a7bd' : '#f7c4d3'} stroke="#d97795" strokeWidth=".8" />
          ))}
          <circle cy="-3" r="2.4" fill="#ffd166" />
        </g>
      )}
    </g>
  </g>
)

/**
 * Realistic reflecting pool for an SVG scene.
 * Props (all in the parent SVG's user units):
 *  x, width, waterY (water line), height,
 *  reflection: JSX of the scene to mirror (drawn upright; we flip it about waterY),
 *  glows: [{ x, w, color }] light sources whose reflections shimmer,
 *  diyas / lotuses: [{ x, y, s }]
 */
export default function ReflectingPool({ x = 0, width = 1200, waterY = 560, height = 200, reflection, glows = [], diyas = [], lotuses = [], skyTop = 'var(--sky-3)', deep = 'var(--sky-1)' }) {
  const uid = useId().replace(/:/g, '')
  const rich = useRichWater()
  const bottom = waterY + height

  // perspective ripple highlights: short & dense near the far edge, long & sparse near the viewer
  const ripples = (() => {
    const r = rng(17)
    const out = []
    for (let i = 0; i < (LITE ? 18 : 46); i++) {
      const t = Math.pow(r(), 1.6) // more lines near the top (far)
      const y = waterY + 6 + t * (height - 14)
      const len = 18 + t * 150 + r() * 40
      out.push({ x: x + r() * width, y, len, w: 0.8 + t * 1.6, o: 0.18 + r() * 0.25, d: 4 + r() * 6, delay: -r() * 8, warm: r() < 0.25 })
    }
    return out
  })()

  return (
    <g>
      <defs>
        <linearGradient id={`${uid}-water`} x1="0" y1={waterY} x2="0" y2={bottom} gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={skyTop} />
          <stop offset=".35" stopColor="var(--pool)" />
          <stop offset="1" stopColor={deep} />
        </linearGradient>
        <linearGradient id={`${uid}-fade`} x1="0" y1={waterY} x2="0" y2={bottom} gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fff" stopOpacity=".85" />
          <stop offset=".55" stopColor="#fff" stopOpacity=".35" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id={`${uid}-mask`} maskUnits="userSpaceOnUse" x={x} y={waterY} width={width} height={height}>
          <rect x={x} y={waterY} width={width} height={height} fill={`url(#${uid}-fade)`} />
        </mask>
        <filter id={`${uid}-ripple`} filterUnits="userSpaceOnUse" x={x} y={waterY - 10} width={width} height={height + 20}>
          <feTurbulence type="fractalNoise" baseFrequency="0.006 0.12" numOctaves="2" seed="4" result="noise">
            {rich && <animate attributeName="baseFrequency" dur="9s" values="0.006 0.12;0.007 0.14;0.006 0.12" repeatCount="indefinite" />}
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="16" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <linearGradient id={`${uid}-streak`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffe7b0" stopOpacity=".75" />
          <stop offset="1" stopColor="#ffe7b0" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${uid}-glow`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--sky-glow)" stopOpacity=".6" />
          <stop offset="1" stopColor="var(--sky-glow)" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* water body */}
      <rect x={x} y={waterY} width={width} height={height} fill={`url(#${uid}-water)`} />

      {/* mirrored scene, rippled + fading with depth */}
      {reflection && (
        <g mask={`url(#${uid}-mask)`}>
          <g filter={`url(#${uid}-ripple)`} opacity=".7" className="still">
            <g transform={`translate(0 ${waterY * 2}) scale(1 -1)`}>{reflection}</g>
          </g>
        </g>
      )}
      {/* tint the reflection toward the water colour */}
      <rect x={x} y={waterY} width={width} height={height} fill="var(--pool)" opacity=".28" />

      {/* shimmering reflections of light sources */}
      {glows.map((g, i) => (
        <g key={i}>
          <rect x={g.x - g.w / 2} y={waterY + 2} width={g.w} height={height * 0.8} fill={`url(#${uid}-glow)`} className="river-glint" style={{ animationDelay: `${i * 0.5}s`, animationDuration: '3.4s' }} />
          {Array.from({ length: 6 }).map((_, j) => (
            <rect key={j} x={g.x - g.w * (0.35 - j * 0.03)} y={waterY + 10 + j * 18} width={g.w * (0.7 - j * 0.06)} height="2.2" rx="1" fill="#fff3d0" opacity={0.55 - j * 0.07} className="ripple-line" style={{ animationDelay: `${-j * 0.7}s` }} />
          ))}
        </g>
      ))}

      {/* moving ripple highlights */}
      <g strokeLinecap="round">
        {ripples.map((r, i) => (
          <path
            key={i}
            d={`M${r.x} ${r.y} q ${r.len / 4} -${r.w * 1.2} ${r.len / 2} 0 t ${r.len / 2} 0`}
            fill="none"
            stroke={r.warm ? '#ffe2a8' : '#ffffff'}
            strokeOpacity={r.o}
            strokeWidth={r.w}
            className="ripple-line"
            style={{ animationDuration: `${r.d}s`, animationDelay: `${r.delay}s` }}
          />
        ))}
      </g>

      {lotuses.map((l, i) => (
        <Lotus key={i} {...l} />
      ))}
      {diyas.map((d, i) => (
        <Diya key={i} id={uid} delay={i * 0.6} {...d} />
      ))}

      {/* stone ghat edge at the water line */}
      <rect x={x} y={waterY - 8} width={width} height="9" fill="var(--stone)" />
      <rect x={x} y={waterY - 8} width={width} height="1.5" fill="#fff" opacity=".35" />
      <rect x={x} y={waterY + 1} width={width} height="5" fill="#000" opacity=".18" />
    </g>
  )
}
