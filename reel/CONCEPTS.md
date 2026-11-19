# #MaddyWedsSanny: Round 2 creative deck

**Process:** four specialists did round 1 (culture, motion, play, trend research on invite reels), about 45 raw ideas in all. I cut roughly 30 of them as generic or off-tone. Round 2 deepened the rest into a reel script plus web storyboards with a feasibility pass against the real code.

**Source files** (all in `/tmp/claude-1000/-home-saumy-maddywed/28f59a98-1f6e-479b-baa3-99207fb17866/scratchpad/creative/`):
- `r1_culture.md`, `r1_motion.md`, `r1_play.md`, `r1_reels.md`
- `r1_critique.md`
- `r2_reel.md`: the full pixel-level reel script
- `r2_web.md`: the full storyboards

**Palette:** gold #d9a441, sindoor #c1121f, navy #1a1446, cream #fbf3e4, marigold #f59f00, leaf #2f6b3a.

**The insight the deck is built on:** in the real painting, **Sanny's sunglasses sit exactly on her hair parting**, where sindoor goes. So the wedding cannot happen until the sunglasses move, and they move to *him*. That is our "becoming husband & wife" moment, and it can only come from this one portrait.

---

## 1. THE REEL: "A Postcard from Lucknow to Kolkata" (build first)
**Pitch:** two rival kites refuse to cut each other. Their joined string delivers a postcard (the portrait), which the guest watches get dressed, look, wed, and get postmarked "LKO ⇄ CCU".

**Spec:**
- 1080×1920, 30 fps, **41.5 s**, 9 shots.
- The portrait is a cream deckle postcard, 1000×720, centred at (540, 960) and rotated −2°.
- Pixel coordinates, easings and anchors are in `r2_reel.md`.

| # | Time (s) | On screen and motion | Text | Music / SFX |
|---|---|---|---|---|
| S1 Pench | 0–5.5 | Navy sky with 40 cream stars. A leaf-green Lucknow kite (gold tail) rises from the bottom-left and a marigold Kolkata kite (red tail) from the bottom-right. Their strings cross at (540, 1150) and saw ±40 px, 3 times. The strings **braid instead of cutting**, and the kites drift side by side. | "वो काटा!" (−6°) and "ভোকাট্টা!" (+6°), 92 px white, each with "Cut it!" under it. Both get struck through, then "जुड़ गए! · জুড়ে গেল! / Joined!" in gold. | Alaap opens. Kite whoosh, manja zing. |
| S2 Delivery | 5.5–9.0 | The camera tilts down the braid, which ends in a knot through a hole in a postcard. The card swings in as a damped pendulum, back side up: "POST CARD · पोस्ट कार्ड · পোস্টকার্ড", "From: Lucknow 226001 / To: Kolkata 700001", and a ₹5 Rumi Darwaza stamp. It **flips** (scaleX 1→0→1, 18 frames) to the portrait. | (address text) | Alaap into jor. Paper flutter, swish. |
| S3 Ink | 9–13 | "Madhuresh & Sayantani" is handwritten in navy ink in the bottom margin (stroke reveal, nib-dot leading). A sindoor-red banner unrolls across the top as one piece. | "मधुरेश · সায়ন্তনী" (gold), then **"Maddy weds Sanny"** on the banner | Jor builds. Pen scratch. |
| S4 Shringar | 13–20 | One overlay per tabla downbeat, each held 1.2 s, and they accumulate:<br>• a kansa thala peeks in (**Aiburobhat**)<br>• a mehendi hand rises, with a hidden "M" (**Mehendi**)<br>• haldi handprints on both cheeks (**Haldi · Gaye Holud**)<br>• a dholki hops and Maddy's lenses glint (**Sangeet**)<br>• **Baraat:** a white shola topor drops on Maddy and its tip **bonks the banner**, which dents while the card jolts. | Event chips, cream on a navy pill, at y 1420 | **Tabla enters at 13.0.** Splat; woodblock *tok* plus a laugh sting. |
| S5 Shubho Drishti | 20–24 | Push in to 1.7× on the faces. Betel leaves slide in at the frame *edges only*. The pupils slide until **they look at each other**, Maddy's glasses fog from the bottom up, and both blushes deepen. | "শুভদৃষ্টি · शुभ दृष्टि / The first look" | **Tihai lands, then hush** (tanpura only). One sitar pluck, a breath. |
| S6 HERO | 24–31 | The **sunglasses lift off Sanny's parting and hop onto Maddy's curls**, knocking his topor askew. A gold ring comes *from his side* and traces the sindoor line up her parting, and five grains fall onto her nose. The banner morphs "Maddy weds Sanny" → "Maddy & Sanny" → **"Mr & Mrs"**. | "নাকে সিঁদুর পড়লে বর খুব ভালোবাসে" / "नाक पे सिंदूर गिरा — पिया बहुत प्यार करेंगे" / "Sindoor on her nose: he'll love her very much." | **Swell at 27.0.** Boing, ring tinkle, **ulu**, **shankh ×3**. |
| S7 Postmark | 31–32.5 | A navy postmark ring slams down straddling both of them, with a 14 px decaying shake. | "LUCKNOW · लखनऊ · KOLKATA · কলকাতা", "LKO ⇄ CCU · [DATE]" | Sam hit, **rubber-stamp thunk**. |
| S8 The back | 32.5–37.5 | The card flips and turns upright. The 7 events write onto the ruled lines, 4 frames apart. The Rumi Darwaza stamp is now cancelled. | আইবুড়োভাত Aiburobhat · मेहंदी Mehendi · Haldi · Gaye Holud · Sangeet · Baraat · Shubh Vivah · Shubho Bibaho · Reception · Bou Bhaat, each with [DATE] · [VENUE] | Steady groove. |
| S9 One river | 37.5–41.5 | The braid lifts the card up out of frame. Below: one river with the Bara Imambara on the left and Howrah Bridge on the right, gold window dots, reflections and 6 diyas. The joined kites hang high above. | **#MaddyWedsSanny** · [DATE] · [VENUE] · "ज़रूर आइएगा · আসবেন কিন্তু!" / Do come! · small "Portrait: [ARTIST]" credit | Final meend, resolves on sam at 41.0. |

