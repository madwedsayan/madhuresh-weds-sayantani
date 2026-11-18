import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BENGALI_SYMBOLS, BaranDala, DhaanDurbo, Loha, MangalGhot, ShoalTopor, SindoorKouto } from '../motifs/BengaliIcons'
import { Jaimala, Kalash, Kangana, LUCKNOW_SYMBOLS, MalaBadal, Mangalsutra, Paandaan, Sehra, Shehnai, SindoorDani, TilakThali } from '../motifs/LucknowIcons'
import { AlponaDivider, ChikanSpray, PaanLeaf, Shankha } from '../motifs/Motifs'

const ShankhaIcon = (p) => <Shankha {...p} color="var(--gold)" />
const PaanIcon = (p) => <PaanLeaf {...p} id="pair-paan" />

/** Researched pairings: a Lucknow/UP object and its Bengali counterpart, with the meaning they share. */
const PAIRS = [
  { up: { Icon: Sehra, name: 'Sehra', native: 'सेहरा' }, bn: { Icon: ShoalTopor, name: 'Topor', native: 'টোপর' }, meaning: 'The groom’s crown — king of the day, shielded from the evil eye.' },
  { up: { Icon: Kalash, name: 'Kalash', native: 'कलश' }, bn: { Icon: MangalGhot, name: 'Mangal Ghot', native: 'মঙ্গল ঘট' }, meaning: 'A sacred pot of water, mango leaves and coconut — inviting the divine and abundance.' },
  { up: { Icon: Jaimala, name: 'Jaimala', native: 'जयमाला' }, bn: { Icon: MalaBadal, name: 'Mala Badal', native: 'মালাবদল' }, meaning: 'Garlands exchanged as two people choose each other.' },
  { up: { Icon: SindoorDani, name: 'Sindoor-dani', native: 'सिंदूरदानी' }, bn: { Icon: SindoorKouto, name: 'Sindoor Kouto', native: 'সিঁদুর কৌটো' }, meaning: 'The vermilion of Sindoor Daan — the moment she becomes a wife.' },
  { up: { Icon: Mangalsutra, name: 'Mangalsutra', native: 'मंगलसूत्र' }, bn: { Icon: Loha, name: 'Shankha-Pola & Loha', native: 'শাঁখা-পলা · লোহা' }, meaning: 'Ornaments that tell the world she is married.' },
  { up: { Icon: TilakThali, name: 'Tilak Thali', native: 'तिलक थाली' }, bn: { Icon: BaranDala, name: 'Baran Dala', native: 'বরণ ডালা' }, meaning: 'A ritual plate to welcome and bless the groom.' },
  { up: { Icon: Shehnai, name: 'Shehnai', native: 'शहनाई' }, bn: { Icon: ShankhaIcon, name: 'Shankha', native: 'শঙ্খ' }, meaning: 'The auspicious sound that announces the wedding.' },
  { up: { Icon: Kangana, name: 'Kangana', native: 'कंगना' }, bn: { Icon: DhaanDurbo, name: 'Dhaan-Durbo', native: 'ধান-দুর্বা' }, meaning: 'Thread and grain, for protection and a fruitful life together.' },
  { up: { Icon: Paandaan, name: 'Paan Gilori', native: 'गिलौरी' }, bn: { Icon: PaanIcon, name: 'Paan Pata', native: 'পান পাতা' }, meaning: 'The betel leaf — Lucknow’s welcome, and the veil of Bengal’s first glance.' },
]

