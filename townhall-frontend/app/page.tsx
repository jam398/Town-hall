import Link from 'next/link';
import { ArrowRight, Calendar, Users, Lightbulb, Heart, Play } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { EventCard, Event } from '@/components/ui/EventCard';
import { BlogCard, BlogPost } from '@/components/ui/BlogCard';
import { events as eventsData, blogPosts as blogPostsData } from '@/lib/data';

// Get first 3 events and posts for homepage
const upcomingEvents: Event[] = eventsData.slice(0, 3).map(event => ({
  slug: event.slug,
  title: event.title,
  description: event.description,
  date: event.date,
  time: event.time,
  location: event.location,
  capacity: event.capacity,
  registered: event.registered,
  tags: event.tags,
}));

const latestPosts: BlogPost[] = blogPostsData.slice(0, 3).map(post => ({
  slug: post.slug,
  title: post.title,
  excerpt: post.excerpt,
  date: post.date,
  author: post.author,
  tags: post.tags,
  readTime: post.readTime,
}));

export default function HomePage() {
  return (
    <>
      {/* Hero Section - Swiss Modern Style with Visual Enhancements */}
      <section className="bg-swiss-white relative overflow-hidden">
        {/* Decorative grid lines */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-px h-full bg-swiss-border/50 hidden lg:block" />
          <div className="absolute top-0 left-2/4 w-px h-full bg-swiss-border/50 hidden lg:block" />
          <div className="absolute top-0 left-3/4 w-px h-full bg-swiss-border/50 hidden lg:block" />
        </div>
        
        <div className="max-w-swiss mx-auto px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-12 min-h-[90vh]">
            {/* Left Column - Content */}
            <div className="lg:col-span-7 flex flex-col justify-center py-16 lg:py-24 lg:pr-16">
              <div className="w-16 h-1 bg-swiss-red mb-8" />
              <p className="text-swiss-red text-body font-medium tracking-wide mb-6">
                Newark&apos;s AI Community Hub
              </p>
              
              <h1 className="text-[4rem] lg:text-[5.5rem] font-bold text-swiss-black leading-[0.95] mb-8">
                Learn AI.
                <br />
                <span className="text-swiss-gray">Build Together.</span>
              </h1>
              
              <p className="text-body-lg text-swiss-gray max-w-lg mb-12 leading-relaxed">
                Town Hall is Newark&apos;s nonprofit community space for AI education. 
                Free workshops, events, and resources for everyone—no tech background required.
              </p>

              <div className="flex flex-wrap gap-4 mb-16">
                <Link href="/events">
                  <Button size="lg" variant="secondary" className="group">
                    Upcoming Events
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </Button>
                </Link>
                <Link href="/volunteer">
                  <Button size="lg" variant="outline">
                    Get Involved
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Column - Swiss Modern Visual Block with Animation */}
            <div className="lg:col-span-5 bg-swiss-black hidden lg:flex flex-col items-center justify-center relative">
              {/* Decorative corner elements */}
              <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-neutral-700" />
              <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-neutral-700" />
              
              <div className="text-swiss-white p-12 text-center relative">
                <div className="w-32 h-1 bg-swiss-red mx-auto mb-10" />
                <p className="text-[2.5rem] font-bold leading-tight mb-4">
                  AI Education
                </p>
                <p className="text-h3 text-neutral-400 font-medium">
                  For Everyone
                </p>
                <div className="w-32 h-1 bg-swiss-red mx-auto mt-10" />
                
                {/* Decorative large number */}
                <div className="absolute -bottom-8 -right-4 text-[200px] font-bold text-white/[0.03] leading-none select-none">
                  AI
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats Bar - Full width */}
        <div className="border-t border-swiss-border">
          <div className="max-w-swiss mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-swiss-border">
              {[
                { value: '500+', label: 'Community Members' },
                { value: '50+', label: 'Workshops Held' },
                { value: '100%', label: 'Free to Attend' },
                { value: 'Weekly', label: 'New Events' },
              ].map((stat, index) => (
                <div key={index} className="bg-swiss-white p-8 lg:p-10 text-center lg:text-left">
                  <p className="text-h1 lg:text-display font-bold text-swiss-black">{stat.value}</p>
                  <p className="text-body-sm text-swiss-gray mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section - Swiss Modern */}
      <section className="py-24 lg:py-32 bg-swiss-light">
        <div className="max-w-swiss mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            {/* Left - Title */}
            <div className="lg:col-span-4">
              <div className="w-12 h-1 bg-swiss-red mb-6" />
              <h2 className="text-h1 font-bold text-swiss-black">
                Our Mission
              </h2>
            </div>
            
            {/* Right - Content */}
            <div className="lg:col-span-8">
              <p className="text-h3 text-swiss-black leading-relaxed mb-12">
                We believe everyone deserves access to AI education. Town Hall brings 
                free, accessible workshops and resources to Newark, helping our community 
                understand and benefit from artificial intelligence.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-8 mb-12">
                {[
                  { icon: Lightbulb, title: 'Education', desc: 'Free workshops for all skill levels' },
                  { icon: Users, title: 'Community', desc: 'Connect with fellow learners' },
                  { icon: Calendar, title: 'Events', desc: 'Regular meetups and showcases' },
                  { icon: Heart, title: 'Support', desc: 'Mentorship and resources' },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-swiss-black flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-swiss-white" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-body font-semibold text-swiss-black mb-1">{item.title}</h3>
                      <p className="text-body-sm text-swiss-gray">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Link href="/about">
                <Button variant="primary" size="lg">
                  Learn About Us
                  <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section - Swiss Modern */}
      <section className="py-24 lg:py-32 bg-swiss-white">
        <div className="max-w-swiss mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 mb-16">
            <div className="lg:col-span-8">
              <div className="w-12 h-1 bg-swiss-red mb-6" />
              <h2 className="text-h1 font-bold text-swiss-black">
                Upcoming Events
              </h2>
            </div>
            <div className="lg:col-span-4 flex lg:justify-end lg:items-end">
              <Link 
                href="/events" 
                className="group inline-flex items-center gap-2 text-swiss-black font-medium hover:text-swiss-red transition-colors"
              >
                View All Events
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <EventCard key={event.slug} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section - Swiss Modern */}
      <section className="py-24 lg:py-32 bg-swiss-light">
        <div className="max-w-swiss mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 mb-16">
            <div className="lg:col-span-8">
              <div className="w-12 h-1 bg-swiss-black mb-6" />
              <h2 className="text-h1 font-bold text-swiss-black">
                Latest Articles
              </h2>
            </div>
            <div className="lg:col-span-4 flex lg:justify-end lg:items-end">
              <Link 
                href="/blog" 
                className="group inline-flex items-center gap-2 text-swiss-black font-medium hover:text-swiss-red transition-colors"
              >
                View All Posts
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Swiss Modern with Visual Enhancement */}
      <section className="relative py-24 lg:py-32 bg-swiss-black overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-neutral-800/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-96 h-96 border border-neutral-800/50" style={{ transform: 'translate(-50%, 50%)' }} />
        <div className="absolute top-0 right-1/4 w-px h-full bg-neutral-800/30 hidden lg:block" />
        
        <div className="max-w-swiss mx-auto px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="w-16 h-1 bg-swiss-red mb-8" />
              <h2 className="text-h1 lg:text-display font-bold text-swiss-white mb-6">
                Join Our Community
              </h2>
              <p className="text-body-lg text-neutral-400 max-w-lg mb-8">
                Whether you&apos;re curious about AI or ready to dive deep, there&apos;s a place 
                for you at Town Hall. Join our Discord to connect with fellow learners.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://discord.gg/townhall"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-swiss-red text-swiss-white font-medium hover:bg-red-600 transition-colors group"
                >
                  Join Discord
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </a>
                <Link href="/volunteer">
                  <Button variant="outline" size="lg" className="border-swiss-white text-swiss-white hover:bg-swiss-white hover:text-swiss-black w-full sm:w-auto">
                    Become a Volunteer
                  </Button>
                </Link>
              </div>
            </div>
            <div className="lg:col-span-5 hidden lg:flex justify-end">
              {/* Decorative element */}
              <div className="relative">
                <div className="w-48 h-48 border-2 border-neutral-700 flex items-center justify-center">
                  <Users className="w-20 h-20 text-neutral-700" strokeWidth={1} />
                </div>
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-swiss-red" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
