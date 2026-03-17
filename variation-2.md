# Variation 2: "Midnight Ember" — Visual Atmosphere Shift

> Same layouts, completely different mood. The entire page flips to a dark palette with warm amber/copper accents. Goes from "friendly consumer SaaS" to "premium developer tool."

---

## Global Principle
Every change is a **color/texture swap** — layouts, spacing, animations, and content stay identical. Only backgrounds, text colors, accents, borders, and surface treatments change.

---

## Color Palette

| Role | Original | Midnight Ember |
|------|----------|---------------|
| Background | `#ffffff` | `#0a0a0a` |
| Surface | `#f0f0f0` | `#141414` |
| Text | `#09090b` | `#e5e5e5` |
| Text medium | `#737373` | `#737373` (stays) |
| Text soft | `#a1a1aa` | `#525252` |
| Primary | `#09090b` | `#e5e5e5` |
| Secondary (accent) | `#c490f4` (purple) | `#d97706` (amber) |
| Secondary hover | `#b07de8` | `#b45309` |
| Border | `#e4e4e7` | `#1f1f1f` |
| White | `#ffffff` | `#e5e5e5` |
| Black | `#000000` | `#0a0a0a` |

---

## 0. Global CSS Custom Property Override

Add this at the very top of the `<style is:global>` block to flip the entire theme in one shot:

```css
.SuperAgentsV2_wrapper__qfQjf {
  --background: #0a0a0a;
  --surface: #141414;
  --surface-inverse: #1a1a1a;
  --border: #1f1f1f;
  --text: #e5e5e5;
  --text-inverse: #0a0a0a;
  --text-medium: #737373;
  --text-soft: #525252;
  --primary: #e5e5e5;
  --primary-hover: #d4d4d4;
  --secondary: #d97706;
  --secondary-hover: #b45309;
  --white: #e5e5e5;
  --black: #0a0a0a;
}

body, html {
  background: #0a0a0a;
  color: #e5e5e5;
}
```

---

## 1. Navigation — Dark Glassmorphic Pill

```css
.CuNavigation_container__rChM8 {
  background: rgba(12, 12, 12, 0.85);
  box-shadow: 0 2px 20px rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.CuNavigation_navLink__eR307 {
  color: #a0a0a0;
}

.CuNavigation_navLink__eR307:hover {
  background: #1a1a1a;
  color: #e5e5e5;
}

/* CTA button goes amber */
.CuNavigation_navigation__zryLb .Btn_btn-primary__FF6_S {
  background: #d97706;
  color: #0a0a0a;
}

.CuNavigation_navigation__zryLb .Btn_btn-primary__FF6_S:hover {
  background: #b45309;
}
```

**What stays the same:** Same pill shape, same centered links, same layout, same sticky behavior.

---

## 2. Hero — Dark Background with Amber Glow

```css
.AgentHeroPin_heroContainer__tLYIb {
  background: #0a0a0a;
}

.AgentHeroPin_bgElementOne__nhw8c {
  background: #92400e; /* darker amber blur */
}

.AgentHeroPin_radialGlow__8E3OZ {
  background: radial-gradient(53.78% 61.46% at 50% 100%, #d97706 0, rgba(10, 10, 10, 0) 100%);
}

.AgentHeroPin_heroText__RaQrp {
  color: #fafafa;
  mix-blend-mode: normal; /* was plus-lighter, which needs light bg */
}

/* Tagline and description text */
.AgentHeroPin_tagline__Dd4Hj,
.AgentHeroPin_description__r2Vmf {
  color: #a0a0a0;
}

/* Expandable tags */
.ExpandableTag_tag__KET3r {
  background: #1a1a1a;
  color: #a0a0a0;
  border-color: #2a2a2a;
}

.ExpandableTag_tag__KET3r:hover {
  background: #262626;
  color: #e5e5e5;
}

/* Labels */
.AgentHeroPin_label__0z_2o {
  color: #737373;
}

/* CTA buttons */
.AgentHeroPin_heroContainer__tLYIb .Btn_btn-primary__FF6_S {
  background: #d97706;
  color: #0a0a0a;
}

.AgentHeroPin_heroContainer__tLYIb .Btn_btn-primary__FF6_S:hover {
  background: #b45309;
}

/* Secondary button */
.AgentHeroPin_heroContainer__tLYIb .CuButtonV5_secondary__h7R9k {
  background: #1a1a1a;
  color: #e5e5e5;
  border-color: #2a2a2a;
}
```

