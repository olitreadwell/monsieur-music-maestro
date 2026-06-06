'use client';

interface Props {
  labelledBy?: string;
  describedBy?: string;
}

export default function OpenPrompt({ labelledBy, describedBy }: Props) {
  return (
    <textarea
      className="w-full min-h-32 rounded-lg border border-fg/20 bg-transparent px-4 py-3 text-sm leading-relaxed resize-y focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg placeholder:text-muted"
      placeholder="Write your reflection here…"
      aria-label={labelledBy ? undefined : 'Reflection response'}
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
    />
  );
}
