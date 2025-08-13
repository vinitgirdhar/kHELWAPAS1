import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ShoppingCart, Tag } from 'lucide-react';

export default function Hero() {
  return (
    <section 
      className="relative bg-cover bg-center md:bg-fixed"
      style={{ backgroundImage: "url('/images/background.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative container flex items-center justify-center text-center py-24 md:py-40">
        <div className="flex flex-col gap-6 max-w-3xl">
          <div className="glass-container rounded-2xl">
            <div className="glass-filter backdrop-blur-md" />
            <div className="glass-overlay bg-black/20" />
            <div className="glass-specular" />
            <div className="glass-content p-8 md:p-12">
              <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white [text-shadow:_2px_2px_4px_rgb(0_0_0_/_30%)]">
                Keep the Game Going.
                <br />
                New & Pre-Owned Gear.
              </h1>
              <p className="mt-4 text-lg md:text-xl text-white/90 max-w-2xl mx-auto [text-shadow:_1px_1px_2px_rgb(0_0_0_/_50%)]">
                India’s first marketplace to buy and sell quality-inspected sports
                equipment. Give your gear a second life or find your next favorite
                piece.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="font-bold shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all">
              <Link href="/sell">
                Sell Now <Tag className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="font-bold shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all">
              <Link href="/shop/preowned">
                Shop Pre-Owned <ShoppingCart className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
