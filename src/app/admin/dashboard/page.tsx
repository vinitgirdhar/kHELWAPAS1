
'use client';

import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Package, ShoppingCart, Users, CheckCircle, Clock, XCircle } from "lucide-react";
import { sellRequests, type SellRequest } from '@/lib/sell-requests';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const statusConfig = {
    Pending: { icon: <Clock className="h-4 w-4" />, color: "bg-yellow-500" },
    Approved: { icon: <CheckCircle className="h-4 w-4" />, color: "bg-green-500" },
    Rejected: { icon: <XCircle className="h-4 w-4" />, color: "bg-red-500" },
};


export default function AdminDashboardPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 py-4">
         <h1 className="font-headline text-2xl font-bold">Admin Dashboard</h1>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <BarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹1,250,345</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
           <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                New Users
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+2,350</div>
              <p className="text-xs text-muted-foreground">
                +180.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+12,234</div>
              <p className="text-xs text-muted-foreground">
                +19% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Products Listed
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+573</div>
              <p className="text-xs text-muted-foreground">
                +201 since last hour
              </p>
            </CardContent>
          </Card>
        </div>
        <Card>
            <CardHeader>
                <CardTitle>Recent Sell Requests</CardTitle>
                <CardDescription>A list of the most recent manual sell requests.</CardDescription>
            </CardHeader>
            <CardContent>
                 <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>Seller</TableHead>
                        <TableHead>Item</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Images</TableHead>
                        <TableHead>Asking Price</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sellRequests.map((request) => (
                        <TableRow key={request.id}>
                            <TableCell>
                                <div className="font-medium">{request.fullName}</div>
                                <div className="text-sm text-muted-foreground">{request.email}</div>
                            </TableCell>
                            <TableCell>
                                <div className="font-medium">{request.title}</div>
                                <div className="text-sm text-muted-foreground">{request.category}</div>
                            </TableCell>
                             <TableCell>
                                <p className="max-w-xs truncate">{request.description}</p>
                            </TableCell>
                            <TableCell>
                                <div className="flex -space-x-4 rtl:space-x-reverse">
                                {request.imageUrls.slice(0, 3).map((url, index) => (
                                    <Image
                                        key={index}
                                        src={url}
                                        alt={`Item image ${index + 1}`}
                                        width={40}
                                        height={40}
                                        className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800 object-cover"
                                    />
                                ))}
                                {request.imageUrls.length > 3 && (
                                     <a className="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800" href="#">
                                        +{request.imageUrls.length - 3}
                                    </a>
                                )}
                                </div>
                            </TableCell>
                             <TableCell>₹{request.price.toLocaleString('en-IN')}</TableCell>
                             <TableCell>
                                <Badge variant="outline" className="flex items-center gap-2">
                                     <div className={`h-2.5 w-2.5 rounded-full ${statusConfig[request.status].color}`} />
                                     {request.status}
                                </Badge>
                             </TableCell>
                              <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="sm">Actions</Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                                        <DropdownMenuItem>Approve</DropdownMenuItem>
                                        <DropdownMenuItem>Reject</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
      </main>
    </div>
  )
}
