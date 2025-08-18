
export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'Admin' | 'Buyer' | 'Seller' | 'User';
  status: 'Active' | 'Blocked' | 'Pending';
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  phone: string;
  registrationDate: string;
  rating: number; // Rating out of 5
};

export const allUsers: User[] = [
  {
    id: 'user-1',
    name: 'Rohan Sharma',
    email: 'rohan.sharma@example.com',
    avatar: 'https://images.unsplash.com/photo-1587402120412-df5702caa356?q=80&w=100&h=100&fit=crop',
    role: 'Seller',
    status: 'Active',
    address: { street: '123 Main Street', city: 'Mumbai', state: 'Maharashtra', zip: '400001' },
    phone: '9876543210',
    registrationDate: '2024-01-15',
    rating: 4.5
  },
  {
    id: 'user-2',
    name: 'Priya Patel',
    email: 'priya.patel@example.com',
    avatar: 'https://images.unsplash.com/photo-1610216705422-caa3fc269258?q=80&w=100&h=100&fit=crop',
    role: 'Buyer',
    status: 'Active',
    address: { street: '456 Park Avenue', city: 'Delhi', state: 'Delhi', zip: '110001' },
    phone: '9123456789',
    registrationDate: '2024-02-20',
    rating: 5
  },
  {
    id: 'user-3',
    name: 'Admin User',
    email: 'admin@khelwapas.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&h=100&fit=crop',
    role: 'Admin',
    status: 'Active',
    address: { street: '789 Admin Lane', city: 'Bangalore', state: 'Karnataka', zip: '560001' },
    phone: '9988776655',
    registrationDate: '2024-01-01',
    rating: 5
  },
   {
    id: 'user-4',
    name: 'Sameer Khan',
    email: 'sameer.khan@example.com',
    avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=100&h=100&fit=crop',
    role: 'Seller',
    status: 'Blocked',
    address: { street: '101 Market Road', city: 'Kolkata', state: 'West Bengal', zip: '700001' },
    phone: '9876512345',
    registrationDate: '2024-03-10',
    rating: 2.5
  },
  {
    id: 'user-5',
    name: 'Anjali Rao',
    email: 'anjali.rao@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&h=100&fit=crop',
    role: 'Buyer',
    status: 'Active',
    address: { street: '212 Lake View', city: 'Chennai', state: 'Tamil Nadu', zip: '600001' },
    phone: '9123498765',
    registrationDate: '2024-04-05',
    rating: 4.8
  },
  {
    id: 'user-6',
    name: 'Vikram Singh',
    email: 'vikram.singh@example.com',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&h=100&fit=crop',
    role: 'User',
    status: 'Pending',
    address: { street: '333 High Tech City', city: 'Hyderabad', state: 'Telangana', zip: '500081' },
    phone: '9543219876',
    registrationDate: '2024-05-21',
    rating: 3.0
  }
];

// In a real app, this would be a POST request to your backend.
export const addUser = (user: Omit<User, 'id' | 'registrationDate'>) => {
  const newUser: User = {
    ...user,
    id: `user-${Date.now()}`,
    registrationDate: new Date().toISOString().split('T')[0],
  };
  allUsers.unshift(newUser);
  return newUser;
};

// In a real app, this would be a DELETE request to your backend.
export const deleteUser = (id: string) => {
    // In a real app, you might just change status to 'Deleted' instead of actually removing.
    const userIndex = allUsers.findIndex(u => u.id === id);
    if (userIndex !== -1) {
        allUsers.splice(userIndex, 1);
    }
};

export const updateUserStatus = (id: string, status: User['status']) => {
     const userIndex = allUsers.findIndex(u => u.id === id);
    if (userIndex !== -1) {
        allUsers[userIndex].status = status;
    }
}
