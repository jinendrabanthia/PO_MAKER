import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Metrics Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orders Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+3 from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Draft Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Generated PDFs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">124</div>
            <p className="text-xs text-muted-foreground">+19 this week</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders Table */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">Recent Orders</h2>
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
              {/* Mock Data for Phase 2 UI Layout */}
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
              <TableRow>
                <TableCell className="font-medium">ORD-2026-0817-41</TableCell>
                <TableCell>Vandana Sarees</TableCell>
                <TableCell>Aug 17, 2026</TableCell>
                <TableCell>0</TableCell>
                <TableCell className="text-right">₹0.00</TableCell>
                <TableCell><Badge variant="secondary">DRAFT</Badge></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
