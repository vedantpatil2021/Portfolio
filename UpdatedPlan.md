# Site Update Plan — Implementation Spec (July 8, 2026)

This is an execution-ready spec. Every task lists: the file, the exact current code to anchor on (grep for the anchor string — do **not** trust line numbers, they drift), the exact change, and how to verify. Read "Environment & verification protocol" first.

**Source of findings:** full Playwright review of light + dark at 1440×900, mobile at 390px, realistic wheel-scroll pass. No console errors in either theme. TypeScript clean.

---

## 0. Environment & verification protocol (read first)

- App lives in `site/` (Vite + React + TypeScript + Tailwind v4). Dev server: `npm run dev` inside `site/` (a server may already be running on port **5183**; check `curl -s -o /dev/null -w "%{http_code}" http://localhost:5183/` before starting another).
- Typecheck: `npx tsc -b --noEmit` inside `site/`. Lint: `npm run lint` (oxlint).
- **Playwright is installed in `site/` (v1.61).** Node ESM scripts importing `playwright` MUST be placed inside `site/` (e.g. `site/.tmp-check.mjs`) and run from there — running from any other directory fails module resolution (`NODE_PATH` does not work for ESM). Delete `.tmp-*.mjs` files when done.
- **Screenshot trap:** most content is wrapped in `Reveal` (framer-motion `whileInView`) — a `fullPage: true` screenshot without scrolling shows huge blank gaps (unrevealed sections at opacity 0). This is NOT a bug. To capture real state, step-scroll first:
  ```js
  const total = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < total; y += 400) {
    await page.evaluate((v) => window.scrollTo(0, v), y);
    await page.waitForTimeout(150);
  }
  ```
- Theme is toggled via `colorScheme: 'dark'` in `browser.newPage({...})` — the site follows `prefers-color-scheme` and stamps class on root via `src/lib/theme.tsx`.
- Site palette (used everywhere, defined in `src/components/ui/ShaderScene.tsx` and `src/index.css`):
  - `LIGHT_COLORS = ["#FAFAF9", "#FFEDD5", "#FDBA74", "#C2410C"]`
  - `DARK_COLORS = ["#0C0A09", "#292524", "#7C2D12", "#FB923C"]`

### Do NOT change (explicit user decisions from prior sessions)
- The **small rotated thumbnail** next to the "About" heading must stay `<ShaderPanel variant="portrait" />` (animated MeshGradient). The user explicitly reverted an attempt to put the photo there.
- The **big About photo box** must stay static: no hover animation, no rotation, no scale. It was deliberately stripped of `rotate-3 hover:rotate-0`.
- The **"icon-pattern"** visual on the "Autonomous Multi-Agent Dev Team" card (`StackGlow` in `Projects.tsx`: dot-grid fade + Sparkle/Code/Plugs icons) is done and approved — don't touch.
- The dithering treatment itself (ImageDithering) is the approved look for the photo — do not replace it with a plain `<img>`.

---

## 1. MUST-FIX

### 1.1 About portrait — light mode washed out
**File:** `site/src/components/ui/ShaderScene.tsx`
**Problem:** dark mode is perfect; in light mode the subject's face/shirt map to `colorBack #FAFAF9` (page background color) so the person nearly vanishes — only the orange dither field behind them reads.

**Current code (anchor: `variant === "photo"`):**
```tsx
if (variant === "photo") {
  return (
    <ImageDithering
      className="h-full w-full"
      image={vedantImg}
      fit="cover"
      colorBack={colors[0]}
      colorFront={colors[3]}
      colorHighlight={colors[2]}
      colorSteps={3}
      type="4x4"
      size={3}
      speed={0}
    />
  );
}
```
Note `colors` is theme-switched above: light = `LIGHT_COLORS`, dark = `DARK_COLORS`.

**Change:** keep dark exactly as-is; give light its own values so the subject has dark form on a tinted field. Replace the three color props with theme-conditional values:
```tsx
colorBack={theme === "dark" ? colors[0] : "#FFEDD5"}
colorFront={theme === "dark" ? colors[3] : "#292524"}
colorHighlight={theme === "dark" ? colors[2] : "#C2410C"}
```
(`theme` is already in scope from `useTheme()` at the top of the component.)

**Verify:** screenshot `#about` in BOTH themes (script per §0). Acceptance: in light mode the face/torso are clearly distinguishable from the backdrop at a glance; dark mode pixel-identical in structure to before. If `#292524` reads muddy, try `#7C2D12` for colorFront before inventing anything else. The `ImageDithering` component also supports `inverted?: boolean` and `originalColors?: boolean` props (from `@paper-design/shaders` typings) — `inverted` is a fallback lever if palette swaps aren't enough.

