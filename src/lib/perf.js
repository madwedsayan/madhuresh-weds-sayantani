/**
 * Low-end device detection. Sets <html data-lite="1"> so CSS can drop the costliest decorative
 * animations, and exports `LITE` so components can render fewer elements.
 *
 * Lite when: ≤4 CPU cores, ≤4 GB RAM (Chrome/Android only), or Data Saver is on.
 * Override for testing with ?lite=1 or ?lite=0.
 */
function detect() {
  try {
    const q = new URLSearchParams(location.search).get('lite')
    if (q === '1') return true
    if (q === '0') return false
    const n = navigator
    if (n.connection?.saveData) return true
    if (typeof n.deviceMemory === 'number' && n.deviceMemory <= 4) return true
    if (typeof n.hardwareConcurrency === 'number' && n.hardwareConcurrency <= 4) return true
  } catch {
    /* ignore */
  }
  return false
}

export const LITE = typeof window !== 'undefined' && detect()
if (LITE) document.documentElement.dataset.lite = '1'

/**
 * While the page is scrolling, freeze the small looping animations inside SVG scenes (CSS + SMIL):
 * each one forces the browser to repaint the illustration on every frame, which competes with the
 * parallax. They resume ~180 ms after scrolling stops — the pause is invisible in practice.
 */
if (typeof window !== 'undefined') {
  let timer = 0
  let paused = null
  // the big scene illustrations (marked data-scene) — an attribute on each, not a page-wide class,
  // keeps the style recalc scoped to those SVGs
  const scenes = () => [...document.querySelectorAll('svg[data-scene]')]
  const stop = () => {
    paused.forEach((el) => {
      el.removeAttribute('data-paused')
      el.unpauseAnimations?.()
    })
    paused = null
  }
  window.addEventListener(
    'scroll',
    () => {
      if (!paused) {
        paused = scenes()
        paused.forEach((el) => {
          el.setAttribute('data-paused', '')
          el.pauseAnimations?.()
        })
      }
      clearTimeout(timer)
      timer = setTimeout(stop, 180)
    },
    { passive: true },
  )
}
