# Variation 3: "Kinetic Flow" — Motion & Interaction Overhaul

> Same visual design, completely different feel. Every animation, transition, and interaction is replaced with spring physics, parallax depth, and micro-interactions. The page looks identical in a screenshot but feels like a different product to scroll through.

---

## Global Principle
Every change is a **motion/interaction swap** — colors, layouts, fonts, and content stay identical. Only how things move, react, and respond to the user changes.

---

## 1. Navigation — Scroll-Responsive Shrink

**Current:** Static pill that stays the same size regardless of scroll position.

**Change to:** Pill compresses vertically and becomes more opaque as user scrolls past 100px.

```css
/* Add transition for smooth shrink */
.CuNavigation_container__rChM8 {
  transition: padding 0.4s cubic-bezier(0.33, 1, 0.68, 1),
              background 0.4s ease;
}

/* Scrolled state */
.nav-scrolled .CuNavigation_container__rChM8 {
  padding: 8px 20px;
  background: rgba(255, 255, 255, 0.97);
}
```

**JS addition** (add to `<script>` block):

```js
// Scroll-responsive nav
const navContainer = document.querySelector('.CuNavigation_navigation__zryLb');
window.addEventListener('scroll', () => {
  navContainer.classList.toggle('nav-scrolled', window.scrollY > 100);
}, { passive: true });
```

**What stays the same:** Same pill shape, same links, same glassmorphic style.

---

## 2. Hero — Staggered Character Reveal + Parallax Depth

**Current:** Hero text appears instantly. Character image is sticky. No parallax depth.

**Change to:**
1. Each letter of "Super Agents" fades in and slides up individually with 30ms stagger
2. Character image moves at 0.8x scroll speed (parallax)
3. Background blur element moves at 0.5x scroll speed
4. Expandable tags use spring/elastic ease instead of CSS transition

**JS changes** (add to `<script>` block, after GSAP/ScrollTrigger init):

```js
// 1. Staggered character reveal
// First, wrap each character in the hero text in a <span>
const heroText = document.querySelector('.AgentHeroPin_heroText__RaQrp');
if (heroText) {
  const text = heroText.textContent;
  heroText.innerHTML = text.split('').map(char =>
    char === ' ' ? ' ' : `<span class="hero-char" style="display:inline-block;opacity:0;transform:translateY(60px)">${char}</span>`
  ).join('');

  gsap.to('.hero-char', {
    y: 0,
    opacity: 1,
    stagger: 0.03,
    duration: 0.6,
    ease: 'back.out(1.7)',
    delay: 0.3
  });
}

// 2. Parallax depth on scroll
const heroActor = document.querySelector('.AgentHeroPin_pinnedActor__8OP5G');
const heroBgBlur = document.querySelector('.AgentHeroPin_bgElementOne__nhw8c');

if (heroActor) {
  gsap.to(heroActor, {
    y: '20%',
    scrollTrigger: {
      trigger: '.AgentHeroPin_heroContainer__tLYIb',
      start: 'top top',
      end: 'bottom top',
      scrub: 0.5
    }
  });
}

if (heroBgBlur) {
  gsap.to(heroBgBlur, {
    y: '40%',
    scrollTrigger: {
      trigger: '.AgentHeroPin_heroContainer__tLYIb',
      start: 'top top',
      end: 'bottom top',
      scrub: 0.5
    }
  });
}

// 3. Elastic expandable tags
document.querySelectorAll('.ExpandableTag_tag__KET3r').forEach(tag => {
  tag.addEventListener('click', () => {
    if (tag.classList.contains('expanded')) {
      gsap.to(tag, { width: 'auto', padding: '8px 16px', duration: 0.4, ease: 'power2.out' });
    } else {
      gsap.to(tag, { width: 330, padding: '16px 20px', duration: 0.5, ease: 'elastic.out(1, 0.5)' });
    }
  });
});
```

**What stays the same:** Same layout, same content, same visual design, same colors.

---

## 3. Agent Carousel — CSS Scroll-Snap + Hover Tilt

**Current:** GSAP-powered drag with custom physics, wheel handling, and snap-to-grid.

