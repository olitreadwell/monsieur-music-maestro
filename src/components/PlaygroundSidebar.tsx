'use client';

import { useRef, useState, useEffect, useCallback } from 'react';

const STRUDEL_REPL_SRC = 'https://unpkg.com/@strudel/repl@1.0.2';
const LS_KEY = 'strudel:repl:code';
const DEFAULT_CODE = 's("bd*4").bank("RolandTR909")';
const DEBOUNCE_MS = 500;
const POLL_MS = 1000;

type StrudelEditorEl = HTMLElement & {
  editor?: {
    setCode?: (c: string) => void;
    getCode?: () => string;
  };
};

const DESKTOP_OPEN_KEY = 'mmm:playground-open';

export default function PlaygroundSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState(true);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<StrudelEditorEl | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const pollTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastCodeRef = useRef<string>('');

  const scheduleWrite = useCallback((code: string) => {
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = setTimeout(() => {
      try {
        localStorage.setItem(LS_KEY, code);
      } catch {
        // Storage unavailable; fail silently.
      }
    }, DEBOUNCE_MS);
  }, []);

  const startPoll = useCallback(() => {
    stopPoll();
    pollTimerRef.current = setInterval(() => {
      const el = editorRef.current;
      if (!el?.editor || typeof el.editor.getCode !== 'function') return;
      try {
        const current = el.editor.getCode();
        if (current !== lastCodeRef.current) {
          lastCodeRef.current = current;
          scheduleWrite(current);
        }
      } catch {
        // editor not ready; skip tick.
      }
    }, POLL_MS);
  }, [scheduleWrite]);

  function stopPoll() {
    if (pollTimerRef.current) {
      clearInterval(pollTimerRef.current);
      pollTimerRef.current = null;
    }
  }

  const mountEditor = useCallback(() => {
    const container = containerRef.current;
    if (!container || editorRef.current) return;
    const el = document.createElement('strudel-editor') as StrudelEditorEl;
    el.style.width = '100%';
    el.style.height = '100%';
    el.style.display = 'block';
    container.appendChild(el);
    editorRef.current = el;
    requestAnimationFrame(() => {
      const savedCode = (() => {
        try {
          return localStorage.getItem(LS_KEY) ?? DEFAULT_CODE;
        } catch {
          return DEFAULT_CODE;
        }
      })();
      lastCodeRef.current = savedCode;
      if (typeof el.editor?.setCode === 'function') {
        el.editor.setCode(savedCode);
      }
      startPoll();
    });
  }, [startPoll]);

  // On mount (client side), load script + mount editor immediately.
  useEffect(() => {
    if (scriptLoaded || editorRef.current) return;

    const existing = document.querySelector(
      `script[src="${STRUDEL_REPL_SRC}"]`,
    ) as HTMLScriptElement | null;

    function onReady() {
      setScriptLoaded(true);
      mountEditor();
    }

    if (existing) {
      if (customElements.get('strudel-editor')) {
        onReady();
      } else {
        existing.addEventListener('load', onReady, { once: true });
      }
      return;
    }

    const script = document.createElement('script');
    script.src = STRUDEL_REPL_SRC;
    script.type = 'module';
    script.addEventListener('load', onReady, { once: true });
    document.head.appendChild(script);
  }, [scriptLoaded, mountEditor]);

  useEffect(() => {
    return () => {
      stopPoll();
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
      editorRef.current?.remove();
    };
  }, []);

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
    if (!mobileOpen) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        triggerRef.current?.focus();
      }
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [mobileOpen]);

  function handlePasteFromClipboard() {
    navigator.clipboard
      .readText()
      .then((text) => {
        const el = editorRef.current;
        if (el?.editor?.setCode) {
          el.editor.setCode(text);
        }
      })
      .catch(() => {
        // permission denied or unavailable
      });
  }

  const showFloatingTrigger = !mobileOpen && !desktopOpen;

  return (
    <>
      {/* Floating trigger. Visible on mobile when closed; on desktop when closed. */}
      {showFloatingTrigger && (
        <button
          ref={triggerRef}
          type="button"
          onClick={() => {
            setMobileOpen(true);
            setDesktopOpen(true);
          }}
          aria-expanded={false}
          aria-controls="strudel-playground"
          className="fixed bottom-4 right-4 z-50 text-sm font-medium px-4 py-2 rounded-full border border-rule bg-accent text-bg shadow-lg hover:bg-accent/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-safe:transition-colors"
        >
          <span className="mr-1.5" aria-hidden="true">♪</span>
          playground
        </button>
      )}

      {/* Mobile-only backdrop. */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-fg/30"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        id="strudel-playground"
        role="complementary"
        aria-label="Strudel playground"
        className={[
          'bg-zinc-900 text-fg border-l border-rule flex flex-col',
          // Mobile: fixed overlay, toggleable.
          'fixed inset-y-0 right-0 z-40 w-full sm:w-[28rem]',
          'motion-safe:transition-all motion-safe:duration-300',
          mobileOpen ? 'translate-x-0' : 'translate-x-full',
          // Desktop: in-flow column, can collapse via desktopOpen.
          desktopOpen
            ? 'lg:static lg:translate-x-0 lg:w-[28rem] lg:flex-shrink-0 lg:sticky lg:top-0 lg:h-screen'
            : 'lg:static lg:w-0 lg:flex-shrink-0 lg:overflow-hidden',
        ].join(' ')}
      >
        <div className="flex items-center justify-between px-5 py-3 border-b border-rule">
          <h2 className="text-lg font-display italic">Playground</h2>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePasteFromClipboard}
              className="text-xs px-2 py-1 rounded border border-fg/20 hover:border-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-safe:transition-colors"
            >
              paste
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                setDesktopOpen(false);
              }}
              aria-label="Close playground"
              className="text-sm px-2 py-1 rounded hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-safe:transition-colors"
            >
              close
            </button>
          </div>
        </div>

        <div ref={containerRef} className="flex-1 min-h-0 overflow-auto" />
      </aside>
    </>
  );
}
