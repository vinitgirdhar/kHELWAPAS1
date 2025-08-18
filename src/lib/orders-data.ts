
export type OrderStatus = 'Pending' | 'Confirmed' | 'Shipped' | 'Delivered' | 'Cancelled' | 'Returned';
export type PaymentStatus = 'Paid' | 'Pending' | 'Failed' | 'COD';
export type PickupStatus = 'Pending' | 'Scheduled' | 'In Progress' | 'Completed';

export type Order = {
    orderId: string;
    customer: {
        name: string;
        email: string;
        contact: string;
        address: string;
    };
    product: {
        name: string;
        type: 'New' | 'Refurbished' | 'Pre-Owned';
        quantity: number;
    };
    amount: number;
    paymentStatus: PaymentStatus;
    pickupStatus: PickupStatus;
    orderStatus: OrderStatus;
    orderDate: string; // ISO 8601 format
};

export let allOrders: Order[] = [
    {
        orderId: 'KHEL-789123',
        customer: {
            name: 'Priya Patel',
            email: 'priya.patel@example.com',
            contact: '+91 9123456789',
            address: '456 Park Avenue, Delhi, 110001'
        },
        product: {
            name: 'Pro Grade Cricket Bat',
            type: 'Pre-Owned',
            quantity: 1,
        },
        amount: 12000,
        paymentStatus: 'Paid',
        pickupStatus: 'Completed',
        orderStatus: 'Delivered',
        orderDate: '2024-07-28T14:48:00.000Z',
    },
    {
        orderId: 'KHEL-456789',
        customer: {
            name: 'Amit Singh',
            email: 'amit.singh@example.com',
            contact: '+91 9988776655',
            address: '789 Tech Park, Bangalore, 560001'
        },
        product: {
            name: 'Championship Football',
            type: 'New',
            quantity: 2,
        },
        amount: 7200,
        paymentStatus: 'Paid',
        pickupStatus: 'Completed',
        orderStatus: 'Delivered',
        orderDate: '2024-07-27T10:30:00.000Z',
    },
    {
        orderId: 'KHEL-123456',
        customer: {
            name: 'Sneha Sharma',
            email: 'sneha.sharma@example.com',
            contact: '+91 9876512345',
            address: '101 Bay View, Mumbai, 400001'
        },
        product: {
            name: 'Featherlight Badminton Racket',
            type: 'Refurbished',
            quantity: 1,
        },
        amount: 6000,
        paymentStatus: 'Pending',
        pickupStatus: 'Scheduled',
        orderStatus: 'Shipped',
        orderDate: '2024-07-26T18:00:00.000Z',
    },
    {
        orderId: 'KHEL-987654',
        customer: {
            name: 'Rohan Sharma',
            email: 'rohan.sharma@example.com',
            contact: '+91 9876543210',
            address: '123 Main Street, Mumbai, 400001'
        },
        product: {
            name: 'Starter Cricket Kit',
            type: 'New',
            quantity: 1,
        },
        amount: 7920,
        paymentStatus: 'Paid',
        pickupStatus: 'In Progress',
        orderStatus: 'Shipped',
        orderDate: '2024-07-25T11:00:00.000Z',
    },
    {
        orderId: 'KHEL-654321',
        customer: {
            name: 'Anjali Verma',
            email: 'anjali.verma@example.com',
            contact: '+91 9123498765',
            address: '212 Lake View, Chennai, 600001'
        },
        product: {
            name: 'Grand Slam Tennis Racket',
            type: 'New',
            quantity: 1,
        },
        amount: 9600,
        paymentStatus: 'Failed',
        pickupStatus: 'Pending',
        orderStatus: 'Cancelled',
        orderDate: '2024-07-24T09:15:00.000Z',
    },
    {
        orderId: 'KHEL-321654',
        customer: {
            name: 'Sameer Khan',
            email: 'sameer.khan@example.com',
            contact: '+91 9876512345',
            address: '101 Market Road, Kolkata, 700001'
        },
        product: {
            name: 'Classic Leather Football',
            type: 'Pre-Owned',
            quantity: 1,
        },
        amount: 2000,
        paymentStatus: 'COD',
        pickupStatus: 'Pending',
        orderStatus: 'Pending',
        orderDate: '2024-07-23T20:00:00.000Z',
    },
];
