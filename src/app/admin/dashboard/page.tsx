
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Package, ShoppingCart, Users, CheckCircle, Clock, XCircle, MoreHorizontal } from "lucide-react";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from '@/hooks/use-toast';
import { type SellRequest } from '@/types/user';

const statusConfig: Record<SellRequest['status'], { icon: React.ReactNode; color: string; badge: string; }> = {
    Pending: { icon: <Clock className="h-3 w-3" />, color: "text-yellow-600 bg-yellow-100/60 border-yellow-500/30", badge: "bg-yellow-500" },
    Approved: { icon: <CheckCircle className="h-3 w-3" />, color: "text-green-600 bg-green-100/60 border-green-500/30", badge: "bg-green-500" },
    Rejected: { icon: <XCircle className="h-3 w-3" />, color: "text-red-600 bg-red-100/60 border-red-500/30", badge: "bg-red-500" },
};

export default function AdminDashboardPage() {
  const { toast } = useToast();
  const [currentSellRequests, setCurrentSellRequests] = useState<SellRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSellRequests();
  }, []);

  const fetchSellRequests = async () => {
    try {
      const response = await fetch('/api/admin/sell-requests');
      if (response.ok) {
        const data = await response.json();
        setCurrentSellRequests(data.sellRequests || []);
      }
    } catch (error) {
      console.error('Error fetching sell requests:', error);
      toast({
        title: "Error",
        description: "Failed to fetch sell requests",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateSellRequestStatus = async (id: string, status: 'Approved' | 'Rejected') => {
    try {
      const action = status === 'Approved' ? 'approve' : 'reject';
      const response = await fetch(`/api/admin/sell-requests/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action }),
      });

      if (response.ok) {
        // Update local state
        setCurrentSellRequests(prev => 
          prev.map(req => 
            req.id === id ? { ...req, status } : req
          )
        );
        
        toast({
          title: `Request ${status}`,
          description: `The sell request has been marked as ${status.toLowerCase()}.`,
        });
      } else {
        throw new Error('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating sell request status:', error);
      toast({
        title: "Error",
        description: "Failed to update request status",
        variant: "destructive",
      });
    }
  };

  const handleStatusChange = (id: string, status: 'Approved' | 'Rejected') => {
    updateSellRequestStatus(id, status);
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 py-4">
         <h1 className="font-headline text-2xl font-bold">Admin Dashboard</h1>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Link href="/admin/revenue">
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
          </Link>
           <Link href="/admin/users">
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
          </Link>
          <Link href="/admin/orders">
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
          </Link>
          <Link href="/admin/products">
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
          </Link>
        </div>
        <Card>
            <CardHeader>
                <CardTitle>Recent Sell Requests</CardTitle>
                <CardDescription>A list of the most recent manual sell requests from users.</CardDescription>
            </CardHeader>
            <CardContent>
                {loading ? (
                  <div className="text-center py-8">Loading sell requests...</div>
                ) : currentSellRequests.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">No sell requests found.</div>
                ) : (
                  <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead className="hidden sm:table-cell">Seller</TableHead>
                        <TableHead>Item</TableHead>
                        <TableHead>Asking Price</TableHead>
                        <TableHead className="hidden md:table-cell">Status</TableHead>
                        <TableHead>
                            <span className="sr-only">Actions</span>
                        </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentSellRequests.map((request) => (
                        <TableRow key={request.id}>
                           <TableCell className="hidden sm:table-cell">
                                <div className="font-medium">{request.fullName}</div>
                                <div className="text-sm text-muted-foreground">{request.email}</div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-start gap-4">
                                     <Image
                                        src={request.imageUrls[0] || '/images/products/background.jpg'}
                                        alt={request.title}
                                        width={64}
                                        height={64}
                                        className="hidden sm:block rounded-md object-cover"
                                     />
                                    <div>
                                        <div className="font-medium">{request.title}</div>
                                        <div className="text-sm text-muted-foreground">{request.category}</div>
                                         <p className="max-w-xs truncate text-xs text-muted-foreground mt-1 hidden lg:block">{request.description}</p>
                                    </div>
                                </div>
                            </TableCell>
                             <TableCell>₹{request.price.toLocaleString('en-IN')}</TableCell>
                             <TableCell className="hidden md:table-cell">
                                <Badge variant="outline" className={`gap-2 border ${statusConfig[request.status].color}`}>
                                     {statusConfig[request.status].icon}
                                     {request.status}
                                </Badge>
                             </TableCell>
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
                                    <DropdownMenuItem asChild>
                                      <Link href={`/admin/requests/${request.id}`}>View Details</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => handleStatusChange(request.id, 'Approved')}>Approve</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleStatusChange(request.id, 'Rejected')}>Reject</DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
                )}
            </CardContent>
        </Card>
      </main>
    </div>
  )
}
