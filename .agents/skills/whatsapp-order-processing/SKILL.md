---
name: whatsapp-order-processing
description: Handles WhatsApp Webhook state machine and order transitions.
---

# whatsapp-order-processing

Use this skill when working on the conversational state machine and webhook integration.

## Guidelines
1. Do not execute heavy logic in the Webhook route itself; enqueue jobs.
2. Keep state transitions clear (e.g. `CREATED` -> `COLLECTING` -> `EXTRACTED`).
3. Handle natural language corrections properly by asking for clarification if the request is ambiguous.
4. Maintain a robust mapping between the WhatsApp Phone Number and the Customer record.
