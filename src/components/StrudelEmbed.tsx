'use client';

import { useRef, useState, useEffect } from 'react';

const STRUDEL_REPL_SRC = 'https://unpkg.com/@strudel/repl@1.0.2';

interface StrudelEmbedProps {
  code: string;
  height?: number;
}

export default function StrudelEmbed({ code, height = 280 }: StrudelEmbedProps) {
  const [loaded, setLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLElement | null>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  function mountEditor() {
    const container = containerRef.current;
    if (!container) return;

    const el = document.createElement('strudel-editor') as HTMLElement;
    el.setAttribute('code', code);
    el.style.width = '100%';
    el.style.height = `${height}px`;
    el.style.display = 'block';
    container.appendChild(el);
    editorRef.current = el;
  }

  function handleLoad() {
    setLoaded(true);
    mountEditor();
  }

  function handleClick() {
    if (loaded) return;

    const existing = document.querySelector(
      `script[src="${STRUDEL_REPL_SRC}"]`
    ) as HTMLScriptElement | null;

    if (existing) {
      // Script already in DOM from another embed — element may already be defined.
      if (customElements.get('strudel-editor')) {
        setLoaded(true);
        mountEditor();
      } else {
        existing.addEventListener('load', handleLoad, { once: true });
      }
      return;
    }

    const script = document.createElement('script');
    script.src = STRUDEL_REPL_SRC;
    script.type = 'module';
    script.addEventListener('load', handleLoad, { once: true });
    document.head.appendChild(script);
    scriptRef.current = script;
  }

  // Sync code prop changes into a live editor.
  useEffect(() => {
    if (!loaded || !editorRef.current) return;
    const el = editorRef.current as HTMLElement & {
      editor?: { setCode: (c: string) => void };
    };
    el.editor?.setCode(code);
  }, [loaded, code]);

  // Cleanup: remove the editor element on unmount.
  useEffect(() => {
    return () => {
      editorRef.current?.remove();
    };
  }, []);

  return (
    <div
      className="relative rounded border border-fg/10 overflow-hidden"
      style={{ height }}
    >
      {/* Always-present container where the editor is appended. */}
      <div ref={containerRef} className="w-full h-full" />

      {/* Facade — shown until loaded. */}
      {!loaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-fg/5">
          {/* Faded code preview */}
          <pre
            aria-hidden="true"
            className="absolute inset-0 m-0 p-4 font-mono text-xs text-fg/20 overflow-hidden pointer-events-none whitespace-pre-wrap"
          >
            {code}
          </pre>

          <button
            type="button"
            onClick={handleClick}
            aria-label="Load interactive Strudel player to hear this pattern"
            className="relative z-10 rounded bg-fg/10 px-4 py-2 text-sm font-medium text-fg hover:bg-fg/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg motion-safe:transition-colors"
          >
            ▶ load player
          </button>
        </div>
      )}
    </div>
  );
}
