# Shape: Homepage

Phase 1 plan (see CLAUDE.md). Status: **approved 2026-10-23**. Next step: Higgsfield mockup frames.

- **Audience:** Filipino homeowners and interior designers buying premium furniture. Homeowners want to picture a finished room. Designers want range, materials, and a fast path to a quote.
- **Goals in priority order:** 1) browse collections · 2) book a showroom visit · 3) start a custom furniture inquiry.
- **Mood:** quiet luxury, image-led. taste-skill dials: DESIGN_VARIANCE 6 · MOTION_INTENSITY 4 · VISUAL_DENSITY 3.
- **Copy rule:** every string below is quoted from `src/content/*.json`, and the source file is named. UI chrome that has no source text uses icons only (no invented labels).

---

## Hero photo: `cere-collection/ABR_0067.jpg`

2200×1383, a Cere room shot from the front: Clo Sofa, San Coffee Table, burl Song Cabinet, Ehwa chest, Temple Roof display.

Why this photo and not the others:

| Candidate | Verdict |
|---|---|
| **`cere-collection/ABR_0067.jpg`** | ✅ Symmetric, one-point view with a clear depth axis (table → sofa → cabinet), so a dolly-in reads naturally. Plain wall in the top 35% gives the headline clean space. It shows **Cere**, which is the collection albero.ph's own homepage features, so the hero CTA matches what's in frame. No people. |
| `home/ABR_2282.jpg` (CLAUDE.md default) | Same Cere room, but shot at an angle with shallow depth of field and a blurred plant in the foreground. A dolly through out-of-focus foreground tends to warp. **Use it as the optional end frame** (see Step A). |
| `home-2nd-haus/2NDHAUS-74810-EDIT.jpg` | Great depth, but it's 2nd Haus, so the CTA would fight the homepage's Cere story. Backup choice. |
| `insilence-collection/…4041-EDIT.jpg` | Has two people. Image-to-video will animate or warp them. Rejected for the hero; used in the Visit section instead. |

Width is 2200px (≥2000), so no upscale is needed before video generation.

**Step A notes for this photo:** slow dolly-in along the centre axis and end framed on the Song Cabinet and sofa. Variation 1: single image. Variation 2 (only if the model supports start and end frames): start `ABR_0067`, end `ABR_2282`. Reject it if the sofa or table changes shape between the two.

---

## Page structure

```
┌───────────────────────────────────────────────┐
│ HEADER  (transparent over hero → solid paper) │
├───────────────────────────────────────────────┤
│ 1 HERO  pinned, ~300vh scroll                 │  goal 1 (CTA → Cere)
├───────────────────────────────────────────────┤
│ 2 CERE STORY   copy + 4-image gallery         │  goal 1
├───────────────────────────────────────────────┤
│ 3 COLLECTIONS INDEX   all 9                   │  goal 1  ← main browse surface
├───────────────────────────────────────────────┤
│ 4 VISIT   Albero HQ, address, contact         │  goal 2
├───────────────────────────────────────────────┤
│ 5 CUSTOM   customization + materials          │  goal 3
├───────────────────────────────────────────────┤
│ FOOTER                                        │
└───────────────────────────────────────────────┘
```

Visit sits above Custom to match the goal order. The header carries a persistent **Book Your Visit** button, so goal 2 can be reached from every scroll position.

### Header

- Left: **ALBERO** wordmark, set in type (`home.json` title). The real Albero logo file was not captured: `[TODO: missing from source]` logo asset. Use the typeset wordmark until it exists.
- Centre/right nav (from `site.json`): Collections · Custom · Store · At Home · About. Collections opens a dropdown listing the 9 collections in nav order.
- Far right: button **Book Your Visit** → `/message-1` (label from the About submenu in `site.json`).
- Over the hero: transparent background with espresso ink (the hero wall is light). After the hero unpins: solid paper background with a hairline bottom border.
- Mobile: wordmark plus a menu icon. "Book Your Visit" stays visible as a compact text button next to the icon.

### 1 · Hero (pinned scroll scrub)

- `<section>` about 300vh tall containing a `position: sticky; top: 0; height: 100svh` canvas (spec in CLAUDE.md, Step C).
- Frames: `public/hero/frames/desktop/` (~120 frames, 1920w) and `…/mobile/` (~60 frames, 900w). The mobile crop is the frame centre, where the cabinet and sofa sit; the room's symmetry makes the portrait crop work.

**Scroll timeline**

| Progress | Overlay | Content (source) |
|---|---|---|
| 0–30% | Headline block, **top-left**, over the plain wall, espresso ink, no scrim needed | H1 **"CREATED FOR YOUR LIFE/STYLE"** (`home.json`). Sub: "Albero creates thoughtfully crafted custom furniture inspired by the way people live." (`home-2nd-haus.json` meta description; the trailing "Discover our products and services today –" is cut) |
| 30–40% | Headline fades out (opacity plus ~12px translateY) | n/a |
| 40–60% | Nothing. Pure camera move. | n/a |
| 60–90% | CTA block fades in, **bottom-left**, over a soft espresso gradient scrim, paper-coloured ink | Cere wordmark image (`home/ALBBERO---Project-Logos-2-.png`, inverted to light). Line: "A collection of individual pieces, thoughtfully considered as part of a whole." (`cere-collection.json`). Button **DISCOVER CERE** → `/cere-collection` (`home.json`) |
| 90–100% | CTA holds, then the section unpins | n/a |

