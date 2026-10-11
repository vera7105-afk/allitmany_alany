import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1
};

export const metadata: Metadata = {
  title: 'Mondatmag Mester | 7. osztályos nyelvtan gyakorló',
  description: 'Játékos magyar nyelvtan gyakorló 7. osztályos diákoknak: Állítmány és alany felismerése, állítmány fajtái, alany fajtái, halmozott mondatrészek és főnévi igenévi alanyok.',
  keywords: ['nyelvtan', '7. osztály', 'állítmány', 'alany', 'mondatmag', 'halmozott mondatrészek', 'gyakorló', 'játék']
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hu">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
