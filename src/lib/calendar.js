// "Add to Calendar" helpers — Google Calendar link + downloadable .ics (Apple/Outlook).
const toUTC = (iso) => new Date(iso).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')

export function googleCalendarUrl(ev, coupleLine) {
  const p = new URLSearchParams({
    action: 'TEMPLATE',
    text: `${ev.title} · ${coupleLine}`,
    dates: `${toUTC(ev.startISO)}/${toUTC(ev.endISO || ev.startISO)}`,
    details: `${ev.blurb || ''}\n\nRoute: ${ev.mapsUrl}`,
    location: ev.venue,
  })
  return `https://calendar.google.com/calendar/render?${p.toString()}`
}

export function downloadIcs(ev, coupleLine) {
  const esc = (s = '') => String(s).replace(/([,;\\])/g, '\\$1').replace(/\n/g, '\\n')
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//MadhureshSayantani//Invite//EN',
    'BEGIN:VEVENT',
    `UID:${ev.id}-${Date.now()}@madhuresh-sayantani`,
    `DTSTAMP:${toUTC(new Date().toISOString())}`,
    `DTSTART:${toUTC(ev.startISO)}`,
    `DTEND:${toUTC(ev.endISO || ev.startISO)}`,
    `SUMMARY:${esc(`${ev.title} · ${coupleLine}`)}`,
    `DESCRIPTION:${esc(`${ev.blurb || ''}\nRoute: ${ev.mapsUrl}`)}`,
    `LOCATION:${esc(ev.venue)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
  const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar;charset=utf-8' }))
  const a = Object.assign(document.createElement('a'), { href: url, download: `${ev.id}.ics` })
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
