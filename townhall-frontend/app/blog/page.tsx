import { Metadata } from 'next';
import { BlogCard, BlogPost } from '@/components/ui/BlogCard';
import { BlogPageClient } from './BlogPageClient';
import { blogPosts, getAllBlogTags } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Articles about AI, technology, and community from Town Hall Newark. Learn about artificial intelligence in plain language.',
};

// Transform full posts to card format
const posts: BlogPost[] = blogPosts.map(post => ({
  slug: post.slug,
  title: post.title,
  excerpt: post.excerpt,
  date: post.date,
  author: post.author,
  tags: post.tags,
  readTime: post.readTime,
  image: post.image,
}));

// Get all unique tags
const allTags = getAllBlogTags();

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-20 bg-bauhaus-red text-white overflow-hidden">
        {/* Bauhaus decorations */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-bauhaus-yellow/30 rotate-45" />
        <div className="absolute bottom-10 left-10 w-24 h-24 rounded-full bg-bauhaus-blue/30" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <p className="text-sm font-bold uppercase tracking-widest text-bauhaus-yellow mb-4">
            Learn & Explore
          </p>
          <h1 className="text-5xl md:text-6xl font-black uppercase mb-6">
            Blog
          </h1>
          <p className="text-xl text-red-100 max-w-2xl">
            Articles about AI, technology, and community. Written in plain language 
            for everyone, by everyone.
          </p>
        </div>
      </section>

      {/* Blog Content with Search/Filter */}
      <BlogPageClient posts={posts} allTags={allTags} />

      {/* Newsletter CTA */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black uppercase mb-4">
            Want to Contribute?
          </h2>
          <p className="text-gray-600 mb-6">
            Have knowledge to share? We welcome guest posts from community members. 
            Share your AI journey, tips, or insights with our readers.
          </p>
          <a
            href="/contact"
            className="inline-block px-6 py-3 bg-bauhaus-blue text-white font-semibold uppercase tracking-wider hover:bg-blue-800 transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  );
}
