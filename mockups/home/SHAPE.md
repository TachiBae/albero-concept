# Shape: Homepage redesign — The Fair Booth

Phase 1 plan (CLAUDE.md), branch `redesign-layout`. Status: **approved 2026-10-24**, with the curved carousel hero integrated (user request, same day).
Earlier plans, now anti-references: `SHAPE-v1.md` + `v1-*.png` (cream + serif, repeated text-left/photos-right), `SHAPE-v2.md` + `v2-frame-*.png` (The Release Wall; concept, look and layout all rejected).
Product truth: `PRODUCT.md`. Direction chosen on the impeccable decision page (pick card; seed:5374d19cdbf4c5a1).

## 1. Job and audience

Same as PRODUCT.md: homeowners and interior designers arriving from social or a referral. Persuade: these are authored collections made in Pampanga. Then open a collection or book a visit.

## 2. Outcome and proof

- **Actions:** open a collection; Book Your Visit (always visible); Customize Your Own.
- **Proof (all real):** nine named collections (five dated), their real piece names, ALBERO HQ in Angeles City, Pampanga, and walnut, ash and beech.
- **Success:** after one scroll a visitor can find any collection on the plan and reach Book Your Visit without searching.

## 3. Selected direction: The Fair Booth

Albero's homepage laid out like a furniture-fair hall: each collection is a booth, a hall plan of nine booths is the navigation, and scrolling walks the aisle.

- **World:** charcoal carpet-grid ground, white booth fascia boards, one signage blue for wayfinding, a clean signage sans. Colour comes from the room photos inside each booth.
- **Sequence:**
  1. **Header as hall signage:** wordmark, nav exactly as now, Book Your Visit as the "information desk".
  2. **First viewport: the curved carousel** (built, `src/components/Hero.astro`): "CREATED FOR YOUR LIFE/STYLE" and its supporting line centred, Book Your Visit under them, then a full-width ribbon of 12 Albero room photos on the inside of a cylinder (CSS 3D), auto-scrolling, draggable. Replaces the scroll film and the planned new film; no Higgsfield.
  3. **Hall plan:** directly under the hero, nine booths in a strict grid (name + year slot), sticky with a "you are here" marker that follows the booth in view; clicking a booth walks you there.
  4. **The aisle:** one booth per collection, newest first, undated last. Fascia (name, year slot left blank when undated), room photo, a few real piece names. Booth layouts vary by what's on show.
  5. **Show guide:** a dense directory of every collection and its real pieces (the one dense passage).
  6. **Information desk:** "Made by Albero, Angeles City, Pampanga", the materials text, the customisation text leading to Customize Your Own.
  7. **Venue:** ALBERO HQ address (Maps link), email, phone, Hours `[TODO: missing from source]`, Book Your Visit.
  8. **Footer:** nav, social, "Unofficial concept — content and photos © Albero".

## 4. Boundaries and anti-goals

- No fair name, dates, hall numbers or "PIFS": the world is the layout, not a claim that a fair happened.
- No lanyard, badge or trade-show-kitsch props.
- No cream and serif rendition, no repeated text-left/photo-right blocks, nothing carried over from the Release Wall.

## 5. States

- 9 collections: 5 dated, 4 undated (blank year slot). Hygge has no named pieces, so its list is left out.
- Hours: visible TODO.
- Reduced motion: the carousel holds still (still draggable); the "you are here" marker jumps instead of gliding.

## 6. Layout

- Mobile: the hall plan becomes a strip of nine cells, booths stack (photo first, fascia over it), the Book Your Visit bar stays at the bottom.
- Keyboard: every booth on the plan is reachable; the carousel ribbon is not in the tab order.

## 7. Open decisions

- Booth numbers 01–09 are positions only, not catalogue numbers: show them or not.
- Fonts are chosen at build; Cormorant and the usual training defaults are out.
- The carousel has no pause button (user choice, 2026-10-24); WCAG 2.2.2 risk accepted.
