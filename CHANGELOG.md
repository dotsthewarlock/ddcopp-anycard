# Changelog

## 2026-05-30

- Released `V1.01.14`.
- Updated Bookmarklet to `AnyCard Fill v1.2`.
- Bookmarklet now detects whether it is running on `https://www.anycard.ca/swap/loadcard`.
- When run outside the external AnyCard page, the Bookmarklet opens/focuses the named Target Window (`anycardTargetWindow`) and exits without attempting cross-origin automation.
- When run on the external AnyCard page, the original known-good fill/submit workflow is preserved.
- Verified generated Bookmarklet output still contains `split(/\s+/)`.
- Users must replace/reinstall the saved Bookmarklet after updating to this release.
- Aligned JavaScript versioning and cache-busting at `V1.01.14`.
- Released `V1.01.13`.
- Fixed Bookmarklet regex escaping inside the JavaScript template literal.
- The generated Bookmarklet now correctly contains `split(/\s+/)` instead of a malformed regex.
- Preserved the original known-good Bookmarklet behavior, selectors, input events, and delayed submit logic.
- Updated Bookmarklet version to `AnyCard Fill v1.1`.
- Users must replace/reinstall the saved Bookmarklet after updating to this release.
- Aligned JavaScript versioning and cache-busting at `V1.01.13`.
- Released `V1.01.12`.
- Restored the Bookmarklet displayed by AnyCard to the original known-good production implementation.
- Removed cross-origin fill attempts from the supported workflow and reaffirmed the Bookmarklet-first architecture.
- Added Bookmarklet-specific versioning with visible UI display (`AnyCard Fill v1.0`).
- The drag-to-bookmarks-bar Bookmarklet label now reflects the Bookmarklet version/name.
- Added user guidance that Bookmarklets must be replaced/reinstalled when the Bookmarklet version changes.
- Aligned JavaScript versioning and cache-busting at `V1.01.12`.

## 2026-05-29

- Added project documentation files:
  - PROJECT_CONTEXT.md
  - PROJECT_HISTORY.md
  - PROJECT_HANDOFF.md
- Removed unused generated `anycard/` folder.
- Connected ChatGPT to the GitHub repository for assisted development.
- Confirmed project stack: static HTML, CSS, and JavaScript on GitHub Pages.
