const base = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' }

export const IconHashtag = (p) => (
  <svg viewBox="0 0 48 48" {...base} {...p}>
    <rect x="6" y="6" width="36" height="36" rx="11" />
    <circle cx="24" cy="24" r="8" />
    <circle cx="34.5" cy="13.5" r="1.4" fill="currentColor" />
  </svg>
)
export const IconWeather = (p) => (
  <svg viewBox="0 0 48 48" {...base} {...p}>
    <circle cx="18" cy="18" r="7" />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((r) => (
      <path key={r} d="M18 6 v-3" transform={`rotate(${r} 18 18)`} />
    ))}
    <path d="M16 38 h20 a7 7 0 0 0 0 -14 a9 9 0 0 0 -17 3 a5.5 5.5 0 0 0 -3 11 z" fill="var(--paper)" fillOpacity=".2" />
  </svg>
)
export const IconParking = (p) => (
  <svg viewBox="0 0 48 48" {...base} {...p}>
    <path d="M8 40 V20 L24 8 L40 20 V40" />
    <path d="M19 36 V20 h6 a5 5 0 0 1 0 10 h-6" />
  </svg>
)
export const IconPin = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
)
export const IconCalendar = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
    <path d="M3.5 10h17M8 3v4M16 3v4M12 13v4M10 15h4" />
  </svg>
)
export const IconClock = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </svg>
)
export const IconMusic = ({ on, ...p }) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M9 18V6l10-2v12" />
    <circle cx="6.5" cy="18" r="2.5" />
    <circle cx="16.5" cy="16" r="2.5" />
    {!on && <path d="M3 3l18 18" />}
  </svg>
)
export const IconPalette = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M12 3a9 9 0 1 0 0 18c1.2 0 1.8-.8 1.8-1.7 0-1.2-1-1.6-1-2.6 0-1 .8-1.7 1.8-1.7H17a4 4 0 0 0 4-4C21 6.6 17 3 12 3z" />
    <circle cx="7.5" cy="11" r="1.2" fill="currentColor" />
    <circle cx="10.5" cy="7" r="1.2" fill="currentColor" />
    <circle cx="15" cy="7.5" r="1.2" fill="currentColor" />
  </svg>
)
export const IconWhatsApp = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.1 5.1 0 0 0 1.1 2.7 11.6 11.6 0 0 0 4.4 3.9c1.6.7 2.3.8 3.1.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3z" />
  </svg>
)
export const IconClose = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
)
export const IconArrow = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)
