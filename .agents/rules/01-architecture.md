---
description: OrderFlow Architecture Rules
---
# Architecture Rules
1. Maintain strict separation of concerns. Do not mix WhatsApp webhook handling with PDF generation or AI extraction.
2. The Database is not the source of truth for calculations. Calculations are performed deterministically in the application code.
3. Keep the API stateless where possible. Use Redis for queues and PostgreSQL for persistence.
4. Avoid premature microservices; build as a modular monolith within the monorepo structure.
