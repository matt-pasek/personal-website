import type { Metadata } from 'next';
import './global.css';
import { Navbar } from '@/components/Navbar';
import { BlobStateProvider } from '@/contexts/BlobStateContext';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Homepage | Mateusz Pasek',
  description: 'Here is a SEO-friendly description of the homepage content.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <BlobStateProvider>
          <Navbar />
          {children}
        </BlobStateProvider>
      </body>
    </html>
  );
}
