---
description: OrderFlow Security Rules
---
# Security Rules
1. Never hard-code secrets or credentials in the source code.
2. Validate all Webhook requests originating from WhatsApp (verify signatures).
3. Never trust uploaded files. Implement MIME-type checking and size limits.
4. Do not execute uploaded files.
5. Use `.env` variables for configuration. Never commit `.env` to Git.
