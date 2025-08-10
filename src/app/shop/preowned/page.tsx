'use client';

import { useState, useEffect } from 'react';
import ProductCard, { type Product } from '@/components/product-card';
import { Skeleton } from '@/components/ui/skeleton';
import ProductFilters from '@/components/shop/product-filters';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { allProducts } from '@/lib/products';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function PreownedGearPage() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Simulate loading and filter for pre-owned products
    const timer = setTimeout(() => {
      const preOwned = allProducts.filter((p) => p.type === 'preowned');
      setProducts(preOwned);
      setFilteredProducts(preOwned);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-muted/20">
      <div className="container py-12 md:py-16">
        <div className="text-center mb-12">
          <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tighter">
            Pre-Owned Marketplace
          </h1>
          <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
            Find quality-inspected, pre-loved sports gear at great prices.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8 items-start">
          <aside className="hidden lg:block lg:col-span-1 sticky top-20">
            <ProductFilters allProducts={products} onFilterChange={setFilteredProducts} />
          </aside>

          <main className="lg:col-span-3">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search pre-owned..." className="pl-9" />
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-sm font-medium text-muted-foreground shrink-0">Sort by:</span>
                <Select defaultValue="newest">
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    <SelectItem value="condition">Best Condition</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {loading
                ? Array.from({ length: 9 }).map((_, i) => (
                    <div key={i} className="flex flex-col gap-4">
                      <Skeleton className="h-64 w-full" />
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-6 w-1/4" />
                    </div>
                  ))
                : filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
            </div>
            {filteredProducts.length === 0 && !loading && (
              <div className="text-center py-20 col-span-full">
                <h3 className="font-headline text-2xl">No Products Found</h3>
                <p className="text-muted-foreground">Try adjusting your filters.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
