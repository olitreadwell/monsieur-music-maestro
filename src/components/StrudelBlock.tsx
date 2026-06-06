'use client';

import { useState } from 'react';

interface StrudelBlockProps {
  code: string;
}

function encodeForStrudel(code: string): string {
  const b64 = btoa(unescape(encodeURIComponent(code)));
  return b64.replaceAll('+', '-').replaceAll('/', '_').replaceAll('=', '');
}

export default function StrudelBlock({ code }: StrudelBlockProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  const strudelUrl = `https://strudel.cc/?code=${encodeForStrudel(code)}`;

  return (
    <div className="my-4 rounded border border-fg/10 overflow-hidden">
      <div className="overflow-x-auto bg-fg/5">
        <pre className="p-4 text-sm font-mono leading-relaxed whitespace-pre">
          <code>{code}</code>
        </pre>
      </div>
      <div className="flex items-center gap-3 px-4 py-2 border-t border-fg/10 bg-fg/5">
        <button
          type="button"
          onClick={handleCopy}
          className="text-xs px-3 py-1 rounded border border-fg/20 hover:border-fg/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current transition-colors"
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
        <a
          href={strudelUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs px-3 py-1 rounded border border-fg/20 hover:border-fg/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current transition-colors"
        >
          Open in strudel.cc
        </a>
      </div>
    </div>
  );
}
