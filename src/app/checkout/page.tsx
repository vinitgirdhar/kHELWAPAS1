
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AddressStep from '@/components/checkout/address-step';
import type { Address } from '@/lib/user-data';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';


export default function CheckoutPage() {
  const { toast } = useToast();
  const router = useRouter();
  const { items } = useCart();
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Persist selected address across reloads if needed, e.g., in sessionStorage
    const storedAddress = sessionStorage.getItem('selectedAddress');
    if (storedAddress) {
      setSelectedAddress(JSON.parse(storedAddress));
    }
  }, []);

  const handleSelectAddress = (address: Address) => {
    setSelectedAddress(address);
    // Store selected address to persist it if user navigates away and comes back
    sessionStorage.setItem('selectedAddress', JSON.stringify(address));
  }

  const handleContinueToPayment = () => {
    if (!selectedAddress) {
      toast({ variant: 'destructive', title: 'Error', description: 'Please select a shipping address.' });
      return;
    }
    router.push('/checkout/payment');
  };

  if (!isMounted || items.length === 0) {
    // We can show a loading state or redirect if cart is empty
    return null;
  }

  return (
    <div className="container py-12 md:py-16">
       <div className="flex items-center gap-4 mb-8">
        <Button asChild variant="outline" size="icon" className="h-8 w-8">
            <Link href="/cart">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back to cart</span>
            </Link>
        </Button>
        <h1 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">Shipping Address</h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-12 items-start">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <AddressStep
                selectedAddress={selectedAddress}
                onSelectAddress={handleSelectAddress}
              />
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-1 sticky top-24">
          <Card>
            <CardContent className="p-6 space-y-6">
               <h2 className="font-headline text-2xl font-semibold">Next Step</h2>
               <p className="text-muted-foreground">
                Once you select an address, you can proceed to the payment page to complete your order.
               </p>
              <Button
                size="lg"
                className="w-full font-bold"
                onClick={handleContinueToPayment}
                disabled={!selectedAddress}
              >
                Continue to Payment
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
