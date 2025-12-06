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

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        {/* Bauhaus background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 w-1/3 h-full bg-bauhaus-blue" />
          <div className="absolute top-0 right-0 w-2/3 h-full bg-white" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white lg:pr-12">
              <p className="text-sm font-bold uppercase tracking-widest text-bauhaus-yellow mb-4">
                Our Story
              </p>
              <h1 className="text-5xl md:text-6xl font-black uppercase mb-6">
                About Town Hall
              </h1>
            </div>
            <div className="lg:pl-12">
              <p className="text-xl text-gray-700 leading-relaxed">
                Town Hall is Newark&apos;s nonprofit community hub for AI education. 
                We believe everyone deserves to understand and benefit from artificial 
                intelligence—not just tech insiders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black uppercase mb-6">
                Our Mission
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed mb-6">
                To democratize AI education in Newark by providing free, accessible 
                workshops and resources that empower our community to understand, 
                use, and shape artificial intelligence technology.
              </p>
              <p className="text-gray-400">
                We started Town Hall because we saw a gap: AI was transforming 
                everything, but most educational resources were either too technical, 
                too expensive, or not designed for our community. We&apos;re changing that.
              </p>
            </div>
            
            {/* Bauhaus visual */}
            <div className="relative aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3/4 h-3/4 rounded-full bg-bauhaus-red" />
              </div>
              <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-bauhaus-yellow" />
              <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-bauhaus-blue" />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black uppercase mb-4">
              Our Values
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do at Town Hall.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="text-center p-6 border-2 border-black hover:bg-gray-50 transition-colors"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-bauhaus-blue flex items-center justify-center">
                  <value.icon className="w-8 h-8 text-white" aria-hidden="true" />
                </div>
                <h3 className="font-bold text-lg uppercase tracking-wider mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black uppercase mb-4">
              Our Team
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Meet the people behind Town Hall. We&apos;re neighbors, educators, and 
              tech enthusiasts united by a common goal.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member.name} className="bg-white border-2 border-black p-6">
                {/* Avatar placeholder */}
                <div className="w-20 h-20 mx-auto mb-4 bg-bauhaus-red flex items-center justify-center text-white font-bold text-2xl">
                  {member.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <h3 className="font-bold text-lg text-center mb-1">
                  {member.name}
                </h3>
                <p className="text-sm text-bauhaus-blue text-center font-semibold uppercase tracking-wider mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 text-sm text-center">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black uppercase mb-4">
              Our Journey
            </h2>
            <p className="text-gray-600">
              From a small workshop to a thriving community.
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-black" aria-hidden="true" />

            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="relative flex items-start gap-6 pl-20">
                  {/* Year marker */}
                  <div className="absolute left-0 w-16 h-16 bg-bauhaus-yellow flex items-center justify-center font-black text-sm">
                    {milestone.year}
                  </div>
                  {/* Content */}
                  <div className="flex-1 pt-4">
                    <p className="text-gray-700">{milestone.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-bauhaus-red text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black uppercase mb-6">
            Join Our Community
          </h2>
          <p className="text-xl text-red-100 mb-8">
            Whether you want to learn, teach, or just connect with like-minded 
            neighbors, there&apos;s a place for you at Town Hall.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/events">
              <Button variant="accent" size="lg">
                Upcoming Events
                <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
              </Button>
            </Link>
            <Link href="/volunteer">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-bauhaus-red">
                Become a Volunteer
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
