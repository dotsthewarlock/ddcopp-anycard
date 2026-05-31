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

## AI Chat Activation Protocol

AnyCard development uses named AI chats to preserve role clarity, workstream continuity, and handoff quality.

Activation applies when starting a new AnyCard AI chat from:

- a formal `handoff`
- a Workflow AI brief
- an Ideas AI brief
- a Dev AI implementation prompt
- any other copy-ready prompt intended to start a new AnyCard AI session

### Chat Naming Signal

The copy-ready activation prompt should begin with the exact desired chat name as line 1.

Examples:

- `Workflow AI5 - Project Coordination`
- `Dev AI5 - Bookmarklet Verification`
- `Ideas AI3 - Popup Workflow Experiments`

The prompt should then repeat:

`Use this exact chat name if ChatGPT allows renaming: <chat name>`

The role sentence should also repeat the same name:

`You are <chat name> for AnyCard.`

This does not guarantee ChatGPT's auto-title will preserve the name. Manual rename remains the reliable fallback when the generated chat title does not match the desired convention.

### Activation Confirmation

At the beginning of a new AnyCard AI chat, the AI should briefly confirm:

- the role and intended chat name
- whether it is acting as Workflow AI, Dev AI, Ideas AI, Summary AI, or another defined role
- the source-of-truth files it will review
- whether the current posture is discussion-only, FAST, REV, or pending mode selection

This confirmation should be concise and should not replace Startup Sync.

### Activation Startup Requirement

After activation confirmation, the AI must perform Startup Sync before implementation or substantive project decisions.

Repository documentation remains source of truth over:

- prior chat memory
- handoff summaries
- copied prompts
- assumptions from older AI sessions

### Activation Prompt Shape

A preferred activation prompt shape is:

```text
<Exact AI chat name>

Use this exact chat name if ChatGPT allows renaming: <Exact AI chat name>

You are <Exact AI chat name> for AnyCard.

Repository:
dotsthewarlock/ddcopp-anycard

Perform Startup Sync first:
1. Review PROJECT_CONTEXT.md
2. Review DEV_WORKFLOW.md
3. Review PROJECT_HISTORY.md, if relevant to the handoff or workstream

Treat repository documentation as source of truth over chat memory.

<role-specific context, active task, blockers, risks, and recommended next action>
```

### Governance Compliance Verification

Governance checks should test actual response behavior, not only whether the AI can describe the rules.

A useful harmless test is to ask for a substantive AnyCard project status update and verify that the response:

- includes a concise summary or outcome note near the top
- ends with exactly one final `Outcome: <status> — <reason>` line when the response is substantive
- has nothing after the final `Outcome:` line
- does not invent rules that conflict with repository documentation
- treats repository documentation as source of truth over chat memory

Avoid treating a simple "yes, I understand" governance answer as proof of compliance.

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
   - affected informational file version bump, when applicable
   - `CHANGELOG.md` update, when applicable
6. Do not leave required versioning or changelog work for a follow-up cycle.
7. Bundle obvious required fixes, but do not include unrelated refactors or cleanup unless necessary.
8. Do not create avoidable follow-up cycles.
9. Prefer one complete commit per task. Batch related code, versioning, changelog, history, and required documentation updates into one commit whenever safe.
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

   "Proceed FAST anyway, or continue with REV?"

Do not spend significant time on REV analysis before asking.

## Release Completion Requirements

HTML, CSS, and JavaScript maintain independent informational version tracks. Do not expect the HTML, CSS, and JavaScript version numbers to match each other.

`index.html` uses live timestamp cache-busting for `styles.css` and `app.js` on every page load.

Timestamp cache-busting means:

- CSS and JavaScript asset URLs are refreshed automatically on every page load.
- JS and CSS version numbers are informational only.
- JS and CSS version numbers do not need to match cache-busting query strings.
- `index.html` is the asset loader, not a manual JS/CSS version manifest.
- Do not edit `index.html` solely to update JS or CSS cache-busting values.

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

Do not report an implementation as incomplete or release-blocked solely because a JS/CSS informational version number differs from an `index.html` cache-busting query value.

## Documentation Check

Every implementation should end with an internal documentation check.

The assistant should decide whether each documentation file needs an update:

- `CHANGELOG.md`: update when a change is user-visible, behavior-changing, release-relevant, or affects versioning/cache-busting policy.
- `PROJECT_HISTORY.md`: update when a durable decision, rationale, workflow choice, or tradeoff should be remembered by future AI/development sessions.
- `PROJECT_CONTEXT.md`: do not change silently. If current project facts, constraints, architecture, hosting, or workflow rules should change, propose the change and ask the user for review/approval first.

Documentation updates are part of release completion when they are required for the change.

For FAST work, complete required changelog/history updates in the same pass when they are clearly needed.

Do not create separate follow-up cycles for documentation that is required to complete the current change.

If a required `CHANGELOG.md` entry is accidentally missed, acknowledge the miss and prefer catching it up in the next implementation commit instead of creating a changelog-only commit, unless the user explicitly asks for immediate correction.

Do not over-document tiny internal changes. If no documentation updates are needed, state that briefly in the final report.

## Response Outcome Notes

For every substantive AnyCard response, include a concise outcome note near the top.

