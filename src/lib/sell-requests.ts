
export type SellRequest = {
  id: string;
  fullName: string;
  email: string;
  category: string;
  title: string;
  description: string;
  price: number;
  contactMethod: 'Email' | 'Phone' | 'WhatsApp';
  contactDetail?: string;
  imageUrls: string[];
  status: 'Pending' | 'Approved' | 'Rejected';
};

// This is a mock database to store sell requests in memory.
// In a real application, this would be a database like SQLite, PostgreSQL, etc.
export const sellRequests: SellRequest[] = [
    {
        id: 'req-1',
        fullName: 'Ravi Kumar',
        email: 'ravi.kumar@example.com',
        category: 'Cricket',
        title: 'Used Gray-Nicolls Cricket Bat',
        description: 'Slightly used English Willow bat, Grade A. Very good condition, minor scuffs on the toe guard but no cracks. Handle grip is new. Perfect for club-level players.',
        price: 8500,
        contactMethod: 'WhatsApp',
        contactDetail: '9876543210',
        imageUrls: [
            'https://images.unsplash.com/photo-1593341646782-e0b495cff86d?q=80&w=200&h=200&fit=crop',
            'https://images.unsplash.com/photo-1540228232483-1b64a7024923?q=80&w=200&h=200&fit=crop',
            'https://images.unsplash.com/photo-1595039925238-27b6863398a6?q=80&w=200&h=200&fit=crop',
            'https://images.unsplash.com/photo-1629294897156-737d686a7657?q=80&w=200&h=200&fit=crop',
            'https://images.unsplash.com/photo-1599599810694-b5b383546a04?q=80&w=200&h=200&fit=crop'
        ],
        status: 'Pending',
    },
    {
        id: 'req-2',
        fullName: 'Sunita Sharma',
        email: 'sunita.s@example.com',
        category: 'Badminton',
        title: 'Yonex Badminton Racket Set',
        description: 'Set of 2 Yonex Nanoray rackets with a kitbag. One racket is in excellent condition, the other has a few paint scratches but no structural damage. Both are strung.',
        price: 4000,
        contactMethod: 'Email',
        imageUrls: [
            'https://images.unsplash.com/photo-1587280501635-33535b3f631c?q=80&w=200&h=200&fit=crop',
            'https://images.unsplash.com/photo-1620953041353-0c4558451124?q=80&w=200&h=200&fit=crop',
            'https://images.unsplash.com/photo-1587280501635-33535b3f631c?q=80&w=200&h=200&fit=crop',
            'https://images.unsplash.com/photo-1620953041353-0c4558451124?q=80&w=200&h=200&fit=crop',
            'https://images.unsplash.com/photo-1587280501635-33535b3f631c?q=80&w=200&h=200&fit=crop'
        ],
        status: 'Approved',
    }
];

export const addSellRequest = (request: Omit<SellRequest, 'id' | 'status' | 'imageUrls'> & { imageUrls: string[] }) => {
    const newRequest: SellRequest = {
        ...request,
        id: `req-${Date.now()}`,
        status: 'Pending'
    };
    sellRequests.unshift(newRequest); // Add to the beginning of the array
    return newRequest;
}
