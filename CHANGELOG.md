# Changelog

## 2026-05-30

- Added documentation-check workflow guidance to `DEV_WORKFLOW.md`.
- Established documentation ownership rules:
  - AI may update `CHANGELOG.md` when changes are release-relevant.
  - AI may update `PROJECT_HISTORY.md` when durable decisions should be preserved.
  - AI must propose and obtain approval before changing `PROJECT_CONTEXT.md`.
- Added startup-sync and documentation-maintenance guidance to improve future AI development consistency.
- Added JavaScript cache-busting in `index.html` so `app.js` is loaded with a versioned query string derived from the AnyCard JS version.
- Documented the JavaScript cache-busting workflow in `PROJECT_CONTEXT.md`.
- Updated generated card row display to remove the visible right-hand value label and show only the value.

## 2026-05-29

- Added project documentation files:
  - PROJECT_CONTEXT.md
  - PROJECT_HISTORY.md
  - PROJECT_HANDOFF.md
- Removed unused generated `anycard/` folder.
- Connected ChatGPT to the GitHub repository for assisted development.
- Confirmed project stack: static HTML, CSS, and JavaScript on GitHub Pages.
