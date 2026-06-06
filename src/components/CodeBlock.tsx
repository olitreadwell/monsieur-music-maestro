'use client';

import { useState } from 'react';

interface CodeBlockProps {
  code: string;
  language?: string;
}

export default function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard API unavailable; fail silently.
    }
  }

  return (
    <div className="relative rounded border border-fg/10 overflow-hidden bg-fg/5 my-4">
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-fg/10 bg-fg/5">
        <span className="text-xs font-mono text-muted">
          {language ?? 'code'}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? 'Code copied to clipboard' : 'Copy code to clipboard'}
          className="text-xs font-medium text-fg hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-safe:transition-colors"
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 m-0 text-sm font-mono leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}
