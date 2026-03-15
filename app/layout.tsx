import type { Metadata } from 'next';
import { JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import './globals.css';
import SiteHeader from '../components/site-header';
import SiteFooter from '../components/site-footer';
import { Providers } from './providers';

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
    default: 'NeuroPro | Освойте ИИ-навыки быстрее',
    template: '%s | NeuroPro'
  },
  description:
    'NeuroPro помогает специалистам освоить ИИ-инструменты, автоматизацию и бизнес-стратегии с помощью премиальных практических курсов.',
  metadataBase: new URL('https://neuropro.ai'),
  keywords: [
    'ИИ курсы',
    'машинное обучение',
    'ИИ автоматизация',
    'ИИ бизнес',
    'NeuroPro',
    'нейросети',
    'искусственный интеллект'
  ],
  openGraph: {
    title: 'NeuroPro | Освойте ИИ-навыки быстрее',
    description:
      'Премиальные ИИ-курсы для разработчиков, операторов и основателей, которые хотят практического мастерства.',
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
    locale: 'ru_RU',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NeuroPro | Освойте ИИ-навыки быстрее',
    description:
      'Премиальные ИИ-курсы для разработчиков, операторов и основателей, которые хотят практического мастерства.'
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${spaceGrotesk.variable} ${jetBrainsMono.variable}`}>
      <body className="min-h-screen bg-[color:var(--bg)] font-sans text-[color:var(--text)] antialiased">
        <Providers>
          <div className="bg-grid">
            <SiteHeader />
            <main className="mx-auto max-w-6xl px-6 lg:px-10">
              {children}
            </main>
            <SiteFooter />
          </div>
        </Providers>
      </body>
    </html>
  );
}
