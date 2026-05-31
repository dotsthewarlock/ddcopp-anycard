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

## AI Chat Naming Convention

AnyCard development uses role-based AI chat separation.

Chat types:

- Workflow AI
- Dev AI
- Ideas AI

Naming format:

- `Workflow AI# - <Workstream>`
- `Dev AI# - <Feature or Implementation>`
- `Ideas AI# - <Concept or Experiment>`

Rules:

- Numbers increment only when a new AI chat instance is created.
- Numbers are never reused.
- Retired chats retain their original number.
- Continue using an existing chat when work remains part of the same active workstream.
- Create a new numbered chat when starting a new implementation, workflow, or ideation stream.
- New Dev AI chats should always begin with `Dev AI# -`.
- New Workflow AI chats should always begin with `Workflow AI# -`.
- New Ideas AI chats should always begin with `Ideas AI# -`.

Purpose:

- Improve traceability of decisions.
- Simplify implementation audits.
- Improve handoffs between Workflow AI and Dev AI.
- Reduce confusion caused by unnamed or reused chats.

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

HTML, CSS, and JavaScript each maintain independent informational version numbers.

Increment only files that change.

Current workflow:

- `index.html` is the asset loader.
- `index.html` uses a live timestamp cache-busting value for `styles.css` and `app.js`.
- Each page load requests fresh CSS and JavaScript asset URLs.
- `app.js` displays its own informational JS version in the version box.
- `styles.css` exposes its informational CSS version via `--css-version`.
- JS/CSS version numbers no longer need to match cache-busting query strings.

When JavaScript changes:

- update the JS version in `app.js`
- update `CHANGELOG.md` when the change is user-visible, behavior-changing, or release-relevant
- do not update `index.html` solely for JS cache-busting

When CSS changes:

- update the CSS version in `styles.css`
- update `CHANGELOG.md` when the change is user-visible, behavior-changing, or release-relevant
- do not update `index.html` solely for CSS cache-busting

When HTML or loader behavior changes:

- update the HTML version displayed in `index.html`
- update `CHANGELOG.md` when the change is user-visible, behavior-changing, or release-relevant

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
