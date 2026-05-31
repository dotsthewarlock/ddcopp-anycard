# AnyCard Project History

## Purpose

## Major Decisions

- AnyCard now uses a named Target Window (`anycardTargetWindow`) so Generated Card Links and Bookmarklet workflows can attempt to reuse the same Popup Window.
- The original AnyCard Window may attempt to drive the Target Window through the Bookmarklet workflow, but browser same-origin security remains the source of truth.
- Because `anycard.ddcopp.com` and `www.anycard.ca` are different origins, direct cross-window DOM access may be blocked by browsers even when the Target Window is successfully reused.
- The supported fallback workflow is to run the Bookmarklet directly inside the Target Window when same-origin restrictions prevent remote filling.
- External-site automation architecture reviewed.
  - iframe-based integration is not considered a viable primary solution due to browser security restrictions and external-site embedding limitations.
  - Browser same-origin policy prevents reliable direct DOM control of `www.anycard.ca` from the AnyCard application origin.
  - The project will continue using a Bookmarklet-first automation strategy.
  - Future work should focus on improving Bookmarklet reliability and user workflow rather than pursuing iframe workarounds.
  - Backend/proxy/API solutions are intentionally avoided unless an official supported integration path becomes available.
- Adopted numbered AI workstream naming convention.
  - `Workflow AI# - <Workstream>`
  - `Dev AI# - <Feature or Implementation>`
  - `Ideas AI# - <Concept or Experiment>`
  - Numbering is never reused and improves traceability, auditing, and handoffs.
- Adopted role-specific handoff convention.
  - Workflow AI handoffs answer: "Where is the project?"
  - Dev AI handoffs answer: "What implementation work remains?"
  - Ideas AI handoffs answer: "What ideas should be explored next?"
  - Handoff content should match the purpose of the receiving AI role.
- Adopted timestamp cache-busting for CSS and JavaScript assets.
  - `index.html` loads `styles.css` and `app.js` with a live timestamp query value on every page load.
  - JS and CSS version numbers are informational only and no longer need to match cache-busting query strings.
  - `index.html` should not be edited solely for JS or CSS cache-busting when `app.js` or `styles.css` changes.
  - Rationale: AnyCard is a personal, low-traffic development project where reduced release friction is more valuable than long-lived browser caching for JS/CSS assets.
  - Rationale: Timestamp cache-busting eliminates release errors caused by version/cache-busting mismatch between `app.js`, `styles.css`, and `index.html`.
  - This preserves the static-site architecture and avoids introducing a build process.

## Features Implemented

## Known Issues

- Cross-origin browser restrictions may prevent the original AnyCard Window from directly filling the AnyCard Target Window.

## Future Ideas

## Lessons Learned

# Major Project Reviews
