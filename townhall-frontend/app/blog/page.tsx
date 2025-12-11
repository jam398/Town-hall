import { Metadata } from 'next';
import Link from 'next/link';
import { BlogPost } from '@/components/ui/BlogCard';
import { BlogPageClient } from './BlogPageClient';
import { getBlogPosts } from '@/lib/api';
import { ArrowRight, Calendar, User, BookOpen } from 'lucide-react';

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

// Featured Article Card - Large format
function FeaturedArticle({ post }: { post: BlogPost }) {
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="grid lg:grid-cols-12 gap-0 bg-swiss-black overflow-hidden">
        {/* Image/Visual area */}
        <div className="lg:col-span-5 relative aspect-video lg:aspect-auto lg:min-h-[400px]">
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-neutral-900" />
          {/* Decorative typography */}
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <span className="text-[120px] lg:text-[180px] font-bold text-white/5 leading-none select-none">
              AI
            </span>
          </div>
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="absolute bottom-4 left-4 flex gap-2">
              {post.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="px-3 py-1.5 bg-swiss-red text-swiss-white text-caption font-medium">
                  {tag}
                </span>
              ))}
            </div>
          )}
          <div className="absolute top-0 right-0 w-px h-full bg-neutral-700 hidden lg:block" />
        </div>
        
        {/* Content area */}
        <div className="lg:col-span-7 p-8 lg:p-12 flex flex-col justify-center">
          <div className="w-12 h-1 bg-swiss-red mb-6" />
          <p className="text-caption font-medium text-swiss-red mb-4 tracking-wide">
            FEATURED ARTICLE
          </p>
          <h2 className="text-h2 lg:text-h1 font-bold text-swiss-white mb-4 group-hover:text-swiss-red transition-colors line-clamp-2">
            {post.title}
          </h2>
          <p className="text-body text-neutral-400 mb-6 line-clamp-3">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-6 text-body-sm text-neutral-500 mb-8">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" aria-hidden="true" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" aria-hidden="true" />
              <span>{formattedDate}</span>
            </div>
            {post.readTime && (
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" aria-hidden="true" />
                <span>{post.readTime}</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 text-swiss-white group-hover:text-swiss-red transition-colors">
            <span className="font-medium">Read Article</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </article>
    </Link>
  );
}

// Stats component
function BlogStats({ posts }: { posts: BlogPost[] }) {
  const totalPosts = posts.length;
  const totalAuthors = new Set(posts.map(p => p.author)).size;
  
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-swiss-border">
      {[
        { value: totalPosts, label: 'Articles' },
        { value: totalAuthors, label: 'Authors' },
        { value: '100%', label: 'Free to Read' },
        { value: 'Weekly', label: 'New Posts' },
      ].map((stat, index) => (
        <div key={index} className="bg-swiss-white p-6 lg:p-8 text-center">
          <p className="text-h2 lg:text-h1 font-bold text-swiss-black mb-1">{stat.value}</p>
          <p className="text-body-sm text-swiss-gray">{stat.label}</p>
        </div>
      ))}
    </div>
  );
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
            <BlogStats posts={posts} />
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
