import { chromium } from "playwright"
import Handlebars from "handlebars"
import fs from "fs"
import path from "path"
import type { Order, OrderProduct } from "@orderflow/shared-types"

// Register Handlebars helpers
Handlebars.registerHelper("increment", (value: number) => value + 1)

/**
 * Enhanced Order Type specifically tailored for the template's presentation layer.
 */
interface TemplateOrderData extends Order {
  customerName?: string;
  orderDateStr?: string;
  products: (OrderProduct & { sizesDisplay: string })[];
}

/**
 * Generates a PDF buffer from a structured Order object.
 * @param order The strictly validated Order object.
 * @returns Buffer containing the raw PDF data.
 */
export async function generateOrderPdf(order: Order, customerName: string = "Walk-in Customer"): Promise<Buffer> {
  // Read template from local file system
  const templatePath = path.join(__dirname, "template.hbs")
  
  // Note: During dev 'template.hbs' is in src/, after build it should be copied to dist/ or loaded relatively.
  // Using a fallback strategy for execution context (ts-node vs built dist)
  let rawTemplate: string;
  if (fs.existsSync(templatePath)) {
      rawTemplate = fs.readFileSync(templatePath, "utf-8")
  } else {
      rawTemplate = fs.readFileSync(path.join(__dirname, "../src/template.hbs"), "utf-8")
  }
  
  const template = Handlebars.compile(rawTemplate)

  // Hydrate Template Data
  const templateData: TemplateOrderData = {
    ...order,
    customerName,
    orderDateStr: order.orderDate ? new Date(order.orderDate).toLocaleDateString() : new Date().toLocaleDateString(),
    products: (order.products || []).map(p => ({
      ...p,
      sizesDisplay: p.sizes?.join(", ") || "-"
    }))
  }

  const htmlContent = template(templateData)

  // Launch Playwright
  const browser = await chromium.launch({
    headless: true,
  })

  const context = await browser.newContext()
  const page = await context.newPage()

  // Set the HTML content
  await page.setContent(htmlContent, { waitUntil: "networkidle" })

  // Print to PDF
  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: {
      top: "20px",
      bottom: "20px",
      left: "20px",
      right: "20px"
    }
  })

  await browser.close()

  return pdfBuffer
}