/** Gathbandhan — the knot that ties the two cultures together. */
function Knot({ tied }) {
  return (
    <svg viewBox="0 0 80 44" className="h-11 w-[22%] max-w-[88px] shrink-0 overflow-visible" aria-hidden>
      {/* red (Bengal) and gold (Awadh) cords; tapping ties them into a knot */}
      <motion.path d="M0 22 C 18 22, 24 8, 40 22 C 48 30, 56 28, 58 22" stroke="#b3121f" strokeWidth="3" fill="none" strokeLinecap="round" initial={false} animate={{ pathLength: tied ? 1 : 0.62 }} transition={{ duration: 0.9 }} />
      <motion.path d="M80 22 C 62 22, 56 36, 40 22 C 32 14, 24 16, 22 22" stroke="var(--gold)" strokeWidth="3" fill="none" strokeLinecap="round" initial={false} animate={{ pathLength: tied ? 1 : 0.62 }} transition={{ duration: 0.9 }} />
      <motion.g initial={false} animate={{ scale: tied ? 1 : 0, opacity: tied ? 1 : 0 }} transition={{ duration: 0.5, delay: tied ? 0.6 : 0 }} style={{ originX: '40px', originY: '22px' }}>
        <circle cx="40" cy="22" r="6" fill="var(--gold-light)" />
        <circle cx="40" cy="22" r="2.4" fill="#b3121f" />
      </motion.g>
    </svg>
  )
}

function PairCard({ pair, index }) {
  const [tied, setTied] = useState(false)
  const Side = ({ item, from, script }) => (
    <motion.div
      className="flex w-[39%] flex-col items-center text-center"
      initial={{ x: from * 40, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true }}
      animate={{ x: tied ? from * -14 : 0 }}
      transition={{ duration: 0.8, ease: [0.3, 0.7, 0.2, 1] }}
    >
      <item.Icon className="h-14 w-14 md:h-16 md:w-16" />
      <p className="mt-2 font-display text-[12px] tracking-[0.1em]">{item.name.toUpperCase()}</p>
      <p className={`${script === 'bn' ? 'font-bangla' : 'font-hindi'} text-[13px] opacity-80`}>{item.native}</p>
    </motion.div>
  )
  return (
    <motion.button
      type="button"
      onClick={() => setTied((t) => !t)}
      aria-pressed={tied}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08 }}
      className="relative overflow-hidden rounded-[26px] border px-4 pb-5 pt-5 text-left"
      style={{ borderColor: 'var(--gold)', background: 'color-mix(in srgb, var(--paper) 72%, transparent)' }}
    >
      <motion.div className="pointer-events-none absolute inset-0" animate={{ opacity: tied ? 1 : 0 }} style={{ background: 'radial-gradient(circle at 50% 40%, color-mix(in srgb, var(--gold-light) 45%, transparent), transparent 65%)' }} />
      <div className="relative flex items-center justify-between">
        <Side item={pair.up} from={-1} script="hi" />
        <Knot tied={tied} />
        <Side item={pair.bn} from={1} script="bn" />
      </div>
      <div className="relative mt-3 flex justify-between px-1 font-sans text-[9px] uppercase tracking-[0.25em] opacity-50">
        <span>Lucknow</span>
        <span>Kolkata</span>
      </div>
      <p className="relative mt-2 text-center font-serif text-[16px] italic leading-snug">{pair.meaning}</p>
      <p className="relative mt-2 text-center font-sans text-[9px] uppercase tracking-[0.2em] opacity-45">{tied ? 'two traditions · one bond' : 'tap to tie the knot'}</p>
    </motion.button>
  )
}

/** 3D flip tile: icon + name on the front, meaning on the back. */
function SymbolTile({ item, index, script }) {
  const [flipped, setFlipped] = useState(false)
  const { Icon } = item
  const face = 'absolute inset-0 flex flex-col items-center justify-center rounded-[22px] border px-3 text-center [backface-visibility:hidden] [-webkit-backface-visibility:hidden]'
  const font = script === 'bn' ? 'font-bangla' : 'font-hindi'
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: (index % 7) * 0.04 }}
      onClick={() => setFlipped((f) => !f)}
      onHoverStart={(e) => e.pointerType === 'mouse' && setFlipped(true)}
      onHoverEnd={(e) => e.pointerType === 'mouse' && setFlipped(false)}
      aria-pressed={flipped}
      aria-label={`${item.name}: ${item.meaning}`}
      className="tilt-scene relative aspect-[4/5] w-full"
    >
      <motion.div className="relative h-full w-full" style={{ transformStyle: 'preserve-3d' }} animate={{ rotateY: flipped ? 180 : 0 }} transition={{ duration: 0.7, ease: [0.3, 0.7, 0.2, 1] }}>
        <div className={face} style={{ borderColor: 'var(--gold)', background: 'color-mix(in srgb, var(--paper) 70%, transparent)' }}>
          <Icon className="h-14 w-14 md:h-16 md:w-16" />
          <p className="mt-3 font-display text-[12px] tracking-[0.1em] md:text-[13px]">{item.name.toUpperCase()}</p>
          <p className={`mt-0.5 ${font} text-sm opacity-80`}>{item.native}</p>
          <span className="absolute bottom-2 font-sans text-[9px] uppercase tracking-[0.2em] opacity-40">tap</span>
        </div>
        <div className={face} style={{ transform: 'rotateY(180deg)', borderColor: 'var(--gold)', background: script === 'bn' ? 'var(--card-crimson)' : 'var(--card-emerald)', color: '#fdf6e8' }}>
          <p className={`${font} text-sm text-[var(--gold-light)]`}>{item.native}</p>
          <p className="mt-2 font-serif text-[15px] italic leading-snug md:text-base">{item.meaning}</p>
        </div>
      </motion.div>
    </motion.button>
  )
}

