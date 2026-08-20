36. Queue

Use:

Redis + BullMQ

Jobs:

extract-document
process-image
generate-pdf
send-whatsapp
cleanup-files
37. API Design
POST
POST /api/orders
GET
GET /api/orders/:id
POST
POST /api/orders/:id/files
POST
POST /api/orders/:id/extract
POST
POST /api/orders/:id/confirm
POST
POST /api/orders/:id/generate-pdf
GET
GET /api/orders/:id/pdf
WhatsApp webhook
GET /webhooks/whatsapp
POST /webhooks/whatsapp
38. Admin API
GET /api/admin/orders
GET /api/admin/customers
GET /api/admin/products
GET /api/admin/logs
POST /api/admin/products
PATCH /api/admin/products/:id