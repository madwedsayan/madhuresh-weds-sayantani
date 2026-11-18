/**
 * Lucknowi / North-Indian (UP Hindu) wedding objects as minimal line icons (64 × 64).
 * Researched list (chooda/kaleere omitted — Punjabi, not UP). Gold strokes, sparse accents.
 */
const G = 'var(--gold)'
const R = '#b3121f'
const M = '#f2a516'
const L = '#2f6b3a'
const base = { fill: 'none', stroke: G, strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' }
const Svg = ({ children, ...p }) => (
  <svg viewBox="0 0 64 64" {...base} {...p}>
    {children}
  </svg>
)

export const Sehra = (p) => (
  <Svg {...p}>
    <path d="M10 14 C 20 8, 44 8, 54 14" strokeWidth="3" />
    <circle cx="32" cy="11" r="3" fill={R} stroke={G} />
    {Array.from({ length: 11 }).map((_, i) => {
      const x = 12 + i * 4
      const len = 30 + Math.sin((i / 10) * Math.PI) * 20
      return (
        <g key={i}>
          <path d={`M${x} 14 V${14 + len}`} strokeWidth=".8" opacity=".6" />
          {Array.from({ length: Math.floor(len / 6) }).map((_, j) => (
            <circle key={j} cx={x} cy={18 + j * 6} r="1.3" fill={j % 4 === 3 ? M : '#fdf6e8'} stroke="none" />
          ))}
        </g>
      )
    })}
  </Svg>
)

export const SafaKalgi = (p) => (
  <Svg {...p}>
    <path d="M10 40 C 8 22, 56 22, 54 40 C 44 34, 20 34, 10 40 Z" fill={R} fillOpacity=".25" />
    <path d="M12 34 C 24 26, 40 26, 52 34 M14 28 C 26 22, 40 22, 50 30" />
    <path d="M10 40 C 20 46, 44 46, 54 40" />
    <path d="M54 38 C 60 44, 60 52, 56 58" />
    <circle cx="32" cy="26" r="3" fill={R} />
    <path d="M32 23 C 30 14, 34 8, 40 4 C 36 10, 36 16, 33 23" fill={M} fillOpacity=".5" />
  </Svg>
)

export const Kalash = (p) => (
  <Svg {...p} stroke="#b87333">
    <path d="M24 26 h16 l-2 4 C52 34, 52 50, 42 56 H22 C12 50, 12 34, 26 30 Z" />
    <path d="M24 30 h16" stroke={R} strokeWidth="2.2" />
    {[-54, -27, 0, 27, 54].map((r) => (
      <path key={r} transform={`rotate(${r} 32 26)`} d="M32 26 q-3 -8 0 -15 q3 7 0 15 Z" stroke={L} />
    ))}
    <ellipse cx="32" cy="15" rx="6" ry="6.5" stroke={G} />
    <path d="M27 13 q5 3 10 0" stroke={R} />
    {[26, 32, 38].map((x) => (
      <circle key={x} cx={x} cy="43" r="1.6" fill={R} stroke="none" />
    ))}
  </Svg>
)

export const Jaimala = (p) => (
  <Svg {...p}>
    {Array.from({ length: 19 }).map((_, i) => {
      const t = (i / 18) * Math.PI
      const x = 32 - Math.cos(t) * 22
      const y = 8 + Math.sin(t) * 40
      return <circle key={i} cx={x} cy={y} r={i % 3 === 1 ? 2.2 : 3.2} fill={i % 3 === 1 ? R : M} stroke="none" />
    })}
    <path d="M32 50 v6 M29 56 l3 6 l3 -6 z" />
  </Svg>
)

export const Mangalsutra = (p) => (
  <Svg {...p}>
    {Array.from({ length: 13 }).map((_, i) => {
      const t = i / 12
      return (
        <g key={i}>
          <circle cx={10 + t * 20} cy={8 + t * 32} r="1.4" fill="#1a1a1a" stroke="none" />
          <circle cx={54 - t * 20} cy={8 + t * 32} r="1.4" fill="#1a1a1a" stroke="none" />
        </g>
      )
    })}
    <path d="M10 8 L30 40 M54 8 L34 40" strokeWidth=".7" />
    <path d="M26 42 C 26 48, 31 50, 31 44 Z M38 42 C 38 48, 33 50, 33 44 Z" fill={G} fillOpacity=".5" />
    <path d="M32 44 C 26 52, 30 58, 32 60 C 34 58, 38 52, 32 44 Z" fill={G} fillOpacity=".3" />
  </Svg>
)

export const SindoorDani = (p) => (
  <Svg {...p} stroke="#b9b9c4">
    <path d="M14 38 C 14 52, 50 52, 50 38 Z" />
    <path d="M12 38 h40" />
    <path d="M16 36 C 16 22, 48 22, 48 36" />
    <path d="M32 24 c-3 -4 -1 -9 3 -10 c-1 4 2 6 -1 10" stroke={G} fill={G} fillOpacity=".3" />
    <ellipse cx="32" cy="38" rx="12" ry="2" fill={R} stroke="none" />
    <path d="M52 30 L60 58" strokeWidth="1" stroke={G} />
    <circle cx="60" cy="58" r="1.4" fill={R} stroke="none" />
  </Svg>
)

export const TilakThali = (p) => (
  <Svg {...p}>
    <ellipse cx="32" cy="40" rx="28" ry="13" />
    <ellipse cx="32" cy="40" rx="24" ry="10" strokeDasharray="2 2.5" opacity=".7" />
    <ellipse cx="18" cy="38" rx="6" ry="3" fill={R} fillOpacity=".7" />
    {[[30, 42], [33, 40], [28, 39], [32, 44], [35, 43]].map(([x, y], i) => (
      <ellipse key={i} cx={x} cy={y} rx="1.4" ry=".8" fill="#fdf6e8" stroke="none" />
    ))}
    <path d="M40 40 q5 4 10 0 z" />
    <path d="M45 39 q-2.5 -5 0 -9 q2.5 4 0 9" fill={M} stroke="none" />
    <ellipse cx="32" cy="26" rx="6" ry="5.5" stroke="#8a5a2b" />
  </Svg>
)

export const HaldiBowl = (p) => (
  <Svg {...p}>
    <path d="M8 34 C 10 52, 54 52, 56 34 Z" />
    <ellipse cx="32" cy="34" rx="24" ry="5" fill="#ffc300" fillOpacity=".7" />
    <path d="M40 34 C 44 22, 52 14, 58 10 C 54 18, 48 26, 42 34" stroke={L} fill={L} fillOpacity=".25" />
    {[[18, 22], [24, 16], [14, 28]].map(([x, y], i) => (
      <circle key={i} cx={x} cy={y} r="1.8" fill="#ffc300" stroke="none" />
    ))}
  </Svg>
)

export const MehendiCone = (p) => (
  <Svg {...p}>
    <g transform="rotate(30 32 32)">
      <path d="M26 6 h12 l-6 46 z" stroke="#6b4e2e" />
      <path d="M28 14 l8 4 M29 22 l6 3 M30 30 l4 2 M31 38 l2 1" stroke="#6b4e2e" opacity=".6" />
      <path d="M25 6 h14 v-3 h-14 z" />
    </g>
    <circle cx="20" cy="56" r="1.6" fill="#6b4e2e" stroke="none" />
    <path d="M44 50 c-6 0 -8 -8 -2 -10 c4 -1 6 3 3 5 c-2 1 -3 -1 -2 -2" stroke="#6b4e2e" />
  </Svg>
)

export const Kangana = (p) => (
  <Svg {...p}>
    <circle cx="32" cy="30" r="18" stroke={R} strokeWidth="3" />
    <circle cx="32" cy="30" r="18" stroke="#ffc300" strokeWidth="3" strokeDasharray="3 3" />
    <circle cx="32" cy="50" r="4" fill={R} fillOpacity=".4" />
    <ellipse cx="32" cy="58" rx="3" ry="4.5" fill="#fdf6e8" />
    <path d="M32 54.5 v7" stroke="#b9a989" strokeWidth=".8" />
    <circle cx="25" cy="54" r="1.8" fill="#ffc300" stroke="none" />
    <circle cx="39" cy="54" r="1.8" fill="#777" stroke="none" />
  </Svg>
)

export const Shehnai = (p) => (
  <Svg {...p}>
    <g transform="rotate(-40 32 32)">
      <path d="M30 4 h4 v40 h-4 z" />
      <path d="M30 44 L22 58 h20 L34 44" fill={G} fillOpacity=".2" />
      <path d="M31 4 l1 -3 l1 3" />
      {[12, 18, 24, 30, 36].map((y) => (
        <circle key={y} cx="32" cy={y} r="1" fill={G} stroke="none" />
      ))}
    </g>
    <path d="M48 14 q4 4 0 8 M52 10 q7 8 0 16" opacity=".6" />
  </Svg>
)

export const Paandaan = (p) => (
  <Svg {...p} stroke="#b9b9c4">
    <path d="M10 40 l6 -8 h32 l6 8 v10 l-6 6 H16 l-6 -6 Z" />
    <path d="M10 40 h44" />
    <path d="M16 32 l4 -16 h24 l4 16" opacity=".6" />
    {[22, 32, 42].map((x) => (
      <ellipse key={x} cx={x} cy="36" rx="4" ry="1.6" />
    ))}
    {/* silver-warq gilori */}
    <path d="M26 58 L32 46 L38 58 Z" stroke={L} fill="#e8ecef" />
    <path d="M32 46 v-4" stroke="#6b4e2e" strokeWidth="1.8" />
    {[[30, 54], [33, 52], [34, 56]].map(([x, y], i) => (
      <circle key={i} cx={x} cy={y} r=".7" fill="#9aa3ad" stroke="none" />
    ))}
  </Svg>
)

export const ItrBottle = (p) => (
  <Svg {...p}>
    <path d="M32 22 L46 34 L40 56 H24 L18 34 Z" fill="#f2a7bd" fillOpacity=".25" />
    <path d="M18 34 h28 M32 22 L24 56 M32 22 L40 56 M25 44 h14" opacity=".55" />
    <path d="M29 22 v-6 h6 v6" />
    <path d="M32 16 V4" strokeWidth="1.2" />
    <path d="M29 8 l3 -6 l3 6 z" fill={G} fillOpacity=".4" />
  </Svg>
)

/** Bengali Mala Badal garland: rajanigandha (tuberose) and red rose — for the jaimala pair. */
export const MalaBadal = (p) => (
  <Svg {...p}>
    {[0, 1].map((k) =>
      Array.from({ length: 15 }).map((_, i) => {
        const t = (i / 14) * Math.PI
        const r = 20 - k * 7
        const x = 32 - Math.cos(t) * r
        const y = 10 + Math.sin(t) * (34 - k * 10)
        return <circle key={`${k}-${i}`} cx={x} cy={y} r={i % 4 === 2 ? 2.4 : 1.9} fill={i % 4 === 2 ? R : '#fdf6e8'} stroke={i % 4 === 2 ? 'none' : G} strokeWidth=".5" />
      }),
    )}
  </Svg>
)

export const LUCKNOW_SYMBOLS = [
  { Icon: Sehra, name: 'Sehra', native: 'सेहरा', meaning: 'Strings of flowers and pearls veiling the groom’s face, tied at Sehra-bandi before he mounts the ghodi.' },
  { Icon: SafaKalgi, name: 'Safa & Kalgi', native: 'साफ़ा · कलगी', meaning: 'The groom’s turban crowned with a jewelled plume — the “king of the day”.' },
  { Icon: Kalash, name: 'Kalash', native: 'कलश', meaning: 'A copper pot of water with mango leaves, coconut and mauli thread — inviting the divine to the mandap.' },
  { Icon: Jaimala, name: 'Jaimala', native: 'जयमाला', meaning: 'Garlands of marigold and rose exchanged as the couple choose each other.' },
  { Icon: Mangalsutra, name: 'Mangalsutra', native: 'मंगलसूत्र', meaning: 'The black-bead necklace tied after the pheras — a lifelong sign of marriage.' },
  { Icon: SindoorDani, name: 'Sindoor-dani', native: 'सिंदूरदानी', meaning: 'The little silver vermilion box from which the groom fills the bride’s parting.' },
  { Icon: TilakThali, name: 'Tilak Thali', native: 'तिलक थाली', meaning: 'Roli, rice, diya and coconut — the plate with which the bride’s family blesses the groom at Tilak.' },
  { Icon: HaldiBowl, name: 'Haldi', native: 'हल्दी', meaning: 'Turmeric paste applied with mango leaves for a golden glow and protection before the wedding.' },
  { Icon: MehendiCone, name: 'Mehendi', native: 'मेहंदी', meaning: 'Henna for the bride’s hands — the deeper the colour, the deeper the love, they say.' },
  { Icon: Kangana, name: 'Kangana', native: 'कंगना', meaning: 'A red-yellow thread with cowrie and iron, tied on bride and groom; untying it later is a playful Awadhi game.' },
  { Icon: Shehnai, name: 'Shehnai', native: 'शहनाई', meaning: 'The auspicious double-reed pipe of UP, whose notes announce every celebration.' },
  { Icon: Paandaan, name: 'Paandaan & Gilori', native: 'पानदान · गिलौरी', meaning: 'Lucknow’s emblem of hospitality — silver-warq paan folded into gilori, offered from an ornate paandaan.' },
  { Icon: ItrBottle, name: 'Itr', native: 'इत्र', meaning: 'Delicate attar from the perfumers of Lucknow, dabbed on every honoured guest.' },
]
