
'use client';

import * as React from 'react';
import Image from 'next/image';
import { MoreHorizontal, PlusCircle, Search } from 'lucide-react';
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
import { allProducts, Product } from '@/lib/products';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

const statusConfig: Record<Product['status'], string> = {
  'In Stock': 'bg-green-100 text-green-800 border-green-200',
  'Out of Stock': 'bg-red-100 text-red-800 border-red-200',
};

const typeConfig: Record<Product['type'], string> = {
    new: 'bg-blue-100 text-blue-800 border-blue-200',
    preowned: 'bg-yellow-100 text-yellow-800 border-yellow-200',
};

export default function AdminProductsPage() {
    const [searchTerm, setSearchTerm] = React.useState('');
    const [filteredProducts, setFilteredProducts] = React.useState(allProducts);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);
        if (term) {
            setFilteredProducts(allProducts.filter(p => p.name.toLowerCase().includes(term) || p.sku.toLowerCase().includes(term)));
        } else {
            setFilteredProducts(allProducts);
        }
    };

    const getProductsForTab = (tab: string) => {
        if (tab === 'all') return filteredProducts;
        return filteredProducts.filter(p => p.type === tab);
    };

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <Tabs defaultValue="all" onValueChange={(value) => {
          // This logic can be expanded if server-side filtering is added
      }}>
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="new">New</TabsTrigger>
            <TabsTrigger value="preowned">Pre-owned</TabsTrigger>
          </TabsList>
           <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by name or SKU..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button size="sm" variant="outline" className="h-7 gap-1" asChild>
              <Link href="/admin/products/new">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Add Product
                </span>
              </Link>
            </Button>
          </div>
        </div>
        <TabsContent value="all">
          <ProductTable products={getProductsForTab('all')} />
        </TabsContent>
        <TabsContent value="new">
          <ProductTable products={getProductsForTab('new')} />
        </TabsContent>
        <TabsContent value="preowned">
          <ProductTable products={getProductsForTab('preowned')} />
        </TabsContent>
      </Tabs>
    </main>
  );
}


function ProductTable({ products }: { products: Product[] }) {
    const { toast } = useToast();

    const handleAction = (action: string, productName: string) => {
        toast({
            title: `Action: ${action}`,
            description: `${productName} has been ${action.toLowerCase()}ed.`,
        });
    };

    return (
        <Card>
          <CardHeader>
            <CardTitle>Products</CardTitle>
            <CardDescription>
              Manage your products and view their sales performance.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="hidden w-[100px] sm:table-cell">
                    <span className="sr-only">Image</span>
                  </TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="hidden md:table-cell">Price</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Listed On
                  </TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                   <TableRow key={product.id}>
                    <TableCell className="hidden sm:table-cell">
                      <Image
                        alt={product.name}
                        className="aspect-square rounded-md object-cover"
                        height="64"
                        src={product.image}
                        width="64"
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                        {product.name}
                        <div className="text-xs text-muted-foreground">{product.sku}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={statusConfig[product.status]}>
                        {product.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={typeConfig[product.type]}>
                        {product.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      ₹{product.price.toLocaleString('en-IN')}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {new Date(product.listingDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem asChild>
                            <Link href="/admin/products/new">Edit</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleAction('Paus', product.name)}>Pause Listing</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive" onClick={() => handleAction('Delet', product.name)}>
                            Delete
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
              Showing <strong>1-{products.length}</strong> of <strong>{products.length}</strong> products
            </div>
          </CardFooter>
        </Card>
    )
}
