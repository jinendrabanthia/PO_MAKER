42. Deployment Architecture

For MVP:

                         Internet
                            │
                       WhatsApp API
                            │
                            ▼
                     Cloud Run / VPS
                            │
                ┌───────────┼───────────┐
                ▼           ▼           ▼
            Node API     Worker      Next.js
                │           │
                └──────┬────┘
                       ▼
                  PostgreSQL
                       │
                       ▼
                  Object Storage
                       │
                       ▼
                     Redis

You can begin with a simpler single-service deployment and split workers later.

43. Environment Variables

Create:

DATABASE_URL=
REDIS_URL=


WHATSAPP_ACCESS_TOKEN=
WHATSAPP_PHONE_NUMBER_ID=
WHATSAPP_BUSINESS_ACCOUNT_ID=
WHATSAPP_VERIFY_TOKEN=


GEMINI_API_KEY=


STORAGE_ENDPOINT=
STORAGE_BUCKET=
STORAGE_ACCESS_KEY=
STORAGE_SECRET_KEY=


JWT_SECRET=

Use placeholders in .env.example.

Never insert real credentials into source code.