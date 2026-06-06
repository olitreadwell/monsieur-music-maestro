import Link from 'next/link';
import type { Toy } from '@/lib/toys';

interface ToyCardProps {
  toy: Toy;
  current?: boolean;
}

export default function ToyCard({ toy, current = false }: ToyCardProps) {
  return (
    <Link
      href={toy.routePath}
      className={[
        'block font-mono text-sm px-3 py-2 rounded border transition-colors',
        current
          ? 'border-accent text-accent'
          : 'border-transparent hover:border-accent',
      ].join(' ')}
    >
      <span className="mr-2">●</span>
      <span className="font-semibold">{toy.title}</span>
      <span className="opacity-60 ml-3">
        ({toy.type} · {toy.difficulty} · {toy.estimate_min} min)
      </span>
    </Link>
  );
}
