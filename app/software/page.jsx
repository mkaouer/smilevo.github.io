import Link from 'next/link';
import { software, projects, people } from '@/lib/content';
import PageHeading from '@/components/page-heading';
export const metadata = { title: 'Software', alternates: { canonical: '/software/' } };
const stars = (n) => (n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, '')}k` : String(n));
export default function Software() {
  const tools = projects.flatMap((p) => (p.software || []).map((s) => ({ ...s, project: p })));
  return (
    <>
      <PageHeading title="Software" />
      <div className="prose">
        <p>
          Research tools from our projects, and the open-source repositories of group members on
          GitHub.
        </p>
      </div>
      {tools.length > 0 && (
        <section className="section">
          <h2>Research tools</h2>
          <ul className="software-list">
            {tools.map((t) => (
              <li key={`${t.project.id}-${t.name}`}>
                <h3>{t.name}</h3>
                {t.description && <p>{t.description}</p>}
                <div className="paper-links">
                  {t.code && <a href={t.code}>Code</a>}
                  {t.url && <a href={t.url}>Website</a>}
                  {t.dataset && <a href={t.dataset}>Dataset</a>}
                  <Link href={`/research/${t.project.id}/`}>{t.project.title}</Link>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
      <section className="section">
        <h2>GitHub profiles</h2>
        {software.map((s) => {
          const person = people.find((p) => p.id === s.personId);
          return (
            <article key={s.id} className="gh-profile">
              <div className="gh-head">
                {person?.image && <img src={person.image} alt="" loading="lazy" />}
                <div>
                  <h3>
                    <a href={s.url}>{s.name}</a>
                  </h3>
                  <p className="count">@{s.login}</p>
                  {s.description && <p>{s.description}</p>}
                </div>
              </div>
              <div className="gh-repos">
                {s.repos.map((r) => (
                  <a className="gh-repo" href={r.url} key={r.name}>
                    <strong>{r.name}</strong>
                    <span>{r.description}</span>
                    <small>
                      {r.language}
                      {r.language && r.stars !== undefined && ' · '}
                      {r.stars !== undefined && <>★ {stars(r.stars)}</>}
                    </small>
                  </a>
                ))}
              </div>
              <a className="text-link" href={s.url}>
                All repositories on GitHub
              </a>
            </article>
          );
        })}
      </section>
    </>
  );
}
