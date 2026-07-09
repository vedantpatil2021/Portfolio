# PLAN.md — Vedant Patil, Single-Page Portfolio

> **Who executes this:** an AI coding model (Sonnet). Follow this document exactly. Every decision has already been made. Do not redesign, do not substitute libraries, do not invent copy. Where this plan gives exact text, use it verbatim. Where it gives exact values, use them verbatim.
>
> **Source material:** `resume.md` (all content), `Prompt.md` (the brief), and the design skills in `.agents/skills/` (already distilled into the rules below, you do not need to re-read them).

---

## 0. Design Read (the one-line brief)

Reading this as: **a personal brand site for a production-infrastructure and agentic-AI engineer, aimed at recruiters and hiring managers. Bright, editorial, instrument-panel precision. It should feel like a well-made hardware manual crossed with a modern product site, not like a template.**

Dials (locked):

| Dial | Value | Meaning |
|---|---|---|
| DESIGN_VARIANCE | 7 / 10 | Asymmetric layouts, confident type scale, one signature moment. Not a safe SaaS template, not artsy chaos. |
| MOTION_DIAL | 5 / 10 | Scroll-triggered entrances, hover physics, count-up numbers, one scroll-scrub moment. Nothing pinned, nothing 3D. |
| DENSITY | 4 / 10 | Generous negative space. Editorial, not dashboard-cramped (except the one intentional metrics panel). |

Audience funnel (AIDA): Hero grabs attention, Metrics + About build interest, Projects + Thought build desire, Contact converts. Every section exists to move a recruiter one step closer to sending an email.

---

## 1. Non-Negotiables (hard bans, check before every commit)

These come from the user's brief and the design skills. Violating any one of these is a failed build.

**Banned outright, anywhere on the site:**

1. **Em-dashes and en-dashes** in any user-visible copy. Use commas, colons, or periods. (Date ranges like `2024-2026` use a plain hyphen.)
2. **Terminal windows, fake code editors, typing/typewriter effects, blinking cursors, fake CLI output.** The user banned these explicitly.
3. **Alternating left/right feature rows** (zigzag: image-left/text-right, then image-right/text-left). Banned explicitly. Asymmetry is fine; alternation is not.
4. **Inter, Roboto, Open Sans, Lato, Poppins, Space Grotesk** as fonts. We use Geist (see §3.2).
5. **Purple/violet/indigo** anywhere. **Blue-to-purple gradients** especially. Also no neon green, no beige+bronze "AI startup" look.
6. **Emoji** anywhere in the UI, headings, or copy.
7. **Lucide icons.** Use `@phosphor-icons/react` only.
8. **Scroll-down indicators** (bouncing chevrons, "scroll to explore", mouse icons).
9. **Section-number eyebrows** (`01 — ABOUT` style) and numbered card grids (`01 / 02 / 03`).
10. **Decorative dot accents** on labels or timeline items.
11. **Fake or rounded-for-marketing numbers.** Every number on this site is real and comes from `resume.md` (96%, 68x, 99.9%, 198s, $0.11, 45, 35, 65%, 9x, 2). Never invent a stat.
12. **Lorem ipsum, "John Doe", placeholder copy of any kind** (see §12, full-output enforcement).
13. **Testimonials, logo walls, client marquees.** We have no permission to imply endorsement; skip entirely.
14. **Fake dashboards / fake browser-chrome screenshots built out of divs** as project art. Project visuals are shaders or generated images (§8).
15. **Cards nested inside cards.** One container level; inside it, use spacing and hairlines.
16. **`h-screen`** (use `min-h-[100dvh]` only where needed, and only on the hero).
17. **Pure black `#000000` / pure white `#FFFFFF` as page background pairs.** Use the token palette (§3.1). (White is allowed as a card surface in light mode.)
18. **Native `window.addEventListener('scroll')`** handlers. Use Motion's `useScroll`/`whileInView` and IntersectionObserver.
19. **Layout-affecting hover** (padding/margin/size changes on hover). Hover uses transform and color only.
20. **Buzzword copy:** "seamless", "elevate", "unleash", "empower", "supercharge", "next-generation", "blazingly fast", "delightful". Concrete verbs only.
21. **Atmospheric metadata theater:** no coordinates strips, no local-time widgets, no fake version numbers in the footer. ("Columbus, Ohio" appears only as a genuine fact in About and Footer.)
22. **GSAP, Three.js, Lottie, tsparticles.** Motion (`motion/react`) covers 100% of the animation needs here. Do not mix animation libraries.

**Locks (consistency rules):**

- **One accent color** (burnt orange, §3.1). Semantic states (focus ring uses accent) are the only other non-neutral. Nothing else colored.
- **Shape lock:** buttons and chips are pills (`rounded-full`); cards and panels are `rounded-[1.25rem]`; media/insets inside cards are `rounded-[0.875rem]` (concentric: inner radius = outer radius minus padding). No mixing.
- **Theme lock:** the page stays in one theme family per mode. No inverted "dark band" sections in light mode. Section rhythm comes from `canvas` vs `surface-tint` background shifts within the same family.
- **Eyebrow budget:** exactly **3** uppercase mono eyebrows on the whole page: Hero, Projects, Contact. Every other section heading is a plain `h2`.
- **CTA intent lock:** the contact intent uses the label **"Get in touch"** everywhere it appears (nav button, hero secondary link, contact mailto button). The portfolio intent uses **"View projects"** exactly once (hero primary button).
- **Max 1 middle-dot `·` per line** in metadata rows.

---

## 2. Stack, Scaffold, and Project Layout

### 2.1 Stack (exact)

- **Vite 7** + **React 19** + **TypeScript** (template `react-ts`)
- **Tailwind CSS v4** via `@tailwindcss/vite` (CSS-first config, no `tailwind.config.js`)
- **motion** (`motion/react`, the successor to framer-motion; provides `whileInView`, `useScroll`, `useTransform`, `AnimatePresence`, `useReducedMotion`)
- **@paper-design/shaders-react** (hero and project-card visuals)
- **@phosphor-icons/react** (icons, weight="regular" or "duotone", never mixed weights in one context)
- **@fontsource-variable/geist** and **@fontsource-variable/geist-mono** (self-hosted fonts; never a Google Fonts `<link>`)

### 2.2 Scaffold commands

