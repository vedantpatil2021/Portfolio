# Image Generation Prompts

Prompts for images the site could use, one per asset, with light + dark variants where the site needs both. Generate at the stated size (or larger, same ratio) and export PNG. Keep the shared style block identical across a light/dark pair so they read as siblings.

**Shared palette (paste into every prompt):**
> Palette: warm off-white #FAFAF9, pale peach #FFEDD5, soft orange #FDBA74, bright orange #FB923C, burnt orange #C2410C, deep rust #7C2D12, warm charcoal #292524, near-black #0C0A09.

**Shared style (paste into every prompt):**
> Style: minimal editorial print aesthetic, subtle film grain and halftone-dither texture, soft gradients, generous negative space, no text, no words, no letters, no logos, no watermark, no people, flat 2D graphic (not 3D render), matte finish.

---

## 1. OG / social share card — `public/og.png` (needed first)

Single image, works for both themes since link previews don't theme-switch. 1200×630.

**Prompt:**
> A wide 1200x630 abstract banner for a software engineer's portfolio site. A warm off-white #FAFAF9 background with one large, soft, flowing mesh-gradient form sweeping from the lower left, blending pale peach #FFEDD5 into soft orange #FDBA74 into burnt orange #C2410C, with fine film grain over the gradient. The right two-thirds stay calm and empty (headline text will be overlaid later in code). A sparse field of tiny halftone dots in burnt orange fades in along the bottom edge. Minimal editorial print aesthetic, subtle film grain and halftone-dither texture, soft gradients, generous negative space, no text, no words, no letters, no logos, no watermark, no people, flat 2D graphic, matte finish.

*(Overlay "Vedant Patil — I build the systems that let AI agents do real work." in code or an editor afterward; generated text is unreliable.)*

---

## 2. Kira (RetailOps) card art — incident triage / observability

Replaces the plain `pattern` visual. 1200×675 (16:9), light + dark.

**Light prompt:**
> A 16:9 abstract illustration of signals converging: several thin, wavering horizontal telemetry lines in soft orange #FDBA74 and burnt orange #C2410C travel left to right across a warm off-white #FAFAF9 field, then converge into a single clean line, with one small pulsing node highlighted in bright orange #FB923C at the convergence point. A faint dot-grid in pale peach #FFEDD5 sits behind everything. [shared palette] [shared style]

**Dark prompt:**
> Same composition, inverted mood: background near-black #0C0A09 with a faint warm charcoal #292524 dot-grid; the telemetry lines glow in bright orange #FB923C and soft orange #FDBA74, converging into a single line with one luminous node in pale peach #FFEDD5. [shared palette] [shared style]

---

## 3. Agentic RAG Pipeline card art — branching retrieval

Replaces the `plain` visual. 1200×675 (16:9), light + dark.

**Light prompt:**
> A 16:9 abstract illustration of a decision tree made of dotted paths: a single dotted line in warm charcoal #292524 enters from the left and branches at two junctions into three possible dotted routes across a warm off-white #FAFAF9 field; only one route is drawn solid in burnt orange #C2410C and reaches a small filled circle, the unchosen branches fade out in pale peach #FFEDD5. Subtle halftone texture in the corners. [shared palette] [shared style]

**Dark prompt:**
> Same branching-paths composition on a near-black #0C0A09 background: dotted routes in warm charcoal #292524 and deep rust #7C2D12, the single chosen route solid and glowing in bright orange #FB923C ending at a luminous node. [shared palette] [shared style]

---

## 4. Human-in-the-Loop Agent Ops card art — approval gate

Replaces the `tint` visual. 1200×675 (16:9), light + dark.

**Light prompt:**
> A 16:9 abstract illustration of a checkpoint: a horizontal flow of small square tiles moving left to right across a pale peach #FFEDD5 background, passing through a single vertical gate rendered as two rounded bars in burnt orange #C2410C; tiles before the gate are outlined only, tiles after the gate are solid filled in bright orange #FB923C, suggesting review and approval. Fine film grain overall. [shared palette] [shared style]

**Dark prompt:**
> Same checkpoint composition on a near-black #0C0A09 background: outlined tiles in warm charcoal #292524 approach a glowing gate of two rounded bars in bright orange #FB923C, and exit as solid tiles in soft orange #FDBA74. [shared palette] [shared style]

---

## Wiring notes (for whoever implements)

- Save pairs as `public/art/<name>-light.png` and `public/art/<name>-dark.png`; swap via the existing `useTheme()` hook (same pattern as `ShaderScene`'s color switch).
- Compress before shipping (`squoosh`/`sharp`, target < 150 KB each at these sizes).
- The About portrait needs **no generated image** — the fix is palette tuning in code (see UpdatedPlan.md §1.1).
- If card art is added, remove those cards' `pattern`/`plain`/`tint` branches or keep them as loading fallbacks.
