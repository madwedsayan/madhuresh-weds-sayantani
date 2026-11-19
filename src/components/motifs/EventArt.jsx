/**
 * Default hand-drawn illustrations for event image slots (300 × 400 box).
 * Shown only when the event's `image` in inviteConfig is null.
 */
const Bg = ({ a, b, id }) => (
  <>
    <defs>
      <radialGradient id={id} cx="50%" cy="38%" r="80%">
        <stop offset="0" stopColor={a} />
        <stop offset="1" stopColor={b} />
      </radialGradient>
    </defs>
    <rect width="300" height="400" fill={`url(#${id})`} />
  </>
)

const Marigold = ({ x, y, r = 10, c = '#f59f00' }) => (
  <g transform={`translate(${x} ${y})`}>
    {Array.from({ length: 10 }).map((_, i) => (
      <circle key={i} cx={Math.cos((i / 10) * 6.28) * r * 0.6} cy={Math.sin((i / 10) * 6.28) * r * 0.6} r={r * 0.5} fill={c} />
    ))}
    <circle r={r * 0.5} fill="#d9480f" />
  </g>
)

const Diya = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cy="-14" rx="18" ry="22" fill="#ffd27a" opacity=".25" className="flicker" />
    <path d="M-16 0 q16 14 32 0 q-6 -4 -16 -4 q-10 0 -16 4z" fill="#b5562d" />
    <path d="M0 -6 q-6 -10 0 -20 q6 10 0 20" fill="#ffb703" className="flicker" />
    <path d="M0 -8 q-2 -5 0 -10 q2 5 0 10" fill="#fff3bf" />
  </g>
)

const Leaf = ({ x, y, r = 0, s = 1 }) => (
  <path transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} d="M0 0 q12 -18 0 -40 q-12 22 0 40z" fill="#2f6b3a" stroke="#1f4d27" strokeWidth=".8" />
)

