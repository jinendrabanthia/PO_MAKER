WhatsApp Architecture

The WhatsApp integration must be webhook-based.

WhatsApp
   ↓
Webhook endpoint
   ↓
Webhook validation
   ↓
Message parser
   ↓
Conversation/session service
   ↓
Order service

The bot should never depend on a single long-running HTTP request.

Use asynchronous processing:

Webhook
 ↓
Store event
 ↓
Queue job
 ↓
Return 200 immediately
 ↓
Process asynchronously

This is especially important for documents and AI extraction.

26. WhatsApp Message Types

Support:

text
image
document
interactive buttons

Potential future support:

audio
location
contacts
27. WhatsApp Conversation Engine

Implement:

ConversationSession

with:

phoneNumber
currentOrderId
state
lastMessageId
expiresAt

Bot states:

IDLE
CREATING_ORDER
COLLECTING_CUSTOMER
WAITING_FOR_DOCUMENT
PROCESSING
AWAITING_CONFIRMATION
EDITING
GENERATING
COMPLETED