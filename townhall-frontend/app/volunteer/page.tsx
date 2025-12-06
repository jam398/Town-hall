import { Metadata } from 'next';
import { Heart, Users, Calendar, Lightbulb, CheckCircle } from 'lucide-react';
import { VolunteerForm } from '@/components/forms/VolunteerForm';

export const metadata: Metadata = {
  title: 'Volunteer',
  description: 'Join Town Hall Newark as a volunteer. Help us bring AI education to our community through workshops, events, and mentorship.',
};

const opportunities = [
  {
    icon: Lightbulb,
    title: 'Workshop Facilitator',
    description: 'Lead or assist with AI workshops. Share your knowledge and help others learn.',
    commitment: '2-4 hours/month',
  },
  {
    icon: Users,
    title: 'Event Support',
    description: 'Help set up, manage registration, and ensure events run smoothly.',
    commitment: '4-6 hours/month',
  },
  {
    icon: Calendar,
    title: 'Content Creator',
    description: 'Write blog posts, create tutorials, or produce video content.',
    commitment: 'Flexible',
  },
  {
    icon: Heart,
    title: 'Community Ambassador',
    description: 'Spread the word about Town Hall and help recruit new members.',
    commitment: '2-3 hours/month',
  },
];

const benefits = [
  'Gain experience in AI education and community building',
  'Network with tech professionals and community leaders',
  'Develop public speaking and facilitation skills',
  'Make a real impact in your community',
  'Flexible scheduling that works for you',
  'Letter of recommendation for dedicated volunteers',
];

export default function VolunteerPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-20 bg-bauhaus-blue text-white overflow-hidden">
        {/* Bauhaus decorations */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-bauhaus-yellow/20 rotate-45" />
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-bauhaus-red/20" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <p className="text-sm font-bold uppercase tracking-widest text-bauhaus-yellow mb-4">
            Make a Difference
          </p>
          <h1 className="text-5xl md:text-6xl font-black uppercase mb-6">
            Volunteer With Us
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            Help us bring AI education to Newark. No tech background required—just 
            a passion for community and learning.
          </p>
        </div>
      </section>

      {/* Opportunities */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black uppercase mb-4">
              Volunteer Opportunities
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose how you want to contribute. We have roles for every skill set and schedule.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {opportunities.map((opp) => (
              <div
                key={opp.title}
                className="border-2 border-black p-6 hover:bg-gray-50 transition-colors"
              >
                <opp.icon className="w-10 h-10 text-bauhaus-blue mb-4" aria-hidden="true" />
                <h3 className="font-bold text-lg uppercase tracking-wider mb-2">
                  {opp.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {opp.description}
                </p>
                <p className="text-xs font-semibold uppercase tracking-wider text-bauhaus-red">
                  {opp.commitment}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-black uppercase mb-6">
                Why Volunteer?
              </h2>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-bauhaus-blue flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Bauhaus visual */}
            <div className="relative aspect-square max-w-md mx-auto">
              <div className="absolute top-0 left-0 w-2/3 h-2/3 bg-bauhaus-red" />
              <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-bauhaus-yellow" />
              <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-bauhaus-blue" />
              <div className="absolute bottom-1/4 right-1/4 w-16 h-16 rounded-full bg-black" />
            </div>
          </div>
        </div>
      </section>

      {/* Sign Up Form */}
      <section className="py-16" id="signup">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black uppercase mb-4">
              Sign Up to Volunteer
            </h2>
            <p className="text-gray-600">
              Fill out the form below and we&apos;ll be in touch within a week.
            </p>
          </div>

          <div className="border-2 border-black p-8">
            <VolunteerForm />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black uppercase mb-8 text-center">
            Common Questions
          </h2>
          <div className="space-y-6">
            {[
              {
                q: 'Do I need technical experience?',
                a: 'Not at all! We have roles for all skill levels. If you can use a smartphone, you can help.',
              },
              {
                q: 'How much time do I need to commit?',
                a: 'It varies by role, but most volunteers contribute 2-6 hours per month. We work around your schedule.',
              },
              {
                q: 'Is there training provided?',
                a: 'Yes! All volunteers receive orientation and ongoing support. We set you up for success.',
              },
              {
                q: 'Can I volunteer remotely?',
                a: 'Some roles like content creation can be done remotely. Event support requires in-person attendance.',
              },
            ].map((faq, index) => (
              <div key={index} className="border-b border-gray-800 pb-6">
                <h3 className="font-bold text-lg mb-2">{faq.q}</h3>
                <p className="text-gray-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
