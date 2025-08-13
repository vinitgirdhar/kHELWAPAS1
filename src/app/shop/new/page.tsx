
'use client';

import { useState, useEffect } from 'react';
import ProductCard, { type Product } from '@/components/product-card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { allProducts } from '@/lib/products';
import { Filter, X } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function NewGearPage() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [brands, setBrands] = useState<string[]>([]);
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);

  const allCategories = Array.from(new Set(allProducts.filter(p => p.type === 'new').map(p => p.category)));
  const allBrands = ['Premium Brands', 'Local Makers'];

  useEffect(() => {
    const timer = setTimeout(() => {
      const newGear = allProducts.filter((p) => p.type === 'new');
      setProducts(newGear);
      setFilteredProducts(newGear);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    let newItems = products;

    if (categories.length > 0) {
      newItems = newItems.filter(p => categories.includes(p.category));
    }

    if (brands.length > 0) {
      newItems = newItems.filter(p => {
        if(p.badge === 'Bestseller' && brands.includes('Premium Brands')) return true;
        if(p.badge !== 'Bestseller' && brands.includes('Local Makers')) return true;
        return false;
      })
    }

    newItems = newItems.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    setFilteredProducts(newItems);
  }, [categories, brands, priceRange, products]);


  const handleCategoryChange = (category: string) => {
    setCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };
  
  const handleBrandChange = (brand: string) => {
    setBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(g => g !== brand)
        : [...prev, brand]
    );
  };

  const clearFilters = () => {
    setCategories([]);
    setBrands([]);
    setPriceRange([0, 20000]);
  }
  
  const activeFilters = [...categories, ...brands];

  const FilterPanelContent = () => (
    <div className="flex flex-col gap-6 p-6 bg-card rounded-lg border h-full">
        <div className="flex justify-between items-center">
            <h3 className="font-headline text-xl font-semibold">Filters</h3>
            <Button variant="ghost" size="sm" onClick={clearFilters}>Clear All</Button>
        </div>

        <Accordion type="multiple" defaultValue={['category', 'brand', 'price']} className="w-full">
            <AccordionItem value="category">
            <AccordionTrigger className="font-semibold">Category</AccordionTrigger>
            <AccordionContent>
                <div className="space-y-2">
                {allCategories.map(category => (
                    <div key={category} className="flex items-center space-x-2">
                    <Checkbox 
                        id={`cat-${category}`} 
                        checked={categories.includes(category)}
                        onCheckedChange={() => handleCategoryChange(category)}
                        />
                    <Label htmlFor={`cat-${category}`}>{category}</Label>
                    </div>
                ))}
                </div>
            </AccordionContent>
            </AccordionItem>

            <AccordionItem value="brand">
            <AccordionTrigger className="font-semibold">Brand Origin</AccordionTrigger>
            <AccordionContent>
                <div className="space-y-2">
                {allBrands.map(brand => (
                    <div key={brand} className="flex items-center space-x-2">
                    <Checkbox 
                        id={`brand-${brand}`} 
                        checked={brands.includes(brand)}
                        onCheckedChange={() => handleBrandChange(brand)}
                        />
                    <Label htmlFor={`brand-${brand}`}>{brand}</Label>
                    </div>
                ))}
                </div>
            </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="price">
            <AccordionTrigger className="font-semibold">Price Range</AccordionTrigger>
            <AccordionContent>
                <div className="py-4">
                <Slider
                    min={0}
                    max={20000}
                    step={500}
                    value={priceRange}
                    onValueChange={setPriceRange}
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-2">
                    <span>₹{priceRange[0].toLocaleString('en-IN')}</span>
                    <span>₹{priceRange[1].toLocaleString('en-IN')}</span>
                </div>
                </div>
            </AccordionContent>
            </AccordionItem>
        </Accordion>

        <div className="mt-auto">
            <Separator className="mb-4" />
            <Button className="w-full" onClick={() => setIsFilterSheetOpen(false)}>Apply Filters</Button>
        </div>
    </div>
  );


  return (
    <div className="bg-muted/20">
    <div className="container py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tighter">
          Shop New Gear
        </h1>
        <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
          Discover equipment from premium brands and talented local makers, all under the Khelwapas quality promise.
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex items-center gap-4">
            <Sheet open={isFilterSheetOpen} onOpenChange={setIsFilterSheetOpen}>
                <SheetTrigger asChild>
                    <Button variant="outline">
                        <Filter className="mr-2 h-4 w-4" />
                        Filters
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0">
                   <FilterPanelContent />
                </SheetContent>
            </Sheet>

            {activeFilters.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap">
                    {categories.map(cat => (
                         <Badge key={cat} variant="secondary" className="gap-1 pr-1">
                            {cat}
                            <button onClick={() => handleCategoryChange(cat)} className="h-4 w-4 rounded-full bg-background text-muted-foreground hover:bg-destructive hover:text-destructive-foreground flex items-center justify-center">
                                <X className="h-3 w-3" />
                            </button>
                        </Badge>
                    ))}
                     {brands.map(brand => (
                         <Badge key={brand} variant="secondary" className="gap-1 pr-1">
                            {brand}
                            <button onClick={() => handleBrandChange(brand)} className="h-4 w-4 rounded-full bg-background text-muted-foreground hover:bg-destructive hover:text-destructive-foreground flex items-center justify-center">
                                <X className="h-3 w-3" />
                            </button>
                        </Badge>
                    ))}
                </div>
            )}
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto self-end">
            <span className="text-sm font-medium text-muted-foreground shrink-0">Sort by:</span>
            <Select defaultValue="newest">
            <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
            </SelectContent>
            </Select>
        </div>
      </div>


      <main>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {loading
              ? Array.from({ length: 8 }).map((_, i) => (
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
  );
}
