# Website Audit - Issues & Improvements

## CRITICAL - Broken Elements

1. ~~**Broken images - Agent carousel cards**~~ - CHECKED: Files exist, was false positive from slow load
2. **Broken images - Integration pill icons**: ~~CDN icons fail~~ - FIXED: Replaced with inline colored dots
3. ~~**Broken image - flash.webp**~~ - CHECKED: File exists, false positive
4. ~~**Dead link - "Learn more"**~~ - FIXED: All dead links now open signup popup

## HIGH PRIORITY - UX/Animation Issues

5. ~~**Back to top not smooth**~~ - FIXED: Added `html { scroll-behavior: smooth }` to privacy/terms pages
6. ~~**No smooth scroll on nav links**~~ - FIXED: Added `scroll-behavior: smooth` to main page
7. ~~**Button hover states missing**~~ - FIXED: Added `transition` + `translateY(-1px)` hover to all buttons
8. **ROI counter only plays once** - LOW RISK: Acceptable behavior, replays on page reload
9. **Integration pill marquee not animating** - KNOWN: Astro strips CSS keyframes. JS injection attempted but user's browser doesn't play CSS animations. Needs further investigation.

## MEDIUM PRIORITY - Visual/Design Issues

10. ~~**Non-gray pill text color**~~ - FIXED: Updated to #888
11. **Capability tabs overflow on mobile** - External CSS layout issue, would need significant restructure
12. **Agent carousel overflow on mobile** - Expected behavior for horizontal carousel
13. **Feature icon videos may not autoplay on iOS** - Needs real device testing
14. ~~**INTEGRATIONS label color**~~ - Minor, nearly indistinguishable from gray

## LOW PRIORITY - Polish & Refinements

15. ~~**Button hover effects**~~ - FIXED: All buttons have smooth hover transitions
16. ~~**Agent carousel card hover**~~ - FIXED: Added lift effect on hover
17. ~~**Footer link hover**~~ - FIXED: Added underline on hover
18. ~~**Popup close button hover**~~ - FIXED: Color darkens on hover
19. ~~**Popup backdrop click**~~ - Already working via JS
20. **Privacy/Terms pages have no footer** - TODO
21. **Page transition animation** - Nice-to-have, complex to implement in static Astro
22. **CTA footer button too large on desktop** - User approved current size
23. **ROI arrow hover animation** - TODO
24. **Security card alignment** - Minor visual inconsistency
25. **Feature icon video loading state** - TODO: Add poster frame

## REMAINING TODO
- [ ] Add footer to privacy/terms pages
- [ ] ROI arrow hover animation
- [ ] Feature video poster frames
- [ ] Marquee animation fix (investigate browser-specific issue)
