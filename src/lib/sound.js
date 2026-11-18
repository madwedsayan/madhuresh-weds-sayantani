/**
 * Synthesised (license-free) fallback music via Web Audio:
 *  - startDroneMusic(): ambient tanpura drone + santoor-like plucks
 *    (used only if /audio/wedding.mp3 is missing or fails to load).
 */
let ctx
export function getCtx() {
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext
    if (!AC) return null
    ctx = new AC()
  }
  if (ctx.state === 'suspended') ctx.resume()
  return ctx
}

// ── Fallback ambient music ─────────────────────────────────────────────────
let drone = null
export function startDroneMusic(volume = 0.35) {
  const ac = getCtx()
  if (!ac || drone) return drone
  const master = ac.createGain()
  master.gain.setValueAtTime(0.0001, ac.currentTime)
  master.gain.exponentialRampToValueAtTime(volume, ac.currentTime + 2)
  master.connect(ac.destination)

  const delay = ac.createDelay()
  delay.delayTime.value = 0.38
  const fb = ac.createGain()
  fb.gain.value = 0.35
  delay.connect(fb).connect(delay)
  delay.connect(master)

  const SA = 146.83 // D3
  // tanpura: Pa – Sa – Sa – Sa(low), gently re-plucked
  const tanpura = [SA * 1.5, SA * 2, SA * 2, SA]
  let ti = 0
  const pluck = (f, when, gain, decay, type = 'sawtooth', toDelay = false) => {
    const o = ac.createOscillator()
    o.type = type
    o.frequency.value = f
    const lp = ac.createBiquadFilter()
    lp.type = 'lowpass'
    lp.frequency.value = type === 'sawtooth' ? 900 : 3000
    const g = ac.createGain()
    g.gain.setValueAtTime(0.0001, when)
    g.gain.exponentialRampToValueAtTime(gain, when + 0.02)
    g.gain.exponentialRampToValueAtTime(0.0001, when + decay)
    o.connect(lp).connect(g).connect(master)
    if (toDelay) g.connect(delay)
    o.start(when)
    o.stop(when + decay + 0.05)
  }
  // Raag Bhupali-like pentatonic: S R G P D S'
  const scale = [1, 9 / 8, 5 / 4, 3 / 2, 5 / 3, 2, 9 / 4, 5 / 2]
  let phraseIdx = 0
  const timer = setInterval(() => {
    const now = ac.currentTime + 0.05
    pluck(tanpura[ti++ % 4], now, 0.12, 3.2)
    if (Math.random() < 0.8) {
      phraseIdx = Math.max(0, Math.min(scale.length - 1, phraseIdx + Math.round((Math.random() - 0.45) * 3)))
      const f = SA * 2 * scale[phraseIdx]
      pluck(f, now + 0.3, 0.09, 1.4, 'triangle', true)
      if (Math.random() < 0.5) pluck(f, now + 0.45, 0.05, 1.0, 'triangle', true)
    }
  }, 800)
  drone = {
    stop() {
      clearInterval(timer)
      master.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + 0.8)
      setTimeout(() => master.disconnect(), 900)
      drone = null
    },
  }
  return drone
}
