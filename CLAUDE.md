# AIR design system: notes for Claude Code

Storybook of AIR's components (an ATS), built in code from the AIR Figma file. Live at https://air.markofucek.com.

## Ground rules
- Figma is the source of truth. Change Figma first, then code. Never invent a value, state or prop that Figma doesn't have; if Figma is wrong (contrast, a width jump), fix it in Figma too and say so.
- Components use role tokens only (`var(--air-…)` from `src/tokens/tokens.css`). No hex, rgb or hsl in component CSS.
- Stories use fictional people and companies.
- Copy in docs and stories: short, plain sentences, sentence case.
- This repo is public. Keep private notes, client names and account details out of it.

## Figma
- File: `HzEM2XFp2oSu2dDHtfjYqL` (AIR – applicant tracking system).
- Pages: 🧩 Components 2026 `9043:730`, 🎨 Foundations 2026 `9038:730`, 🔄 Refresh 2026 `9010:6542` (screens), 🔮 Exploration `1:2`.
- Variables carry WEB code syntax (`var(--air-…)`). Collections: AIR · Primitives, AIR · Color (Light, Dark), AIR · Size, AIR · Icon tint (modes Default, Muted, Action, Inverse, AI, Danger, Success, Warning, Chrome, Disabled).
- Icon colours in code follow the Icon tint mode set on each variant (for example Menu item: Muted at rest, Default on hover, Action for the check).
- Where Figma sets the AIR · Color mode to Dark on a layer inside a light component, code puts `data-theme="dark"` on that element (Toast inverse, the active Nav item icon, the Trial card's days bar and button, the Sidebar footer).
- Focus: most controls have a "Focus ring" boolean (a hidden 2 px border/focus layer); fields use State=Focus. In code it's `:focus-visible` with `box-shadow: var(--air-effect-focus-ring)`.
- `scripts/figma-component-spec.js`: paste into a `use_figma` call (set `SETS` to component set or section ids) to get each set's props, the base variant's layout, tokens, size variables and text styles, and what changes per variant. `BASE` reads another variant as the base (by set id).

## Figma to code page
- `figma-to-code/`: a small Vite page, not a story. `npm run build` builds it into `storybook-static/figma-to-code/`, so it deploys with Storybook to air.markofucek.com/figma-to-code/. markofucek.com shows it in an iframe under Live components (design: the portfolio Figma file, "Component card · AIR · Figma to code", at 1440 and 390).
- Tabs Button, Badge, Tag, Avatar. Left: the variant exported from Figma (`drawn/*.svg`) and the variables bound to it (`figma-spec.ts`, the spec script's output with the `SETS` and `BASE` noted there). Right: the real component and, per variable, the CSS line from its stylesheet (`rows.ts` reads the `.css` files as text and throws if a line doesn't use the variable Figma binds).
- Stage sizes: 680 tall side by side from 900 px wide; stacked under 900, four rows a side, 713 tall. The page's chrome uses the portfolio's flat palette; the components use AIR's tokens.
- `npm run figma-to-code` serves it on port 6008 while editing.

## Tokens
- `tokens/figma-export.js` runs in Figma through `use_figma` and returns the text of `src/tokens/tokens.css`. Re-run it after variables change; don't hand-edit values (one exception on record: danger/text → red-700 on 17 Nov was edited by hand to match Figma).

## Code
- React 19, TypeScript, Vite, Storybook 10 (docs, a11y, pseudo-states add-ons), Inter (Fontsource), Lucide icons.
- One folder per component in `src/components/<Name>/`: `<Name>.tsx`, `<Name>.css`, `<Name>.stories.tsx`. Export from `src/index.ts`.
- Props mirror the Figma properties (Type → `variant`, Size → `size`, Tone → `tone`). Icons 20 px at M, 16 px at S unless Figma says otherwise.
- Stories: title `Components/<Group>/<Name>`; groups in order Actions, Forms, Navigation, Feedback, Data display, Layout, AIR (`.storybook/preview.ts`). Each interactive component has an "All states" story built with `src/stories/StateGrid.tsx`; hover, pressed and focus come from storybook-addon-pseudo-states via the classes `.is-hover`, `.is-pressed`, `.is-focus` (see `src/stories/states.ts`).
- Commands: `npm run storybook`, `npm run build` (to `storybook-static`), `npm run typecheck`, `npm run lint`.

## Before merging
1. `npm run typecheck` and `npm run lint` clean.
2. `npm run build`.
3. Accessibility: `scripts/a11y-check.mjs` runs axe on every story of the build (setup in the file). The only accepted hit is helper text under disabled fields (WCAG 1.4.3 exempts inactive components; field stories exclude disabled fields from Storybook's own check).
4. Look at screenshots of every new or changed story, at desktop and phone widths.
5. If `figma-to-code/` or a component it shows changed: axe and a look at every tab at 1198 × 680 and 356 × 713.

## Deploy
- Cloudflare Pages builds main to production (air.markofucek.com) and every other branch to `https://<branch>.air-8b2.pages.dev`.
- Workflow agreed with Marko: one branch per batch, run the checks, then merge to main and push.

## Still to build (from the Components page)
- Inputs: Date picker (Calendar, range, Calendar day), File upload (File item, dropzone), Money input, Phone input, Quick fill (Attachment chip), Rich text editor, Audio recorder.
- Document viewer (toolbar, page, viewer, Highlighted text).
- Video pre-screening: Video thumbnail, Video player, Reaction icon, Reaction chip, Recorder control, Score input, Question item.

## Open in Figma
- Parked in Figma, so not built: Top bar Type=Chrome (the dark full-width bar) and Page header Type=Profile.
- Pre-screening review versions 2A–2E (Refresh 2026, section `9615:61808`) repeat hand-built frames: Team rating, Score bars / Score per answer, the AI summary cell, Questionnaire summary. Make them components once Marko confirms 2A.
- Section 6 has two "Jobs > Job details" screens and one "Jobs > Candidates" screen without the "Before ·" prefix; they use the 2023 library and a deleted Tag component.
- Section 4's job page has no tabs.
