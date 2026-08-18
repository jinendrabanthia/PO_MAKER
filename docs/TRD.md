# Technical Requirements Document (TRD)

## Project: OrderFlow

### 1. Technology Stack
- **Frontend & Backend UI**: Next.js (App Router, Server Actions)
- **UI Framework**: React, Tailwind CSS, shadcn/ui
- **State Management**: React Hook Form, Zustand (where appropriate)
- **Language**: TypeScript (Strict Mode)
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Validation**: Zod
- **Queue/Background (Optional but Recommended)**: BullMQ + Redis for async imports and heavy PDF rendering
- **PDF Generation**: HTML/CSS + Playwright (Chromium)
- **AI/Extraction**: Gemini API (structured JSON output)
- **Storage**: S3-compatible Object Storage
- **Testing**: Vitest (Unit), Playwright (E2E/Visual Regression)
- **Containerization**: Docker

### 2. Engineering Principles
- Core domain logic (calculations, extraction mapping) must be pure and independent of Next.js or UI components.
- No AI involvement in deterministic financial calculations.
- Strict input validation using Zod.
- Explicit and typed error handling.
