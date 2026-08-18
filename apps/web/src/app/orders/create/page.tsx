"use client"
import * as React from "react"
import { CreateOrderForm } from "@/components/orders/create-order-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Upload } from "lucide-react"
import { getTemplates } from "@/app/actions"

export default function CreateOrderPage() {
  const [isExtracting, setIsExtracting] = React.useState(false)
  const [initialData, setInitialData] = React.useState<any>(null)
  const [templates, setTemplates] = React.useState<any[]>([])

  React.useEffect(() => {
    getTemplates().then(setTemplates).catch(console.error)
  }, [])

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setIsExtracting(true)
    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/orders/extract", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to extract data")
      }

      const data = await response.json()
      setInitialData(data)
      alert("Extraction successful! Review the pre-filled form below.")
    } catch (error: any) {
      alert("Extraction Error: " + error.message)
    } finally {
      setIsExtracting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Create Order</h1>
          <p className="text-sm text-muted-foreground">
            Manually enter order details or upload a document for AI extraction.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Input 
            type="file" 
            accept="image/*,application/pdf" 
            onChange={handleFileUpload} 
            disabled={isExtracting}
            className="w-[250px]"
          />
          <Button disabled={isExtracting} variant="secondary">
            {isExtracting ? "Extracting..." : <><Upload className="mr-2 h-4 w-4" /> AI Fill</>}
          </Button>
        </div>
      </div>
      
      {templates.length > 0 ? (
        <CreateOrderForm key={JSON.stringify(initialData)} initialData={initialData} templates={templates} />
      ) : (
        <p>Loading templates...</p>
      )}
    </div>
  )
}