**Change to:** Native CSS `scroll-snap` for natural momentum scrolling. Cards get a hover scale-up with slight rotation. Canvas effects only activate when cursor is near.

```css
.AgentCarousel_carouselTrack__YzKnk {
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  cursor: default;
}

.AgentCarousel_carouselTrack__YzKnk::-webkit-scrollbar {
  display: none;
}

.AgentCarousel_carouselCard__kfTd9 {
  scroll-snap-align: start;
  transition: transform 0.4s cubic-bezier(0.33, 1, 0.68, 1);
}

.AgentCarousel_carouselCard__kfTd9:hover {
  transform: scale(1.03) rotate(-0.5deg);
  z-index: 2;
}
```

**JS change:** Remove or guard the entire GSAP carousel drag block (lines ~196-291):

```js
const CAROUSEL_MODE = 'scroll-snap'; // Change to 'gsap' to revert
if (CAROUSEL_MODE !== 'scroll-snap') {
  // ... existing GSAP drag code ...
}

// Optional: proximity-based canvas activation
if (CAROUSEL_MODE === 'scroll-snap') {
  const cards = document.querySelectorAll('.AgentCarousel_carouselCard__kfTd9');
  document.addEventListener('mousemove', (e) => {
    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
      card.classList.toggle('canvas-active', dist < 300);
    });
  }, { passive: true });
}
```

**What stays the same:** Same cards, same visual design, same card content, same card colors.

---

## 4. Features — "Card Laid on Table" Scroll Effect

**Current:** Simple IntersectionObserver fade-in (opacity 0→1, translateY 40→0, transition 0.7s).

**Change to:** GSAP ScrollTrigger scrub with scale + rotation. Each feature card scales from 0.95→1.0, rotates from -0.5deg→0, and fades in — all linked to scroll position. Creates a satisfying "weight" as cards settle into place.

**JS change:** Replace the `revealObserver` IntersectionObserver block with:

```js
// Replace the simple fade-in with scrubbed "lay on table" effect
document.querySelectorAll('.feature-section, .last-feature-section').forEach(section => {
  gsap.from(section, {
    scale: 0.95,
    rotation: -0.5,
    opacity: 0,
    scrollTrigger: {
      trigger: section,
      start: 'top 85%',
      end: 'top 50%',
      scrub: 0.3
    }
  });

  // Delayed visual entrance: inner visual card animates 0.3s after container
  const visual = section.querySelector('.feature-right > div, .feature-visual');
  if (visual) {
    gsap.from(visual, {
      scale: 0.98,
      opacity: 0,
      scrollTrigger: {
        trigger: section,
        start: 'top 75%',
        end: 'top 45%',
        scrub: 0.3
      }
    });
  }
});
```

```css
.feature-section,
.last-feature-section {
  transform-origin: center bottom;
  will-change: transform, opacity;
}
```

**What stays the same:** Same grid layout, same content, same visual cards (SyncVisual, etc.).

---

## 5. Marquee/Reveal — Slide-Up Instead of Clip

**Current:** White marquee section clips away via `clipPath: inset(0 0 X% 0)` to reveal dark section underneath. Very distinctive effect.

**Change to:** White marquee section slides UP and off-screen at 1.5x scroll speed while dark section stays pinned. Creates a "peeling" effect. The reveal-flash becomes a horizontal sweep instead of vertical.

**JS change:** Replace the marquee reveal timeline (find the ScrollTrigger that does clipPath on marquee-section):

```js
// Replace clipPath reveal with slide-up
const revealContainer = document.querySelector('.reveal-container');
const marqueeSection = document.querySelector('.marquee-section');

if (revealContainer && marqueeSection) {
  // Remove old clipPath animation and replace with:
  gsap.to(marqueeSection, {
    yPercent: -120,
    ease: 'none',
    scrollTrigger: {
      trigger: revealContainer,
      start: 'top top',
      end: '+=100%',
      pin: true,
      scrub: 0.5
    }
  });

  // Horizontal flash wipe (left to right instead of top to bottom)
  const revealFlash = document.querySelector('.reveal-flash');
  if (revealFlash) {
    gsap.fromTo(revealFlash,
      { xPercent: -100 },
      {
        xPercent: 100,
        scrollTrigger: {
          trigger: revealContainer,
          start: 'top top',
          end: '+=100%',
          scrub: true
        }
      }
    );
  }
}
```