**Why it's special:**
- Every beat is sourced: the near-identical "cut!" cry in both cities, Shubho Drishti, the folk omen of sindoor on the nose, and a postcard between two real PIN codes.
- The transformation is **cumulative and earned**: the portrait gets dressed, looks, marries and is posted. It is not just revealed.

**Portrait use:** hero for 26 of the 41 s.

**Assets** (one retouch job, about 3–4 h in GIMP or Photopea):
1. Cut the sunglasses out as a sprite.
2. Paint curls and a visible parting under the sunglasses.
3. Heal the 4 painted eye-dots out, and reuse the original dots as movable pupils, keeping Maddy's lens rims intact.
4. Duplicate the blush patches.

The rest are SVG sprites (kites, stamp, topor, thala, hand, dholki, ring, postmark, skyline).

*Optional:* the artist paints a 450×220 "hair without sunglasses" patch plus the topor and stamp on the same paper. This is the biggest jump in quality for the money.

**Build sketch:**
- One `reel.html` with `render(f)`: pure functions of `t = f/30`, a seeded PRNG, and no CSS animations.
- Timings live in `cues.json`, which drives both the picture and the SFX mix.
- Capture 1245 frames with Playwright (about 4 min), mix with ffmpeg `adelay`/`amix`, encode to h264.
- Offline rendering, so phone performance is irrelevant and SVG watercolour filters are allowed.
- **Effort: M** (about 3 days).
- **Risks:**
  - Music rights: Instagram mutes unlicensed tracks, so use royalty-free or commissioned music.
  - Keep text inside y 250–1600 for the IG/WhatsApp UI.

**Inspired by:**
- The client reel's "same characters re-costumed", made *cumulative*
- Shahina & Akbar's facing postage-stamp portraits (creativeboom.com/work/shahina-ahmed)
- The Guneet Monga DDLJ train invite: one vehicle carries the story
- The Vizag WhatsApp card: info in a familiar format
- Turmeric Ink: real architecture as the stage

---

## Website concepts (ranked)

### 2. Sindoor & Sunglasses ("He keeps them. Forever.")
**Where:** a new `SindoorDaan` section after the Route procession, at the point in the story where the wedding happens.

