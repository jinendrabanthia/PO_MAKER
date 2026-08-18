# API Documentation

## Order Endpoints
- `POST /api/orders` - Create an order (internal/admin)
- `GET /api/orders/:id` - Fetch order details
- `PATCH /api/orders/:id` - Update order details (e.g. state transition)
- `POST /api/orders/:id/files` - Upload order file
- `POST /api/orders/:id/extract` - Trigger AI extraction
- `POST /api/orders/:id/confirm` - User confirms the order
- `POST /api/orders/:id/generate-pdf` - Trigger PDF generation
- `GET /api/orders/:id/pdf` - Download generated PDF

## Admin Endpoints
- `GET /api/admin/orders` - List orders
- `GET /api/admin/customers` - List customers
- `GET /api/admin/products` - List products
- `GET /api/admin/logs` - List audit logs

## Webhooks
- `GET /webhooks/whatsapp` - Verify webhook (Cloud API requirement)
- `POST /webhooks/whatsapp` - Receive messages and status updates
