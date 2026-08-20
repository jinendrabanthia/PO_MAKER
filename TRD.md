19. TRD — Technical Requirements Document
19.1 Architecture

Use a modular monorepo:

orderflow/
│
├── apps/
│   ├── api/
│   └── admin/
│
├── packages/
│   ├── shared-types/
│   ├── validation/
│   └── pdf-template/
│
├── prisma/
│
├── tests/
│
├── docs/
│
└── .agents/
20. Technology Stack
Backend

Node.js + TypeScript

Framework:

NestJS or Express/Fastify

I recommend NestJS for a production system because the project has clear modules:

WhatsApp
Orders
Extraction
PDF
Products
Customers
Storage
Admin
Audit