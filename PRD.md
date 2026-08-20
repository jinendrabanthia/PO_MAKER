1. PRD — Product Requirements Document
Product Name

WhatsApp Order PDF Automation System

Working name:

OrderFlow

1.1 Product Vision

Build a WhatsApp-first order automation platform that allows a user to send customer information, product information, spreadsheets, PDFs, or product images through WhatsApp and automatically receive a professionally formatted order PDF matching the organization's approved order-form design.

The user should not need to manually create tables, calculate totals, count sizes, format product data, or design the PDF.

The system should:

WhatsApp Input
       ↓
Document / Image Processing
       ↓
AI Extraction
       ↓
Data Validation
       ↓
User Confirmation
       ↓
Deterministic Calculations
       ↓
PDF Generation
       ↓
PDF sent back to WhatsApp
2. Problem Statement

Currently, creating the order document requires manually collecting and formatting:

Customer details
Agency/reference information
Product codes
Design codes
Quantities
Prices
Sizes
Product images
Product totals
Overall totals

This creates repetitive work and increases the risk of:

incorrect totals
missing products
incorrect size counts
formatting inconsistencies
manual PDF creation effort
transcription errors

The proposed system automates this process.

3. Target Users
Primary User

Sales/order-processing staff who receive product/order information and need to generate official order PDFs.

Secondary Users

Managers/admins who need to:

view orders
verify generated PDFs
regenerate PDFs
manage products
manage customers
manage PDF templates
review extraction failures
Future Users

External retailers/customers submitting orders through WhatsApp.

4. MVP Scope

The MVP should support:

Input

Users can provide:

text
PDF
Excel/CSV
product images
multiple product images
structured order details
Processing

System must:

identify order/customer data
identify products
identify product codes
identify design codes
identify prices
identify sizes
associate images with products where possible
calculate totals
validate extracted information
ask for user confirmation
Output

System generates:

professional order PDF
multiple pages automatically
product images embedded
calculated totals
GST note
downloadable/sendable PDF
Communication

WhatsApp bot must support:

start order
upload documents
confirmation
correction
cancellation
PDF delivery
error recovery
5. Reference PDF Requirements

The uploaded PDF is the visual source of truth for Version 1 of the PDF template.

The current sample has:

Header
SNK
City
Mobile
Ref
Agency
Order Form No.
Order Date
Advance Payment
Advance Mode
Print Date
Remark
company branding/contact information

These fields appear in the first-page header of the reference.

Product table

Columns:

S No
Product
Code
Qty
Net Price
No Of Sizes
Grand Total

The product information is shown in this structure in the source PDF.

Product row

Each product contains:

serial number
product image
product code
design/reference code
quantity
net price
number of sizes
size list
calculated grand total
Footer
Total Qty
Grand Total
Plus GST as Applicable

The sample explicitly reports Total Qty 38 and Grand Total 48726.

6. Functional Requirements
FR-01 — WhatsApp onboarding

User sends:

Hi

Bot responds with menu:

Welcome to OrderFlow.


1. Create Order
2. Check Order
3. Help
FR-02 — Create order

User selects:

Create Order

System creates an order session.

Example:

session_id
customer_id
created_at
status = collecting
FR-03 — Customer information

Bot can collect:

Customer Name
City
Mobile
Reference
Agency
Order Date
Advance Payment
Advance Mode
Remark

The system should not require every field if the source document already contains them.

7. FR-04 — Document upload

User can upload:

PDF
catalogue.pdf
Excel
order.xlsx
CSV
products.csv
Images
product1.jpg
product2.jpg
...
Mixed input

The user can send:

customer details
+
Excel
+
product images
8. FR-05 — AI extraction

AI extraction should convert unstructured input to a strict schema.

Example:

{
  "customer": {
    "name": "",
    "city": "",
    "mobile": ""
  },
  "agency": "",
  "reference": "",
  "orderDate": "",
  "products": [
    {
      "productCode": "",
      "designCode": "",
      "quantity": 1,
      "netPrice": 0,
      "sizes": [],
      "imageReference": ""
    }
  ]
}

AI must never directly generate financial totals.

9. FR-06 — Deterministic calculations

The backend calculates:

sizeCount = sizes.length


lineTotal =
quantity × sizeCount × netPrice


grandTotal =
sum(lineTotal)


totalQty =
sum(quantity × sizeCount)

For the reference example:

1049 × 5 = 5245
1329 × 5 = 6645
1290 × 4 = 5160
1099 × 5 = 5495
...

The extracted values visible in the reference support these calculations.

The backend is the source of truth for all calculations.

10. FR-07 — Validation

Before PDF generation:

Product code exists?
Price exists?
Sizes present?
Quantity valid?
Image available?
Duplicate product?
Totals valid?
Required customer fields present?

If something is missing:

Product 4 is missing its price. Please provide the price.

11. FR-08 — Confirmation

After extraction:

Order Summary


Customer: Surat Dreams
Agency: JM Jain
Products: 8
Total Qty: 38
Grand Total: ₹48,726


1. Generate PDF
2. Edit order
3. Cancel

PDF generation cannot happen until confirmation unless an admin explicitly enables auto-generation.

12. FR-09 — Corrections

User can say:

Change product 3 price to 1390

System updates:

products[2].netPrice = 1390

Then recalculates totals.

User can also say:

Remove product 5

or:

Add product 9 code 2069999 price 1299 sizes 38,40,42,44

13. FR-10 — PDF generation

PDF must:

visually follow reference
retain company branding
automatically paginate
preserve product images
maintain table borders
maintain consistent typography
maintain spacing
support any number of products
display final totals on last page
14. FR-11 — PDF delivery

Generated PDF should be uploaded to a temporary/secure storage location and sent as a WhatsApp document.

15. FR-12 — Admin dashboard

MVP dashboard:

Dashboard
Orders
Customers
Products
PDF Templates
Logs
Settings

Order detail should show:

Order ID
Customer
Created At
Status
Extracted Data
Calculated Totals
Generated PDF
Source Files
Audit Log
16. Non-Functional Requirements
Performance

Target:

text-only extraction: < 10 seconds
normal PDF extraction: < 30 seconds
PDF generation: < 10 seconds
total normal transaction: < 60 seconds

These are target SLAs, not guarantees.

Reliability

The system must:

retry failed API requests
handle WhatsApp webhook retries
prevent duplicate order creation
store processing state
log extraction failures
Security

Must:

never expose API keys
encrypt sensitive data in transit
use environment variables
validate uploaded files
restrict MIME types
impose file-size limits
prevent malicious file execution
use signed/expiring file URLs where possible
Auditability

Every order should record:

created
uploaded
extracted
validated
confirmed
generated
sent
failed
17. Out of Scope for MVP

Do not build these initially:

payment gateway
ERP integration
inventory management
delivery management
customer loyalty system
multi-company billing
mobile app
advanced analytics
AI-generated product descriptions

They can be added later.

18. Success Criteria

MVP is successful when:

Test 1

Given structured JSON, the system generates the correct PDF.

Test 2

Given the reference PDF, extraction produces the correct structured data.

Test 3

Given an Excel document, products are extracted correctly.

Test 4

Given product images, images appear beside the correct product.

Test 5

User can complete an order entirely through WhatsApp.

Test 6

Generated totals match deterministic calculations.

Test 7

Generated PDF visually matches the reference template closely.