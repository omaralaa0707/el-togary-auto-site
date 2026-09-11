# El Togary Auto — site 25 of 46

A concept site built entirely from this dealership's own published material.
**Not affiliated with El Togary Auto, and not an official site.**

- **Live:** https://el-togary-auto-site.vercel.app
- **Repo:** [el-togary-auto-site](https://github.com/omaralaa0707/el-togary-auto-site)

## What this page is about

Every site in this series is built around something true and checkable about
the dealer's own account — a pattern in what they publish, a contradiction
between two of their channels, or a fact about their showroom — rather than
around a generic template. The palette, type, 3D piece and motion below were
all chosen to serve that finding.

## Design record

**Palette**
: Achromatic dark studio — void #0B0B0C ground and chalk text, lifted from their own showroom walls, which carry no brand colour of their own — plus two invented registers: steel #8B96A3 for the English exotics showroom, copper #C97A4A for the Arabic Skoda finance desk. The only site in the set whose two accents mark two *registers* of the same account rather than two cars or two eras

**Type pairing**
: Domine + Figtree / Jomhuria + Tajawal (AR)

**3D / signature technique**
: **The badge coin**: a 3D coin modelled on their own circular number-plate badge, one photograph-textured face per register, that flips 180° on a `useThree` viewport-derived radius when the visitor toggles Showroom/Finance desk — no third state, because their feed doesn't have one either

**Motion language**
: Settle — `data-settle`/`data-settle-rule` driven, content resolves into place with no travel axis of its own beyond a short vertical ease, mirrored for RTL

## Sources

Everything on the page was sourced from:

- Instagram: https://www.instagram.com/eltogaryauto/
- Facebook: https://www.facebook.com/ElTogaryAuto/
- Google Maps: https://www.google.com/maps/search/?api=1&query=El+Togary+Auto+Cairo

Photography belongs to the dealership (or, where their frames are watermarked
by an outside studio, to that studio) and is used here only to document their
own published material. No figure on the page is invented: anything the dealer
did not publish is marked as unpublished rather than estimated.

## Running it

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # production build — must pass before shipping
pnpm lint     # eslint, zero warnings
```

Requires `node-linker=hoisted` in `.npmrc` (already present) or three.js peer
deps fail to resolve.

## Structure

```
src/content/media.ts      verified facts and figures — the data layer
src/content/en.ts|ar.ts   all copy, both locales, identical shapes
src/content/schema-ext.ts the page-specific content contract
src/components/webgl/     the 3D piece
src/components/site/      the page composition
src/app/globals.css       palette tokens, type, RTL overrides, motion
```

Arabic/English toggle with full RTL. All CSS direction overrides key off
`[dir="rtl"]` (never `[lang]`) and live outside `@layer`. Every Latin or
numeric fragment inside Arabic copy is wrapped in `.latin` for correct bidi.

---

Part of a 46-site series. See the [top-level README](../README.md) for the full
index and [`TRACKING.md`](../TRACKING.md) for the differentiation log.
