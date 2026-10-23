# Shape: Homepage redesign — The Release Wall

Phase 1 plan (CLAUDE.md), branch `redesign-layout`. Status: **approved 2026-10-24**. Next: Higgsfield mockup frames (max 4 desktop, then 1 mobile).
Previous plan and its frames: `SHAPE-v1.md`, `v1-frame-1..4.png`, `v1-mobile.png` (now an anti-reference: generic cream + serif, repetitive text-left/photos-right sections, a hero that doesn't land).
Product truth: `PRODUCT.md`.

## 1. Job and audience

- **Who:** Filipino homeowners furnishing a home, and interior designers sourcing for clients. They arrive curious about Albero, usually from social media or a referral, on a phone or a studio desktop.
- **Mode:** Persuade. They should come away believing *these are designed objects, made by a Filipino workshop in real wood*, not furniture listings. Then they act: open a collection, book a visit, or start a custom piece.

## 2. Outcome and proof

- **Primary action:** open a collection. **Secondary:** Book Your Visit (always visible). **Tertiary:** Customize Your Own.
- **Proof only Albero has** (all real, from `src/content`):
  - nine named collections, five with years (Close 2021, Origin 2023, Amust 2024, Insilence 2025, 2nd Haus 2026), each with its own story text
  - the real piece names in each collection (e.g. 20 in 2nd Haus, 14 in Insilence)
  - the maker's place, ALBERO HQ, Angeles City, Pampanga, and its materials: walnut, ash, beech
- **Success:** a first-time visitor can name a collection and its year after one scroll, and finds Book Your Visit without searching.

## 3. Selected direction: The Release Wall

**Thesis:** every Albero collection is presented like a record release: a square cover, a title, a year in a fixed slot, liner notes (the collection's story), and its pieces listed like a track list. The page is Albero's discography. It refuses the category default of a full-bleed lifestyle photo, then a centred headline, then a uniform card grid.

**Raises** (from the declined worlds; build these in):
- **Fixed year slot:** the year sits in the same position on every cover and never moves. A collection with no year on the source shows the slot empty, drawn but unlit, never filled with an invented date.
- **One lit state:** the selected or hovered release is at full colour; the rest of the wall rests muted.
- **Colour only on the covers:** type, rules, navigation and other chrome stay achromatic. Each cover's colour comes from its own photograph.
- **One strict cover grid:** a single square-module grid governs every section, header to footer.
- **Found objects only:** everything on the page is a real Albero photo, name or sentence. No decorative filler.

**Sequence (top to bottom)**
1. **Header:** the Albero wordmark, nav exactly as now (Collections · Shop · Custom · Homes · About), and Book Your Visit.
2. **First viewport, "the featured release":** Cere.
   - A large **square cover** holds the 2K scroll film of the Cere room (`public/hero/frames`, cropped square), scrubbed as you scroll while the section is pinned.
   - Beside it, the cover's label block:
     - the Cere script wordmark
     - the year slot (unlit, since Cere has no year on the source)
     - the headline "CREATED FOR YOUR LIFE/STYLE"
     - the liner line "A collection of individual pieces, thoughtfully considered as part of a whole."
     - DISCOVER CERE and Book Your Visit, both visible in the first viewport
   - Signature moment: the film plays *inside the cover*, not as a page background.
3. **The Release Wall:** all nine collections as square covers in one grid.
   - Order: newest year first (2026 → 2021), then the undated ones (Cere, Yūgen, Hygge, En Gold).
   - Each cover: the collection's own photo, its name, the year slot, and the piece count derived from its gallery.
   - Hover or focus lights a cover and mutes the rest; each cover links to its collection page.
4. **Liner notes for the newest release (2nd Haus, 2026):** the collection's story text from `2ndhaus-collection.json` beside its real piece list, with a small photo per piece. This is the one dense passage on the page.
5. **Credits:**
   - "Made by Albero, Angeles City, Pampanga"
   - materials from `our-story.json` (walnut, ash, beech)
   - customisation from `custom-furniture.json` ("All Albero pieces may be customized…"), leading to Customize Your Own and Schedule a Design Consultation
6. **Visit:** ALBERO HQ address (Maps link), email, phone, Hours `[TODO: missing from source]`, and Book Your Visit.
7. **Footer:** the full discography listed as text (name · year), the nav links, social links, © year, and "Unofficial concept — content and photos © Albero".

## 4. Scope and boundaries

- **Scope:** the homepage only (`src/pages/index.astro` and its components). Collection and product templates come later and inherit this world.
- **Keep:**
  - the nav labels exactly
  - the CLAUDE.md content rules
  - the footer line
  - the 2K hero film (restaged inside the cover)
- **Anti-goals:**
  - no music words in the copy: no "album", "track", "vinyl", "LP", "side A"
  - no invented catalogue numbers, years, prices or claims
  - no turntables or record discs as decoration; the cover grammar alone carries the world
  - no cream-and-serif rendition
  - no repeated text-left/photos-right blocks

## 5. States and ranges

- **Collections:** 9, of which 5 dated and 4 undated (unlit year slot). Names run from "En Gold" to "Insilence Collection". Piece counts run from 0 (Hygge has no titled pieces: show none, not "0 pieces") to 36 (Close).
- **Cover states:** rest (muted), lit (hover or focus), current (the featured release).
- **Missing content:** Hours, shown as a visible TODO.
- **Reduced motion:** no scrub. The cover shows its first frame, and every block is visible.

## 6. Interaction and layout

- **Hierarchy:** the featured cover is the largest object on the page, the wall is the browse surface, the liner notes are the dense passage, and credits and visit are quiet.
- **Desktop:** the square module stays at one size per section, with no mixed card sizes inside a section.
- **Mobile:**
  - the featured cover goes full width with the label block below it
  - the wall becomes two columns of covers
  - the liner-notes piece list stacks
  - the Book Your Visit bar stays at the bottom
- **Keyboard:** every cover is focusable and lights on focus, and the scroll film never traps focus.

## 7. Constraints and open decisions

- Stack: Astro + Tailwind. Images go through `Photo.astro` (WebP `srcset`), and the hero frames are reused.
- **Fonts:** open. The current Cormorant Garamond is a known training default and should be replaced; choose display and text faces that suit cover typography during the build.
- **Cover photos:** the builder chooses one real photo per collection and must check the square crop.
- **Piece count wording:** "20 pieces", derived from each collection's gallery, is allowed (user-approved 2026-10-24); collections with no named pieces show nothing.
- **Mockup frames brief (next phase):** four desktop frames that vary how far the cover world carries the page, all using real names, years and copy:
  - (1) the plan above
  - (2) the wall as a single horizontal shelf you scroll through
  - (3) the featured cover larger than the viewport, with the label block overlapping it
  - (4) the wall as a strict year-by-year column

  Then one mobile frame of the chosen one.
