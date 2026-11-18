import { archPath } from './Arch'

/** Curvilinear, ribbed Bengal-temple spire (ratna) with a kalash finial. */
function Ratna({ x, b, w, h, ink, rib }) {
  const t = b - h
  return (
    <g>
      <path d={`M${x - w / 2} ${b} C ${x - w / 2} ${b - h * 0.5}, ${x - w * 0.62} ${b - h * 0.72}, ${x} ${t} C ${x + w * 0.62} ${b - h * 0.72}, ${x + w / 2} ${b - h * 0.5}, ${x + w / 2} ${b} Z`} fill={ink} />
      <path d={`M${x - w * 0.22} ${b} C ${x - w * 0.24} ${b - h * 0.5}, ${x - w * 0.2} ${b - h * 0.8}, ${x} ${t} M${x + w * 0.22} ${b} C ${x + w * 0.24} ${b - h * 0.5}, ${x + w * 0.2} ${b - h * 0.8}, ${x} ${t}`} stroke={rib} strokeWidth="1" fill="none" />
      <circle cx={x} cy={t - 2} r={Math.max(1.6, w * 0.1)} fill={ink} />
      <path d={`M${x} ${t - 3} V${t - 3 - h * 0.18}`} stroke={ink} strokeWidth="1.4" />
    </g>
  )
}

/** Dakshineswar Kali Temple: nine-spired navaratna on a high plinth, behind its red-banded courtyard rooms. */
function DakshineswarTemple({ ink, ink2 }) {
  const lit = '#ffcf7a'
  const cornice = (x1, x2, y) => <path d={`M${x1} ${y + 4} Q${(x1 + x2) / 2} ${y - 7} ${x2} ${y + 4} V${y + 8} H${x1} Z`} fill={ink2} />
  return (
    <g>
      {/* temple, standing behind the courtyard rooms */}
      <g fill={ink2}>
        <rect x="100" y="204" width="100" height="40" />
        <rect x="118" y="172" width="64" height="34" />
        <rect x="134" y="140" width="32" height="34" />
      </g>
      {cornice(94, 206, 198)}
      {cornice(113, 187, 166)}
      {cornice(130, 170, 134)}
      <Ratna x={108} b={200} w={19} h={30} ink={ink2} rib={ink} />
      <Ratna x={192} b={200} w={19} h={30} ink={ink2} rib={ink} />
      <Ratna x={124} b={168} w={15} h={26} ink={ink2} rib={ink} />
      <Ratna x={176} b={168} w={15} h={26} ink={ink2} rib={ink} />
      <Ratna x={150} b={136} w={30} h={44} ink={ink2} rib={ink} />
      {/* pennant on the central spire */}
      <path d="M150 74 V62" stroke={ink2} strokeWidth="1.4" />
      <path d="M150 62 l14 3 l-14 4 z" fill="#c0392b" className="flag-wave" />
      {/* aarti glow in the sanctum + lit arches on each tier */}
      <path d="M141 238 V222 Q150 209 159 222 V238 Z" fill="url(#aartiGlow)" className="flicker" />
      {[114, 126, 174, 186].map((x, i) => (
        <path key={x} d={`M${x - 3} 236 v-7 q3 -5 6 0 v7 z`} fill={lit} opacity=".75" className="flicker" style={{ animationDelay: `${i * 0.4}s` }} />
      ))}
      {[136, 150, 164].map((x, i) => (
        <path key={x} d={`M${x - 2.5} 198 v-6 q2.5 -4 5 0 v6 z`} fill={lit} opacity=".7" className="flicker" style={{ animationDelay: `${0.3 + i * 0.5}s` }} />
      ))}
      <path d="M147.5 166 v-6 q2.5 -4 5 0 v6 z" fill={lit} opacity=".7" />

      {/* courtyard rooms with crenellated parapet and the red bands */}
      <g fill={ink}>
        <rect x="14" y="240" width="272" height="28" />
        {Array.from({ length: 23 }).map((_, i) => (
          <rect key={i} x={16 + i * 12} y="235" width="6" height="6" />
        ))}
      </g>
      <rect x="14" y="244" width="272" height="2" fill="#a8323a" opacity=".55" />
      <rect x="14" y="264" width="272" height="2" fill="#a8323a" opacity=".55" />
      {Array.from({ length: 13 }).map((_, i) => {
        const x = 24 + i * 21
        if (x > 130 && x < 170) return null
        return <path key={i} d={`M${x} 262 v-9 q4 -6 8 0 v9 z`} fill={lit} opacity=".6" />
      })}
      {/* temple gateway lit through the courtyard */}
      <path d="M142 268 V254 Q150 244 158 254 V268 Z" fill="url(#aartiGlow)" className="flicker" style={{ animationDelay: '.7s' }} />
    </g>
  )
}

