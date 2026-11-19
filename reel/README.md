# Invite reel — "A Postcard from Lucknow to Kolkata" (draft v1)

1080×1920, 30 fps, 41.5 s. Script: REEL-SCRIPT.md. Website concept deck: CONCEPTS.md.

## Render
`reel.html` is a deterministic animation: `window.renderAt(t)` draws the frame at time `t` (open `reel.html?t=26.5` to preview one frame).

```
mkdir -p frames
node render2.mjs "file://$PWD/reel.html" 41.5 30 frames      # needs puppeteer-core + Chrome
# then mix audio (music ducked 20–27 s + synthesised SFX) and encode:
ffmpeg -framerate 30 -i frames/f%05d.jpg -i mix.wav -c:v libx264 -crf 19 -pix_fmt yuv420p -c:a aac -b:a 192k -shortest -movflags +faststart reel.mp4
```

Music: "Sitar and tabla rendition – Freedom Jam 2015", Ashok Ayengar, CC BY-SA 4.0 (credit shown on the end card). Instagram may mute it — swap for a licensed track before posting.
Assets: `assets/couple.png` (portrait), `sunglasses.png` (cut from it), `noglasses_patch.png` (sunglasses inpainted out + painted curls).
