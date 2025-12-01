# Frontend Collection - Code Review (UI/UX + Front-End)

## Scope
- Reviewed index.html, landing-style.css, landing-script.js.
- Focus: hero/projects/snippets experience, accessibility, performance, maintainability.

## Priority issues (fix first)
1) Broken project detail modals - Details buttons for wedding, webview, clevercow call showProjectModal but projectData has no entries, so modals do nothing (index.html:620,656,693; landing-script.js:435-437). Add projectData entries with demoUrl, features, tech.
2) Eager loading 33 live previews - All iframes set src immediately while lazy loader only watches iframe[data-src] (landing-script.js:822-836). This forces all demos to load on first paint, hurting LCP/TTI. Use data-src + loading="lazy" or posters with a Play action to load on demand.
3) Service worker 404 noise - Registers /sw.js but file is missing (landing-script.js:878-884). Remove registration or add a real worker.

## Accessibility
- Hover-only overlays hide actions from keyboard users; overlays only show on :hover (landing-style.css:311-327, 555-571). Add :focus-within styles and visible focus outlines so tabbing reveals controls.
- Icon-only controls lack labels: navbar toggler (index.html:35-36), back-to-top button (index.html:1653), footer social links (index.html:1642-1645). Add aria-label or visually hidden text.
- Motion-heavy experience (AOS, ripple, animated gradients) without prefers-reduced-motion guard. Gate animations/gradients when reduced motion is requested.

## UX and performance polish
- Filter controls are injected only after the first filter action (landing-script.js:961+); users do not see the filtering affordance on initial load. Consider rendering controls in HTML and keep selection in the URL (?category=) on load.
- Overlays block interaction with iframes until hover; ensure pointer-events toggle when actions are visible or prioritize the Live Demo button as the primary entry.
- External assets (Bootstrap, Font Awesome, Google Fonts) are loaded without SRI/fallbacks; add integrity + crossorigin or host locally for reliability.

## Code quality / maintainability
- Category strings are duplicated across cards and filters; centralize into a single enum to avoid drift.
- No asset cache busting/versioning for CSS/JS; add hashes or query params on deploys.
- No automated checks; add lint/format and accessibility smoke tests (axe, Lighthouse CI).

## Recommended fixes (order)
1. Add missing projectData entries for wedding, webview, clevercow; align demoUrl with iframe paths.
2. Switch previews to real lazy loading (data-src + loading="lazy"; optional poster) and let the IntersectionObserver swap to src when in view.
3. Add :focus-within overlay styles and ARIA labels for icon controls; re-run a keyboard-only pass.
4. Remove or implement the service worker registration; if keeping, add a basic sw.js offline shell.
5. Render filter controls by default and persist selected category via URL.
6. Add reduced-motion fallbacks and SRI/fallback handling for third-party assets.

## Quick test plan
- Keyboard-only: tab through nav, cards, overlays, and modals; verify focus is visible and actions work.
- Performance: Lighthouse mobile; confirm iframe lazy loading reduces LCP/TTI; check that sw.js 404 is gone.
- Accessibility: run axe-core; confirm labels and contrast on overlays/buttons.
