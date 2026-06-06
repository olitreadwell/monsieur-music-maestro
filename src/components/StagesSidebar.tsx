'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import type { Tree } from '@/lib/toys';
import { useProgress } from '@/lib/progress';

const STAGE_TITLES: Record<number, string> = {
  0: 'Play',
  1: 'Pulse',
  2: 'Hats + clap',
  3: 'Clave',
  4: 'Counting',
  5: 'Low end',
  6: 'Colour',
  7: 'Shape',
  8: 'Play it out',
};

interface StagesSidebarProps {
  tree: Tree;
}

export default function StagesSidebar({ tree }: StagesSidebarProps) {
  const pathname = usePathname();
  const showOnPage = /^\/journey\/\d+\/.+/.test(pathname ?? '');
  const [open, setOpen] = useState(false);
  const { progress } = useProgress();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }
    document.addEventListener('keydown', handleKey);
    closeRef.current?.focus();
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!showOnPage) return null;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="stages-sidebar"
        className="fixed top-4 left-4 z-50 text-sm font-medium px-3 py-1.5 rounded border border-rule bg-bg/90 backdrop-blur-sm hover:border-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-safe:transition-colors"
      >
        <span className="mr-1.5" aria-hidden="true">☰</span>
        stages
      </button>

      {open && (
        <div
          className="fixed inset-0 z-40 bg-fg/30 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-200"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        id="stages-sidebar"
        role="dialog"
        aria-modal="true"
        aria-label="Stages"
        className={[
          'fixed inset-y-0 left-0 z-40 w-72 sm:w-80 bg-bg border-r border-rule',
          'flex flex-col',
          'motion-safe:transition-transform motion-safe:duration-300',
          open ? 'translate-x-0' : '-translate-x-full',
        ].join(' ')}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-rule">
          <h2 className="text-lg font-display italic">Stages</h2>
          <button
            ref={closeRef}
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close stages"
            className="text-sm px-2 py-1 rounded hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-safe:transition-colors"
          >
            close
          </button>
        </div>

        <nav className="overflow-y-auto flex-1 px-3 py-3 font-mono text-sm">
          {tree.stages.map((stage) => {
            const hasContent =
              stage.spine.length > 0 ||
              stage.sideQuests.length > 0 ||
              Object.keys(stage.branches).length > 0;
            if (!hasContent) return null;
            return (
              <div key={stage.number} className="mb-5">
                <Link
                  href={`/journey/${stage.number}`}
                  onClick={() => setOpen(false)}
                  className="block text-xs uppercase tracking-wide opacity-60 mb-1 hover:opacity-100 hover:text-accent motion-safe:transition-colors"
                >
                  Stage {stage.number} · {STAGE_TITLES[stage.number]}
                </Link>
                {stage.spine.map((toy) => {
                  const read = progress.toysRead[toy.id] !== undefined;
                  return (
                    <Link
                      key={toy.id}
                      href={toy.routePath}
                      onClick={() => setOpen(false)}
                      className={[
                        'flex items-baseline gap-1.5 py-0.5 hover:text-accent motion-safe:transition-colors',
                        read ? 'opacity-60' : '',
                      ].join(' ')}
                    >
                      <span aria-hidden="true">{read ? '✓' : '●'}</span>
                      <span>{toy.title}</span>
                    </Link>
                  );
                })}
                {stage.sideQuests.map((toy) => {
                  const read = progress.toysRead[toy.id] !== undefined;
                  return (
                    <Link
                      key={toy.id}
                      href={toy.routePath}
                      onClick={() => setOpen(false)}
                      className={[
                        'flex items-baseline gap-1.5 pl-4 py-0.5 hover:text-accent motion-safe:transition-colors',
                        read ? 'opacity-60' : '',
                      ].join(' ')}
                    >
                      <span aria-hidden="true">{read ? '✓' : '↳'}</span>
                      <span>{toy.title}</span>
                    </Link>
                  );
                })}
                {Object.entries(stage.branches).length > 0 && (
                  <div className="pl-4 mt-1">
                    <div className="opacity-50 text-xs">branches</div>
                    {Object.entries(stage.branches).map(([branchSlug, toys]) =>
                      toys.map((toy) => {
                        const read = progress.toysRead[toy.id] !== undefined;
                        return (
                          <Link
                            key={toy.id}
                            href={toy.routePath}
                            onClick={() => setOpen(false)}
                            className={[
                              'flex items-baseline gap-1.5 pl-4 py-0.5 hover:text-accent motion-safe:transition-colors',
                              read ? 'opacity-60' : '',
                            ].join(' ')}
                          >
                            <span aria-hidden="true">{read ? '✓' : '·'}</span>
                            <span>
                              {branchSlug} · {toy.title}
                            </span>
                          </Link>
                        );
                      }),
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
