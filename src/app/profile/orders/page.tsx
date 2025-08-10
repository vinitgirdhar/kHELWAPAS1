
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, FileText, Truck } from 'lucide-react';
import { userOrders, Order } from '@/lib/user-data';
import { Separator } from '@/components/ui/separator';

const statusConfig: Record<Order['status'], { color: string, text: string }> = {
    Delivered: { color: "bg-green-500", text: "text-green-800 bg-green-100" },
    Processing: { color: "bg-yellow-500", text: "text-yellow-800 bg-yellow-100" },
    Cancelled: { color: "bg-red-500", text: "text-red-800 bg-red-100" },
};

export default function OrdersPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Orders</CardTitle>
        <CardDescription>
          View your order history and check the status of your purchases.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">#{order.id}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={`border-0 font-semibold ${statusConfig[order.status].text}`}>
                    <span className={`h-2 w-2 mr-2 rounded-full ${statusConfig[order.status].color}`} />
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">₹{order.total.toLocaleString('en-IN')}</TableCell>
                <TableCell className="text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="gap-2">
                        <FileText className="h-4 w-4"/> View Invoice
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <Truck className="h-4 w-4" /> Track Order
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
