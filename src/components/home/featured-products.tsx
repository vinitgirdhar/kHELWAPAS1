'use client';

import { useState, useEffect } from 'react';
import ProductCard, { type Product } from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  CricketBatIcon,
} from '@/components/icons/cricket-bat';
import { Goal, DiscAlbum, Dumbbell, PersonStanding, Bike, Wind } from 'lucide-react';
import { ShuttlecockIcon } from '../icons/shuttlecock';
import { allProducts } from '@/lib/products';

const categories = [
  { name: 'All', icon: null },
  { name: 'Cricket', icon: <CricketBatIcon className="h-5 w-5" /> },
  { name: 'Football', icon: <Goal className="h-5 w-5" /> },
  { name: 'Badminton', icon: <ShuttlecockIcon className="h-5 w-5" /> },
  { name: 'Tennis', icon: <DiscAlbum className="h-5 w-5" /> },
];

export default function FeaturedProducts() {
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      if (activeCategory === 'All') {
        setFilteredProducts(allProducts.slice(0,6));
      } else {
        setFilteredProducts(
          allProducts.filter((p) => p.category === activeCategory)
        );
      }
      setLoading(false);
    }, 500); // Short delay to show loading state

    return () => clearTimeout(timer);
  }, [activeCategory]);
  

  return (
    <section className="py-20 bg-muted/20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">
            Featured Gear
          </h2>
          <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
            Top picks from our collection, ready for their next game.
          </p>
        </div>
        <div className="flex justify-center flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category.name}
              variant={activeCategory === category.name ? 'default' : 'outline'}
              onClick={() => {
                if(activeCategory !== category.name) {
                  setLoading(true);
                  setActiveCategory(category.name);
                }
              }}
              className="gap-2"
            >
              {category.icon}
              <span>{category.name}</span>
            </Button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
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
      </div>
    </section>
  );
}
