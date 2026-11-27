import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { posts } from '@/lib/content';
import { formatDate } from '@/lib/dates.mjs';

export function generateStaticParams() {
  return posts.map((p) => ({ id: p.id }));
}
export async function generateMetadata({ params }) {
  const { id } = await params;
  const post = posts.find((p) => p.id === id);
  return {
    title: post?.title || 'Resources',
    description: post?.summary,
    alternates: { canonical: `/resources/${id}/` },
  };
}
export default async function Post({ params }) {
  const { id } = await params;
  const post = posts.find((p) => p.id === id);
  if (!post) notFound();
  return (
    <article className="post">
      <Link className="back-link" href="/resources/">
        Resources
      </Link>
      <header className="page-heading">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <h1>{post.title}</h1>
      </header>
      <div className="prose post-body">
        <ReactMarkdown>{post.body}</ReactMarkdown>
      </div>
    </article>
  );
}
