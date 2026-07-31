import type { Metadata } from 'next';
import { Anton, Manrope, Syne, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import { Providers } from '@/components/providers';
import { cn } from '@/lib/cn';
import SmoothScroll from '@/components/smooth-scroll';

export const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-anton',
});

export const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
});

export const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
});

const title = 'Atelier-Hub — Made by cults, for cults';
const description =
  'Atelier-Hub connects clients with independent creatives and creative collectives ("cults"). Discover talent, collaborate, and get paid securely with built-in escrow.';

export const metadata: Metadata = {
  title: {
    default: title,
    template: '%s | Atelier-Hub',
  },
  description,
  applicationName: 'Atelier-Hub',
  keywords: [
    'Atelier-Hub',
    'creative freelancers',
    'hire creatives',
    'creative collectives',
    'freelance marketplace',
    'escrow payments',
  ],
  authors: [{ name: 'Atelier-Hub' }],
  creator: 'Atelier-Hub',
  publisher: 'Atelier-Hub',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title,
    description,
    siteName: 'Atelier-Hub',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <body
        className={cn(
          anton.variable,
          manrope.variable,
          syne.variable,
          jetbrainsMono.variable,
          'min-h-screen flex flex-col font-sans'
        )}
      >
        <Providers>
          <SmoothScroll>{children}</SmoothScroll>
        </Providers>
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
