"use client"

import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { OrderSchema } from "@orderflow/validation"
import { calculateLineTotals } from "@orderflow/calculations"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Plus, Trash2 } from "lucide-react"

type OrderFormValues = z.infer<typeof OrderSchema>

export function CreateOrderForm() {
  const form = useForm<OrderFormValues>({
    resolver: zodResolver(OrderSchema) as any,
    defaultValues: {
      orderNumber: `ORD-${Date.now()}`,
      customerId: "00000000-0000-0000-0000-000000000000", // Mock UUID for now
      reference: "",
      agency: "",
      advancePayment: 0,
      remark: "",
      totalQty: 0,
      grandTotal: 0,
      products: [
        {
          productCode: "",
          designCode: "",
          quantity: 1,
          netPrice: 0,
          sizes: [],
          sizeCount: 1,
          lineTotal: 0,
          sortOrder: 0,
        },
      ],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "products",
  })

  // Watch products to calculate totals live
  const watchProducts = form.watch("products")
  
  // Calculate Grand Totals
  const totals = watchProducts?.reduce(
    (acc, product) => {
      // Ensure sizes is parsed if it's a string (e.g., from comma separated input)
      const sizesArray = typeof product.sizes === "string" 
        ? (product.sizes as string).split(",").map((s) => s.trim()).filter(Boolean)
        : product.sizes || []
      
      const { totalProductQty, lineTotal, sizeCount } = calculateLineTotals({
        ...product,
        sizes: sizesArray,
      })

      return {
        totalQty: acc.totalQty + totalProductQty,
        grandTotal: acc.grandTotal + lineTotal,
      }
    },
    { totalQty: 0, grandTotal: 0 }
  ) || { totalQty: 0, grandTotal: 0 }

  function onSubmit(data: OrderFormValues) {
    // Inject calculated totals before submission
    const finalData = {
      ...data,
      totalQty: totals.totalQty,
      grandTotal: totals.grandTotal,
      products: data.products?.map((p) => {
        const sizesArray = typeof p.sizes === "string" 
          ? (p.sizes as string).split(",").map((s) => s.trim()).filter(Boolean)
          : p.sizes || []
        const { lineTotal, sizeCount } = calculateLineTotals({ ...p, sizes: sizesArray })
        return {
          ...p,
          sizes: sizesArray,
          lineTotal,
          sizeCount,
        }
      }),
    }
    console.log("Validated Order Data:", finalData)
    alert("Order validation successful! Check console for payload.")
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit as any)} className="space-y-8 pb-10">
        
        {/* Section A: Customer Info */}
        <Card>
          <CardHeader>
            <CardTitle>Customer & Order Info</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control as any}
              name="orderNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Order Number</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control as any}
              name="reference"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reference</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Surat Dreams" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control as any}
              name="agency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Agency</FormLabel>
                  <FormControl>
                    <Input placeholder="Agency Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control as any}
              name="advancePayment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Advance Payment (₹)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Section B: Products */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Products</CardTitle>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                append({
                  productCode: "",
                  designCode: "",
                  quantity: 1,
                  netPrice: 0,
                  sizes: [],
                  sizeCount: 1,
                  lineTotal: 0,
                  sortOrder: fields.length,
                })
              }
            >
              <Plus className="h-4 w-4 mr-2" /> Add Product
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            {fields.map((field, index) => {
              // Calculate live line total for this specific row
              const currentProduct = watchProducts?.[index]
              let rowLineTotal = 0
              if (currentProduct) {
                 const sizesArray = typeof currentProduct.sizes === "string" 
                  ? (currentProduct.sizes as string).split(",").map((s) => s.trim()).filter(Boolean)
                  : currentProduct.sizes || []
                 rowLineTotal = calculateLineTotals({ ...currentProduct, sizes: sizesArray }).lineTotal
              }

              return (
                <div key={field.id} className="p-4 border rounded-lg space-y-4 relative bg-muted/20">
                  <div className="absolute top-4 right-4">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => remove(index)}
                      className="text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="font-medium text-sm text-muted-foreground">Product #{index + 1}</div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pr-10">
                    <FormField
                      control={form.control as any}
                      name={`products.${index}.productCode`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Product Code</FormLabel>
                          <FormControl>
                            <Input placeholder="Code" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control as any}
                      name={`products.${index}.designCode`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Design Code</FormLabel>
                          <FormControl>
                            <Input placeholder="Design" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control as any}
                      name={`products.${index}.quantity`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Quantity</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control as any}
                      name={`products.${index}.netPrice`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Net Price (₹)</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control as any}
                      name={`products.${index}.sizes`}
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Sizes (Comma separated)</FormLabel>
                          <FormControl>
                            <Input placeholder="38, 40, 42" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="md:col-span-2 flex items-end justify-end">
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">Line Total</div>
                        <div className="text-xl font-bold">₹{rowLineTotal.toFixed(2)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>

        {/* Section C: Totals */}
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <div className="text-primary-foreground/80 text-sm">Total Quantity</div>
                <div className="text-3xl font-bold">{totals.totalQty} Units</div>
              </div>
              <div className="text-right">
                <div className="text-primary-foreground/80 text-sm">Grand Total</div>
                <div className="text-4xl font-black tracking-tight">₹{totals.grandTotal.toFixed(2)}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline">Save Draft</Button>
          <Button type="submit">Validate & Create Order</Button>
        </div>

      </form>
    </Form>
  )
}
