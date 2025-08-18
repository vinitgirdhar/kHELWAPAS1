'use client';

import * as React from 'react';
import Image from 'next/image';
import { MoreHorizontal, PlusCircle, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { allUsers, type User } from '@/lib/users';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';

const statusConfig: Record<User['status'], string> = {
  'Active': 'bg-green-100 text-green-800 border-green-200',
  'Blocked': 'bg-red-100 text-red-800 border-red-200',
  'Pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
};

const roleConfig: Record<User['role'], string> = {
    'Admin': 'bg-primary/10 text-primary border-primary/20',
    'Buyer': 'bg-blue-100 text-blue-800 border-blue-200',
    'Seller': 'bg-purple-100 text-purple-800 border-purple-200',
    'User': 'bg-gray-100 text-gray-800 border-gray-200',
};

export default function AdminUsersPage() {
    const [searchTerm, setSearchTerm] = React.useState('');
    const [users, setUsers] = React.useState(allUsers);
    const { toast } = useToast();

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);
        if (term) {
            setUsers(allUsers.filter(u => u.name.toLowerCase().includes(term) || u.email.toLowerCase().includes(term)));
        } else {
            setUsers(allUsers);
        }
    };
    
    const handleAction = (action: string, userName: string) => {
         toast({
            title: `Action: ${action}`,
            description: `Action "${action}" performed on user ${userName}.`,
        });
    }

    const getUsersForTab = (tab: string) => {
        if (tab === 'all') return users;
        return users.filter(u => u.role.toLowerCase() === tab);
    };

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <Tabs defaultValue="all">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="Buyer">Buyers</TabsTrigger>
            <TabsTrigger value="Seller">Sellers</TabsTrigger>
            <TabsTrigger value="Admin">Admins</TabsTrigger>
          </TabsList>
           <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by name or email..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
        <TabsContent value="all">
          <UserTable users={getUsersForTab('all')} onAction={handleAction} />
        </TabsContent>
         <TabsContent value="Buyer">
          <UserTable users={getUsersForTab('buyer')} onAction={handleAction} />
        </TabsContent>
         <TabsContent value="Seller">
          <UserTable users={getUsersForTab('seller')} onAction={handleAction} />
        </TabsContent>
         <TabsContent value="Admin">
          <UserTable users={getUsersForTab('admin')} onAction={handleAction} />
        </TabsContent>
      </Tabs>
    </main>
  );
}


function UserTable({ users, onAction }: { users: User[], onAction: (action: string, userName: string) => void }) {
    
    const renderRating = (rating: number) => {
        return (
            <div className="flex items-center">
                {Array.from({ length: 5 }, (_, i) => (
                    <Star
                        key={i}
                        className={`h-4 w-4 ${i < Math.round(rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                    />
                ))}
            </div>
        )
    }

    return (
        <Card>
          <CardHeader>
            <CardTitle>User Accounts</CardTitle>
            <CardDescription>
              Manage all user accounts and their roles on the platform.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="hidden md:table-cell">Status</TableHead>
                  <TableHead className="hidden md:table-cell">Rating</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Registered
                  </TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                   <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-muted-foreground">{user.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={roleConfig[user.role]}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant="outline" className={statusConfig[user.status]}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                        {renderRating(user.rating)}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {new Date(user.registrationDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => onAction('View Details', user.name)}>View Details</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onAction('Edit User', user.name)}>Edit</DropdownMenuItem>
                           <DropdownMenuItem onClick={() => onAction('Change Role', user.name)}>Change Role</DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-destructive" 
                            onClick={() => onAction('Block User', user.name)}
                          >
                            Block User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <div className="text-xs text-muted-foreground">
              Showing <strong>1-{users.length}</strong> of <strong>{users.length}</strong> users
            </div>
          </CardFooter>
        </Card>
    )
}
