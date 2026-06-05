import { Doc, loadDoc } from '@/lib/doc';

export const metadata = { title: 'practice log — monsieur music maestro' };

export default async function Page() {
  const md = await loadDoc('practice-log-template');
  return <Doc markdown={md} />;
}
