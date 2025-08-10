
'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { userAddresses as defaultAddresses, Address } from '@/lib/user-data';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

export default function AddressesPage() {
    const { toast } = useToast();
    const [addresses, setAddresses] = useState<Address[]>([]);

    useEffect(() => {
        const storedAddresses = localStorage.getItem('userAddresses');
        if (storedAddresses) {
            setAddresses(JSON.parse(storedAddresses));
        } else {
            setAddresses(defaultAddresses);
        }
    }, []);

    const updateLocalStorage = (updatedAddresses: Address[]) => {
        localStorage.setItem('userAddresses', JSON.stringify(updatedAddresses));
        setAddresses(updatedAddresses);
    };

    const handleAddAddress = () => {
        const newAddress: Address = {
            id: `addr-${Date.now()}`,
            name: 'New Address',
            street: '123 Placeholder Lane',
            city: 'City',
            state: 'State',
            zip: '000000',
            phone: '0000000000',
            isDefault: false
        };
        const updatedAddresses = [...addresses, newAddress];
        updateLocalStorage(updatedAddresses);
        toast({ title: 'Address Added', description: 'A new address has been added.' });
    };

    const handleDeleteAddress = (id: string) => {
        const updatedAddresses = addresses.filter(address => address.id !== id);
        updateLocalStorage(updatedAddresses);
        toast({ variant: 'destructive', title: 'Address Removed', description: 'The address has been removed.' });
    };

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-start">
        <div>
            <CardTitle>My Addresses</CardTitle>
            <CardDescription>
                Manage your saved shipping addresses.
            </CardDescription>
        </div>
        <Button onClick={handleAddAddress}>
            <Plus className="mr-2 h-4 w-4"/>
            Add New Address
        </Button>
      </CardHeader>
      <CardContent>
        {addresses.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            <p>You have no saved addresses.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {addresses.map((address) => (
              <div key={address.id} className="p-4 border rounded-lg flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-3">
                      <p className="font-semibold">{address.name}</p>
                      {address.isDefault && (
                          <Badge>Default</Badge>
                      )}
                  </div>
                  <p className="text-muted-foreground text-sm mt-1">
                    {address.street}, {address.city}, {address.state} - {address.zip}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Phone: {address.phone}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit Address</span>
                  </Button>
                  <Button variant="destructive" size="icon" onClick={() => handleDeleteAddress(address.id)}>
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete Address</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
