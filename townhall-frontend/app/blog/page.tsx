import { Metadata } from 'next';
import { BlogCard, BlogPost } from '@/components/ui/BlogCard';
import { BlogPageClient } from './BlogPageClient';
import { getBlogPosts } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Articles about AI, technology, and community from Town Hall Newark. Learn about artificial intelligence in plain language.',
};

// Fetch blog posts from backend API
async function fetchBlogPosts() {
  try {
    const apiPosts = await getBlogPosts();
    return apiPosts;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

// Get all unique tags from posts
function getAllTagsFromPosts(posts: BlogPost[]): string[] {
  const tagsSet = new Set<string>();
  posts.forEach(post => {
    post.tags?.forEach(tag => tagsSet.add(tag));
  });
  return Array.from(tagsSet).sort();
}

export default async function BlogPage() {
  const posts = await fetchBlogPosts();
  const allTags = getAllTagsFromPosts(posts);
  return (
    <div className="min-h-screen bg-swiss-white">
      {/* Hero - Swiss Modern */}
      <section className="py-24 lg:py-32 bg-swiss-white border-b border-swiss-border">
        <div className="max-w-swiss mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <div className="w-12 h-1 bg-swiss-red mb-6" />
              <h1 className="text-h1 font-bold text-swiss-black mb-6">
                Blog
              </h1>
              <p className="text-body-lg text-swiss-gray max-w-2xl">
                Articles about AI, technology, and community. Written in plain language 
                for everyone, by everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Content with Search/Filter */}
      <BlogPageClient posts={posts} allTags={allTags} />

      {/* Contribute CTA - Swiss Modern */}
      <section className="py-24 lg:py-32 bg-swiss-light">
        <div className="max-w-swiss mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="w-12 h-1 bg-swiss-black mb-6" />
              <h2 className="text-h2 font-bold text-swiss-black mb-4">
                Want to Contribute?
              </h2>
              <p className="text-body-lg text-swiss-gray max-w-lg">
                Have knowledge to share? We welcome guest posts from community members. 
                Share your AI journey, tips, or insights with our readers.
              </p>
            </div>
            <div className="lg:col-span-5">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-swiss-black text-swiss-white font-medium hover:bg-neutral-800 transition-colors"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
