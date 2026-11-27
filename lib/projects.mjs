// People involved in a project: those listed explicitly, then co-authors of its publications who have a profile.
export function projectPeople(project, people, papers) {
  const byId = new Map(people.map((p) => [p.id, p]));
  const count = new Map();
  for (const id of project.publicationIds || []) {
    const paper = papers.find((p) => p.id === id);
    for (const pid of paper?.personIds || []) count.set(pid, (count.get(pid) || 0) + 1);
  }
  const explicit = project.personIds || [];
  const rest = [...count.keys()]
    .filter((id) => !explicit.includes(id))
    .sort((a, b) => count.get(b) - count.get(a));
  return [...explicit, ...rest].map((id) => byId.get(id)).filter(Boolean);
}
