import { describe, it, expect, vi } from 'vitest';
import { POST } from './route';
import { NextRequest } from 'next/server';

describe('POST /api/orders/generate-pdf', () => {
  it('should generate a PDF and return a 200 response for valid order data', async () => {
    const mockOrder = {
      orderNumber: "ORD-12345",
      companyTemplateId: "123e4567-e89b-12d3-a456-426614174000",
      status: "DRAFT",
      totalQty: 10,
      grandTotal: 1000,
      products: [
        {
          category: "General",
          quantity: 10,
          netPrice: 100,
          sizeCount: 1,
          sizes: ["M"],
          lineTotal: 1000
        }
      ]
    };

    const req = new NextRequest('http://localhost/api/orders/generate-pdf', {
      method: 'POST',
      body: JSON.stringify(mockOrder)
    });

    const res = await POST(req);
    
    if (res.status !== 200) {
      console.log("Error details:", await res.json());
    }

    expect(res.status).toBe(200);
  }, 15000); // increase timeout as playwright might take a few seconds
  
  it('should return 400 for invalid order data', async () => {
    const req = new NextRequest('http://localhost/api/orders/generate-pdf', {
      method: 'POST',
      body: JSON.stringify({ invalid: 'data' })
    });

    const res = await POST(req);
    
    expect(res.status).toBe(400);
  });
});
