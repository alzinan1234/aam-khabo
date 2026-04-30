import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/lib/languageContext';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartSidebar from '@/components/cart/CartSidebar';

export const metadata: Metadata = {
  title: 'আম বাজার | Aam Bazar - Fresh Mangoes from Bangladesh',
  description: 'Premium quality fresh mangoes directly from Rajshahi and Chapai Nawabganj. Himsagar, Langra, Fazli and more varieties. Fast delivery across Bangladesh.',
  keywords: 'mango, aam, rajshahi mango, himsagar, langra, fazli, bangladesh mango, fresh mango',
  openGraph: {
    title: 'আম বাজার | Aam Bazar',
    description: 'Premium fresh mangoes from Bangladesh',
    images: ['https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=1200'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <LanguageProvider>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <CartSidebar />
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: '#1A1A1A',
                color: '#FFF',
                borderRadius: '12px',
                border: '1px solid rgba(255,195,36,0.3)',
              },
              success: {
                iconTheme: {
                  primary: '#FFC324',
                  secondary: '#1A1A1A',
                },
              },
            }}
          />
        </LanguageProvider>
      </body>
    </html>
  );
}
