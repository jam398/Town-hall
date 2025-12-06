import { Metadata } from 'next';
import { Mail, MapPin, Phone, Clock } from 'lucide-react';
import { ContactForm } from '@/components/forms/ContactForm';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Town Hall Newark. Questions, partnerships, or just want to say hello? We\'d love to hear from you.',
};

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@townhallnewark.org',
    href: 'mailto:hello@townhallnewark.org',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Newark, New Jersey',
    href: 'https://maps.google.com/?q=Newark,NJ',
  },
  {
    icon: Clock,
    label: 'Response Time',
    value: 'Within 48 hours',
    href: null,
  },
];

const socialLinks = [
  { name: 'Discord', href: 'https://discord.gg/townhall' },
  { name: 'Twitter', href: 'https://twitter.com/townhallnewark' },
  { name: 'LinkedIn', href: 'https://linkedin.com/company/townhallnewark' },
  { name: 'YouTube', href: 'https://youtube.com/@townhallnewark' },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-20 bg-black text-white overflow-hidden">
        {/* Bauhaus decorations */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-bauhaus-blue" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-bauhaus-red" />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-bauhaus-yellow rotate-45" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <p className="text-sm font-bold uppercase tracking-widest text-bauhaus-yellow mb-4">
            Get in Touch
          </p>
          <h1 className="text-5xl md:text-6xl font-black uppercase mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Have questions? Want to partner with us? Or just want to say hello? 
            We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-black uppercase mb-6">
                Send a Message
              </h2>
              <div className="border-2 border-black p-8">
                <ContactForm />
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-black uppercase mb-6">
                Other Ways to Reach Us
              </h2>
              
              {/* Contact cards */}
              <div className="space-y-4 mb-8">
                {contactInfo.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-start gap-4 p-4 border border-gray-200 hover:border-bauhaus-blue transition-colors"
                  >
                    <div className="w-12 h-12 bg-bauhaus-blue flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-white" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-lg font-semibold text-gray-900 hover:text-bauhaus-blue transition-colors"
                          target={item.href.startsWith('http') ? '_blank' : undefined}
                          rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-lg font-semibold text-gray-900">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="bg-gray-50 p-6">
                <h3 className="font-bold uppercase tracking-wider mb-4">
                  Connect With Us
                </h3>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-black text-white font-semibold text-sm uppercase tracking-wider hover:bg-bauhaus-blue transition-colors"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>

              {/* FAQ teaser */}
              <div className="mt-8 p-6 border-l-4 border-bauhaus-yellow bg-bauhaus-yellow/10">
                <h3 className="font-bold uppercase tracking-wider mb-2">
                  Have a Quick Question?
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Check our FAQ section or join our Discord community for faster responses.
                </p>
                <a
                  href="https://discord.gg/townhall"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold uppercase tracking-wider text-bauhaus-blue hover:text-bauhaus-red transition-colors"
                >
                  Join Discord →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-bauhaus-blue text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black uppercase mb-4">
            Stay in the Loop
          </h2>
          <p className="text-blue-100 mb-8">
            Subscribe to our newsletter for event announcements, new articles, and community updates.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 text-black border-2 border-white focus:outline-none focus:border-bauhaus-yellow"
              aria-label="Email address"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-bauhaus-yellow text-black font-bold uppercase tracking-wider hover:bg-yellow-400 transition-colors"
            >
              Subscribe
            </button>
          </form>
          <p className="text-xs text-blue-200 mt-4">
            We respect your privacy. Unsubscribe anytime.
          </p>
        </div>
      </section>
    </div>
  );
}
