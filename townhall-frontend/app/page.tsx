import Link from 'next/link';
import { ArrowRight, Calendar, Users, Lightbulb, Heart } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { EventCard, Event } from '@/components/ui/EventCard';
import { BlogCard, BlogPost } from '@/components/ui/BlogCard';

// Mock data - will be replaced with API calls
const upcomingEvents: Event[] = [
  {
    slug: 'intro-to-ai-january',
    title: 'Introduction to AI: What Everyone Should Know',
    description: 'A beginner-friendly workshop covering the basics of artificial intelligence, machine learning, and how AI is changing our daily lives.',
    date: '2025-01-15',
    time: '6:00 PM',
    location: 'Newark Public Library',
    capacity: 50,
    registered: 32,
    tags: ['Beginner', 'Workshop'],
  },
  {
    slug: 'ai-for-small-business',
    title: 'AI Tools for Small Business Owners',
    description: 'Learn practical AI tools that can help automate tasks, improve customer service, and grow your small business.',
    date: '2025-01-22',
    time: '7:00 PM',
    location: 'Newark Innovation Center',
    capacity: 30,
    registered: 18,
    tags: ['Business', 'Practical'],
  },
  {
    slug: 'community-ai-showcase',
    title: 'Community AI Showcase',
    description: 'See what your neighbors are building! Local community members present their AI projects and share their learning journeys.',
    date: '2025-02-01',
    time: '5:00 PM',
    location: 'Town Hall Community Space',
    capacity: 100,
    registered: 45,
    tags: ['Community', 'Showcase'],
  },
];

const latestPosts: BlogPost[] = [
  {
    slug: 'what-is-chatgpt',
    title: 'What is ChatGPT and How Can It Help You?',
    excerpt: 'A simple guide to understanding ChatGPT, how it works, and practical ways you can use it in your daily life and work.',
    date: '2024-12-20',
    author: 'Sarah Johnson',
    tags: ['AI Basics', 'ChatGPT'],
    readTime: '5 min read',
  },
  {
    slug: 'ai-job-market-newark',
    title: 'AI and the Job Market: Opportunities in Newark',
    excerpt: 'Exploring how AI is creating new job opportunities in our community and what skills are in demand.',
    date: '2024-12-15',
    author: 'Marcus Williams',
    tags: ['Careers', 'Local'],
    readTime: '7 min read',
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

export default function HomePage() {
  return (
    <>
      {/* Hero Section - Bauhaus Style */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        {/* Bauhaus geometric background */}
        <div className="absolute inset-0 -z-10">
          {/* Large blue circle */}
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-bauhaus-blue/10" />
          {/* Yellow square */}
          <div className="absolute bottom-20 left-10 w-32 h-32 bg-bauhaus-yellow/20 rotate-12" />
          {/* Red rectangle */}
          <div className="absolute top-40 left-1/4 w-48 h-24 bg-bauhaus-red/10 -rotate-6" />
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Content */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <p className="text-sm font-bold uppercase tracking-widest text-bauhaus-red">
                  Newark&apos;s AI Community Hub
                </p>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black uppercase leading-none tracking-tight">
                  Learn AI.
                  <br />
                  <span className="text-bauhaus-blue">Build Together.</span>
                </h1>
              </div>
              
              <p className="text-xl text-gray-600 max-w-xl leading-relaxed">
                Town Hall is Newark&apos;s nonprofit community space for AI education. 
                Free workshops, events, and resources for everyone—no tech background required.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/events">
                  <Button size="lg" variant="primary">
                    Upcoming Events
                    <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
                  </Button>
                </Link>
                <Link href="/volunteer">
                  <Button size="lg" variant="outline">
                    Get Involved
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 pt-8 border-t-2 border-black">
                <div>
                  <p className="text-4xl font-black text-bauhaus-blue">500+</p>
                  <p className="text-sm font-semibold uppercase tracking-wider text-gray-600">
                    Community Members
                  </p>
                </div>
                <div>
                  <p className="text-4xl font-black text-bauhaus-red">50+</p>
                  <p className="text-sm font-semibold uppercase tracking-wider text-gray-600">
                    Workshops Held
                  </p>
                </div>
                <div>
                  <p className="text-4xl font-black text-bauhaus-yellow">100%</p>
                  <p className="text-sm font-semibold uppercase tracking-wider text-gray-600">
                    Free to Attend
                  </p>
                </div>
              </div>
            </div>

            {/* Bauhaus Visual */}
            <div className="lg:col-span-5 hidden lg:block">
              <div className="relative aspect-square">
                {/* Geometric composition */}
                <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-bauhaus-blue" />
                <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-bauhaus-red" />
                <div className="absolute top-1/4 left-1/4 w-1/3 h-1/3 bg-bauhaus-yellow" />
                <div className="absolute bottom-1/4 right-1/4 w-24 h-24 rounded-full bg-black" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black uppercase mb-6">
                Our Mission
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                We believe everyone deserves access to AI education. Town Hall brings 
                free, accessible workshops and resources to Newark, helping our community 
                understand and benefit from artificial intelligence.
              </p>
              <Link href="/about">
                <Button variant="accent" size="lg">
                  Learn About Us
                  <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: Lightbulb, title: 'Education', desc: 'Free workshops for all skill levels' },
                { icon: Users, title: 'Community', desc: 'Connect with fellow learners' },
                { icon: Calendar, title: 'Events', desc: 'Regular meetups and showcases' },
                { icon: Heart, title: 'Support', desc: 'Mentorship and resources' },
              ].map((item) => (
                <div key={item.title} className="p-6 border border-gray-800">
                  <item.icon className="w-8 h-8 text-bauhaus-yellow mb-4" aria-hidden="true" />
                  <h3 className="font-bold uppercase tracking-wider mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-bauhaus-blue mb-2">
                What&apos;s Happening
              </p>
              <h2 className="text-4xl md:text-5xl font-black uppercase">
                Upcoming Events
              </h2>
            </div>
            <Link href="/events" className="group inline-flex items-center gap-2 text-bauhaus-blue font-semibold uppercase tracking-wider hover:text-bauhaus-red transition-colors">
              View All Events
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event) => (
              <EventCard key={event.slug} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-bauhaus-red mb-2">
                From Our Blog
              </p>
              <h2 className="text-4xl md:text-5xl font-black uppercase">
                Latest Articles
              </h2>
            </div>
            <Link href="/blog" className="group inline-flex items-center gap-2 text-bauhaus-blue font-semibold uppercase tracking-wider hover:text-bauhaus-red transition-colors">
              View All Posts
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-bauhaus-blue text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-black uppercase mb-6">
            Join Our Community
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Whether you&apos;re curious about AI or ready to dive deep, there&apos;s a place 
            for you at Town Hall. Join our Discord to connect with fellow learners.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://discord.gg/townhall"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-bauhaus-blue font-bold uppercase tracking-wider hover:bg-bauhaus-yellow hover:text-black transition-colors"
            >
              Join Discord
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </a>
            <Link href="/volunteer">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-bauhaus-blue">
                Become a Volunteer
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
