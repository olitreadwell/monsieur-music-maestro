import { Doc, loadDoc } from '@/lib/doc';

export const metadata = { title: 'resources: monsieur music maestro' };

export default async function Page() {
  const md = await loadDoc('resources');
  return <Doc markdown={md} />;
}