const arts = {
  tilak: (
    <g>
      <Bg id="bt" a="#c2303c" b="#5a0d17" />
      <g transform="translate(150 250)">
        <ellipse rx="110" ry="34" fill="#a87a2a" />
        <ellipse rx="104" ry="29" fill="#e2b04a" />
        <ellipse rx="92" ry="22" fill="none" stroke="#a87a2a" strokeDasharray="4 4" />
        <circle cx="-48" cy="-6" r="16" fill="#b3121f" />
        <circle cx="-48" cy="-8" r="11" fill="#d6262f" />
        <circle cx="-14" cy="-4" r="14" fill="#fff4e0" />
        {Array.from({ length: 14 }).map((_, i) => (
          <ellipse key={i} cx={-14 + Math.cos(i) * 8} cy={-6 + Math.sin(i * 2) * 5} rx="2" ry="1" fill="#e8d7b0" />
        ))}
        <Diya x={40} y={2} s={1.1} />
        <path d="M66 -18 c 0 -20, 30 -20, 30 0 c 0 12, -30 12, -30 0" fill="#8a5a2b" />
      </g>
      <g>
        {[-60, -30, 0, 30, 60].map((d, i) => (
          <Leaf key={i} x={150 + d * 1.6} y={78} r={180 + d * 0.3} s={1.1} />
        ))}
      </g>
      <path d="M150 120 v58" stroke="#ffd27a" strokeWidth="6" strokeLinecap="round" />
      <circle cx="150" cy="190" r="7" fill="#ffd27a" />
    </g>
  ),
  aiburobhat: (
    <g>
      <Bg id="ba" a="#2c8a74" b="#0d3b33" />
      <path d="M30 330 C 20 230, 120 140, 270 120 C 290 220, 220 320, 30 330 Z" fill="#3b9a4a" stroke="#1f5a26" strokeWidth="2" />
      <path d="M40 320 C 120 250, 200 190, 262 128" stroke="#1f5a26" strokeWidth="2" fill="none" />
      {Array.from({ length: 9 }).map((_, i) => (
        <path key={i} d={`M${70 + i * 20} ${300 - i * 18} l-${16 + i} -${22 - i}`} stroke="#2a7a37" fill="none" />
      ))}
      {/* rice */}
      <path d="M90 270 c 10 -50, 80 -50, 90 0 z" fill="#fffaf0" />
      {Array.from({ length: 22 }).map((_, i) => (
        <ellipse key={i} cx={100 + (i * 37) % 72} cy={252 - ((i * 13) % 24)} rx="2.4" ry="1" fill="#e8dcc0" transform={`rotate(${i * 25} ${100 + (i * 37) % 72} ${252 - ((i * 13) % 24)})`} />
      ))}
      {/* ilish fish */}
      <g transform="translate(196 222) rotate(-20)">
        <path d="M-40 0 C -20 -18, 24 -18, 40 0 C 24 18, -20 18, -40 0 Z" fill="#cfd8dc" stroke="#90a4ae" />
        <path d="M40 0 l14 -12 v24 z" fill="#b0bec5" />
        <circle cx="-28" cy="-3" r="3" fill="#37474f" />
        <path d="M-10 -10 c 4 6, 4 14, 0 20" stroke="#ffb703" fill="none" />
      </g>
      {/* payesh bowl */}
      <g transform="translate(110 170)">
        <path d="M-30 0 q30 34 60 0 z" fill="#c9a24b" />
        <ellipse rx="30" ry="7" fill="#fff1d6" />
        <circle cx="-6" cy="-1" r="2" fill="#7b4a1e" />
        <circle cx="8" cy="1" r="2" fill="#2f6b3a" />
      </g>
      <circle cx="70" cy="290" r="10" fill="#d4e157" />
      <circle cx="70" cy="290" r="6" fill="#f0f4c3" />
    </g>
  ),
  mehendi: (() => {
    // raised palm with alta-red nails & lines, jasmine on an alta circle, red-and-pearl bangles
    const skin = '#f3c6a2'
    const line = '#b07a52'
    const red = '#c1121f'
    const fingers = [
      // cx, top, width, bottom, rotation (about the finger base)
      [104, 128, 22, 214, -10],
      [127, 92, 25, 210, -4],
      [153, 74, 26, 210, 0],
      [179, 90, 25, 212, 5],
    ]
    const jasmine = (x, y, r, rot) => (
      <g transform={`translate(${x} ${y}) rotate(${rot})`}>
        {Array.from({ length: 6 }).map((_, i) => (
          <path key={i} transform={`rotate(${i * 60})`} d={`M0 0 C ${r * 0.35} ${-r * 0.3}, ${r * 0.3} ${-r * 0.85}, 0 ${-r} C ${-r * 0.3} ${-r * 0.85}, ${-r * 0.35} ${-r * 0.3}, 0 0 Z`} fill="#fffdf6" stroke="#cfc6b4" strokeWidth=".8" />
        ))}
        <circle r={r * 0.18} fill="#e9d36a" />
      </g>
    )
    const pearls = (y) => (
      <g key={`p${y}`}>
        <rect x="106" y={y - 1} width="88" height="2" fill="#c9a24b" />
        {Array.from({ length: 11 }).map((_, i) => (
          <circle key={i} cx={110 + i * 8} cy={y} r="3.3" fill="#fffaf0" stroke="#d8cdb6" strokeWidth=".6" />
        ))}
      </g>
    )
    const redBand = (y) => (
      <g key={`r${y}`}>
        <rect x="104" y={y} width="92" height="12" rx="6" fill={red} />
        <rect x="108" y={y + 2} width="84" height="3" rx="1.5" fill="#fff" opacity=".28" />
        <rect x="104" y={y + 9} width="92" height="3" rx="1.5" fill="#000" opacity=".18" />
      </g>
    )
    return (
      <g>
        <Bg id="bm" a="#fbeedd" b="#e8c3a0" />
        {/* fingers */}
        {fingers.map(([cx, top, w, bottom, r], i) => (
          <g key={i} transform={`rotate(${r} ${cx} ${bottom})`}>
            <rect x={cx - w / 2} y={top} width={w} height={bottom - top} rx={w / 2} fill={skin} stroke={line} strokeWidth="1.4" />
            <ellipse cx={cx} cy={top + 10} rx={w * 0.33} ry="9" fill={red} />
            {/* alta lines down each finger with joint bars */}
            <path d={`M${cx} ${top + 26} V${bottom - 18}`} stroke={red} strokeWidth="2.2" strokeLinecap="round" />
            <path d={`M${cx - 5} ${top + 40} h10 M${cx - 5} ${top + 64} h10`} stroke={red} strokeWidth="1.6" strokeLinecap="round" />
          </g>
        ))}
        {/* gold ring on the ring finger */}
        <g transform="rotate(-4 127 210)">
          <rect x="113" y="168" width="28" height="7" rx="3.5" fill="#d9a441" stroke="#9c7322" strokeWidth=".8" />
          <rect x="116" y="169" width="20" height="2" rx="1" fill="#ffe8a3" />
        </g>
        {/* thumb */}
        <g transform="rotate(34 204 252)">
          <rect x="191" y="160" width="26" height="96" rx="13" fill={skin} stroke={line} strokeWidth="1.4" />
          <ellipse cx="204" cy="170" rx="8.5" ry="9" fill={red} />
          <path d="M204 186 V232" stroke={red} strokeWidth="2.2" strokeLinecap="round" />
        </g>
        {/* palm + wrist */}
        <path d="M92 196 C 88 236, 102 274, 116 300 L 116 400 L 184 400 L 184 300 C 198 282, 214 258, 216 238 C 218 222, 210 206, 196 200 C 170 192, 120 190, 92 196 Z" fill={skin} stroke={line} strokeWidth="1.4" />
        <path d="M100 236 q6 22 20 40" stroke={line} strokeWidth="1" fill="none" opacity=".5" />
        {/* alta circle with a dotted ring, a line down to the wrist and a small motif */}
        <circle cx="152" cy="244" r="17" fill={red} />
        {Array.from({ length: 16 }).map((_, i) => {
          const a = (i / 16) * Math.PI * 2
          return <circle key={i} cx={152 + Math.cos(a) * 25} cy={244 + Math.sin(a) * 25} r="1.8" fill={red} />
        })}
        <path d="M152 270 V296" stroke={red} strokeWidth="2" strokeLinecap="round" />
        <path d="M152 278 l-8 10 l8 6 l8 -6 z" fill="none" stroke={red} strokeWidth="1.6" />
        <path d="M140 296 l12 -6 l12 6" stroke={red} strokeWidth="1.6" fill="none" strokeLinecap="round" />
        {/* jasmine flowers held on the palm */}
        {jasmine(140, 226, 17, 10)}
        {jasmine(166, 220, 15, -14)}
        {/* bangles: pearl rows between red shakha-pola bands */}
        {pearls(306)}
        {redBand(312)}
        {redBand(326)}
        {pearls(344)}
        {redBand(350)}
        {redBand(364)}
        {pearls(382)}
        {redBand(388)}
      </g>
    )
  })(),
  haldi: (
    <g>
      <Bg id="bh" a="#ffe066" b="#e08e0b" />
      {Array.from({ length: 26 }).map((_, i) => (
        <circle key={i} cx={(i * 71) % 300} cy={(i * 113) % 260} r={2 + (i % 4)} fill="#fff3bf" opacity=".6" />
      ))}
      <g transform="translate(150 260)">
        <path d="M-90 -20 C -80 50, 80 50, 90 -20 Z" fill="#b8860b" />
        <path d="M-80 -16 C -70 36, 70 36, 80 -16 Z" fill="#c9a24b" />
        <ellipse cy="-20" rx="90" ry="20" fill="#d4a017" />
        <ellipse cy="-20" rx="80" ry="15" fill="#ffc300" />
        <path d="M-50 -24 q 20 -10 40 0 q 20 10 40 0" stroke="#ffdd57" strokeWidth="4" fill="none" />
        <path d="M-60 40 h120 l-10 20 h-100z" fill="#8a5a2b" />
      </g>
      {[
        [70, 150, 18],
        [230, 140, 20],
        [110, 110, 14],
        [196, 100, 12],
        [150, 130, 16],
      ].map(([x, y, r], i) => (
        <Marigold key={i} x={x} y={y} r={r} c={i % 2 ? '#ffb703' : '#f77f00'} />
      ))}
      {[40, 260].map((x) => (
        <g key={x}>
          {[0, 1, 2].map((j) => (
            <Leaf key={j} x={x} y={360 - j * 30} r={x < 150 ? 20 + j * 10 : -20 - j * 10} />
          ))}
        </g>
      ))}
    </g>
  ),
  sangeet: (
    <g>
      <Bg id="bs" a="#7d2d8c" b="#2b0f3d" />
      {Array.from({ length: 18 }).map((_, i) => (
        <circle key={i} cx={(i * 53) % 300} cy={(i * 37) % 200} r="1.6" fill="#fff" opacity=".7" style={{ animation: `twinkle ${2 + (i % 3)}s ${i * 0.2}s infinite` }} />
      ))}
      {/* dhol */}
      <g transform="translate(140 262) rotate(-8)">
        <rect x="-80" y="-44" width="160" height="88" rx="40" fill="#b3121f" />
        <ellipse cx="-80" rx="20" ry="44" fill="#f1e3c6" stroke="#c9a24b" strokeWidth="4" />
        <ellipse cx="80" rx="20" ry="44" fill="#e6d3a8" stroke="#c9a24b" strokeWidth="4" />
        {Array.from({ length: 8 }).map((_, i) => (
          <path key={i} d={`M${-70 + i * 20} -42 l20 84`} stroke="#ffd166" strokeWidth="2" />
        ))}
        <path d="M-60 -44 h120 M-60 44 h120" stroke="#c9a24b" strokeWidth="5" />
      </g>
      {/* shehnai */}
      <g transform="translate(214 126) rotate(40)">
        <rect x="-4" y="-70" width="8" height="90" rx="3" fill="#6d3b1a" />
        <path d="M-4 20 L -22 54 h44 L 4 20 z" fill="#c9a24b" />
        {[-50, -30, -10].map((y) => (
          <circle key={y} cx="0" cy={y} r="2" fill="#2b0f3d" />
        ))}
      </g>
      {/* notes */}
      {[
        [60, 110],
        [100, 70],
        [250, 220],
      ].map(([x, y], i) => (
        <g key={i} fill="#ffd166" transform={`translate(${x} ${y})`}>
          <ellipse rx="7" ry="5" transform="rotate(-20)" />
          <rect x="5" y="-30" width="2.4" height="30" />
          <path d="M7 -30 q12 4 10 16 q-2 -8 -10 -8z" />
        </g>
      ))}
    </g>
  ),
  baraat: (
    <g>
      <Bg id="bb" a="#ff9e5e" b="#7a1f3d" />
      <circle cx="220" cy="110" r="44" fill="#ffd27a" opacity=".55" />
      {/* chhatra umbrella */}
      <g transform="translate(118 108)">
        <path d="M-50 0 C -40 -40, 40 -40, 50 0 Z" fill="#b3121f" stroke="#ffd166" strokeWidth="3" />
        {Array.from({ length: 9 }).map((_, i) => (
          <path key={i} d={`M${-48 + i * 12} 0 v10`} stroke="#ffd166" strokeWidth="2" />
        ))}
        <path d="M0 -30 V 70" stroke="#ffd166" strokeWidth="3" />
      </g>
      {/* ghodi */}
      <g transform="translate(150 280)">
        <path
          d="M-70 0 C -72 -30, -50 -46, -10 -44 C 20 -44, 40 -46, 52 -62 L 62 -98 C 64 -110, 80 -110, 84 -100 L 100 -66 C 104 -58, 96 -52, 88 -56 L 76 -62 C 70 -40, 64 -20, 60 0 L 64 60 h-12 L 46 10 L -40 12 L -46 60 h-12 L -60 12 C -74 10, -86 20, -92 40 C -96 20, -84 4, -70 0 Z"
          fill="#fdf6e8"
          stroke="#7a1f3d"
          strokeWidth="2"
        />
        <path d="M60 -96 l-6 -18 l12 10 z" fill="#fdf6e8" stroke="#7a1f3d" strokeWidth="1.5" />
        {/* saddle cloth */}
        <path d="M-40 -46 h70 l-6 40 h-58 z" fill="#b3121f" stroke="#ffd166" strokeWidth="2" />
        {Array.from({ length: 7 }).map((_, i) => (
          <circle key={i} cx={-36 + i * 10} cy={-4} r="3" fill="#ffd166" />
        ))}
        {/* head plume */}
        <path d="M74 -104 q-6 -24 8 -32 q-2 16 -2 32" fill="#ffd166" />
        <path d="M58 -78 c 10 4, 20 4, 30 -2" stroke="#ffd166" strokeWidth="3" fill="none" />
      </g>
      <path d="M0 350 h300 v50 h-300z" fill="#5a1430" />
      {Array.from({ length: 10 }).map((_, i) => (
        <circle key={i} cx={15 + i * 30} cy="346" r="5" fill={i % 2 ? '#ffd166' : '#f77f00'} />
      ))}
    </g>
  ),
  wedding: (
    <g>
      <Bg id="bw" a="#d9443f" b="#5a0d17" />
      {/* mandap */}
      <g fill="#ffd166">
        <path d="M40 120 Q150 50 260 120 v12 H40z" />
        {[56, 112, 188, 244].map((x) => (
          <rect key={x} x={x - 5} y="130" width="10" height="200" rx="3" />
        ))}
      </g>
      {/* garlands */}
      {[60, 100, 140, 180, 220].map((x, i) => (
        <path key={x} d={`M${x} 132 q20 ${26 + (i % 2) * 8} 40 0`} stroke={i % 2 ? '#fff' : '#f59f00'} strokeWidth="4" strokeDasharray="1 6" strokeLinecap="round" fill="none" />
      ))}
      {/* agni kund */}
      <g transform="translate(150 300)">
        <path d="M-50 0 h100 l-10 30 h-80z" fill="#8a5a2b" />
        <path d="M-56 -6 h112 v8 h-112z" fill="#c9a24b" />
        <g className="flicker" style={{ transformOrigin: '0px 0px' }}>
          <path d="M-30 -6 C -34 -40, -10 -50, 0 -86 C 10 -50, 34 -40, 30 -6 Z" fill="#ff7b00" />
          <path d="M-16 -6 C -18 -30, -4 -40, 0 -60 C 6 -40, 18 -30, 16 -6 Z" fill="#ffd166" />
          <path d="M-6 -6 C -6 -20, 0 -26, 0 -34 C 2 -26, 6 -20, 6 -6 Z" fill="#fff3bf" />
        </g>
      </g>
      {/* topor (left) and mukut (right) */}
      <g transform="translate(70 250)" fill="#fffaf0" stroke="#c9a24b" strokeWidth="1.2">
        <path d="M-18 30 L0 -40 L18 30 Z" />
        <path d="M-12 10 h24 M-8 -6 h16 M-4 -22 h8" fill="none" />
        <circle cx="0" cy="-42" r="4" />
      </g>
      <g transform="translate(230 260)" fill="#fffaf0" stroke="#c9a24b" strokeWidth="1.2">
        <path d="M-24 20 C -24 -10, -14 -24, 0 -30 C 14 -24, 24 -10, 24 20 Z" />
        {[-12, 0, 12].map((x) => (
          <circle key={x} cx={x} cy="0" r="5" fill="none" />
        ))}
      </g>
      <path d="M0 340 h300 v60 h-300z" fill="#4a0a12" />
      {Array.from({ length: 6 }).map((_, i) => (
        <Diya key={i} x={30 + i * 48} y={366} s={0.8} />
      ))}
    </g>
  ),
  reception: (
    <g>
      <Bg id="br" a="#2d6a8f" b="#101a3d" />
      {/* fairy lights */}
      {[0, 1, 2].map((r) => (
        <g key={r}>
          <path d={`M0 ${40 + r * 30} Q150 ${90 + r * 30} 300 ${40 + r * 30}`} stroke="#ffffff33" fill="none" />
          {Array.from({ length: 12 }).map((_, i) => {
            const t = (i + 0.5) / 12
            const x = t * 300
            const y = 40 + r * 30 + 2 * t * (1 - t) * 50 * 2
            return <circle key={i} cx={x} cy={y} r="3" fill="#ffd27a" className="flicker" style={{ animationDelay: `${(i + r) * 0.2}s` }} />
          })}
        </g>
      ))}
      {/* banana-leaf thali (Bou Bhaat) */}
      <g transform="translate(150 280)">
        <ellipse rx="120" ry="44" fill="#3b9a4a" stroke="#1f5a26" strokeWidth="2" />
        <path d="M-118 0 H118" stroke="#1f5a26" strokeWidth="2" />
        <path d="M-40 0 c 6 -36, 74 -36, 80 0 z" fill="#fffaf0" />
        {[-80, 70, 92].map((x, i) => (
          <circle key={x} cx={x} cy={i ? 6 : -4} r={i ? 9 : 12} fill={['#c9a24b', '#ff7b00', '#f1e3c6'][i]} />
        ))}
      </g>
      {/* shankha-pola bangles */}
      <g transform="translate(150 170)" fill="none" strokeWidth="9">
        <circle r="34" stroke="#fffaf0" />
        <circle r="34" stroke="#c9a24b" strokeWidth="1.5" strokeDasharray="3 4" />
        <circle r="22" stroke="#b3121f" />
      </g>
    </g>
  ),
}