Node 20.19+ or 22.12+ is required by Vite 7; check `node -v` first. The app lives in a `site/` subdirectory of this repo (repo root is not empty, so do not scaffold into `.`):

```bash
cd "<repo root>"
npm create vite@latest site -- --template react-ts
cd site
npm install
npm install tailwindcss @tailwindcss/vite motion @paper-design/shaders-react @phosphor-icons/react @fontsource-variable/geist @fontsource-variable/geist-mono
```

If `@fontsource-variable/geist` does not resolve, fall back to `@fontsource/geist-sans` + `@fontsource/geist-mono` and adjust the CSS imports accordingly. Verify the actual exported component names and props of `@paper-design/shaders-react` after install by reading `node_modules/@paper-design/shaders-react/dist/*.d.ts` before writing `ShaderPanel.tsx`. Do not guess prop names.

`vite.config.ts`:

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

### 2.3 File tree (build exactly this)

```
site/
  index.html
  vite.config.ts
  public/
    favicon.svg            (monogram, §8.4)
    portrait.jpg           (only if the user supplies one; otherwise omit)
    images/                (generated project images if available, §8)
  src/
    main.tsx
    App.tsx
    index.css              (all tokens live here, §3)
    lib/
      content.ts           (every word of copy + all data, §5)
      theme.tsx            (ThemeProvider + useTheme hook, §4)
    components/
      ui/
        Reveal.tsx         (scroll-entrance wrapper, §7.2)
        CountUp.tsx        (animated numerals, §7.3)
        ShaderPanel.tsx    (palette-locked shader wrapper, §8.1)
        Button.tsx         (primary / secondary pill buttons, §6.1)
        Eyebrow.tsx        (uppercase mono label, used exactly 3 times)
        SectionHeading.tsx (h2 + optional intro line)
      Nav.tsx
      Hero.tsx
      Metrics.tsx
      About.tsx
      Experience.tsx
      Projects.tsx
      Thought.tsx
      Skills.tsx
      Education.tsx
      Contact.tsx
      Footer.tsx
```

`App.tsx` renders, in order: `Nav`, `main` (Hero, Metrics, About, Experience, Projects, Thought, Skills, Education, Contact), `Footer`. Every section component is a `<section id="...">` with `scroll-mt-24` so the sticky nav does not cover anchored headings.

---

## 3. Design Tokens (exact values)

### 3.1 Color

Warm stone neutrals + one burnt-orange accent. Bright light mode is the canonical design; dark mode is a full first-class adaptation, not an afterthought.

Define as CSS custom properties on `:root` (light) and `.dark` (dark), then map into Tailwind via `@theme inline` so utilities like `bg-canvas`, `text-ink`, `border-hairline` exist.

| Token | Light | Dark | Used for |
|---|---|---|---|
| `--canvas` | `#FAFAF9` | `#0C0A09` | page background |
| `--surface` | `#FFFFFF` | `#1C1917` | cards, nav pill, panels |
| `--surface-tint` | `#F5F5F4` | `#292524` | alternate section bands, chip fills |
| `--ink` | `#1C1917` | `#F5F5F4` | headings, primary text |
| `--ink-2` | `#57534E` | `#A8A29E` | body/secondary text |
| `--ink-3` | `#79716B` | `#79716B` | captions, metadata |
| `--hairline` | `#E7E5E4` | `#2E2A27` | 1px borders, dividers |
| `--accent` | `#C2410C` | `#FB923C` | links, highlights, primary button bg (light) / accent text (dark) |
| `--accent-strong` | `#9A3412` | `#FDBA74` | hover state of accent |
| `--accent-tint` | `#FFF7ED` | `rgba(251,146,60,0.09)` | tinted chip/card backgrounds |
| `--accent-on` | `#FFFFFF` | `#1C1917` | text on accent-filled buttons |

Rules: body text is never pure ink at full contrast everywhere; headings use `ink`, paragraphs use `ink-2`. Accent appears on roughly 5 to 8 elements total per viewport, no more. Contrast must pass AA: `#C2410C` on `#FAFAF9` and `#FB923C` on `#0C0A09` both pass for text at 16px+; never place accent text on `surface-tint` without checking.

`index.css` skeleton (complete this file, do not abbreviate):

```css
@import "tailwindcss";
@import "@fontsource-variable/geist";
@import "@fontsource-variable/geist-mono";

@custom-variant dark (&:where(.dark, .dark *));

:root {
  --canvas: #FAFAF9;
  --surface: #FFFFFF;
  --surface-tint: #F5F5F4;
  --ink: #1C1917;
  --ink-2: #57534E;
  --ink-3: #79716B;
  --hairline: #E7E5E4;
  --accent: #C2410C;
  --accent-strong: #9A3412;
  --accent-tint: #FFF7ED;
  --accent-on: #FFFFFF;
}

.dark {
  --canvas: #0C0A09;
  --surface: #1C1917;
  --surface-tint: #292524;
  --ink: #F5F5F4;
  --ink-2: #A8A29E;
  --ink-3: #79716B;
  --hairline: #2E2A27;
  --accent: #FB923C;
  --accent-strong: #FDBA74;
  --accent-tint: rgba(251, 146, 60, 0.09);
  --accent-on: #1C1917;
}

@theme inline {
  --font-sans: "Geist Variable", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "Geist Mono Variable", ui-monospace, "SF Mono", monospace;
  --color-canvas: var(--canvas);
  --color-surface: var(--surface);
  --color-surface-tint: var(--surface-tint);
  --color-ink: var(--ink);
  --color-ink-2: var(--ink-2);
  --color-ink-3: var(--ink-3);
  --color-hairline: var(--hairline);
  --color-accent: var(--accent);
  --color-accent-strong: var(--accent-strong);
  --color-accent-tint: var(--accent-tint);
  --color-accent-on: var(--accent-on);
}

html {
  scroll-behavior: smooth;
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
}

body {
  @apply bg-canvas text-ink font-sans antialiased;
}

::selection {
  background: var(--accent);
  color: var(--accent-on);
}
```

### 3.2 Typography

