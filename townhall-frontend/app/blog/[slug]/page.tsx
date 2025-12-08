import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, User, Clock, Share2, Twitter, Facebook, Linkedin } from 'lucide-react';
import { BlogCard, BlogPost } from '@/components/ui/BlogCard';
import { getBlogPost, getRelatedPosts, BlogPostFull } from '@/lib/data';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getBlogPost(params.slug);
  if (!post) {
    return { title: 'Post Not Found' };
  }
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug);
  const relatedPosts = getRelatedPosts(params.slug, 2);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black uppercase mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-6">This article doesn&apos;t exist or has been removed.</p>
          <Link
            href="/blog"
            className="inline-block px-6 py-3 bg-bauhaus-blue text-white font-semibold uppercase tracking-wider"
          >
            View All Posts
          </Link>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const shareUrl = `https://townhallnewark.org/blog/${post.slug}`;

  return (
    <article className="min-h-screen">
      {/* Back link */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-gray-600 hover:text-bauhaus-blue transition-colors"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Back to Blog
          </Link>
        </div>
      </div>

      {/* Header */}
      <header className="py-12 border-b-4 border-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag: string) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-bauhaus-yellow text-black"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-black uppercase mb-6 leading-tight" data-testid="blog-title">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-6 text-gray-600">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" aria-hidden="true" />
              <span data-testid="blog-author">{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" aria-hidden="true" />
              <time dateTime={post.date} data-testid="blog-date">{formattedDate}</time>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" aria-hidden="true" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Main content */}
            <div className="lg:col-span-8">
              <div
                className="prose prose-lg max-w-none prose-headings:font-black prose-headings:uppercase prose-a:text-bauhaus-blue prose-a:no-underline hover:prose-a:underline"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Author bio */}
              <div className="mt-12 pt-8 border-t-2 border-black">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-bauhaus-blue flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                    {post.author.split(' ').map((n: string) => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-bold text-lg">About {post.author}</p>
                    <p className="text-gray-600">{post.authorBio}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="sticky top-24 space-y-8">
                {/* Share */}
                <div className="border-2 border-black p-6">
                  <h3 className="font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Share2 className="w-5 h-5" aria-hidden="true" />
                    Share
                  </h3>
                  <div className="flex gap-3">
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(shareUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-bauhaus-blue hover:text-white transition-colors"
                      aria-label="Share on Twitter"
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-bauhaus-blue hover:text-white transition-colors"
                      aria-label="Share on Facebook"
                    >
                      <Facebook className="w-5 h-5" />
                    </a>
                    <a
                      href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(post.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-bauhaus-blue hover:text-white transition-colors"
                      aria-label="Share on LinkedIn"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  </div>
                </div>

                {/* Newsletter */}
                <div className="bg-bauhaus-yellow p-6">
                  <h3 className="font-bold uppercase tracking-wider mb-2">
                    Stay Updated
                  </h3>
                  <p className="text-sm mb-4">
                    Get new articles delivered to your inbox.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-block w-full text-center px-4 py-2 bg-black text-white font-semibold text-sm uppercase tracking-wider hover:bg-gray-800 transition-colors"
                  >
                    Subscribe
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-black uppercase mb-8">
              Related Articles
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {relatedPosts.map((relatedPost: BlogPostFull) => (
                <BlogCard key={relatedPost.slug} post={{
                  slug: relatedPost.slug,
                  title: relatedPost.title,
                  excerpt: relatedPost.excerpt,
                  date: relatedPost.date,
                  author: relatedPost.author,
                  tags: relatedPost.tags,
                  readTime: relatedPost.readTime,
                }} />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