**Beats:**
1. The dressed portrait on navy with a static diya glow. A silver sindoor-kouto and ring sit below, with the prompt "Tap the sindoor".
2. The ring rises (spring 120/16) and *clinks* into the sunglasses, which wobble (±8°). Caption: "Ek minute…".
3. The guest flicks the sunglasses (they go on their own after 3 s). They **hop onto Maddy's curls** (650 ms arc, landing +8°), and his pupils glance up at them. Caption: "He keeps them. Forever."
4. The guest drags down the pulsing parting guide. A pre-painted red stroke is revealed by `scaleY`, and past 70% it auto-completes.
5. Six grains tumble and 3 stick on her nose, with the Bangla omen caption. The music ducks, then ulu and shankh ×3 play.
6. The names swap to **"Mr & Mrs"**, then the music returns.

**Why it's special:**
- It is the one transformation no other couple's invite could have; it is built on a detail of *their* painting.
- It is tender (a ritual, a blessing) and funny (he inherits her sunglasses) at the same time.

**Assets:** the shared retouch. **Effort:** L (the code is M, plus the retouch).

**Build notes:**
- Pointer capture on a 90×150 px `touch-action:none` strip, so the rest of the page scrolls normally.
- Sprites only. A Skip button jumps to the final state.
- **Risk:** low, about 10 transform layers.

**Inspired by:** the client reel (making the couple *act*, not bob); the trend catalogue noted that no invite it found changes the portrait itself.

### 3. Shubho Drishti ("Help them look")
**Where:** Meet the Bride & Groom. The portrait finally replaces the placeholder in a new landscape `PortraitStage`, because the current 300×400 arch crops it.

**Beats:**
1. Both look away, Sanny down-left and Maddy up-right. Paan leaves frame only the bottom corners. Hint: "drag ↔".
2. A horizontal drag moves their gazes in mirror (spring 170/20).
3. **Turn:** twice, as the gazes near each other, Sanny's pupils dart away shyly. Caption: "lajja…" (shy).
4. On the third try the gazes lock. Maddy's glasses fog cream and then clear with a wipe, both blush, and one ulu plays.
5. Caption: "শুভদৃষ্টি · first look, forever look".

**Why it's special:**
- In the most iconic Bengali ritual moment, the guest is the cousin who makes it happen.
- The fogged-up glasses joke only works with Maddy's real round specs.

**Assets:** the shared retouch, plus 4 pupil sprites, 2 fog PNGs and 4 blush PNGs (about 15 KB).

**Build notes:**
- `useGaze()` hook with `drag="x"`, so Framer sets `pan-y` and the page still scrolls.
- Auto-plays after 6 s idle. Drag-first; tilt only on Android, which avoids the iOS motion-permission prompt.
- **Effort:** M. **Risk:** low.

**Inspired by:** play designer + culture seeds; the edge-only leaves keep it clear of the rejected paan-lowering.

### 4. Shringar Locket ("Dress them into marriage")
**Where:** across the Event cards. It is the system that feeds #2.

**Beats:**
1. A 72 px round portrait locket appears bottom-left when Events scrolls in.
2. Each event card that enters view **flings its item into the locket**, which bounces with a soft *ting*:
   - Aiburobhat: bindi and kajal
   - Haldi: yellow cheeks
   - Sangeet: a marigold gajra
   - Baraat: a sehra
3. **Turn:** on Shubh Vivah, the mukut lands *crooked on top of the sunglasses*. This is a visible problem the guest wants fixed.
4. At the SindoorDaan section the locket blooms to full size, and #2 solves the problem.

Missed items fast-stack in. Nothing is ever gated behind collecting.

**Why it's special:** the client reel re-costumes its caricatures per card. We make the outfit *accumulate*, so scrolling the schedule literally dresses them for the wedding.

**Assets:** sehra and mukut, either from the artist or adapted from the existing `Sehra`/`ShoalTopor` motif SVGs; the rest are SVG.

**Build notes:**
- A `shringar.js` store (same pattern as `music.js`), `getBoundingClientRect` fly-to, transform only.
- In lite mode the items crossfade instead of flying.
- **Effort:** M. **Risk:** low.

**Inspired by:** the client reel; trend research device #1.

### 5. The Pench That Doesn't Cut
**Where:** the Hero sky, using the existing kites.

