import { useLayoutEffect, useRef, useState } from 'react'
import { archPath } from './Arch'
import ReflectingPool from './Water'

/**
 * Rumi Darwaza (Lucknow, 1784) — front elevation at dusk, floodlit.
 * Researched details: giant cusped arch in a half-octagonal half-dome recess, flaring crown-like crest,
 * octagonal chhatri whose lantern once lit the gate at night, slender banded corner minarets with bud
 * finials, two-storey arcaded wings, and water jets that flowed from carved flower buds.
 *
 * Scene units: viewBox -300 0 1800 760, gate centred on x = 600, ground/water line y = 560.
 */
const CX = 600
const GROUND = 556
const WATER = 562

// ── small building blocks ───────────────────────────────────────────────────
const Bud = ({ x, y, r = 0, s = 1 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    <path d="M0 0 C -5 -4, -5 -12, 0 -18 C 5 -12, 5 -4, 0 0 Z" fill="var(--rd-light)" stroke="var(--rd-mid)" strokeWidth=".8" />
    <path d="M-5 -2 q5 -6 10 0" fill="none" stroke="var(--rd-mid)" strokeWidth=".8" />
    <circle cy="-19" r="1.6" fill="var(--rd-light)" />
  </g>
)

const MiniChhatri = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x="-13" y="-4" width="26" height="4" fill="var(--rd-mid)" />
    <path d="M-10 -4 v-14 M0 -4 v-14 M10 -4 v-14" stroke="var(--rd-base)" strokeWidth="3" />
    <rect x="-14" y="-21" width="28" height="3" fill="var(--rd-mid)" />
    <path d="M-12 -21 C -12 -36, 12 -36, 12 -21 Z" fill="var(--rd-light)" />
    <path d="M-12 -21 h24" stroke="var(--gold)" strokeWidth="1" />
    {/* lotus-bud finial */}
    <path d="M0 -33 C -3 -36, -3 -41, 0 -45 C 3 -41, 3 -36, 0 -33 Z" fill="var(--gold)" />
    <path d="M0 -45 v-6" stroke="var(--gold)" strokeWidth="1.2" />
  </g>
)

/** Slender octagonal minaret with bands, small balconies and a mini-chhatri + bud finial. */
const Minaret = ({ x, top, bottom = GROUND, w = 22 }) => {
  const bands = []
  for (let y = bottom - 70; y > top + 40; y -= 70) bands.push(y)
  return (
    <g>
      <rect x={x - w / 2} y={top} width={w} height={bottom - top} fill="var(--rd-base)" />
      <rect x={x - w / 2} y={top} width={w * 0.32} height={bottom - top} fill="var(--rd-light)" opacity=".55" />
      <rect x={x + w * 0.18} y={top} width={w * 0.32} height={bottom - top} fill="var(--rd-mid)" opacity=".55" />
      {bands.map((y) => (
        <g key={y}>
          <rect x={x - w / 2 - 4} y={y} width={w + 8} height="5" fill="var(--rd-mid)" />
          <path d={`M${x - w / 2 - 4} ${y + 5} h${w + 8} l-3 5 h${-w - 2} z`} fill="var(--rd-deep)" opacity=".6" />
          <path d={archPath(10, 22, { lobes: 5 })} transform={`translate(${x - 5} ${y - 30})`} fill="var(--rd-deep)" />
        </g>
      ))}
      <MiniChhatri x={x} y={top} s={1.05} />
    </g>
  )
}

/** A storey of cusped arches (wing arcade). Lit interiors glow. */
const Arcade = ({ x0, x1, y, h, n, lit = true, seed = 0 }) => {
  const step = (x1 - x0) / n
  const w = step * 0.72
  return (
    <g>
      {Array.from({ length: n }).map((_, i) => {
        const ax = x0 + i * step + (step - w) / 2
        return (
          <g key={i}>
            <path d={archPath(w + 6, h + 4, { lobes: 7 })} transform={`translate(${ax - 3} ${y - 4})`} fill="var(--rd-mid)" />
            <path d={archPath(w, h, { lobes: 7 })} transform={`translate(${ax} ${y})`} fill="var(--rd-deep)" />
            {lit && (i + seed) % 3 !== 1 && (
              <path d={archPath(w * 0.8, h * 0.85, { lobes: 7 })} transform={`translate(${ax + w * 0.1} ${y + h * 0.15})`} fill="url(#rdWindow)" className="flicker" style={{ animationDelay: `${((i + seed) % 5) * 0.5}s` }} />
            )}
          </g>
        )
      })}
    </g>
  )
}

