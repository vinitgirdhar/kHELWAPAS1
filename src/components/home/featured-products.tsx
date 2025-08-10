'use client';

import { useState, useEffect } from 'react';
import ProductCard, { type Product } from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  CricketBatIcon,
} from '@/components/icons/cricket-bat';
import { Goal, DiscAlbum } from 'lucide-react';
import { ShuttlecockIcon } from '../icons/shuttlecock';

const allProducts: Product[] = [
  {
    id: '1',
    name: 'Pro Grade Cricket Bat',
    category: 'Cricket',
    type: 'preowned',
    price: 150,
    grade: 'Excellent',
    image: 'https://placehold.co/600x600.png',
    dataAiHint: 'cricket bat',
    badge: 'Inspected',
  },
  {
    id: '2',
    name: 'Championship Football',
    category: 'Football',
    type: 'new',
    price: 45,
    image: 'https://placehold.co/600x600.png',
    dataAiHint: 'football ball',
    badge: 'Bestseller',
  },
  {
    id: '3',
    name: 'Featherlight Badminton Racket',
    category: 'Badminton',
    type: 'preowned',
    price: 75,
    grade: 'Good',
    image: 'https://placehold.co/600x600.png',
    dataAiHint: 'badminton racket',
  },
  {
    id: '4',
    name: 'Grand Slam Tennis Racket',
    category: 'Tennis',
    type: 'new',
    price: 120,
    image: 'https://placehold.co/600x600.png',
    dataAiHint: 'tennis racket',
  },
  {
    id: '5',
    name: 'Starter Cricket Kit',
    category: 'Cricket',
    type: 'new',
    price: 99,
    image: 'https://placehold.co/600x600.png',
    dataAiHint: 'cricket equipment',
    badge: 'Sale',
  },
  {
    id: '6',
    name: 'Classic Leather Football',
    category: 'Football',
    type: 'preowned',
    price: 25,
    grade: 'Refurbished',
    image: 'https://placehold.co/600x600.png',
    dataAiHint: 'vintage football',
    badge: 'Refurbished',
  },
];

const categories = [
  { name: 'All', icon: null },
  { name: 'Cricket', icon: <CricketBatIcon className="h-5 w-5" /> },
  { name: 'Football', icon: <Goal className="h-5 w-5" /> },
  { name: 'Badminton', icon: <ShuttlecockIcon className="h-5 w-5" /> },
  { name: 'Tennis', icon: <DiscAlbum className="h-5 w-5" /> },
];

export default function FeaturedProducts() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setLoading(true);
    // Simulate network delay
    const timer = setTimeout(() => {
      if (activeCategory === 'All') {
        setFilteredProducts(allProducts);
      } else {
        setFilteredProducts(
          allProducts.filter((p) => p.category === activeCategory)
        );
      }
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [activeCategory]);
  
  if (!isMounted) {
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
                          variant={'outline'}
                          className="gap-2"
                        >
                          {category.icon}
                          <span>{category.name}</span>
                        </Button>
                    ))}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="flex flex-col gap-4">
                            <Skeleton className="h-64 w-full" />
                            <Skeleton className="h-6 w-3/4" />
                            <Skeleton className="h-6 w-1/4" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
  }


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
              onClick={() => setActiveCategory(category.name)}
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
