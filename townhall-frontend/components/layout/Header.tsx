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
    <header className="sticky top-0 z-50 bg-white border-b-4 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-3 group"
            aria-label="Town Hall - Home"
          >
            {/* Bauhaus geometric logo */}
            <div className="flex items-center gap-1">
              <div className="w-8 h-8 bg-bauhaus-blue" aria-hidden="true" />
              <div className="w-8 h-8 bg-bauhaus-red" aria-hidden="true" />
              <div className="w-8 h-8 bg-bauhaus-yellow" aria-hidden="true" />
            </div>
            <span className="text-xl md:text-2xl font-black uppercase tracking-tight">
              Town Hall
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-semibold uppercase tracking-wider text-gray-900 hover:text-bauhaus-blue transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-bauhaus-blue transition-all group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-2 -mr-2"
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

      {/* Mobile Navigation */}
      <nav
        id="mobile-menu"
        className={`md:hidden border-t-2 border-black transition-all duration-300 ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
        aria-label="Mobile navigation"
      >
        <div className="px-4 py-4 space-y-1 bg-white">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-3 px-4 text-lg font-semibold uppercase tracking-wider text-gray-900 hover:bg-gray-100 hover:text-bauhaus-blue transition-colors"
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
