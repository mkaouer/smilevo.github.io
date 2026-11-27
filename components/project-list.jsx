import Link from 'next/link';
export default function ProjectList({ projects }) {
  if (!projects.length) return null;
  const areas = [...new Set(projects.map((p) => p.area).filter(Boolean))];
  const groups = areas.length
    ? areas.map((a) => [a, projects.filter((p) => p.area === a)])
    : [[null, projects]];
  return (
    <section className="section">
      {groups.map(([area, items]) => (
        <div key={area || 'all'}>
          <h2>{area || 'Projects'}</h2>
          <div className="project-grid">
            {items.map((p) => (
              <article key={p.id} id={p.id} className="project-card">
                <Link href={`/research/${p.id}/`}>
                  {p.image && <img src={p.image} alt="" loading="lazy" />}
                  <h3>{p.title}</h3>
                </Link>
                <p>{p.summary}</p>
                <div className="paper-links">
                  <Link href={`/research/${p.id}/`}>Project page</Link>
                  <span className="count">{(p.publicationIds || []).length} publications</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
