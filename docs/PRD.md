# Project Requirements Document (PRD)

## Project: OrderFlow - Web-First Order Automation System

### 1. Objective
Build a production-quality full-stack web application that allows users to create structured product orders and generate a professional PDF order form matching the exact layout of the reference PDF.

### 2. Key Features
- **Web Dashboard**: Admin-style dashboard showing order statistics and recent orders.
- **Order Management UI**: A multi-section interface to manually create or edit orders, including customer info, product items, and totals.
- **Product Master**: Reusable product database.
- **Customer Master**: Reusable customer records.
- **AI Document Extraction**: Import orders from PDFs, Excel, CSV, or images using deterministic parsing falling back to Gemini AI for structured JSON extraction.
- **Extraction Review**: A dedicated UI to review, correct, and confirm AI-extracted data before importing.
- **Deterministic Calculation**: Totals and pricing are computed deterministically using TypeScript (no AI math).
- **PDF Generation & Preview**: Render a professional, pixel-perfect PDF using HTML/CSS and Playwright, with a browser-based preview identical to the final output.
- **Channel Independent**: Built modularly so WhatsApp integration can be easily added in the future.

### 3. Core User Journey
Dashboard -> Create New Order -> Enter Customer Info -> Add Products OR Upload File -> Extract Product Info -> Review + Edit -> Calculate Totals -> Preview PDF -> Generate PDF -> Download / Save.

### 4. Assumptions & State
- Existing deterministic calculations, Zod validation, and PDF generation logic (from previous phases) are preserved and integrated.
- The web app will use Next.js App Router with React Server Components, Server Actions, and Tailwind + shadcn/ui for the UI.