Additionally, every substantive response from Workflow AI, Dev AI, Ideas AI, Summary AI, or future AnyCard AI roles must end with a single final line in the format:

`Outcome: <success | partial | blocked | failed | pending> — <short reason>`

Rules:

- The outcome line must be the final line of the response.
- Keep it to a single concise sentence.
- Do not bury blockers inside the response body.
- Use plain status language.
- Very short conversational replies may omit the requirement when it would add noise.

This applies to Dev AI, Workflow AI, Ideas AI, Summary AI, and future AnyCard AI roles.

## Fresh Session Alert Criteria

An AnyCard AI should suggest a fresh session when two or more of the following are true:

- multiple implementation tasks or commit cycles have been completed in the current chat
- the AI is relying on chat memory more than current repository documentation
- stale assumptions, contradictions, or repeated corrections have occurred
- the conversation has become long, sluggish, repetitive, or difficult to navigate
- a workflow rule, documentation rule, or source-of-truth file changed during the current chat
- the current task is complete and a substantially different task is about to begin
- tool failures, recovery work, or context confusion have accumulated
- unresolved follow-ups would benefit from a clean handoff

Guidance:

- Soft alert: approximately 75-100 messages or 3-5 completed implementation cycles
- Strong alert: approximately 150+ messages, significant context drift, or major workflow/documentation updates

Chat length alone is not sufficient. The primary trigger is context health and risk of stale assumptions.

## Long Chat and Handoff Hygiene

When an AI chat becomes long, sluggish, repetitive, or likely to accumulate stale assumptions, proactively tell the user that the chat may benefit from a fresh session.

This applies to Workflow AI, Dev AI, and Ideas AI.

If the user agrees to start fresh, provide a concise handoff prompt before ending the current session.

A handoff prompt should include:

- the exact desired next chat name as line 1
- instruction to use the exact chat name if ChatGPT allows renaming
- the next AI role sentence using the same exact chat name
- the AI role being handed off to
- the primary repository, if relevant
- current source-of-truth files to review
- current workflow rules or constraints that matter most
- any active task, blocker, or pending follow-up
- explicit instruction to perform Startup Sync before continuing

Do not overuse this suggestion. Use it when the conversation length or context drift is likely to reduce productivity.

## Handoff Command

When the user says `handoff`, treat it as a formal request to close the current AI session and prepare a new AI instance.

Before writing the handoff prompt, the current AI must:

1. Identify whether any unfinished task is suitable for the next AI.
2. Complete any unfinished work that is not suitable for the next AI, if it can be completed safely in the current session.
3. Confirm required documentation is complete or explicitly identify documentation still pending.
4. Confirm there is no known critical blocker.
5. Confirm there is no known release-blocking issue.
6. If blockers or unfinished work remain, state them clearly in the handoff.

The handoff response must include a copy-ready prompt for the next AI.

The copy-ready handoff prompt must begin with the exact recommended next chat name as line 1.

The handoff prompt should repeat:

`Use this exact chat name if ChatGPT allows renaming: <chat name>`

The next AI role sentence should also use the same name:

`You are <chat name> for AnyCard.`

The handoff prompt should include:

- next AI role and suggested chat name using the project naming convention
- repository name
- current source-of-truth files to review
- instruction to perform Startup Sync before continuing
- current workflow rules or constraints that matter most
- active task, if any
- open blockers, risks, or pending follow-ups
- recent durable decisions that affect the next task
- first recommended action for the next AI

Use `handoff` as the preferred short command. Treat longer requests such as `prepare for handoff`, `close this AI`, or `start a new Workflow AI` as equivalent.

### Role-Specific Handoff Focus

Workflow AI handoff answers: "Where is the project?"

Workflow AI handoffs should focus on:

- project status
- durable decisions
- active workstreams
- priorities
- governance or workflow changes
- open risks
- recommended next AI roles or sessions

Workflow AI handoffs should avoid centering the handoff around a single implementation bug unless that bug is release-blocking.

Dev AI handoff answers: "What implementation work remains?"

Dev AI handoffs should focus on:

- files changed or likely to change
- implementation state
- acceptance criteria
- verification status
- blockers
- version/cache state
- release risks
- recommended next implementation step

Dev AI handoffs should avoid broad product discussion or unrelated workstreams.

Ideas AI handoff answers: "What ideas should be explored next?"

Ideas AI handoffs should focus on:

- concepts explored
- concepts rejected
- concepts deferred
- promising opportunities
- assumptions needing validation
- open product, workflow, or UX questions
- recommended next experiments or Dev AI briefs

Ideas AI handoffs should avoid code-level debugging, commit history, and detailed release/versioning information unless directly relevant to the idea being handed off.

When choosing the next AI role, match the handoff content to the next AI purpose:

- Use Workflow AI for governance, project state, prioritization, and coordination.
- Use Dev AI for implementation, debugging, verification, and release work.
- Use Ideas AI for exploration, product concepts, UX options, and experiments.

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
- Preserve the user's preference for lower friction unless safety or project risk justifies REV.

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
- "Mapping 'textbox where I paste codes' -> Input Area."
- "Mapping 'generated links' -> Generated Cards List."
- "Mapping 'popup' -> Popup Window."

Keep this mapping feedback concise. Do not over-explain unless the mapping is ambiguous.
