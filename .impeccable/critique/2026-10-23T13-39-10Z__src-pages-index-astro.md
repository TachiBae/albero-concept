---
target: homepage (src/pages/index.astro)
total_score: 22
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 2
target_identity: "file:/Users/jorelmarquez/albero-concept/src/pages/index.astro"
target_fingerprint: "sha256:8543f87a2191b39dcff5d532dfe46a00e9d3c455428d2234f5849807d85339fd"
target_path: /Users/jorelmarquez/albero-concept/src/pages/index.astro
timestamp: 2026-10-23T13-39-10Z
slug: src-pages-index-astro
---
Method: dual-agent (A: design review · B: detector + browser)

## Design Health Score
| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 3 | No current-section state; card hover only underlines a 12px label |
| 2 | Match System / Real World | 2 | "Homes" column of "with FP / with Leyenne" reads unclear; hero headline never says furniture |
| 3 | User Control and Freedom | 3 | Escape closes menu; no skip link; 300vh static hero = 2 screens of dead scroll |
| 4 | Consistency and Standards | 3 | DISCOVER CERE is ghost button in hero, underline link in story; phone formatted two ways (both source) |
| 5 | Error Prevention | 3 | Address + Maps link prevent wasted trip; hours missing at source |
| 6 | Recognition Rather Than Recall | 3 | All 9 collections visible; no Collections dropdown in header (SHAPE asked) |
| 7 | Flexibility and Efficiency | n/a | Persuade landing page |
| 8 | Aesthetic and Minimalist Design | 3 | Restrained, but scrims fog the hero photo; Cere repeated 3x |
| 9 | Error Recovery | 2 | Outbound routes 404 (expected at this stage); Photo TODO fallback is graceful |
| 10 | Help and Documentation | n/a | Marketing page |
| Total | | 22/32 (69%) | Acceptable |

## Design Specificity Verdict
Coherent and faithful to frame-1, but ~70% category-interchangeable (paper/espresso, uppercase serif H2s, 11px tracked caps everywhere, offset 2x2 cluster, 50/50 split, 4-col footer). Albero-specific: Cere script wordmark, burl accent, Queen of the Night story, Pampanga address. Missed: collection chronology 2021-2026, Walnut/Ash/Beech material signature, Filipino maker, designer-facing range/materials.
Detector: CLI 0 findings; browser overlay 1 finding (cream-palette on #f4efe9) = false positive (deliberate brand paper).

## Priority Issues
1. [P1] Header overflows 768-~840px (doc 835px at 768/800). Fix: desktop nav at lg, menu icon + Book button below 1024. /impeccable adapt
2. [P1] Hero buries the photo and inverts goal priority: full-width paper + espresso scrims leave a strip of room visible; dark header Book button outranks ghost DISCOVER CERE. Fix: confine scrims behind text (left ~45%), solid light DISCOVER CERE, quieter header button over hero. /impeccable layout, /impeccable quieter
3. [P2] Cere dominates before the browse surface: DISCOVER CERE x3, same Cere room in hero and card, ~300vh + full story before the other 8. Fix: different Cere card image, shorter story or Collections first, hero link to all collections. /impeccable distill, /impeccable layout
4. [P2] Flat type hierarchy: collection names are 11-12px caps, same as nav/labels; all H2 same size; "INSILENCE COLLECTION / 2025 Collection" doubles the word. Fix: names in display serif ~22-26px, year as caps label. /impeccable typeset

## Persona Red Flags
Jordan: headline doesn't say furniture; Shop vs Collections vs Custom unexplained; no price/buy signal.
Riley: header overflow 768-840; long names wrap in 2-col mobile caps; outbound 404s.
Casey: two dark CTAs fuse at bottom of mobile fold; 2 screens of static hero; collections around screen 6.
Marisa (Manila interior designer): materials buried in a 14px note; no piece-type overview; quote path at the bottom; no hours, Pampanga trip unreassured.

## Minor Observations
Custom image pair ends ~180px above the text column; borrowed images don't say "custom". TODO badge loud in premium panels (keep visible, lighter). link-arrow underlines text and arrow separately. Visit 50/50 vs SHAPE 7/5. Collections use 5:4 landscape vs SHAPE 4:5. Header solid vs SHAPE transparent (matches frame-1). Mobile Cere 2x2 vs SHAPE scroll-snap row.

## Questions to Consider
Should the index be a 2021-2026 timeline instead of a generic stagger? Does the hero need a paper scrim if the headline moves to the real wall space? Would a Materials strip serve designers better than a second Cere story?
