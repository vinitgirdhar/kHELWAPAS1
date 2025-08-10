
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart } from "lucide-react";

export default function AdminRevenuePage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Revenue</h2>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart className="h-5 w-5" />
            <span>Revenue Analytics</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Detailed revenue charts and reports will be displayed here.</p>
          {/* Placeholder for charts */}
        </CardContent>
      </Card>
    </div>
  );
}
