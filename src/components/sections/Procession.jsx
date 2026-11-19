import { useRef } from 'react'
import { motion, useTransform } from 'framer-motion'
import useSmoothProgress from '../../lib/useSmoothProgress'
import { archPath } from '../motifs/Arch'
import { IconPin } from '../motifs/Icons'
import config from '../../config/inviteConfig'

/** Decorated Lucknowi ghodi with the groom in sehra. Faces right. */
function GhodiRider() {
  return (
    <svg viewBox="0 0 260 240" className="h-auto w-full overflow-visible" aria-label="Groom on a decorated mare">
      {/* chhatra (umbrella) */}
      <path d="M96 10 C 104 -14, 164 -14, 172 10 Z" fill="var(--sindoor)" stroke="#ffd166" strokeWidth="2" />
      {Array.from({ length: 7 }).map((_, i) => (
        <circle key={i} cx={100 + i * 11.5} cy="13" r="2.4" fill="#ffd166" />
      ))}
      <path d="M134 -2 V 70" stroke="#ffd166" strokeWidth="2.5" />
      {/* groom */}
      <g>
        <path d="M108 120 C 104 92, 112 72, 132 70 C 150 72, 156 92, 152 120 Z" fill="#fdf6e8" stroke="#c9a24b" strokeWidth="1.5" />
        <path d="M130 70 v50" stroke="#c9a24b" strokeDasharray="2 4" />
        <ellipse cx="132" cy="58" rx="11" ry="13" fill="#c8956d" />
        <path d="M119 52 C 118 34, 146 34, 145 52 C 138 46, 126 46, 119 52 Z" fill="var(--sindoor)" />
        <circle cx="139" cy="42" r="2.6" fill="#ffd166" />
        <path d="M139 44.5 q-1.5 3 0 5 q1.5 -2 0 -5" fill="#ffd166" />
        {Array.from({ length: 6 }).map((_, i) => (
          <path key={i} d={`M${122 + i * 4} 50 v${20 + (i % 2) * 3}`} stroke="#fff" strokeWidth="1.6" strokeDasharray="1.5 2.5" strokeLinecap="round" />
        ))}
        <path d="M150 92 l20 6" stroke="#fdf6e8" strokeWidth="6" strokeLinecap="round" />
        <path d="M120 118 l-4 34" stroke="#fdf6e8" strokeWidth="8" strokeLinecap="round" />
      </g>
      {/* horse — a decorated cream ghodi, prancing (right foreleg raised) */}
      <defs>
        <radialGradient id="hCoat" cx="45%" cy="30%" r="80%">
          <stop offset="0" stopColor="#fbf6ea" />
          <stop offset=".6" stopColor="#ece1ca" />
          <stop offset="1" stopColor="#cdbd9e" />
        </radialGradient>
        <linearGradient id="hSock" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e6d9bf" />
          <stop offset=".35" stopColor="#8a6748" />
          <stop offset="1" stopColor="#5a3f2a" />
        </linearGradient>
        <linearGradient id="hTail" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f3efe6" />
          <stop offset="1" stopColor="#c9c2b4" />
        </linearGradient>
        <linearGradient id="hCloth" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c8492f" />
          <stop offset="1" stopColor="#9a2f1d" />
        </linearGradient>
      </defs>
      <g>
        {/* ── far-side legs (in shadow, behind the body) ── */}
        <g opacity=".82">
          {/* far hind, stepping forward */}
          <path d="M84 146 C 88 164, 94 176, 97 186 L 95 204 L 96 220 L 105 220 L 104 204 L 107 186 C 105 170, 102 158, 100 146 Z" fill="#d8ccb3" stroke="#9a8466" strokeWidth="1" />
          <path d="M94 200 L 96 220 L 106 220 L 104 200 Z" fill="url(#hSock)" />
          <path d="M93 218 h14 l2 7 h-18 z" fill="#2e2016" />
          {/* far fore, standing */}
          <path d="M182 150 C 183 164, 185 178, 185 190 L 185 220 L 194 220 L 194 190 C 195 176, 197 162, 198 150 Z" fill="#d8ccb3" stroke="#9a8466" strokeWidth="1" />
          <path d="M184 198 L 184 220 L 194 220 L 194 198 Z" fill="url(#hSock)" />
          <path d="M182 218 h14 l2 7 h-18 z" fill="#2e2016" />
        </g>

        {/* tail — long and flowing */}
        <path d="M48 120 C 28 128, 18 150, 22 176 C 24 194, 16 208, 6 220 C 22 214, 34 200, 36 182 C 40 200, 34 214, 26 226 C 44 214, 50 194, 46 170 C 46 150, 52 134, 58 124 Z" fill="url(#hTail)" stroke="#b8ae9c" strokeWidth=".8" />
        <path d="M42 132 C 32 150, 32 172, 30 192 M48 140 C 42 160, 44 182, 38 204" stroke="#bdb5a5" strokeWidth=".8" fill="none" />

        {/* ── near-side legs (tops tucked under the body so they join cleanly) ── */}
        {/* near hind, planted back: gaskin → hock → cannon, same thickness as the forelegs */}
        <path d="M56 136 C 54 158, 58 176, 62 194 L 73 194 C 75 178, 80 162, 84 140 Z" fill="url(#hCoat)" stroke="#9a8466" strokeWidth="1" />
        <path d="M62 190 L 63 220 L 73 220 L 73 190 Z" fill="url(#hSock)" />
        <path d="M60 218 h15 l2 7 h-19 z" fill="#2e2016" />
        {/* near fore, raised and bent at the knee (prancing) */}
        <path d="M188 146 C 198 156, 210 166, 222 176 L 228 182 C 226 188, 220 190, 215 187 L 206 179 C 198 172, 190 164, 184 154 Z" fill="url(#hCoat)" stroke="#9a8466" strokeWidth="1" />
        <path d="M227 182 L 217 201 L 208 198 L 216 180 Z" fill="url(#hSock)" />
        <path d="M208 196 l10 3 l-2 8 l-11 -4 z" fill="#2e2016" />

        {/* ── body, arched neck and head ── */}
        <path
          d="M48 120 C 54 98, 84 94, 112 102 C 140 108, 162 104, 178 96 C 184 74, 200 50, 218 40 C 224 36, 230 36, 234 40 C 244 46, 252 58, 258 72 C 262 80, 262 88, 256 92 C 250 96, 242 94, 238 90 C 232 86, 228 84, 224 88 C 216 98, 214 114, 214 128 C 214 144, 204 154, 190 158 C 164 164, 112 164, 88 160 C 70 158, 54 152, 46 140 C 40 132, 42 126, 48 120 Z"
          fill="url(#hCoat)"
          stroke="#9a8466"
          strokeWidth="1.2"
        />
        {/* ears */}
        <path d="M226 40 L 228 24 L 235 38 Z" fill="#efe6d2" stroke="#9a8466" strokeWidth="1" />
        <path d="M222 41 L 220 27 L 228 38 Z" fill="#d8ccb3" stroke="#9a8466" strokeWidth=".8" />
        {/* muzzle shading, eye, nostril, mouth */}
        <path d="M252 72 C 260 78, 263 86, 256 92 C 250 96, 242 94, 239 90 C 244 86, 249 80, 252 72 Z" fill="#7d6a58" opacity=".5" />
        <ellipse cx="240" cy="55" rx="3.2" ry="2.3" fill="#2b1a12" />
        <circle cx="241" cy="54" r=".9" fill="#fff" />
        <path d="M253 82 q2 -2 4 0" stroke="#3b2a1d" strokeWidth="1.2" fill="none" />
        <path d="M240 91 q4 2 8 1" stroke="#5a4636" strokeWidth=".8" fill="none" />
        {/* jaw + neck muscle lines */}
        <path d="M226 86 C 232 76, 236 70, 238 62" stroke="#cdbd9e" strokeWidth="1" fill="none" />

        {/* mane under a quilted red-gold neck cover */}
        <path d="M178 96 C 184 74, 200 50, 218 40 C 214 60, 210 80, 204 100 C 196 106, 186 104, 178 96 Z" fill="#c8492f" stroke="#d9a441" strokeWidth="1.5" />
        {[0, 1, 2, 3, 4].map((i) => (
          <path key={i} d={`M${184 + i * 6} ${92 - i * 11} l7 7`} stroke="#f2c14e" strokeWidth="1.6" />
        ))}
        <path d="M218 40 c-5 -3 -10 0 -11 6 c 4 -3 8 -4 11 -6" fill="#efe9de" />

        {/* bridle: browband, noseband, cheek strap */}
        <g stroke="#b8402a" strokeWidth="3" fill="none" strokeLinecap="round">
          <path d="M228 42 L 246 52" />
          <path d="M243 74 L 257 70" />
          <path d="M232 44 L 243 74" />
          <path d="M243 74 L 238 89" />
        </g>
        <g fill="#f2c14e">
          {[[236, 47], [243, 51], [250, 71], [238, 60]].map(([x, y]) => (
            <circle key={`${x}${y}`} cx={x} cy={y} r="1.6" />
          ))}
        </g>
        {/* reins to the groom's hand */}
        <path d="M252 90 C 224 106, 196 102, 170 98" stroke="#7a4a25" strokeWidth="1.6" fill="none" />

        {/* collar band + teal scalloped breastplate */}
        <path d="M178 100 C 192 112, 204 124, 214 132" stroke="#c8492f" strokeWidth="7" fill="none" strokeLinecap="round" />
        <path d="M178 100 C 192 112, 204 124, 214 132" stroke="#f2c14e" strokeWidth="1.4" strokeDasharray="3 3" fill="none" />
        {[0, 1, 2, 3, 4].map((i) => {
          const t = i / 4
          const x = 181 + t * 30
          const y = 106 + t * 28
          return <path key={i} d={`M${x - 5} ${y} q5 12 10 0 z`} fill="#4f9d8f" stroke="#f2c14e" strokeWidth="1" />
        })}

        {/* ornamental swirls on the hindquarter and shoulder */}
        <g stroke="#c9b27a" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity=".85">
          <path d="M56 140 c 4 -10, 16 -10, 16 0 c 0 6, -8 8, -10 2" />
          <path d="M60 160 c 6 4, 12 0, 10 -6" />
          <path d="M184 140 c 6 -6, 14 -2, 12 6 c -2 4, -8 4, -8 0" />
        </g>

        {/* saddle cloth: red with gold border, brocade and tasselled hem */}
        <path d="M84 104 C 110 100, 150 100, 170 102 L 168 150 C 150 156, 110 158, 88 152 Z" fill="url(#hCloth)" stroke="#d9a441" strokeWidth="2.5" />
        <path d="M92 112 C 114 108, 146 108, 162 110 L 160 144 C 144 148, 112 150, 96 146 Z" fill="none" stroke="#f2c14e" strokeWidth="1" strokeDasharray="2 3" />
        {Array.from({ length: 12 }).map((_, i) => (
          <path key={i} d={`M${104 + (i % 4) * 15} ${118 + Math.floor(i / 4) * 10} q4 -4 8 0 q-4 4 -8 0`} fill="#e9b24f" opacity=".8" />
        ))}
        {Array.from({ length: 9 }).map((_, i) => (
          <path key={i} d={`M${92 + i * 9.2} ${151 + Math.sin(i) * 1.2} v6`} stroke="#f2c14e" strokeWidth="2" strokeLinecap="round" />
        ))}
        {/* saddle */}
        <path d="M110 104 C 116 92, 128 92, 132 100 C 138 92, 150 92, 152 104 Z" fill="#b38b5d" stroke="#7a5a35" strokeWidth="1" />
        {/* marigold garland on the neck */}
        <path d="M192 104 q12 26 22 0" stroke="#f59f00" strokeWidth="5" strokeDasharray="1 5" strokeLinecap="round" fill="none" />
      </g>
      {/* groom's leg + mojari in the stirrup (over the saddle cloth) */}
      <path d="M132 104 C 146 112, 152 126, 148 146" stroke="#c9a24b" strokeWidth="9" strokeLinecap="round" fill="none" />
      <path d="M132 104 C 146 112, 152 126, 148 146" stroke="#fdf6e8" strokeWidth="7" strokeLinecap="round" fill="none" />
      <path d="M140 108 v24" stroke="#7a5a35" strokeWidth="1.2" />
      <path d="M144 146 q8 -4 16 1 q-3 4 -16 3 z" fill="#c8492f" stroke="#f2c14e" strokeWidth="1" />
      <path d="M141 144 h12" stroke="#7a5a35" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

/** Kolkata yellow Ambassador taxi with a marigold garland. Faces left. */
function YellowTaxi({ wheelRot }) {
  const Wheel = ({ cx }) => (
    <motion.g style={{ rotate: wheelRot, originX: `${cx}px`, originY: '150px' }}>
      <circle cx={cx} cy="150" r="22" fill="#1d1d1d" />
      <circle cx={cx} cy="150" r="12" fill="#d0d0d0" />
      <path d={`M${cx - 12} 150 h24 M${cx} 138 v24`} stroke="#777" strokeWidth="2" />
    </motion.g>
  )
  return (
    <svg viewBox="0 0 300 180" className="h-auto w-full overflow-visible" aria-label="Kolkata yellow taxi">
      <ellipse cx="150" cy="172" rx="130" ry="7" fill="#00000022" />
      {/* body */}
      <path d="M20 140 C 16 112, 30 100, 60 96 L 92 92 C 104 66, 120 52, 160 50 C 196 50, 214 64, 228 90 L 262 96 C 284 100, 290 116, 288 140 Z" fill="#ffd21f" stroke="#2a2a2a" strokeWidth="2" />
      {/* windows — the bride rides in the back seat, looking out toward the baraat */}
      <defs>
        <clipPath id="taxi-front-win">
          <path d="M106 90 C 116 70, 130 62, 156 62 L 156 90 Z" />
        </clipPath>
        <clipPath id="taxi-rear-win">
          <path d="M164 62 C 190 62, 204 70, 214 90 L 164 90 Z" />
        </clipPath>
      </defs>
      <path d="M106 90 C 116 70, 130 62, 156 62 L 156 90 Z" fill="#9fd3e6" />
      <path d="M164 62 C 190 62, 204 70, 214 90 L 164 90 Z" fill="#9fd3e6" />
      {/* driver silhouette */}
      <g clipPath="url(#taxi-front-win)">
        <circle cx="140" cy="80" r="8" fill="#3b2a22" />
        <path d="M126 92 C 128 84, 152 84, 154 92 Z" fill="#e8e1d0" />
      </g>
      {/* Bengali bride: red veil, white shola mukut, chandan dots, teep, nath */}
      <g clipPath="url(#taxi-rear-win)">
        <path d="M168 92 C 168 82, 196 80, 200 92 Z" fill="#b3121f" />
        <path d="M168 92 C 170 86, 176 84, 180 86" stroke="#ffd166" strokeWidth="1.4" fill="none" />
        <ellipse cx="185" cy="76" rx="8.6" ry="10" fill="#d9a77f" />
        {/* hair + red veil (anchal) over the head */}
        <path d="M176 76 C 175 64, 195 63, 194 75 C 191 69, 180 69, 176 76 Z" fill="#2b1a12" />
        <path d="M173 90 C 170 74, 176 62, 186 61 C 196 61, 199 70, 198 78 C 196 70, 190 66, 185 66 C 178 66, 175 72, 176 90 Z" fill="#b3121f" />
        <path d="M174 86 C 173 74, 178 64, 186 63" stroke="#ffd166" strokeWidth="1" strokeDasharray="1.5 1.5" fill="none" />
        {/* shola mukut */}
        <path d="M178 66 C 179 58, 191 58, 192 66 Z" fill="#fffaf0" stroke="#c9a24b" strokeWidth=".7" />
        <circle cx="185" cy="61" r="1.6" fill="#fffaf0" stroke="#c9a24b" strokeWidth=".5" />
        {/* chandan dots arc + teep */}
        {[-5, -2.5, 0, 2.5, 5].map((dx, i) => (
          <circle key={i} cx={185 + dx} cy={70.5 - Math.cos((dx / 5) * 1.2) * 1.4} r=".7" fill="#fffaf0" />
        ))}
        <circle cx="185" cy="72.5" r="1.1" fill="#b3121f" />
        {/* eyes looking toward the front (left), smile, nath */}
        <path d="M180 76.5 q1.5 -1 3 0 M186 76.5 q1.5 -1 3 0" stroke="#2b1a12" strokeWidth=".8" fill="none" />
        <path d="M182.5 81.5 q2.5 1.6 5 0" stroke="#9b3b3b" strokeWidth=".8" fill="none" />
        <circle cx="181.4" cy="79.2" r="1.6" fill="none" stroke="#ffd166" strokeWidth=".6" />
      </g>
      <path d="M106 90 C 116 70, 130 62, 156 62 L 156 90 Z" fill="#ffffff" opacity=".12" stroke="#2a2a2a" strokeWidth="1.5" />
      <path d="M164 62 C 190 62, 204 70, 214 90 L 164 90 Z" fill="#ffffff" opacity=".12" stroke="#2a2a2a" strokeWidth="1.5" />
      <path d="M170 66 l10 -2 l-14 22 z" fill="#fff" opacity=".18" />
      {/* roof sign */}
      <rect x="140" y="40" width="34" height="11" rx="2" fill="#fff" stroke="#2a2a2a" />
      <text x="157" y="49" textAnchor="middle" fontSize="8" fontFamily="sans-serif" fontWeight="700" fill="#2a2a2a">TAXI</text>
      {/* black lower band & bumpers */}
      <path d="M18 134 H290 v8 H18z" fill="#2a2a2a" />
      <rect x="8" y="124" width="26" height="10" rx="3" fill="#cfcfcf" />
      <rect x="276" y="124" width="22" height="10" rx="3" fill="#cfcfcf" />
      {/* headlamp + grille (front is left) */}
      <circle cx="30" cy="112" r="8" fill="#fff6c2" stroke="#2a2a2a" />
      <path d="M40 104 h18 v20 h-18z" fill="#cfcfcf" stroke="#2a2a2a" />
      <path d="M44 104 v20 M48 104 v20 M52 104 v20" stroke="#888" />
      {/* door line */}
      <path d="M160 92 V134 M108 92 V134 M218 94 V134" stroke="#2a2a2a" strokeWidth="1.2" />
      {/* marigold garland across bonnet */}
      <path d="M60 98 Q 82 124 104 96" stroke="#f59f00" strokeWidth="6" strokeDasharray="1 6" strokeLinecap="round" fill="none" />
      <path d="M60 98 Q 82 116 104 96" stroke="#d9480f" strokeWidth="5" strokeDasharray="1 7" strokeLinecap="round" fill="none" />
      <Wheel cx={70} />
      <Wheel cx={236} />
    </svg>
  )
}

export default function Procession() {
  const ref = useRef(null)
  const p = useSmoothProgress(ref, ['start start', 'end end'])
  const ghodiX = useTransform(p, [0, 1], ['-60vw', '115vw'])
  const taxiX = useTransform(p, [0, 1], ['110vw', '-70vw'])
  const wheelRot = useTransform(p, [0, 1], [0, -1440])
  const lucknowX = useTransform(p, [0, 1], ['0%', '-12%'])
  const kolkataX = useTransform(p, [0, 1], ['0%', '12%'])
  const titleScale = useTransform(p, [0, 0.5, 1], [0.9, 1, 1])
  const meetOpacity = useTransform(p, [0.42, 0.5, 0.62], [0, 1, 0])

  return (
    <section ref={ref} className="relative h-[240vh]" aria-label="See the route">
      <div className="texture sticky top-0 h-[100svh] overflow-hidden" style={{ background: 'linear-gradient(180deg, var(--route-top) 0%, var(--route-top) 50%, var(--route-bottom) 50%, var(--route-bottom) 100%)' }}>
        <motion.div className="relative z-10 px-6 pt-[10svh] text-center" style={{ scale: titleScale, color: 'var(--family-fg)' }}>
          <p className="font-sans text-xs uppercase tracking-[0.45em] opacity-80">Lucknow ✦ Kolkata</p>
          <h2 className="mt-2 font-display text-[clamp(2.2rem,9vw,4.5rem)] leading-none tracking-[0.06em]">SEE THE ROUTE</h2>
          <p className="mx-auto mt-3 max-w-md font-serif text-lg italic opacity-90">The baraat rides from the city of Nawabs, a yellow taxi races from the City of Joy — and they meet at:</p>
          <p className="mt-2 font-sans text-sm font-semibold">{config.wedding.venueDisplay}</p>
          <a href={config.wedding.mapsUrl} target="_blank" rel="noreferrer" className="btn mt-4 text-white shadow-lg" style={{ background: 'var(--sindoor)' }}>
            <IconPin className="h-4 w-4" /> Get Directions
          </a>
        </motion.div>

        {/* horizon: Lucknow arches left, Kolkata bridge right */}
        <motion.svg viewBox="0 0 400 120" className="absolute bottom-1/2 left-0 h-auto w-[60vw] max-w-[620px] opacity-60" style={{ x: lucknowX }} aria-hidden>
          <g fill="var(--stone-shade)">
            <path d="M0 120 V60 h180 V120z" />
            <path d="M60 60 c0 -40 60 -40 60 0z" />
            <rect x="20" y="30" width="16" height="30" />
            <rect x="144" y="30" width="16" height="30" />
            <path d="M16 30 c0 -16 24 -16 24 0z M140 30 c0 -16 24 -16 24 0z" />
          </g>
          <path d={archPath(70, 60, { lobes: 7 })} transform="translate(55 60)" fill="var(--route-top)" />
        </motion.svg>
        <motion.svg viewBox="0 0 400 120" className="absolute bottom-1/2 right-0 h-auto w-[60vw] max-w-[620px] opacity-60" style={{ x: kolkataX }} aria-hidden>
          <g stroke="var(--stone-shade)" strokeWidth="5" fill="none">
            <path d="M120 118 L180 30 L200 30 Q270 80 340 30 L360 30 L400 90" />
            <path d="M80 118 H400" strokeWidth="7" />
            <path d="M180 30 V118 M200 30 V118 M340 30 V118 M360 30 V118" strokeWidth="3" />
          </g>
        </motion.svg>

        {/* road */}
        <div className="absolute inset-x-0 bottom-[16svh] h-[2px] bg-[var(--gold)]/60" />
        <div className="absolute inset-x-0 bottom-[10svh] h-[3px]" style={{ backgroundImage: 'repeating-linear-gradient(90deg, var(--gold) 0 40px, transparent 40px 80px)', opacity: 0.6 }} />

        <motion.div className="absolute bottom-[14svh] left-0 w-[min(46vw,330px)]" style={{ x: ghodiX }}>
          <GhodiRider />
        </motion.div>
        <motion.div className="absolute bottom-[6svh] left-0 w-[min(52vw,380px)]" style={{ x: taxiX }}>
          <YellowTaxi wheelRot={wheelRot} />
        </motion.div>

        <motion.p className="absolute inset-x-0 bottom-[42svh] text-center font-script text-4xl" style={{ opacity: meetOpacity, color: 'var(--sindoor)' }}>
          Milan — মিলন — मिलन
        </motion.p>
      </div>
    </section>
  )
}