- **Display + body:** Geist Variable. Headings weight 600 to 650, body weight 400 to 450.
- **Mono:** Geist Mono Variable. Used for: all numerals in the Metrics panel (`tabular-nums`), date ranges, stack chips, eyebrows, and small metadata. Mono is the "instrument panel" voice of the brand; use it deliberately, never for body paragraphs.
- Scale:
  - Hero h1: `text-[clamp(2.625rem,5.5vw,4.5rem)] leading-[1.04] tracking-[-0.03em] font-semibold`, with `pb-1` (descender safety, never `leading-none`).
  - Section h2: `text-[clamp(1.875rem,3vw,2.75rem)] leading-[1.1] tracking-[-0.02em] font-semibold`.
  - Thought interlude display: `text-[clamp(2.25rem,4.5vw,3.75rem)]`.
  - Body: `text-base md:text-lg leading-relaxed text-ink-2`, paragraphs `max-w-[62ch]`.
  - Eyebrow (component): `font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3`.
  - Metadata / chips: `font-mono text-xs` or `text-[13px]`.
- Headline lines never exceed 2 lines at desktop. Word count for h1 is fixed by the copy in §5.

### 3.3 Space, radius, elevation, z-index

- Section vertical rhythm: `py-24 md:py-32`. Hero gets `pt-36 md:pt-44 pb-20` (nav is fixed).
- Content container: `mx-auto w-full max-w-[1200px] px-6 md:px-10`. One container component pattern reused everywhere. Never `px-4` at desktop widths.
- Grid gaps: `gap-5 md:gap-6` in the bento; `gap-x-12 gap-y-16` in editorial 2-col layouts.
- Radius: per shape lock (§1). Buttons/chips `rounded-full`, cards `rounded-[1.25rem]`, inner media `rounded-[0.875rem]`.
- Shadows (light mode only, dark mode uses borders instead):
  - resting card: `shadow-[0_1px_2px_rgba(28,25,23,0.05)]`
  - hover card: `shadow-[0_24px_48px_-24px_rgba(28,25,23,0.18)]`
- Every card gets `border border-hairline` in both themes.
- z-index scale: content `z-0`/`z-10`, nav `z-40`, mobile menu overlay `z-50`. Nothing else.

---

## 4. Theming (light default, dark supported)

- Class strategy: `.dark` on `<html>`.
- **FOUC guard**: inline `<script>` in `index.html` `<head>`, before any CSS paint dependency:

```html
<script>
  (function () {
    var stored = localStorage.getItem("theme");
    var dark = stored ? stored === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (dark) document.documentElement.classList.add("dark");
  })();
</script>
```

- `src/lib/theme.tsx`: `ThemeProvider` with `useTheme()` returning `{ theme, toggle }`. Toggle writes `localStorage.theme` and flips the class. Also set `<meta name="color-scheme" content="light dark">`.
- Toggle button lives in the nav: a 36px circular icon button, Phosphor `Sun`/`Moon`, `aria-label="Switch to dark theme"` / `"Switch to light theme"` depending on state. Icon crossfades with `AnimatePresence` (scale 0.8 to 1, opacity, 200ms).
- Design and verify every section in **both** themes. Dark mode is not "invert it": shadows are removed, hairlines lighten to `--hairline` dark value, shader colors switch to the dark color set (§8.1).

`index.html` also gets: `lang="en"`, `<title>Vedant Patil, Software Engineer</title>`, meta description ("Software engineer building agentic AI systems and production infrastructure: MCP servers, multi-agent pipelines, GPU inference on Kubernetes."), OG title/description/type, favicon link to `/favicon.svg`, `theme-color` meta for both schemes.

---

## 5. Content: single source of truth (`src/lib/content.ts`)

All copy below is final. Type it into `content.ts` as exported typed objects and import from there; **no copy strings inside components.** Note: zero em-dashes appear below; keep it that way.

### 5.1 Global

```
name:        "Vedant Patil"
role:        "Software Engineer"
email:       "patilvedant.work@gmail.com"
location:    "Columbus, Ohio"
github:      "https://github.com/vedantpatil2021"
linkedin:    "https://linkedin.com/in/vedant-patil-6082"
```

Nav links (in order): About, Experience, Projects, Skills, Education, Contact. Nav CTA button: "Get in touch" (anchors to `#contact`).

### 5.2 Hero (`id="top"`)

- Eyebrow (1 of 3): `Open to SWE, DevOps, and AI infrastructure roles`
- H1: `I build the systems that let AI agents do real work.`
- Support line (18 words, `max-w-[52ch]`): `MCP servers, multi-agent pipelines, and GPU inference platforms on Kubernetes. M.S. Computer Science, The Ohio State University.`
- Primary button: `View projects` → `#projects`
- Secondary link (text + Phosphor `ArrowRight` 16px): `Get in touch` → `#contact`

### 5.3 Metrics, "Numbers from production" (`id` none, not in nav)

Panel heading (plain h2): `Numbers from production`
Support line: `Real figures from systems I have shipped and operated.`

Six metrics (value, unit rendering, label, context line):

| value | display | label | context |
|---|---|---|---|
| 99.9 | `99.9%` | Uptime | WorldForge video inference platform |
| 96 | `96%` | Pipeline success | Air-gapped edge Kubernetes |
| 90 | `~90%` | GPU utilization | NVIDIA H100 orchestration |
| 68 | `68x` | Faster bootstrap | Offline K3s deployment workflows |
| 45 | `45` | LLM-callable tools | One production MCP server |
| 2 | `2` | Peer-reviewed papers | NeurIPS 2025, ACM/IEEE SEC 2025 |

### 5.4 About (`id="about"`)

Heading: `About`

Paragraphs (exactly these three):

1. `I am a software engineer working where agentic AI meets production infrastructure. Over the last two years I have shipped MCP servers, multi-agent pipelines, and LLM tool networks that run in real environments, much of it first-of-its-kind work with no playbook to follow.`
2. `At Ohio State's ReRout Laboratory I ran AI systems in places the cloud cannot reach: air-gapped Kubernetes clusters on NVIDIA Jetson hardware, H100-backed world-model inference, and robot policy training loops that improve themselves.`
3. `I care about systems that hold up: instrumented from day one, deployable without heroics, and honest about their failure modes.`

Fact list (rendered as a compact hairline-divided list, mono values):

- `Location` → `Columbus, Ohio`
- `Education` → `M.S. CSE, Ohio State, 2026`
- `Focus` → `Agentic AI, DevOps, cloud platforms`
- `Published` → `NeurIPS 2025, ACM/IEEE SEC 2025`