const TABS = [
  { id: 'up', label: 'Lucknow', native: 'लखनऊ', script: 'hi', items: LUCKNOW_SYMBOLS },
  { id: 'bn', label: 'Kolkata', native: 'কলকাতা', script: 'bn', items: BENGALI_SYMBOLS.map((s) => ({ ...s, native: s.bn })) },
]

export default function CulturalIcons() {
  const [tab, setTab] = useState('up')
  const active = TABS.find((t) => t.id === tab)
  return (
    <section className="texture relative overflow-hidden px-5 py-24 md:px-10 md:py-28" style={{ background: 'var(--family-bg)', color: 'var(--family-fg)' }}>
      {/* chikan (Lucknow) on one edge, laal-paar (Kolkata) on the other */}
      <ChikanSpray className="pointer-events-none absolute -left-10 top-16 w-64" color="white" opacity={0.5} />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-4 bg-[#fdf6e8]" style={{ boxShadow: 'inset 0 8px 0 #b3121f' }} />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-4 bg-[#fdf6e8]" style={{ boxShadow: 'inset 0 -8px 0 #b3121f' }} />

      <div className="relative mx-auto max-w-6xl">
        <div className="text-center">
          <p className="font-hindi text-lg opacity-85">
            दो परंपराएँ, एक उत्सव · <span className="font-bangla">দুই ঐতিহ্য, এক উৎসব</span>
          </p>
          <h2 className="mt-2 font-display text-3xl tracking-[0.1em] md:text-5xl">Two Cultures, One Celebration</h2>
          <p className="mx-auto mt-3 max-w-lg font-serif text-lg italic opacity-85">
            The rituals of Awadh and Bengal speak the same language of love. Tap a pair to tie the knot between them.
          </p>
          <div className="mt-5 opacity-70">
            <AlponaDivider />
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {PAIRS.map((pair, i) => (
            <PairCard key={pair.up.name} pair={pair} index={i} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <h3 className="font-display text-xl tracking-[0.14em] md:text-2xl">THE TREASURES OF EACH HOME</h3>
          <div className="mx-auto mt-5 inline-flex rounded-full border p-1" style={{ borderColor: 'var(--gold)' }} role="tablist">
            {TABS.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={tab === t.id}
                onClick={() => setTab(t.id)}
                className="relative rounded-full px-5 py-2 font-sans text-sm font-semibold"
                style={{ color: tab === t.id ? '#fdf6e8' : 'inherit' }}
              >
                {tab === t.id && <motion.span layoutId="culture-tab" className="absolute inset-0 rounded-full" style={{ background: t.id === 'bn' ? 'var(--card-crimson)' : 'var(--card-emerald)' }} />}
                <span className="relative">
                  {t.label} · <span className={t.script === 'bn' ? 'font-bangla' : 'font-hindi'}>{t.native}</span>
                </span>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-5 xl:grid-cols-7">
            {active.items.map((item, i) => (
              <SymbolTile key={item.name} item={item} index={i} script={active.script} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
