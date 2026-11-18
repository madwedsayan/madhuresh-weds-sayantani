import { useId } from 'react'

/**
 * Builds a Mughal/Awadhi multi-foil (cusped) arch path, like Rumi Darwaza.
 * Returns an SVG path (in a w × h box) that is open at the bottom edge.
 */
export function archPath(w, h, { lobes = 9, spring = 0.42, cusp = 0.62, inset = 0 } = {}) {
  const x0 = inset
  const x1 = w - inset
  const top = inset
  const s = h * spring
  const cx = w / 2
  // Pointed (ogee-ish) curve, left half: P0 (x0,s) → P3 (cx,top)
  const L = [
    [x0, s],
    [x0, s * 0.3 + top * 0.7],
    [cx - (cx - x0) * 0.42, top + s * 0.02],
    [cx, top],
  ]
  const bez = (p, t) => {
    const u = 1 - t
    return [
      u * u * u * p[0][0] + 3 * u * u * t * p[1][0] + 3 * u * t * t * p[2][0] + t * t * t * p[3][0],
      u * u * u * p[0][1] + 3 * u * u * t * p[1][1] + 3 * u * t * t * p[2][1] + t * t * t * p[3][1],
    ]
  }
  const half = Math.floor(lobes / 2) + 0.5 // lobes per side (apex lobe shared)
  const pts = []
  const n = Math.ceil(half)
  for (let i = 0; i <= n; i++) pts.push(bez(L, Math.min(1, i / half)))
  // mirror for right side
  const right = pts
    .slice(0, -1)
    .reverse()
    .map(([x, y]) => [w - x, y])
  const all = [...pts.slice(0, -1), ...(pts[n][0] === cx ? [pts[n]] : []), ...right]
  // ensure apex present
  let d = `M ${x0} ${h} L ${x0} ${s.toFixed(2)}`
  for (let i = 1; i < all.length; i++) {
    const [ax, ay] = all[i - 1]
    const [bx, by] = all[i]
    const chord = Math.hypot(bx - ax, by - ay)
    const r = (chord / 2) / cusp
    d += ` A ${r.toFixed(2)} ${r.toFixed(2)} 0 0 1 ${bx.toFixed(2)} ${by.toFixed(2)}`
  }
  d += ` L ${x1} ${h} Z`
  return d
}

/**
 * Ornate arch frame: gold double outline + optional image or child illustration inside.
 * Size is driven by the parent (width 100%, aspect from viewBox).
 */
export default function ArchFrame({
  children,
  image,
  label,
  w = 300,
  h = 400,
  lobes = 9,
  fill = 'var(--paper)',
  stroke = 'var(--gold)',
  className = '',
  ornament = true,
}) {
  const id = useId().replace(/:/g, '')
  const outer = archPath(w, h, { lobes })
  const inner = archPath(w, h, { lobes, inset: 12 })
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={`block w-full h-auto overflow-visible ${className}`} role="img" aria-label={label || 'arch frame'}>
      <defs>
        <clipPath id={`clip-${id}`}>
          <path d={inner} />
        </clipPath>
        <linearGradient id={`g-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--gold-light)" />
          <stop offset=".5" stopColor={stroke} />
          <stop offset="1" stopColor="var(--gold-light)" />
        </linearGradient>
      </defs>
      <path d={outer} fill={`url(#g-${id})`} opacity=".95" />
      <path d={archPath(w, h, { lobes, inset: 6 })} fill="none" stroke="var(--maroon)" strokeOpacity=".35" strokeWidth="1" />
      <path d={inner} fill={fill} />
      <g clipPath={`url(#clip-${id})`}>
        {image ? (
          <image href={image} x="0" y="0" width={w} height={h} preserveAspectRatio="xMidYMid slice" />
        ) : (
          children
        )}
      </g>
      <path d={inner} fill="none" stroke={`url(#g-${id})`} strokeWidth="2.5" />
      {ornament && (
        <g fill={`url(#g-${id})`}>
          {/* finial / kalash on apex */}
          <circle cx={w / 2} cy={-8} r="5" />
          <path d={`M ${w / 2 - 4} -3 Q ${w / 2} 6 ${w / 2 + 4} -3 Z`} />
          <path d={`M ${w / 2} -24 Q ${w / 2 + 4} -16 ${w / 2} -13 Q ${w / 2 - 4} -16 ${w / 2} -24 Z`} />
        </g>
      )}
    </svg>
  )
}
