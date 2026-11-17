# AIR · ATS design system

AIR is an applicant tracking system for recruiting teams: the AI drafts and cites, people decide. This repo is AIR's design system in code: the same tokens and components as the Figma library, built in React and TypeScript and documented in Storybook.

Design and build by [Marko Fuček](https://markofucek.com). Figma first, built with Claude Code.

## What's inside

- **Foundations:** colour (primitives and roles), typography, spacing, radius, elevation and focus.
- **Components:**
  - Actions: Button, Icon button, Link
  - Forms: Input (with Input action), Textarea, Select, Checkbox, Radio, Switch, Segmented control, Filter chip, Filter option, Tag input
  - Navigation: Tabs, Menu (with Menu item and Divider), Sidebar (with Nav item, Icon duotone, Logo and Trial card), Top bar (with Breadcrumbs and Command search)
  - Feedback: Tooltip, Toast, Banner, Progress, Skeleton, Dialog, Empty state
  - Data display: Badge, Counter, Tag, Avatar, Avatar stack, Rating
  - Layout: Section header, Section toggle, Page header
  - AIR: Stage path, Match grade (with the must-haves popover), Citation chip, Criteria evidence row, Flag row, AI block, Decision bar, Candidate card

  Still to come: date picker, file upload, money and phone inputs, quick fill, the video pre-screening set, document viewer, rich text editor, audio recorder.
- **Templates:** Candidates page (Sidebar, Top bar, Page header and Candidate cards).
- **Figma to code** ([air.markofucek.com/figma-to-code/](https://air.markofucek.com/figma-to-code/)): nine steps from atoms to organisms (Button, removable Tag, Switch; Avatar stack, Segmented control, Select; Menu, Top bar, Candidate card), each as drawn in Figma beside the React component, with a line of code for every variable and every part it's built from.
- **Checks:** every story runs an accessibility check (axe) in the Storybook panel.

## Tokens: Figma → CSS

Figma variables carry their CSS names (for example `--air-action-primary`). Nothing is retyped:

1. `tokens/figma-export.js` runs inside the AIR Figma file (Plugin API).
2. It writes `src/tokens/tokens.css`: Light values in `:root`, Dark values in `[data-theme="dark"]`, aliases kept as `var()` links, text styles as `font` shorthands, effects as `box-shadow` values.
3. Components and the Foundations pages read only those variables.

When variables change in Figma, run the export again and commit the new `tokens.css`. Don't edit it by hand.

## Scripts

```bash
npm install
npm run storybook   # local Storybook at http://localhost:6006
npm run build       # static site in storybook-static/
npm run typecheck
npm run figma-to-code   # the Figma to code page at http://localhost:6008/figma-to-code/
```

## Structure

```
tokens/figma-export.js     Figma → CSS export script
src/tokens/tokens.css      generated tokens
src/styles/global.css      Inter, tokens, base styles
src/foundations/           Foundations docs pages
src/components/<Name>/     component, styles and stories
src/templates/<Name>/      page templates built from organisms
figma-to-code/             the Figma to code page (air.markofucek.com/figma-to-code/)
.storybook/                Storybook config and AIR theme
```

## Deploy (Cloudflare Pages)

- Framework preset: None
- Build command: `npm run build`
- Build output directory: `storybook-static`
- Production branch: `main`; other branches get preview links.

## Rights

No licence: the code is public to read, not to reuse. Company names and logos in the stories are fictional.