export default function EventArt({ kind }) {
  return arts[kind] || arts.wedding
}

/** Couple portrait placeholder art: groom with sehra & bride with mukut under an arch, paan leaves. */
export function CoupleArt() {
  return (
    <g>
      <Bg id="bc" a="#fde4d8" b="#e6a4bc" />
      <circle cx="150" cy="170" r="90" fill="#fff" opacity=".35" />
      {/* groom */}
      <g transform="translate(110 210)">
        <path d="M-46 190 C -50 110, -40 70, 0 60 C 40 70, 50 110, 46 190 Z" fill="#f1e3c6" stroke="#c9a24b" strokeWidth="2" />
        <path d="M0 60 V190" stroke="#c9a24b" strokeDasharray="3 5" />
        <path d="M-10 40 h20 v24 h-20z" fill="#c8956d" />
        <ellipse cx="0" cy="18" rx="24" ry="28" fill="#c8956d" />
        {/* safa/turban */}
        <path d="M-28 6 C -30 -26, 30 -26, 28 6 C 14 -4, -14 -4, -28 6 Z" fill="#b3121f" />
        <path d="M18 -14 l14 -18 l-4 22z" fill="#ffd166" />
        {/* sehra strings */}
        {Array.from({ length: 9 }).map((_, i) => (
          <path key={i} d={`M${-22 + i * 5.5} 4 v${36 + (i % 2) * 4}`} stroke="#fffaf0" strokeWidth="2" strokeDasharray="2 3" strokeLinecap="round" />
        ))}
        <path d="M-30 80 q30 40 60 0" stroke="#f59f00" strokeWidth="6" strokeDasharray="1 6" strokeLinecap="round" fill="none" />
      </g>
      {/* bride */}
      <g transform="translate(192 214)">
        <path d="M-50 186 C -54 110, -42 70, 0 58 C 42 70, 54 110, 50 186 Z" fill="#fffaf0" stroke="#b3121f" strokeWidth="2" />
        <path d="M-50 186 C -54 110, -42 70, -10 60" stroke="#b3121f" strokeWidth="10" fill="none" />
        <path d="M-8 40 h16 v22 h-16z" fill="#d9a77f" />
        <ellipse cx="0" cy="18" rx="22" ry="27" fill="#d9a77f" />
        <path d="M-26 22 C -34 -20, 34 -20, 26 22 C 26 0, -26 0, -26 22 Z" fill="#2b1a12" />
        {/* chandan dots */}
        {[-14, -9, -4, 0, 4, 9, 14].map((x, i) => (
          <circle key={i} cx={x} cy={6 - Math.sin((i / 6) * Math.PI) * 6} r="1.4" fill="#fffaf0" />
        ))}
        <circle cx="0" cy="12" r="2.4" fill="#b3121f" />
        {/* mukut */}
        <path d="M-20 -8 C -20 -34, 20 -34, 20 -8 Z" fill="#fffaf0" stroke="#c9a24b" />
        {[-12, 0, 12].map((x) => (
          <circle key={x} cx={x} cy="-16" r="4" fill="none" stroke="#c9a24b" />
        ))}
        {/* red veil */}
        <path d="M-30 0 C -40 40, -46 90, -50 120" stroke="#b3121f" strokeWidth="5" fill="none" opacity=".8" />
      </g>
      {/* paan leaves bottom */}
      {[60, 240].map((x, i) => (
        <path
          key={x}
          transform={`translate(${x} 360) rotate(${i ? 20 : -20}) scale(.35)`}
          d="M100 252 C 96 236, 40 200, 18 150 C -6 96, 14 36, 58 22 C 80 15, 94 26, 100 40 C 106 26, 120 15, 142 22 C 186 36, 206 96, 182 150 C 160 200, 104 236, 100 252 Z"
          fill="#3f8f3a"
        />
      ))}
    </g>
  )
}
