import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'Town Hall | Newark AI Community',
    template: '%s | Town Hall Newark',
  },
  description: 'Town Hall is Newark\'s nonprofit community hub for AI education, workshops, and events. Join us to learn, connect, and grow together.',
  keywords: ['AI', 'Newark', 'community', 'education', 'workshops', 'nonprofit', 'technology'],
  authors: [{ name: 'Town Hall Newark' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Town Hall Newark',
    title: 'Town Hall | Newark AI Community',
    description: 'Newark\'s nonprofit community hub for AI education and events.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Town Hall | Newark AI Community',
    description: 'Newark\'s nonprofit community hub for AI education and events.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col bg-white text-gray-900 antialiased">
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-bauhaus-blue focus:text-white"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
