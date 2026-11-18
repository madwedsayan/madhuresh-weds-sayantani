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
        <path d="M140 40 l8 -12 l-1 14 z" fill="#ffd166" />
        {Array.from({ length: 6 }).map((_, i) => (
          <path key={i} d={`M${122 + i * 4} 50 v${20 + (i % 2) * 3}`} stroke="#fff" strokeWidth="1.6" strokeDasharray="1.5 2.5" strokeLinecap="round" />
        ))}
        <path d="M150 92 l20 6" stroke="#fdf6e8" strokeWidth="6" strokeLinecap="round" />
        <path d="M120 118 l-4 34" stroke="#fdf6e8" strokeWidth="8" strokeLinecap="round" />
      </g>
      {/* horse */}
      <g className="origin-center" style={{ animation: 'trot .5s ease-in-out infinite' }}>
        <path
          d="M40 130 C 40 108, 70 104, 110 108 C 150 110, 178 110, 196 92 L 210 58 C 214 48, 230 48, 234 58 L 248 86 C 251 94, 244 100, 236 96 L 224 90 C 218 110, 212 126, 208 146 L 212 206 h-12 L 192 156 L 92 156 L 84 206 h-12 L 70 156 C 54 154, 44 164, 30 186 C 32 160, 38 142, 40 130 Z"
          fill="#fffaf0"
          stroke="#7a1f3d"
          strokeWidth="2"
        />
        <path d="M208 56 l-4 -18 l12 12 z" fill="#fffaf0" stroke="#7a1f3d" strokeWidth="1.5" />
        <path d="M222 50 q-4 -26 10 -32 q-2 14 -2 32" fill="#ffd166" />
        <path d="M206 80 c 10 4, 22 4, 32 -2" stroke="#ffd166" strokeWidth="3" fill="none" />
        <circle cx="232" cy="72" r="2.4" fill="#2b1a12" />
        {/* saddle cloth */}
        <path d="M86 108 h80 l-6 46 h-68 z" fill="var(--sindoor)" stroke="#ffd166" strokeWidth="2" />
        {Array.from({ length: 8 }).map((_, i) => (
          <circle key={i} cx={92 + i * 9.5} cy={150} r="3" fill="#ffd166" />
        ))}
        <path d="M96 118 h60" stroke="#ffd166" strokeDasharray="3 3" />
        {/* garlands on neck */}
        <path d="M196 96 q10 24 24 -2" stroke="#f59f00" strokeWidth="5" strokeDasharray="1 5" strokeLinecap="round" fill="none" />
      </g>
      <style>{`@keyframes trot { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-3px) } }`}</style>
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