/** One flanking wing; drawn for the left side and mirrored for the right. */
const Wing = ({ from, to }) => {
  const top = 330
  return (
    <g>
      <rect x={from} y={top} width={to - from} height={GROUND - top} fill="var(--rd-base)" />
      {/* parapet with balusters */}
      <rect x={from} y={top - 6} width={to - from} height="8" fill="var(--rd-mid)" />
      {Array.from({ length: Math.floor((to - from) / 14) }).map((_, i) => (
        <rect key={i} x={from + 4 + i * 14} y={top - 22} width="6" height="16" rx="3" fill="var(--rd-light)" />
      ))}
      <rect x={from} y={top - 26} width={to - from} height="5" fill="var(--rd-mid)" />
      {/* storeys */}
      <rect x={from} y={top + 70} width={to - from} height="6" fill="var(--rd-mid)" />
      <Arcade x0={from + 10} x1={to - 10} y={top + 14} h={48} n={Math.round((to - from) / 52)} seed={from} />
      <Arcade x0={from + 6} x1={to - 6} y={top + 94} h={100} n={Math.round((to - from) / 70)} seed={from + 1} />
      {/* plinth */}
      <rect x={from} y={GROUND - 14} width={to - from} height="14" fill="var(--rd-mid)" />
      {/* light falloff toward the far end of the wing */}
      <rect x={from} y={top - 26} width={(to - from) * 0.6} height={GROUND - top + 26} fill="url(#rdFalloff)" />
    </g>
  )
}

/** Pigeons circling the crest (SMIL motion — cheap and widely supported). */
const Pigeons = () => {
  const loops = [
    { path: 'M600 150 C 760 60, 900 160, 760 230 C 640 280, 460 220, 470 140 C 480 70, 560 120, 600 150 Z', dur: 14, s: 1 },
    { path: 'M600 120 C 420 40, 300 150, 430 210 C 560 260, 760 210, 740 130 C 720 60, 640 100, 600 120 Z', dur: 18, s: 0.8 },
    { path: 'M560 170 C 700 90, 860 120, 820 200 C 780 260, 560 250, 520 200 C 490 160, 520 150, 560 170 Z', dur: 11, s: 0.65 },
    { path: 'M640 100 C 520 30, 380 90, 420 170 C 460 240, 700 230, 720 160 C 730 120, 680 110, 640 100 Z', dur: 16, s: 0.75 },
  ]
  return (
    <g fill="#fdf6e8" opacity=".9">
      {loops.map((l, i) => (
        <g key={i}>
          <g transform={`scale(${l.s})`} style={{ transformBox: 'fill-box' }}>
            <path d="M-9 0 Q -4 -6 0 0 Q 4 -6 9 0 Q 4 -2 0 2 Q -4 -2 -9 0 Z">
              <animate attributeName="d" dur=".5s" repeatCount="indefinite" values="M-9 0 Q -4 -6 0 0 Q 4 -6 9 0 Q 4 -2 0 2 Q -4 -2 -9 0 Z;M-9 2 Q -4 4 0 0 Q 4 4 9 2 Q 4 2 0 2 Q -4 2 -9 2 Z;M-9 0 Q -4 -6 0 0 Q 4 -6 9 0 Q 4 -2 0 2 Q -4 -2 -9 0 Z" />
            </path>
          </g>
          <animateMotion dur={`${l.dur}s`} repeatCount="indefinite" path={l.path} begin={`${-i * 3}s`} />
        </g>
      ))}
    </g>
  )
}

