# Madhuresh weds Sayantani · Lucknow × Kolkata e-invite

A mobile-first, parallax wedding invitation built with **React + Vite + Tailwind CSS + Framer Motion**.

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build in /dist
```

## ✏️ Editing the invite — one file

Edit **`src/config/inviteConfig.js`**. Every `[PLACEHOLDER]` lives there:

| What | Where in the config |
|---|---|
| Parents' names, cities | `couple.groom` / `couple.bride` |
| Front-page date & venue | `wedding.dateDisplay`, `wedding.venueDisplay`, `GOOGLE_MAPS_URL` |
| 8 events (Tilak, Aiburobhat, Mehendi, Haldi · Gaye Holud, Sangeet, Baraat, Shubh Vivah, Reception · Bou Bhaat) | `events[]`: `dateDisplay`, `startISO`/`endISO` (used by **Add to Calendar**), `venue`, `mapsUrl` |
| Countdown target (the muhurat) | `TARGET_WEDDING_ISO_DATE` |
| WhatsApp RSVP number | `WHATSAPP_NUMBER` (country code + number, digits only) |
| Things to know (hashtag, weather, parking) | `thingsToKnow[]` |
| First theme guests see | `defaultTheme`: `'pastel'`, `'royal'` or `'night'` |

Remove or reorder events by editing the `events` array.

### Images (AI portraits / event art)

Every image slot shows a hand-drawn SVG illustration until you add a photo:

1. Put the file in `public/images/`, e.g. `public/images/haldi.jpg`.
2. Set `image: '/images/haldi.jpg'` on that event. For the couple portrait use `welcome.coupleImage`; for the groom and bride cards use `couple.groom.image` and `couple.bride.image`.

Portrait images (3:4) fit the arches best.

### Music

`public/audio/wedding.mp3` is a CC BY-SA 4.0 sitar & tabla recording (see `public/audio/CREDITS.txt`). The credit is shown in the footer from `audio.credit`. Replace the file with your own track and update or clear `audio.credit`. The music fades in when the guest taps to unveil the invitation; the 🎵 button pauses and resumes it. To keep it off until the 🎵 button is tapped, set `audio.playMusicOnOpen: false`. If the file is missing, a synthesised tanpura and santoor plays instead.

### RSVP → Google Sheet (optional)

The RSVP form always opens WhatsApp with a pre-filled message. To also log responses in a Sheet:

1. Open `google-apps-script/Code.gs` and follow the 3 steps at the top.
2. Paste the Web App URL into `GOOGLE_SHEET_WEBAPP_URL` in the config.

## 🚀 Deploy

- **Vercel:** import the repo. It's detected as Vite; `vercel.json` handles routing.
- **Netlify:** import the repo; `netlify.toml` sets the build command and publish directory.
- After deploying, set **`VITE_SITE_URL`** in `.env` (or in the host's environment variables) to your final URL, then redeploy. WhatsApp needs absolute URLs to show the preview image `public/og-image.jpg`.

## Themes

The palette button (bottom-left) cycles through **Pastel Painterly**, **Royal Laal-Paar** and **Night Luxe**. You can link straight to a theme with `?theme=royal`. All colours are CSS variables in `src/index.css`.

## Structure

```
src/
  config/inviteConfig.js      ← all editable content
  components/
    Opener.jsx                ← Shubho Drishti paan-leaf reveal (tap to open)
    FloatingControls.jsx      ← music + theme buttons
    Lanterns.jsx              ← CSS sky lanterns & stars
    sections/                 ← Hero, Family, Couple, CulturalIcons, Events, Procession, ThingsToKnow, Rsvp, Finale
    motifs/                   ← SVG art: cusped arch, Alpona, Chikankari, Ganesha, paan, toran, scenery, event art,
                                Lucknow + Bengali wedding icons (LucknowIcons.jsx, BengaliIcons.jsx), Rumi Darwaza, reflecting water
  lib/                        ← calendar (.ics/Google), Web Audio sounds, themes
```

Have the Hindi and Bengali text checked by family before sending.