### 5.5 Experience (`id="experience"`)

Heading: `Experience`

**Entry 1**
- Role: `Research Associate`
- Org: `ReRout Laboratory, The Ohio State University`
- Dates (mono): `Dec 2024 - May 2026`
- Bullets:
  1. `Architected a production Kubernetes AI inference platform for air-gapped NVIDIA Jetson edge hardware, reaching a 96% pipeline success rate in fully disconnected environments.`
  2. `Deployed NVIDIA Cosmos-Predict2.5-14B on K3s with H100 orchestration and Redis-backed queues: 198s P95 latency, 99.9% uptime, roughly $0.11 per video.`
  3. `Built autonomous collect-train-evaluate loops for robot policy training, including synthetic trajectory collection and 9x faster quality filtering.`
  4. `Published two peer-reviewed papers: NeurIPS 2025 and ACM/IEEE SEC 2025.`

**Entry 2**
- Role: `Cloud & DevOps Engineer Intern`
- Org: `Healiom`
- Dates (mono): `Apr 2024 - Jul 2024`
- Bullets:
  1. `Designed shared AWS infrastructure (EKS, ECS, VPC) with Terraform for four cross-functional teams in a HIPAA-regulated environment.`
  2. `Built four GitHub Actions CI/CD pipelines with automated security scanning, secrets management, and IAM/RBAC policies.`
  3. `Cut container images by 65%, from 5 GB to 1.5 GB, using multi-stage and distroless builds.`

### 5.6 Projects, the bento (`id="projects"`)

- Eyebrow (2 of 3): `Selected work`
- Heading: `Projects`
- Support line: `Six systems, all real, all shipped. Built to run, not to demo.`
- Below-grid link (text link with `ArrowUpRight` icon): `More on GitHub` → github profile URL.

Six cards. Fields per card: `title`, `tagline`, `description` (one sentence), `metric` (optional highlight, mono), `stack` (max 4 chips), `visual` (`"shader-a" | "shader-b" | "tint" | "pattern" | "plain"`), `span` (grid placement, §6.6).

1. **WorldForge** (featured)
   - tagline: `14B-parameter video generation, run like a product.`
   - description: `End-to-end platform for NVIDIA Cosmos world-model inference on K3s: Redis-backed async queues, FastAPI microservices, and H100 GPU orchestration across 23 Kubernetes manifests.`
   - metric: `99.9% uptime · $0.11 per video`
   - stack: `K3s`, `NVIDIA H100`, `Redis`, `FastAPI`
   - visual: `shader-a`
2. **DroneMCP**
   - tagline: `Autonomous drone operations, controlled by LLMs.`
   - description: `A production MCP server on AWS ECS Fargate exposing 45 LLM-callable tools for flight control, GPS, camera, and ML inference, verified by 35 unit tests before touching hardware.`
   - metric: `45 LLM-callable tools`
   - stack: `Python`, `FastMCP`, `ECS Fargate`, `WebSocket`
   - visual: `tint`
3. **Autonomous Multi-Agent Dev Team**
   - tagline: `Agents that plan, write, review, and test software.`
   - description: `A fully autonomous engineering pipeline with architect, coder, reviewer, and debugger roles, plus evaluation harnesses that measure completion rate and classify failure modes.`
   - metric: none
   - stack: `Claude Code`, `Codex`, `MCP`
   - visual: `pattern`
4. **Kira (RetailOps)**
   - tagline: `An AIOps agent that triages incidents before humans do.`
   - description: `Correlates CloudWatch logs, Prometheus metrics, and EKS cluster health in real time to surface root causes, on a full GitOps platform with ArgoCD and Terraform.`
   - metric: none
   - stack: `AWS Bedrock`, `EKS`, `Prometheus`, `ArgoCD`
   - visual: `plain`
5. **Agentic RAG Pipeline**
   - tagline: `Retrieval the model decides on, not a fixed step.`
   - description: `The LLM chooses when and where to retrieve across multiple sources, with automated correctness checks and a failure taxonomy that closes the improvement loop.`
   - metric: none
   - stack: `Python`, `LLM evals`
   - visual: `plain`
6. **Human-in-the-Loop Agent App**
   - tagline: `An agent pipeline with human checkpoints where they matter.`
   - description: `Full-stack web app where agents handle processing, tool calls, and state between steps, with structured handoff protocols and full observability of every model decision.`
   - metric: none
   - stack: `React`, `FastAPI`, `LLM agents`
   - visual: `shader-b`

### 5.7 Thought interlude (no id, not in nav)

Statement (display type, scroll-revealed word by word):
`Instrument first. Debug second.`

Support line (body size, `text-ink-3`):
`Every system I ship starts observable. The rest follows from that.`

This is Vedant's actual working philosophy from the resume, not a decorative quote. No quotation marks, no attribution line, no giant quote glyph.

### 5.8 Skills (`id="skills"`)

Heading: `Skills`
Support line: `Selective, not exhaustive. These are the tools I reach for in production.`

Four groups, each with a title and 6 chips (curated, do not dump the full resume list):

1. `Agentic AI & LLM Systems` → `MCP server development`, `Multi-agent orchestration`, `Agent evals & observability`, `Agentic RAG`, `AWS Bedrock`, `Claude Code`
2. `Infrastructure & Cloud` → `Kubernetes (EKS, K3s)`, `AWS`, `Terraform`, `ArgoCD`, `Docker`, `GitHub Actions`
3. `ML & GPU Systems` → `PyTorch`, `NVIDIA Cosmos`, `YOLO11`, `VLA fine-tuning`, `H100 orchestration`, `Weights & Biases`
4. `Languages & Backend` → `Python`, `TypeScript`, `C++`, `FastAPI`, `PostgreSQL`, `Redis`

### 5.9 Education (`id="education"`)

Heading: `Education`

- `The Ohio State University` / `M.S. Computer Science and Engineering` / `May 2026`
- `University of Mumbai` / `B.E. Information Technology` / `May 2024`

### 5.10 Contact (`id="contact"`)

