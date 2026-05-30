# AnyCard Workspace – Project Handoff

## Purpose

AnyCard Workspace is a lightweight browser-based workflow tool designed to accelerate manual processing of AnyCard load operations.

The tool allows users to:

1. Paste batches of card numbers and PINs.
2. Generate actionable card entries.
3. Click an entry to:

   * Copy the card + PIN to the clipboard.
   * Open the AnyCard load page in a dedicated popup window.
4. Execute a bookmarklet that:

   * Reads the clipboard contents.
   * Auto-fills the AnyCard form.
   * Submits the form automatically.

The solution is optimized for Chromebook use and requires no local software installation.

---

# Architecture

## Hosting

### Source Control

GitHub Repository

* Stores all project files.
* Primary editing and deployment workflow.
* Changes are committed directly through GitHub's web interface.

### Hosting

Cloudflare Pages

* Connected directly to the GitHub repository.
* Automatic deployment on commit.
* Custom domain attached:

```text
https://anycard.ddcopp.com
```

---

## File Structure

```text
index.html
app.js
styles.css
```

### index.html

Responsible for:

* Layout
* UI structure
* Version display
* Instructions panel
* Bookmarklet section
* Input areas

### app.js

Responsible for:

* Card parsing
* Link generation
* Clipboard operations
* Popup creation
* Bookmarklet management
* Status updates
* Click tracking
* Version reporting

### styles.css

Responsible for:

* Layout
* Dark theme styling
* Card appearance
* Scrollable containers
* Version panel styling
* Highlight states

---

# Versioning System

Each file maintains an independent version number.

Format:

```text
V1.00.01
```

Examples:

```text
HTML V1.00.02
JS   V1.00.03
CSS  V1.00.05
```

Rules:

* Increment only the file that changes.
* Do not synchronize versions.
* Do not increment unchanged files.

Purpose:

* Verify deployment status.
* Identify stale caches.
* Confirm which file version is currently loaded.

Version information is displayed in the UI.

---

# Features Implemented

## Card + PIN Input

Input format:

```text
1249991700000000001 0001
1249991700000000002 0002
1249991700000000003 0003
```

One card per line.

---

## Generate Links

Converts raw input into clickable card entries.

Displays:

```text
<Card Number>     PIN: ####
```

Single-line compact format.

---

## Clipboard Integration

Clicking a generated card:

1. Copies:

```text
<Card Number> <PIN>
```

to clipboard.

2. Opens AnyCard load page.

---

## Dedicated AnyCard Popup

Card clicks open:

```text
https://www.anycard.ca/swap/loadcard
```

inside a dedicated popup window.

The popup is:

* Reused between clicks.
* Positioned on the right side of the screen.
* Intended to leave the workspace visible on the left.

---

## Bookmarklet Integration

Workspace provides:

### Drag-to-bookmarks Link

Users drag the bookmarklet directly to the bookmarks bar.

### Backup Copy Button

Copies raw bookmarklet code to clipboard.

---

## Auto-Fill Bookmarklet

Bookmarklet:

1. Reads clipboard contents.
2. Splits card and PIN.
3. Locates AnyCard form fields.
4. Populates values.
5. Triggers input events.
6. Finds Submit Card Info button.
7. Clicks submit automatically.

---

## Generated Card Counter

Displays:

```text
Generated Cards (X)
```

where X equals the number of generated entries.

---

## Scrollable Generated Cards Area

Generated cards are displayed inside a fixed-height scrollable container.

Benefits:

* Input area remains visible.
* Large batches remain manageable.

---

## Persistent Click Tracking

Clicked cards are stored using:

```javascript
localStorage
```

Tracking survives:

* Page refreshes
* Browser restarts
* Deployments

---

## Visual Completion Tracking

Previously clicked cards can be highlighted.

Default:

```text
Green = Processed
```

---

## Highlight Toggle

Users can disable completion highlighting via checkbox.

Purpose:

* Keep processing history.
* Hide visual highlighting when desired.

Preference persists through localStorage.

---

# Important Design Decisions

## Chromebook-First Workflow

The project is intentionally designed around Chromebook constraints.

Avoided:

* Browser extensions
* Local applications
* Desktop automation tools
* Native executables

Preferred:

* Cloud-hosted solution
* Bookmarklets
* Clipboard-based automation

---

## Separation of Concerns

HTML, JS, and CSS are maintained independently.

Benefits:

* Smaller edits.
* Easier version tracking.
* Faster updates.
* Cleaner maintenance.

---

## GitHub-Centric Deployment

Deployment model:

```text
Edit → Commit → Cloudflare Deploy
```

No local development environment required.

---

## Cross-Origin Restrictions

The workspace intentionally does not attempt to directly manipulate AnyCard pages.

Reason:

Browser Same-Origin Policy prevents:

* Cross-domain DOM access
* Cross-domain iframe automation
* Remote form manipulation

The bookmarklet approach was chosen because it executes inside the AnyCard page itself.

---

# Known Issues

## Cloudflare Propagation Delay

Updates may take a short period before appearing on the live site.

Version display exists specifically to verify deployed file versions.

---

## Browser Caching

CSS and JS may occasionally remain cached after deployment.

Version query strings are used for cache busting when necessary.

---

## Bookmarklet Dependency

The final auto-fill operation still requires the user to click the bookmarklet once inside the AnyCard page.

Current browser security models prevent automatic execution of bookmarklets from another domain.

---

# Future Improvements

## Compact Card Density

Further reduce vertical spacing to fit more cards on screen.

---

## Search / Filter

Allow filtering generated cards by:

* Card number
* PIN
* Status

---

## Batch Statistics

Display:

```text
Total cards
Completed cards
Remaining cards
Completion %
```

---

## Export Functionality

Export generated entries as:

* CSV
* TXT

---

## Undo Completion

Allow users to mark cards as:

```text
Completed
Not Completed
```

without deleting history.

---

## Completion Timestamp

Store:

```text
Card
PIN
Completion Time
```

inside localStorage.

---

## Multi-Workspace Profiles

Support multiple vendor workflows with:

* Different target URLs
* Different bookmarklets
* Different processing rules

while sharing the same application framework.

---

## Backup / Restore

Export and import processing history from localStorage.

Useful when moving between devices.

---

# Current Deployment

Frontend:

```text
https://anycard.ddcopp.com
```

Target Workflow:

```text
https://www.anycard.ca/swap/loadcard
```

Hosting Stack:

```text
GitHub
→ Cloudflare Pages
→ Custom Domain
```
