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

export default function PlaygroundSidebar() {
  const [open, setOpen] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<StrudelEditorEl | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
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

  function startPoll() {
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
  }

  function stopPoll() {
    if (pollTimerRef.current) {
      clearInterval(pollTimerRef.current);
      pollTimerRef.current = null;
    }
  }

  function mountEditor() {
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
  }

  function loadScriptAndMount() {
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
  }

  function handleOpen() {
    setOpen(true);
    if (!scriptLoaded) {
      loadScriptAndMount();
    } else if (!editorRef.current) {
      mountEditor();
    } else if (editorRef.current) {
      startPoll();
    }
  }

  function handleClose() {
    setOpen(false);
    stopPoll();
    triggerRef.current?.focus();
  }

  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') handleClose();
    }
    document.addEventListener('keydown', handleKey);
    closeRef.current?.focus();
    return () => document.removeEventListener('keydown', handleKey);
  }, [open]);

  useEffect(() => {
    return () => {
      stopPoll();
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
      editorRef.current?.remove();
    };
  }, []);

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

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={handleOpen}
        aria-expanded={open}
        aria-controls="strudel-playground"
        className="fixed bottom-4 right-4 z-50 text-sm font-medium px-4 py-2 rounded-full border border-rule bg-accent text-bg shadow-lg hover:bg-accent/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-safe:transition-colors"
      >
        <span className="mr-1.5" aria-hidden="true">♪</span>
        playground
      </button>

      {open && (
        <div
          className="fixed inset-0 z-40 bg-fg/30"
          onClick={handleClose}
          aria-hidden="true"
        />
      )}

      <aside
        id="strudel-playground"
        role="dialog"
        aria-modal="true"
        aria-label="Strudel playground"
        className={[
          'fixed inset-y-0 right-0 z-40',
          'w-full sm:w-[28rem] md:w-[32rem] lg:w-[36rem]',
          'bg-zinc-900 text-fg border-l border-rule flex flex-col',
          'motion-safe:transition-transform motion-safe:duration-300',
          open ? 'translate-x-0' : 'translate-x-full',
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
              ref={closeRef}
              type="button"
              onClick={handleClose}
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
