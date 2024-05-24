"use client"; 

import { Suspense } from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import SideNavbar from '@/components/common/SideNavBar';
import { cn } from '../lib/utils';
import { usePathname } from 'next/navigation';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import UserContextProvider from '@/contextapi/userdetail/userContextProvider';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const path = usePathname();
  const queryClient = new QueryClient();

  return (
    <html lang="en">
      <head>
        <title>CMS</title>
        <meta name="description" content="Description of your page" />
      </head>
      <body
        className={cn(
          'min-h-screen w-full bg-white text-black flex ',
          inter.className,
          {
            'debug-screens': process.env.NODE_ENV === 'development',
          }
        )}
      >
        <QueryClientProvider client={queryClient}>
          <UserContextProvider>
            <Suspense fallback={<div>Loading...</div>}>
              {path === '/login'? null : <SideNavbar />}
              <div className="w-full">{children}</div>
            </Suspense>
          </UserContextProvider>
        </QueryClientProvider>
        <Toaster />
      </body>
    </html>
  );
}