/** Water jets arcing from the carved flower buds (historic detail). */
const Fountains = () => {
  const jets = [
    // [startX, startY, endX, endY] for the left side; mirrored for the right
    [470, 430, 420, 556],
    [462, 360, 395, 556],
    [470, 290, 380, 556],
  ]
  const one = (sx, sy, ex, ey, k) => {
    const cx = sx - 40
    const cy = sy - 28
    const d = `M${sx} ${sy} Q ${cx} ${cy} ${ex} ${ey}`
    return (
      <g key={k}>
        <path d={d} fill="none" stroke="#e8f6ff" strokeOpacity=".22" strokeWidth="5" strokeLinecap="round" />
        <path d={d} fill="none" stroke="#ffffff" strokeOpacity=".75" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="6 10" className="jet-flow" />
        {[0, 1, 2].map((j) => (
          <circle key={j} cx={ex + (j - 1) * 6} cy={ey - 2} r="1.6" fill="#fff" className="splash" style={{ animationDelay: `${j * 0.25 + k * 0.1}s` }} />
        ))}
      </g>
    )
  }
  return (
    <g>
      {jets.map(([sx, sy, ex, ey], k) => one(sx, sy, ex, ey, k))}
      <g transform={`translate(${CX * 2} 0) scale(-1 1)`}>{jets.map(([sx, sy, ex, ey], k) => one(sx, sy, ex, ey, k + 3))}</g>
    </g>
  )
}

