---
name: document-extraction
description: AI pipeline for extracting order data from PDFs, images, and text.
---

# document-extraction

Use this skill when working on the Gemini extraction layer.

## Guidelines
1. Ensure the Gemini prompt strictly requests JSON matching the defined Zod schemas.
2. Verify extraction results. Add fallbacks if Gemini hallucinates totals.
3. Remove total calculations from AI prompts; instruct AI to only extract raw quantities, sizes, and prices.
4. If an image is provided, ensure Gemini handles it as a multimodal prompt accurately.
5. Log the AI output for debugging purposes without exposing PII.
