import type { Metadata } from 'next';
import { JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import './globals.css';
import SiteHeader from '../components/site-header';
import SiteFooter from '../components/site-footer';
import PageTransition from '../components/page-transition';
import Providers from '../components/providers';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  display: 'swap'
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap'
});

export const metadata: Metadata = {
  title: {
    default: 'NeuroPro | Master AI Skills Faster',
    template: '%s | NeuroPro'
  },
  description:
    'NeuroPro helps professionals master AI tools, automation, and AI business strategy with premium, hands-on courses.',
  metadataBase: new URL('https://neuropro.ai'),
  keywords: [
    'AI courses',
    'machine learning',
    'AI automation',
    'AI business',
    'NeuroPro'
  ],
  openGraph: {
    title: 'NeuroPro | Master AI Skills Faster',
    description:
      'Premium AI courses designed for builders, operators, and founders who want practical AI mastery.',
    url: 'https://neuropro.ai',
    siteName: 'NeuroPro',
    images: [
      {
        url: '/og-neuropro.png',
        width: 1200,
        height: 630,
        alt: 'NeuroPro AI Courses'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NeuroPro | Master AI Skills Faster',
    description:
      'Premium AI courses designed for builders, operators, and founders who want practical AI mastery.'
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetBrainsMono.variable}`}>
      <body className="min-h-screen bg-[color:var(--bg)] font-sans text-[color:var(--text)] antialiased">
        <Providers>
          <div className="bg-grid">
            <SiteHeader />
            <main className="mx-auto max-w-6xl px-6 lg:px-10">
              <PageTransition>{children}</PageTransition>
            </main>
            <SiteFooter />
          </div>
        </Providers>
      </body>
    </html>
  );
}
