# Albero Concept — Project Rules

Unofficial redesign concept of https://www.albero.ph (Philippine designer furniture brand).
Practice project: learning Claude Code + Higgsfield + design skills. Not affiliated with Albero.

## Stack

- Astro + Tailwind
- Content: `src/content/*.json` · Images: `public/images/{page}/` · Mockup frames: `/mockups/{page}/`
- Hero scroll frames: `public/hero/frames/` (generated from Higgsfield video)
- Mockup phase: static pages only (no real cart, forms, or backend)

## Content rules (non-negotiable)

- ALL text, product info, and images on the site come from albero.ph. Never invent copy, products, prices, or dimensions.
- No stock photos and no AI-generated furniture on the site.
- Higgsfield is allowed for exactly three things:
  1. **Mockup frames**: design references only, saved in `/mockups`, NEVER shipped.
  2. **Hero scroll video**: generated FROM an Albero photo (image-to-video). Camera motion only; no new furniture, people, or objects.
  3. **Enhancing Albero photos**: upscale, outpaint, background removal.
- If content is missing, render a visible `[TODO: missing from source]` placeholder instead of inventing it.
- Footer on every page: "Unofficial concept — content and photos © Albero"
- `CONTENT_INVENTORY.md` is the source of truth for what content exists.

## Skills: when and where to use each

Only ONE skill generates layout per page (taste-skill / image-to-code-skill). The others plan, review, or add.

| Phase          | Tool / Skill                                 | When to use it                                                                        | Scope                                        |
| -------------- | -------------------------------------------- | ------------------------------------------------------------------------------------- | -------------------------------------------- |
| 1. Plan        | **impeccable** `/impeccable shape`           | Before any NEW page or template: written layout plan                                  | One page/template                            |
| 2. Mockup      | **Higgsfield** (image gen)                   | After shape is approved: max 4 desktop frames, then 1 mobile frame of the chosen one  | Home, Collection, Product templates only     |
| 3. Build       | **image-to-code-skill** (taste-skill family) | Build the chosen mockup frame using ONLY real content                                 | The page being built                         |
| 3. Build       | **taste-skill**                              | Pages without mockup frames (Shop, Custom, Visit, About): match the established style | The page being built                         |
| 4. Review      | **impeccable** `/critique`                   | Right after a page is built: hierarchy, clarity, design quality                       | The page just built                          |
| 4. Review      | **impeccable** `/audit`                      | After critique fixes: accessibility, responsiveness, performance                      | The page just built                          |
| 5. Refine      | **impeccable** `/typeset`                    | Type feels off or inconsistent                                                        | Typography only                              |
| 5. Refine      | **impeccable** `/polish`                     | Final pass once structure is settled                                                  | The finished page                            |
| 6. Hero scroll | **Higgsfield** (image-to-video)              | After the homepage is polished: see "Hero scroll animation" below                     | Homepage hero only                           |
| 7. Motion      | **emil-design-eng** / **animate**            | Nav, hover states, scroll reveals, and the hero scroll's text/overlay timing          | After polish, never before                   |
| 7. Motion      | **review-animations**                        | Check any motion just added, including the hero scroll                                | Files with animation code                    |
| 8. Assets      | **Higgsfield** (enhance)                     | Upscale low-res photos, outpaint to 16:9, product cutouts                             | Only images that look weak in the built page |
| 9. Final       | **impeccable** `/audit`                      | Last check before a page is done                                                      | Every page                                   |

### Don'ts

- Don't ship anything from `/mockups`. Generated text, logos, and furniture in frames are fake.
- Don't run taste-skill on a page that impeccable reviewed. Apply the review findings directly.
- Don't add motion before `/polish`. Animations hide layout problems.
- Check Higgsfield credit balance before generating. Video costs the most.

## Hero scroll animation (Apple-style scroll-scrubbed sequence)

**Effect:** the hero is pinned while the user scrolls; scrolling moves the camera slowly through an Albero room. Headline and CTA fade in and out at set points in the scroll.

**Step A: Generate the video (Higgsfield)**

- Source: Albero's own hero photo (`public/images/home/ABR_2282.jpg` or the best room shot in CONTENT_INVENTORY.md). Upscale it first if it's under 2000px wide.
- Image-to-video, 16:9, 5–8 seconds, slow continuous dolly-in (or gentle lateral slide). No cuts, no zoom jumps.
- Prompt intent: "slow cinematic dolly-in through the room, steady camera, soft natural daylight, nothing in the scene changes."
- If the model supports start + end frames, use two Albero photos of the same space for the start and end.
- Generate 2 variations at most. Reject any that warp furniture or add objects.
- Save the final file to `public/hero/source.mp4`.

**Step B: Convert to frames (ffmpeg)**

- Desktop: extract ~120 frames as WebP, 1920px wide, quality ~75, into `public/hero/frames/desktop/`.
- Mobile: ~60 frames, 900px wide, into `public/hero/frames/mobile/`.
- Target total weight: under ~8 MB desktop and ~3 MB mobile.

**Step C: Build the scroll scrub**

- Section height ~300vh with a `position: sticky` full-viewport `<canvas>` inside.
- Map scroll progress (0 → 1) through the section to a frame index; draw that frame on the canvas, drawn like object-fit: cover.
- Update inside `requestAnimationFrame`, and lerp toward the target frame so it feels smooth rather than steppy.
- Preload the first frame immediately (it's the poster); lazy-load the rest; pick desktop or mobile frames by viewport width.
- Text overlays: headline visible 0–30%, fades out by 40%; collection CTA fades in 60–90%. Use opacity + small translateY only.
- `prefers-reduced-motion`: no scrubbing. Show the static first frame with the headline and CTA visible.
- No scroll-jacking: native scroll speed, no smooth-scroll library overriding the wheel.

**Step D: Review**

- Run `review-animations` on the hero, then `/audit` (check LCP, since the first frame is the LCP image).

## taste-skill dials (starting values)

DESIGN_VARIANCE 6 · MOTION_INTENSITY 4 · VISUAL_DENSITY 3 (quiet luxury, image-led)

## Build order

Home → Collection template → Product template → Shop → Custom → Visit → About.
Templates come early: fixing a template fixes all 9 collections.

## Per-page loop

shape → Higgsfield mockup frames (templates only) → build → screenshot 1440px + 390px → critique → audit → typeset → polish → [homepage only: hero scroll A–D] → motion → review-animations → Higgsfield enhance (if needed) → final audit → commit

## Git

Commit after every phase with a clear message. Repo stays private because it holds Albero's photos.
Add `public/hero/source.mp4` to .gitignore if it's over 50 MB; commit the extracted frames instead.
