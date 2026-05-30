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

## Release Completion Requirements

Version and cache-busting alignment are blocking release requirements.

When a changed file depends on a version/cache-busting reference for users to receive the current code, that reference must be updated in the same implementation pass.

Examples:

- If `app.js` changes, update the JS version in `app.js` and the `ANYCARD_JS_VERSION` cache-busting value in `index.html` in the same commit.
- If `styles.css` changes, update `--css-version` in `styles.css` and the stylesheet cache-busting query string in `index.html` in the same commit.

Do not treat version/cache-busting mismatches as deferrable documentation cleanup.

Do not report an implementation as complete while a required version/cache-busting update is still pending.

A missing `CHANGELOG.md` entry may be caught up in a later implementation commit when necessary, but a version/cache-busting mismatch must be fixed immediately.

## Documentation Check

Every implementation should end with an internal documentation check.

The assistant should decide whether each documentation file needs an update:

- `CHANGELOG.md`: update when a change is user-visible, behavior-changing, release-relevant, or affects versions/cache-busting.
- `PROJECT_HISTORY.md`: update when a durable decision, rationale, workflow choice, or tradeoff should be remembered by future AI/development sessions.
- `PROJECT_CONTEXT.md`: do not change silently. If current project facts, constraints, architecture, hosting, or workflow rules should change, propose the change and ask the user for review/approval first.

Documentation updates are part of release completion when they are required for the change.

For FAST work, complete required changelog/history updates in the same pass when they are clearly needed.

Do not create separate follow-up cycles for documentation that is required to complete the current change.

If a required `CHANGELOG.md` entry is accidentally missed, acknowledge the miss and prefer catching it up in the next implementation commit instead of creating a changelog-only commit, unless the user explicitly asks for immediate correction.

Do not over-document tiny internal changes. If no documentation updates are needed, state that briefly in the final report.

## Long Chat and Handoff Hygiene

When an AI chat becomes long, sluggish, repetitive, or likely to accumulate stale assumptions, proactively tell the user that the chat may benefit from a fresh session.

This applies to Workflow AI, Dev AI, and Ideas AI.

If the user agrees to start fresh, provide a concise handoff prompt before ending the current session.

A handoff prompt should include:

- the AI role being handed off to
- the primary repository, if relevant
- current source-of-truth files to review
- current workflow rules or constraints that matter most
- any active task, blocker, or pending follow-up
- explicit instruction to perform Startup Sync before continuing

Do not overuse this suggestion. Use it when the conversation length or context drift is likely to reduce productivity.

## Handoff Closeout Signal

When any AnyCard AI is instructed to close up and hand off, it must first confirm that:

- required documentation is complete or explicitly noted as pending
- task handoff information is complete
- no known critical blocker exists
- no known release-blocking issue exists

Only after the AI is confident those conditions are met, its final response must end with the exact final line:

Goodbye World!

This requirement applies to Dev AI, Workflow AI, Ideas AI, and any future AnyCard AI roles that perform handoffs.

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


### Terminology Mapping Feedback

When the user uses a generic or informal UI description, map it to the defined project terminology from `PROJECT_CONTEXT.md`.

At the start of the response, briefly state the mapping when it affects implementation clarity.

Example:
- “Mapping ‘textbox where I paste codes’ → Input Area.”
- “Mapping ‘generated links’ → Generated Cards List.”
- “Mapping ‘popup’ → Popup Window.”

Keep this mapping feedback concise. Do not over-explain unless the mapping is ambiguous.
