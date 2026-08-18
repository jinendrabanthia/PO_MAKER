---
description: OrderFlow TypeScript Rules
---
# TypeScript Rules
1. Always use TypeScript Strict Mode (`strict: true`).
2. Define strong domain types and share them via `packages/shared-types`.
3. Use `Zod` for all runtime validation of external inputs.
4. Avoid `any`. Use `unknown` and type guard functions if necessary.
5. Do not silently swallow errors; explicitly type and handle expected application errors.
