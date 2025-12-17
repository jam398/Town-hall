import { Metadata } from 'next';
import { Mail, MapPin, Clock } from 'lucide-react';
import { ContactForm } from '@/components/forms/ContactForm';
import { NewsletterForm } from '@/components/forms/NewsletterForm';
import { AccentBar } from '@/components/ui/AccentBar';
import { SITE_CONFIG, SOCIAL_LINKS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Town Hall Newark. Questions, partnerships, or just want to say hello? We\'d love to hear from you.',
};

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: SITE_CONFIG.email,
    href: `mailto:${SITE_CONFIG.email}`,
  },
  {
    icon: MapPin,
    label: 'Location',
    value: SITE_CONFIG.location,
    href: 'https://maps.google.com/?q=Newark,NJ',
  },
  {
    icon: Clock,
    label: 'Response Time',
    value: 'Within 48 hours',
    href: null,
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-swiss-white">
      {/* Hero - Swiss Modern */}
      <section className="py-24 lg:py-32 bg-swiss-white border-b border-swiss-border">
        <div className="max-w-swiss mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <AccentBar color="red" size="md" className="mb-6" />
              <h1 className="text-h1 font-bold text-swiss-black mb-6">
                Contact Us
              </h1>
              <p className="text-body-lg text-swiss-gray max-w-2xl">
                Have questions? Want to partner with us? Or just want to say hello? 
                We&apos;d love to hear from you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - Swiss Modern */}
      <section className="py-24 lg:py-32">
        <div className="max-w-swiss mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-16">
            {/* Contact Form */}
            <div className="lg:col-span-7">
              <AccentBar color="black" size="md" className="mb-6" />
              <h2 className="text-h2 font-bold text-swiss-black mb-8">
                Send a Message
              </h2>
              <div className="border border-swiss-border p-8">
                <ContactForm />
              </div>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-5">
              <AccentBar color="red" size="md" className="mb-6" />
              <h2 className="text-h2 font-bold text-swiss-black mb-8">
                Other Ways to Reach Us
              </h2>
              
              {/* Contact cards */}
              <div className="space-y-4 mb-8">
                {contactInfo.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-start gap-4 p-4 border border-swiss-border hover:border-swiss-black transition-colors"
                  >
                    <div className="w-12 h-12 bg-swiss-black flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-swiss-white" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-caption font-medium text-swiss-gray">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-body font-semibold text-swiss-black hover:text-swiss-red transition-colors"
                          target={item.href.startsWith('http') ? '_blank' : undefined}
                          rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-body font-semibold text-swiss-black">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="bg-swiss-light p-6">
                <h3 className="text-body font-semibold text-swiss-black mb-4">
                  Connect With Us
                </h3>
                <div className="flex flex-wrap gap-3">
                  {SOCIAL_LINKS.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-swiss-black text-swiss-white font-medium text-body-sm hover:bg-swiss-red transition-colors"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>

              {/* FAQ teaser */}
              <div className="mt-8 p-6 border-l-4 border-swiss-red bg-swiss-light">
                <h3 className="text-body font-semibold text-swiss-black mb-2">
                  Have a Quick Question?
                </h3>
                <p className="text-body-sm text-swiss-gray mb-4">
                  Join our Discord community for faster responses.
                </p>
                <a
                  href={SITE_CONFIG.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-body-sm font-medium text-swiss-black hover:text-swiss-red transition-colors"
                >
                  Join Discord →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section - Swiss Modern */}
      <section className="py-24 lg:py-32 bg-swiss-black">
        <div className="max-w-swiss mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <AccentBar color="red" size="md" className="mb-6" />
              <h2 className="text-h2 font-bold text-swiss-white mb-4">
                Stay in the Loop
              </h2>
              <p className="text-body-lg text-neutral-400">
                Subscribe to our newsletter for event announcements, new articles, and community updates.
              </p>
            </div>
            <div className="lg:col-span-6">
              <NewsletterForm variant="dark" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
