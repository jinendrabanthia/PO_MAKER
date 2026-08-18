# Database Schema Plan

## Core Models

### `User`
- `id`, `email`, `passwordHash`, `role`, `createdAt`, `updatedAt`

### `Customer`
- `id`, `name`, `city`, `mobile`, `agency`, `createdAt`, `updatedAt`

### `Product` (Master)
- `id`, `productCode`, `designCode`, `defaultPrice`, `defaultSizes` (JSON), `imageUrl`, `isActive`, `createdAt`, `updatedAt`

### `Order`
- `id`, `orderNumber`, `customerId`, `reference`, `agency`, `orderDate`, `advancePayment`, `advanceMode`, `remark`, `status` (Enum), `totalQty`, `grandTotal`, `createdAt`, `updatedAt`

### `OrderProduct`
- `id`, `orderId`, `productCode`, `designCode`, `quantity`, `netPrice`, `sizeCount`, `sizes` (JSON), `lineTotal`, `imageUrl`, `sortOrder`, `createdAt`, `updatedAt`

### `UploadedFile`
- `id`, `orderId`, `url`, `mimeType`, `size`, `type` (SOURCE_DOCUMENT, GENERATED_PDF, PRODUCT_IMAGE), `createdAt`

### `ProcessingJob`
- `id`, `orderId`, `type`, `status`, `attempts`, `error`, `createdAt`, `updatedAt`

### `GeneratedDocument`
- `id`, `orderId`, `fileId`, `version`, `createdAt`

### `AuditLog`
- `id`, `orderId`, `action`, `details` (JSON), `createdAt`
