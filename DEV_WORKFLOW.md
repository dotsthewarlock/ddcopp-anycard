# AnyCard Development Workflow

AnyCard uses two development modes: FAST and REV.

The assistant may choose the mode automatically unless the user explicitly specifies one.

## Startup Sync

Before deciding FAST or REV, perform a brief startup sync.

Review the current repository versions of:

- `PROJECT_CONTEXT.md`
- `DEV_WORKFLOW.md`

Use current repository documentation as the source of truth over prior chat context or memory.

This sync should be brief. Do not perform heavy analysis before deciding whether FAST or REV applies.

## Mode Keywords

If the user starts a request with `FAST`, use FAST Mode unless the request is unsafe or clearly risky.

If the user starts a request with `REV`, use REV Mode.

If the user does not specify a mode, choose automatically after Startup Sync.

## FAST Mode

Use FAST for small, low-risk changes.

Examples:

- text/copy edits
- CSS/layout tweaks
- small JavaScript behavior fixes
- version/cache-busting updates
- documentation updates
- small UI improvements

FAST rules:

1. Inspect only the relevant files.
2. Implement directly when the request is clear.
3. Do not ask for approval unless there is a real blocker, ambiguity, deployment risk, or data-loss risk.
4. Make the smallest safe change.
5. Complete mandatory release tasks in the same pass:
   - affected file version bump
   - cache-busting update
   - `CHANGELOG.md` update, when applicable
6. Do not leave required versioning, cache-busting, or changelog work for a follow-up cycle.
7. Bundle obvious required fixes, but do not include unrelated refactors or cleanup unless necessary.
8. Do not create avoidable follow-up cycles.
9. Prefer one complete commit per task. Batch related code, versioning, cache-busting, changelog, history, and required documentation updates into one commit whenever safe.
10. Do not create separate commits for release tasks that belong to the same requested change.
11. If a follow-up issue is discovered after implementation, do not immediately start another commit cycle unless it is urgent or blocking. Summarize the issue and ask whether to address it now or queue it for later.
12. After implementation, report only:
    - files changed
    - what changed
    - how to verify
    - deployment risks, if any

Default bias:

AnyCard is a small static HTML/CSS/JavaScript project. Prefer FAST for clear low-risk work.

## REV Mode

Use REV for slower, safer review.

Examples:

- larger feature design
- architecture changes
- refactors
- security-sensitive changes
- data-loss risk
- unclear requirements
- multiple competing implementation options
- changes involving external AnyCard workflow behavior

REV rules:

1. Do a quick triage first.
2. Before doing heavy review work, explain why REV may be needed.
3. Ask the user whether to proceed with FAST anyway or continue with REV.
4. If the user chooses REV:
   - inspect relevant files
   - explain current architecture briefly
   - identify options
   - recommend the smallest safe approach
   - flag risks before implementation
   - ask for implementation approval before changing files

## Automatic Mode Selection

When the user does not specify FAST or REV:

1. Perform Startup Sync.
2. If the change is clearly low-risk, proceed in FAST.
3. If the assistant is unsure or leans REV, pause before heavy work.
4. Explain the reason for considering REV.
5. Ask:

   “Proceed FAST anyway, or continue with REV?”

Do not spend significant time on REV analysis before asking.

## Documentation Check

Every implementation should end with an internal documentation check.

The assistant should decide whether each documentation file needs an update:

- `CHANGELOG.md`: update when a change is user-visible, behavior-changing, release-relevant, or affects versions/cache-busting.
- `PROJECT_HISTORY.md`: update when a durable decision, rationale, workflow choice, or tradeoff should be remembered by future AI/development sessions.
- `PROJECT_CONTEXT.md`: do not change silently. If current project facts, constraints, architecture, hosting, or workflow rules should change, propose the change and ask the user for review/approval first.

Documentation updates are part of release completion when they are required for the change.

For FAST work, complete required changelog/history updates in the same pass when they are clearly needed.

Do not create separate follow-up cycles for documentation that is required to complete the current change.

Do not over-document tiny internal changes. If no documentation updates are needed, state that briefly in the final report.

## Preference Learning

When the user chooses FAST or REV after being asked, treat that as feedback.

Use prior user decisions to better calibrate future mode selection:

- If the user repeatedly approves FAST for similar changes, bias toward FAST next time.
- If the user says a change should have been REV, bias toward REV for similar future changes.
- Preserve the user’s preference for lower friction unless safety or project risk justifies REV.

Use prior user feedback about documentation updates to better decide when `CHANGELOG.md`, `PROJECT_HISTORY.md`, or `PROJECT_CONTEXT.md` should be updated.

Use prior user feedback about approval popups and commit delays to minimize unnecessary write cycles and favor complete batched commits.

## Project Bias

AnyCard is intentionally simple:

- static HTML
- static CSS
- static JavaScript
- no backend
- no database
- no build process

Do not treat every small edit like a large software project.


### Terminology Rule

When discussing UI, documentation, bugs, enhancements, acceptance criteria, verification steps, or implementation plans, use the defined project terminology from `PROJECT_CONTEXT.md`.

If the user refers to an element using a generic description, map it to the appropriate project terminology and continue using the project terminology name.
