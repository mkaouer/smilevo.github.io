import { events, safeUrl } from '@/lib/content';
import PageHeading from '@/components/page-heading';
import EventDate from '@/components/event-date';
export const metadata = {
  title: 'Events',
  description:
    'Invited talks, tutorials and presentations by Mohamed Wiem Mkaouer and the SMILE Research Group.',
  alternates: { canonical: '/events/' },
};
export default function Events() {
  return (
    <>
      <PageHeading title="Events">
        Invited talks, tutorials and presentations by Mohamed Wiem Mkaouer and members of the SMILE
        Research Group. Earlier talks (2016–2019) covered performance regression, API migration,
        cyberinfrastructure, software quality, refactoring, testing AI systems and software
        evolution.
      </PageHeading>
      {events.map((e) => (
        <article className="news-item" key={e.id} id={e.id}>
          <EventDate date={e.date} />
          <div className="prose">
            <h2 className="award-title">
              {safeUrl(e.url) ? <a href={safeUrl(e.url)}>{e.title}</a> : e.title}
            </h2>
            {e.summary && <p>{e.summary}</p>}
            {e.location && <p>{e.location}</p>}
            {(e.type || safeUrl(e.video)) && (
              <p className="event-meta">
                {e.type && <span>{e.type}</span>}
                {safeUrl(e.video) && <a href={safeUrl(e.video)}>Watch the recording</a>}
              </p>
            )}
          </div>
        </article>
      ))}
    </>
  );
}
