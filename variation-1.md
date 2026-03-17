# Variation 1: "Blueprint Grid" — Layout Pattern Overhaul

> Same content, completely different spatial rhythm. Every section rearranged into asymmetric grids, bento compositions, and editorial layouts. The page goes from centered/symmetric to structured/authoritative.

---

## Global Principle
Every change is a **layout swap** — colors, fonts, animations, and content stay identical. Only `grid-template-columns`, `flex-direction`, alignment, and spatial relationships change.

---

## 1. Navigation — Full-Width Top Bar

**Current:** Floating centered pill with glassmorphic backdrop-blur, `border-radius:999px`, `max-width:900px`.

**Change to:** Full-width editorial top bar. Logo left, links right, clean bottom border.

```css
/* Override in <style is:global> */
.CuNavigation_navigation__zryLb {
  padding: 0;
}

.CuNavigation_container__rChM8 {
  border-radius: 0;
  max-width: 100%;
  background: rgba(255, 255, 255, 0.97);
  backdrop-filter: none;
  box-shadow: none;
  border-bottom: 1px solid #e4e4e7;
  padding: 14px 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

**What stays the same:** Same links, same logo, same CTA button, same sticky behavior.

---

## 2. Hero — 60/40 Asymmetric Split

**Current:** Centered composition. Giant "Super Agents" text centered, character image sticky on right, expandable tags below.

**Change to:** Two-column grid. Left 60% = text content (left-aligned, smaller bold heading). Right 40% = character image (static, not sticky). Tags below in same 60/40 split.

```css
.CanvaStage_canvaStage__ACZ2c {
  display: grid;
  grid-template-columns: 3fr 2fr;
  align-items: center;
  gap: 40px;
  padding: 0 60px;
}

.AgentHeroPin_heroText__RaQrp {
  position: relative;
  left: 0;
  top: 0;
  transform: none;
  text-align: left;
  font-size: clamp(80px, 8vw, 140px);
  mix-blend-mode: normal;
}

.AgentHeroPin_pinnedActor__8OP5G {
  position: relative; /* remove sticky */
  top: auto;
}

/* Tags: left column takes full width below hero */
.AgentHeroPin_leftTags__xtXbT {
  grid-column: 1;
}

.AgentHeroPin_rightTags__gm_VT {
  grid-column: 2;
}
```

**What stays the same:** Same text content, same character image, same CTAs, same expandable tags, same colors.

---

## 3. Agent Carousel — 3-Column Static Grid

**Current:** Horizontal scrolling track with GSAP drag. 3 cards slide left/right. Previous/Next navigation buttons. Alternating vertical offset on even cards.

**Change to:** 3-column static grid. All cards visible at once. No scrolling, no drag. Uniform height with `aspect-ratio: 3/4`.

```css
.AgentCarousel_carouselTrack__YzKnk {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  cursor: default;
  overflow: visible;
}

.AgentCarousel_carouselCard__kfTd9 {
  width: 100%;
  height: auto;
  aspect-ratio: 3 / 4;
  flex-shrink: unset;
}

/* Remove the alternating vertical offset */
.AgentCarousel_carouselCard__kfTd9:nth-child(2n) {
  margin-block-start: 0;
}

/* Hide navigation buttons — not needed in grid */
.AgentCarousel_navBtn__d8pBQ {
  display: none;
}
```

**JS change:** In the `<script>` block, wrap the entire carousel GSAP initialization (lines ~196-291) in a guard:

```js
const CAROUSEL_LAYOUT = 'grid'; // Change to 'scroll' to revert
if (CAROUSEL_LAYOUT !== 'grid') {
  // ... existing GSAP drag code ...
}
```

**What stays the same:** Same 3 cards, same card content (icons, titles, descriptions, canvas effects, character images), same card colors.

---

## 4. Features — Zigzag Alternating Layout

**Current:** All feature rows use `grid-template-columns: 1fr 2fr` (text left, visual right). Last feature uses 3 equal columns.

**Change to:** Odd rows keep `1fr 2fr`. Even rows flip to `2fr 1fr` with content order swapped. Creates a zigzag reading pattern. Last feature becomes `2fr 1fr 1fr 1fr` (one hero + 3 smaller).

```css
.feature-section:nth-child(even) {
  grid-template-columns: 2fr 1fr;
}

