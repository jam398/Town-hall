import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Target, Eye, Heart, Users } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about Town Hall Newark - our mission, values, and the team behind Newark\'s AI community hub.',
};

const values = [
  {
    icon: Target,
    title: 'Accessibility',
    description: 'AI education should be free and available to everyone, regardless of background or experience.',
  },
  {
    icon: Users,
    title: 'Community',
    description: 'We learn better together. Our strength comes from diverse perspectives and shared experiences.',
  },
  {
    icon: Eye,
    title: 'Transparency',
    description: 'We demystify AI, explaining both its potential and its limitations honestly.',
  },
  {
    icon: Heart,
    title: 'Empowerment',
    description: 'Our goal is to give people the knowledge and confidence to use AI on their own terms.',
  },
];

const team = [
  {
    name: 'Marcus Johnson',
    role: 'Founder & Director',
    bio: 'Newark native and tech educator passionate about bringing AI literacy to underserved communities.',
  },
  {
    name: 'Dr. Sarah Chen',
    role: 'Education Lead',
    bio: 'Former university professor specializing in making complex technology accessible to all learners.',
  },
  {
    name: 'James Rodriguez',
    role: 'Community Manager',
    bio: 'Local business owner and community organizer connecting Town Hall with Newark neighborhoods.',
  },
  {
    name: 'Aisha Williams',
    role: 'Programs Coordinator',
    bio: 'Event planning expert ensuring every workshop runs smoothly and every attendee feels welcome.',
  },
];

const milestones = [
  { year: '2023', event: 'Town Hall founded with first workshop of 15 attendees' },
  { year: '2023', event: 'Launched Discord community, reaching 100 members' },
  { year: '2024', event: 'Hosted 50+ workshops serving 500+ community members' },
  { year: '2024', event: 'Partnered with Newark Public Library system' },
  { year: '2024', event: 'Launched volunteer program with 25+ active volunteers' },
  { year: '2025', event: 'Expanding to multiple Newark locations' },
];

