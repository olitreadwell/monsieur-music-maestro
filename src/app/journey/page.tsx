import { Doc, loadDoc } from '@/lib/doc';

export const metadata = { title: 'journey — monsieur music maestro' };

export default async function Page() {
  const md = await loadDoc('learning-journey');
  return <Doc markdown={md} />;
}
