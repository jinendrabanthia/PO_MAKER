import { NextRequest, NextResponse } from "next/server"
import { OrderSchema } from "@orderflow/validation"
import { generateOrderPdf } from "@orderflow/pdf-generator"
import { prisma } from "@/lib/prisma"
import { OrderStatus } from "@prisma/client"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    
    // Validate request payload
    const parsed = OrderSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation Error", details: parsed.error.format() },
        { status: 400 }
      )
    }

    const orderData = parsed.data

    const template = await prisma.companyTemplate.findUnique({
      where: { id: orderData.companyTemplateId }
    })

    if (!template) {
      return NextResponse.json({ error: "Invalid Template ID" }, { status: 400 })
    }

    // Upsert products to catalog and create Order
    const createdOrder = await prisma.$transaction(async (tx) => {
      // Create the order
      const newOrder = await tx.order.create({
        data: {
          orderNumber: orderData.orderNumber,
          companyTemplateId: template.id,
          advancePayment: orderData.advancePayment,
          remark: orderData.remark,
          totalQty: orderData.totalQty,
          grandTotal: orderData.grandTotal,
          status: OrderStatus.GENERATED,
          
          // Map products
          products: {
            create: orderData.products?.map((p, index) => {
              const sizesArray = typeof p.sizes === "string" 
                ? (p.sizes as string).split(",").map((s) => s.trim()).filter(Boolean)
                : p.sizes || []
                
              return {
                category: p.category || "General",
                productCode: p.productCode,
                quantity: p.quantity,
                netPrice: p.netPrice,
                sizeCount: p.sizeCount,
                sizes: sizesArray,
                lineTotal: p.lineTotal,
                sortOrder: p.sortOrder || index,
                imageUrl: p.imageUrl
              }
            })
          }
        },
        include: {
          products: true,
          companyTemplate: true
        }
      })
      
      return newOrder
    })

    // Generate the PDF Buffer
    const pdfBuffer = await generateOrderPdf(createdOrder as any)

    // Return the PDF to the client
    return new NextResponse(pdfBuffer as any, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="order-${createdOrder.orderNumber}.pdf"`,
      },
    })
  } catch (error: any) {
    console.error("Error saving order & generating PDF:", error)
    return NextResponse.json(
      { error: "Internal Server Error", message: error.message },
      { status: 500 }
    )
  }
}
