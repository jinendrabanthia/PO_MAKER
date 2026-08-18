---
description: OrderFlow WhatsApp Rules
---
# WhatsApp Integration Rules
1. Implement a webhook-based architecture.
2. Acknowledge the webhook quickly to prevent timeouts and retries.
3. Perform actual message parsing and processing asynchronously via a background queue.
4. Keep the domain logic independent from WhatsApp payload specifics.
5. Provide clear, natural language options and validations back to the user.