- Eyebrow (3 of 3): `Contact`
- Heading: `Hiring for platform, DevOps, or agentic AI work?`
- Support line: `I finished my M.S. at Ohio State in May 2026 and I am open to full-time roles. Tell me what you are building.`
- The email itself is the centerpiece: `patilvedant.work@gmail.com` rendered at display scale as a `mailto:` link.
- Primary button: `Get in touch` (mailto). Secondary: icon buttons for GitHub and LinkedIn (Phosphor `GithubLogo`, `LinkedinLogo`, with `aria-label`s).
- A small "Copy email" ghost button with state: default shows `Copy email` + `Copy` icon; on click swaps to `Copied` + `Check` icon for 2 seconds (mono, no exclamation mark). Uses `navigator.clipboard.writeText`.

### 5.11 Footer

Single row (wraps on mobile): wordmark `Vedant Patil` (left) · `Columbus, Ohio` (center, `text-ink-3`) · GitHub / LinkedIn / Email text links (right). Below, one line: `© 2026 Vedant Patil`. Nothing else. No fake version strings, no "built with" credits, no second nav.

---

## 6. Section-by-Section Build Spec

General pattern for every section: content container (§3.3), `Reveal`-wrapped children (§7.2), `scroll-mt-24` on the section element, plain `h2` via `SectionHeading` unless the eyebrow budget says otherwise.

### 6.1 Shared UI

**Button.tsx** — two variants.
- `primary`: `bg-accent text-accent-on rounded-full px-6 h-12 inline-flex items-center gap-2 text-[15px] font-medium`, hover `bg-accent-strong`, active `scale-[0.98]`, focus `focus-visible:ring-2 ring-accent ring-offset-2 ring-offset-canvas`. Transition `transition-[background-color,transform] duration-200`.
- `secondary`: transparent, `border border-hairline text-ink`, hover `bg-surface-tint`.
- Never two primary buttons side by side anywhere on the page.

**Eyebrow.tsx** — renders the §3.2 eyebrow style. Import count across the app must be exactly 3.

**SectionHeading.tsx** — `h2` + optional support line (`text-ink-2 mt-3 max-w-[52ch]`). Headings left-aligned in every section except Thought and Contact (centered).

### 6.2 Nav

- Fixed top, `z-40`. Structure: a full-width bar with `backdrop-blur-md` and `bg-canvas/80`, bottom `border-b border-hairline` that only appears after scrolling 24px (toggle with a small `useScroll`-driven state, not a scroll listener).
- Height 68px. Left: wordmark `Vedant Patil` (`font-semibold tracking-[-0.01em]`, links to `#top`). Center/right (desktop `lg:` up): the 6 links in one line, `text-sm text-ink-2`, hover `text-ink`, active section link gets `text-ink` + a 4px accent underline offset (`underline decoration-accent decoration-2 underline-offset-8`). Far right: theme toggle + `Get in touch` primary button (compact, `h-10 px-5`).
- Active-section tracking: one `IntersectionObserver` over the six section ids, `rootMargin: "-40% 0px -55% 0px"`.
- Mobile (`< lg`): wordmark + theme toggle + hamburger (Phosphor `List`, 24px, `aria-expanded`, `aria-controls`). Menu: full-screen overlay `z-50 bg-canvas`, links stacked at `text-3xl font-semibold`, staggered entrance (60ms stagger, y 16→0, opacity), close icon `X` top right, body scroll locked while open, closes on link click and Escape.
- Links must never wrap to two lines; verify at 1024px exactly.

### 6.3 Hero

Layout: asymmetric 12-col grid at `lg:` (`grid grid-cols-1 lg:grid-cols-12 gap-10 items-center`), `min-h-[88dvh]` on the inner container so the fold shows a composed frame.

- **Left, `lg:col-span-7`:** stack of exactly four elements: Eyebrow → H1 → support line → CTA row (primary `View projects`, secondary `Get in touch` text link with arrow, `gap-4`). Nothing else. No badges, no avatar row, no tech-logo strip.
- **Right, `lg:col-span-5`:** the signature visual: a `ShaderPanel` in a double-bezel frame: outer `rounded-[1.25rem] border border-hairline bg-surface p-2`, inner `rounded-[0.875rem] overflow-hidden aspect-[4/5]`. Reserve the aspect box before the shader lazy-loads (§9, CLS).
- On mobile the visual moves **below** the text and shrinks to `aspect-[16/10]`.
- Entrance (on load, not scroll): container `staggerChildren: 0.08`, each child y 20→0, opacity 0→1, blur 4px→0, `duration 0.7`, ease `[0.16, 1, 0.3, 1]`. Shader panel fades in last with a slight `scale 0.98→1`.
- Background: canvas only. No full-viewport gradient wash, no radial glow, no grid-lines background, no floating blobs.

### 6.4 Metrics ("Numbers from production")

- Container: one panel, `rounded-[1.25rem] border border-hairline bg-surface overflow-hidden`.
- Inside: hairline-grid technique: `grid grid-cols-2 lg:grid-cols-3 gap-px bg-hairline`, each cell `bg-surface p-6 md:p-8`. Six cells, 2×3 at mobile, 3×2 at desktop. This reads as an instrument cluster without fake charts.
- Cell anatomy: value in `font-mono tabular-nums text-[clamp(2rem,3.5vw,3rem)] font-medium text-ink` (the `%`/`x`/`~` sign at 60% size, `text-ink-3`), label in `text-sm font-medium text-ink mt-2`, context in `text-[13px] text-ink-3 mt-1`.
- `CountUp` (§7.3) animates each value when the panel enters the viewport, once.
- Heading + support line sit above the panel, left-aligned, no eyebrow.

### 6.5 About

- Grid `lg:grid-cols-12 gap-x-12 gap-y-10`. Text block `lg:col-span-7`, portrait/facts rail `lg:col-span-4 lg:col-start-9`. (Offset column, intentionally not a 50/50 split; this is the only text+media split after the hero, so the "no alternation" rule holds.)
- Text block: `h2` then the three paragraphs.
- Rail: portrait frame on top (if `public/portrait.jpg` exists: `aspect-[4/5] rounded-[0.875rem] object-cover`, subtle warm grade via `saturate-[0.92]`; if it does not exist, render `ShaderPanel` variant `"portrait"` in the same frame, and leave a code-level TODO comment for the user to drop in a photo). Below it, the fact list: rows of `dt` (mono, `text-ink-3 text-xs uppercase tracking-[0.08em]`) and `dd` (`text-sm text-ink`), `divide-y divide-hairline`, semantic `<dl>`.
- Section background: `bg-surface-tint` band (full-bleed) to break rhythm from hero. Round nothing; the band is edge-to-edge with `py-24 md:py-32`.

