
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { userAddresses, Address } from '@/lib/user-data';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

export default function AddressesPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-start">
        <div>
            <CardTitle>My Addresses</CardTitle>
            <CardDescription>
                Manage your saved shipping addresses.
            </CardDescription>
        </div>
        <Button>
            <Plus className="mr-2 h-4 w-4"/>
            Add New Address
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {userAddresses.map((address) => (
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
                <Button variant="destructive" size="icon">
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete Address</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
