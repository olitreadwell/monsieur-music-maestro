'use client';

import { useRef, useState, useEffect, useCallback } from 'react';

const STRUDEL_REPL_SRC = 'https://unpkg.com/@strudel/repl@1.0.2';
const LS_KEY = 'strudel:repl:code';
const DEFAULT_CODE = 's("bd*4").bank("RolandTR909")';
const PANEL_HEIGHT = 320;
const DEBOUNCE_MS = 500;
const POLL_MS = 1000;

type StrudelEditorEl = HTMLElement & {
  editor?: {
    setCode: (c: string) => void;
    getCode: () => string;
  };
};

export default function BottomRepl() {
  const [open, setOpen] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<StrudelEditorEl | null>(null);
  const pollTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastCodeRef = useRef<string>('');

  // Write code to localStorage with debounce.
  const scheduleWrite = useCallback((code: string) => {
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = setTimeout(() => {
      try {
        localStorage.setItem(LS_KEY, code);
      } catch {
        // Storage may be unavailable; fail silently.
      }
    }, DEBOUNCE_MS);
  }, []);

  // Poll for code changes while panel is open.
  function startPoll() {
    stopPoll();
    pollTimerRef.current = setInterval(() => {
      const el = editorRef.current;
      if (!el?.editor) return;
      const current = el.editor.getCode();
      if (current !== lastCodeRef.current) {
        lastCodeRef.current = current;
        scheduleWrite(current);
      }
    }, POLL_MS);
  }

  function stopPoll() {
    if (pollTimerRef.current) {
      clearInterval(pollTimerRef.current);
      pollTimerRef.current = null;
    }
  }

  // Mount the strudel-editor element inside the container.
  function mountEditor() {
    const container = containerRef.current;
    if (!container || editorRef.current) return;

    const el = document.createElement('strudel-editor') as StrudelEditorEl;
    el.style.width = '100%';
    el.style.height = `${PANEL_HEIGHT}px`;
    el.style.display = 'block';
    container.appendChild(el);
    editorRef.current = el;

    // After one rAF tick, the custom element should be upgraded.
    requestAnimationFrame(() => {
      const savedCode = (() => {
        try {
          return localStorage.getItem(LS_KEY) ?? DEFAULT_CODE;
        } catch {
          return DEFAULT_CODE;
        }
      })();
      lastCodeRef.current = savedCode;
      el.editor?.setCode(savedCode);
      startPoll();
    });
  }

  // Load the script then mount.
  function loadScriptAndMount() {
    const existing = document.querySelector(
      `script[src="${STRUDEL_REPL_SRC}"]`
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

  function handleToggle() {
    const next = !open;
    setOpen(next);

    if (next && !scriptLoaded) {
      loadScriptAndMount();
    } else if (next && scriptLoaded && !editorRef.current) {
      mountEditor();
    }

    if (!next) {
      stopPoll();
    } else if (editorRef.current) {
      startPoll();
    }
  }

  // Cleanup on unmount.
  useEffect(() => {
    return () => {
      stopPoll();
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
      editorRef.current?.remove();
    };
  }, []);

  const panelHeightClass = open ? `h-[${PANEL_HEIGHT}px]` : 'h-0';

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {/* Expandable panel */}
      <div
        id="strudel-repl-panel"
        role="region"
        aria-label="Strudel playground"
        className={[
          'overflow-hidden bg-zinc-900 border-t border-fg/10',
          'motion-safe:transition-[height] motion-safe:duration-300',
          open
            ? 'sm:h-[320px] max-sm:fixed max-sm:inset-0 max-sm:h-full max-sm:z-50'
            : 'h-0',
        ].join(' ')}
        style={{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
      >
        <div ref={containerRef} className="w-full h-full" />
      </div>

      {/* Toggle bar */}
      <button
        type="button"
        onClick={handleToggle}
        aria-expanded={open}
        aria-controls="strudel-repl-panel"
        className={[
          'w-full h-11 flex items-center justify-center gap-2',
          'bg-zinc-950 dark:bg-zinc-900 border-t border-fg/10',
          'text-sm font-medium text-fg hover:bg-zinc-800',
          'motion-safe:transition-colors',
          'pb-[env(safe-area-inset-bottom)]',
          'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
        ].join(' ')}
      >
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
        {open ? '▼ close playground' : '▲ open playground'}
      </button>
    </div>
  );
}
