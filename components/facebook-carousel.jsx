'use client';
import { useState } from 'react';
import FacebookPost from '@/components/facebook-post';
import { wrapIndex } from '@/lib/facebook.mjs';

export default function FacebookCarousel({ posts }) {
  const [index, setIndex] = useState(0);
  if (!posts.length) return null;
  const go = (next) => setIndex(wrapIndex(next, posts.length));
  const post = posts[index];
  return (
    <div
      className="fb-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="Latest Facebook posts"
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft') go(index - 1);
        if (event.key === 'ArrowRight') go(index + 1);
      }}
    >
      {posts.length > 1 && (
        <>
          <button
            type="button"
            className="fb-arrow fb-prev"
            aria-label="Previous post"
            onClick={() => go(index - 1)}
          >
            <span aria-hidden="true">‹</span>
          </button>
          <button
            type="button"
            className="fb-arrow fb-next"
            aria-label="Next post"
            onClick={() => go(index + 1)}
          >
            <span aria-hidden="true">›</span>
          </button>
        </>
      )}
      <div
        className="fb-slide"
        role="group"
        aria-roledescription="slide"
        aria-label={`Post ${index + 1} of ${posts.length}`}
        aria-live="polite"
      >
        <FacebookPost key={post.url} url={post.url} />
      </div>
      {posts.length > 1 && (
        <div className="fb-dots" role="group" aria-label="Choose a post">
          {posts.map((p, i) => (
            <button
              type="button"
              key={p.id}
              aria-label={`Show post ${i + 1} of ${posts.length}`}
              aria-current={i === index ? 'true' : undefined}
              onClick={() => go(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
