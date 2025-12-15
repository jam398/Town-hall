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
    <div className="min-h-screen bg-swiss-white">
      {/* Hero - Swiss Modern */}
      <section className="py-24 lg:py-32 bg-swiss-white border-b border-swiss-border">
        <div className="max-w-swiss mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <div className="w-12 h-1 bg-swiss-red mb-6" />
              <h1 className="text-h1 font-bold text-swiss-black mb-6">
                Volunteer With Us
              </h1>
              <p className="text-body-lg text-swiss-gray max-w-2xl">
                Help us bring AI education to Newark. No tech background required—just 
                a passion for community and learning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Opportunities - Swiss Modern */}
      <section className="py-24 lg:py-32">
        <div className="max-w-swiss mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-16 mb-16">
            <div className="lg:col-span-4">
              <div className="w-12 h-1 bg-swiss-black mb-6" />
              <h2 className="text-h2 font-bold text-swiss-black">
                Volunteer Opportunities
              </h2>
            </div>
            <div className="lg:col-span-8">
              <p className="text-body-lg text-swiss-gray">
                Choose how you want to contribute. We have roles for every skill set and schedule.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {opportunities.map((opp) => (
              <div
                key={opp.title}
                className="bg-swiss-white border border-swiss-border p-6 hover:border-swiss-black transition-colors"
              >
                <div className="w-12 h-12 bg-swiss-black flex items-center justify-center mb-4">
                  <opp.icon className="w-6 h-6 text-swiss-white" aria-hidden="true" />
                </div>
                <h3 className="text-body font-semibold text-swiss-black mb-2">
                  {opp.title}
                </h3>
                <p className="text-body-sm text-swiss-gray mb-4">
                  {opp.description}
                </p>
                <p className="text-caption font-medium text-swiss-red">
                  {opp.commitment}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits - Swiss Modern */}
      <section className="py-24 lg:py-32 bg-swiss-light">
        <div className="max-w-swiss mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5">
              <div className="w-12 h-1 bg-swiss-red mb-6" />
              <h2 className="text-h2 font-bold text-swiss-black mb-8">
                Why Volunteer?
              </h2>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-swiss-red flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-body text-swiss-black">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Swiss Modern visual block */}
            <div className="lg:col-span-7 bg-swiss-black p-12 lg:p-16">
              <div className="w-16 h-1 bg-swiss-red mb-8" />
              <p className="text-h2 font-semibold text-swiss-white leading-tight">
                Join a community of passionate volunteers making a real difference in Newark.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sign Up Form - Swiss Modern */}
      <section className="py-24 lg:py-32" id="signup">
        <div className="max-w-swiss mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <div className="w-12 h-1 bg-swiss-red mb-6" />
              <h2 className="text-h2 font-bold text-swiss-black mb-4">
                Sign Up to Volunteer
              </h2>
              <p className="text-body text-swiss-gray">
                Fill out the form and we&apos;ll be in touch within a week.
              </p>
            </div>
            <div className="lg:col-span-8">
              <div className="border border-swiss-border p-8">
                <VolunteerForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ - Swiss Modern */}
      <section className="py-24 lg:py-32 bg-swiss-black">
        <div className="max-w-swiss mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <div className="w-12 h-1 bg-swiss-red mb-6" />
              <h2 className="text-h2 font-bold text-swiss-white">
                Common Questions
              </h2>
            </div>
            <div className="lg:col-span-8 space-y-8">
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
                <div key={index} className="border-b border-neutral-700 pb-6">
                  <h3 className="text-body font-semibold text-swiss-white mb-2">{faq.q}</h3>
                  <p className="text-body-sm text-neutral-400">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
