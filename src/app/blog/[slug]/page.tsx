import { blogPosts } from '@/lib/data';
import StaticBlogPost, { staticBlogMetadata } from '@/components/blog/StaticBlogPost';
import DatabaseBlogPost, { databaseBlogMetadata } from '@/components/blog/DatabaseBlogPost';

interface PageProps { params: Promise<{ slug: string }> }

// Indexed static articles retain their existing URLs, independently of the DB.
export async function generateMetadata(props: PageProps) {
  const { slug } = await props.params;
  return blogPosts.some(post => post.slug === slug) ? staticBlogMetadata(props) : databaseBlogMetadata(props);
}

export default async function BlogPostPage(props: PageProps) {
  const { slug } = await props.params;
  return blogPosts.some(post => post.slug === slug) ? <StaticBlogPost {...props} /> : <DatabaseBlogPost {...props} />;
}