**What stays the same:** Same layout, same text content, same character image, same sticky behavior, same expandable tag interaction.

---

## 3. Agent Carousel — Dark Tinted Cards

**Current card colors:** PM = `#FDEDE7` (peach), Sales = `#EDF6FD` (ice blue), Coding = `#EDFDED` (mint)

**New card colors:** PM = `#1a1210` (warm dark), Sales = `#101518` (cool dark), Coding = `#101a10` (green dark)

```css
/* Section background */
#agent-carousel-section {
  background: #0a0a0a;
}

/* Card background overrides — use attribute selectors or nth-child */
.AgentCarousel_carouselCard__kfTd9:nth-child(1) {
  --card-bg: #1a1210;
}

.AgentCarousel_carouselCard__kfTd9:nth-child(2) {
  --card-bg: #101518;
}

.AgentCarousel_carouselCard__kfTd9:nth-child(3) {
  --card-bg: #101a10;
}

/* Header text */
#agent-carousel-section .CUSectionHeader_headerEyebrow__1HtFf {
  color: #737373;
}

#agent-carousel-section .CUSectionHeader_headerTitle__3L6Fk {
  color: #e5e5e5;
}

#agent-carousel-section .CUSectionHeader_headerDescription__2ZKpE {
  color: #737373;
}

/* Nav buttons */
.AgentCarousel_navBtn__d8pBQ {
  background: #1a1a1a;
  border-color: #2a2a2a;
  color: #e5e5e5;
}
```

**What stays the same:** Same horizontal scroll, same card dimensions, same canvas effects, same character images, same GSAP drag.

---

## 4. Features — Dark Background with Stripe Texture

```css
.human-skills-section,
#features-section {
  background: #0a0a0a;
  background-image: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 59px,
    rgba(255, 255, 255, 0.03) 59px,
    rgba(255, 255, 255, 0.03) 60px
  );
}

.feature-section {
  border-color: #1f1f1f;
}

/* Feature card backgrounds */
.feature-section .feature-right > div {
  background: #141414;
  border-color: #1f1f1f;
}

/* Section headers */
#features-section .CUSectionHeader_headerTitle__3L6Fk {
  color: #e5e5e5;
}

#features-section .CUSectionHeader_headerDescription__2ZKpE {
  color: #737373;
}
```

**What stays the same:** Same grid layout, same feature cards, same visual animations (SyncVisual, etc.).

---

## 5. Marquee/Reveal — Amber Reveal

**Current:** White marquee (`#fff`) clips away to reveal dark section underneath.

**Change to:** Warm off-black marquee (`#0f0c08`) with amber-tinted heading clips away to reveal the same dark section.

```css
.marquee-section {
  background: #0f0c08;
}

.marquee-section::before {
  background: #0f0c08;
}

.marquee-section h1 {
  color: #fbbf24; /* amber highlight for the main heading */
}

.marquee-section p,
.marquee-section .pills-wall span {
  color: #737373;
}

/* The reveal flash gets an amber tint */
.reveal-container .reveal-flash {
  background: linear-gradient(
    180deg,
    rgba(217, 119, 6, 0.08) 0%,
    rgba(217, 119, 6, 0.03) 50%,
    transparent 100%
  );
}
```

**What stays the same:** Same clipPath animation, same reveal mechanic, same pills content, same scroll scrub.

---

## 6. Capabilities (Dark Section) — Amber Accents

The dark section is already `#000` background. Add amber warmth to the accents:

```css
/* Active capability label: amber instead of white */
.cap-list-item.active .cap-label {
  color: #fbbf24;
}

/* Active number: orange stays, but warmer */
.cap-list-item.active .cap-number {
  color: #d97706;
}

/* Detail number */
.cap-detail-number {
  color: #d97706;
}

/* Column borders: darker, subtler */
.cap-column {
  border-color: #1f1f1f;
}

.cap-column::before,
.cap-column:last-child::after {
  background: #1f1f1f;
}

/* CTA button inside capabilities */
.cap-btn {
  background: #d97706 !important;
  color: #0a0a0a !important;
}

.cap-btn:hover {
  background: #b45309 !important;
}
```

