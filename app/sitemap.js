import { papers, people, posts, site, projects, gallery, pageContent } from '@/lib/content';
export const dynamic = 'force-static';
export default function sitemap() {
  return [
    '/',
    '/team/',
    '/publications/',
    '/news/',
    '/social/',
    '/awards/',
    '/events/',
    '/funding/',
    '/teaching/',
    '/talks/',
    '/service/',
    '/software/',
    '/resources/',
    '/join/',
    ...(projects.length || pageContent.research.trim() ? ['/research/'] : []),
    ...(gallery.length || pageContent.pictures.trim() ? ['/pictures/'] : []),
    ...(pageContent.about.trim() ? ['/aboutwebsite/'] : []),
    ...papers.map((p) => `/publications/${p.id}/`),
    ...people.map((p) => `/people/${p.id}/`),
    ...projects.map((p) => `/research/${p.id}/`),
    ...posts.map((p) => `/resources/${p.id}/`),
  ].map((path) => ({ url: `${site.url}${path}` }));
}
