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

[content unchanged omitted for brevity in commit intent]

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

This requirement applies to Dev AI, Workflow AI, Ideas AI, Summary AI, and future AnyCard AI roles.
