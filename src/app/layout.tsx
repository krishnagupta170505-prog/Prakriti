import type { Metadata } from 'next';
import { Playfair_Display, Sora } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'PRAKRITI — Decode Your Inner Nature',
  description: 'An interactive Ayurvedic wellness and yoga club experience for university students.',
  icons: {
    icon: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5av-4gZcWPsWwuQyWf2fO9opQV1Hee8bTO_hNTrKKR0MBS0OCK46v_7fYpZyMpxBnFyixbQ2wvvCDrcD7ZXZlvxiZuRPaBGBK1gOP-7-DprcuoWPeblhhxqg3DkZHIWzevSOVVaCdlxL0Xj7XmK9pKCrAIBDUma1SevHxrBGfRY96e3nR9kez98puaWKzjpm1M00DJN0DDuupS44hpOpIPGXvYViDv-vfaHM0nhJTvOa1vFct0bQm3A',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${sora.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
      </head>
      <body className="bg-surface text-on-surface min-h-screen font-body-md antialiased selection:bg-primary/20 selection:text-primary">
        {children}
      </body>
    </html>
  );
}
