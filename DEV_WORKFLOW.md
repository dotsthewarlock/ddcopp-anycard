# AnyCard Development Workflow

AnyCard uses two development modes: FAST and REV.

The assistant may choose the mode automatically unless the user explicitly specifies one.

## Mode Keywords

If the user starts a request with `FAST`, use FAST Mode unless the request is unsafe or clearly risky.

If the user starts a request with `REV`, use REV Mode.

If the user does not specify a mode, choose automatically.

## FAST Mode

Use FAST for small, low-risk changes.

Examples:

* text/copy edits
* CSS/layout tweaks
* small JavaScript behavior fixes
* version/cache-busting updates
* documentation updates
* small UI improvements

FAST rules:

1. Inspect only the relevant files.
2. Implement directly when the request is clear.
3. Do not ask for approval unless there is a real blocker, ambiguity, deployment risk, or data-loss risk.
4. Make the smallest safe change.
5. Bundle obvious adjacent fixes in the same pass.
6. Update affected file versions automatically.
7. Update cache-busting automatically when JS or CSS changes.
8. Do not create avoidable follow-up cycles.
9. After implementation, report only:

   * files changed
   * what changed
   * how to verify
   * deployment risks, if any

Default bias:
AnyCard is a small static HTML/CSS/JavaScript project. Prefer FAST for clear low-risk work.

## REV Mode

Use REV for slower, safer review.

Examples:

* larger feature design
* architecture changes
* refactors
* security-sensitive changes
* data-loss risk
* unclear requirements
* multiple competing implementation options
* changes involving external AnyCard workflow behavior

REV rules:

1. Do a quick triage first.
2. Before doing heavy review work, explain why REV may be needed.
3. Ask the user whether to proceed with FAST anyway or continue with REV.
4. If the user chooses REV:

   * inspect relevant files
   * explain current architecture briefly
   * identify options
   * recommend the smallest safe approach
   * flag risks before implementation
   * ask for implementation approval before changing files

## Automatic Mode Selection

When the user does not specify FAST or REV:

1. If the change is clearly low-risk, proceed in FAST.
2. If the assistant is unsure or leans REV, pause before heavy work.
3. Explain the reason for considering REV.
4. Ask:

   “Proceed FAST anyway, or continue with REV?”

Do not spend significant time on REV analysis before asking.

## Preference Learning

When the user chooses FAST or REV after being asked, treat that as feedback.

Use prior user decisions to better calibrate future mode selection:

* If the user repeatedly approves FAST for similar changes, bias toward FAST next time.
* If the user says a change should have been REV, bias toward REV for similar future changes.
* Preserve the user’s preference for lower friction unless safety or project risk justifies REV.

## Project Bias

AnyCard is intentionally simple:

* static HTML
* static CSS
* static JavaScript
* no backend
* no database
* no build process

Do not treat every small edit like a large software project.
