import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star } from 'lucide-react';

export type Product = {
  id: string;
  name: string;
  category: string;
  type: 'new' | 'preowned';
  price: number;
  originalPrice?: number;
  grade?: 'A' | 'B' | 'C' | 'D';
  image: string;
  images?: string[];
  badge?: 'Inspected' | 'Refurbished' | 'Bestseller' | 'Sale';
  description?: string;
  specs?: Record<string, string>;
  dataAiHint: string;
};

interface ProductCardProps {
  product: Product;
}

const getBadgeClass = (badge?: Product['badge']) => {
  switch (badge) {
    case 'Inspected':
      return 'bg-green-500 text-white';
    case 'Refurbished':
      return 'bg-blue-500 text-white';
    case 'Bestseller':
      return 'bg-yellow-500 text-black';
    case 'Sale':
      return 'bg-red-500 text-white';
    default:
      return 'bg-secondary text-secondary-foreground';
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <Link href={`/products/${product.id}`} className="flex flex-col h-full">
        <CardContent className="p-0 flex flex-col flex-grow">
          <div className="relative">
            <Image
              src={product.image}
              alt={product.name}
              width={600}
              height={600}
              className="aspect-square object-cover w-full transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={product.dataAiHint}
            />
            {product.badge && (
                <Badge className={`absolute top-3 right-3 ${getBadgeClass(product.badge)}`}>
                  {product.badge}
                </Badge>
            )}
             <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/80 to-transparent" />
             <div className="absolute bottom-4 left-4 right-4">
                 <h3 className="font-headline text-lg font-semibold text-white truncate">{product.name}</h3>
             </div>
          </div>
          <div className="p-4 flex flex-col flex-grow">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm text-muted-foreground">{product.category}</p>
              {product.type === 'preowned' && product.grade && (
                <Badge variant="outline" className="flex items-center gap-1.5">
                  <Star className="h-3 w-3 text-yellow-500" /> Grade: {product.grade}
                </Badge>
              )}
            </div>
            
            <div className="flex-grow"></div>

            <div className="flex justify-between items-center mt-auto">
              <p className="text-2xl font-bold font-headline text-primary">₹{product.price.toLocaleString('en-IN')}</p>
              <Button variant="ghost" size="sm" className="text-primary group-hover:translate-x-1 transition-transform">
                View
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
