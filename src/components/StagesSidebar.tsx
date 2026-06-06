'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
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

const DESKTOP_OPEN_KEY = 'mmm:stages-open';
const WIDTH_KEY = 'mmm:stages-width';
const DEFAULT_WIDTH = 320;
const MIN_WIDTH = 200;
const MAX_WIDTH = 600;

interface StagesSidebarProps {
  tree: Tree;
}

export default function StagesSidebar({ tree }: StagesSidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState(true);
  const [width, setWidth] = useState(DEFAULT_WIDTH);
  const draggingRef = useRef(false);
  const { progress } = useProgress();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(DESKTOP_OPEN_KEY);
      if (saved === 'false') setDesktopOpen(false);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(DESKTOP_OPEN_KEY, String(desktopOpen));
    } catch {
      // ignore
    }
  }, [desktopOpen]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(WIDTH_KEY);
      if (saved) {
        const n = Number(saved);
        if (n >= MIN_WIDTH && n <= MAX_WIDTH) setWidth(n);
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(WIDTH_KEY, String(width));
    } catch {
      // ignore
    }
  }, [width]);

  const handleResizePointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    draggingRef.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const handleResizePointerMove = useCallback((e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    setWidth(Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, e.clientX)));
  }, []);

  const handleResizePointerUp = useCallback((e: React.PointerEvent) => {
    draggingRef.current = false;
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setMobileOpen(false);
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
  }, [mobileOpen]);

  const showFloatingTrigger = !mobileOpen && !desktopOpen;

  return (
    <>
      {showFloatingTrigger && (
        <button
          ref={triggerRef}
          type="button"
          onClick={() => {
            setMobileOpen(true);
            setDesktopOpen(true);
          }}
          aria-expanded={false}
          aria-controls="stages-sidebar"
          className="fixed top-[3.75rem] left-2 z-50 text-sm font-medium px-3 py-1.5 rounded border border-rule bg-bg/90 backdrop-blur-sm hover:border-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-safe:transition-colors"
        >
          <span className="mr-1.5" aria-hidden="true">☰</span>
          stages
        </button>
      )}

      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-fg/30"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        id="stages-sidebar"
        role="complementary"
        aria-label="Stages"
        style={desktopOpen ? { width: `${width}px` } : undefined}
        className={[
          'bg-bg border-r border-rule flex flex-col shrink-0',
          'fixed inset-y-0 left-0 z-50 w-full sm:w-80',
          'motion-safe:transition-all motion-safe:duration-300',
          mobileOpen ? 'translate-x-0' : '-translate-x-full',
          desktopOpen
            ? 'lg:static lg:translate-x-0 lg:flex-shrink-0 lg:sticky lg:top-14 lg:h-[calc(100vh-3.5rem)]'
            : 'lg:static lg:translate-x-0 lg:w-0 lg:flex-shrink-0 lg:overflow-hidden',
        ].join(' ')}
      >
        {desktopOpen && (
          <div
            role="separator"
            aria-label="Resize stages"
            aria-orientation="vertical"
            className="hidden lg:block absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-accent/40 active:bg-accent/60 z-10 touch-none"
            onPointerDown={handleResizePointerDown}
            onPointerMove={handleResizePointerMove}
            onPointerUp={handleResizePointerUp}
          />
        )}

        <div className="flex items-center justify-between px-5 py-4 border-b border-rule shrink-0">
          <h2 className="text-lg font-display italic">Stages</h2>
          <button
            ref={closeRef}
            type="button"
            onClick={() => {
              setMobileOpen(false);
              setDesktopOpen(false);
            }}
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
                  onClick={() => setMobileOpen(false)}
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
                      onClick={() => setMobileOpen(false)}
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
                      onClick={() => setMobileOpen(false)}
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
                            onClick={() => setMobileOpen(false)}
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