**Beats:**
1. The existing Lucknow kite and a new Kolkata ghuri (marigold and leaf) sway. Rooftop chips read "Wo kaata!" and "Bhokatta!".
2. The guest taps either kite and both swoop together (spring 90/12).
3. **Turn:** the strings cross and jitter (±6°, 600 ms), as if one is about to be cut.
4. The strings crossfade into a braided sprite, and the pair rises together. Caption: "জুড়ে গেল! · जुड़ गए!"

**Why it's special:**
- Both cities are kite-fighting cultures and shout nearly the same word when a kite falls.
- A battle that becomes a bond in its first 3 seconds is the whole marriage in miniature.

**Assets:** 1 kite and 1 braid sprite.

**Build notes:**
- Taps only (the Hero is a 330vh sticky stage).
- Auto-plays if there is no tap by progress 0.12, and must finish before the crest fades.
- **Effort:** S–M. **Risk:** the Hero is already the heaviest scene, so in lite mode drop the jitter.

**Inspired by:** the "earned unlock" of the Goldin & Losse 8-bit invite; mirrors reel S1.

### 6. Pehle Aap RSVP + the Shaadi PNR
**Where:** RSVP.

**Beats:**
1. The guest taps the WhatsApp RSVP button. It **bows** (rotateX 35°), steps aside 40 px, and a gold chip says "Pehle aap!".
2. The second tap is the real link. It must be a real second tap, because a timer-delayed link breaks on iOS. The bow happens exactly once.
3. After the form is submitted, a railway ticket appears: "PNR 0707·MWS · LKO → HWH · {n} pax · **WL 7**".
4. The waitlist flips 7→1 (CSS `steps()`, 120 ms each) and stamps **"CNF · Coach: Baraati"** (or "Ladkiwale").

**Why it's special:**
- "Pehle aap" is Lucknow's most famous joke about its own manners, and here it happens to the guest's thumb.
- Every Indian guest has refreshed a WL ticket; seeing CNF is a real dopamine hit.

**Assets:** none. **Effort:** S. **Risk:** none. Use generic codes only, with no real train number and no IRCTC jingle.

**Inspired by:** the Vizag WhatsApp/iPhone card (a familiar interface as the invite format); the "RSVP = Rishtedar Saare Vahi Pakau" roast card.

### 7. Dak Ghar: LKO ⇄ CCU
**Where:** the Finale, above the countdown.

**Beats:**
1. The finished "Mr & Mrs" portrait slides in as a postcard (−4°): "To: you · From: LKO ⇄ CCU", with a Rumi Darwaza stamp.
2. **Press & hold:** a gold ring fills over 800 ms while the rubber stamp squashes.
3. On release the stamp slams (spring 900/18), shaking the card 3 px ×3. The postmark ink lands **across both their shoulders**, carrying the date.
4. Caption: "Lucknow moved to Kolkata once before: 1856." This refers to Wajid Ali Shah's exile to Metiabruz, and it lands as a wink for history buffs.

**Why it's special:**
- One ink mark makes two people one.
- The postmark is a real piece of postal history between the two cities.

**Assets:** a postmark PNG with live date text. **Effort:** M.

**Build notes:**
- Cancel the hold if the finger moves more than 8 px (that is a scroll). Disable the long-press callout.
- A plain tap also works. The stamp peel was cut because it collides with the skyline swipe.

**Inspired by:** Shahina & Akbar's stamps; mirrors reel S7.

### 8. Saat Phere Mauli (sound-led)
**Where:** the Shubh Vivah card opens a bottom sheet with the page scroll locked, so the gesture can't fight the scroll.

**Beats:**
1. The portrait card stands over an agni-kund inside a dotted "७ · ৭" ring. The music ducks to a tanpura drone (on iOS it pauses).
2. The guest circles a thumb around the ring. Each full loop winds one red-yellow kalava band around the card and **plays the next note of Raag Bhupali**: S R G P D S′ R′.
3. **Turn:** after loop 4 the couple's layers swap who leads (a z-flip plus a 6 px slide), echoing the custom where the bride leads the first rounds. The phrase turns downward.
4. On loop 7 a knot ties at the top. The card hangs from it and swings like a shagun gift (spring 40/4), the shankh sounds, and the music returns on that touch.

