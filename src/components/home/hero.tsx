import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, ShoppingCart, Tag } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative bg-muted/20">
      <div className="container grid lg:grid-cols-2 gap-8 items-center py-20 md:py-32">
        <div className="flex flex-col gap-6 text-center lg:text-left">
          <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
            Keep the Game Going.
            <br />
            New & Pre-Owned Gear.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0">
            India’s first marketplace to buy and sell quality-inspected sports
            equipment. Give your gear a second life or find your next favorite
            piece.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button asChild size="lg" className="font-bold">
              <Link href="/sell">
                Sell Now <Tag className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="font-bold">
              <Link href="/shop/preowned">
                Shop Pre-Owned <ShoppingCart className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Free pickup, instant payments, and a universe of gear awaits.
          </p>
        </div>
        <div className="relative h-64 lg:h-auto lg:self-stretch">
           <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-accent/30 rounded-3xl -rotate-6 transform"></div>
           <div className="absolute inset-0 bg-gradient-to-tl from-secondary/30 to-primary/20 rounded-3xl rotate-6 transform"></div>
           <div 
             className="relative h-full w-full bg-cover bg-center rounded-3xl shadow-2xl"
             style={{ backgroundImage: "url('https://images.unsplash.com/photo-1565992441121-4367c2967103?q=80&w=800&h=600&fit=crop')"}}
             data-ai-hint="sports equipment action"
            >
              <div className="absolute inset-0 bg-black/10 rounded-3xl"></div>
            </div>
        </div>
      </div>
    </section>
  );
}
