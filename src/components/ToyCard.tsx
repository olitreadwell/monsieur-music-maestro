import type { Toy } from '@/lib/toys';

export default function ToyCard({ toy }: { toy: Toy }) {
  return (
    <a href={toy.routePath} className="block">
      {toy.title}
    </a>
  );
}
