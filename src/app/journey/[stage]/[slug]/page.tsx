import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getTree, getToy, STAGE_TITLES } from '@/lib/toys';
import type { Toy } from '@/lib/toys';
import StrudelBlock from '@/components/StrudelBlock';
import TreeNav from '@/components/TreeNav';

export async function generateStaticParams() {
  const tree = await getTree();
  return tree.allToys.map((toy) => ({
    stage: String(toy.stage),
    slug: toy.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ stage: string; slug: string }>;
}): Promise<Metadata> {
  const { stage, slug } = await params;
  const stageNumber = Number(stage);
  if (!Number.isInteger(stageNumber) || stageNumber < 0 || stageNumber > 8) {
    return { title: 'Not found' };
  }
  const toy = await getToy(stageNumber, slug);
  if (!toy) return { title: 'Not found' };
  return { title: `${toy.title} — Stage ${toy.stage} — monsieur music maestro` };
}

function getSpineOrder(toys: Toy[]): Toy[] {
  return toys
    .filter((t) => t.branch === 'spine')
    .sort((a, b) => a.stage - b.stage);
}

function getPrevNext(
  allToys: Toy[],
  current: Toy,
): { prev: Toy | null; next: Toy | null } {
  const spine = getSpineOrder(allToys);
  const idx = spine.findIndex((t) => t.id === current.id);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: idx > 0 ? spine[idx - 1] : null,
    next: idx < spine.length - 1 ? spine[idx + 1] : null,
  };
}

const markdownComponents: Components = {
  code(props) {
    const { className, children } = props;
    if (className && /language-strudel/.test(className)) {
      const code = String(children).replace(/\n$/, '');
      return <StrudelBlock code={code} />;
    }
    return <code className={className}>{children}</code>;
  },
  pre(props) {
    const child = props.children as { props?: { className?: string } } | null;
    if (child?.props?.className && /language-strudel/.test(child.props.className)) {
      return <>{props.children}</>;
    }
    return <pre>{props.children}</pre>;
  },
};

export default async function ToyPage({
  params,
}: {
  params: Promise<{ stage: string; slug: string }>;
}) {
  const { stage, slug } = await params;
  const stageNumber = Number(stage);

  if (!Number.isInteger(stageNumber) || stageNumber < 0 || stageNumber > 8) {
    notFound();
  }

  const toy = await getToy(stageNumber, slug);
  if (!toy) notFound();

  const tree = await getTree();
  const { prev, next } = getPrevNext(tree.allToys, toy);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <nav className="mb-6">
        <Link
          href={`/journey/${stageNumber}`}
          className="text-sm text-muted hover:text-accent transition"
        >
          ← Stage {stageNumber}: {STAGE_TITLES[stageNumber]}
        </Link>
      </nav>

      <div className="lg:grid lg:grid-cols-[16rem_1fr] lg:gap-10">
        <aside className="hidden lg:block">
          <TreeNav tree={tree} currentId={toy.id} />
        </aside>

        <main>
          <header className="mb-6">
            <h1 className="text-3xl font-semibold mb-2">{toy.title}</h1>
            <p className="text-sm text-muted">
              Stage {toy.stage} · {toy.type} · {toy.difficulty} · {toy.estimate_min}min
            </p>
          </header>

          <article className="prose dark:prose-invert max-w-none prose-headings:font-semibold prose-a:text-accent prose-code:font-mono prose-pre:bg-fg/5 prose-pre:text-fg">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
              {toy.body}
            </ReactMarkdown>
          </article>

          <nav className="mt-12 flex justify-between text-sm">
            {prev ? (
              <Link
                href={prev.routePath}
                className="text-muted hover:text-accent transition"
              >
                ← {prev.title}
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={next.routePath}
                className="text-muted hover:text-accent transition"
              >
                {next.title} →
              </Link>
            ) : (
              <span />
            )}
          </nav>
        </main>
      </div>
    </div>
  );
}
