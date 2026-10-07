import type { ReactNode } from 'react';

export default function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="bg-paper px-5 pb-24 pt-36 md:px-10">
      <article className="prose prose-lg mx-auto max-w-[68ch] prose-headings:font-medium prose-headings:tracking-tight prose-headings:text-ink prose-h1:text-5xl prose-p:text-ink/80 prose-li:text-ink/80 prose-a:text-copper">
        <h1>{title}</h1>
        {children}
      </article>
    </div>
  );
}
