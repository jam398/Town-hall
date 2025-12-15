'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/events', label: 'Events' },
  { href: '/blog', label: 'Blog' },
  { href: '/vlogs', label: 'Vlogs' },
  { href: '/volunteer', label: 'Volunteer' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-swiss-white border-b border-swiss-border">
      <div className="max-w-swiss mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo - Swiss Modern */}
          <Link 
            href="/" 
            className="flex items-center gap-3 group"
            aria-label="Town Hall - Home"
          >
            <div className="w-2 h-8 bg-swiss-red" aria-hidden="true" />
            <span className="text-xl font-bold text-swiss-black tracking-tight">
              Town Hall
            </span>
          </Link>

          {/* Desktop Navigation - Swiss Modern */}
          <nav className="hidden md:flex items-center gap-10" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-swiss-black hover:text-swiss-red transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-2 -mr-2 text-swiss-black"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" aria-hidden="true" />
            ) : (
              <Menu className="w-6 h-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation - Swiss Modern Full Screen Overlay */}
      <nav
        id="mobile-menu"
        className={`md:hidden fixed inset-0 top-16 bg-swiss-white z-40 transition-all duration-200 ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        aria-label="Mobile navigation"
      >
        <div className="px-6 py-8 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-4 text-h3 font-semibold text-swiss-black hover:text-swiss-red transition-colors border-b border-swiss-border"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