### 1.2 Project cards look clickable but aren't
**Files:** `site/src/lib/content.ts`, `site/src/components/Projects.tsx`
**Problem:** every card has hover lift/shadow (`cardBase` contains `hover:-translate-y-1 hover:border-ink/15 hover:shadow-[...]`), but no card is a link. Only `href` in the whole file is the "More on GitHub" footer link.

**Change (content.ts):** in the `projects.items` array, each item currently has `title, tagline, description, metric, stack, visual, span`. Add `href: null as string | null` to every item. **The user must supply real URLs** — until then leave `null` and add one line comment `// TODO(user): add repo/case-study URLs` above the array.

**Change (Projects.tsx):** in `ProjectCard`:
- When `project.href` is truthy: render the card's inner content wrapped so the whole card is clickable — put an absolutely-positioned stretched link over the card: after the card's opening `Reveal`, add
  ```tsx
  {project.href && (
    <a
      href={project.href}
      target="_blank"
      rel="noreferrer"
      aria-label={`${project.title} — open project`}
      className="absolute inset-0 z-10"
    />
  )}
  ```
  (`cardBase` already has `relative`, so `inset-0` anchors correctly. There are TWO return branches in `ProjectCard` — the early `shader-b` branch and the main one; apply to both.)
- When `project.href` is null: suppress the clickable affordance. `cardBase` is a single shared string; the cleanest minimal edit is `const cardClass = project.href ? cardBase : cardBase.replace("hover:-translate-y-1", "").replace("hover:border-ink/15", "");` — compute once at the top of `ProjectCard` and use in both branches. Keep the shadow transition (harmless).
- If there's an `ArrowUpRightIcon` rendered inside cards, show it only when `project.href` exists.

**Verify:** `npx tsc -b --noEmit`; then in the browser hover a linked vs unlinked card — only linked ones lift; click a linked card → opens the URL in a new tab.

### 1.3 Missing OG image + URL meta tags
**File:** `site/index.html` (+ new asset `site/public/og.png`)
**Current state:** `<head>` already has `og:title`, `og:description`, `og:type`, description meta, `theme-color` (two, for light/dark), favicon. It does **NOT** have `og:image`, `og:url`, or any `twitter:*` tags. Grep `property="og:` to find the existing block and extend it in place.

**Change:** add inside the same block:
```html
<meta property="og:image" content="/og.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content="/og.png" />
```
Plus a placeholder to fill at deploy time:
```html
<!-- TODO(user): set absolute og:url + absolute og:image once domain is live; relative og:image does not work on most scrapers -->
<meta property="og:url" content="" />
```
**Asset:** `public/og.png` (1200×630) — generation prompt is §1 of `image-prompt.md`. If the file doesn't exist yet, still add the tags (they're harmless) and note it in the final report.

**Verify:** `curl -s http://localhost:5183/ | grep -c "og:image"` ≥ 1; if og.png exists, `curl -s -o /dev/null -w "%{http_code}" http://localhost:5183/og.png` → 200.

### 1.4 No resume link
**Files:** `site/src/components/Contact.tsx`, `site/src/lib/content.ts`, asset `site/public/vedant-patil-resume.pdf`
**Current state:** Contact has a primary "Get in touch" button, a "Copy email" pill, and two icon buttons (anchor: `aria-label="GitHub"` and `aria-label="LinkedIn"` using a shared `iconButtonClass`).

**Change:** add a "Resume" pill styled identically to the "Copy email" pill (copy its exact className), placed between "Copy email" and the GitHub icon:
```tsx
<a href="/vedant-patil-resume.pdf" target="_blank" rel="noreferrer" className={/* same class as Copy email pill */}>
  Resume
</a>
```
Optionally add `resume: "/vedant-patil-resume.pdf"` to the `global` export in `content.ts` (next to `github`/`linkedin`) and reference it.
**Gate:** if `site/public/vedant-patil-resume.pdf` does not exist, DO NOT add a dead link — implement behind the file's existence: add the code, but comment it out with `{/* TODO(user): drop resume PDF at public/vedant-patil-resume.pdf and uncomment */}`. Report this in the summary.

### 1.5 Degree naming inconsistency
**File:** `site/src/lib/content.ts` — three places disagree:
| Anchor string | Current | Fix to |
|---|---|---|
| `M.S. Computer Science, The Ohio State University.` (in `hero.support`) | "M.S. Computer Science" | "M.S. Computer Science and Engineering, The Ohio State University." |
| `M.S. CSE, Ohio State, 2026` (in `about.facts`) | keep — compact row, "CSE" is fine here | no change |
| `M.S. Computer Science and Engineering` (in `education`) | already correct | no change |

So: **one string edit** in `hero.support`. Sanity-grep afterward: `grep -n "M.S." src/lib/content.ts` — the only variants left should be "…and Engineering" and the compact "M.S. CSE".

