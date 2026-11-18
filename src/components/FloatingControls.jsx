import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { IconMusic, IconPalette } from './motifs/Icons'
import { THEMES } from '../lib/themes'
import { pauseMusic, subscribe, toggleMusic } from '../lib/music'

// Music sits above the bottom-right corner so hosting badges (e.g. "Powered by Netlify")
// and the iOS home indicator never cover it.
const MUSIC_BOTTOM = 'calc(env(safe-area-inset-bottom) + 5.5rem)'

/** Bottom-right music toggle + bottom-left theme switcher. */
export default function FloatingControls({ theme, setTheme, visible }) {
  const [playing, setPlaying] = useState(false)
  const [hint, setHint] = useState(false)
  const [toast, setToast] = useState(null)

  useEffect(() => subscribe(setPlaying), [])

  useEffect(() => {
    if (!visible) return
    const a = setTimeout(() => setHint(true), 900)
    const b = setTimeout(() => setHint(false), 7000)
    return () => (clearTimeout(a), clearTimeout(b))
  }, [visible])

  // pause when the tab/app goes to background
  useEffect(() => {
    const onVis = () => document.hidden && pauseMusic()
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  const onMusic = () => {
    setHint(false)
    toggleMusic()
  }

  const cycleTheme = () => {
    const i = THEMES.findIndex((t) => t.id === theme)
    const next = THEMES[(i + 1) % THEMES.length]
    setTheme(next.id)
    setToast(next.label)
    clearTimeout(cycleTheme.t)
    cycleTheme.t = setTimeout(() => setToast(null), 1800)
  }

  const current = THEMES.find((t) => t.id === theme) || THEMES[0]

  return (
    <>
      <AnimatePresence>
        {visible && (
          <>
            <motion.button
              key="theme"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0 }}
              onClick={cycleTheme}
              aria-label={`Change theme (current: ${current.label})`}
              className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-4 z-40 grid h-12 w-12 place-items-center rounded-full border border-white/40 text-white shadow-lg backdrop-blur-md"
              style={{ background: `conic-gradient(${current.swatch.map((c, i) => `${c} ${i * 25}% ${(i + 1) * 25}%`).join(',')})` }}
            >
              <span className="grid h-9 w-9 place-items-center rounded-full bg-black/35">
                <IconPalette className="h-5 w-5" />
              </span>
            </motion.button>

            <motion.button
              key="music"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0 }}
              onClick={onMusic}
              aria-label={playing ? 'Pause music' : 'Play music'}
              aria-pressed={playing}
              className="fixed right-4 z-40 grid h-14 w-14 place-items-center rounded-full border-2 border-[var(--gold-light)] text-white shadow-[0_6px_20px_rgba(0,0,0,.35)]"
              style={{ background: 'var(--sindoor)', bottom: MUSIC_BOTTOM }}
            >
              {playing && <span className="ring absolute inset-0 rounded-full border-2 border-[var(--gold-light)]" />}
              <motion.span animate={playing ? { rotate: 360 } : { rotate: 0 }} transition={playing ? { duration: 6, repeat: Infinity, ease: 'linear' } : {}} className="absolute inset-1 rounded-full border border-dashed border-[var(--gold-light)]/70" />
              <IconMusic on={playing} className="relative h-5 w-5" />
            </motion.button>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {visible && hint && !playing && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            className="fixed right-[5.25rem] z-40 rounded-full bg-black/70 px-3 py-1.5 font-sans text-xs text-white backdrop-blur"
            style={{ bottom: `calc(${MUSIC_BOTTOM} + 0.95rem)` }}
          >
            Tap for music ♪
          </motion.div>
        )}
        {toast && (
          <motion.div
            key={toast}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-[max(1.6rem,calc(env(safe-area-inset-bottom)+.6rem))] left-20 z-40 rounded-full bg-black/60 px-3 py-1.5 font-sans text-xs text-white backdrop-blur"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
