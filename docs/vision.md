# SnapReview -- Vision

## North Star

SnapReview is a visual QA platform that makes screenshot-based review fast, precise, and collaborative. Teams upload screenshots, compare them side-by-side, annotate pixel-level differences, assign reviews, and drive changes through an approval workflow -- all in one place.

## Design Principles

1. **Visual first.** Every interaction centers on the screenshot. UI chrome stays minimal so the image is always the focus.
2. **Pixel precision.** Diff overlays must be accurate to the pixel. False positives erode trust; false negatives let bugs ship.
3. **Collaborative by default.** Annotations, assignments, and approvals are shared in real time. No one works in isolation.
4. **Fast feedback loops.** From upload to approval, every step should feel instant. Latency kills adoption.
5. **Progressive complexity.** A solo developer can upload and diff two images in 30 seconds. A 50-person team can run full approval workflows. Same tool.

## Target Users

- **Frontend developers** verifying UI changes across branches or devices.
- **Design QA engineers** checking implementation fidelity against mockups.
- **Product managers** reviewing visual regressions before release.
- **Design teams** collaborating on UI feedback with precise annotations.

## Success Metrics

| Metric | Target |
|--------|--------|
| Time from upload to first annotation | < 10 seconds |
| Pixel diff accuracy | > 99% |
| Review cycle time (assign to approve) | < 1 hour for routine reviews |
| Team adoption (active reviewers / invited) | > 70% within 30 days |
