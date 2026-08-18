# Testing Strategy

## Levels of Testing
1. **Unit Tests** (Vitest/Jest)
   - Core deterministic calculations (Totals, Qty, Line Totals).
   - Validation logic (Zod schemas).
   - Natural language correction parser logic.

2. **Integration Tests**
   - Database operations (Prisma queries).
   - Queue processing (BullMQ job enqueuing and execution).

3. **API Tests**
   - Endpoints returning expected structures and status codes.
   - Webhook validation and security checks.

4. **PDF Regression Tests**
   - Generate a PDF from a deterministic local JSON fixture.
   - Render PDF to image and use Playwright visual comparisons (or diff tools) to detect layout regressions.

5. **End-to-End (E2E) Tests**
   - Simulate a full web event -> extraction -> calculation -> PDF generation pipeline.

## Critical Path Coverage
A test must exist for: Web event -> order creation -> file upload mock -> extraction mock -> validation -> calculation -> PDF generation.
