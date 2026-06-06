import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Link from 'next/link';
import DropdownNav from '@/components/DropdownNav';
import BottomRepl from '@/components/BottomRepl';
import ServiceWorkerRegister from '@/components/ServiceWorkerRegister';
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
  themeColor: '#0a0a0a',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:rounded focus:bg-bg focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-fg focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-accent"
        >
          Skip to content
        </a>
        <div className="fixed top-4 right-4 z-50">
          <DropdownNav />
        </div>
        <header className="border-b border-fg/10 px-6 py-4">
          <nav aria-label="Primary" className="max-w-3xl mx-auto flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <Link href="/" className="font-semibold rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">monsieur music maestro</Link>
            <Link href="/journey" className="rounded hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 motion-safe:transition-colors">journey</Link>
            <Link href="/cheatsheet" className="rounded hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 motion-safe:transition-colors">cheatsheet</Link>
            <Link href="/resources" className="rounded hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 motion-safe:transition-colors">resources</Link>
            <Link href="/practice-log" className="rounded hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 motion-safe:transition-colors">practice log</Link>
          </nav>
        </header>
        <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">{children}</main>
        <footer className="border-t border-fg/10 px-6 py-4 text-xs text-muted">
          <div className="max-w-3xl mx-auto">
            Plain-language notes. AuDHD + ESL friendly. Open license except where noted.
          </div>
        </footer>
        <BottomRepl />
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
