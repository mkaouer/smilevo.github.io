import Link from 'next/link';
import { posts } from '@/lib/content';
import { formatDate } from '@/lib/dates.mjs';
import PageHeading from '@/components/page-heading';
export const metadata = {
  title: 'Resources',
  description: 'Advice and resources for students and collaborators.',
  alternates: { canonical: '/resources/' },
};
export default function Resources() {
  return (
    <>
      <PageHeading title="Resources">
        Advice and practical guides for students and collaborators.
      </PageHeading>
      <section aria-label="Posts" className="post-list">
        {posts.map((p) => (
          <article key={p.id} className="post-card">
            <time dateTime={p.date}>{formatDate(p.date)}</time>
            <h2>
              <Link href={`/resources/${p.id}/`}>{p.title}</Link>
            </h2>
            <p>{p.summary}</p>
          </article>
        ))}
      </section>
    </>
  );
}