```css
.marquee-section {
  will-change: transform;
}

/* Override any clipPath styles */
.marquee-section {
  clip-path: none !important;
}
```

**What stays the same:** Same section content, same "white reveals dark" concept, same scroll distance.

---

## 6. Capabilities — Spring Transitions + Progress Indicator

**Current:** `gsap.set()` for instant opacity swap between capabilities. No transition animation.

**Change to:** Each capability media transition uses `scale(0.95→1) + opacity(0→1)` with a spring/back ease. Active capability item gets an animated progress bar that fills as the next switch approaches.

**JS change:** Modify the `switchCap` function:

```js
function switchCap(idx) {
  capItems.forEach((el, i) => el.classList.toggle('active', i === idx));

  capMedia.forEach((el, i) => {
    if (i === idx) {
      el.classList.add('active');
      gsap.fromTo(el,
        { scale: 0.95, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.4)' }
      );
    } else {
      el.classList.remove('active');
      gsap.set(el, { opacity: 0, scale: 0.95 });
    }
  });

  capDetails.forEach((el, i) => {
    if (i === idx) {
      el.classList.add('active');
      gsap.fromTo(el,
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.35, ease: 'power2.out', delay: 0.1 }
      );
    } else {
      el.classList.remove('active');
      gsap.set(el, { opacity: 0, pointerEvents: 'none' });
    }
  });

  capIdx = idx;
}
```

```css
/* Progress indicator on active cap item */
.cap-list-item {
  position: relative;
  overflow: hidden;
}

.cap-list-item::before {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 0;
  height: 2px;
  background: var(--secondary, #c490f4);
  transition: width 0.15s linear;
}

.cap-list-item.active::before {
  width: 100%;
  transition: width 3s linear; /* fills over ~3s before next cap switch */
}

/* Override instant transitions */
.cap-media {
  transform-origin: center center;
}
```

**What stays the same:** Same 3-column layout, same 7 capabilities, same content, same ScrollTrigger trigger.

---

## 7. Platform Cards — Elastic Bounce + Idle Float

**Current:** 3D tilt follows mouse. Instant reset on mouse leave.

**Change to:**
1. When mouse leaves, card wobbles back to rest with elastic ease (bouncy spring)
2. When not hovered, card gently floats up and down (6s infinite loop)

```css
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

.hover-3d-card {
  animation: float 6s ease-in-out infinite;
}

.hover-3d-card:hover {
  animation-play-state: paused; /* JS takes over transform on hover */
}
```

**JS change:** Modify the `mouseleave` handler for 3D cards:

```js
// Find the existing mouseleave handler and replace:
card.addEventListener('mouseleave', () => {
  // Instead of instant reset:
  gsap.to(card, {
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    duration: 0.8,
    ease: 'elastic.out(1, 0.5)',
    onComplete: () => {
      // Re-enable CSS float animation
      card.style.animationPlayState = 'running';
    }
  });
  // Fade out glow
  const glow = card.querySelector('.glow');
  if (glow) gsap.to(glow, { opacity: 0, duration: 0.3 });
});
```

**What stays the same:** Same card content, same visual design, same section layout.

---

## 8. Pricing — Scale Entrance + Word Stagger

**Current:** No entrance animation. Static card.

**Change to:** Card scales from 0.9→1.0 and fades in as it enters viewport. Title text does per-word stagger (each word slides up with 80ms delay).

**JS addition:**

```js
// Pricing entrance
const ctaCard = document.querySelector('.cta-final-card');
if (ctaCard) {
  gsap.from(ctaCard, {
    scale: 0.9,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.cta-final',
      start: 'top 80%'
    }
  });

  // Word-stagger the title
  const title = ctaCard.querySelector('h2, .cta-title');
  if (title) {
    const words = title.textContent.split(' ');
    title.innerHTML = words.map(w =>
      `<span style="display:inline-block;overflow:hidden"><span class="cta-word" style="display:inline-block">${w}</span></span> `
    ).join('');

    gsap.from('.cta-word', {
      y: '100%',
      stagger: 0.08,
      duration: 0.5,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.cta-final',
        start: 'top 80%'
      }
    });
  }
}
```

