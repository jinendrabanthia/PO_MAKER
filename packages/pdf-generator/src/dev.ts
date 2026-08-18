import { generateOrderPdf } from "./index"
import fs from "fs"
import path from "path"
import type { Order, OrderStatus } from "@orderflow/shared-types"

async function run() {
  console.log("Generating Mock PDF...")

  const mockOrder: Order = {
    orderNumber: "ORD-2026-0818-999",
    customerId: "00000000-0000-0000-0000-000000000000",
    status: "DRAFT" as OrderStatus,
    totalQty: 25,
    grandTotal: 17500,
    advancePayment: 5000,
    reference: "Walk-in Store",
    agency: "Direct",
    orderDate: new Date(),
    products: [
      {
        productCode: "SAREE-001",
        designCode: "FLORAL-RED",
        quantity: 10,
        netPrice: 500,
        sizeCount: 1,
        sizes: ["Free Size"],
        lineTotal: 5000,
        sortOrder: 0
      } as any,
      {
        productCode: "KURTI-042",
        designCode: "GEOMETRIC",
        quantity: 15,
        netPrice: 833.33,
        sizeCount: 3,
        sizes: ["M", "L", "XL"],
        lineTotal: 12500,
        sortOrder: 1
      } as any
    ]
  } as Order

  const pdfBuffer = await generateOrderPdf(mockOrder, "Acme Trading Co.")

  const outPath = path.join(process.cwd(), "test-output.pdf")
  fs.writeFileSync(outPath, pdfBuffer)
  
  console.log(`✅ PDF Generated Successfully at: ${outPath}`)
}

run().catch(console.error)
