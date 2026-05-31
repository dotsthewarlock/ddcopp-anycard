# Changelog

## 2026-05-30

- Released `V1.01.12`.
- Restored the Bookmarklet displayed by AnyCard to the original known-good production implementation.
- Removed cross-origin fill attempts from the supported workflow and reaffirmed the Bookmarklet-first architecture.
- Added Bookmarklet-specific versioning with visible UI display (`AnyCard Fill v1.0`).
- The drag-to-bookmarks-bar Bookmarklet label now reflects the Bookmarklet version/name.
- Added user guidance that Bookmarklets must be replaced/reinstalled when the Bookmarklet version changes.
- Aligned JavaScript versioning and cache-busting at `V1.01.12`.
- Restored the active external-page Bookmarklet branch to use the original known-good fill/submit implementation body without added status handling, selector changes, or alternate logic inside the fill path.
- Added tolerant loadcard-page detection while preserving the original clipboard read, field assignment, bubbling input events, and delayed submit behavior once running on the external page.
- Users must reinstall/update their browser Bookmarklet after this release before testing.
- Aligned JavaScript versioning and cache-busting at `V1.01.11`.
- Fixed a Bookmarklet regression where the external AnyCard page could be opened/focused but card/PIN values were not reliably passed into the form.
- Restored the proven clipboard → card field → PIN field → bubbling input events → delayed submit workflow when the Bookmarklet is executed on the external AnyCard loadcard page.
- Preserved normal named AnyCard tab/window reuse behavior and clarified that form filling only occurs when the Bookmarklet runs inside the external page context.
- Aligned JavaScript versioning and cache-busting at `V1.01.10`.

## 2026-05-29

- Added project documentation files:
  - PROJECT_CONTEXT.md
  - PROJECT_HISTORY.md
  - PROJECT_HANDOFF.md
- Removed unused generated `anycard/` folder.
- Connected ChatGPT to the GitHub repository for assisted development.
- Confirmed project stack: static HTML, CSS, and JavaScript on GitHub Pages.