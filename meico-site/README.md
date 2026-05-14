# meico-site

The new MEICO marketing site. React + Vite + Tailwind v4 + framer-motion. Static deploy.

## What's here

- `src/data/siteData.js` — single source of truth for every word on the site (lifted from the old `meicoweb-main` site + scraped from meicolabs.com).
- `src/pages/` — the 13 routes (Home + 8 inner pages + Ecosystem index + 7 pillar routes via one `PillarPage` template).
- `src/components/` — shared building blocks (`Layout`, `Nav`, `Footer`, `HexFrame`, `PillarCard`, `AfricaWireframe`, `SectionReveal`, `PageTransition`).
- `public/docs/` — all 6 PDFs (Whitepaper, Tokenomics, Annexure, Referrals, Terms, Privacy).
- `public/illustrations/` — design references kept for use in hero/About/Pillar pages.

## Routes

| Path | Page |
|---|---|
| `/` | Home — hero + ecosystem + pillars + tokenomics teaser + roadmap teaser + docs vault + closing CTA |
| `/about` | About + ecosystem diagram + pillars index |
| `/why` | Why MEICO — 4 reasons |
| `/ecosystem` | Pillars index |
| `/ecosystem/:slug` | Pillar detail (Research, B2B, Exchange, Pay, Tokenization, Shipping, Energy) |
| `/tokenomics` | Numbers + allocation donut + use-of-funds donut + PDF |
| `/roadmap` | 6 phases, detailed |
| `/documents` | All 6 PDFs |
| `/referrals` | 3-step + code-generator mockup + PDF |
| `/faq` | 10 Q&As as accordion |
| `/contact` | Channels + form (mailto fallback) |

## Local dev

```bash
npm install
npm run dev      # http://localhost:5175
npm run build    # static export to dist/
```

## Design DNA

- **Palette** — deep midnight navy base (#060D20–#0F1F42), electric blue brand (#3B82F6), cyan glow (#22D3EE), brass-gold for editorial pop (#C7A352–#E9C063).
- **Per-pillar accents** — Research blue, B2B sky, Exchange cyan, Pay violet, Token blue, Shipping amber, Energy green. Applied via `pillar.accentHex`.
- **Brand motif** — the hexagonal MEICO mark, reproduced as `<HexFrame>` and used for icons, phase nodes, ecosystem visuals.
- **Typography** — Space Grotesk (display + UI), Inter (body), JetBrains Mono (labels, numbers, mono-caps).
- **Texture** — `.surface-grid` (dot grid + radial wash) + `.glass` translucent cards + `clip-corner` octagon corners + `.hairline` thin connectors.

All content edits flow through `src/data/siteData.js`. Touch the data once; the whole site updates.
