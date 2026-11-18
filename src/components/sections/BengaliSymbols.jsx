import { useState } from 'react'
import { motion } from 'framer-motion'
import { BENGALI_SYMBOLS } from '../motifs/BengaliIcons'
import { AlponaDivider } from '../motifs/Motifs'

/** A 3D flip tile: icon + name on the front, meaning on the back (tap / hover). */
function SymbolTile({ item, index }) {
  const [flipped, setFlipped] = useState(false)
  const { Icon } = item
  const face = 'absolute inset-0 flex flex-col items-center justify-center rounded-[22px] border px-3 text-center [backface-visibility:hidden] [-webkit-backface-visibility:hidden]'
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.08 }}
      onClick={() => setFlipped((f) => !f)}
      onHoverStart={(e) => e.pointerType === 'mouse' && setFlipped(true)}
      onHoverEnd={(e) => e.pointerType === 'mouse' && setFlipped(false)}
      aria-pressed={flipped}
      aria-label={`${item.name}: ${item.meaning}`}
      className="tilt-scene relative aspect-[4/5] w-full"
    >
      <motion.div className="relative h-full w-full" style={{ transformStyle: 'preserve-3d' }} animate={{ rotateY: flipped ? 180 : 0 }} transition={{ duration: 0.7, ease: [0.3, 0.7, 0.2, 1] }}>
        {/* front */}
        <div className={face} style={{ borderColor: 'var(--gold)', background: 'color-mix(in srgb, var(--paper) 70%, transparent)' }}>
          <Icon className="h-14 w-14 md:h-16 md:w-16" />
          <p className="mt-3 font-display text-[13px] tracking-[0.12em] md:text-sm">{item.name.toUpperCase()}</p>
          <p className="mt-0.5 font-bangla text-sm opacity-80">{item.bn}</p>
          <span className="absolute bottom-2 font-sans text-[9px] uppercase tracking-[0.2em] opacity-40">tap</span>
        </div>
        {/* back */}
        <div className={face} style={{ transform: 'rotateY(180deg)', borderColor: 'var(--gold)', background: 'var(--card-crimson)', color: '#fdf6e8' }}>
          <p className="font-bangla text-sm text-[var(--gold-light)]">{item.bn}</p>
          <p className="mt-2 font-serif text-[15px] italic leading-snug md:text-base">{item.meaning}</p>
        </div>
      </motion.div>
    </motion.button>
  )
}

export default function BengaliSymbols() {
  return (
    <section className="texture relative overflow-hidden px-5 py-24 md:px-10 md:py-28" style={{ background: 'var(--family-bg)', color: 'var(--family-fg)' }}>
      {/* laal-paar saree borders */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-4 bg-[#fdf6e8]" style={{ boxShadow: 'inset 0 -8px 0 #b3121f' }} />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-4 bg-[#fdf6e8]" style={{ boxShadow: 'inset 0 8px 0 #b3121f' }} />

      <div className="relative mx-auto max-w-6xl">
        <div className="text-center">
          <p className="font-bangla text-lg opacity-85">বিয়ের উপকরণ</p>
          <h2 className="mt-2 font-display text-3xl tracking-[0.1em] md:text-5xl">Symbols of the Biye</h2>
          <p className="mx-auto mt-3 max-w-md font-serif text-lg italic opacity-85">The little treasures of a Bengali wedding — tap each one to learn its story.</p>
          <div className="mt-5 opacity-70">
            <AlponaDivider />
          </div>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-5 xl:grid-cols-7">
          {BENGALI_SYMBOLS.map((item, i) => (
            <SymbolTile key={item.name} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
