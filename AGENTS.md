# UniPath Frontend Working Rules

Before changing frontend code, read these rules and apply them unless the user explicitly asks otherwise.

## Responsive Layout
- Design every page for desktop, tablet, and phone from the start.
- Verify common viewports: `1366x768`, `768x1024`, `390x844`, and `375x667`.
- Use `dvh`/`svh`-safe sizing for full-screen views so mobile browser chrome does not break the layout.
- Avoid body/page scroll on auth and other fixed-screen flows. If content cannot fit, compact or hide non-essential decorative content before adding any scroll container.
- Do not rely on one local monitor size. Use responsive constraints, breakpoints, and height-based media queries for dense forms.

## UI Quality
- Keep form labels, controls, and helper text aligned on a consistent baseline.
- Prefer compact, readable spacing over oversized cards when a screen contains forms.
- Avoid nested cards and decorative wrappers that reduce usable space.
- Buttons and inputs should keep stable heights across breakpoints and must not overlap nearby content.
- Use existing theme tokens and Tailwind utilities before adding new custom CSS.

## Verification
- Run `npm.cmd run lint` and `npm.cmd run build` from `FRONTEND` after frontend edits.
- For layout work, inspect the result in the in-app browser and check that there is no unintended body scrollbar.
- If a page intentionally uses an internal scroll area, document why in the final response.
