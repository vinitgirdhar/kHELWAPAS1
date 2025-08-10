
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/hooks/use-cart';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AddressStep from '@/components/checkout/address-step';
import PaymentStep from '@/components/checkout/payment-step';
import OrderSummary from '@/components/checkout/order-summary';
import type { Address } from '@/lib/user-data';
import type { PaymentMethod } from '@/lib/user-data';
import { ShoppingCart, BaggageClaim } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const { toast } = useToast();
  const router = useRouter();
  const { items, removeAll } = useCart();
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handlePlaceOrder = () => {
    if (!selectedAddress) {
      toast({ variant: 'destructive', title: 'Error', description: 'Please select a shipping address.' });
      return;
    }
    if (!selectedPayment) {
      toast({ variant: 'destructive', title: 'Error', description: 'Please select a payment method.' });
      return;
    }

    // In a real app, this would trigger a payment processing API call.
    // Here we simulate a successful order.
    console.log('Order placed:', {
      items,
      shippingAddress: selectedAddress,
      paymentMethod: selectedPayment,
    });
    
    // On success:
    toast({ title: 'Order Placed!', description: 'Thank you for your purchase.' });
    removeAll();
    router.push('/checkout/success');
  };

  if (!isMounted) {
    return null; 
  }

  if (items.length === 0) {
    return (
        <div className="container py-20 text-center">
             <BaggageClaim className="h-24 w-24 text-muted-foreground mx-auto mb-6"/>
            <h1 className="font-headline text-4xl font-bold">Your Cart is Empty</h1>
            <p className="mt-4 text-lg text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
            <Button asChild className="mt-8">
                <Link href="/shop/preowned">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Start Shopping
                </Link>
            </Button>
        </div>
    )
  }

  return (
    <div className="container py-12 md:py-16">
      <h1 className="font-headline text-3xl md:text-4xl font-bold tracking-tight mb-8">Checkout</h1>
      <div className="grid lg:grid-cols-3 gap-12 items-start">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardContent className="p-6">
              <AddressStep
                selectedAddress={selectedAddress}
                onSelectAddress={setSelectedAddress}
              />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <PaymentStep
                selectedPayment={selectedPayment}
                onSelectPayment={setSelectedPayment}
              />
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-1 sticky top-24">
          <Card>
            <CardContent className="p-6 space-y-6">
              <OrderSummary items={items} />
              <Separator />
              <Button
                size="lg"
                className="w-full font-bold"
                onClick={handlePlaceOrder}
                disabled={!selectedAddress || !selectedPayment}
              >
                Place Order
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
