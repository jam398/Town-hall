import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, User, Clock, Share2, Twitter, Facebook, Linkedin } from 'lucide-react';
import { PortableText } from '@portabletext/react';
import { BlogCard } from '@/components/ui/BlogCard';
import { getBlogPost, getBlogPosts, BlogPost } from '@/lib/api';
import { createSafeHtml } from '@/lib/sanitize';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://townhallnewark.org';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getBlogPost(params.slug);
  if (!post) {
    return { title: 'Post Not Found' };
  }
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug);
  
  // Get related posts (same tags)
  let relatedPosts: BlogPost[] = [];
  if (post) {
    const allPosts = await getBlogPosts();
    relatedPosts = allPosts
      .filter(p => p.slug !== post.slug && p.tags?.some(tag => post.tags?.includes(tag)))
      .slice(0, 2);
  }

  if (!post) {
    notFound();
  }

  const formattedDate = new Date(post.date + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const shareUrl = `${BASE_URL}/blog/${post.slug}`;

  return (
    <article className="min-h-screen">
      {/* Back link */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-swiss-gray hover:text-swiss-red transition-colors"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Back to Blog
          </Link>
        </div>
      </div>

      {/* Featured Image */}
      {post.image && (
        <div className="w-full h-[400px] md:h-[500px] relative bg-gray-900">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Header */}
      <header className="py-12 border-b-4 border-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags?.map((tag: string) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-swiss-light text-swiss-black"
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
              <span data-testid="blog-author">{typeof post.author === 'string' ? post.author : post.author?.name || 'Town Hall Team'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" aria-hidden="true" />
              <time dateTime={post.date} data-testid="blog-date">{formattedDate}</time>
            </div>
            {post.readTime && (
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" aria-hidden="true" />
                <span>{post.readTime}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Main content */}
            <div className="lg:col-span-8">
              <div className="prose prose-lg max-w-none prose-headings:font-black prose-headings:uppercase prose-a:text-swiss-red prose-a:no-underline hover:prose-a:underline">
                {post.content && typeof post.content === 'object' ? (
                  <PortableText value={post.content} />
                ) : post.content && typeof post.content === 'string' ? (
                  <div dangerouslySetInnerHTML={createSafeHtml(post.content)} />
                ) : (
                  <p className="text-gray-600">{post.excerpt}</p>
                )}
              </div>

              {/* Author bio */}
              {post.author && (
                <div className="mt-12 pt-8 border-t-2 border-black">
                  <div className="flex items-start gap-4">
                    {typeof post.author !== 'string' && post.author.avatar ? (
                      <div className="w-16 h-16 relative flex-shrink-0 rounded-full overflow-hidden">
                        <Image
                          src={post.author.avatar}
                          alt={post.author.name || 'Author'}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 bg-swiss-black flex items-center justify-center text-swiss-white font-bold text-xl flex-shrink-0">
                        {typeof post.author === 'string' ? post.author.split(' ').map((n: string) => n[0]).join('') : (post.author.name || 'THT').split(' ').map((n: string) => n[0]).join('')}
                      </div>
                    )}
                    <div>
                      <p className="font-bold text-lg">About {typeof post.author === 'string' ? post.author : post.author.name}</p>
                      {(typeof post.author !== 'string' && post.author.bio) && (
                        <p className="text-gray-600">{post.author.bio}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
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
                      className="w-10 h-10 flex items-center justify-center bg-swiss-light hover:bg-swiss-red hover:text-swiss-white transition-colors"
                      aria-label="Share on Twitter"
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center bg-swiss-light hover:bg-swiss-red hover:text-swiss-white transition-colors"
                      aria-label="Share on Facebook"
                    >
                      <Facebook className="w-5 h-5" />
                    </a>
                    <a
                      href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(post.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center bg-swiss-light hover:bg-swiss-red hover:text-swiss-white transition-colors"
                      aria-label="Share on LinkedIn"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  </div>
                </div>

                {/* Newsletter */}
                <div className="bg-swiss-light border border-swiss-border p-6">
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
              {relatedPosts.map((relatedPost) => (
                <BlogCard key={relatedPost.slug} post={relatedPost} />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
