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

Major decisions and project evolution.

`PROJECT_HANDOFF.md`

Original project handoff and startup discussion archive.

`CHANGELOG.md`

Chronological record of completed changes.

## Current Project Status

Project setup complete.

Completed:

- GitHub repository connected to ChatGPT
- Repository indexing enabled
- Development workflow established
- FAST/REV workflow documented
- Documentation structure established
- Versioning policy established
- Cache-busting policy established
- `CHANGELOG.md` created

Current Focus:

- Improve usability and workflow efficiency
- Keep architecture simple
- Preserve static HTML/CSS/JS implementation
- Make small, safe, incremental improvements
- Avoid unnecessary complexity or framework adoption
- Reduce avoidable AI/dev workflow back-and-forth

## Development Principles

- Current repo documentation overrides stale chat context
- Perform brief startup sync before implementation
- Prefer the smallest safe change
- Prefer FAST for small low-risk changes
- Use REV only when risk, ambiguity, or structural impact justifies it
- Update only affected file versions
- Keep version numbers and cache-busting values synchronized
- Maintain `CHANGELOG.md`
- Preserve working functionality unless intentionally modifying it
- Do not split mandatory release tasks into unnecessary follow-up cycles
- Do not include unrelated refactors unless required for the requested change


## UI Terminology

Use these names as the canonical project vocabulary. When the user refers to UI elements using generic descriptions, interpret them as the corresponding project terminology and use the project terminology in responses, documentation, and implementation discussions.

### Input Area

Large textarea where card/PIN pairs are pasted.

### Generate Button

Button that creates Card Links from Input Area content.

### Generated Cards List

Output section displaying generated Card Links.

### Card Link

Individual generated card entry.

### AnyCard Window

Main AnyCard application page.

### Popup Window

Child window opened from AnyCard during workflow.

### Target Window

Retailer/gift-card page used with the Bookmarklet workflow.

### Bookmarklet

Browser bookmarklet used to automate card entry.

### Version Banner

Visible application version display.

### Status Message

User-facing informational or validation message.
