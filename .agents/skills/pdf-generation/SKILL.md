---
name: pdf-generation
description: Generates deterministic PDFs using HTML/CSS and Playwright based on the OrderFlow specification.
---

# pdf-generation

Use this skill when you need to create or modify PDF templates or generation logic.

## Guidelines
1. Do not use generic invoice templates. Use the exact layout defined in `docs/PDF_TEMPLATE.md`.
2. Generate a local JSON fixture with sample order data to test the template before integrating it with the main backend.
3. Validate HTML/CSS visually via an image snapshot.
4. Ensure text alignment, padding, and table borders are tight and professional.
5. All calculations should already be done; the PDF renderer simply displays the provided data.
