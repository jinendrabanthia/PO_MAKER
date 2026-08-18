# System Architecture

## Overview
OrderFlow is built as a modular monorepo. It leverages Next.js for both the Frontend UI and Backend API/Server Actions, decoupling the core domain services into standalone packages.

## Monorepo Structure
- `apps/web`: Next.js web application (Dashboard, UI, Server Actions).
- `packages/shared-types`: Interfaces and Enums.
- `packages/validation`: Zod schemas.
- `packages/calculations`: Pure TS calculation engine for totals.
- `packages/pdf-template`: HTML/CSS and Playwright rendering scripts.
- `packages/domain`: (Planned) Core domain services and repositories.

## Logical Layers
1. **UI Layer**: React components, shadcn/ui, Tailwind. Handles presentation and forms.
2. **Application Services**: Next.js Server Actions / API Routes. Orchestrates domain logic and UI state.
3. **Domain Services**: `Calculations`, `DocumentExtractor`, `PdfRenderer`. Independent of the UI.
4. **Infrastructure**: Prisma (Database), S3 (Storage), Gemini API.

## File Processing Strategy
- Uploaded files are securely stored in S3 temporarily.
- Parsed via native parsers (Excel/CSV) or sent to Gemini for OCR/extraction.
- Returns strictly validated JSON to the frontend for the user to review.
