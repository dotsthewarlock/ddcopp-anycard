# Changelog

## 2026-05-30

- Added named Target Window support so Generated Card Links open and reuse `anycardTargetWindow`.
- Updated the Bookmarklet workflow to attempt filling the Target Window from the original AnyCard Window before falling back to Target Window execution.
- Added Status Message guidance when browser same-origin security blocks direct Target Window DOM access.
- Confirmed generated-card persistence, Input Area persistence, and completed/green Card Link tracking behavior remain unchanged.
- Aligned bookmarklet workflow instructions with the new Target Window behavior.
- Aligned JavaScript versioning and cache-busting at `V1.01.08`.
- Added Clear Raw Data utility button for clearing only persisted Input Area data.
- Added Clear Generated Links utility button for clearing only persisted Generated Cards List data.
- Preserved completed/green Card Link tracking by leaving `anycard.processedCards.v1` untouched when clearing generated links.
- Polished utility-button layout so Generate Links remains visually primary while utility buttons use secondary styling, equal visual height, and non-wrapping text.
- Restored `styles.css` readability after compressed formatting cleanup.
- Added single-commit workflow guidance to `DEV_WORKFLOW.md`.
- Established preference for batching related code, versioning, cache-busting, changelog, history, and release-completion updates into one commit whenever safe.
- Added guidance to avoid unnecessary follow-up commit cycles and approval popups.
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
