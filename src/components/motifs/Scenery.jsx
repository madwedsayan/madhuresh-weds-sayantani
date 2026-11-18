import { archPath } from './Arch'

/** Panorama: Lucknow arches & domes ↔ Hooghly with Howrah Bridge ↔ Victoria Memorial. */
export function TwilightSkyline({ className = '' }) {
  const ink = '#0b0a26'
  const ink2 = '#16143e'
  // Howrah Bridge (cantilever truss) — reused for its river reflection
  const bridge = (
    <g stroke="#1d1b52" fill="none" strokeWidth="5" strokeLinejoin="round">
      <path d="M620 262 H1180" strokeWidth="8" />
      <path d="M620 262 L720 120 L760 120 Q900 210 1040 120 L1080 120 L1180 262" />
      <path d="M640 262 L720 150 M720 120 V262 M760 120 V262 M1040 120 V262 M1080 120 V262 M1080 150 L1160 262" strokeWidth="3" />
      {Array.from({ length: 13 }).map((_, i) => {
        const x = 780 + i * 20
        const t = (x - 760) / 280
        const y = 120 + 4 * 45 * t * (1 - t)
        return <path key={i} d={`M${x} ${y} V262`} strokeWidth="1.6" />
      })}
      <path d="M760 140 L800 262 M1040 140 L1000 262 M720 200 L760 140 M1080 200 L1040 140" strokeWidth="2" />
    </g>
  )
  return (
    <svg viewBox="0 0 1600 360" preserveAspectRatio="xMidYMax slice" className={className} aria-label="Lucknow and Kolkata skyline">
      <defs>
        <linearGradient id="river" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a2a6a" />
          <stop offset="1" stopColor="#0b0a26" />
        </linearGradient>
        <linearGradient id="riverFadeGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="white" stopOpacity=".9" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="rumiGlow" cx="50%" cy="85%" r="75%">
          <stop offset="0" stopColor="#ffd98a" stopOpacity=".85" />
          <stop offset=".55" stopColor="#f2a516" stopOpacity=".45" />
          <stop offset="1" stopColor="#b5562d" stopOpacity=".12" />
        </radialGradient>
        <mask id="riverFade">
          <rect x="0" y="266" width="1600" height="94" fill="url(#riverFadeGrad)" />
        </mask>
      </defs>
      {/* far domes (Bara Imambara-like) */}
      <g fill={ink2}>
        <path d="M40 260 v-60 h260 v60 z" />
        <path d="M110 200 c0 -50 80 -50 80 0 z" />
        <path d="M150 150 v-14" stroke={ink2} strokeWidth="3" />
        {[60, 280].map((x) => (
          <g key={x}>
            <rect x={x - 10} y="150" width="20" height="60" />
            <path d={`M${x - 14} 150 c0 -24 28 -24 28 0 z`} />
          </g>
        ))}
      </g>
      {/* Rumi Darwaza silhouette */}
      <g fill={ink}>
        <path d="M250 270 V150 h200 V270 Z" />
        <rect x="236" y="120" width="26" height="150" />
        <rect x="438" y="120" width="26" height="150" />
        <path d="M232 120 c0 -26 34 -26 34 0 z M434 120 c0 -26 34 -26 34 0 z" />
        <path d="M320 150 c0 -40 60 -40 60 0 z" />
        <path d="M350 108 v-14" stroke={ink} strokeWidth="3" />
      </g>
      <path d={archPath(110, 110, { lobes: 9 })} transform="translate(295 162)" fill="url(#rumiGlow)" className="flicker" />
      {/* small lit windows */}
      {[70, 110, 150, 190, 230].map((x) => (
        <rect key={x} x={x} y="225" width="8" height="14" rx="4" fill="#ffcf7a" opacity=".7" />
      ))}

      {/* river (Hooghly) — animated */}
      <rect x="0" y="268" width="1600" height="92" fill="url(#river)" />
      <rect x="0" y="268" width="1600" height="3" fill="#6a6ab8" opacity=".35" />

      {/* mirrored, shimmering reflection of the bridge + Rumi Darwaza glow */}
      <g mask="url(#riverFade)">
        <g transform="translate(0 532) scale(1 -1)" opacity=".32">
          <g className="river-shimmer">{bridge}</g>
        </g>
        {Array.from({ length: 28 }).map((_, i) => (
          <rect key={i} x={628 + i * 20} y="272" width="4" height={14 + (i % 4) * 7} rx="2" fill="#ffd27a" className="river-glint" style={{ animationDelay: `${(i % 7) * 0.35}s` }} />
        ))}
        <rect x="318" y="274" width="64" height="40" fill="#ffb347" opacity=".14" className="river-glint" />
        {[1290, 1330, 1370, 1450, 1490, 1530].map((x, i) => (
          <rect key={x} x={x + 2} y="274" width="4" height="18" rx="2" fill="#ffcf7a" className="river-glint" style={{ animationDelay: `${i * 0.4}s` }} />
        ))}
      </g>

      {/* flowing ripple lines */}
      <g fill="none" strokeLinecap="round">
        {Array.from({ length: 9 }).map((_, i) => (
          <path
            key={i}
            d={`M-40 ${280 + i * 9} q 25 -4 50 0 t 50 0 t 50 0 t 50 0 t 50 0 t 50 0 t 50 0 t 50 0 t 50 0 t 50 0 t 50 0 t 50 0 t 50 0 t 50 0 t 50 0 t 50 0 t 50 0 t 50 0 t 50 0 t 50 0 t 50 0 t 50 0 t 50 0 t 50 0 t 50 0 t 50 0 t 50 0 t 50 0 t 50 0 t 50 0 t 50 0 t 50 0 t 50 0 t 50 0`}
            stroke={i % 3 === 0 ? '#ffd27a' : '#8f8fe0'}
            strokeOpacity={i % 3 === 0 ? 0.28 : 0.22 - i * 0.012}
            strokeWidth={i < 3 ? 1.2 : 1.6}
            strokeDasharray={`${40 + (i * 23) % 70} ${90 + (i * 37) % 120}`}
            className="river-flow"
            style={{ animationDuration: `${9 + i * 1.7}s`, animationDirection: i % 2 ? 'reverse' : 'normal' }}
          />
        ))}
      </g>

      {/* a little Kolkata country boat (nouka) drifting with a lantern */}
      <g className="boat-drift">
        <g transform="translate(0 300)">
          <path d="M-46 0 Q0 18 46 0 L36 -6 Q0 6 -36 -6 Z" fill="#0b0a26" />
          <path d="M-30 -6 Q-10 -26 14 -22 Q20 -12 22 -4 Q0 2 -30 -6 Z" fill="#16143e" />
          <path d="M8 -22 V-46" stroke="#0b0a26" strokeWidth="2" />
          <circle cx="8" cy="-48" r="7" fill="#ffd27a" opacity=".25" />
          <rect x="5" y="-52" width="6" height="8" rx="2" fill="#ffb347" />
          <path d="M-40 6 Q0 20 40 6" stroke="#ffd27a" strokeOpacity=".25" fill="none" />
        </g>
      </g>

      {bridge}
      {/* bridge lights */}
      {Array.from({ length: 28 }).map((_, i) => (
        <circle key={i} cx={630 + i * 20} cy="258" r="2" fill="#ffd27a" className="flicker" style={{ animationDelay: `${(i % 5) * 0.3}s` }} />
      ))}

      {/* Victoria Memorial */}
      <g fill={ink}>
        <path d="M1260 268 V200 h300 V268 Z" />
        <path d="M1250 200 h320 v-10 h-320 z" />
        <path d="M1340 190 V150 h140 V190 Z" />
        <path d="M1360 150 C 1360 80, 1460 80, 1460 150 Z" />
        <rect x="1404" y="78" width="12" height="18" />
        <path d="M1410 78 l-10 -14 l10 4 l10 -4 z" />
        {[1270, 1550].map((x) => (
          <g key={x}>
            <rect x={x - 12} y="160" width="24" height="40" />
            <path d={`M${x - 16} 160 c0 -26 32 -26 32 0 z`} />
          </g>
        ))}
      </g>
      {[1290, 1330, 1370, 1450, 1490, 1530].map((x) => (
        <rect key={x} x={x} y="220" width="8" height="18" rx="4" fill="#ffcf7a" opacity=".55" />
      ))}
      {/* tram wire */}
      <path d="M1180 250 Q1220 240 1260 246" stroke="#1d1b52" strokeWidth="1.5" fill="none" />
      {/* coconut palm on the ghat */}
      <g fill={ink}>
        <path d="M560 268 C 562 240, 566 222, 574 198 L 579 199 C 572 224, 568 242, 567 268 Z" />
        {[212, 226, 240, 254].map((y) => (
          <path key={y} d={`M${562 + (268 - y) * 0.05} ${y} h7`} stroke="#16143e" strokeWidth="1" />
        ))}
        <g transform="translate(576 198)">
          {[-58, -30, -4, 24, 52].map((r) => (
            <path key={`r${r}`} transform={`rotate(${r})`} d="M0 0 C 14 -10, 32 -8, 46 6 C 34 -2, 16 -2, 0 2 Z" />
          ))}
          {[-58, -30, -4, 24, 52].map((r) => (
            <path key={`l${r}`} transform={`scale(-1 1) rotate(${r})`} d="M0 0 C 14 -10, 32 -8, 46 6 C 34 -2, 16 -2, 0 2 Z" />
          ))}
          <path d="M0 0 C -4 -14, -2 -28, 6 -38 C 2 -26, 2 -14, 2 0 Z" />
          <circle cx="-3" cy="4" r="3" />
          <circle cx="3" cy="5" r="3" />
        </g>
      </g>
    </svg>
  )
}
