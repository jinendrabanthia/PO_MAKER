import { generateOrderPdf } from "./index"
import fs from "fs"
import path from "path"
import type { Order, OrderStatus } from "@orderflow/shared-types"

async function run() {
  console.log("Generating Mock PDF...")

  const mockOrder: any = {
    orderNumber: "ORD-2026-0818-999",
    companyTemplateId: "123",
    companyTemplate: {
      templateName: "SNK",
      buyerName: "SNK",
      buyerCity: "Surat",
      sellerName: "Test Seller",
      sellerAddress: "123 Test St",
    },
    status: "DRAFT" as OrderStatus,
    totalQty: 25,
    grandTotal: 17500,
    advancePayment: 5000,
    orderDate: new Date(),
    products: [
      {
        category: "Sarees",
        productCode: "SAREE-001",
        quantity: 10,
        netPrice: 500,
        sizeCount: 1,
        sizes: ["Free Size"],
        lineTotal: 5000,
        sortOrder: 0
      },
      {
        category: "Kurtis",
        productCode: "KURTI-042",
        quantity: 15,
        netPrice: 833.33,
        sizeCount: 3,
        sizes: ["M", "L", "XL"],
        lineTotal: 12500,
        sortOrder: 1
      }
    ]
  }

  const pdfBuffer = await generateOrderPdf(mockOrder)

  const outPath = path.join(process.cwd(), "test-output.pdf")
  fs.writeFileSync(outPath, pdfBuffer)
  
  console.log(`✅ PDF Generated Successfully at: ${outPath}`)
}

run().catch(console.error)
