import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { projects, people, papers, safeUrl } from '@/lib/content';
import { projectPeople } from '@/lib/projects.mjs';
import PersonGrid from '@/components/person-grid';
import PaperCard from '@/components/paper-card';

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}
export async function generateMetadata({ params }) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  return {
    title: project?.title || 'Research',
    description: project?.description?.slice(0, 200),
    alternates: { canonical: `/research/${id}/` },
  };
}
export default async function ProjectPage({ params }) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) notFound();
  const team = projectPeople(project, people, papers);
  const projectPapers = (project.publicationIds || [])
    .map((pid) => papers.find((p) => p.id === pid))
    .filter(Boolean);
  const links = [
    ['url', 'Website'],
    ['code', 'Code'],
    ['dataset', 'Dataset'],
  ].filter(([key]) => safeUrl(project[key]));
  return (
    <article className="project">
      <Link className="back-link" href="/research/">
        Research
      </Link>
      <header className="page-heading">
        {project.area && <div className="eyebrow">{project.area}</div>}
        <h1>{project.title}</h1>
      </header>
      {project.image && <img className="detail-image" src={project.image} alt={project.title} />}
      <div className="prose">
        <ReactMarkdown>{project.description}</ReactMarkdown>
      </div>
      {links.length > 0 && (
        <div className="paper-links">
          {links.map(([key, label]) => (
            <a href={safeUrl(project[key])} key={key}>
              {label}
            </a>
          ))}
        </div>
      )}
      {team.length > 0 && (
        <section className="section">
          <h2>People</h2>
          <PersonGrid members={team} compact />
        </section>
      )}
      {(project.software || []).length > 0 && (
        <section className="section">
          <h2>Software and data</h2>
          <ul className="software-list">
            {project.software.map((s) => (
              <li key={s.name}>
                <h3>{s.name}</h3>
                {s.description && <p>{s.description}</p>}
                <div className="paper-links">
                  {[
                    ['url', 'Website'],
                    ['code', 'Code'],
                    ['dataset', 'Dataset'],
                  ].map(
                    ([key, label]) =>
                      safeUrl(s[key]) && (
                        <a href={safeUrl(s[key])} key={key}>
                          {label}
                        </a>
                      ),
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
      {projectPapers.length > 0 && (
        <section className="section">
          <h2>Publications</h2>
          <div className="paper-list">
            {projectPapers.map((p) => (
              <PaperCard key={p.id} paper={p} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
