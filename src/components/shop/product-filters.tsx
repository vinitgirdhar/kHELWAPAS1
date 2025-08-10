'use client';

import { useState, useEffect } from 'react';
import type { Product } from '@/components/product-card';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

interface ProductFiltersProps {
  allProducts: Product[];
  onFilterChange: (filteredProducts: Product[]) => void;
}

export default function ProductFilters({ allProducts, onFilterChange }: ProductFiltersProps) {
  const [categories, setCategories] = useState<string[]>([]);
  const [grades, setGrades] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 20000]);
  
  const allCategories = Array.from(new Set(allProducts.map(p => p.category)));
  const allGrades = ['A', 'B', 'C', 'D'];

  useEffect(() => {
    let filtered = allProducts;

    if (categories.length > 0) {
      filtered = filtered.filter(p => categories.includes(p.category));
    }

    if (grades.length > 0) {
      filtered = filtered.filter(p => p.grade && grades.includes(p.grade));
    }

    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    onFilterChange(filtered);
  }, [categories, grades, priceRange, allProducts, onFilterChange]);

  const handleCategoryChange = (category: string) => {
    setCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };
  
  const handleGradeChange = (grade: string) => {
    setGrades(prev => 
      prev.includes(grade) 
        ? prev.filter(g => g !== grade)
        : [...prev, grade]
    );
  };

  const clearFilters = () => {
    setCategories([]);
    setGrades([]);
    setPriceRange([0, 20000]);
  }

  return (
    <div className="flex flex-col gap-6 p-6 bg-card rounded-lg border">
      <div className="flex justify-between items-center">
        <h3 className="font-headline text-xl font-semibold">Filters</h3>
        <Button variant="ghost" size="sm" onClick={clearFilters}>Clear All</Button>
      </div>

      <Accordion type="multiple" defaultValue={['category', 'grade', 'price']} className="w-full">
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

        <AccordionItem value="grade">
          <AccordionTrigger className="font-semibold">Condition</AccordionTrigger>
          <AccordionContent>
             <div className="space-y-2">
              {allGrades.map(grade => (
                <div key={grade} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`grade-${grade}`} 
                    checked={grades.includes(grade)}
                    onCheckedChange={() => handleGradeChange(grade)}
                    />
                  <Label htmlFor={`grade-${grade}`}>Grade {grade}</Label>
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
    </div>
  );
}
