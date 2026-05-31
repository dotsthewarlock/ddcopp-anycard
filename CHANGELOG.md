# Changelog

## 2026-05-30

- Fixed a Bookmarklet regression where the external AnyCard page could be opened/focused but card/PIN values were not reliably passed into the form.
- Restored the proven clipboard → card field → PIN field → bubbling input events → delayed submit workflow when the Bookmarklet is executed on the external AnyCard loadcard page.
- Preserved normal named AnyCard tab/window reuse behavior and clarified that form filling only occurs when the Bookmarklet runs inside the external page context.
- Aligned JavaScript versioning and cache-busting at `V1.01.10`.
- Updated Card Link behavior to open/reuse `anycardTargetWindow` as a normal named browser tab/window rather than a popup-style window with sizing/position features.
- Preserved card/PIN clipboard copy behavior, Generated Cards List behavior, and completed/green Card Link tracking.
- Updated workflow instructions and Status Messages to direct users to run the Bookmarklet from the bookmarks bar while viewing `https://www.anycard.ca/swap/loadcard`.
- Removed user-facing guidance implying direct cross-origin fill/submit from the AnyCard application window.
- Aligned JavaScript versioning and cache-busting at `V1.01.09`.

## 2026-05-29

- Added project documentation files:
  - PROJECT_CONTEXT.md
  - PROJECT_HISTORY.md
  - PROJECT_HANDOFF.md
- Removed unused generated `anycard/` folder.
- Connected ChatGPT to the GitHub repository for assisted development.
- Confirmed project stack: static HTML, CSS, and JavaScript on GitHub Pages.