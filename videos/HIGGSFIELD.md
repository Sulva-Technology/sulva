# Higgsfield hook shots

Use Higgsfield for the first 2–3 seconds of a post (the hook) or for transitions, then cut to the real screen recording from `out/`. Never use it to fake the product itself: the screen recordings are what prove the work is real.

Stills live in `out/stills/` (regenerate with `node stills.mjs`). Use `-landscape.png` for YouTube/LinkedIn and `-vertical.png` for TikTok/Reels/Shorts.

## Rules that keep it from looking fake

- **Text warps.** AI video models smear and morph small text. Screenshots with lots of text get *slow, simple* camera moves only (push-in, slight tilt). Save big motion for photo-heavy stills.
- **Always add** to the prompt: `website UI stays perfectly still and sharp, no morphing, no new objects, no text changes`.
- **3–5 seconds** is enough. Longer clips drift.
- **Skip AI avatars and presenters.** That's the look people associate with scam ads. Use your real face or voice.
- Generate 2–3 takes and pick the cleanest. Watch the edges of text closely.

## Prompts

### Itzlolabeauty (makeup artist, Arizona)

| Still | Motion | Prompt |
|---|---|---|
| `itzlolabeauty-hero` | Push-in | Slow cinematic dolly-in toward the model's face, soft window light, gentle shallow depth of field, warm luxury beauty mood. Website UI stays perfectly still and sharp, no morphing, no text changes. |
| `itzlolabeauty-about` | Subtle parallax | Very slow push-in with subtle parallax between the text column and the photo of the artist in white, warm natural light, calm and elegant. UI stays perfectly still and sharp, no morphing, no text changes. |
| `itzlolabeauty-services` | Gentle tilt | Slow downward tilt across the service cards, clean minimal beauty-brand feel, soft light sweep. UI stays perfectly still and sharp, no morphing, no text changes. |

### Olorunleke Ojuolape (founder / strategic leader)

| Still | Motion | Prompt |
|---|---|---|
| `olorunleke-hero` | Push-in | Slow dolly-in toward the founder's portrait, confident executive mood, soft golden light, subtle depth of field. Website UI and name stay perfectly still and sharp, no morphing, no text changes. |
| `olorunleke-ventures` | Push-in + light | Slow push-in on the city skyline card, golden-hour light gently shifting across the glass buildings, premium real-estate mood. UI text stays perfectly still and sharp, no morphing. |
| `olorunleke-portfolio` | Slow orbit feel | Gentle push-in toward the curved architectural photo, soft light glide along the curves, elegant and minimal. Headline text stays perfectly still and sharp, no morphing. |

### Mindfire Homes (Abuja real estate)

| Still | Motion | Prompt |
|---|---|---|
| `mindfirehomes-hero` | Slow push-in | Very slow cinematic push-in on the website homepage, clean modern real-estate brand, soft daylight. Headline stays perfectly still and sharp, no morphing, no text changes. |
| `mindfirehomes-featured` | Push-in on photo | Slow push-in toward the property photo inside the card, subtle sunlight moving across the building facade. Text and price stay perfectly still and sharp, no morphing. |
| `mindfirehomes-listing` | Tilt down | Slow downward tilt from the title and price to the property photos, bright daylight, trustworthy premium feel. All text and prices stay perfectly still and sharp, no morphing. |

### The Inner Circle (faith-centred community)

> Fix first: the live site shows a "test:" announcement bar at the top. Ask the client to remove it, then run `node stills.mjs innercircle` and `npm run record:innercircle` again.

| Still | Motion | Prompt |
|---|---|---|
| `innercircle-hero` | Push-in on image | Slow push-in toward the image of the single blue hat standing out among black hats, the blue hat subtly catching light, bold and inspiring. Headline stays perfectly still and sharp, no morphing. |
| `innercircle-leadership` | Gentle push-in | Slow push-in across the leadership cards, warm and welcoming community feel. Faces, names and text stay perfectly still and sharp, no morphing, no face changes. |
| `innercircle-join` | Light sweep | Gentle push-in with a soft light sweep across the blue call-to-action panel, hopeful and uplifting. Text and buttons stay perfectly still and sharp, no morphing. |

## Sulva Tech brand intro and outro (text-to-video, no still)

- **Intro (3s):** Abstract deep purple and near-black gradient, soft glowing light rays slowly converging to the centre, premium tech-studio feel, clean empty space in the middle for a logo, no text.
- **Outro (4s):** Same deep purple gradient, light rays slowly spreading outward, calm and confident, empty centre for a logo and the line "sulvatech.com", no text.

Add the logo and text yourself in your editor. AI-generated lettering comes out wrong.

## Suggested post structure

1. **0–3s:** Higgsfield hook shot, plus on-screen text such as "We built this for a makeup artist in Arizona".
2. **3–27s:** Screen recording teaser from `out/`.
3. **27–30s:** Sulva Tech outro showing the live URL of the project.
