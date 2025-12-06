import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, User, Clock, Share2, Twitter, Facebook, Linkedin } from 'lucide-react';
import { BlogCard, BlogPost } from '@/components/ui/BlogCard';

// This would come from API/CMS in production
const getPost = (slug: string) => {
  const posts: Record<string, any> = {
    'what-is-chatgpt': {
      slug: 'what-is-chatgpt',
      title: 'What is ChatGPT and How Can It Help You?',
      excerpt: 'A simple guide to understanding ChatGPT, how it works, and practical ways you can use it in your daily life and work.',
      content: `
        <p class="lead">You've probably heard about ChatGPT by now. It's been all over the news, and maybe your friends or coworkers have mentioned it. But what exactly is it, and how can it help you?</p>

        <h2>What is ChatGPT?</h2>
        <p>ChatGPT is an AI assistant created by OpenAI. Think of it as a very smart computer program that can understand and respond to questions in plain English (and many other languages). It's like having a knowledgeable friend available 24/7 to help you with various tasks.</p>

        <h2>How Does It Work?</h2>
        <p>Without getting too technical, ChatGPT was trained on a massive amount of text from the internet—books, articles, websites, and more. This training helps it understand language patterns and provide helpful responses.</p>
        
        <p>When you ask it a question, it doesn't "search" for an answer like Google. Instead, it generates a response based on patterns it learned during training. This is why it can be creative and conversational.</p>

        <h2>What Can You Use It For?</h2>
        <p>Here are some practical ways people in our community are using ChatGPT:</p>
        
        <ul>
          <li><strong>Writing Help:</strong> Draft emails, letters, or social media posts. It can help you find the right words when you're stuck.</li>
          <li><strong>Learning:</strong> Ask it to explain complex topics in simple terms. It's like having a patient tutor.</li>
          <li><strong>Brainstorming:</strong> Need ideas for a project, gift, or event? ChatGPT can help generate options.</li>
          <li><strong>Problem Solving:</strong> Describe a challenge you're facing, and it can suggest approaches.</li>
          <li><strong>Translation:</strong> It can translate between many languages and explain cultural nuances.</li>
        </ul>

        <h2>Important Things to Know</h2>
        <p>While ChatGPT is incredibly useful, there are some important limitations to understand:</p>
        
        <ul>
          <li><strong>It can be wrong:</strong> ChatGPT sometimes generates incorrect information confidently. Always verify important facts.</li>
          <li><strong>It has a knowledge cutoff:</strong> It doesn't know about very recent events.</li>
          <li><strong>Privacy matters:</strong> Don't share sensitive personal information in your conversations.</li>
          <li><strong>It's a tool, not a replacement:</strong> Use it to assist your thinking, not replace it.</li>
        </ul>

        <h2>Getting Started</h2>
        <p>Ready to try it? Here's how to get started:</p>
        
        <ol>
          <li>Visit <a href="https://chat.openai.com">chat.openai.com</a></li>
          <li>Create a free account</li>
          <li>Start with a simple question or request</li>
          <li>Experiment and have fun!</li>
        </ol>

        <h2>Join Our Workshop</h2>
        <p>Want to learn more? Join us at Town Hall for our hands-on ChatGPT workshop where we'll explore practical uses together. Check our <a href="/events">events page</a> for upcoming sessions.</p>
      `,
      date: '2024-12-20',
      author: 'Sarah Johnson',
      authorBio: 'Sarah is a technology educator and Town Hall volunteer who specializes in making AI accessible to everyone.',
      tags: ['AI Basics', 'ChatGPT'],
      readTime: '5 min read',
      image: null,
    },
  };
  return posts[slug] || null;
};

// Related posts
const relatedPosts: BlogPost[] = [
  {
    slug: 'free-ai-tools-everyone',
    title: '10 Free AI Tools Everyone Should Know About',
    excerpt: 'A curated list of free AI tools that can help with writing, learning, creativity, and productivity.',
    date: '2024-11-20',
    author: 'Town Hall Team',
    tags: ['Tools', 'Resources'],
    readTime: '10 min read',
  },
  {
    slug: 'protecting-privacy-ai-age',
    title: 'Protecting Your Privacy in the Age of AI',
    excerpt: 'Practical tips for keeping your personal information safe while using AI tools and services.',
    date: '2024-12-10',
    author: 'Dr. Lisa Chen',
    tags: ['Privacy', 'Safety'],
    readTime: '6 min read',
  },
];

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getPost(params.slug);
  if (!post) {
    return { title: 'Post Not Found' };
  }
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);

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
