import Link from 'next/link';
import { Mail, MapPin } from 'lucide-react';

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
    <footer className="bg-swiss-white border-t border-swiss-border mt-auto">
      <div className="max-w-swiss mx-auto px-6 lg:px-8 py-16 lg:py-20">
        {/* Main Footer Grid - Swiss Modern asymmetric layout */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3 mb-6">
              <div className="w-2 h-8 bg-swiss-red" aria-hidden="true" />
              <span className="text-xl font-bold text-swiss-black tracking-tight">
                Town Hall
              </span>
            </Link>
            <p className="text-swiss-gray text-body leading-relaxed mb-8 max-w-sm">
              Newark&apos;s nonprofit community hub for AI education, workshops, and events. 
              Empowering our community through technology.
            </p>
            <div className="space-y-3 text-body-sm text-swiss-gray">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 flex-shrink-0 text-swiss-black" aria-hidden="true" />
                <span>Newark, New Jersey</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 flex-shrink-0 text-swiss-black" aria-hidden="true" />
                <a href="mailto:hello@townhallnewark.org" className="hover:text-swiss-red transition-colors">
                  hello@townhallnewark.org
                </a>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-8">
            <div className="grid sm:grid-cols-3 gap-8">
              {/* Explore */}
              <div>
                <h3 className="text-body-sm font-semibold text-swiss-black mb-4">
                  Explore
                </h3>
                <ul className="space-y-3">
                  {footerLinks.explore.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-body-sm text-swiss-gray hover:text-swiss-red transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Get Involved */}
              <div>
                <h3 className="text-body-sm font-semibold text-swiss-black mb-4">
                  Get Involved
                </h3>
                <ul className="space-y-3">
                  {footerLinks.getInvolved.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-body-sm text-swiss-gray hover:text-swiss-red transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Connect */}
              <div>
                <h3 className="text-body-sm font-semibold text-swiss-black mb-4">
                  Connect
                </h3>
                <ul className="space-y-3">
                  {footerLinks.connect.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-body-sm text-swiss-gray hover:text-swiss-red transition-colors"
                      >
                        {link.label}
                        <span className="sr-only"> (opens in new tab)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar - Swiss Modern minimal */}
        <div className="mt-16 pt-8 border-t border-swiss-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-body-sm text-swiss-gray">
            © {new Date().getFullYear()} Town Hall Newark
          </p>
          <div className="flex gap-8 text-body-sm text-swiss-gray">
            <Link href="/privacy" className="hover:text-swiss-red transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-swiss-red transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
