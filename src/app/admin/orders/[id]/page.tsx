
'use client';

import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Check, Copy, CreditCard, Truck, User, FileText, CheckCircle, Clock, XCircle, MoreHorizontal } from 'lucide-react';
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
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
// Order data will be fetched via API
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const statusConfig: Record<Order['orderStatus'], { icon: React.ReactNode; color: string }> = {
  Pending: { icon: <Clock className="h-4 w-4" />, color: "text-yellow-600 bg-yellow-100/60 border-yellow-500/30" },
  Confirmed: { icon: <Check className="h-4 w-4" />, color: "text-blue-600 bg-blue-100/60 border-blue-500/30" },
  Shipped: { icon: <Truck className="h-4 w-4" />, color: "text-indigo-600 bg-indigo-100/60 border-indigo-500/30" },
  Delivered: { icon: <CheckCircle className="h-4 w-4" />, color: "text-green-600 bg-green-100/60 border-green-500/30" },
  Cancelled: { icon: <XCircle className="h-4 w-4" />, color: "text-red-600 bg-red-100/60 border-red-500/30" },
  Returned: { icon: <ArrowLeft className="h-4 w-4" />, color: "text-gray-600 bg-gray-100/60 border-gray-500/30" },
};

export default function OrderDetailPage() {
  const params = useParams();
  const { toast } = useToast();
  const orderId = typeof params.id === 'string' ? params.id : '';
  const order = getOrderById(orderId);

  if (!order) {
    notFound();
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: 'Copied!', description: `${text} copied to clipboard.` });
  };

  return (
    <main className="grid flex-1 auto-rows-max gap-4 p-4 sm:px-6 md:gap-8">
      <div className="flex items-center gap-4">
        <Button asChild variant="outline" size="icon" className="h-7 w-7">
          <Link href="/admin/orders">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to Orders</span>
          </Link>
        </Button>
        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
          Order {order.orderId}
        </h1>
        <Badge variant="outline" className={cn("ml-auto sm:ml-0 gap-2", statusConfig[order.orderStatus].color)}>
          {statusConfig[order.orderStatus].icon}
          {order.orderStatus}
        </Badge>
        <div className="hidden items-center gap-2 md:ml-auto md:flex">
          <Button variant="outline" size="sm">
            Invoice
          </Button>
          <Button size="sm">Update Status</Button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
        <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Order Details</CardTitle>
              <Button variant="outline" size="sm" onClick={() => copyToClipboard(order.orderId)}>
                <Copy className="h-3 w-3 mr-2" />
                Copy Order ID
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Order Date</span>
                  <span>{format(new Date(order.orderDate), 'PPpp')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment Method</span>
                  <span>{order.paymentMethod}</span>
                </div>
                 <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment Status</span>
                   <Badge variant={order.paymentStatus === 'Paid' ? 'default' : 'secondary'} className={order.paymentStatus === 'Paid' ? 'bg-green-600' : ''}>
                    {order.paymentStatus}
                   </Badge>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex justify-between w-full font-semibold">
                <span>Total Amount</span>
                <span>₹{order.amount.toLocaleString('en-IN')}</span>
              </div>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-4">
                <Image
                  src={order.product.image}
                  alt={order.product.name}
                  width={80}
                  height={80}
                  className="rounded-md object-cover"
                />
                <div className="flex-grow">
                  <Link href={`/products/${order.product.id}`} className="font-semibold hover:underline">
                    {order.product.name}
                  </Link>
                  <p className="text-sm text-muted-foreground">
                    Type: <Badge variant="outline">{order.product.type}</Badge>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Quantity: {order.product.quantity}
                  </p>
                </div>
                <p className="font-semibold">₹{order.amount.toLocaleString('en-IN')}</p>
              </div>
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
              <CardTitle>Order Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative pl-6">
                <div className="absolute left-[11px] top-1 h-full w-0.5 bg-border"></div>
                {order.history.map((entry, index) => (
                  <div key={index} className="relative flex items-start gap-4 mb-6 last:mb-0">
                    <div className={cn(
                        "flex h-6 w-6 items-center justify-center rounded-full bg-background border-2",
                        index === order.history.length - 1 ? "border-primary" : "border-muted"
                     )}>
                      <div className={cn("h-3 w-3 rounded-full", index === order.history.length - 1 ? "bg-primary" : "bg-muted-foreground")}></div>
                    </div>
                    <div className="flex-1 -mt-1.5">
                      <p className="font-semibold">{entry.status}</p>
                      <p className="text-xs text-muted-foreground">{format(new Date(entry.date), 'PP p')}</p>
                       {entry.notes && <p className="text-sm text-muted-foreground mt-1 italic">&quot;{entry.notes}&quot;</p>}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Customer</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Name</span>
                <Link href={`/admin/users/${order.customer.id}`} className="font-semibold hover:underline">{order.customer.name}</Link>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Email</span>
                <span className="font-semibold text-right truncate">{order.customer.email}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Phone</span>
                <span className="font-semibold">{order.customer.contact}</span>
              </div>
               <Separator />
               <div>
                  <h4 className="text-sm font-semibold text-muted-foreground mb-2">Shipping Address</h4>
                  <address className="not-italic text-sm">
                    {order.customer.shippingAddress.street}<br />
                    {order.customer.shippingAddress.city}, {order.customer.shippingAddress.state} {order.customer.shippingAddress.zip}
                  </address>
               </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
