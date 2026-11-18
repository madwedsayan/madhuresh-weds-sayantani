import { archPath } from './Arch'

const Arch = ({ x, y, w, h, lobes = 7, ...rest }) => <path d={archPath(w, h, { lobes })} transform={`translate(${x} ${y})`} {...rest} />

const Chhatri = ({ x, y, s = 1, fill = 'var(--stone)', shade = 'var(--stone-shade)' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M-22 0 h44 v-6 h-44 z" fill={shade} />
    <path d="M-18 -6 v-22 M18 -6 v-22 M-6 -6 v-22 M6 -6 v-22" stroke={shade} strokeWidth="4" />
    <path d="M-24 -28 h48 l-4 -6 h-40 z" fill={shade} />
    <path d="M-20 -34 C -20 -58, 20 -58, 20 -34 Z" fill={fill} />
    <path d="M0 -55 v-12" stroke="var(--gold)" strokeWidth="2.5" />
    <circle cx="0" cy="-69" r="3" fill="var(--gold)" />
  </g>
)

const HangingLantern = ({ x, y, len = 40 }) => (
  <g>
    <path d={`M${x} ${y} v${len}`} stroke="var(--gold)" strokeWidth="1.2" />
    <circle cx={x} cy={y + len + 10} r="18" fill="var(--sky-glow)" opacity=".25" className="flicker" />
    <path d={`M${x - 7} ${y + len} h14 l3 6 v10 l-3 6 h-14 l-3 -6 v-10 z`} fill="#ffb347" stroke="var(--gold)" strokeWidth="1" className="flicker" />
  </g>
)

/** Rumi-Darwaza-inspired palace gate with arcades, chhatris, lanterns and a reflection pool. */
export function PalaceCourtyard({ className = '' }) {
  const Gate = (
    <g>
      {/* side wings with arcades */}
      {[
        ['l2', 'translate(-300 0)'],
        ['r2', 'translate(1500 0) scale(-1 1)'],
        ['l', undefined],
        ['r', 'translate(1200 0) scale(-1 1)'],
      ].map(([d, transform]) => (
        <g key={d} transform={transform}>
          <rect x="0" y="330" width="420" height="230" fill="var(--stone-shade)" />
          <rect x="0" y="318" width="420" height="16" fill="var(--stone)" />
          {Array.from({ length: 12 }).map((_, i) => (
            <rect key={i} x={i * 36 + 6} y="304" width="22" height="14" fill="var(--stone)" />
          ))}
          {Array.from({ length: 6 }).map((_, i) => (
            <g key={i}>
              <Arch x={20 + i * 66} y={380} w={50} h={110} fill="var(--stone-deep)" />
              <Arch x={26 + i * 66} y={392} w={38} h={98} fill="var(--sky-glow)" opacity=".55" className="flicker" style={{ animationDelay: `${i * 0.4}s` }} />
            </g>
          ))}
          <Chhatri x={60} y={304} s={0.9} />
          <Chhatri x={380} y={304} s={0.9} />
        </g>
      ))}
      {/* central gate body */}
      <path d="M400 560 V250 h400 V560 Z" fill="var(--stone)" />
      <path d="M380 260 h440 v-22 h-440 z" fill="var(--stone-shade)" />
      {Array.from({ length: 11 }).map((_, i) => (
        <path key={i} d={`M${388 + i * 40} 238 v-20 c 0 -14, 24 -14, 24 0 v20 z`} fill="var(--stone)" />
      ))}
      {/* side towers */}
      {[372, 828].map((x) => (
        <g key={x}>
          <rect x={x - 28} y="190" width="56" height="370" fill="var(--stone-shade)" />
          <rect x={x - 34} y="180" width="68" height="14" fill="var(--stone)" />
          <Chhatri x={x} y={180} s={1.05} />
          {[260, 340, 420].map((y) => (
            <Arch key={y} x={x - 14} y={y} w={28} h={52} lobes={5} fill="var(--stone-deep)" />
          ))}
        </g>
      ))}
      {/* the great cusped arch */}
      <Arch x={440} y={270} w={320} h={290} lobes={11} fill="var(--stone-deep)" />
      <Arch x={462} y={292} w={276} h={268} lobes={11} fill="url(#gateGlow)" />
      {/* inner smaller doorway */}
      <Arch x={548} y={420} w={104} h={140} lobes={7} fill="var(--stone-deep)" opacity=".7" />
      {/* jharokha above arch */}
      <Chhatri x={600} y={250} s={1.6} />
      {/* fish-scale/jaali band */}
      <g fill="none" stroke="var(--stone-deep)" strokeOpacity=".5">
        {Array.from({ length: 19 }).map((_, i) => (
          <circle key={i} cx={410 + i * 20} cy="268" r="8" />
        ))}
      </g>
      {/* hanging lanterns inside arch */}
      <HangingLantern x={540} y={340} len={50} />
      <HangingLantern x={600} y={300} len={70} />
      <HangingLantern x={660} y={340} len={50} />
    </g>
  )

  return (
    <svg viewBox="-300 0 1800 760" preserveAspectRatio="xMidYMax slice" className={className} aria-hidden>
      <defs>
        <radialGradient id="gateGlow" cx="50%" cy="80%" r="70%">
          <stop offset="0" stopColor="#ffe3a3" />
          <stop offset=".5" stopColor="var(--sky-glow)" />
          <stop offset="1" stopColor="var(--stone-deep)" />
        </radialGradient>
        <linearGradient id="poolGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--pool)" stopOpacity=".85" />
          <stop offset="1" stopColor="var(--sky-1)" />
        </linearGradient>
        <linearGradient id="reflFade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="white" stopOpacity=".55" />
          <stop offset=".7" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <mask id="reflMask">
          <rect x="-300" y="560" width="1800" height="200" fill="url(#reflFade)" />
        </mask>
      </defs>
      {Gate}
      {/* courtyard floor */}
      <rect x="-300" y="556" width="1800" height="8" fill="var(--stone)" />
      {/* reflection pool */}
      <rect x="-300" y="564" width="1800" height="196" fill="url(#poolGrad)" />
      <g mask="url(#reflMask)" transform="translate(0 1124) scale(1 -1)" opacity=".8">
        {Gate}
      </g>
      <g stroke="#ffffff" strokeOpacity=".25" strokeWidth="1.5" strokeLinecap="round">
        {[600, 630, 660, 700, 740].map((y, i) => (
          <path key={y} d={`M${520 - i * 30} ${y} h${160 + i * 60}`} strokeDasharray="30 18" />
        ))}
      </g>
      {/* floating diyas */}
      {[180, 360, 520, 680, 840, 1020].map((x, i) => (
        <g key={x} transform={`translate(${x} ${620 + (i % 2) * 40})`}>
          <ellipse rx="22" ry="8" fill="var(--sky-glow)" opacity=".25" className="flicker" />
          <path d="M-12 0 q12 10 24 0 z" fill="#b5562d" />
          <path d="M0 -2 q-4 -8 0 -14 q4 6 0 14" fill="#ffd166" className="flicker" />
        </g>
      ))}
    </svg>
  )
}

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