/** The gate itself (also used, flipped, as its own reflection). */
function Gate({ withLife = true }) {
  // geometry
  const bodyL = 430
  const bodyR = 770
  const bodyTop = 200
  const archW = 270
  const archH = 350
  const archX = CX - archW / 2
  const archY = GROUND - archH
  const passW = 104
  const passH = 150
  const crest = `M ${bodyL - 6} ${bodyTop + 6}
    C ${bodyL - 20} ${bodyTop - 50}, ${CX - 150} ${bodyTop - 92}, ${CX - 70} ${bodyTop - 102}
    C ${CX - 40} ${bodyTop - 106}, ${CX - 18} ${bodyTop - 112}, ${CX} ${bodyTop - 128}
    C ${CX + 18} ${bodyTop - 112}, ${CX + 40} ${bodyTop - 106}, ${CX + 70} ${bodyTop - 102}
    C ${CX + 150} ${bodyTop - 92}, ${bodyR + 20} ${bodyTop - 50}, ${bodyR + 6} ${bodyTop + 6} Z`

  // petals along the crest edge (sampled points on the two cubic halves)
  const petals = []
  const cubic = (p0, p1, p2, p3, t) => {
    const u = 1 - t
    return [0, 1].map((k) => u * u * u * p0[k] + 3 * u * u * t * p1[k] + 3 * u * t * t * p2[k] + t * t * t * p3[k])
  }
  const segs = [
    [[bodyL - 6, bodyTop + 6], [bodyL - 20, bodyTop - 50], [CX - 150, bodyTop - 92], [CX - 70, bodyTop - 102]],
    [[CX - 70, bodyTop - 102], [CX - 40, bodyTop - 106], [CX - 18, bodyTop - 112], [CX, bodyTop - 128]],
  ]
  segs.forEach((sg, si) => {
    const n = si === 0 ? 9 : 4
    for (let i = 0; i < n; i++) {
      const t = (i + 0.5) / n
      const [px, py] = cubic(...sg, t)
      const [qx, qy] = cubic(...sg, Math.min(1, t + 0.01))
      const ang = (Math.atan2(qy - py, qx - px) * 180) / Math.PI - 90
      petals.push([px, py, ang])
      petals.push([CX * 2 - px, py, -ang])
    }
  })

  return (
    <g>
      {/* ── crown / crest ── */}
      <path d={crest} fill="var(--rd-base)" />
      <path d={crest} fill="url(#rdCrestShade)" />
      {petals.map(([x, y, a], i) => (
        <path key={i} transform={`translate(${x} ${y}) rotate(${a})`} d="M0 0 C -7 -4, -6 -14, 0 -18 C 6 -14, 7 -4, 0 0 Z" fill="var(--rd-light)" stroke="var(--rd-mid)" strokeWidth=".8" />
      ))}
      {/* rows of small niches (taaq) on the crest */}
      {[0, 1].map((row) => {
        const y = bodyTop - 40 - row * 34
        const n = row ? 5 : 9
        const span = row ? 150 : 270
        return Array.from({ length: n }).map((_, i) => (
          <path key={`${row}-${i}`} d={archPath(16, 26, { lobes: 5 })} transform={`translate(${CX - span / 2 + (i + 0.5) * (span / n) - 8} ${y})`} fill="var(--rd-deep)" opacity=".75" />
        ))
      })}

      {/* ── gate body ── */}
      <rect x={bodyL} y={bodyTop} width={bodyR - bodyL} height={GROUND - bodyTop} fill="var(--rd-base)" />
      {/* gajkari relief texture */}
      <rect x={bodyL} y={bodyTop} width={bodyR - bodyL} height={GROUND - bodyTop} fill="url(#rdRelief)" opacity=".5" />
      <rect x={bodyL - 8} y={bodyTop - 6} width={bodyR - bodyL + 16} height="10" fill="var(--rd-mid)" />

      {/* concentric bead / rope mouldings around the arch */}
      <path d={archPath(archW + 56, archH + 28, { lobes: 11 })} transform={`translate(${archX - 28} ${archY - 28})`} fill="var(--rd-light)" opacity=".7" />
      <path d={archPath(archW + 40, archH + 20, { lobes: 11 })} transform={`translate(${archX - 20} ${archY - 20})`} fill="none" stroke="var(--rd-mid)" strokeWidth="2" strokeDasharray="2 3" />
      <path d={archPath(archW + 22, archH + 11, { lobes: 11 })} transform={`translate(${archX - 11} ${archY - 11})`} fill="var(--rd-mid)" />

      {/* spandrel rosettes + small paired fish (Awadh civic motif, kept subtle) */}
      {[-1, 1].map((d) => (
        <g key={d} transform={`translate(${CX + d * 128} ${archY + 6})`}>
          <circle r="11" fill="none" stroke="var(--rd-mid)" strokeWidth="1.2" />
          {Array.from({ length: 8 }).map((_, i) => (
            <ellipse key={i} cy="-6" rx="2.2" ry="5" transform={`rotate(${i * 45})`} fill="var(--rd-light)" />
          ))}
          <path transform={`translate(${-d * 16} 34) scale(${d} 1)`} d="M-10 0 C -4 -6, 6 -6, 10 0 C 6 6, -4 6, -10 0 Z M10 0 l5 -4 v8 z" fill="var(--gold)" opacity=".75" />
        </g>
      ))}

      {/* ── the great cusped arch with its half-octagonal half-dome recess ── */}
      <defs>
        <clipPath id="rdArchClip">
          <path d={archPath(archW, archH, { lobes: 11 })} transform={`translate(${archX} ${archY})`} />
        </clipPath>
      </defs>
      <g clipPath="url(#rdArchClip)">
        <rect x={archX} y={archY} width={archW} height={archH} fill="var(--rd-deep)" />
        {/* three receding planes */}
        <path d={`M${archX} ${archY} L${archX + 70} ${archY + 70} L${archX + 70} ${GROUND} L${archX} ${GROUND} Z`} fill="var(--rd-mid)" opacity=".55" />
        <path d={`M${archX + archW} ${archY} L${archX + archW - 70} ${archY + 70} L${archX + archW - 70} ${GROUND} L${archX + archW} ${GROUND} Z`} fill="#000" opacity=".22" />
        <rect x={archX + 70} y={archY + 70} width={archW - 140} height={archH} fill="var(--rd-base)" opacity=".55" />
        {/* petal fan / ribs of the half-dome */}
        <g transform={`translate(${CX} ${archY + 150})`} fill="none" stroke="var(--rd-light)" strokeOpacity=".55" strokeWidth="1.2">
          {Array.from({ length: 13 }).map((_, i) => {
            const a = Math.PI + (i / 12) * Math.PI
            return <path key={i} d={`M0 0 L${Math.cos(a) * 150} ${Math.sin(a) * 150}`} />
          })}
          {[60, 100, 140].map((r) => (
            <path key={r} d={`M${-r} 0 A ${r} ${r} 0 0 1 ${r} 0`} />
          ))}
        </g>
        {/* small niches in the recess */}
        {[-1, 1].map((d) =>
          [0, 1].map((k) => <path key={`${d}${k}`} d={archPath(26, 46, { lobes: 5 })} transform={`translate(${CX + d * 84 - 13} ${archY + 170 + k * 80})`} fill="#000" opacity=".25" />),
        )}
        {/* floodlight warmth from below */}
        <rect x={archX} y={archY} width={archW} height={archH} fill="url(#rdArchLight)" />
      </g>
      <path d={archPath(archW, archH, { lobes: 11 })} transform={`translate(${archX} ${archY})`} fill="none" stroke="var(--rd-light)" strokeWidth="2" />

      {/* passage arch with warm light beyond and the road */}
      <path d={archPath(passW + 14, passH + 8, { lobes: 7 })} transform={`translate(${CX - passW / 2 - 7} ${GROUND - passH - 8})`} fill="var(--rd-mid)" />
      <path d={archPath(passW, passH, { lobes: 7 })} transform={`translate(${CX - passW / 2} ${GROUND - passH})`} fill="url(#rdPassage)" />
      <path d={`M${CX - 30} ${GROUND} L${CX - 8} ${GROUND - 50} h16 L${CX + 30} ${GROUND} Z`} fill="#000" opacity=".12" />

      {/* flower-bud carvings along the arch frame (the historic water jets) */}
      {[
        [470, 430, -60],
        [462, 360, -70],
        [470, 290, -55],
        [492, 236, -40],
      ].map(([x, y, r], i) => (
        <g key={i}>
          <Bud x={x} y={y} r={r} />
          <Bud x={CX * 2 - x} y={y} r={-r} />
        </g>
      ))}

      {/* corner minarets */}
      <Minaret x={bodyL - 4} top={150} />
      <Minaret x={bodyR + 4} top={150} />

      {/* ── octagonal chhatri on top, with its lantern ── */}
      <g transform={`translate(${CX} ${bodyTop - 128})`}>
        <rect x="-30" y="-6" width="60" height="8" fill="var(--rd-mid)" />
        {withLife && <circle cy="-24" r="38" fill="url(#rdLanternHalo)" className="lantern-pulse" />}
        <path d="M-22 -6 v-34 M-8 -6 v-34 M8 -6 v-34 M22 -6 v-34" stroke="var(--rd-base)" strokeWidth="5" />
        <path d="M-15 -8 q-3 -16 0 -30 M15 -8 q3 -16 0 -30" stroke="var(--rd-mid)" strokeWidth="1" fill="none" />
        {/* lantern */}
        <path d="M0 -40 v6" stroke="var(--gold)" />
        <path d="M-5 -34 h10 l2 4 v8 l-2 4 h-10 l-2 -4 v-8 z" fill="#ffd27a" stroke="var(--gold)" strokeWidth=".8" className="flicker" />
        <rect x="-32" y="-46" width="64" height="6" fill="var(--rd-mid)" />
        <path d="M-26 -46 C -26 -76, 26 -76, 26 -46 Z" fill="var(--rd-base)" />
        <path d="M-26 -46 C -26 -76, 0 -78, 0 -78 C -10 -70, -14 -58, -14 -46 Z" fill="var(--rd-light)" opacity=".5" />
        {/* lotus base + kalash finial */}
        <path d="M-10 -72 q10 -8 20 0" fill="var(--rd-light)" />
        <circle cy="-80" r="4" fill="var(--gold)" />
        <path d="M0 -84 v-14" stroke="var(--gold)" strokeWidth="2" />
        <path d="M0 -98 C -3 -101, -3 -105, 0 -108 C 3 -105, 3 -101, 0 -98 Z" fill="var(--gold)" />
      </g>

      {/* ground plinth */}
      <rect x={bodyL - 30} y={GROUND - 10} width={bodyR - bodyL + 60} height="10" fill="var(--rd-mid)" />
    </g>
  )
}

