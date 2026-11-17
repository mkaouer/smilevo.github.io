'use client';
import { useRef, useState } from 'react';
import FacebookPost from '@/components/facebook-post';
import { paginate } from '@/lib/facebook.mjs';

export default function FacebookFeed({ posts }) {
  const [page, setPage] = useState(1);
  const top = useRef(null);
  const view = paginate(posts, page);
  const show = (next) => {
    setPage(next);
    top.current?.scrollIntoView({ block: 'start' });
  };
  return (
    <div ref={top} className="fb-feed">
      {view.items.map((post) => (
        <article key={`${view.page}-${post.url}`} className="fb-feed-item">
          <FacebookPost url={post.url} />
        </article>
      ))}
      {view.pages > 1 && (
        <nav className="fb-pagination" aria-label="Newsfeed pages">
          <button type="button" disabled={view.page === 1} onClick={() => show(view.page - 1)}>
            Previous
          </button>
          {Array.from({ length: view.pages }, (_, i) => (
            <button
              type="button"
              key={i + 1}
              aria-label={`Page ${i + 1}`}
              aria-current={view.page === i + 1 ? 'page' : undefined}
              onClick={() => show(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            type="button"
            disabled={view.page === view.pages}
            onClick={() => show(view.page + 1)}
          >
            Next
          </button>
        </nav>
      )}
    </div>
  );
}
