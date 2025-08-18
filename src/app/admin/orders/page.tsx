
'use client';

import * as React from 'react';
import {
  MoreHorizontal,
  Search,
  ChevronDown,
  File,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { allOrders, type Order, type OrderStatus } from '@/lib/orders-data';
import { format } from 'date-fns';

const statusConfig: Record<OrderStatus, string> = {
    Pending: 'text-yellow-800 bg-yellow-100',
    Confirmed: 'text-blue-800 bg-blue-100',
    Shipped: 'text-indigo-800 bg-indigo-100',
    Delivered: 'text-green-800 bg-green-100',
    Cancelled: 'text-red-800 bg-red-100',
    Returned: 'text-gray-800 bg-gray-100',
};

const pickupStatusConfig: Record<Order['pickupStatus'], string> = {
    Pending: 'text-yellow-800 bg-yellow-100',
    Scheduled: 'text-blue-800 bg-blue-100',
    'In Progress': 'text-indigo-800 bg-indigo-100',
    Completed: 'text-green-800 bg-green-100',
};

export default function AdminOrdersPage() {
    const [searchTerm, setSearchTerm] = React.useState('');
    const [orders, setOrders] = React.useState(allOrders);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = allOrders.filter(o => 
            o.orderId.toLowerCase().includes(term) ||
            o.customer.name.toLowerCase().includes(term) ||
            o.product.name.toLowerCase().includes(term)
        );
        setOrders(filtered);
    };

    const getOrdersForTab = (tab: OrderStatus | 'all') => {
        if (tab === 'all') return orders;
        return orders.filter(o => o.orderStatus === tab);
    }

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <Tabs defaultValue="all">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="Pending">Pending</TabsTrigger>
            <TabsTrigger value="Shipped">Shipped</TabsTrigger>
            <TabsTrigger value="Delivered">Delivered</TabsTrigger>
            <TabsTrigger value="Cancelled">Cancelled</TabsTrigger>
          </TabsList>
           <div className="ml-auto flex items-center gap-2">
             <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                type="search"
                placeholder="Search orders..."
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
                value={searchTerm}
                onChange={handleSearch}
                />
            </div>
            <Button variant="outline" size="sm" className="h-9 gap-1">
              <File className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Export
              </span>
            </Button>
          </div>
        </div>
        <TabsContent value="all">
            <OrdersTable orders={getOrdersForTab('all')} />
        </TabsContent>
        <TabsContent value="Pending">
            <OrdersTable orders={getOrdersForTab('Pending')} />
        </TabsContent>
         <TabsContent value="Shipped">
            <OrdersTable orders={getOrdersForTab('Shipped')} />
        </TabsContent>
         <TabsContent value="Delivered">
            <OrdersTable orders={getOrdersForTab('Delivered')} />
        </TabsContent>
         <TabsContent value="Cancelled">
            <OrdersTable orders={getOrdersForTab('Cancelled')} />
        </TabsContent>
      </Tabs>
    </main>
  );
}


function OrdersTable({ orders }: { orders: Order[] }) {
    return (
         <Card>
          <CardHeader>
            <CardTitle>Orders</CardTitle>
            <CardDescription>
              A list of all orders on the platform.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden sm:table-cell">Pickup</TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.orderId}>
                    <TableCell className="font-medium">{order.orderId}</TableCell>
                    <TableCell>
                      <div className="font-medium">{order.customer.name}</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        {order.customer.email}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={statusConfig[order.orderStatus]}>
                        {order.orderStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                       <Badge variant="outline" className={pickupStatusConfig[order.pickupStatus]}>
                        {order.pickupStatus}
                       </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {format(new Date(order.orderDate), "PPpp")}
                    </TableCell>
                    <TableCell className="text-right">₹{order.amount.toLocaleString('en-IN')}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Update Status</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            Cancel Order
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <div className="text-xs text-muted-foreground">
              Showing <strong>1-{orders.length}</strong> of <strong>{orders.length}</strong> orders
            </div>
          </CardFooter>
        </Card>
    );
}