const VB_H = 820 // starts at y = -60 so the chhatri finial is never clipped
const MIN_W = 1800

export default function RumiDarwazaScene({ className = '' }) {
  // Wide/short screens get a wider viewBox (longer wings + pool) instead of a vertically cropped gate.
  const ref = useRef(null)
  const [vbW, setVbW] = useState(MIN_W)
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () => {
      const r = el.getBoundingClientRect()
      if (r.width && r.height) setVbW(Math.max(MIN_W, Math.ceil((r.width / r.height) * VB_H)))
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  const x0 = CX - vbW / 2

  const scene = (life) => (
    <g>
      <Wing from={x0} to={418} />
      <g transform={`translate(${CX * 2} 0) scale(-1 1)`}>
        <Wing from={x0} to={418} />
      </g>
      <Gate withLife={life} />
    </g>
  )
  return (
    <svg ref={ref} viewBox={`${x0} -60 ${vbW} ${VB_H}`} preserveAspectRatio="xMidYMax slice" className={className} aria-label="Rumi Darwaza, Lucknow, at dusk">
      <defs>
        <radialGradient id="rdWindow" cx="50%" cy="80%" r="80%">
          <stop offset="0" stopColor="#ffe3a3" />
          <stop offset=".6" stopColor="var(--sky-glow)" />
          <stop offset="1" stopColor="var(--rd-deep)" />
        </radialGradient>
        <linearGradient id="rdFalloff" x1="0" x2="1">
          <stop offset="0" stopColor="#000" stopOpacity=".35" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="rdCrestShade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".18" />
          <stop offset="1" stopColor="#000" stopOpacity=".12" />
        </linearGradient>
        <linearGradient id="rdArchLight" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#ffcf7a" stopOpacity=".55" />
          <stop offset=".6" stopColor="#ffcf7a" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="rdPassage" cx="50%" cy="85%" r="75%">
          <stop offset="0" stopColor="#fff1c9" />
          <stop offset=".5" stopColor="#ffb85c" />
          <stop offset="1" stopColor="var(--rd-deep)" />
        </radialGradient>
        <radialGradient id="rdLanternHalo">
          <stop offset="0" stopColor="#ffe7a8" stopOpacity=".9" />
          <stop offset=".4" stopColor="#ffb347" stopOpacity=".35" />
          <stop offset="1" stopColor="#ffb347" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="rdFlood" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffe2a0" stopOpacity="0" />
          <stop offset=".5" stopColor="#ffe2a0" stopOpacity=".35" />
          <stop offset="1" stopColor="#ffe2a0" stopOpacity="0" />
        </linearGradient>
        <pattern id="rdRelief" width="34" height="34" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="var(--rd-mid)" strokeWidth=".8">
            <circle cx="17" cy="17" r="5" />
            <path d="M17 6 q4 5 0 6 q-4 -1 0 -6 M17 28 q4 -5 0 -6 q-4 1 0 6 M6 17 q5 4 6 0 q-1 -4 -6 0 M28 17 q-5 4 -6 0 q1 -4 6 0" />
          </g>
        </pattern>
        <clipPath id="rdFloodClip">
          <rect x={x0} y="0" width={vbW} height={GROUND} />
        </clipPath>
      </defs>

      {scene(true)}

      {/* floodlight sweep rising up the façade, then resting */}
      <g clipPath="url(#rdFloodClip)" style={{ mixBlendMode: 'soft-light' }}>
        <rect x="380" y="0" width="440" height="260" fill="url(#rdFlood)" className="flood-sweep" />
      </g>

      <Fountains />
      <Pigeons />

      <ReflectingPool
        x={x0}
        width={vbW}
        waterY={WATER}
        height={198}
        reflection={scene(false)}
        glows={[
          { x: CX, w: 110, color: '#ffd27a' },
          { x: CX, w: 30 },
          { x: 120, w: 40 },
          { x: 1080, w: 40 },
        ]}
        diyas={[
          { x: 140, y: 640, s: 1 },
          { x: 360, y: 700, s: 1.25 },
          { x: 520, y: 616, s: 0.85 },
          { x: 700, y: 668, s: 1.1 },
          { x: 860, y: 625, s: 0.9 },
          { x: 1060, y: 705, s: 1.3 },
          { x: 1250, y: 640, s: 1 },
        ]}
        lotuses={[
          { x: 250, y: 600, s: 0.8, rot: 10 },
          { x: 455, y: 735, s: 1.2, rot: -20 },
          { x: 960, y: 600, s: 0.75, flower: false, rot: 40 },
          { x: 790, y: 740, s: 1.1, rot: 15 },
          { x: 1180, y: 590, s: 0.7, rot: -10 },
          { x: 30, y: 720, s: 1, flower: false, rot: 60 },
        ]}
      />
    </svg>
  )
}
