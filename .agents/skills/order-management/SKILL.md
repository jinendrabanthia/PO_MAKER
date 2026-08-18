---
name: order-management
description: Handles the core logic for the Order lifecycle and UI state.
---

# order-management
Use this skill when implementing the Order Creation or Editing UI.

## Guidelines
1. The UI must always recalculate totals locally using the `calculations` package so the user sees live updates.
2. Maintain strict separation between DRAFT orders and READY orders.
3. Allow users to edit imported data before finalizing it.
