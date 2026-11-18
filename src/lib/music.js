/**
 * Shared background-music controller (one <audio> for the whole site), so the
 * opener tap and the floating music button control the same track.
 * Falls back to the synthesised tanpura drone if the mp3 can't play.
 */
import { startDroneMusic } from './sound'
import config from '../config/inviteConfig'

const TARGET_VOLUME = 0.6
let audio
let drone = null
let playing = false
let fadeTimer
const listeners = new Set()

const emit = () => listeners.forEach((fn) => fn(playing))
const getAudio = () => {
  if (!audio) {
    audio = new Audio(config.audio.src)
    audio.loop = true
    audio.preload = 'auto'
  }
  return audio
}

export function preloadMusic() {
  getAudio().load()
}

export function subscribe(fn) {
  listeners.add(fn)
  fn(playing)
  return () => listeners.delete(fn)
}

export const isPlaying = () => playing

/**
 * Must be called directly inside a tap/click handler (mobile autoplay rules).
 * Volume fades in gently where the browser allows it (iOS ignores volume, but the
 * track itself has a soft fade-in).
 */
export function playMusic({ fadeMs = 2500 } = {}) {
  if (playing) return
  const a = getAudio()
  clearInterval(fadeTimer)
  try {
    a.volume = 0
  } catch {
    /* iOS: read-only */
  }
  playing = true
  emit()
  const p = a.play()
  const startFade = () => {
    const t0 = performance.now()
    fadeTimer = setInterval(() => {
      const k = Math.min(1, (performance.now() - t0) / fadeMs)
      try {
        a.volume = TARGET_VOLUME * k
      } catch {
        /* ignore */
      }
      if (k >= 1) clearInterval(fadeTimer)
    }, 50)
  }
  if (p && p.then) {
    p.then(startFade).catch(() => {
      // mp3 missing / blocked → synthesised fallback
      drone = startDroneMusic()
      playing = !!drone
      emit()
    })
  } else startFade()
}

export function pauseMusic() {
  clearInterval(fadeTimer)
  audio?.pause()
  drone?.stop()
  drone = null
  playing = false
  emit()
}

export const toggleMusic = () => (playing ? pauseMusic() : playMusic({ fadeMs: 800 }))
