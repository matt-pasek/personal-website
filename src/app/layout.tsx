import type { Metadata } from 'next';
import './global.css';
import { Fira_Sans, Fira_Mono } from 'next/font/google';
import { BlobStateProvider } from '@/contexts/BlobStateContext';
import { Navbar } from '@/components/navbar/Navbar';
import { ReactNode } from 'react';
import { Analytics } from '@vercel/analytics/next';

const firaSans = Fira_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-sans',
  display: 'swap',
});

const firaMono = Fira_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-mono',
  display: 'swap',
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://matt-pasek.dev';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Mateusz Pasek — Designer & Developer',
    template: '%s | Mateusz Pasek',
  },
  description:
    'Designer and developer crafting narrative through design. Sitting at the intersection of aesthetics and engineering.',
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'Mateusz Pasek',
    title: 'Mateusz Pasek — Designer & Developer',
    description:
      'Designer and developer crafting narrative through design. Sitting at the intersection of aesthetics and engineering.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mateusz Pasek — Designer & Developer',
    description:
      'Designer and developer crafting narrative through design. Sitting at the intersection of aesthetics and engineering.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: ReactNode;
  modal: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${firaSans.variable} ${firaMono.variable} antialiased`}>
        <BlobStateProvider>
          <Navbar />
          {children}
          {modal}
        </BlobStateProvider>
        <Analytics />
      </body>
    </html>
  );
}