### 6.6 Experience

- Plain `h2`, then two entries stacked vertically, separated by `border-t border-hairline pt-10 mt-10` (first entry has no top border).
- Entry layout at `md:`: grid `md:grid-cols-12`: dates+org column `md:col-span-4` (dates in mono `text-sm text-ink-3`, then role `text-lg font-semibold text-ink`, org `text-sm text-ink-2`), bullets `md:col-span-8` as a `space-y-3` list, each bullet `text-ink-2 leading-relaxed max-w-[68ch]` with metric numerals wrapped in `font-mono text-ink` spans so the real numbers pop.
- No timeline line, no dots, no company logos.

### 6.7 Projects (bento)

- Header: Eyebrow `Selected work` + `h2 Projects` + support line.
- Grid: `grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6`. Placement (desktop), every row sums to 12 with no holes:
  - Row 1 and 2: **WorldForge** `lg:col-span-7 lg:row-span-2` (featured, tall; the `shader-a` visual fills a top `aspect-[16/9]` inset) + **DroneMCP** `lg:col-span-5` (row 1; tinted card: `bg-accent-tint`, accent used only on the metric line) + **Multi-Agent Dev Team** `lg:col-span-5` (row 2).
  - Row 3: **Kira** `lg:col-span-7` (pattern visual: a CSS dot-grid via `radial-gradient(var(--hairline) 1px, transparent 1px)` at `background-size: 20px 20px`, masked to fade toward the bottom, behind the text) + **Agentic RAG** `lg:col-span-5`.
  - Row 4: **HITL App** `lg:col-span-12`, a wide horizontal card with the `shader-b` panel occupying its right third (panel hidden on mobile).
  - Cell size correlates with importance: WorldForge and DroneMCP are the two strongest pieces and read first.
- Card anatomy (every card): `rounded-[1.25rem] border border-hairline bg-surface p-6 md:p-7 flex flex-col gap-3`, optional visual inset first (`rounded-[0.875rem] overflow-hidden`), then title `text-lg font-semibold`, tagline `text-ink-2 text-[15px]`, description `text-sm text-ink-2 leading-relaxed`, metric (if any) `font-mono text-[13px] text-accent mt-auto`, chips row: `flex flex-wrap gap-2`, each chip `rounded-full border border-hairline bg-surface-tint px-3 py-1 font-mono text-xs text-ink-2`.
- Hover (desktop only): card `-translate-y-1` + hover shadow (§3.3), visual inset image/shader `scale-[1.03]`, both `duration-300 ease-out`; border shifts to `border-ink/15`. No hover on touch.
- Mobile: all cards `col-span-1` full width, visuals keep `aspect-[16/10]`, order = the numbered order in §5.6.
- Background diversity check: exactly 2 shader cells + 1 tint cell + 1 pattern cell + 2 plain cells. Do not let the grid become 6 identical white boxes.
- Below the grid, right-aligned: `More on GitHub` text link.

### 6.8 Thought interlude

- Full-bleed `bg-surface-tint` band, `py-28 md:py-36`, content centered, max-w `[20ch]` for the statement.
- The statement renders word by word: split into words, each a `<span>` whose opacity maps from 0.14 to 1 driven by `useScroll({ target, offset: ["start 0.85", "start 0.35"] })` + one `useTransform` per word over staggered input ranges. The section is NOT pinned; the reveal rides normal scroll.
- Support line fades in after (simple `Reveal`).
- Reduced motion: all words render at full opacity statically.
- This is the page's only scroll-scrub moment. Do not add another.

### 6.9 Skills

- Plain `h2` + support line.
- Grid `md:grid-cols-2 gap-x-12 gap-y-12`. Each group: `border-t border-hairline pt-6`, group title `text-sm font-semibold text-ink` with a single Phosphor duotone icon at 18px to its left (icons: `Brain`, `CloudArrowUp`, `Cpu`, `Code`), then the 6 chips (same chip style as project cards).
- No proficiency bars, no percentages, no star ratings, no orbiting icon clouds.

### 6.10 Education

- Plain `h2`. Two rows in a `divide-y divide-hairline` list, each row grid `md:grid-cols-12 py-6`: school `md:col-span-6 font-semibold`, degree `md:col-span-4 text-ink-2`, date `md:col-span-2 font-mono text-sm text-ink-3 md:text-right`.
- Compact by design; this section should take ~25% of the vertical space of Experience.

### 6.11 Contact

- Centered composition. Eyebrow `Contact`, `h2` (the hiring question), support line, then the display-scale email `mailto:` link: `font-semibold tracking-[-0.02em] text-[clamp(1.5rem,4vw,3rem)] text-ink underline decoration-hairline decoration-2 underline-offset-8`, hover: `decoration-accent text-ink` (color stays, underline warms).
- Under it, a row (`gap-3`): primary `Get in touch` button (mailto), `Copy email` ghost button with the copied state (§5.10), GitHub and LinkedIn icon buttons (40px circles, `border border-hairline`, hover `bg-surface-tint`).
- No contact form. A static site with a fake form is a lie; the email is the honest CTA.

### 6.12 Footer

- `border-t border-hairline`, `py-10`, content per §5.11, all `text-sm`. Links get the same focus rings as everything else.

---

## 7. Motion System

### 7.1 Tokens (use these everywhere, never ad-hoc values)

- Ease standard: `[0.16, 1, 0.3, 1]` (expo-out family). Never `ease-in-out` on entrances, never linear (except any hypothetical marquee; we have none).
- Durations: micro (hover, toggles) `0.2s`; entrances `0.6s to 0.7s`; count-ups `1.2s`.
- Entrance transform: `opacity 0→1, y 24→0` (hero adds `blur(4px)→0`). Distance never exceeds 32px.
- Stagger: `0.08s` within a group; cap visible stagger chains at 5 items (grids reveal per-card with `whileInView` on each card, delay = `index * 0.06` capped at 0.3).
- `viewport={{ once: true, amount: 0.3 }}` on all `whileInView` reveals. Nothing re-animates on scroll-up.

### 7.2 `Reveal.tsx`

