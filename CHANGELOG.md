# Changelog

## 2026-05-30

- Updated Card Link behavior to open/reuse `anycardTargetWindow` as a normal named browser tab/window rather than a popup-style window with sizing/position features.
- Preserved card/PIN clipboard copy behavior, Generated Cards List behavior, and completed/green Card Link tracking.
- Updated workflow instructions and Status Messages to direct users to run the Bookmarklet from the bookmarks bar while viewing `https://www.anycard.ca/swap/loadcard`.
- Removed user-facing guidance implying direct cross-origin fill/submit from the AnyCard application window.
- Aligned JavaScript versioning and cache-busting at `V1.01.09`.
- Renamed utility action label from `Clear Generated Links` to `Clear Gen Links`.
- Reduced the left panel from 340px to a more compact 300px while preserving side-by-side utility buttons.
- Preserved equal 44px button height across Generate Links, Clear Raw Data, and Clear Gen Links.
- Bumped CSS version/cache-busting to `V1.01.05` / `styles.css?v=1.01.05`.
- Added named Target Window support so Generated Card Links open and reuse `anycardTargetWindow`.
- Updated the Bookmarklet workflow to attempt filling the Target Window from the original AnyCard Window before falling back to Target Window execution.
- Added Status Message guidance when browser same-origin security blocks direct Target Window DOM access.
- Confirmed generated-card persistence, Input Area persistence, and completed/green Card Link tracking behavior remain unchanged.
- Aligned bookmarklet workflow instructions with the new Target Window behavior.
- Aligned JavaScript versioning and cache-busting at `V1.01.08`.

## 2026-05-29

- Added project documentation files:
  - PROJECT_CONTEXT.md
  - PROJECT_HISTORY.md
  - PROJECT_HANDOFF.md
- Removed unused generated `anycard/` folder.
- Connected ChatGPT to the GitHub repository for assisted development.
- Confirmed project stack: static HTML, CSS, and JavaScript on GitHub Pages.