# Changelog

## 2026-05-30

- Released `V1.01.15`.
- Updated Bookmarklet to `AnyCard Fill v1.3`.
- Preserved the original known-good fill/submit workflow as the source of truth when executed on `https://www.anycard.ca/swap/loadcard`.
- Outside the external AnyCard page, the Bookmarklet now strictly opens/reuses `anycardTargetWindow`, attempts focus, and exits without cross-origin automation.
- Verified generated Bookmarklet output contains `split(/\s+/)`.
- Drag Bookmarklet, textarea Bookmarklet, and copied Bookmarklet all originate from the same `BOOKMARKLET_CODE` source.
- Users must replace/reinstall the saved Bookmarklet after updating to this release.
- Aligned JavaScript versioning and cache-busting at `V1.01.15`.

- Released `V1.01.14`.
- Updated Bookmarklet to `AnyCard Fill v1.2`.
- Bookmarklet now detects whether it is running on `https://www.anycard.ca/swap/loadcard`.
- When run outside the external AnyCard page, the Bookmarklet opens/focuses the named Target Window (`anycardTargetWindow`) and exits without attempting cross-origin automation.
- When run on the external AnyCard page, the original known-good fill/submit workflow is preserved.
- Verified generated Bookmarklet output still contains `split(/\s+/)`.
- Users must replace/reinstall the saved Bookmarklet after updating to this release.
- Aligned JavaScript versioning and cache-busting at `V1.01.14`.

## 2026-05-29

- Added project documentation files:
  - PROJECT_CONTEXT.md
  - PROJECT_HISTORY.md
  - PROJECT_HANDOFF.md
- Removed unused generated `anycard/` folder.
- Connected ChatGPT to the GitHub repository for assisted development.
- Confirmed project stack: static HTML, CSS, and JavaScript on GitHub Pages.