# R2 — Reel script: "A postcard from Lucknow to Kolkata"
1080×1920, 30 fps, **41.5 s (1245 frames)**, 9 shots. Rendered from one HTML page; there are no CSS transitions anywhere.

**Coordinates.** Frame px: (x, y) with the origin at the top-left. The postcard is 1000×720 cream (#fbf3e4) deckle card, centred at (540, 960), rotated -2°. The portrait (source 1280×886) sits inside it at 0.75 scale, which gives the mapping **F = (60 + 0.75·sx, 628 + 0.75·sy)**. Portrait anchors below are given as source px (sx, sy). Measure them in GIMP before building; these are eyeballed.

| anchor | src px |
|---|---|
| Sanny's sunglasses (bbox) | 320–615, 35–150 |
| Sanny's parting (hairline → crown) | (440, 195) → (470, 105) |
| Sanny's eyes | (350, 340), (512, 378) |
| Sanny's nose tip | (418, 418) |
| Maddy's lens centres | (752, 318) r68, (908, 258) r62 |
| Maddy's crown | (820, 40) |
| Blush, Sanny | (295, 385), (540, 455) |
| Blush, Maddy | (705, 350), (965, 300) |
| Gap between the two of them at chin level | (630, 520) |

Easing names are standard (easeOutBack, etc.). "Shake" means a translate of the whole stage by ±A px with exp decay over N frames, from a seeded PRNG.

---

## S1 — Pench (0.0–5.5 s) · *music: alaap open, solo sitar*
- **Background.** Navy #1a1446 with a radial lift to #2a2160 at (540, 700). There are 40 cream star dots at 0.4–0.9 opacity, and each twinkles with a sin on its own phase.
- **0.0–1.6 s, kites rise.** Two kites come up from the bottom corners:
  - The leaf-green #2f6b3a kite (Lucknow, gold tail) travels (-150, 1900) → (360, 640).
  - The marigold #f59f00 kite (Kolkata, sindoor-red tail) travels (1230, 1900) → (720, 620).
  - Both use easeOutCubic and a ±6° sway at 1.3 Hz.
  - Strings are 2.5 px cream quadratic Béziers running to off-screen fliers at (-40, 2000) and (1120, 2000). They cross at about (540, 1150).
  - SFX: kite whoosh at 0.2 s and 0.5 s.
- **1.8–3.4 s, the pench.** Both kites saw ±40 px in x, 3 cycles, anti-phase. The crossing point jitters ±4 px. SFX: manja zing on each saw stroke.
  - **Captions**, white with a 6 px navy stroke, each scaling 0.6 → 1 with easeOutBack (8 f):
    - "वो काटा!" (Hindi) at (250, 1380), rotated -6°, 92 px, in at 2.0 s.
    - "ভোকাট্টা!" (Bangla) at (830, 1460), rotated +6°, 92 px, in at 2.4 s.
  - **Small English** under each, 34 px gold: "Cut it!".
- **3.4–4.6 s, no cut.**
  - The captions get a single strike line and fade out (6 f).
  - The two strings become a **braid**: two sine-offset paths whose amplitude goes 0 → 7 px, zipping up from the crossing point toward the kites.
  - The kites drift together to (470, 600) and (610, 585) and stop fighting.
  - **Caption** at (540, 1300), 84 px gold #d9a441, fading in over 10 f: "जुड़ गए! · জুড়ে গেল!", with "Joined!" underneath in 36 px cream.
- **4.6–5.5 s, exit into S2.** The braid's lower end swings toward the bottom centre.

## S2 — The postcard arrives (5.5–9.0 s) · *alaap → jor (pulse appears)*
- **5.5–6.8 s, camera tilt down.** The stage translates y by -900 with easeInOutSine. The kites leave out of the top of the frame, and the braid now runs from the top centre down to a knot through a punched hole in the postcard.
  - The postcard, **back side up**, swings in as a damped pendulum: θ = 14°·e^(-2.2t)·cos(5t), pivoting on the knot at (540, 580).
  - SFX: paper flutter.
- **Card back content:**
  - Header: "POST CARD · पोस्ट कार्ड · পোস্টকার্ড".
  - A vertical divider rule.
  - Right half: "From: Lucknow 226001" / "To: Kolkata 700001", handwritten in navy ink. Font: Kalam, in its Devanagari or Latin cut as appropriate.
  - Top-right stamp: Rumi Darwaza, gold and green, 150×180, with a perforated edge and the value "₹5".
  - Left half: blank ruled lines. They are reused in S8.
- **7.6–8.2 s, flip.** The card flips to the portrait: scaleX 1 → 0 → 1 with a slight skewY of ±4° to fake perspective, 18 f, easeInOutQuad. At scaleX = 0 the front plate is swapped in. SFX: card swish.
- **8.2–9.0 s.** Hold, settling to rest at -2°.

## S3 — Names in ink (9.0–13.0 s) · *jor builds; light tanpura bed*
- **Name reveal.** "Madhuresh & Sayantani" is written onto the lower white margin of the card, across a 900 px band at y 1240.
  - Navy ink, about 88 px, single-stroke script.
  - Reveal by stroke-dashoffset on hand-traced centreline paths, at 1.6 s for the whole name. A nib-dot sprite rides the path tip.
  - SFX: pen scratch.
- **11.0 s, translations.** "मधुरेश · সায়ন্তনী" fades in at y 1330, 44 px gold, over 12 f.
- **11.6 s, the nicknames.** A small gold banner unrolls from the left (clip-path, 14 f, easeOutQuart) across the card top, y 560: **"Maddy weds Sanny"**, 64 px cream on sindoor red #c1121f. It is one unit with a straight edge, so it is not the rejected word-pop. The banner stays as the running caption.

## S4 — Shringar montage (13.0–20.0 s) · *TABLA ENTERS at 13.0; drut teental*
- **Beat rule.** Each beat is 1.2 s with a tabla-hit cut on the downbeat.
  - The event chip (cream on navy pill, 52 px, at y 1420) slides 60 px left → 0 over 6 f.
  - The overlay lands with easeOutBack, with a 4 px card shake on impact.
  - **Overlays accumulate.** One new overlay per beat.

| t (s) | chip text | overlay (one) |
|---|---|---|
| 13.0 | আইবুড়োভাত · Aiburobhat | A kansa thala (rice mound, fish head, five small bowls) slides up from below and peeks over the card's bottom-left edge. |
| 14.2 | मेहंदी · মেহেন্দি · Mehendi | A mehendi hand rises past Sanny's cheek at the bottom-left, with a tiny hidden "M" in the palm. It wiggles once. |
| 15.4 | हल्दी · গায়ে হলুদ · Haldi · Gaye Holud | Two turmeric handprint smudges at 70 % opacity in multiply mode, one on each of them at the outer blush anchors. Splat SFX. |
| 16.6 | संगीत · Sangeet | A dholki bounces on the card's bottom-right edge, 3 hops on the tabla bols. Maddy's lenses get a white glint sprite. |
| 17.8 | बारात · Baraat | **Topor gag:** a white shola topor drops from y -400 onto Maddy's crown. Its tip **bonks the "Maddy weds Sanny" banner**: the banner dents and the card jolts 10 px with a 3° swing. The topor then settles tilted 8°. SFX: woodblock *tok*, crowd laugh sting. |
| 19.0–20.0 | (tihai over three hits) | No new overlay. The camera starts pushing in. |

## S5 — Shubho Drishti hush (20.0–24.0 s) · *tihai lands on sam at 20.0, then MUSIC DROPS to tanpura only (-18 dB)*
- **20.0–20.8 s, push-in.** Stage scale 1 → 1.7 centred on the faces (580, 300 src), easeInOutCubic. The thala, hand and dholki fall out of frame. Haldi fades to 30 %. The topor is cropped at the top.
- **Betel leaves.** Two leaf sprites slide 80 px *inward from the left and right frame edges* and stop at the edge. Nothing covers the portrait.
- **21.0–22.2 s, eyes.** The pupil sprites slide over 20 f, easeInOutSine: Sanny's 9 px right/up and Maddy's 9 px left/down, so they look at each other. SFX: a single soft sitar pluck when the gazes meet.
- **22.2–23.2 s, fog and blush.**
  - Fog: a cream ellipse at 0 → 55 % opacity on each lens, starting from the bottom edge. SFX: breath *hhh*.
  - Blush: duplicate blush sprites at 0 → 60 %. Sanny's goes first, Maddy's 8 f later.
- **23.2–24.0 s, caption.** "শুভদৃষ্টি · शुभ दृष्टि", 60 px, with "The first look" beneath in 34 px cream.

## S6 — HERO: becoming husband & wife (24.0–31.0 s) · *tanpura → SWELL (sitar + tabla return at 27.0)*
- **24.0–24.9 s, the sunglasses hop.**
  - The sunglasses sprite lifts 40 px off Sanny's head, revealing the retouched hair underneath.
  - It then hops on a parabolic arc (apex 160 px above) onto Maddy's curls at about (800, 70) src. Rotation goes -15° → -6°, with a 3-frame squash on landing.
  - The topor is shoved back 12°: second gag.
  - SFX: soft *boing*.
- **25.0–26.1 s, sindoor.**
  - A gold ring sprite (with a red tip) enters from Maddy's side, so it reads as his hand, and traces the parting (440, 195) → (470, 105) in 1.1 s, easeInOutSine.
  - Sindoor #c1121f is revealed behind the ring by a stroke-dashoffset mask on a textured line 9 px wide. SFX: ring tinkle.
- **26.1–26.7 s, the omen.** 5 grains fall from the hairline to the nose tip (418, 418) under gravity, with ±3 px x-scatter. They land and stick as 3–4 tiny dots. **27.0: the swell.** Ulu (2 s) starts together with it.
- **Caption** at y 1450 (frame), 0.4 s fade:
  - "নাকে সিঁদুর পড়লে বর খুব ভালোবাসে" (Bangla), 50 px
  - "नाक पे सिंदूर गिरा — पिया बहुत प्यार करेंगे" (Hindi), 44 px
  - "Sindoor on her nose: he'll love her very much." (English), 32 px
- **28.5–30.0 s, the banner changes.** The banner swaps "Maddy weds Sanny" → "Maddy & Sanny" (0.3 s crossfade). Then each name slides up out of the banner as "Mr" and "Mrs" drop in (12 f, staggered 4 f), while "&" stays put. Result: **"Mr & Mrs"**. SFX: shankh ×3 at 28.5, 29.2 and 29.9.
- **30.0–31.0 s.** The camera pulls back to scale 1.15.

## S7 — Postmark slam (31.0–32.5 s) · *sam hit, full ensemble*
- **31.0–31.2 s, the stamp comes down.** A circular postmark, ink navy #1a1446 at 85 % multiply, radius 190 src px, rotated -12°, lands at the gap (630, 520). It is half on each of them. Its shadow grows 6 f before impact.
- **31.2 s, impact.** The ink appears in full on the impact frame. Stage shake A = 14 px over 12 f. SFX: **rubber-stamp thunk** plus a tabla *dha*.
- **Postmark text:**
  - Ring: "LUCKNOW · लखनऊ · KOLKATA · কলকাতা".
  - Centre: "LKO ⇄ CCU" / "[DATE]".
  - Three wavy cancel lines run right.
- **32.0–32.5 s.** Hold, with a 2 % camera drift.

## S8 — Events on the back (32.5–37.5 s) · *steady tabla groove (music for reading)*
- **32.5–33.1 s, flip to portrait orientation.** The card flips (scaleX trick, 18 f) and rotates 0 → 90°, so the back is upright. It scales to 1000×1390 px, centred at (540, 1000).
  - The postmark ghost shows through mirrored at 10 %. The Rumi Darwaza stamp is now cancelled too.
- **Event list.** Written into the message area, one line every 4 f (no bounce, opacity plus 12 px rise). Navy, title 46 px and detail 32 px.
  1. আইবুড়োভাত · Aiburobhat — [DATE] · [VENUE]
  2. मेहंदी · Mehendi — [DATE] · [VENUE]
  3. हल्दी · গায়ে হলুদ · Haldi · Gaye Holud — [DATE] · [VENUE]
  4. संगीत · Sangeet — [DATE] · [VENUE]
  5. बारात · Baraat — [DATE] · [TIME] · [VENUE]
  6. शुभ विवाह · শুভ বিবাহ · Shubh Vivah · Shubho Bibaho — [DATE] · [MUHURAT] · [VENUE]
  7. Reception · বউভাত · Bou Bhaat — [DATE] · [VENUE]
- **Address block.** "To: Kolkata 700001" stays in the address block at the bottom.
- **Legibility hold.** The full list is on screen from 33.6 to 37.5 s, giving **3.9 s fully legible plus the write-on**. If the client wants 5 s, extend S8 by 1 s (total 42.5 s).

## S9 — End card: one river (37.5–41.5 s) · *final phrase, sitar meend, resolve*
- **37.5–38.4 s, the kites take the postcard.** The braid tightens and lifts the card out of the top of the frame (easeInCubic). At the same time the stage tilts up 600 px, back into the sky.
- **Skyline.** Navy sky with the joined kites small and high at (560, 360), bobbing ±8 px.
  - Bottom 35 %: one river band, navy with gold glints, across y 1500–1920.
  - Bara Imambara silhouette on the left (x 0–520) and Howrah Bridge on the right (x 520–1080), both in leaf-green-black #12301a with gold window dots, reflected in the river at 30 % with a sine ripple.
  - 6 diyas float across.
- **Text,** centred, each fading and rising 20 px, staggered 6 f:
  - "#MaddyWedsSanny", 88 px gold, y 860
  - "[DATE] · [VENUE]", 44 px cream, y 960
  - "ज़रूर आइएगा · আসবেন কিন্তু!", 56 px gold, y 1060
  - "Do come!", 32 px cream, y 1130
- **Credit.** "Portrait: [ARTIST]", 22 px cream at 60 %, y 1880.
- **41.0–41.5 s.** Hold. The music resolves on sam at 41.0 and the reverb tail runs out.
- **Register note.** "আসবেন কিন্তু" is the polite form for elders. "Esho kintu" is informal, so I suggest it only for a friends-only cut.

---

## Music edit
- Take a ~3-minute sitar/tabla track and make two edits:
  1. Alaap/jor from the top, 0–13 s.
  2. Hard-cut on a tabla entry at 13.0 into the drut section, which should contain a tihai that lands at 20.0.
- In the hush (20–27 s), duck to -18 dB or crossfade to a tanpura drone stem. The swell re-enters at 27.0, and the ending is the track's final sam, edited so it lands at 41.0.
- Put a beat grid (onset times) into `cues.json`. The montage beats and the stamp snap to the nearest onset, within ±3 f.
- **Rights.** Instagram mutes unlicensed tracks, so use royalty-free or commissioned music. Better still, ask the couple for "their" song played on sitar (catalogue #1).

**SFX:** kite whoosh ×2, manja zing ×6, paper flutter, card swish ×2, pen scratch, tabla hits (from the track), splat, tok + laugh sting, sitar pluck, breath, boing, ring tinkle, **ulu**, **shankh ×3**, **rubber-stamp thunk**, wind tail. The "Wo kaata!" / "Bhokatta!" voice shouts are best recorded on a phone by family from both sides.

## Assets
### From the portrait (honest list)
1. **Base plate.** A clean 600-dpi scan, colour-matched. Keep the artist's monogram.
2. **Sunglasses sprite.** Cut with a GIMP path plus a 1 px feather, out to `sunglasses.png`.
   - **Hair underneath is missing.** Cheap route: clone-stamp curls from her crown sides (src 200–320, 120–260), then paint a dark-brown parting gap. Allow 1–2 h, and it is passable at reel speed.
   - **Optional artist route:** the painter paints a 450×220 "hair without sunglasses" patch on the same paper, which gets scanned and composited.
3. **Eyes.** Patch the 4 dot eyes with sampled skin tone plus paper grain to make `eyes-patched` plates. Cut the original dots out as pupil sprites so the ink stays authentic. Maddy's patch is masked inside his rims so the glasses survive.
   - Optional: the artist paints 4 spare pupils and 2 blush swatches.
4. **Blush.** Duplicate the 4 blush patches as sprites for the deepen effect.
5. **Paper texture** sampled from the margin, for card edges and the postcard back.

### SVG sprites (watercolour look)
Kites ×2, braid, Rumi Darwaza stamp, kansa thala, mehendi hand, haldi prints, dholki, topor, betel leaves ×2, lens glint, fog, gold ring, sindoor line, grains, postmark, Imambara, Howrah Bridge, diyas, nib dot.
- **Style.** Since we render offline, live SVG filters are allowed: feTurbulence + feDisplacementMap edges, with a wet-edge darker stroke. Use a **fixed seed** for determinism, or bake to PNG.
- **Optional artist route:** the painter does the topor, mehendi hand and stamp on paper, which raises the quality where viewers look closest.

### Fonts
Kalam (Latin + Devanagari), Hind Siliguri or Noto Serif Bengali, plus Tiro Bangla for headings. Names: hand-trace centrelines in Inkscape from "Homemade Apple" or similar, because dashoffset on outline glyphs looks wrong.

## Production pipeline
1. **`reel.html`**: a fixed 1080×1920 stage with absolutely positioned layers.
   - `window.render(f)` computes every transform, opacity and dashoffset from `t = f/30` using pure functions: `seg(t, in, out, ease)`, the seeded PRNG for shakes/grains, and `cues.json` for times.
   - No CSS animations, transitions or `requestAnimationFrame`. Always await `document.fonts.ready`, and wait for images to decode.
2. **Capture.** Playwright (Chromium), viewport 1080×1920, DPR 1. For each frame: `await page.evaluate(f => render(f), i)`, then `page.screenshot({path:`frames/${i.toString().padStart(5,'0')}.png`})`. That is 1245 frames, roughly 3–5 min.
   - Spot-check frames at 2.4, 17.9, 26.5 and 31.2 s.
   - Scrub mode: `?t=26.5` renders a single frame.
3. **Audio.** `sfx.py` reads `cues.json` and builds the ffmpeg `adelay` + `amix` graph with the music edit, so SFX and visuals share the same timestamps. Output is `mix.wav`.
4. **Encode:** `ffmpeg -framerate 30 -i frames/%05d.png -i mix.wav -c:v libx264 -crf 18 -preset slow -pix_fmt yuv420p -c:a aac -b:a 192k -shortest -movflags +faststart reel.mp4`
5. **Safe zones.** Keep all text between y 250 and 1600 and x 60–1020 to clear the IG/WhatsApp UI. The S9 credit is the only exception.

## Cultural sensitivities
- **Sindoor.**
  - Confirm with the couple that they want Sindoor Daan and the nose omen shown.
  - The ring visibly comes from Maddy's side (his act). The spill stays tiny, with no comic excess.
  - **Fallback cut:** the ring places a gold maang-tikka at the parting instead, and the caption becomes "Mr & Mrs" only.
- **Topor.** The topor is ritually made shola. The gag bumps the *banner*, never the topor falling on the floor.
- **Shankh and ulu** are used once, at the auspicious moment only.
- **No deity imagery.** There is no Ganesha opener (cliché #1). If the family wants one, put a small "॥ श्री गणेशाय नमः ॥" as a header on the postcard back in S2.
- **Bou Bhaat** is normally hosted by the groom's family. Confirm the combined "Reception · Bou Bhaat" wording.

## Inspirations (r1_reels.md)
| shot | inspired by |
|---|---|
| S1 | (b)9 kite pench (adapted from Goldin & Losse's "earned unlock") + culture #6 |
| S2/S7 | #7 Shahina & Akbar's facing stamps → (b)2 postmark thunk |
| S3 | #2 Guneet/DDLJ: one vehicle (here the postcard) carries the story |
| S4 | #0 client reel "same character, re-costumed", made cumulative per (b)1 |
| S8 | #4 Vizag card: info inside a format everyone knows |
| S9 | #12 Turmeric Ink, real architecture as stage, against cliché #7 |
| music | #1 Nayanthara |

Rejected items avoided: there is no bleed reveal, paan-lowering, halves sliding together, knot swoop, word-pop, taxi wipe or page turn. The transitions are a camera tilt, card flips and a kite lift.
