# PDF Template Specification (V1)

## Visual Specification
*Note: The reference PDF was not found in the initial workspace. Assuming a standard tabular order layout based on requirements.*

## Required Elements
- Header: Company branding, Title (Order Form)
- Metadata block: Customer Name, Reference, Agency, Date
- Main Table:
  - S No
  - Product image (if available)
  - Product code
  - Design/reference code
  - Qty
  - Net Price
  - No Of Sizes
  - Sizes
  - Line Total (Implicit)
- Footer/Summary:
  - Total Qty
  - Grand Total
  - GST Text (if applicable)

## Implementation Rules
- HTML/CSS with Playwright for rendering.
- No generic modern invoice templates; must match the requested data points exactly.
- Pagination: Handle arbitrary number of products with CSS `page-break-inside: avoid` and auto-pagination in Playwright.
- Dynamic data injection via Handlebars or template literals.
