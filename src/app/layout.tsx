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
import Image from 'next/image';

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
            {path === '/login' || path === '/forgot-password' || /^\/reset-password/.test(path) ? null : <SideNavbar />}
            <Suspense fallback={<div className='h-[100vh] w-full flex items-center justify-center'>
              <div className="h-16 w-16">
                <Image className='w-full h-full object-contain' src="/img/load.svg" alt="load" width={200} height={200} />
                <p>Fetching...</p>
              </div>

            </div>}>
              <div className="w-full">{children}</div>
            </Suspense>
          </UserContextProvider>
        </QueryClientProvider>
        <Toaster />
      </body>
    </html>
  );
}
  