
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";

export default function AdminOrdersPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            <span>All Orders</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>A list of all orders will be displayed here.</p>
          {/* Placeholder for orders table */}
        </CardContent>
      </Card>
    </div>
  );
}
