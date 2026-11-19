// usage: node render2.mjs url seconds fps outdir [start] [stills: comma list of seconds]
import puppeteer from '../shot/node_modules/puppeteer-core/lib/esm/puppeteer/puppeteer-core.js'
const [url, secs, fps = 24, out = 'frames', start = 0, stills = ''] = process.argv.slice(2)
const dir = new URL('.', import.meta.url).pathname
const b = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] })
const p = await b.newPage(); const errs = []; p.on('pageerror', (e) => errs.push(e.message)); p.on('console', (m) => m.type() === 'error' && errs.push(m.text()))
await p.setViewport({ width: 1080, height: 1920 })
await p.goto(url, { waitUntil: "networkidle0" }); await p.waitForFunction("window.reelReady"); await p.evaluate(async () => { await document.fonts.ready; await new Promise(r => setTimeout(r, 800)); await document.fonts.ready })
const list = stills ? stills.split(',').map(Number) : Array.from({ length: Math.round(secs * fps) }, (_, i) => +start + i / fps)
const t0 = Date.now()
for (let i = 0; i < list.length; i++) {
  await p.evaluate((t) => window.renderAt(t), list[i])
  await p.screenshot({ path: `${dir}${out}/${stills ? 's' + list[i].toFixed(2) : 'f' + String(i).padStart(5, '0')}.jpg`, type: 'jpeg', quality: 90 })
}
console.log('frames', list.length, 'ms/frame', Math.round((Date.now() - t0) / list.length), 'errors', JSON.stringify(errs.slice(0, 5))); await b.close()
