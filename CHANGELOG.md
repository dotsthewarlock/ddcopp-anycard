# Changelog

## 2026-05-30

- Migrated project governance to timestamp cache-busting for CSS and JavaScript assets.
- `index.html` now serves as an asset loader using a live timestamp value rather than a manual JS/CSS cache-busting manifest.
- JS and CSS version numbers are now informational only.
- Eliminated the requirement for JS/CSS versions to match cache-busting query strings.
- Reduced release friction for the personal low-traffic project.
- Eliminated a class of release errors caused by version/cache-busting mismatches.

- Released `V1.01.16`.
- Updated Bookmarklet to `AnyCard Fill v1.4`.
- Fixed the Bookmarklet template-literal escaping so generated Bookmarklet output contains `split(/\s+/)` instead of the broken `split(/s+/)`.
- Improved external loadcard page detection so the Bookmarklet treats the base path, trailing slash, query string, and hash variants as the loadcard page.
- Preserved the original clipboard read, card/PIN split, field selectors, bubbling input events, delayed submit click, and Target Window open/focus behavior.
- Confirmed Generated Card Link behavior remains unchanged.
- Users must replace/reinstall the saved Bookmarklet after updating to this release.
- Aligned JavaScript versioning and cache-busting at `V1.01.16`.

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
