import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Link from 'next/link';
import DropdownNav from '@/components/DropdownNav';
import './globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'monsieur music maestro',
  description: 'A beginner journey for house music via Strudel, plus the listening, theory, dancing, history and DJ skills underneath.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <div className="fixed top-4 right-4 z-50">
          <DropdownNav />
        </div>
        <header className="border-b border-fg/10 px-6 py-4">
          <nav className="max-w-3xl mx-auto flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <Link href="/" className="font-semibold">monsieur music maestro</Link>
            <Link href="/journey" className="hover:text-accent">journey</Link>
            <Link href="/cheatsheet" className="hover:text-accent">cheatsheet</Link>
            <Link href="/resources" className="hover:text-accent">resources</Link>
            <Link href="/practice-log" className="hover:text-accent">practice log</Link>
          </nav>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-fg/10 px-6 py-4 text-xs text-muted">
          <div className="max-w-3xl mx-auto">
            Plain-language notes. AuDHD + ESL friendly. Open license except where noted.
          </div>
        </footer>
      </body>
    </html>
  );
}
