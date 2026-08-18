# WhatsApp Conversation Flow

## Overview
The conversational flow is managed via a state machine tracked in `ConversationSession`.

## Example Flow

### 1. Welcome
**User**: Hi
**Bot**: Welcome to OrderFlow.
1. Create Order
2. Help

### 2. Initiation
**User**: 1
**Bot**: Please provide customer details and the product list/document.

### 3. File Upload / Processing
**User**: [Uploads Document]
**Bot**: Thank you. I'm extracting the order details...

### 4. Review
**Bot**: Here is your Order Summary:
Customer: John Doe
Agency: FastTrack
Total Qty: 150
Grand Total: 25000.00
1. Generate PDF
2. Edit Order
3. Cancel

### 5. Correction (Optional)
**User**: 2
**Bot**: Please type your correction (e.g. "change product 3 price to 1390")
**User**: change product 1 quantity to 50
**Bot**: [Calculates new totals] Updated Order Summary... (shows options 1,2,3 again)

### 6. Finalization
**User**: 1
**Bot**: Generating PDF...
**Bot**: [Sends PDF Document]
**Bot**: Here is your generated order form.
