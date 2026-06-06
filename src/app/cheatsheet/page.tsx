import { Doc, loadDoc } from '@/lib/doc';

export const metadata = { title: 'cheatsheet: monsieur music maestro' };

export default async function Page() {
  const md = await loadDoc('strudel-cheatsheet');
  return <Doc markdown={md} />;
}
