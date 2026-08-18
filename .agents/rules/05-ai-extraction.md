---
description: OrderFlow AI Extraction Rules
---
# AI Extraction Rules
1. AI must only return structured JSON data that adheres to Zod schemas.
2. AI must never perform financial calculations. Total quantities and grand totals are deterministic and calculated in code.
3. Every extracted field should be traceable to its source.
4. If extraction confidence is low, the system must ask the user for clarification rather than silently guessing.
