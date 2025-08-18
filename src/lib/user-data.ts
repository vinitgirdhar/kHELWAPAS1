

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

export type PickupExecutive = {
    id: string;
    name: string;
    location: string;
    avatar: string;
};

export const pickupExecutives: PickupExecutive[] = [
    { id: 'exec-1', name: 'Rajesh Kumar', location: 'Delhi', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&h=100&fit=crop' },
    { id: 'exec-2', name: 'Priya Sharma', location: 'Mumbai', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&h=100&fit=crop' },
    { id: 'exec-3', name: 'Arjun Singh', location: 'Bangalore', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&h=100&fit=crop' },
    { id: 'exec-4', name: 'Deepa Krishnan', location: 'Chennai', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=100&h=100&fit=crop' },
    { id: 'exec-5', name: 'Vikram Mehta', location: 'Kolkata', avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=100&h=100&fit=crop' },
];

export type ScheduledPickup = {
    orderId: string;
    executiveName: string;
    address: string;
    date: string; // YYYY-MM-DD format
};

export const scheduledPickups: ScheduledPickup[] = [
    { orderId: '12345', executiveName: 'Rajesh Kumar', address: '123 Main Street, Delhi', date: '2024-10-05' },
    { orderId: '67890', executiveName: 'Priya Sharma', address: '456 Oak Avenue, Mumbai', date: '2024-10-05' },
    { orderId: '11223', executiveName: 'Arjun Singh', address: '789 Pine Lane, Bangalore', date: '2024-10-05' },
    { orderId: '11224', executiveName: 'Arjun Singh', address: '101 Maple Drive, Bangalore', date: '2024-10-08' },
    { orderId: '11225', executiveName: 'Deepa Krishnan', address: '212 Beach Road, Chennai', date: '2024-10-10' },
];
