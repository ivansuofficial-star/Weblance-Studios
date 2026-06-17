# CLAUDE.md — Frontend Website Rules

## Always Do First
- **Invoke the `frontend-design` skill** before writing any frontend code, every session, no exceptions.

## Two Build Modes (read this first)
There are two different jobs in this project. Know which one you're doing:

1. **Weblance's own website** (the files in this repo: `index.html`, `about`, `pricing`, `contact`, `faq`).
   → **Stay consistent.** Reuse the existing brand system: same fonts (Space Grotesk + Playfair Display), same color tokens/CSS variables, same components already in the site. Do not introduce a new look.

2. **Client mockups** (a redesign preview for a potential client — e.g. for outreach).
   → **Make it fresh and unique every single time.** Each client gets its own aesthetic direction that fits *their* business. NEVER reuse the same fonts/colors/layout across different client mockups. See "Font & Style Discipline" below. This is what stops everything looking generic ("naked Claude").

## Font & Style Discipline (kills the generic AI look)
- **Never default to Space Grotesk for client mockups.** It is the #1 "made-by-AI" tell. Reserve it for Weblance's own site only.
- For each client mockup, deliberately pick a *different*, characterful font pairing (one distinctive display font + one clean body font). Match the font to the business: e.g. a refined serif for a law firm, a warm rounded sans for a kids' brand, an industrial mono-accent for a contractor.
- Avoid generic fonts entirely: Inter, Roboto, Arial, Open Sans, system fonts.
- Commit to ONE bold aesthetic direction per mockup (luxury, editorial, brutalist, organic, retro, etc.) and execute it precisely — don't blend three styles into mush.

## Reference Images
- If a reference image is provided: match layout, spacing, typography, and color exactly. Swap in placeholder content (images via `https://placehold.co/`, generic copy). Do not improve or add to the design.
- If no reference image: design from scratch with high craft (see guardrails below).
- Screenshot your output, compare against reference, fix mismatches, re-screenshot. Do at least 2 comparison rounds. Stop only when no visible differences remain or user says so.

## Local Server
- **Always serve on localhost** — never screenshot a `file:///` URL.
- Start the dev server: `node serve.mjs` (serves the project root at `http://localhost:3000`)
- `serve.mjs` lives in the project root. Start it in the background before taking any screenshots.
- If the server is already running, do not start a second instance.

## Screenshot Workflow
- Puppeteer is already installed locally (in this project's `node_modules`) and Chrome is configured inside `screenshot.mjs`. Use the script as-is — no setup needed.
- **Always screenshot from localhost:** `node screenshot.mjs http://localhost:3000`
- Screenshots are saved automatically to `./temporary screenshots/screenshot-N.png` (auto-incremented, never overwritten).
- Optional label suffix: `node screenshot.mjs http://localhost:3000 label` → saves as `screenshot-N-label.png`
- After screenshotting, read the PNG from `temporary screenshots/` with the Read tool — Claude can see and analyze the image directly.
- When comparing, be specific: "heading is 32px but reference shows ~24px", "card gap is 16px but should be 24px"
- Check: spacing/padding, font size/weight/line-height, colors (exact hex), alignment, border-radius, shadows, image sizing

## Output Defaults
- **Hand-coded custom CSS** is the default — this is how the real site is built (CSS variables, custom `@keyframes`, layered gradients). It produces distinctive results. Do NOT reach for Tailwind utility classes by default.
- Tailwind via CDN (`<script src="https://cdn.tailwindcss.com"></script>`) is allowed only for quick throwaway prototypes, never for the real site or polished client mockups.
- Multi-page sites: each page is its own `index.html` in a folder (e.g. `pricing/index.html`), matching the existing structure.
- Load distinctive fonts from Google Fonts. Placeholder images: `https://placehold.co/WIDTHxHEIGHT`. Mobile-first responsive.

## Brand Assets
- Always check the `brand_assets/` folder before designing. It may contain logos, color guides, style guides, or images.
- If assets exist there, use them. Do not use placeholders where real assets are available.
- If a logo is present, use it. If a color palette is defined, use those exact values — do not invent brand colors.

## Anti-Generic Guardrails (framework-agnostic)
- **Colors:** Commit to a custom palette built from one dominant brand color + sharp accents. Never the predictable purple-gradient-on-white look.
- **Shadows:** Never flat, single-layer shadows. Use layered, color-tinted shadows with low opacity for real depth.
- **Typography:** Never use the same font for headings and body. Pair a distinctive display/serif with a clean sans. Tight tracking (`-0.03em`) on large headings, generous line-height (`1.7`) on body.
- **Gradients:** Layer multiple radial gradients. Add grain/texture via an SVG noise filter for depth.
- **Animations:** Only animate `transform` and `opacity`. Never `transition-all`. Use spring-style easing (`cubic-bezier`).
- **Interactive states:** Every clickable element needs hover, focus-visible, and active states. No exceptions.
- **Images:** Add a gradient overlay (`from-black/60` style) and a color-treatment layer with `mix-blend-multiply`.
- **Spacing:** Use intentional, consistent spacing tokens — not random values.
- **Depth:** Surfaces should have a layering system (base → elevated → floating), not all sit at the same z-plane.

## Hard Rules
- Do not add sections, features, or content not in the reference
- Do not "improve" a reference design — match it
- Do not stop after one screenshot pass
- Do not use `transition-all`
- Do not reuse Space Grotesk (or any single default font) across client mockups — pick a fresh font per client