- Scroll cue at 0%: a thin animated line or chevron icon, bottom centre, with no text. Hidden after 5% progress.
- `prefers-reduced-motion`: static first frame, headline **and** CTA both visible (headline top-left, CTA bottom-left), section height 100svh, no pin.
- The H1 is real HTML text, not drawn on the canvas. The first frame is the LCP image: preload it as `<link rel="preload">` and also render it as the poster `<img>` behind the canvas until the canvas is ready.

### 2 · Cere story

This continues the hero, since it's the same room and the same collection. It is albero.ph's actual homepage content, given room to breathe.

- **Desktop layout:** asymmetric 12-column grid. Left (cols 1–5): copy. Right (cols 7–12): a 2×2 offset image cluster, with the second column shifted down about 15% for rhythm.
- Copy (`home.json`, in order):
  - "Inspired by the Queen of the Night, a flower that reveals its beauty only after dark, this collection explores the quiet significance of a single detail that can bring a whole composition together."
  - "As the flower completes the plant, the collection draws from the concept of a “missing piece.”"
  - "The CERE is a collection for those who consider each furniture piece, ritual and emotion they incorporate into their space."
  - Text link **DISCOVER CERE** → `/cere-collection` (the second time it appears; styled as a quiet underlined link, not a button)
- Images (`home.json` gallery, all 2500×3750 portrait): `Copy-of-ABR_0449.jpg`, `Ehwa-Chest-of-Drawers-2.jpg`, `ABR_0587.jpg`, `ABR_0447.jpg`. None has a caption on the source, so they get no captions here. Each needs real alt text describing what's visible (Ehwa Chest of Drawers is named by its filename; the others are described without naming pieces).
- **Mobile:** copy first, then a horizontal scroll-snap row of the 4 images (about 80vw each).

### 3 · Collections index (primary browse surface)

albero.ph has **no collections index page** (`/Collections` redirects to Cere), so this section is the only place where all 9 collections appear side by side. That makes it the most important section for goal 1.

- Section heading: **Collections** (nav label, `site.json`).
- **Desktop:** 3-column grid with a staggered baseline (middle column offset down by about 80px). Cards use 4:5 image crops. Under each image: collection name, plus the year label where the source has one.
- **Mobile (390px):** 2-column grid with smaller cards. Names only; the year goes on a second line.
- Card = whole card is the link. Hover (after polish, motion phase): a slow image scale to 1.03 and an underline on the name.
- Order follows the `site.json` nav order:

| # | Name (nav) | Meta label (page heading) | Card image (verify crop during build) | Link |
|---|---|---|---|---|
| 1 | Cere Collection | (none on source) | `home/ABR_2282.jpg` | `/cere-collection` |
| 2 | 2nd Haus | 2026 Collection | `2ndhaus-collection/2NDHAUS-75325-EDIT.jpg` | `/2ndhaus-collection` |
| 3 | En Gold | Albero x En Gold | `engold/IMG_0050_5.jpg` (studio photo; avoid the screenshots) | `/engold` |
| 4 | Insilence Collection | 2025 Collection | `insilence-collection/CALBEROPIFS25INSILENCE-4382-EDIT.jpg` | `/insilence-collection` |
| 5 | Amust Collection | 2024 Collection | `amust-collection/AMUST_24-8736.jpg` | `/amust-collection` |
| 6 | Origin Collection | 2023 Collection | `origin-collection/ORIGIN-52-6138-EDIT.jpg` | `/origin-collection` |
| 7 | Close Collection | 2021 Collection | `close-collection/image-asset.jpeg` | `/close-collection` |
| 8 | Yūgen Collection | (none on source) | `our-story/Albero---Y-gen-Collection.jpg` | `/yugencollection` |
| 9 | Hygge Collection | (none on source) | `hygge-collection/ALBERO_PIFS2020-6444.jpg` | `/hygge-collection` |

- Missing year labels: the meta line is left out for Cere, Yūgen and Hygge, not filled with a TODO. It's an optional label, not missing content. **Decision needed:** see Open questions.
- 9 cards make 3 full rows on desktop. On mobile, 9 cards in 2 columns leave one orphan, so the 9th card spans both columns as a wide crop.

### 4 · Visit (goal 2)

- **Desktop:** split layout. Left 7 columns: full-height image `message-1/CALBEROPIFS25INSILENCE-4041-EDIT.jpg` (the image albero.ph uses on its own Book Your Visit page). Right 5 columns on a paper background: the details.
- Content (`message-1.json`):
  - H2 **"BOOK your visit:"** shown as "Book your visit" (the source casing is inconsistent, so the type style sets the case and the text stays as written)
  - **ALBERO HQ:**
  - 2-1 Magalang Avenue, Barangay Pandan, Angeles City, Pampanga (links to a Google Maps search for the address)
  - contact@albero.ph (mailto) · +639173028406 (tel)
  - Hours: `[TODO: missing from source]`. The footer has an "Hours" label but no hours anywhere on the site (see Gaps in CONTENT_INVENTORY.md)
  - Primary button **Book Your Visit** → `/message-1`
