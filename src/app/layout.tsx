
'use client';

import type { Metadata } from 'next';
import { usePathname } from 'next/navigation';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Inter, Space_Grotesk } from 'next/font/google';
import KhelbotWidget from '@/components/khelbot/khelbot-widget';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
});

// export const metadata: Metadata = {
//   title: 'KHELWAPAS - Marketplace for New & Pre-Owned Sports Gear',
//   description:
//     'Buy and sell new and used sports equipment. Get instant price estimates with our AI tool, enjoy free pickup, and shop quality-inspected gear.',
// };


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin');
  const isInvoiceRoute = pathname.startsWith('/invoice');
  
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable}`}
    >
      <head>
         <title>KHELWAPAS - Marketplace for New & Pre-Owned Sports Gear</title>
        <meta
            name="description"
            content="Buy and sell new and used sports equipment. Get instant price estimates with our AI tool, enjoy free pickup, and shop quality-inspected gear."
        />
        {isInvoiceRoute && <link rel="stylesheet" href="/invoice-print.css" />}
      </head>
      <body
        className={cn('min-h-screen bg-background font-body antialiased')}
      >
        <div className="relative flex min-h-dvh flex-col">
           {isAdminRoute || isInvoiceRoute ? null : <Header />}
          <main className={cn("flex-1", { "bg-muted/40": isAdminRoute, "bg-gray-100": isInvoiceRoute })}>{children}</main>
          {isAdminRoute || isInvoiceRoute ? null : <Footer />}
        </div>
        <Toaster />
        {!isAdminRoute && <KhelbotWidget />}
      </body>
    </html>
  );
}
