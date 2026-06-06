import StagesSidebar from '@/components/StagesSidebar';
import { getTree } from '@/lib/toys';

export default async function ToyLayout({ children }: { children: React.ReactNode }) {
  const tree = await getTree();
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)]">
      <StagesSidebar tree={tree} />
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}
