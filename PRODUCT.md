# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- Filipino homeowners furnishing a home who want to picture finished rooms and find pieces with meaning (from mockups/home/SHAPE.md).
- Interior designers sourcing for clients who want range, materials, and a fast path to a quote or custom piece (from mockups/home/SHAPE.md).

## Product Purpose

An unofficial redesign concept of albero.ph, the website of Albero, a Philippine designer-furniture maker. It is a practice project, not affiliated with Albero, and stays static: no cart, forms, or backend. Success is a site that presents Albero's work as designed objects and authored collections rather than furniture listings, and moves visitors to browse a collection, book a showroom visit, or start a custom piece.

## Positioning

- Albero releases named collections, each a themed body of work with its own story: Close (2021), Origin (2023), Amust (2024), Insilence (2025), 2nd Haus (2026), plus Cere, Yūgen, Hygge, and Albero x En Gold. A catalog of categories cannot claim this.
- Albero is a Filipino maker working in real wood: walnut, ash, and beech are its primary materials, with a workshop and showroom (ALBERO HQ) in Angeles City, Pampanga.

## Operating Context

- Visitors book a showroom visit at ALBERO HQ, 2-1 Magalang Avenue, Barangay Pandan, Angeles City, Pampanga, and send inquiries for custom work; collection pieces are quote-on-request.
- All pieces can be customized in wood finish, fabric, and scale (custom-furniture.json).

## Capabilities and Constraints

- Stack: Astro + Tailwind (existing codebase).
- Content rules (CLAUDE.md, non-negotiable): every word, product, and image comes from albero.ph via src/content/*.json and public/images/; never invent copy, products, prices, or dimensions; no stock photos and no AI-generated furniture; missing content renders a visible `[TODO: missing from source]`.
- Higgsfield may be used only for mockup frames (never shipped), the hero image-to-video, and enhancing Albero photos.
- Open: showroom opening hours appear nowhere on the source.

## Brand Commitments

- Primary nav labels stay exactly: Collections · Shop · Custom · Homes · About, plus a Book Your Visit action (user-confirmed; "Shop", "Homes" and "© <year>" are the user's choices, not albero.ph text).
- Footer on every page: "Unofficial concept — content and photos © Albero".
- Real assets: the Albero wordmark (public/images/site/albero-wordmark.png) and the Cere script wordmark (public/images/home/ALBBERO---Project-Logos-2-.png).

## Evidence on Hand

- Collection, store, custom, story, and visit copy in src/content/*.json; inventory in CONTENT_INVENTORY.md.
- About 243 Albero photos in public/images/{page}/, including collection room shots and per-piece product shots.
- A 2K, 8-second scroll-scrub camera move through the Cere room (public/hero/source.mp4, frames in public/hero/frames/), available but not mandatory.
- Absent and never to be fabricated: opening hours, prices for collection pieces, piece dimensions and materials beyond what store pages list, testimonials, press.

## Product Principles

1. The collection is the unit: each is presented as an authored work with its year and story, not as a product category.
2. Material truth: real wood and real making, shown through Albero's own photographs and words.
3. Filipino maker, stated plainly: Pampanga is part of the identity, not a footnote.
4. Honest gaps: missing content stays visibly missing.