**What stays the same:** Same 3-column grid, same switching animation, same content, same ScrollTrigger behavior.

---

## 7. Platform Section — Dark with Amber Glow

```css
.post-dark-section {
  background: #0a0a0a;
  color: #e5e5e5;
}

.hover-3d-card {
  background: #141414;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.hover-3d-card:hover {
  box-shadow: 0 5px 20px 5px rgba(217, 119, 6, 0.15);
}

/* Section text */
.post-dark-section .CUSectionHeader_headerTitle__3L6Fk {
  color: #e5e5e5;
}

.post-dark-section .CUSectionHeader_headerDescription__2ZKpE {
  color: #737373;
}
```

**What stays the same:** Same 3D tilt effect, same JS mouse-follow interaction, same card content.

---

## 8. Pricing — Amber Border Glow

```css
.cta-final-card {
  background: #0a0a0a;
  box-shadow: inset 0 0 0 1px rgba(217, 119, 6, 0.3);
}

.cta-final-card .Btn_btn-primary__FF6_S {
  background: #d97706;
  color: #0a0a0a;
}

.cta-final-card .Btn_btn-primary__FF6_S:hover {
  background: #b45309;
}
```

**What stays the same:** Same card layout, same title, same dimensions.

---

## 9. CTA — Dark with Amber Counter

```css
.cta-vibe-section {
  background: #0a0a0a;
}

.CTAVibe_statsNumber__f58ZD {
  color: #fbbf24;
}

.CTAVibe_ctaInput__58Cdg {
  background: #141414;
  border-color: #2a2a2a;
  color: #e5e5e5;
}

.CTAVibe_ctaInput__58Cdg::placeholder {
  color: #525252;
}
```

**JS change (dot grid highlight color):** In the `<script>` block, find the dot grid highlight interval and change `'#DBE0E5'` to `'#d97706'`:

```js
// Find this line:
dot.style.backgroundColor = '#DBE0E5';
// Change to:
dot.style.backgroundColor = '#d97706';
```

**What stays the same:** Same counter logic, same dot grid animation timing, same layout.

---

## 10. Footer — Dark Theme

```css
.CuFooter_wrapper__u8bSx {
  background: #0a0a0a;
  border-top: 1px solid #1f1f1f;
}

.CuFooter_wrapper__u8bSx,
.CuFooter_copyright__uSihJ,
.CuFooter_legalLinks__GLY6J {
  color: #737373;
}

.CuFooter_copyright__uSihJ a,
.CuFooter_legalLinks__GLY6J a {
  color: #a0a0a0;
}

.CuFooter_copyright__uSihJ a:hover,
.CuFooter_legalLinks__GLY6J a:hover {
  background: #1a1a1a;
  color: #e5e5e5;
}
```

---

## 11. Global Typography Enhancement — Brutalist Monospace Eyebrows

Add monospace font to all section eyebrow/label elements for a techy, brutalist feel:

```css
.CUSectionHeader_headerEyebrow__1HtFf,
.AgentHeroPin_label__0z_2o,
.cap-eyebrow {
  font-family: 'Sometype Mono', monospace;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
```

---

## Summary

| What changes | What stays the same |
|---|---|
| All backgrounds (#fff → #0a0a0a) | All layouts and grids |
| All text colors (dark → light) | All spacing and padding |
| Accent color (purple → amber) | All animations and interactions |
| Border colors (light gray → dark gray) | All text content |
| Glow effects (orange → amber) | All images and media |
| Card surfaces (#fff → #141414) | All hover effects (same JS) |
| Eyebrow fonts → monospace | All section structure |

**Differentiation score: 8.5/10** — The most impactful single-axis change. Anyone comparing the two pages side by side would immediately perceive them as different products. Dark + amber reads as "premium developer tool" versus the original's "friendly consumer SaaS."
