# SnapReview -- Product Requirements Document

## Overview

SnapReview is a visual QA platform for screenshot comparison, diff annotation, team assignments, and approval workflows. This PRD defines the six core features for the initial release.

---

## Feature 1: Landing Page

### Summary
A public marketing page that communicates SnapReview's value proposition and drives sign-ups.

### Requirements
- Hero section with headline, sub-headline, and primary CTA ("Get Started")
- Feature highlights section showcasing the six core capabilities
- Social proof / testimonials placeholder
- Footer with links to docs, GitHub, and contact
- Fully responsive (mobile, tablet, desktop)
- Lighthouse performance score >= 90

### Acceptance Criteria
- [ ] Page loads in < 2 seconds on 3G
- [ ] CTA navigates to the upload/dashboard flow
- [ ] All sections render correctly at 320px, 768px, and 1440px widths

---

## Feature 2: Screenshot Upload + Comparison

### Summary
Users upload two screenshots (baseline and current) and view them side-by-side or overlaid for comparison.

### Requirements
- Drag-and-drop or file-picker upload supporting PNG, JPEG, and WebP
- Side-by-side view with synchronized pan and zoom
- Onion-skin overlay view with adjustable opacity slider
- Swipe slider view (before/after)
- Image metadata display (dimensions, file size, format)
- Maximum upload size: 10 MB per image

### Acceptance Criteria
- [ ] Both images render at native resolution with zoom controls
- [ ] Pan and zoom stay synchronized across side-by-side panels
- [ ] Overlay opacity slider ranges from 0% to 100%
- [ ] Unsupported formats show a clear error message

---

## Feature 3: Pixel Diff Overlay

### Summary
Automated pixel-level comparison that highlights differences between baseline and current screenshots.

### Requirements
- Client-side pixel diff using canvas API or WebAssembly
- Configurable sensitivity threshold (0-100%)
- Diff highlight color customizable (default: magenta overlay)
- Diff summary statistics: total pixels changed, percentage changed, bounding box of changes
- Toggle diff overlay on/off
- Zoom into diff regions with one click

### Acceptance Criteria
- [ ] Diff completes in < 2 seconds for 1920x1080 images
- [ ] Threshold slider filters out sub-pixel anti-aliasing noise at default setting
- [ ] Stats panel shows pixel count and percentage accurately
- [ ] Clicking a diff region centers and zooms the viewport on it

---

## Feature 4: Annotation Tools

### Summary
Drawing and commenting tools that let reviewers mark up screenshots with precise visual feedback.

### Requirements
- Rectangle, ellipse, and freehand drawing tools
- Arrow tool for pointing to specific elements
- Text comment pins (click to place, type to annotate)
- Color picker for annotation strokes
- Undo/redo stack (Ctrl+Z / Ctrl+Shift+Z)
- Annotations persist and are visible to all team members

### Acceptance Criteria
- [ ] Each tool draws on a canvas overlay without modifying the source image
- [ ] Annotations save on blur/deselect and appear for other users within 2 seconds
- [ ] Undo/redo supports at least 50 actions
- [ ] Annotations export as a JSON manifest for CI integration

---

## Feature 5: Review Assignment Workflow

### Summary
Team leads assign screenshots or sets of screenshots to specific reviewers with due dates and context.

### Requirements
- Assign one or more reviewers to a comparison set
- Optional due date with reminder notifications
- Review status states: Pending, In Review, Changes Requested, Approved
- Comment thread per comparison (linked to annotations)
- Email and in-app notification on assignment and status change
- Bulk assign across multiple comparisons

### Acceptance Criteria
- [ ] Assigning a reviewer sends a notification within 30 seconds
- [ ] Status transitions follow the defined state machine (no skipping)
- [ ] Comment threads are threaded (replies nest under parent)
- [ ] Bulk assign works for up to 50 comparisons at once

---

## Feature 6: Approval Dashboard

### Summary
A central dashboard showing the status of all active reviews, filterable by project, reviewer, and status.

### Requirements
- Table/card view toggle
- Filters: project, reviewer, status, date range
- Sort by: newest, oldest, most changes, due date
- Summary stats: total reviews, pending, approved, rejected
- One-click approve/reject from the dashboard row
- Export review report as CSV

### Acceptance Criteria
- [ ] Dashboard loads all reviews in < 1 second for up to 500 items
- [ ] Filters combine (AND logic) and update results in real time
- [ ] Approve/reject from dashboard updates status without page reload
- [ ] CSV export includes all visible columns plus annotation count

---

## Non-Functional Requirements

| Concern | Requirement |
|---------|------------|
| Performance | First Contentful Paint < 1.5s, Time to Interactive < 3s |
| Accessibility | WCAG 2.1 AA compliance |
| Browser Support | Chrome, Firefox, Safari, Edge (latest 2 versions) |
| Security | All uploads scanned for malware; HTTPS only; CORS restricted |
| Scalability | Support 100 concurrent users per workspace |
