import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';

const footerLinks = {
  explore: [
    { href: '/events', label: 'Events' },
    { href: '/blog', label: 'Blog' },
    { href: '/vlogs', label: 'Vlogs' },
  ],
  getInvolved: [
    { href: '/volunteer', label: 'Volunteer' },
    { href: '/contact', label: 'Contact Us' },
    { href: '/about', label: 'About Us' },
  ],
  connect: [
    { href: 'https://discord.gg/townhall', label: 'Discord', external: true },
    { href: 'https://twitter.com/townhallnewark', label: 'Twitter', external: true },
    { href: 'https://linkedin.com/company/townhallnewark', label: 'LinkedIn', external: true },
  ],
};

export function Footer() {
  return (
    <footer className="bg-black text-white mt-auto">
      {/* Bauhaus color bar */}
      <div className="flex h-2" aria-hidden="true">
        <div className="flex-1 bg-bauhaus-blue" />
        <div className="flex-1 bg-bauhaus-red" />
        <div className="flex-1 bg-bauhaus-yellow" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <div className="flex gap-0.5" aria-hidden="true">
                <div className="w-4 h-4 bg-bauhaus-blue" />
                <div className="w-4 h-4 bg-bauhaus-red" />
                <div className="w-4 h-4 bg-bauhaus-yellow" />
              </div>
              <span className="text-xl font-black uppercase tracking-tight">
                Town Hall
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Newark&apos;s nonprofit community hub for AI education, workshops, and events. 
              Empowering our community through technology.
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                <span>Newark, New Jersey</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                <a href="mailto:hello@townhallnewark.org" className="hover:text-white transition-colors">
                  hello@townhallnewark.org
                </a>
              </div>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4">
              Explore
            </h3>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4">
              Get Involved
            </h3>
            <ul className="space-y-3">
              {footerLinks.getInvolved.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4">
              Connect
            </h3>
            <ul className="space-y-3">
              {footerLinks.connect.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                    <span className="sr-only"> (opens in new tab)</span>
                  </a>
                </li>
              ))}
            </ul>

            {/* Newsletter signup teaser */}
            <div className="mt-8 p-4 bg-gray-900 border-l-4 border-bauhaus-yellow">
              <p className="text-sm font-semibold mb-2">Stay Updated</p>
              <p className="text-xs text-gray-400 mb-3">
                Get the latest events and news delivered to your inbox.
              </p>
              <Link
                href="/contact"
                className="inline-block text-xs font-semibold uppercase tracking-wider text-bauhaus-yellow hover:text-yellow-300 transition-colors"
              >
                Subscribe →
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Town Hall Newark. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
