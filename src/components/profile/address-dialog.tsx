
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { type Address } from '@/lib/user-data';
import { useEffect } from 'react';
import { Checkbox } from '../ui/checkbox';
import { Separator } from '../ui/separator';

const addressSchema = z.object({
  name: z.string().min(2, 'A name for the address is required.'),
  street: z.string().min(5, 'Street address is required.'),
  city: z.string().min(2, 'City is required.'),
  state: z.string().min(2, 'State is required.'),
  zip: z.string().min(5, 'A valid ZIP code is required.'),
  phone: z.string().min(10, 'A valid phone number is required.'),
  isDefault: z.boolean().default(false),
});

type AddressFormValues = z.infer<typeof addressSchema>;

interface AddressDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSave: (address: Address) => void;
  address: Address | null;
}

export function AddressDialog({ isOpen, onOpenChange, onSave, address }: AddressDialogProps) {
  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
        name: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        phone: '',
        isDefault: false,
    },
  });

  useEffect(() => {
    if (address) {
      form.reset(address);
    } else {
      form.reset({
        name: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        phone: '',
        isDefault: false,
      });
    }
  }, [address, form, isOpen]);

  const onSubmit = (data: AddressFormValues) => {
    const newOrUpdatedAddress: Address = {
      id: address?.id || `addr-${Date.now()}`,
      ...data,
    };
    onSave(newOrUpdatedAddress);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{address ? 'Edit Address' : 'Add New Address'}</DialogTitle>
          <DialogDescription>
            Enter the details for the shipping address. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
             <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Address Name</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g. Home, Work" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street Address</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Main Street" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
                <FormField control={form.control} name="city" render={({ field }) => (
                    <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl><Input placeholder="Mumbai" {...field} /></FormControl>
                    <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="state" render={({ field }) => (
                    <FormItem>
                    <FormLabel>State</FormLabel>
                    <FormControl><Input placeholder="Maharashtra" {...field} /></FormControl>
                    <FormMessage />
                    </FormItem>
                )} />
            </div>
             <div className="grid grid-cols-2 gap-4">
                <FormField control={form.control} name="zip" render={({ field }) => (
                    <FormItem>
                    <FormLabel>ZIP Code</FormLabel>
                    <FormControl><Input placeholder="400001" {...field} /></FormControl>
                    <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="phone" render={({ field }) => (
                    <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl><Input placeholder="9876543210" {...field} /></FormControl>
                    <FormMessage />
                    </FormItem>
                )} />
            </div>
             <FormField
                control={form.control}
                name="isDefault"
                render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                        <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                        <FormLabel>
                        Set as default address
                        </FormLabel>
                    </div>
                    </FormItem>
                )}
                />
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button type="submit">Save Address</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
