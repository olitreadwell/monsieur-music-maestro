import { promises as fs } from 'node:fs';
import path from 'node:path';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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

export function Doc({ markdown }: { markdown: string }) {
  return (
    <article className="prose dark:prose-invert max-w-3xl mx-auto px-6 py-10 prose-headings:font-semibold prose-a:text-accent prose-code:font-mono prose-pre:bg-fg/5 prose-pre:text-fg">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
    </article>
  );
}
