# PROJECT_CONTEXT

## Repository

dotsthewarlock/ddcopp-anycard

## Live Site

https://anycard.ddcopp.com/

## Stack

- HTML
- CSS
- JavaScript

## Hosting

GitHub Pages

## Domain

- Registrar: Porkbun
- DNS: Cloudflare

## Deployment Flow

GitHub commit → GitHub Pages deployment → Cloudflare DNS/cache → Live website

## Constraints

- Static website
- No React
- No Next.js
- No Node.js
- No build process
- No database
- No backend unless explicitly added later
- Preserve simple Chromebook/GitHub-first workflow

## External Site Integration

AnyCard interacts with the external AnyCard loadcard workflow hosted on `www.anycard.ca`.

Current automation strategy:

- AnyCard opens the external loadcard page in a Popup Window / Target Window.
- Automation is performed through a Bookmarklet that executes within the external page context.
- The Bookmarklet is the primary supported automation mechanism.

Browser constraints:

- The external AnyCard page cannot be assumed to be embeddable in an iframe.
- Browser same-origin security restrictions prevent direct DOM manipulation of `www.anycard.ca` from `anycard.ddcopp.com`.
- Automation that interacts with the external page must execute within the external page context.

Architecture guidance:

- Prefer improving the Bookmarklet workflow rather than pursuing iframe-based solutions.
- Avoid backend, proxy, or API-based automation unless an official supported integration becomes available.
- Preserve GitHub Pages compatibility and the static-site architecture.

## Development Workflow

Use `DEV_WORKFLOW.md`.

The assistant may auto-select FAST or REV mode unless the user explicitly specifies a mode.

Bias toward FAST for small, low-risk AnyCard changes.

Before implementation, perform a brief startup sync by reviewing:

- `PROJECT_CONTEXT.md`
- `DEV_WORKFLOW.md`

Use current repository documentation as the source of truth over prior chat context or memory.

The startup sync should be brief. Do not perform heavy REV analysis before confirming whether FAST or REV applies.

## Important Files

- `index.html`
- `styles.css`
- `app.js`
- `DEV_WORKFLOW.md`
- `PROJECT_HISTORY.md`
- `PROJECT_HANDOFF.md`
- `CHANGELOG.md`

## JavaScript File Policy

AnyCard is intentionally a simple static site. JavaScript work should default to the existing `app.js` file.

Do not create new JavaScript files unless the user explicitly authorizes it.

If a new JavaScript file appears mission-critical, pause and request permission before creating it.

If an unauthorized JavaScript helper file is created, the preferred correction is to fold useful logic back into `app.js` and remove the helper file.

## Notes

Make the smallest safe changes possible.

Preserve existing functionality unless intentionally modifying it.

For small requested changes, prefer implementation over extended discussion.

Avoid unnecessary follow-up cycles.

## Versioning and Cache Busting

HTML, CSS, and JavaScript each maintain independent version numbers.

Increment only files that change.

When JavaScript changes:

- update the JS version in `app.js`
- update the JavaScript cache-busting version in `index.html`
- ensure both values match
- update `CHANGELOG.md`

When CSS changes:

- update the CSS version in `styles.css`
- update the CSS cache-busting query string in `index.html`
- update `CHANGELOG.md`

Current workflow:

- `index.html` defines cache-busting versions used to load CSS and JS.
- `app.js` displays its own JS version in the version box.
- `styles.css` exposes its CSS version via `--css-version`.
- Matching version/cache-busting values are required until a full single-source-of-truth version implementation is completed.

## Visibility

Repository is public.

Live website is public.

## Repository Documentation

`PROJECT_CONTEXT.md`

Current project facts, stack, deployment, constraints, workflow, and repo-level instructions.

`DEV_WORKFLOW.md`

FAST/REV development workflow rules and mode-selection guidance.

`PROJECT_HISTORY.md`

Durable project decisions and long-term rationale.

`PROJECT_HANDOFF.md`

Historical handoff notes. Verify against current code before trusting implementation status.

`CHANGELOG.md`

Release-relevant change history.