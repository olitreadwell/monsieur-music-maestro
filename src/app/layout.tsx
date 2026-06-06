import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono, Fraunces } from 'next/font/google';
import DropdownNav from '@/components/DropdownNav';
import PlaygroundSidebar from '@/components/PlaygroundSidebar';
import ServiceWorkerRegister from '@/components/ServiceWorkerRegister';
import './globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });
const fraunces = Fraunces({ variable: '--font-fraunces', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'monsieur music maestro',
  description: 'A journey through global rhythm: music theory, history, dance, and DJ craft, with Strudel as the listening tool.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a0a0a',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}>
      <head>
        {/* Strudel appends cm-editor next to <strudel-editor>, not inside it.
            Hide the empty placeholder; make the generated wrapper fill the panel. */}
        <style>{`
          #strudel-playground strudel-editor{display:none!important}
          #strudel-playground .flex-1{position:relative}
          #strudel-playground .flex-1>div{position:absolute!important;inset:0!important}
          #strudel-playground .cm-editor{height:100%!important;display:flex!important;flex-direction:column!important}
          #strudel-playground .cm-scroller{flex:1!important;min-height:0!important;overflow-y:auto!important}
        `}</style>
      </head>
      <body className="min-h-full font-sans">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:rounded focus:bg-bg focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-fg focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-accent"
        >
          Skip to content
        </a>
        <header className="sticky top-0 z-50 h-14 flex items-center justify-end px-4 border-b border-rule bg-bg">
          <DropdownNav />
        </header>
        <div className="lg:flex" style={{ minHeight: 'calc(100vh - 3.5rem)' }}>
          <div className="flex-1 min-w-0 flex flex-col">
            <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">{children}</main>
            <footer className="border-t border-fg/10 px-6 py-4 text-xs text-muted">
              <div className="max-w-3xl mx-auto">
                Plain-language notes. AuDHD + ESL friendly. Open license except where noted.
              </div>
            </footer>
          </div>
          <PlaygroundSidebar />
        </div>
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
