---
name: test-and-verify
description: Workflows for running deterministic testing across the stack.
---

# test-and-verify

Use this skill to run tests and assert quality.

## Guidelines
1. When fixing a bug, first write a test that reproduces it.
2. Always ensure `totalQty` and `grandTotal` calculation tests pass.
3. Trigger visual regression scripts when touching `packages/pdf-template`.
4. Ensure the critical path works (mocking WhatsApp input and verifying the PDF generation job is queued).