**What stays the same:** Same content, same layout, same colors.

---

## 9. CTA — Smooth Counter + Glowing Focus

**Current:** Counter increments in random jumps every 200-400ms. Input has no focus effect.

**Change to:** Counter uses smooth continuous GSAP tween. Input gets a glowing pulsing border on focus.

```css
.CTAVibe_ctaInput__58Cdg {
  transition: box-shadow 0.3s ease;
}

.CTAVibe_ctaInput__58Cdg:focus {
  box-shadow: 0 0 0 2px var(--secondary, #c490f4),
              0 0 20px rgba(196, 144, 244, 0.2);
  outline: none;
}
```

**JS change:** Replace the counter interval with a smooth tween:

```js
// Replace the setInterval counter with smooth GSAP tween:
const ctaCounter = document.querySelector('.CTAVibe_statsNumber__f58ZD');
if (ctaCounter) {
  const counterObj = { value: 10200000 };
  gsap.to(counterObj, {
    value: '+=1000',
    duration: 10,
    ease: 'none',
    repeat: -1,
    onUpdate: () => {
      ctaCounter.textContent = Math.floor(counterObj.value).toLocaleString();
    }
  });
}
```

**What stays the same:** Same layout, same dot grid.

---

## 10. Footer — Staggered Link Reveal

```js
// Footer link stagger
const footerLinks = document.querySelectorAll('.CuFooter_wrapper__u8bSx a');
if (footerLinks.length) {
  gsap.from(footerLinks, {
    y: 10,
    opacity: 0,
    stagger: 0.05,
    duration: 0.4,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.CuFooter_wrapper__u8bSx',
      start: 'top 90%'
    }
  });
}
```

**What stays the same:** Same content, same layout, same colors.

---

## 11. Global — Custom Cursor Follower

Add a signature interactive element: a 20px circle that follows the mouse with spring physics (lerp). Uses `mix-blend-mode: difference` for contrast on any background.

**HTML addition** (add after opening `<main>` tag):

```html
<div class="custom-cursor"></div>
```

**CSS:**

```css
.custom-cursor {
  position: fixed;
  top: 0;
  left: 0;
  width: 20px;
  height: 20px;
  background: var(--secondary, #c490f4);
  border-radius: 50%;
  mix-blend-mode: difference;
  pointer-events: none;
  z-index: 9999;
  opacity: 0;
  transition: opacity 0.3s ease;
}

body:hover .custom-cursor {
  opacity: 1;
}

/* Hide on mobile/touch */
@media (hover: none) {
  .custom-cursor { display: none; }
}
```

**JS:**

```js
// Spring-physics cursor follower
const cursor = document.querySelector('.custom-cursor');
if (cursor && window.matchMedia('(hover: hover)').matches) {
  let mx = 0, my = 0;
  let cx = 0, cy = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
  }, { passive: true });

  (function followCursor() {
    cx += (mx - cx) * 0.15;
    cy += (my - cy) * 0.15;
    cursor.style.transform = `translate(${cx - 10}px, ${cy - 10}px)`;
    requestAnimationFrame(followCursor);
  })();
}
```

---

## Summary

| What changes | What stays the same |
|---|---|
| Nav shrinks on scroll | All colors and palette |
| Hero text staggers in letter-by-letter | All layouts and grids |
| Hero has parallax depth layers | All fonts and typography |
| Carousel uses CSS scroll-snap (native) | All text content |
| Features use scrubbed scale+rotate reveal | All images and media |
| Marquee slides up instead of clips | All section structure |
| Capabilities use spring scale transitions | All card designs |
| Platform cards bounce elastically + float | All border/shadow styles |
| Pricing scales in with word stagger | Footer layout |
| CTA counter is smooth, input glows | |
| Custom cursor follows mouse everywhere | |

**Differentiation score: 8/10** — The page looks identical in a screenshot but feels completely different to interact with. The parallax hero, CSS scroll-snap carousel, slide-up reveal, spring card transitions, and elastic bounce-back create a distinct interactive personality that can't be confused with the original.
