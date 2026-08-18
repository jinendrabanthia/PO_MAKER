import { GoogleGenerativeAI } from "@google/generative-ai"
import type { Order } from "@orderflow/shared-types"

// Initialize Gemini SDK
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

/**
 * Extracts order data from a raw file buffer (PDF or Image) using Gemini.
 * @param fileBuffer The binary content of the file.
 * @param mimeType The mimeType of the file (e.g. 'application/pdf', 'image/jpeg')
 * @returns Partial Order object
 */
export async function extractOrderData(
  fileBuffer: Buffer,
  mimeType: string
): Promise<Partial<Order>> {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not set.")
  }

  // Convert buffer to base64
  const base64Data = fileBuffer.toString("base64")

  const prompt = `
    You are an AI order extraction assistant. Extract the purchase order details from the provided document.
    Return ONLY a valid JSON object matching the following structure:
    {
      "reference": "string (Customer/Business Name)",
      "agency": "string (Agency name if present)",
      "advancePayment": 0 (number, advance amount paid if any),
      "products": [
        {
          "productCode": "string",
          "designCode": "string",
          "quantity": 0 (number),
          "netPrice": 0.0 (number, price per unit),
          "sizes": ["string", "string"] (array of sizes if specified)
        }
      ]
    }

    CRITICAL RULES:
    1. DO NOT calculate totals, line totals, or grand totals. The application will handle math deterministically.
    2. Only extract raw quantities, net prices, and sizes explicitly mentioned in the document.
    3. If a field is missing, omit it or use an empty string/array.
    4. Ensure the output is strictly valid JSON without markdown wrapping.
  `

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig: {
      responseMimeType: "application/json",
      temperature: 0.1, // Low temperature for deterministic extraction
    },
  })

  const result = await model.generateContent([
    {
      inlineData: {
        data: base64Data,
        mimeType,
      },
    },
    prompt,
  ])

  const rawJson = result.response.text()
  if (!rawJson) {
    throw new Error("Gemini returned an empty response.")
  }

  try {
    const extractedData = JSON.parse(rawJson)
    return extractedData as Partial<Order>
  } catch (err) {
    console.error("Failed to parse AI output:", rawJson)
    throw new Error("Failed to parse JSON from AI extraction.")
  }
}
