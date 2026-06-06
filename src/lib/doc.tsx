import { promises as fs } from 'node:fs';
import path from 'node:path';
import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CodeBlock from '@/components/CodeBlock';

type DocSlug =
  | 'README'
  | 'learning-journey'
  | 'strudel-cheatsheet'
  | 'resources'
  | 'practice-log-template';

export async function loadDoc(slug: DocSlug): Promise<string> {
  const file = path.join(process.cwd(), 'content', 'music', `${slug}.md`);
  const raw = await fs.readFile(file, 'utf8');
  return raw.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '');
}

const markdownComponents: Components = {
  code(props) {
    const { className, children } = props;
    const match = className?.match(/language-(\w+)/);
    if (match) {
      const code = String(children).replace(/\n$/, '');
      return <CodeBlock code={code} language={match[1]} />;
    }
    return <code className={className}>{children}</code>;
  },
  pre(props) {
    const child = props.children as { props?: { className?: string } } | null;
    if (child?.props?.className && /language-/.test(child.props.className)) {
      return <>{props.children}</>;
    }
    return <pre>{props.children}</pre>;
  },
};

export function Doc({ markdown }: { markdown: string }) {
  return (
    <article className="prose dark:prose-invert max-w-3xl mx-auto px-6 py-10 prose-headings:font-semibold prose-a:text-accent prose-code:font-mono prose-pre:bg-fg/5 prose-pre:text-fg">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {markdown}
      </ReactMarkdown>
    </article>
  );
}