- **Mobile:** image on top (4:3 crop), then details, then a full-width button.
- Designers note: the address is in Angeles City, Pampanga, not Metro Manila. Showing it plainly here prevents a wasted trip. No invented copy is needed for this.

### 5 · Custom (goal 3)

- **Desktop:** reverse split from Visit (copy left, images right) so the two sections don't mirror each other exactly. Two images in a tall/short pair: `custom-furniture/AMUST-24-8491-2.jpg` (portrait) and `custom-furniture/ALBERO_PIFS2020-7442.jpg`.
- Content:
  - H2 **"CUSTOM FURNITURE"** (`custom-furniture.json`)
  - "We see each space and furniture that we create as a personal statement that dovetails a shared vision and desired élan." (`home.json`)
  - "All Albero pieces may be customized according to your space and vision – from wood finish, fabric, to even scale." (`custom-furniture.json`, first sentence)
  - Small material note under a hairline: **MATERIALS** with "Wood is a living element that captures the fervor of a home." plus the Walnut, Ash and Beech line (`our-story.json`, first two sentences). This is for designers who check materials early.
  - Primary button **Customize Your Own** → `/message` (`custom-furniture.json`)
  - Secondary text link **Schedule a Design Consultation** → `/message` (`cere-collection.json`)
- "REQUEST FOR CATALOGS" is left off: its source href is empty, and a dead button would undermine the inquiry goal.

### Footer

- Contact (`site.json`): alberoph@gmail.com · contact@albero.ph | +63 9173028406 · Hours `[TODO: missing from source]`
- Social: facebook · instagram · youtube (links from `site.json`)
- A compact nav repeat: the 9 collections plus Custom, Store, Book Your Visit, Inquire
- "© ALBERO (All Rights reserved)" and, on its own line, **"Unofficial concept — content and photos © Albero"** (required by CLAUDE.md)

---

## Visual direction (inputs for the mockup frames)

Taken from the hero photo's palette and kept restrained:

- **Paper** #F4EFE9 (the warm wall) · **Espresso** #221A16 (black lacquer and dark wood) · **Burl** #B07A52 (the Song Cabinet; accent used sparingly for links and focus rings) · **Stone** #8C857E (secondary text, hairlines)
- **Type:** a refined, high-contrast serif for display (H1, H2, collection names). A quiet grotesk for body and UI. Source text that's in caps (DISCOVER CERE, CUSTOM FURNITURE) is styled as tracked small caps, so the source casing doesn't make the page shout. Final pairing is decided in `/typeset`.
- Generous whitespace: section padding of about 160px on desktop and 96px on mobile. Images carry the page; text blocks are short and narrow (max about 42ch).
- No cards with shadows, no rounded corners on images, no gradients except the hero CTA scrim.

## Mockup frame brief (Phase 2, max 4 desktop frames)

All four keep the same section order and real copy. They vary the layout treatment, so the frames show real alternatives:

1. **Editorial asymmetric:** the plan above (staggered 3-column index, offset Cere cluster).
2. **Index as list:** collections shown as a large typographic list (name + year). Hovering a row reveals that collection's image in a fixed panel. Fewer images, more type.
3. **Full-bleed rhythm:** each collection gets a wide 21:9 band with the name overlaid. A longer scroll and more cinematic.
4. **Grid-strict:** a rigid 4-column grid throughout, square crops, Swiss-style alignment. The calmest of the four.

Then 1 mobile frame (390px) of whichever frame you choose. Frames go in `/mockups/home/` and are never shipped.

## Accessibility and performance notes for build

- Hero overlay contrast: espresso on the wall is fine. The bottom-left CTA must keep ≥4.5:1 against the darkest *and* lightest frame, so test against frames 60 and 108 (desktop).
- All images need real alt text. The source has empty or filename alt text on most of them.
- Collection images are lazy-loaded below the fold, with width/height set to prevent layout shift. Ship them as WebP/AVIF at 1200w; the 2500w originals are too heavy.
- Keyboard: the header dropdown opens on Enter or Space and closes on Escape. Focus rings use Burl.
- Total homepage weight target, excluding hero frames: under 2.5 MB.

## Open questions

Approved as written, so the plan's defaults stand: hero `ABR_0067`, year label left out where the source has none, At Home kept nav-only. Revisit any of these during critique.

1. **Hero photo:** OK with `cere-collection/ABR_0067.jpg` instead of the CLAUDE.md default `home/ABR_2282.jpg`?
2. **Year labels:** Cere, Yūgen and Hygge have no year on the source. Is it OK to leave their meta line out (the current plan), or should every card show no year at all, for consistency?
3. **At Home** (with FP, with Leyenne): left off the homepage to keep density low. These features could work as social proof for designers. Add a small "Albero at Home" strip between Custom and the footer, or keep them nav-only?