**Why it's special:**
- The guest plays the pheras as a melody and ends up composing the wedding's seven-note blessing.
- Shared Hindu ritual, with no culture "winning".

**Assets:** 7 thread-band sprites and a knot.

**Build notes:**
- Unwrapped `atan2` angle tracking. Bhupali `pluck` from `sound.js`.
- Set `config.audio.sa` to the mp3's key so the notes don't clash with the track.
- "Or tap 7 times" as a fallback.
- **Effort:** M. **Risk:** audio unlock and latency, solved with the new `sfx.js` (Web Audio buffers, unlocked in the Opener tap).

**Inspired by:** the Nayanthara invite, where the soundtrack itself is an artefact of the relationship.

### 9. Mala Badal Height War
**Where:** the Baraat card opens a bottom sheet.

**Beats:**
1. Two oval head crops from the portrait: Maddy on a ghodi base, Sanny on a piri. The guest picks "Ladkewale" or "Ladkiwale".
2. Each tap stacks a lifter under the chosen side: cousin → mama → chabutra → **Rumi Darwaza**. The other side answers with **Howrah Bridge** and **Victoria Memorial**, reusing the Finale skyline SVGs. A dhol hit plays per tap.
3. **Turn:** at 4 tiers both towers wobble.
4. They topple inward, and the garlands cross mid-air at the same instant. A crash, then the shankh.
5. Caption: "Draw. As it should be."

**Why it's special:** the funniest real moment at Bengali weddings, escalated until both cities' monuments become the cousins.

**Assets:** 2 head crops; Sanny's hair over Maddy's jaw needs a small clone fix, or accept an oval crop. **Effort:** M–L. **Risk:** low. The opponent is canned and there are no physics.

**Inspired by:** the roast-card humour; culture seed #4.

*Kept as a one-liner only: on the Reception · Bou Bhaat card, "Jamai rule #1: 'Aar ektu nao' is not a question."*

---

## Creative lead's recommendation

**Build order:**
1. **The reel (#1) now.** It is self-contained, and it produces every sprite and the portrait retouch the website needs.
2. **Sindoor & Sunglasses (#2).**
3. **Shubho Drishti (#3).**
4. **Pehle Aap / PNR (#6).** It costs little and ships the same day.

Add #4 Shringar and #5 Pench in wave 2.

**The guest journey** follows the same spine as the reel:
1. Kites join in the sky (#5).
2. The couple's first look (#3).
3. The schedule dresses them (#4).
4. The ghodi meets the taxi, and the wedding happens with sindoor and sunglasses (#2).
5. The RSVP bows "pehle aap" and confirms your berth (#6).
6. The postcard is stamped and sent (#7).

One story, told the same way on Instagram and on the site.

**The client must decide or provide:**
- **Sindoor on screen:** confirm the couple and both families are comfortable showing Sindoor Daan and the nose omen. If not, the fallback is the ring placing a maang-tikka, with the caption simply "Mr & Mrs".
- **Wording to check with families:**
  - "Reception · Bou Bhaat": Bou Bhaat is traditionally hosted by the groom's side.
  - The sign-off "আসবেন কিন্তু" is the polite form for elders; "Esho kintu" is for a friends-only cut.
  - Whether a small "॥ श्री गणेशाय नमः ॥" should head the postcard back.
- **Art commission (recommended, about one sheet from the same painter):**
  - Sanny's crown with no sunglasses and a visible parting
  - The sunglasses painted separately
  - Topor, sehra and mukut
  - Optionally the Rumi Darwaza stamp

Without the commission, we retouch digitally (about 3–4 h). It is passable at reel speed but weaker in a close-up on the web.

**Also needed:**
- **Music:** a licensed or royalty-free sitar/tabla track, ideally "their" song played on sitar, and its key, for #8.
- **Optional:** family members from both sides record "Wo kaata!" and "Bhokatta!" on a phone.
- **Dates, venues and muhurat** to fill the placeholders.

**Code prerequisites** for the website (no new dependencies):
- `PortraitStage.jsx`: a landscape frame, since the current arch crops the portrait.
- `shringar.js`: the shared store.
- `sfx.js`: unlocks Web Audio in the Opener tap.
