# Workflow: Build Feature

1. Read the relevant PRD/TRD docs for the feature.
2. Define the Zod schemas in `packages/validation` if domain data is affected.
3. Update `packages/shared-types` if necessary.
4. Implement the backend route in `apps/api` or admin view in `apps/admin`.
5. Write unit tests for the specific logic.
6. Run linting and type checking.
7. Perform a local functional test.