### 1.6 About portrait invisible to screen readers
**File:** `site/src/components/About.tsx`
**Current code (anchor: `variant="photo"`):**
```tsx
<div className="w-full shrink-0 overflow-hidden rounded-[0.625rem] border border-hairline aspect-[4/5] sm:w-64 md:aspect-auto md:w-72">
  <ShaderPanel variant="photo" />
</div>
```
**Change:** add `role="img"` and `aria-label="Dithered portrait of Vedant Patil"` to that div. (ImageDithering renders a `<canvas>`; without this the photo has no accessible name.)

---

## 2. POLISH

### 2.1 Metric prefix/suffix legibility
**File:** `site/src/components/Metrics.tsx`
**Current (two occurrences — prefix and suffix spans):** `className="text-[0.6em] text-ink-3"`
**Change both to:** `className="text-[0.75em] text-ink-2"`
**Why:** at 0.6em/ink-3 the `%`, `x`, `~` glyphs are nearly invisible; "99.9%" reads as "99.9".
**Verify:** screenshot the "Numbers from production" band; suffixes readable at 100% zoom.

### 2.2 Portrait source image is 792 KB
**File:** `site/assets/vedant-img.png` (893×1024 PNG, 792 KB, imported by `ShaderScene.tsx` → ships in bundle).
**Change (macOS, `sips` is preinstalled):**
```bash
cd site/assets
cp vedant-img.png vedant-img-original.png   # keep original out of src imports
sips -Z 640 vedant-img.png                  # resize in place, longest side 640px
```
Then check the result is < 300 KB (`du -h vedant-img.png`); the dither destroys fine detail so nothing visible is lost. Add `vedant-img-original.png` to `site/.gitignore` if git tracking starts. **Do not** change the import path in `ShaderScene.tsx`.
**Verify:** photo still renders in both themes (§1.1's screenshot covers this).

### 2.3 Lint nit
**File:** `site/src/components/About.tsx` — oxlint warns `aspect-[4/5]` → canonical `aspect-4/5`. Fix all occurrences in that file (currently 2: the thumbnail div and the photo div). Run `npm run lint` after; zero new warnings.

### 2.4 Scroll-spy accuracy (LOW priority — investigate only, don't rewrite)
Observed once: nav underline showed "Contact" while viewing the Quote section after fast programmatic jumps; also "About" active while at Metrics (Metrics has no nav entry, so nearest-section behavior is expected). Only act if reproducible with human scrolling; otherwise skip. Logic lives in `src/components/Nav.tsx`.

### 2.5 Optional: card art for the three flat cards
Kira (RetailOps) = `visual: "pattern"`, Agentic RAG Pipeline = `visual: "plain"`, Human-in-the-Loop = `visual: "tint"`. If/when the user generates images from `image-prompt.md` §2–4 (light+dark pairs saved as `site/public/art/<name>-{light,dark}.png`):
- Add `visual: "image"` to the `ProjectVisual` union in `content.ts` plus an `art?: string` base name per item.
- In `Projects.tsx`, render `<img src={`/art/${project.art}-${theme}.png`} alt="" loading="lazy" className="aspect-[16/9] w-full rounded-[0.625rem] border border-hairline object-cover" />` — get `theme` from `useTheme()` (import from `../lib/theme`).
- Match the WorldForge card's image placement (image block above title).
Skip entirely if assets aren't present.

---

## 3. Verified good — do not "fix" these

- All 6 project cards render (WorldForge, DroneMCP, Multi-Agent Dev Team, Kira, Agentic RAG, Human-in-the-Loop) — blank areas in naive full-page screenshots are the reveal-animation artifact (§0).
- Metrics count-up reaches real values (99.9%, 96%, ~90%, 68x, 45, 2) on natural scroll — zeros in fast-scroll captures are artifacts.
- Thought band ("Instrument first. Debug second.") is a scroll-linked word-fill — partially grey text mid-scroll is by design.
- Quote (Darwin) + Metrics sit between Hero and About; they exist even though section-anchor screenshots skip them (no `id` attributes).
- Contact copy "I finished my M.S. at Ohio State in May 2026" — correct for current date.
- Dark-mode everything; mobile layout; skip-link; theme toggle; `tsc` clean.

---

## 4. Execution order & reporting

1. §1.1 portrait palette (15 min, biggest visible win)
2. §1.5 degree string + §1.6 aria + §2.1 suffixes + §2.3 lint — one batch
3. §1.3 OG tags (asset may lag behind)
4. §1.2 card links (blocked on user URLs — wire with `null`s now)
5. §1.4 resume button (blocked on PDF — wire commented-out)
6. §2.2 image resize
7. §2.5 only if art assets exist

After each numbered task: `npx tsc -b --noEmit` && `npm run lint`. After all: one Playwright pass per §0 (both themes, step-scrolled full page + `#about` + projects grid), then delete all `.tmp-*.mjs`. Final report must list: tasks done, tasks blocked-on-user (URLs, PDF, og.png, art), and any acceptance criterion that failed.
