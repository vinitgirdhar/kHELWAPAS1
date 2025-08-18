
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Truck } from 'lucide-react';
import { pickupExecutives, scheduledPickups as defaultPickups, PickupExecutive, ScheduledPickup } from '@/lib/user-data';
import { useToast } from '@/hooks/use-toast';

export default function PickupSchedulingPage() {
  const [date, setDate] = useState<Date | undefined>(new Date('2024-10-05'));
  const [scheduledPickups, setScheduledPickups] = useState<ScheduledPickup[]>(defaultPickups);
  const { toast } = useToast();

  const handleAssign = (executive: PickupExecutive) => {
    if (!date) {
      toast({
        variant: 'destructive',
        title: 'No Date Selected',
        description: 'Please select a date from the calendar to assign a pickup.',
      });
      return;
    }

    const newPickup: ScheduledPickup = {
      orderId: `ORD-${Date.now().toString().slice(-5)}`,
      executiveName: executive.name,
      address: `Random Address, ${executive.location}`,
      date: date.toISOString().split('T')[0], // Format as YYYY-MM-DD
    };

    setScheduledPickups(prevPickups => [...prevPickups, newPickup]);

    toast({
      title: 'Executive Assigned',
      description: `${executive.name} has been assigned a new pickup for ${date.toLocaleDateString()}.`,
    });
  };

  const filteredPickups = scheduledPickups.filter(p => {
    if (!date) return true;
    const pickupDate = new Date(p.date);
    // Adjust for timezone differences by comparing UTC dates
    return pickupDate.getUTCFullYear() === date.getUTCFullYear() &&
           pickupDate.getUTCMonth() === date.getUTCMonth() &&
           pickupDate.getUTCDate() === date.getUTCDate();
  });

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 py-4">
         <h1 className="font-headline text-2xl font-bold">Pickup Scheduling</h1>
      </header>
      <main className="flex-1 p-4 sm:px-6">
        <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* Available Executives */}
            <Card className="lg:col-span-1">
                <CardHeader>
                    <CardTitle>Available Executives</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {pickupExecutives.map((exec) => (
                         <div key={exec.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Avatar>
                                    <AvatarImage src={exec.avatar} alt={exec.name} />
                                    <AvatarFallback>{exec.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-semibold">{exec.name}</p>
                                    <p className="text-sm text-muted-foreground">{exec.location}</p>
                                </div>
                            </div>
                            <Button variant="outline" size="sm" onClick={() => handleAssign(exec)}>Assign</Button>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Calendar & Scheduled Pickups */}
            <div className="lg:col-span-2 space-y-8">
                 <Card>
                    <CardHeader>
                        <CardTitle>Pickup Calendar</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            numberOfMonths={2}
                            className="p-0"
                         />
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader>
                        <CardTitle>Scheduled Pickups</CardTitle>
                        <CardDescription>
                            Showing pickups for {date ? date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'all dates'}.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {filteredPickups.length > 0 ? (
                            filteredPickups.map((pickup) => (
                                <div key={pickup.orderId} className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                                    <div className="bg-background p-3 rounded-md border">
                                        <Truck className="h-6 w-6 text-muted-foreground" />
                                    </div>
                                    <div>
                                        <p className="font-semibold">Pickup for Order #{pickup.orderId}</p>
                                        <p className="text-sm text-muted-foreground">Executive: {pickup.executiveName}</p>
                                        <p className="text-sm text-muted-foreground">Address: {pickup.address}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                             <div className="text-center text-muted-foreground py-8">
                                <p>No pickups scheduled for this date.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
      </main>
    </div>
  );
}