/** Victoria Memorial: long wings, raised centre with a portico, great dome on a drum, the Angel of Victory on top. */
function VictoriaMemorial({ ink, ink2 }) {
  const lit = '#ffcf7a'
  const cupola = (x, y, w) => (
    <g key={`${x}-${y}`}>
      <rect x={x - w / 2} y={y} width={w} height={w * 0.9} />
      <path d={`M${x - w / 2 - 1} ${y} C ${x - w / 2} ${y - w * 0.9}, ${x + w / 2} ${y - w * 0.9}, ${x + w / 2 + 1} ${y} Z`} />
      <path d={`M${x} ${y - w * 0.68} v-4`} stroke={ink} strokeWidth="1.2" />
    </g>
  )
  return (
    <g>
      <g fill={ink}>
        {/* wings */}
        <rect x="292" y="222" width="246" height="46" />
        <rect x="288" y="218" width="254" height="5" />
        {Array.from({ length: 31 }).map((_, i) => (
          <rect key={i} x={292 + i * 8} y="213" width="3" height="6" />
        ))}
        {/* corner pavilions */}
        <rect x="290" y="206" width="30" height="16" />
        <rect x="510" y="206" width="30" height="16" />
        {cupola(305, 196, 12)}
        {cupola(525, 196, 12)}
        {/* raised centre block */}
        <rect x="372" y="190" width="86" height="78" />
        <rect x="368" y="186" width="94" height="5" />
        {/* drum + dome + lantern */}
        <rect x="384" y="160" width="62" height="27" />
        <rect x="380" y="157" width="70" height="4" />
        <path d="M382 158 C 382 104, 448 104, 448 158 Z" />
        <rect x="409" y="108" width="12" height="10" />
        <path d="M407 109 C 407 99, 423 99, 423 109 Z" />
        {/* the Angel of Victory with her bugle */}
        <path d="M415 101 v-4 M413 97 l2 -9 l2 9 z M415 90 l-8 -8 l10 4 z M416 91 l9 -4 l-1 2 z" stroke={ink} strokeWidth="1" />
        <circle cx="415" cy="87" r="1.8" />
        {/* cupolas around the dome */}
        {cupola(377, 176, 10)}
        {cupola(453, 176, 10)}
      </g>
      {/* drum columns */}
      {Array.from({ length: 7 }).map((_, i) => (
        <rect key={i} x={389 + i * 9} y="164" width="3" height="20" fill={ink2} />
      ))}
      {/* great portico arch, lit from within */}
      <path d="M402 268 V232 Q415 212 428 232 V268 Z" fill="url(#rumiGlow)" className="flicker" style={{ animationDelay: '.5s' }} />
      {[382, 448].map((x) => (
        <path key={x} d={`M${x - 4} 250 v-12 q4 -6 8 0 v12 z`} fill={lit} opacity=".6" />
      ))}
      {[306, 328, 350, 480, 502, 524].map((x, i) => (
        <path key={x} d={`M${x - 4} 252 v-13 q4 -6 8 0 v13 z`} fill={lit} opacity=".55" className="flicker" style={{ animationDelay: `${i * 0.45}s` }} />
      ))}
    </g>
  )
}

