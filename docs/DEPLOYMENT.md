# Deployment Strategy

## Overview
OrderFlow is containerized using Docker, allowing it to run on any environment supporting Docker Compose or Kubernetes.

## Requirements
- Node.js environment
- PostgreSQL database
- Redis instance
- Object Storage (AWS S3, MinIO, or similar)

## Services
1. **API Container**: Runs the NestJS server.
2. **Worker Container**: Runs the BullMQ workers for background jobs (requires Playwright dependencies for PDF generation).
3. **Admin Container**: Runs the Next.js frontend.

## Environment Variables
- `DATABASE_URL`
- `REDIS_URL`
- `GEMINI_API_KEY`
- `S3_ENDPOINT`, `S3_BUCKET`, `S3_ACCESS_KEY`, `S3_SECRET_KEY`

## CI/CD Pipeline
- **Lint & Test**: Runs on every PR.
- **Docker Build**: Builds images on merge to main.
- **Deploy**: Deploys via infrastructure-as-code or Docker Compose.
