import { Metadata } from 'next';
import { BlogPost } from '@/components/ui/BlogCard';
import { BlogPageClient } from './BlogPageClient';
import { getBlogPosts } from '@/lib/api';
import { ArrowRight, BookOpen } from 'lucide-react';
import { FeaturedArticle } from '@/components/ui/FeaturedArticle';
import { ContentStats } from '@/components/ui/ContentStats';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Articles about AI, technology, and community from Town Hall Newark. Learn about artificial intelligence in plain language.',
};

// Revalidate every 10 seconds (or set to 0 for always fresh data)
export const revalidate = 10;

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

// Generate stats for blog posts
function getBlogStats(posts: BlogPost[]) {
  const totalPosts = posts.length;
  const totalAuthors = new Set(posts.map(p => p.author)).size;
  
  return [
    { value: totalPosts, label: 'Articles' },
    { value: totalAuthors, label: 'Authors' },
    { value: '100%', label: 'Free to Read' },
    { value: 'Weekly', label: 'New Posts' },
  ];
}

export default async function BlogPage() {
  const posts = await fetchBlogPosts();
  const allTags = getAllTagsFromPosts(posts);
  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1);
  
  return (
    <div className="min-h-screen bg-swiss-white">
      {/* Hero with Featured Article - Swiss Modern */}
      <section className="bg-swiss-white">
        <div className="max-w-swiss mx-auto px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-12 gap-8 mb-12">
            <div className="lg:col-span-6">
              <div className="w-12 h-1 bg-swiss-red mb-6" />
              <h1 className="text-display font-bold text-swiss-black mb-6">
                Blog
              </h1>
            </div>
            <div className="lg:col-span-6 flex items-end">
              <p className="text-body-lg text-swiss-gray">
                Articles about AI, technology, and community. Written in plain language 
                for everyone, by everyone.
              </p>
            </div>
          </div>
        </div>
        
        {/* Featured Article */}
        {featuredPost && (
          <div className="max-w-swiss mx-auto px-6 lg:px-8 pb-16 lg:pb-24">
            <FeaturedArticle post={featuredPost} />
          </div>
        )}
      </section>

      {/* Stats Bar */}
      {posts.length > 0 && (
        <section className="border-y border-swiss-border">
          <div className="max-w-swiss mx-auto">
            <ContentStats stats={getBlogStats(posts)} />
          </div>
        </section>
      )}

      {/* Blog Content with Search/Filter */}
      <BlogPageClient posts={remainingPosts} allTags={allTags} />

      {/* Contribute CTA - Swiss Modern with visual enhancement */}
      <section className="relative py-24 lg:py-32 bg-swiss-light overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/4 h-full bg-gradient-to-l from-swiss-border/50 to-transparent" />
        
        <div className="max-w-swiss mx-auto px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="w-12 h-1 bg-swiss-red mb-6" />
              <h2 className="text-h1 font-bold text-swiss-black mb-4">
                Want to Contribute?
              </h2>
              <p className="text-body-lg text-swiss-gray max-w-lg mb-8">
                Have knowledge to share? We welcome guest posts from community members. 
                Share your AI journey, tips, or insights with our readers.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-3 px-8 py-4 bg-swiss-black text-swiss-white font-medium hover:bg-neutral-800 transition-colors group"
              >
                Get in Touch
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
            <div className="lg:col-span-5 hidden lg:flex justify-end">
              {/* Decorative element */}
              <div className="w-48 h-48 border-2 border-swiss-border flex items-center justify-center">
                <BookOpen className="w-20 h-20 text-swiss-border" strokeWidth={1} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
