
export type OrderStatus = 'Pending' | 'Confirmed' | 'Shipped' | 'Delivered' | 'Cancelled' | 'Returned';
export type PaymentStatus = 'Paid' | 'Pending' | 'Failed' | 'COD';
export type PickupStatus = 'Pending' | 'Scheduled' | 'In Progress' | 'Completed';

export type Order = {
    orderId: string;
    customer: {
        id: string;
        name: string;
        email: string;
        contact: string;
        shippingAddress: {
            street: string;
            city: string;
            state: string;
            zip: string;
        }
    };
    product: {
        id: string;
        name: string;
        type: 'New' | 'Refurbished' | 'Pre-Owned';
        quantity: number;
        image: string;
    };
    amount: number;
    paymentStatus: PaymentStatus;
    paymentMethod: string;
    pickupStatus: PickupStatus;
    orderStatus: OrderStatus;
    orderDate: string; // ISO 8601 format
    history: {
        status: OrderStatus;
        date: string;
        notes?: string;
    }[];
};

export let allOrders: Order[] = [
    {
        orderId: 'KHEL-789123',
        customer: {
            id: 'user-2',
            name: 'Priya Patel',
            email: 'priya.patel@example.com',
            contact: '+91 9123456789',
            shippingAddress: {
                street: '456 Park Avenue',
                city: 'Delhi',
                state: 'Delhi',
                zip: '110001'
            }
        },
        product: {
            id: '1',
            name: 'Pro Grade Cricket Bat',
            type: 'Pre-Owned',
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1593341646782-e0b495cff86d?q=80&w=800&h=800&fit=crop'
        },
        amount: 12000,
        paymentStatus: 'Paid',
        paymentMethod: 'Credit Card (Visa **** 4242)',
        pickupStatus: 'Completed',
        orderStatus: 'Delivered',
        orderDate: '2024-07-28T14:48:00.000Z',
        history: [
            { status: 'Pending', date: '2024-07-28T14:48:00.000Z' },
            { status: 'Confirmed', date: '2024-07-28T16:00:00.000Z' },
            { status: 'Shipped', date: '2024-07-29T10:00:00.000Z', notes: 'Shipped via Blue Dart. Tracking #BD12345' },
            { status: 'Delivered', date: '2024-07-30T12:30:00.000Z', notes: 'Delivered and signed by customer.' }
        ]
    },
    {
        orderId: 'KHEL-456789',
        customer: {
            id: 'user-3',
            name: 'Amit Singh',
            email: 'amit.singh@example.com',
            contact: '+91 9988776655',
            shippingAddress: {
                street: '789 Tech Park',
                city: 'Bangalore',
                state: 'Karnataka',
                zip: '560001'
            }
        },
        product: {
            id: '2',
            name: 'Championship Football',
            type: 'New',
            quantity: 2,
            image: 'https://images.unsplash.com/photo-1486286701208-1d58e9338013?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHwlMjBGT09UQkFMTHxlbnwwfHx8fDE3NTUxNjc1ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080'
        },
        amount: 7200,
        paymentStatus: 'Paid',
        paymentMethod: 'UPI (amit.singh@okhdfc)',
        pickupStatus: 'Completed',
        orderStatus: 'Delivered',
        orderDate: '2024-07-27T10:30:00.000Z',
         history: [
            { status: 'Pending', date: '2024-07-27T10:30:00.000Z' },
            { status: 'Confirmed', date: '2024-07-27T11:00:00.000Z' },
            { status: 'Shipped', date: '2024-07-28T12:00:00.000Z' },
            { status: 'Delivered', date: '2024-07-29T15:00:00.000Z' }
        ]
    },
    {
        orderId: 'KHEL-123456',
        customer: {
            id: 'user-4',
            name: 'Sneha Sharma',
            email: 'sneha.sharma@example.com',
            contact: '+91 9876512345',
            shippingAddress: {
                street: '101 Bay View',
                city: 'Mumbai',
                state: 'Maharashtra',
                zip: '400001'
            }
        },
        product: {
            id: '3',
            name: 'Featherlight Badminton Racket',
            type: 'Refurbished',
            quantity: 1,
            image: 'https://placehold.co/800x800.png'
        },
        amount: 6000,
        paymentStatus: 'Pending',
        paymentMethod: 'COD',
        pickupStatus: 'Scheduled',
        orderStatus: 'Shipped',
        orderDate: '2024-07-26T18:00:00.000Z',
        history: [
            { status: 'Pending', date: '2024-07-26T18:00:00.000Z' },
            { status: 'Confirmed', date: '2024-07-27T09:00:00.000Z' },
            { status: 'Shipped', date: '2024-07-27T17:00:00.000Z', notes: 'Out for delivery.' }
        ]
    },
    {
        orderId: 'KHEL-987654',
        customer: {
            id: 'user-1',
            name: 'Rohan Sharma',
            email: 'rohan.sharma@example.com',
            contact: '+91 9876543210',
            shippingAddress: {
                street: '123 Main Street',
                city: 'Mumbai',
                state: 'Maharashtra',
                zip: '400001'
            }
        },
        product: {
            id: '5',
            name: 'Starter Cricket Kit',
            type: 'New',
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1578654979075-dde337ab7560?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyMHx8Y3JpY2tldCUyMGtpdHxlbnwwfHx8fDE3NTUxNjc2NTR8MA&ixlib=rb-4.1.0&q=80&w=1080'
        },
        amount: 7920,
        paymentStatus: 'Paid',
        paymentMethod: 'Net Banking (ICICI)',
        pickupStatus: 'In Progress',
        orderStatus: 'Shipped',
        orderDate: '2024-07-25T11:00:00.000Z',
         history: [
            { status: 'Pending', date: '2024-07-25T11:00:00.000Z' },
            { status: 'Confirmed', date: '2024-07-25T11:30:00.000Z' },
            { status: 'Shipped', date: '2024-07-26T14:00:00.000Z' }
        ]
    },
    {
        orderId: 'KHEL-654321',
        customer: {
            id: 'user-5',
            name: 'Anjali Verma',
            email: 'anjali.verma@example.com',
            contact: '+91 9123498765',
            shippingAddress: {
                street: '212 Lake View',
                city: 'Chennai',
                state: 'Tamil Nadu',
                zip: '600001'
            }
        },
        product: {
            id: '4',
            name: 'Grand Slam Tennis Racket',
            type: 'New',
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1557493680-99ae26025be8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHx0ZW5uaXMlMjByYWNrZXR8ZW58MHx8fHwxNzU1MTY3NzE2fDA&ixlib=rb-4.1.0&q=80&w=1080'
        },
        amount: 9600,
        paymentStatus: 'Failed',
        paymentMethod: 'Credit Card',
        pickupStatus: 'Pending',
        orderStatus: 'Cancelled',
        orderDate: '2024-07-24T09:15:00.000Z',
         history: [
            { status: 'Pending', date: '2024-07-24T09:15:00.000Z' },
            { status: 'Cancelled', date: '2024-07-24T09:20:00.000Z', notes: 'Payment failed after 3 attempts.' }
        ]
    },
    {
        orderId: 'KHEL-321654',
        customer: {
            id: 'user-6',
            name: 'Sameer Khan',
            email: 'sameer.khan@example.com',
            contact: '+91 9876512345',
            shippingAddress: {
                street: '101 Market Road',
                city: 'Kolkata',
                state: 'West Bengal',
                zip: '700001'
            }
        },
        product: {
            id: '6',
            name: 'Classic Leather Football',
            type: 'Pre-Owned',
            quantity: 1,
            image: 'https://placehold.co/800x800.png'
        },
        amount: 2000,
        paymentStatus: 'COD',
        paymentMethod: 'Cash on Delivery',
        pickupStatus: 'Pending',
        orderStatus: 'Pending',
        orderDate: '2024-07-23T20:00:00.000Z',
         history: [
            { status: 'Pending', date: '2024-07-23T20:00:00.000Z' }
        ]
    },
];

export const getOrderById = (id: string) => {
    return allOrders.find(order => order.orderId === id);
}