Props: `children`, `delay = 0`, `y = 24`, `as = "div"`, `className`. Implements the entrance tokens with `whileInView`. Calls `useReducedMotion()`; when true, renders children statically (no transform, no opacity animation). Every animated component in the app must consume `useReducedMotion` the same way, including the shader (speed 0), the count-ups (render final value), the word-scrub (full opacity), and the mobile menu (fade only).

### 7.3 `CountUp.tsx`

Props: `value: number`, `decimals = 0`, `prefix = ""`, `suffix = ""`. Uses a `useMotionValue(0)` + `animate(mv, value, { duration: 1.2, ease: [0.16, 1, 0.3, 1] })` triggered by `useInView(ref, { once: true })`, writing formatted text into the node via `useMotionValueEvent` (no per-frame React state). `tabular-nums` so digits do not jitter. Reduced motion: set text to final value immediately.

### 7.4 What is deliberately NOT animated

Body paragraphs after first reveal, nav links, footer, chips, the fact list. Motion budget per viewport: one primary moving element at a time. If two sections' entrances are visible simultaneously at 768px, lower `amount` or shorten distance until they do not fight.

---

## 8. Visual Assets

### 8.1 `ShaderPanel.tsx` (@paper-design/shaders-react)

- One wrapper component, `variant: "hero" | "project-a" | "project-b" | "portrait"`.
- After installing, read the package's type definitions and README to confirm component names and props. Expected candidates: `MeshGradient`, `GrainGradient`, `Dithering`, `Waves`. Choose `MeshGradient` for `hero` and `portrait`, `GrainGradient` (or `Dithering`) for the two project variants, pending what the installed version actually exports. **Verify props against the `.d.ts` files; do not guess.**
- Color sets (must be passed from the current theme; read via `useTheme()` and swap):
  - Light: `["#FAFAF9", "#FFEDD5", "#FDBA74", "#C2410C"]`
  - Dark: `["#0C0A09", "#292524", "#7C2D12", "#FB923C"]`
- Motion: `speed` ≤ 0.25 (slow, ambient). Under `useReducedMotion`, set speed to 0.
- Performance: lazy-load via `React.lazy` + `Suspense`; the `Suspense` fallback is a static CSS gradient div (`bg-[linear-gradient(135deg,var(--accent-tint),var(--surface-tint))]`) with identical dimensions so nothing shifts.
- The shader never sits behind body text. It lives only inside the framed insets (hero panel, 2 project cards, optional portrait fallback).

### 8.2 Generated images (optional, preferred over shaders where available)

If an image-generation tool is available at build time, generate these and place in `public/images/`, then use them instead of the two project shader cells (keep the hero as a shader). Every prompt already excludes text; keep it that way.

- **`worldforge.jpg`** (16:9): `Macro photograph of a dark graphite server heatsink fin array with a faint warm orange glow rising between the fins, shallow depth of field, cinematic and restrained, near-monochrome warm graphite palette with a single burnt orange light accent, premium hardware editorial style, no text, no letters, no numbers, no logos, no watermark, no user interface elements`
- **`hitl.jpg`** (16:10): `Overhead photograph of a pale warm-gray desk with a precise grid of small paper cards, one card tinted burnt orange and slightly offset from the grid, soft diffused daylight, editorial minimalism, generous negative space, stone and off-white palette, no text, no letters, no numbers, no logos, no watermark, no user interface elements`
- **`og-cover.jpg`** (1200×630, for the OG meta tag): `Abstract architectural composition of thin translucent planes and fine wires arranged in orderly horizontal layers, warm paper-white background, one burnt orange plane among soft stone and amber tones, soft studio light, subtle film grain, minimalist high-end 3D render, generous negative space, no text, no letters, no numbers, no logos, no watermark, no user interface elements`

If no image tool is available: skip images entirely and use the shader variants (§8.1). **Never** substitute random stock photos or unsplash/picsum for these; a palette-mismatched photo is worse than a palette-locked shader.

All `<img>` elements: real `alt` text, explicit `width`/`height` or aspect classes, `loading="lazy"` below the fold, `decoding="async"`.

### 8.3 Iconography

Phosphor only. Sizes: 16px inline with text, 18px group headers, 20 to 24px icon buttons. One weight per context (`regular` for UI chrome, `duotone` for the 4 skill-group icons). Never emoji, never mixed icon sets.

### 8.4 Favicon

`public/favicon.svg`: a 32×32 rounded square (`rx="8"`) filled `#C2410C` with the letter `V` centered in Geist-style geometry (a simple `<text>` or path, white). This is the single hand-rolled logo permitted; do not design anything more elaborate.

---

## 9. Accessibility & Performance (requirements, not suggestions)

1. Semantic structure: one `<h1>` (hero), each section an `<h2>`, `<nav>`, `<main>`, `<footer>`, `<dl>` for facts, `<ul>` for bullets.
2. Skip link: first focusable element, `Skip to content`, visually hidden until focused, targets `<main id="main">`.
3. Keyboard: every interactive element reachable and operable; visible `focus-visible` rings (accent, 2px, offset 2) on ALL of: nav links, buttons, email link, icon buttons, theme toggle, hamburger. Mobile menu traps focus while open and returns focus to the hamburger on close.
4. `prefers-reduced-motion`: fully honored via `useReducedMotion` in every animated component (§7.2 list). The site must be 100% readable with zero animation.
5. Contrast AA everywhere, both themes: body text 4.5:1, large display text 3:1. The pairs to hand-check: `ink-2` on `surface-tint` (light), `ink-3` on `surface` (both), `accent` on `accent-tint` (light, metric text on DroneMCP card), `accent` on `canvas` (dark).
6. Touch targets ≥ 44px on mobile (nav links in the overlay, icon buttons, chips are display-only and exempt).
7. Performance: hero LCP is the `h1` text (fonts self-hosted and imported first in CSS); shaders lazy-loaded; zero layout shift from lazy content (aspect boxes everywhere); no scroll listeners; transforms/opacity only in animations (no animating `height`, `top`, `box-shadow` transitions are fine on GPU-composited cards).
8. `npm run build` must pass with zero TypeScript errors before the task is called done.

---

## 10. Responsive Matrix (verify each cell by eye)

