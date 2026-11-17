import { facebookPosts } from '@/lib/content';
import PageHeading from '@/components/page-heading';
import FacebookFeed from '@/components/facebook-feed';
export const metadata = {
  title: 'Newsfeed',
  description: 'Posts from the group’s Facebook feed, shown live with their likes and comments.',
  alternates: { canonical: '/newsfeed/' },
};
export default function Newsfeed() {
  return (
    <>
      <PageHeading title="Newsfeed">
        Posts from Facebook, shown live with their likes and comments. Loading them contacts
        Facebook.
      </PageHeading>
      {facebookPosts.length > 0 ? (
        <FacebookFeed posts={facebookPosts} />
      ) : (
        <p>No posts available.</p>
      )}
    </>
  );
}
