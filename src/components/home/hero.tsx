import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, ShoppingCart, Tag } from 'lucide-react';
import Image from 'next/image';

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
        <div className="relative h-64 lg:h-auto lg:self-stretch flex items-center justify-center">
          <Image
            src="/images/head.png"
            alt="Khel Wapas Logo"
            width={500}
            height={500}
            className="object-contain max-w-[80%] lg:max-w-full"
            priority
          />
        </div>
      </div>
    </section>
  );
}