| Section | 375px | 768px | 1440px |
|---|---|---|---|
| Nav | wordmark + toggle + hamburger; overlay menu | same as mobile | full link row, one line, no wrap |
| Hero | text stack, visual below at 16:10 | same, wider | 7/5 split, visual right |
| Metrics | 2-col hairline grid (3 rows) | 2-col | 3-col (2 rows) |
| About | text, then portrait, then facts | same | 7 + 4 offset columns |
| Experience | stacked, dates above bullets | 4/8 grid | 4/8 grid |
| Projects | single column, §5.6 order | single column, wider cards | 12-col bento (engages at `lg:` 1024px) |
| Thought | statement wraps ~3 lines | 2 lines | 2 lines |
| Skills | 1-col groups | 2-col | 2-col |
| Education | stacked rows | 12-col rows | 12-col rows |
| Contact | email breaks to 2 lines OK, buttons wrap | centered | centered |

Also verify: no horizontal scrollbar at any width (`overflow-x` clean), nothing touches viewport edges (container padding holds), and the bento has no empty grid holes at or above 1024px (the bento engages only at `lg:`; below that everything stacks in one column).

---

## 11. Copy Voice Rules (for any string not verbatim in §5)

Should be near-zero, but if a label or aria string is needed: direct, technical, no hype, no exclamation marks, sentence case for UI labels, no "!" anywhere, no em-dashes, numbers stay exact. When in doubt, write what a senior engineer would put in a README.

---

## 12. Full-Output Enforcement (how the builder must work)

From `full-output-enforcement`: partial output is broken output.

- Never emit `// ...`, `// rest of component`, `/* TODO */`, or skeleton components. Every file listed in §2.3 ships complete and runnable.
- Scope lock: 12 section/chrome components + 6 ui components + 3 lib/config files + `index.css` + `index.html`. Count them before declaring completion.
- If output must split across responses, break at end-of-file boundaries and resume exactly there; never compress remaining files to fit.

---

## 13. Build Order (execute in this sequence, verify at each gate)

1. **Scaffold** (§2.2). Gate: `npm run dev` serves the Vite starter.
2. **Tokens + theme**: `index.css`, `index.html` (FOUC script, meta, favicon), `theme.tsx`. Gate: a test div shows token colors flipping with the `.dark` class.
3. **Content**: `content.ts` fully typed, every string from §5. Gate: `tsc` clean.
4. **UI primitives**: Button, Eyebrow, SectionHeading, Reveal, CountUp, ShaderPanel (read the shader package types first). Gate: primitives render in isolation in `App.tsx` temporarily.
5. **Sections top-down**: Nav → Hero → Metrics → About → Experience → Projects → Thought → Skills → Education → Contact → Footer. Gate after each: visual check in the dev server at 375 / 768 / 1440, both themes.
6. **Interaction pass**: active-nav tracking, mobile menu focus trap, copy-email state, count-ups, word-scrub, hovers.
7. **Reduced-motion pass**: emulate `prefers-reduced-motion` and confirm every §7.2-listed behavior.
8. **Mechanical lint** (all must return nothing):

```bash
grep -rn "—\|–" src/ index.html                        # em/en dashes
grep -rin "lorem\|john doe\|placeholder\|coming soon" src/
grep -rin "seamless\|elevate\|unleash\|empower\|supercharge\|blazing" src/
grep -rn "h-screen" src/
grep -rn "addEventListener('scroll'\|addEventListener(\"scroll\"" src/
grep -rin "lucide\|gsap\|three\b" src/ package.json
grep -rn "#a855f7\|#8b5cf6\|#7c3aed\|purple\|violet\|indigo" src/
grep -rnP "[\x{1F300}-\x{1FAFF}\x{2600}-\x{27BF}]" src/  # emoji
```

9. **Manual audit against §1** (the 22 bans + 6 locks), then the checklist below.
10. **Build**: `npm run build` zero errors, `npm run preview` sanity check.

---

## 14. Final Pre-Flight Checklist (binding; all boxes must be true)

**Brand & taste**
- [ ] Site is bright by default; light theme is the canonical look, dark theme fully styled.
- [ ] Exactly one accent color in exactly the token values; appears ≤ 8 times per viewport.
- [ ] Fonts are Geist + Geist Mono, self-hosted; no Inter anywhere; mono used for numbers/metadata only.
- [ ] Exactly 3 eyebrows (Hero, Projects, Contact); no section numbering anywhere.
- [ ] Shape lock holds: pills, 1.25rem cards, 0.875rem insets, nothing else.
- [ ] The page could not be mistaken for a v0/Lovable template: asymmetric hero, hairline metrics panel, mixed-density bento, one scrub moment.

**Content honesty**
- [ ] Every number on the page traces to `resume.md`.
- [ ] Zero placeholder text, zero dead links (every `href` goes to a real anchor, mailto, or profile URL).
- [ ] No testimonials, no logo walls, no fake form.
- [ ] Zero em-dashes or en-dashes in rendered copy.

**The user's explicit asks (from Prompt.md)**
- [ ] React + Vite + Tailwind. Single page. Nav + hero, about, education, projects, skills, contact + footer.
- [ ] Projects are a bento grid with varied cell sizes and varied backgrounds.
- [ ] A "thought" interlude sits between Projects and Skills.
- [ ] Achievements render as a dashboard-style instrument panel (hairline grid, mono numerals, count-up).
- [ ] Motion/scroll-trigger animation present but restrained (Motion library, `whileInView`, one `useScroll` scrub).
- [ ] `@paper-design/shaders-react` used for the hero visual (and project cells if no generated images).
- [ ] No terminal aesthetics, no typing effects, no alternating left/right rows.
- [ ] Feels like a personal brand: consistent palette, wordmark, favicon, one voice.

**Engineering**
- [ ] `npm run build` passes; no console errors or warnings in the browser.
- [ ] All §13.8 greps return empty.
- [ ] Reduced motion, keyboard nav, focus rings, skip link, alt text: all verified.
- [ ] No horizontal scroll at 320, 375, 768, 1024, 1440.
- [ ] Both themes checked section by section, including shader color sets.

---

## 15. Out of Scope (do not build these)

Blog, CMS, contact form backend, analytics, resume-PDF generator, i18n, page routing, service worker, 3D scenes, Easter eggs, cursor followers, preloaders/splash screens, sound. If tempted, do not.
