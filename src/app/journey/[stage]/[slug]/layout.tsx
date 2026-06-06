import StagesSidebar from '@/components/StagesSidebar';
import { getTree } from '@/lib/toys';

export default async function ToyLayout({ children }: { children: React.ReactNode }) {
  const tree = await getTree();
  return (
    <>
      <StagesSidebar tree={tree} />
      {children}
    </>
  );
}
