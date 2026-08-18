import { NextRequest, NextResponse } from "next/server"
import { extractOrderData } from "@orderflow/document-extraction"

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get("file") as File | null

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const extractedData = await extractOrderData(buffer, file.type)

    return NextResponse.json(extractedData, { status: 200 })
  } catch (error: any) {
    console.error("AI Extraction Error:", error)
    return NextResponse.json(
      { error: "Extraction Failed", message: error.message },
      { status: 500 }
    )
  }
}
