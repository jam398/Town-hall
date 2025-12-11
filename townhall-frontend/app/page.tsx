import Link from 'next/link';
import { ArrowRight, Calendar, Users, Lightbulb, Heart } from 'lucide-react';
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
      {/* Hero Section - Swiss Modern Style */}
      <section className="bg-swiss-white">
        <div className="max-w-swiss mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 min-h-[85vh]">
            {/* Left Column - Content */}
            <div className="lg:col-span-7 flex flex-col justify-center py-16 lg:py-24 lg:pr-16">
              <p className="text-swiss-red text-sm font-medium tracking-wide mb-6">
                Newark&apos;s AI Community Hub
              </p>
              
              <h1 className="text-display text-swiss-black mb-8">
                Learn AI.
                <br />
                Build Together.
              </h1>
              
              <p className="text-body-lg text-swiss-gray max-w-lg mb-10 leading-relaxed">
                Town Hall is Newark&apos;s nonprofit community space for AI education. 
                Free workshops, events, and resources for everyone—no tech background required.
              </p>

              <div className="flex flex-wrap gap-4 mb-16">
                <Link href="/events">
                  <Button size="lg" variant="secondary">
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

              {/* Stats - Swiss grid layout */}
              <div className="grid grid-cols-3 gap-8 pt-10 border-t border-swiss-border">
                <div>
                  <p className="text-h1 font-bold text-swiss-black">500+</p>
                  <p className="text-body-sm text-swiss-gray mt-1">
                    Community Members
                  </p>
                </div>
                <div>
                  <p className="text-h1 font-bold text-swiss-black">50+</p>
                  <p className="text-body-sm text-swiss-gray mt-1">
                    Workshops Held
                  </p>
                </div>
                <div>
                  <p className="text-h1 font-bold text-swiss-black">100%</p>
                  <p className="text-body-sm text-swiss-gray mt-1">
                    Free to Attend
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Swiss Modern Visual Block */}
            <div className="lg:col-span-5 bg-swiss-black hidden lg:flex items-center justify-center">
              <div className="text-swiss-white p-12 text-center">
                <div className="w-24 h-1 bg-swiss-red mx-auto mb-8" />
                <p className="text-h2 font-semibold leading-tight">
                  AI Education
                  <br />
                  For Everyone
                </p>
                <div className="w-24 h-1 bg-swiss-red mx-auto mt-8" />
              </div>
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

      {/* CTA Section - Swiss Modern */}
      <section className="py-24 lg:py-32 bg-swiss-black">
        <div className="max-w-swiss mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="w-12 h-1 bg-swiss-red mb-6" />
              <h2 className="text-h1 font-bold text-swiss-white mb-6">
                Join Our Community
              </h2>
              <p className="text-body-lg text-neutral-400 max-w-lg">
                Whether you&apos;re curious about AI or ready to dive deep, there&apos;s a place 
                for you at Town Hall. Join our Discord to connect with fellow learners.
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://discord.gg/townhall"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-swiss-red text-swiss-white font-medium hover:bg-red-600 transition-colors"
                >
                  Join Discord
                  <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </a>
                <Link href="/volunteer">
                  <Button variant="outline" size="lg" className="border-swiss-white text-swiss-white hover:bg-swiss-white hover:text-swiss-black w-full sm:w-auto">
                    Become a Volunteer
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