/** Panorama: Dakshineswar & Victoria Memorial ↔ Hooghly with Howrah Bridge ↔ Lucknow's Imambara & Rumi Darwaza. */
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
  // Kolkata on the left bank: Dakshineswar Kali Temple + Victoria Memorial — reused for the river reflection
  const kolkata = (
    <g>
      <DakshineswarTemple ink={ink} ink2={ink2} />
      <VictoriaMemorial ink={ink} ink2={ink2} />
    </g>
  )
  return (
    <svg viewBox="0 0 1600 360" preserveAspectRatio="xMidYMax slice" className={className} aria-label="Kolkata and Lucknow skyline: Dakshineswar temple, Victoria Memorial, Howrah Bridge and Rumi Darwaza">
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
        <radialGradient id="aartiGlow" cx="50%" cy="80%" r="70%">
          <stop offset="0" stopColor="#ffe3a0" stopOpacity=".95" />
          <stop offset=".6" stopColor="#ff9f3a" stopOpacity=".5" />
          <stop offset="1" stopColor="#c0392b" stopOpacity=".15" />
        </radialGradient>
        <mask id="riverFade">
          <rect x="0" y="266" width="1600" height="94" fill="url(#riverFadeGrad)" />
        </mask>
      </defs>

      {kolkata}

      {/* river (Hooghly) — animated */}
      <rect x="0" y="268" width="1600" height="92" fill="url(#river)" />
      <rect x="0" y="268" width="1600" height="3" fill="#6a6ab8" opacity=".35" />

      {/* mirrored, shimmering reflection of the bridge + Rumi Darwaza glow */}
      <g mask="url(#riverFade)">
        <g transform="translate(0 532) scale(1 -1)" opacity=".32">
          <g className="river-shimmer">{bridge}</g>
        </g>
        <g transform="translate(0 532) scale(1 -1)" opacity=".3">
          <g className="river-shimmer" style={{ animationDelay: '-2s' }}>{kolkata}</g>
        </g>
        {Array.from({ length: 28 }).map((_, i) => (
          <rect key={i} x={628 + i * 20} y="272" width="4" height={14 + (i % 4) * 7} rx="2" fill="#ffd27a" className="river-glint" style={{ animationDelay: `${(i % 7) * 0.35}s` }} />
        ))}
        {/* temple sanctum, Victoria portico and Rumi Darwaza glows */}
        <rect x="140" y="274" width="20" height="44" fill="#ffb347" opacity=".22" className="river-glint" />
        <rect x="403" y="274" width="24" height="40" fill="#ffd98a" opacity=".2" className="river-glint" style={{ animationDelay: '.8s' }} />
        <rect x="1452" y="274" width="61" height="40" fill="#ffb347" opacity=".14" className="river-glint" />
        {[1216, 1254, 1292, 1330, 1368].map((x, i) => (
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

      {/* Lucknow on the far bank: Bara Imambara domes + Rumi Darwaza */}
      <g transform="translate(1150 13.4) scale(.95)">
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
        <g fill={ink}>
          <path d="M250 270 V150 h200 V270 Z" />
          <rect x="236" y="120" width="26" height="150" />
          <rect x="438" y="120" width="26" height="150" />
          <path d="M232 120 c0 -26 34 -26 34 0 z M434 120 c0 -26 34 -26 34 0 z" />
          <path d="M320 150 c0 -40 60 -40 60 0 z" />
          <path d="M350 108 v-14" stroke={ink} strokeWidth="3" />
        </g>
        <path d={archPath(110, 110, { lobes: 9 })} transform="translate(295 162)" fill="url(#rumiGlow)" className="flicker" />
        {[70, 110, 150, 190, 230].map((x) => (
          <rect key={x} x={x} y="225" width="8" height="14" rx="4" fill="#ffcf7a" opacity=".7" />
        ))}
      </g>
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
