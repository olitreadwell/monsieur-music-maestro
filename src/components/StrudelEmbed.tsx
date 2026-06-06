'use client';

import { useRef, useEffect, useState } from 'react';

const STRUDEL_REPL_SRC = 'https://unpkg.com/@strudel/repl@1.0.2';

interface StrudelEmbedProps {
  code: string;
  height?: number;
}

function loadStrudelScript(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();
  if (customElements.get('strudel-editor')) return Promise.resolve();

  const existing = document.querySelector(
    `script[src="${STRUDEL_REPL_SRC}"]`,
  ) as HTMLScriptElement | null;

  if (existing) {
    if (customElements.get('strudel-editor')) return Promise.resolve();
    return new Promise((resolve) => {
      existing.addEventListener('load', () => resolve(), { once: true });
    });
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = STRUDEL_REPL_SRC;
    script.type = 'module';
    script.addEventListener('load', () => resolve(), { once: true });
    script.addEventListener('error', () => reject(new Error('Failed to load Strudel')), { once: true });
    document.head.appendChild(script);
  });
}

export default function StrudelEmbed({ code, height = 280 }: StrudelEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLElement | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    loadStrudelScript()
      .then(() => {
        if (cancelled) return;
        const container = containerRef.current;
        if (!container || editorRef.current) {
          setReady(true);
          return;
        }
        const el = document.createElement('strudel-editor') as HTMLElement;
        el.setAttribute('code', code);
        el.style.width = '100%';
        el.style.height = `${height}px`;
        el.style.display = 'block';
        container.appendChild(el);
        editorRef.current = el;
        setReady(true);
      })
      .catch(() => {
        if (!cancelled) setReady(true);
      });

    return () => {
      cancelled = true;
      editorRef.current?.remove();
      editorRef.current = null;
    };
  }, [code, height]);

  useEffect(() => {
    if (!ready || !editorRef.current) return;
    const el = editorRef.current as HTMLElement & {
      editor?: { setCode: (c: string) => void };
    };
    el.editor?.setCode(code);
  }, [ready, code]);

  return (
    <div
      className="relative rounded border border-fg/10 overflow-hidden bg-fg/5"
      style={{ height }}
    >
      <div ref={containerRef} className="w-full h-full" />
      {!ready && (
        <pre
          aria-hidden="true"
          className="absolute inset-0 m-0 p-4 font-mono text-xs text-fg/40 overflow-hidden pointer-events-none whitespace-pre-wrap"
        >
          {code}
        </pre>
      )}
    </div>
  );
}
