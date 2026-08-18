# Workflow: Run Tests

1. Start Redis and Postgres locally via Docker.
2. Run `npm run test` in the monorepo root to execute all unit tests.
3. Run `npm run test:e2e` in `apps/api`.
4. Report test coverage and fix any failing tests immediately.
