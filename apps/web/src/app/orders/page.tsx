import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Plus } from "lucide-react"

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-semibold tracking-tight">Orders</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Create Order
        </Button>
      </div>

      <div className="flex items-center gap-2 max-w-sm">
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Search orders..." 
            className="w-full bg-background pl-8" 
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order #</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Qty</TableHead>
              <TableHead className="text-right">Grand Total</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">ORD-2026-0818-01</TableCell>
              <TableCell>Surat Dreams</TableCell>
              <TableCell>Aug 18, 2026</TableCell>
              <TableCell>38</TableCell>
              <TableCell className="text-right">₹48,726.00</TableCell>
              <TableCell><Badge>GENERATED</Badge></TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">ORD-2026-0817-42</TableCell>
              <TableCell>Om Traders</TableCell>
              <TableCell>Aug 17, 2026</TableCell>
              <TableCell>14</TableCell>
              <TableCell className="text-right">₹15,400.00</TableCell>
              <TableCell><Badge variant="outline">READY</Badge></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
