# Hero Animation Self-Review Checklist

Reference this after EVERY code change. Do NOT report to user until ALL checks pass.

## After EVERY change, verify with Playwright screenshots:

### Desktop (1280x800)
- [ ] Character (woman) centered in hero, visible head to waist
- [ ] 6 bubbles visible around character, not overlapping her face
- [ ] Warm beige glow centered behind character
- [ ] CTA text "A new era of humans, with AI Super Agents" visible, readable
- [ ] "Try Super Agents" + "Watch Intro" buttons visible
- [ ] Nav bar not overlapping hero content
- [ ] No horizontal overflow / scrollbar

### Animations (verify in headed browser)
- [ ] Bubbles float gently up/down (different speeds per bubble)
- [ ] Mouse movement causes character to shift subtly (parallax)
- [ ] Bubbles shift more than character (depth effect)
- [ ] Mouse leaving hero resets character + bubbles to center
- [ ] Scrolling: CTA + glow + bubbles fade out and move up
- [ ] Scrolling: character stays/carries into next section

### Tablet (1024x768)
- [ ] Character scales down, still centered
- [ ] Bubbles scale proportionally with character
- [ ] CTA text readable, not cut off

### iPad (768x1024)
- [ ] Hero fits in viewport
- [ ] Character and bubbles visible
- [ ] CTA below character, readable

### Mobile (375x812)
- [ ] Character fills most of width
- [ ] Bubbles visible but smaller
- [ ] CTA text readable (min 16px)
- [ ] No horizontal overflow

### Build
- [ ] `npx astro build` — zero errors
- [ ] No console errors in browser

## Rules:
1. After changes, screenshot at 1280, 1024, 768, 375 widths
2. If ANY check fails, fix before reporting
3. Never say "check it" — verify first
4. If scroll behavior breaks other sections, fix immediately
5. Keep iterating until ALL checks pass
