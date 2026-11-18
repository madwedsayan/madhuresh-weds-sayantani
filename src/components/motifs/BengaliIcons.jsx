/**
 * Bengali wedding objects as minimal line icons (64 × 64).
 * Gold strokes with sparse sindoor accents. Researched list — see README.
 */
const G = 'var(--gold)'
const R = '#b3121f'
const base = { fill: 'none', stroke: G, strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' }
const Svg = ({ children, ...p }) => (
  <svg viewBox="0 0 64 64" {...base} {...p}>
    {children}
  </svg>
)

export const SindoorKouto = (p) => (
  <Svg {...p}>
    <path d="M14 40 C14 52, 50 52, 50 40 V34 H14 Z" />
    <path d="M14 34 q4 -3 8 0 t8 0 t8 0 t8 0 t4 0" />
    <g transform="rotate(-20 46 30)">
      <path d="M18 30 C18 18, 46 18, 46 30 Z" />
      <circle cx="32" cy="17" r="2.4" />
    </g>
    <ellipse cx="32" cy="34" rx="10" ry="2.6" fill={R} stroke="none" />
    <circle cx="54" cy="50" r="4" />
    <circle cx="54" cy="50" r="1.4" />
  </Svg>
)

export const MangalGhot = (p) => (
  <Svg {...p}>
    <path d="M24 24 h16 l-2 4 C52 32, 54 48, 44 54 H20 C10 48, 12 32, 26 28 Z" />
    <path d="M22 24 h20" />
    {[-50, -25, 0, 25, 50].map((r) => (
      <path key={r} transform={`rotate(${r} 32 24)`} d="M32 24 q-3 -8 0 -16 q3 8 0 16 Z" stroke="#4f9a5b" />
    ))}
    <ellipse cx="32" cy="12" rx="5" ry="6" />
    <path d="M18 40 h28" strokeDasharray="1 3" stroke={R} />
    <circle cx="32" cy="46" r="2" fill={R} stroke="none" />
  </Svg>
)

export const BaranDala = (p) => (
  <Svg {...p}>
    <path d="M8 26 C8 14, 56 14, 56 26 C56 38, 44 50, 32 52 C20 50, 8 38, 8 26 Z" />
    <path d="M14 26 C16 40, 26 46, 32 47 C38 46, 48 40, 50 26" opacity=".6" />
    {[16, 24, 32, 40, 48].map((x) => (
      <path key={x} d={`M${x} 22 L${32 + (x - 32) * 0.5} 48`} opacity=".35" />
    ))}
    {[12, 20, 32, 44, 52].map((x, i) => (
      <circle key={x} cx={x} cy={i % 4 === 0 ? 24 : 18} r="1" fill={R} stroke="none" />
    ))}
    <path d="M26 34 q6 6 12 0 z" />
    <path d="M32 33 q-2 -4 0 -7 q2 3 0 7" fill="#f2a516" stroke="none" />
    <circle cx="21" cy="36" r="1.6" />
    <circle cx="43" cy="36" r="2.4" />
  </Svg>
)

export const TattwaFish = (p) => (
  <Svg {...p}>
    <ellipse cx="32" cy="50" rx="27" ry="6" />
    <path d="M8 34 C16 20, 42 18, 50 32 C42 44, 16 46, 8 34 Z" />
    <path d="M50 32 l10 -9 v18 z" />
    <circle cx="15" cy="32" r="1.6" fill={G} stroke="none" />
    <circle cx="12" cy="28" r="1.4" fill={R} stroke="none" />
    {[22, 30, 38].map((x) => (
      <path key={x} d={`M${x} 28 q3 3 0 6 M${x + 4} 30 q3 3 0 6`} opacity=".55" />
    ))}
    <path d="M22 22 C28 30, 34 36, 40 42" stroke={R} strokeWidth="3" opacity=".85" />
  </Svg>
)

export const TattwaTray = (p) => (
  <Svg {...p}>
    <ellipse cx="32" cy="46" rx="26" ry="8" />
    <path d="M6 46 v3 C6 54, 58 54, 58 49 v-3" />
    <path d="M12 38 h20 v8 H12 Z" />
    <path d="M12 44 h20" stroke={R} strokeWidth="2.4" />
    <path d="M38 44 C36 36, 48 36, 46 44 Z" />
    <path d="M38 38 h8" />
    <path d="M50 44 l3 -12 l3 12 z" stroke="#4f9a5b" />
    <path d="M10 40 C10 14, 54 14, 54 40" opacity=".35" />
    <path d="M18 24 C24 18, 36 16, 44 20" opacity=".35" />
  </Svg>
)

export const KajalLata = (p) => (
  <Svg {...p}>
    <path d="M10 34 C18 22, 40 20, 50 32 C40 42, 18 44, 10 34 Z" />
    <path d="M50 32 C56 30, 60 34, 58 38 C56 42, 52 40, 53 37" />
    <path d="M16 33 C22 28, 32 27, 40 31" opacity=".6" />
    <path d="M20 37 C26 35, 32 36, 38 34" opacity=".6" />
    <circle cx="28" cy="32" r="2.2" fill="#1a1a1a" stroke="none" />
    <circle cx="44" cy="32" r="1" fill={R} stroke="none" />
  </Svg>
)

export const Jaanti = (p) => (
  <Svg {...p}>
    <path d="M10 18 C24 24, 34 28, 46 30" />
    <path d="M10 46 C24 40, 34 36, 46 34" />
    <circle cx="44" cy="32" r="3" />
    <path d="M46 30 C52 26, 58 28, 56 32 C58 36, 52 38, 46 34" />
    <path d="M10 18 c-4 -2 -6 4 -2 6 c3 1 5 -2 3 -4" />
    <path d="M10 46 c-4 2 -6 -4 -2 -6 c3 -1 5 2 3 4" />
    <path d="M50 30 q4 2 0 4" stroke={R} />
  </Svg>
)

export const Darpan = (p) => (
  <Svg {...p}>
    <circle cx="32" cy="22" r="14" />
    {Array.from({ length: 12 }).map((_, i) => (
      <circle key={i} cx={32 + Math.cos((i / 12) * 6.283) * 16.5} cy={22 + Math.sin((i / 12) * 6.283) * 16.5} r="2" />
    ))}
    <path d="M24 16 L30 10 M26 22 L36 12" opacity=".6" />
    <path d="M32 38.5 V58" strokeWidth="3" />
    <circle cx="32" cy="58" r="2" fill={R} stroke="none" />
  </Svg>
)

export const Piri = (p) => (
  <Svg {...p}>
    <path d="M6 34 L24 24 H58 L40 34 Z" fill="#b5562d" fillOpacity=".25" />
    <path d="M6 34 v5 h34 v-5 M40 39 L58 29 v-5" />
    <path d="M10 39 v5 M36 39 v5 M54 31 v5" />
    <g stroke="#fff">
      <ellipse cx="32" cy="29" rx="9" ry="3.4" strokeDasharray="1 2" />
      <circle cx="32" cy="29" r="1.4" fill={R} stroke="none" />
    </g>
  </Svg>
)

export const DhaanDurbo = (p) => (
  <Svg {...p}>
    {[-14, -6, 2, 10].map((d, i) => (
      <path key={i} d={`M32 58 C${32 + d * 0.4} 40, ${32 + d} 24, ${32 + d * 1.3} ${10 + i * 2}`} stroke="#4f9a5b" />
    ))}
    <path d="M28 58 C30 40, 40 26, 52 20" />
    {Array.from({ length: 7 }).map((_, i) => {
      const t = i / 6
      const x = 36 + t * 15
      const y = 34 - t * 13
      return <ellipse key={i} cx={x} cy={y - 3} rx="1.6" ry="3.4" transform={`rotate(${50 - i * 4} ${x} ${y - 3})`} fill={G} fillOpacity=".5" />
    })}
  </Svg>
)

export const PanchaPradip = (p) => (
  <Svg {...p}>
    <path d="M14 34 C20 42, 44 42, 50 34" />
    {[14, 23, 32, 41, 50].map((x, i) => {
      const y = [34, 38, 39, 38, 34][i]
      return (
        <g key={x}>
          <path d={`M${x - 4} ${y} q4 4 8 0 z`} />
          <path d={`M${x} ${y - 1} q-2.5 -4 0 -8 q2.5 4 0 8`} fill="#f2a516" stroke="none" />
        </g>
      )
    })}
    <path d="M32 41 V52 M24 56 h16 l-4 -4 h-8 z" />
    <path d="M32 46 C40 46, 46 50, 48 56" />
  </Svg>
)

export const Loha = (p) => (
  <Svg {...p}>
    <circle cx="32" cy="32" r="20" strokeWidth="2.6" stroke="#8a8a8a" />
    <path d="M18 18 A20 20 0 0 1 46 18" strokeWidth="4" stroke={G} />
    {Array.from({ length: 14 }).map((_, i) => {
      const a = (i / 14) * 6.283
      return <path key={i} d={`M${32 + Math.cos(a) * 18} ${32 + Math.sin(a) * 18} L${32 + Math.cos(a + 0.12) * 22} ${32 + Math.sin(a + 0.12) * 22}`} strokeWidth="1" stroke="#8a8a8a" />
    })}
    <circle cx="32" cy="32" r="12" stroke={R} strokeWidth="3" opacity=".8" />
  </Svg>
)

export const Dhunuchi = (p) => (
  <Svg {...p} stroke="#b5562d">
    <path d="M14 30 C16 42, 48 42, 50 30 Z" />
    <path d="M28 40 L26 50 H38 L36 40" />
    <path d="M20 54 h24 l-3 -4 H23 z" />
    <path d="M14 30 h36" />
    {[24, 32, 40].map((x, i) => (
      <path key={x} d={`M${x} 26 c-4 -4 4 -6 0 -10 c-4 -4 4 -6 0 -10`} opacity={0.5 + i * 0.15} stroke="#9a9a9a" />
    ))}
    <circle cx="32" cy="30" r="2" fill="#f2a516" stroke="none" />
  </Svg>
)

export const ShoalTopor = (p) => (
  <Svg {...p}>
    <path d="M18 52 L32 6 L46 52 Z" fill="#faf5ea" fillOpacity=".9" />
    <path d="M16 52 q4 -4 8 0 t8 0 t8 0 t8 0" />
    <path d="M22 40 L42 40 M25 30 L39 30 M28 20 L36 20" />
    <path d="M22 40 L32 30 L42 40 M25 30 L32 20 L39 30" opacity=".6" />
    <circle cx="32" cy="5" r="2" fill={R} stroke="none" />
    <path d="M18 52 C14 56, 14 60, 16 62 M46 52 C50 56, 50 60, 48 62" />
  </Svg>
)

export const BENGALI_SYMBOLS = [
  { Icon: SindoorKouto, name: 'Sindoor Kouto', bn: 'সিঁদুর কৌটো', meaning: 'The bride’s vermilion box — opened at Sindoor Daan, the moment that seals the marriage.' },
  { Icon: MangalGhot, name: 'Mangal Ghot', bn: 'মঙ্গল ঘট', meaning: 'A water-filled pot crowned with mango leaves and a green coconut — invoking auspiciousness at the mandap.' },
  { Icon: BaranDala, name: 'Baran Dala', bn: 'বরণ ডালা', meaning: 'The welcome tray of rice, haldi, diya and betel nut, touched to the groom’s forehead at Bor Boron.' },
  { Icon: TattwaFish, name: 'Tattwa Rui', bn: 'তত্ত্বের রুই', meaning: 'A rohu fish dressed as a bride — sindoor, saree and all — sent among the wedding gifts for prosperity.' },
  { Icon: TattwaTray, name: 'Tattwa', bn: 'তত্ত্ব', meaning: 'Beautifully decorated gift trays — sarees, sweets and paan — exchanged between the two families.' },
  { Icon: KajalLata, name: 'Kajal Lata', bn: 'কাজললতা', meaning: 'The bride’s little kohl holder, carried through the rituals to ward off the evil eye.' },
  { Icon: Jaanti, name: 'Jaanti', bn: 'জাঁতি', meaning: 'A betel-nut cutter the groom holds through the ceremonies — a symbol of protection.' },
  { Icon: Darpan, name: 'Darpan', bn: 'দর্পণ', meaning: 'A brass mirror with a long handle, carried by the groom as he arrives for the wedding.' },
  { Icon: Piri, name: 'Piri', bn: 'পিঁড়ি', meaning: 'The Alpona-painted wooden seat on which the bride is carried around the groom seven times at Saat Paak.' },
  { Icon: DhaanDurbo, name: 'Dhaan-Durbo', bn: 'ধান-দুর্বা', meaning: 'Paddy and durba grass showered in blessing — for abundance and an evergreen life together.' },
  { Icon: PanchaPradip, name: 'Pancha Pradip', bn: 'পঞ্চপ্রদীপ', meaning: 'The five-flamed lamp used for the aarti welcome and the sacred fire rituals.' },
  { Icon: Loha, name: 'Loha', bn: 'লোহা', meaning: 'The iron bangle gifted by the mother-in-law — worn with shankha-pola as a mark of marriage.' },
  { Icon: Dhunuchi, name: 'Dhunuchi', bn: 'ধুনুচি', meaning: 'A clay incense burner whose fragrant smoke purifies the space for every welcome.' },
  { Icon: ShoalTopor, name: 'Shola Topor', bn: 'টোপর', meaning: 'The groom’s tall white crown of shola pith, handcrafted by Malakar artisans of Bengal.' },
]