.feature-section:nth-child(even) .feature-left {
  order: 2;
}

.feature-section:nth-child(even) .feature-right {
  order: 1;
}

.last-feature-section {
  grid-template-columns: 2fr 1fr 1fr 1fr;
}
```

**What stays the same:** Same feature content, same visual cards (SyncVisual, KnowledgeVisual, etc.), same scroll-triggered fade-in animations.

---

## 5. Marquee/Reveal — Left-Aligned Text

**Current:** Centered text, centered pills wall.

**Change to:** Left-aligned text capped at 600px. Pills wall left-aligned.

```css
.marquee-section h1 {
  text-align: left;
  max-width: 600px;
  padding: 0 60px;
}

.marquee-section .pills-wall {
  align-items: flex-start;
  padding-left: 60px;
}
```

**What stays the same:** Same clipPath GSAP animation, same reveal-flash, same scroll scrub timing, same content.

---

## 6. Capabilities — Stacked Media-Over-List

**Current:** 3-column side-by-side grid (`1fr minmax(350px,1fr) 1fr`): left = capability list, center = media, right = details.

**Change to:** 2-row stacked layout. Top row = full-width media (400px height). Bottom row = 2-column with list left (250px) and details right (1fr).

```css
.capabilities-showcase {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.cap-middle {
  width: 100%;
  height: 400px;
  order: 1;
}

.cap-left {
  order: 2;
  width: 250px;
}

.cap-right {
  order: 3;
  flex: 1;
}

/* Create a wrapper row for left + right */
/* Since we can't add HTML easily, use a CSS-only approach: */
.capabilities-showcase {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 400px auto;
}

.cap-column:nth-child(1) { /* cap-left */
  grid-row: 2;
}

.cap-column:nth-child(2) { /* cap-middle */
  grid-row: 1;
  grid-column: 1;
}

.cap-column:nth-child(3) { /* cap-right */
  grid-row: 2;
}

/* Alternative: make row 2 a sub-grid */
@supports (grid-template-rows: subgrid) {
  .capabilities-showcase {
    grid-template-rows: 400px auto;
    grid-template-columns: 250px 1fr;
  }
  .cap-column:nth-child(2) { /* cap-middle */
    grid-column: 1 / -1;
    grid-row: 1;
  }
}
```

**What stays the same:** Same 7 capabilities, same switching logic, same media content, same detail text, same GSAP ScrollTrigger behavior.

---

## 7. Platform Section — Side-by-Side with Text

**Current:** Section header stacked above a 3D hover card (vertically).

**Change to:** 2-column layout. Section header/description on the left, 3D card on the right.

```css
.post-dark-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;
}

.post-dark-section > .section-header {
  grid-column: 1;
  text-align: left;
}

.hover-3d.fair-billing-image {
  grid-column: 2;
}
```

**What stays the same:** Same 3D tilt effect, same glow on hover, same card content, same JS interaction.

---

## 8. Pricing — Full-Bleed Section

**Current:** Floating card with `max-width:1400px`, `height:800px`, `border-radius:32px`.

**Change to:** Full-bleed section. No rounded corners. Content centered in a narrow container.

```css
.cta-final-card {
  max-width: 100%;
  border-radius: 0;
  height: auto;
  min-height: 600px;
  margin: 0;
}

.cta-final-card > * {
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}
```

**What stays the same:** Same title, same CTA buttons, same background treatment.

---

## 9. CTA — 2-Column Split

**Current:** Centered stack: counter on top, input below, dot grid behind.

**Change to:** 2-column: counter + input on the left, dot grid animation on the right.

```css
.CTAVibe_ctaVibe__5fxKv {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;
}

.CTAVibe_dotGrid__8w17I {
  grid-column: 2;
}
```

**What stays the same:** Same counter animation, same dot grid scrolling, same input field.

---

## 10. Footer
No changes.

---

## Summary

| What changes | What stays the same |
|---|---|
| Grid layouts (60/40, zigzag, stacked, side-by-side) | All colors, fonts, shadows |
| Nav shape (pill → bar) | All text content |
| Carousel interaction (drag → static grid) | All images and media |
| Text alignment (centered → left-aligned) | All animations (except carousel drag) |
| Section flow (symmetric → asymmetric) | All hover effects |

**Differentiation score: 7.5/10** — The page feels like a completely different publication layout while sharing the exact same visual DNA.
