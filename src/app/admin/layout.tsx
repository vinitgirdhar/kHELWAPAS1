
import Link from 'next/link';
import { Home, Package, ShoppingCart, Users, BarChart, Bell, Truck } from 'lucide-react';
import { KhelwapasLogo } from '@/components/icons/khelwapas-logo';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <TooltipProvider>
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
          <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
            <Link
              href="/admin/dashboard"
              className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
            >
              <KhelwapasLogo className="h-5 w-5 transition-all group-hover:scale-110" />
              <span className="sr-only">Khelwapas Admin</span>
            </Link>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/admin/dashboard"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Home className="h-5 w-5" />
                  <span className="sr-only">Dashboard</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Dashboard</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/admin/orders"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span className="sr-only">Orders</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Orders</TooltipContent>
            </Tooltip>
             <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/admin/pickups"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Truck className="h-5 w-5" />
                  <span className="sr-only">Pickups</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Pickups</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/admin/products"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Package className="h-5 w-5" />
                  <span className="sr-only">Products</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Products</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/admin/users"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Users className="h-5 w-5" />
                  <span className="sr-only">Users</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Users</TooltipContent>
            </Tooltip>
             <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/admin/revenue"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <BarChart className="h-5 w-5" />
                  <span className="sr-only">Revenue</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Revenue</TooltipContent>
            </Tooltip>
          </nav>
        </aside>
      </TooltipProvider>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 w-full">
        {children}
      </div>
    </div>
  );
}
