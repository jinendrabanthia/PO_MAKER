import { CreateOrderForm } from "@/components/orders/create-order-form"

export default function CreateOrderPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Create Order</h1>
        <p className="text-sm text-muted-foreground">
          Manually enter order details or upload a document.
        </p>
      </div>
      <CreateOrderForm />
    </div>
  )
}
