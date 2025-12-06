import { Metadata } from 'next';
import { BlogCard, BlogPost } from '@/components/ui/BlogCard';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Articles about AI, technology, and community from Town Hall Newark. Learn about artificial intelligence in plain language.',
};

// Mock data - will be replaced with API calls
const posts: BlogPost[] = [
  {
    slug: 'what-is-chatgpt',
    title: 'What is ChatGPT and How Can It Help You?',
    excerpt: 'A simple guide to understanding ChatGPT, how it works, and practical ways you can use it in your daily life and work. No technical jargon, just clear explanations.',
    date: '2024-12-20',
    author: 'Sarah Johnson',
    tags: ['AI Basics', 'ChatGPT'],
    readTime: '5 min read',
  },
  {
    slug: 'ai-job-market-newark',
    title: 'AI and the Job Market: Opportunities in Newark',
    excerpt: 'Exploring how AI is creating new job opportunities in our community and what skills are in demand. Plus, resources for getting started.',
    date: '2024-12-15',
    author: 'Marcus Williams',
    tags: ['Careers', 'Local'],
    readTime: '7 min read',
  },
  {
    slug: 'protecting-privacy-ai-age',
    title: 'Protecting Your Privacy in the Age of AI',
    excerpt: 'Practical tips for keeping your personal information safe while using AI tools and services. Learn what data is collected and how to protect yourself.',
    date: '2024-12-10',
    author: 'Dr. Lisa Chen',
    tags: ['Privacy', 'Safety'],
    readTime: '6 min read',
  },
  {
    slug: 'ai-small-business-guide',
    title: 'A Small Business Owner\'s Guide to AI',
    excerpt: 'How local Newark businesses are using AI to save time, serve customers better, and grow. Real examples from our community.',
    date: '2024-12-05',
    author: 'James Rodriguez',
    tags: ['Business', 'Practical'],
    readTime: '8 min read',
  },
  {
    slug: 'understanding-ai-bias',
    title: 'Understanding AI Bias: What You Need to Know',
    excerpt: 'AI systems can reflect human biases. Learn what this means, why it matters, and how to be a more informed user of AI technology.',
    date: '2024-11-28',
    author: 'Dr. Aisha Patel',
    tags: ['Ethics', 'Education'],
    readTime: '6 min read',
  },
  {
    slug: 'free-ai-tools-everyone',
    title: '10 Free AI Tools Everyone Should Know About',
    excerpt: 'A curated list of free AI tools that can help with writing, learning, creativity, and productivity. All tested and recommended by our community.',
    date: '2024-11-20',
    author: 'Town Hall Team',
    tags: ['Tools', 'Resources'],
    readTime: '10 min read',
  },
];

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

      {/* Blog Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 flex items-center justify-center">
                <span className="text-4xl">📝</span>
              </div>
              <h2 className="text-2xl font-bold mb-2">No Posts Yet</h2>
              <p className="text-gray-600 mb-6">
                Check back soon for new articles!
              </p>
            </div>
          )}
        </div>
      </section>

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
