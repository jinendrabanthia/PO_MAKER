# Phase 11: Template & Category Architecture Overhaul

- `[x]` 1. Database & Schema
  - `[x]` Update `prisma/schema.prisma` (Add `CompanyTemplate`, modify `OrderProduct` and `Order`)
  - `[x]` Run `prisma db push` and `prisma generate`
- `[x]` 2. Backend Packages
  - `[x]` Update `@orderflow/shared-types`
  - `[x]` Update `@orderflow/validation`
  - `[x]` Update `@orderflow/document-extraction` prompt for new columns
- `[ ]` 3. Frontend UI
  - `[ ]` Build `/templates` page for CRUD operations on CompanyTemplates
  - `[x]` Modify `/orders/create` to use Template Dropdown instead of Customer form
  - `[ ]` Update Product fields (`category`, `photo` URL, `code`, `qty`, `net price`, `sizes`, `grand total`)
- `[x]` 4. PDF Generation
  - `[x]` Update `template.hbs` layout
  - `[x]` Implement category grouping for sheets
