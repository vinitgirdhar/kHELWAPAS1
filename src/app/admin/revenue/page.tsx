
'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Pie, PieChart, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DollarSign, Users, ShoppingCart, Package } from "lucide-react";
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const revenueData = [
  { month: 'Jan', revenue: 120000 },
  { month: 'Feb', revenue: 150000 },
  { month: 'Mar', revenue: 175000 },
  { month: 'Apr', revenue: 210000 },
  { month: 'May', revenue: 190000 },
  { month: 'Jun', revenue: 230000 },
];

const salesTypeData = [
  { name: 'Pre-Owned', value: 400, color: '#1E3A8A' },
  { name: 'New Gear', value: 300, color: '#F97316' },
  { name: 'Refurbished', value: 200, color: '#10B981' },
];

const recentSales = [
  { id: 'ORD-001', customer: 'Priya Patel', type: 'Pre-Owned', status: 'Paid', date: '2024-07-28', amount: 8500 },
  { id: 'ORD-002', customer: 'Amit Singh', type: 'New Gear', status: 'Paid', date: '2024-07-27', amount: 15000 },
  { id: 'ORD-003', customer: 'Sneha Sharma', type: 'Refurbished', status: 'Pending', date: '2024-07-27', amount: 3200 },
  { id: 'ORD-004', customer: 'Rohan Sharma', type: 'Pre-Owned', status: 'Paid', date: '2024-07-26', amount: 12000 },
  { id: 'ORD-005', customer: 'Anjali Verma', type: 'New Gear', status: 'Cancelled', date: '2024-07-25', amount: 5500 },
];

const statusConfig: Record<string, string> = {
  Paid: 'bg-green-100 text-green-800',
  Pending: 'bg-yellow-100 text-yellow-800',
  Cancelled: 'bg-red-100 text-red-800',
}

export default function AdminRevenuePage() {
  return (
    <div className="flex-1 space-y-8 p-4 sm:p-8 pt-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-3xl font-bold tracking-tight">Revenue Analytics</h2>
        <div className="flex flex-col sm:flex-row items-center gap-2">
            <Select defaultValue="this_month">
                <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="this_month">This Month</SelectItem>
                    <SelectItem value="last_3_months">Last 3 Months</SelectItem>
                    <SelectItem value="this_year">This Year</SelectItem>
                </SelectContent>
            </Select>
            <Select defaultValue="all">
                <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Product Types</SelectItem>
                    <SelectItem value="preowned">Pre-Owned</SelectItem>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="refurbished">Refurbished</SelectItem>
                </SelectContent>
            </Select>
            <Button>Apply Filters</Button>
        </div>
      </div>

       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹10,75,000</div>
            <p className="text-xs text-muted-foreground">+15.2% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sales</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+950</div>
            <p className="text-xs text-muted-foreground">+12.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+210</div>
            <p className="text-xs text-muted-foreground">+25% this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Items Sold</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+1,205</div>
            <p className="text-xs text-muted-foreground">+8.5% from last month</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={revenueData}>
                <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${Number(value) / 1000}k`} />
                <Tooltip cursor={{ fill: 'hsl(var(--muted))' }} contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }} />
                <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Sales by Product Type</CardTitle>
            <CardDescription>Breakdown of sales contribution.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                 <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}/>
                <Pie data={salesTypeData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} labelLine={false} label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}>
                  {salesTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

       <Card>
        <CardHeader>
          <CardTitle>Recent Sales</CardTitle>
          <CardDescription>A list of the most recent transactions.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Product Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {recentSales.map((sale) => (
                        <TableRow key={sale.id}>
                            <TableCell className="font-medium">{sale.id}</TableCell>
                            <TableCell>{sale.customer}</TableCell>
                            <TableCell>{sale.type}</TableCell>
                            <TableCell>
                                <Badge variant="outline" className={statusConfig[sale.status]}>{sale.status}</Badge>
                            </TableCell>
                            <TableCell>{sale.date}</TableCell>
                            <TableCell className="text-right">₹{sale.amount.toLocaleString('en-IN')}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
       </Card>

    </div>
  );
}

    