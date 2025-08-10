
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package } from "lucide-react";

export default function AdminProductsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Products</h2>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            <span>Listed Products</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>A list of all products (new and pre-owned) will be displayed here.</p>
          {/* Placeholder for products table */}
        </CardContent>
      </Card>
    </div>
  );
}
