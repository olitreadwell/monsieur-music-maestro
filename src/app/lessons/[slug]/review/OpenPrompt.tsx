'use client';

export default function OpenPrompt() {
  return (
    <textarea
      className="w-full min-h-32 rounded-lg border border-fg/20 bg-transparent px-4 py-3 text-sm leading-relaxed resize-y focus:outline-none focus:ring-2 focus:ring-accent/50 placeholder:text-muted/50"
      placeholder="Write your reflection here…"
      aria-label="Reflection response"
    />
  );
}
