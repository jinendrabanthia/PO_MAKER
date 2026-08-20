31. PDF Generation

Recommended:

HTML + CSS + Playwright

Pipeline:

Order JSON
 ↓
Validated domain object
 ↓
HTML template
 ↓
CSS print layout
 ↓
Chromium / Playwright
 ↓
PDF

Advantages:

precise layout
image rendering
reusable templates
easier visual adjustment
easy pagination
32. PDF Template Design

Create:

packages/pdf-template/
├── templates/
│   └── order-form-v1/
│       ├── template.html
│       ├── styles.css
│       └── assets/
└── renderer/

Do not put layout logic into the WhatsApp module.

33. Pagination

The PDF renderer must dynamically support:

4 products/page

or another configurable page capacity based on the reference layout.

Do not assume exactly 8 products.

The system should automatically determine:

available page height
+
row height
+
header/footer constraints

and create additional pages.

34. Image Processing

Before PDF insertion:

Uploaded image
 ↓
Validate
 ↓
Resize
 ↓
Compress
 ↓
Normalize orientation
 ↓
Store
 ↓
PDF renderer

Images should preserve reasonable quality while controlling PDF size.

35. Storage

Use object storage.

Recommended:

Google Cloud Storage
Cloudflare R2
AWS S3

Store:

source files
product images
generated PDFs

Never store large binary files directly in PostgreSQL.