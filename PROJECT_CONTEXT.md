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
GitHub commit → GitHub Pages deployment → Cloudflare DNS → Live website

## Constraints
- Static website
- No React
- No Next.js
- No Node.js
- No build process
- No database
- No backend (unless added later)

## Important Files
- index.html
- styles.css
- app.js

## Notes
Make the smallest safe changes possible. Preserve existing functionality unless explicitly modifying it.

## Versioning and Cache Busting
HTML, CSS, and JavaScript each maintain independent version numbers.

When the JavaScript version is incremented, the `app.js` cache-busting query string must also change so Cloudflare and browsers request the latest JavaScript immediately instead of serving a cached copy.

Current workflow:
- `index.html` defines the JavaScript cache-busting version used to load `app.js`.
- `app.js` displays its own JS version in the version box.
- These values must match until a full single-source-of-truth version implementation is completed.

## Visibility
Repository is public. Live website is public.

## Repository Documentation

PROJECT_CONTEXT.md
Current project facts, stack, deployment, and constraints.

PROJECT_HISTORY.md
Major decisions and project evolution.

PROJECT_HANDOFF.md
Original project handoff and startup discussion archive.

CHANGELOG.md
Chronological record of completed changes.


## Current Project Status

Project setup complete.

Completed:

* GitHub repository connected to ChatGPT.
* Repository indexing enabled.
* Development workflow established.
* Documentation structure established.
* Versioning policy established.
* CHANGELOG.md created.

Current Focus:

* Improve usability and workflow efficiency.
* Keep architecture simple.
* Preserve static HTML/CSS/JS implementation.
* Make small, safe, incremental improvements.
* Avoid unnecessary complexity or framework adoption.

Development Principles:

* Analyze before coding.
* Prefer the smallest safe change.
* Update only affected file versions.
* Maintain CHANGELOG.md.
* Preserve working functionality unless intentionally modifying it.
