
export type Order = {
  id: string;
  date: string;
  status: 'Delivered' | 'Processing' | 'Cancelled';
  total: number;
};

export const userOrders: Order[] = [
  { id: 'ORD-789123', date: 'June 15, 2024', status: 'Delivered', total: 12000 },
  { id: 'ORD-456789', date: 'May 28, 2024', status: 'Delivered', total: 3600 },
  { id: 'ORD-123456', date: 'April 10, 2024', status: 'Cancelled', total: 7920 },
];

export type Address = {
    id: string;
    name: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
    isDefault: boolean;
};

export const userAddresses: Address[] = [
    { id: 'addr-1', name: 'Home', street: '123, Main Street', city: 'Mumbai', state: 'Maharashtra', zip: '400001', phone: '9876543210', isDefault: true},
    { id: 'addr-2', name: 'Work', street: '456, Business Hub', city: 'Mumbai', state: 'Maharashtra', zip: '400051', phone: '9876543210', isDefault: false},
]

export type PaymentMethod = {
    id: string;
    type: 'visa' | 'mastercard';
    last4: string;
    expiry: string;
    cardHolder: string;
};

export const userPaymentMethods: PaymentMethod[] = [
    { id: 'pm-1', type: 'visa', last4: '4242', expiry: '12/26', cardHolder: 'Rohan Sharma' },
    { id: 'pm-2', type: 'mastercard', last4: '5555', expiry: '08/25', cardHolder: 'Rohan Sharma' },
];
