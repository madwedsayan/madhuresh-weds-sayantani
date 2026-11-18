import { useEffect, useState } from 'react'
import { MotionConfig } from 'framer-motion'
import Opener from './components/Opener'
import FloatingControls from './components/FloatingControls'
import Hero from './components/sections/Hero'
import Family from './components/sections/Family'
import Couple from './components/sections/Couple'
import CulturalIcons from './components/sections/CulturalIcons'
import Events from './components/sections/Events'
import Procession from './components/sections/Procession'
import ThingsToKnow from './components/sections/ThingsToKnow'
import Rsvp from './components/sections/Rsvp'
import Finale from './components/sections/Finale'
import { THEMES } from './lib/themes'
import config from './config/inviteConfig'

const readTheme = () => {
  try {
    const t = new URLSearchParams(location.search).get('theme') || localStorage.getItem('invite-theme')
    if (THEMES.some((x) => x.id === t)) return t
  } catch {
    /* storage may be blocked */
  }
  return config.defaultTheme
}

export default function App() {
  const [opened, setOpened] = useState(false)
  const [revealed, setRevealed] = useState(false) // site is rendered (hidden) behind the opener; shown as the card zooms away
  const [live, setLive] = useState(false) // site animations resume only once the opener has fully faded
  const [theme, setTheme] = useState(readTheme)

  useEffect(() => {
    const root = document.documentElement
    root.classList.add('theme-fade')
    root.dataset.theme = theme
    const t = setTimeout(() => root.classList.remove('theme-fade'), 700)
    try {
      localStorage.setItem('invite-theme', theme)
    } catch {
      /* ignore */
    }
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.content = getComputedStyle(root).getPropertyValue('--sky-1').trim()
    return () => clearTimeout(t)
  }, [theme])

  // lock scrolling while the opener card is showing
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
    document.body.classList.toggle('locked', !opened)
  }, [opened])

  return (
    <MotionConfig reducedMotion="user">
      <Opener onReveal={() => setRevealed(true)} onOpen={() => setOpened(true)} onExitComplete={() => setLive(true)} />
      {/* Kept out of the compositor (visibility:hidden) while the paan leaves part, then shown behind the
          still-opaque opener backdrop as the card zooms away — so it's painted before the backdrop fades.
          CSS animations stay paused until the opener has fully gone. Big win on low-end phones. */}
      <main aria-hidden={!opened} className={live ? undefined : 'anim-paused'} style={revealed ? undefined : { visibility: 'hidden' }}>
        <Hero />
        <Family />
        <Couple />
        <CulturalIcons />
        <Events />
        <Procession />
        <ThingsToKnow />
        <Rsvp />
        <Finale />
      </main>
      <FloatingControls theme={theme} setTheme={setTheme} visible={opened} />
    </MotionConfig>
  )
}
