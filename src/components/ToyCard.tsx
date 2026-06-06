import Link from 'next/link';
import type { Toy } from '@/lib/toys';

interface ToyCardProps {
  toy: Toy;
  current?: boolean;
  read?: boolean;
}

export default function ToyCard({ toy, current = false, read = false }: ToyCardProps) {
  const bullet = read ? '✓' : '●';
  const bulletClass = read ? 'mr-2 text-accent' : 'mr-2';

  return (
    <Link
      href={toy.routePath}
      className={[
        'block font-mono text-sm px-3 py-2 rounded border transition-colors',
        current
          ? 'border-accent text-accent'
          : 'border-transparent hover:border-accent',
        read ? 'opacity-70' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span className={bulletClass}>{bullet}</span>
      <span className="font-semibold">{toy.title}</span>
      <span className="opacity-60 ml-3">
        ({toy.type} · {toy.difficulty} · {toy.estimate_min} min)
      </span>
    </Link>
  );
}