const partners = [
  {
    name: 'Newark Public Library',
    description: 'Providing workshop spaces and community outreach',
    type: 'Community Partner',
  },
  {
    name: 'Rutgers University-Newark',
    description: 'Academic partnership for curriculum development',
    type: 'Education Partner',
  },
  {
    name: 'Newark Innovation Center',
    description: 'Technology resources and event hosting',
    type: 'Technology Partner',
  },
  {
    name: 'Essex County Community Foundation',
    description: 'Funding support for free community programs',
    type: 'Funding Partner',
  },
  {
    name: 'New Jersey Tech Council',
    description: 'Industry connections and mentorship programs',
    type: 'Industry Partner',
  },
  {
    name: 'Newark Arts Council',
    description: 'Creative AI workshops and cultural programming',
    type: 'Arts Partner',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-swiss-white">
      {/* Hero - Swiss Modern */}
      <section className="py-24 lg:py-32 bg-swiss-white border-b border-swiss-border">
        <div className="max-w-swiss mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-5">
              <div className="w-12 h-1 bg-swiss-red mb-6" />
              <h1 className="text-h1 font-bold text-swiss-black mb-6">
                About Town Hall
              </h1>
            </div>
            <div className="lg:col-span-7">
              <p className="text-h3 text-swiss-black leading-relaxed">
                Town Hall is Newark&apos;s nonprofit community hub for AI education. 
                We believe everyone deserves to understand and benefit from artificial 
                intelligence—not just tech insiders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission - Swiss Modern */}
      <section className="py-24 lg:py-32 bg-swiss-black">
        <div className="max-w-swiss mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5">
              <div className="w-12 h-1 bg-swiss-red mb-6" />
              <h2 className="text-h1 font-bold text-swiss-white">
                Our Mission
              </h2>
            </div>
            <div className="lg:col-span-7">
              <p className="text-h3 text-swiss-white leading-relaxed mb-8">
                To democratize AI education in Newark by providing free, accessible 
                workshops and resources that empower our community to understand, 
                use, and shape artificial intelligence technology.
              </p>
              <p className="text-body-lg text-neutral-400">
                We started Town Hall because we saw a gap: AI was transforming 
                everything, but most educational resources were either too technical, 
                too expensive, or not designed for our community. We&apos;re changing that.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values - Swiss Modern */}
      <section className="py-24 lg:py-32">
        <div className="max-w-swiss mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-16 mb-16">
            <div className="lg:col-span-4">
              <div className="w-12 h-1 bg-swiss-black mb-6" />
              <h2 className="text-h2 font-bold text-swiss-black">
                Our Values
              </h2>
            </div>
            <div className="lg:col-span-8">
              <p className="text-body-lg text-swiss-gray">
                These principles guide everything we do at Town Hall.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-swiss-white border border-swiss-border p-6 hover:border-swiss-black transition-colors"
              >
                <div className="w-12 h-12 mb-4 bg-swiss-black flex items-center justify-center">
                  <value.icon className="w-6 h-6 text-swiss-white" aria-hidden="true" />
                </div>
                <h3 className="text-body font-semibold text-swiss-black mb-2">
                  {value.title}
                </h3>
                <p className="text-body-sm text-swiss-gray">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team - Swiss Modern */}
      <section className="py-24 lg:py-32 bg-swiss-light">
        <div className="max-w-swiss mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-16 mb-16">
            <div className="lg:col-span-4">
              <div className="w-12 h-1 bg-swiss-red mb-6" />
              <h2 className="text-h2 font-bold text-swiss-black">
                Our Team
              </h2>
            </div>
            <div className="lg:col-span-8">
              <p className="text-body-lg text-swiss-gray">
                Meet the people behind Town Hall. We&apos;re neighbors, educators, and 
                tech enthusiasts united by a common goal.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div key={member.name} className="bg-swiss-white border border-swiss-border p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-swiss-black flex items-center justify-center text-swiss-white font-semibold text-lg">
                  {member.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <h3 className="text-body font-semibold text-swiss-black text-center mb-1">
                  {member.name}
                </h3>
                <p className="text-caption text-swiss-red text-center font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-body-sm text-swiss-gray text-center">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline - Swiss Modern */}
      <section className="py-24 lg:py-32">
        <div className="max-w-swiss mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <div className="w-12 h-1 bg-swiss-red mb-6" />
              <h2 className="text-h2 font-bold text-swiss-black mb-4">
                Our Journey
              </h2>
              <p className="text-body text-swiss-gray">
                From a small workshop to a thriving community.
              </p>
            </div>
            <div className="lg:col-span-8">
              <div className="space-y-6">
                {milestones.map((milestone, index) => (
                  <div key={index} className="flex gap-6 items-start border-b border-swiss-border pb-6">
                    <div className="w-16 h-10 bg-swiss-black flex items-center justify-center text-swiss-white font-semibold text-caption flex-shrink-0">
                      {milestone.year}
                    </div>
                    <p className="text-body text-swiss-black pt-2">{milestone.event}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners - Swiss Modern */}
      <section className="py-24 lg:py-32 bg-swiss-light">
        <div className="max-w-swiss mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-16 mb-16">
            <div className="lg:col-span-4">
              <div className="w-12 h-1 bg-swiss-black mb-6" />
              <h2 className="text-h2 font-bold text-swiss-black">
                Our Partners
              </h2>
            </div>
            <div className="lg:col-span-8">
              <p className="text-body-lg text-swiss-gray">
                We&apos;re grateful for the organizations that support our mission 
                to bring AI education to Newark.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="bg-swiss-white border border-swiss-border p-6 hover:border-swiss-black transition-colors"
              >
                <p className="text-caption font-medium text-swiss-red mb-2">
                  {partner.type}
                </p>
                <h3 className="text-body font-semibold text-swiss-black mb-2">{partner.name}</h3>
                <p className="text-body-sm text-swiss-gray">{partner.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-body text-swiss-gray mb-6">
              Interested in partnering with Town Hall?
            </p>
            <Link href="/contact">
              <Button variant="outline">
                Become a Partner
                <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA - Swiss Modern */}
      <section className="py-24 lg:py-32 bg-swiss-black">
        <div className="max-w-swiss mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="w-12 h-1 bg-swiss-red mb-6" />
              <h2 className="text-h1 font-bold text-swiss-white mb-6">
                Join Our Community
              </h2>
              <p className="text-body-lg text-neutral-400 max-w-lg">
                Whether you want to learn, teach, or just connect with like-minded 
                neighbors, there&apos;s a place for you at Town Hall.
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/events">
                  <Button variant="secondary" size="lg">
                    Upcoming Events
                    <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
                  </Button>
                </Link>
                <Link href="/volunteer">
                  <Button variant="outline" size="lg" className="border-swiss-white text-swiss-white hover:bg-swiss-white hover:text-swiss-black">
                    Become a Volunteer
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
