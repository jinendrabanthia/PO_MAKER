import { NextRequest, NextResponse } from "next/server"
import { OrderSchema } from "@orderflow/validation"
import { generateOrderPdf } from "@orderflow/pdf-generator"

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

    // Generate the PDF Buffer
    const pdfBuffer = await generateOrderPdf(orderData as any)

    // Return the PDF to the client
    return new NextResponse(pdfBuffer as any, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="order-${orderData.orderNumber}.pdf"`,
      },
    })
  } catch (error: any) {
    console.error("Error generating PDF:", error)
    return NextResponse.json(
      { error: "Internal Server Error", message: error.message },
      { status: 500 }
    )
  }
}
