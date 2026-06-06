import Link from 'next/link';
import { Doc, loadDoc } from '@/lib/doc';

export const metadata = { title: 'journey — narrative — monsieur music maestro' };

export default async function Page() {
  const md = await loadDoc('learning-journey');
  return (
    <>
      <div className="max-w-3xl mx-auto px-6 pt-6">
        <Link href="/" className="text-sm hover:text-accent">&larr; back to the tree</Link>
      </div>
      <Doc markdown={md} />
    </>
  );
}
