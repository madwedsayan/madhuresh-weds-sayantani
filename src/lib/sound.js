/**
 * Synthesised (license-free) ceremonial sounds via Web Audio:
 *  - playConchAndUlu(): a shankha blow followed by a soft ulu-dhwani trill.
 *  - startDroneMusic(): fallback ambient tanpura drone + santoor-like plucks
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

export function playConchAndUlu(volume = 0.5) {
  const ac = getCtx()
  if (!ac) return
  const t = ac.currentTime + 0.05
  const out = ac.createGain()
  out.gain.value = volume
  out.connect(ac.destination)

  // ── Shankha: rich buzzy tone that swells, with a slight upward bend
  const conchGain = ac.createGain()
  conchGain.gain.setValueAtTime(0.0001, t)
  conchGain.gain.exponentialRampToValueAtTime(0.5, t + 0.45)
  conchGain.gain.setValueAtTime(0.5, t + 1.4)
  conchGain.gain.exponentialRampToValueAtTime(0.0001, t + 2.3)
  const lp = ac.createBiquadFilter()
  lp.type = 'lowpass'
  lp.frequency.setValueAtTime(700, t)
  lp.frequency.linearRampToValueAtTime(1800, t + 0.6)
  lp.Q.value = 6
  lp.connect(conchGain).connect(out)
  const vib = ac.createOscillator()
  vib.frequency.value = 5.5
  const vibAmt = ac.createGain()
  vibAmt.gain.value = 3
  vib.connect(vibAmt)
  ;[1, 2, 3].forEach((h, i) => {
    const o = ac.createOscillator()
    o.type = i === 0 ? 'sawtooth' : 'triangle'
    o.frequency.setValueAtTime(233 * h * 0.97, t)
    o.frequency.linearRampToValueAtTime(233 * h, t + 0.5)
    o.frequency.linearRampToValueAtTime(233 * h * 1.03, t + 2.2)
    vibAmt.connect(o.frequency)
    const g = ac.createGain()
    g.gain.value = [0.6, 0.25, 0.12][i]
    o.connect(g).connect(lp)
    o.start(t)
    o.stop(t + 2.4)
  })
  vib.start(t)
  vib.stop(t + 2.4)

  // ── Ulu-dhwani: high voice with rapid tongue-trill amplitude modulation
  const u0 = t + 1.6
  const ulu = ac.createOscillator()
  ulu.type = 'sine'
  ulu.frequency.setValueAtTime(980, u0)
  ulu.frequency.linearRampToValueAtTime(1120, u0 + 0.8)
  ulu.frequency.linearRampToValueAtTime(1040, u0 + 1.6)
  const trill = ac.createOscillator()
  trill.frequency.value = 8.5
  const trillDepth = ac.createGain()
  trillDepth.gain.value = 0.5
  const uluAmp = ac.createGain()
  uluAmp.gain.value = 0.5
  trill.connect(trillDepth).connect(uluAmp.gain)
  const uluEnv = ac.createGain()
  uluEnv.gain.setValueAtTime(0.0001, u0)
  uluEnv.gain.exponentialRampToValueAtTime(0.12, u0 + 0.2)
  uluEnv.gain.setValueAtTime(0.12, u0 + 1.2)
  uluEnv.gain.exponentialRampToValueAtTime(0.0001, u0 + 1.7)
  ulu.connect(uluAmp).connect(uluEnv).connect(out)
  ulu.start(u0)
  trill.start(u0)
  ulu.stop(u0 + 1.8)
  trill.stop(u0 + 1.8)
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
