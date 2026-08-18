---
description: OrderFlow Testing Rules
---
# Testing Rules
1. Write tests before or alongside critical functionality.
2. Write unit tests for all financial and quantity calculations to handle edge cases (0, 1, many sizes, decimals, missing values).
3. Do not declare PDF work complete without visual/regression verification.
4. The critical path (WhatsApp -> Extract -> Validate -> Confirm -> Calculate -> PDF) must have automated E2E coverage.
