import { teaching } from '@/lib/content';
import PageHeading from '@/components/page-heading';
export const metadata = {
  title: 'Teaching',
  description: 'Courses taught by Mohamed Wiem Mkaouer.',
  alternates: { canonical: '/teaching/' },
};
export default function Teaching() {
  return (
    <>
      <PageHeading title="Teaching">Courses taught by Mohamed Wiem Mkaouer.</PageHeading>
      {teaching.map((c) => (
        <article className="news-item" key={c.id} id={c.id}>
          <span className="event-date">{c.term}</span>
          <div className="prose">
            <h2 className="award-title">{c.title}</h2>
            {c.description && <p>{c.description}</p>}
          </div>
        </article>
      ))}
    </>
  );
}
