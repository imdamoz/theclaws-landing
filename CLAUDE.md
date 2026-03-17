# RULES — DO NOT IGNORE

## Before ANY code change:
1. Read the ORIGINAL reference file for the element being changed
2. Paste the exact original code/CSS into the conversation so the user can see it
3. Explain what the original does vs what ours does
4. State the EXACT change you will make (one change only)
5. Wait for approval before editing

## After ANY code change:
1. Build the project and confirm no errors
2. Do NOT say "check it" — explain what the user should see

## NEVER:
- Make multiple changes at once
- Guess CSS values
- Add !important overrides
- Touch files the user didn't ask about
- Move HTML elements around without showing the original structure first

## Visual changes — MANDATORY verification:
When making ANY visual/CSS change:
1. Use Playwright to take a BEFORE screenshot of the exact element being changed
2. Make the change
3. Use Playwright to take an AFTER screenshot of the same element
4. Compare both screenshots yourself — confirm the change looks correct
5. Only THEN tell the user it's done
6. If the screenshot doesn't look right, FIX IT before reporting back

## Copying elements between variation pages:
- We have variation pages (/variation-1 through /variation-7) with different designs
- When the user says "copy X from variation-Y to the main page":
  1. Screenshot the element on the variation page first to see exactly how it looks
  2. Find the CSS that makes it look that way (check the variation's `<style is:global>` block)
  3. Copy those exact CSS rules to the main page's `<style is:global>` block
  4. Screenshot the result on the main page to verify it matches
  5. Do NOT guess or write new CSS — copy what already works
