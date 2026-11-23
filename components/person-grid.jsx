import Link from 'next/link';
import PersonPhoto from '@/components/person-photo';
export default function PersonGrid({ members, headingLevel = 3, compact = false }) {
  const Heading = `h${headingLevel}`;
  return (
    <div className={compact ? 'people-grid people-grid-compact' : 'people-grid'}>
      {members.map((p) => (
        <article className="person-card" key={p.id}>
          <Link href={`/people/${p.id}/`}>
            {p.image ? (
              <PersonPhoto person={p} loading="lazy" />
            ) : (
              <div className="person-placeholder" />
            )}
            <Heading>{p.name}</Heading>
          </Link>
          <p>{p.role}</p>
        </article>
      ))}
    </div>
  );
}
