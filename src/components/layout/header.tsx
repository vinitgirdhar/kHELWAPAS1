'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Menu,
  Search,
  ShoppingCart,
  UserCircle,
  X,
} from "lucide-react";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { KhelwapasLogo } from '@/components/icons/khelwapas-logo';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetTrigger,

} from '@/components/ui/sheet';

const mainNav = [
  { href: '/shop/preowned', label: 'Shop Pre-Owned' },
  { href: '/shop/new', label: 'Shop New Gear' },
  { href: '/sell', label: 'Sell Now' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center">
        <Link href="/" className="mr-6 flex items-center gap-2">
          <KhelwapasLogo />
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-4">
          <div className="hidden items-center gap-2 md:flex">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search gear..." className="pl-9 w-48" />
            </div>
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Cart</span>
            </Button>
            <Button variant="ghost" size="icon">
              <UserCircle className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Button>
          </div>
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between border-b pb-4">
                  <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                    <KhelwapasLogo />
                  </Link>
                </div>
                <nav className="flex flex-col gap-4 py-4">
                  {mainNav.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-lg font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
                <div className="mt-auto border-t pt-4">
                   <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search gear..." className="pl-9" />
                  </div>
                  <div className="flex items-center justify-around">
                     <Button variant="ghost" size="icon" className="h-10 w-10">
                        <ShoppingCart className="h-6 w-6" />
                        <span className="sr-only">Cart</span>
                      </Button>
                      <Button variant="ghost" size="icon" className="h-10 w-10">
                        <UserCircle className="h-6 w-6" />
                        <span className="sr-only">Account</span>
                      </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
