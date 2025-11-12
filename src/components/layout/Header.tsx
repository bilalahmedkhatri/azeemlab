'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { Button } from '../ui/Button';
// import { ThemeToggle } from '../ui/ThemeToggle';
import { useScrolled } from '@/hooks/useAnimations';
import { navLinks } from '@/lib/navigation';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);
  const pathname = usePathname();
  const isScrolled = useScrolled(50);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setExpandedMobile(null);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const isActiveLink = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const isParentActive = (link: typeof navLinks[0]) => {
    if (isActiveLink(link.href)) return true;
    if (link.children) {
      return link.children.some(child => isActiveLink(child.href));
    }
    return false;
  };

  return (
    <header
      className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-white/95 backdrop-blur-md shadow-md py-3'
        : 'bg-white py-4'
        }`}
    >
      <nav className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="font-heading font-bold text-neutral-dark hover:text-accent relative"
            style={{
              fontSize: isScrolled ? '1.25rem' : '1.5rem',
              transition: 'font-size 0.4s cubic-bezier(0.4, 0, 0.2, 1), color 0.3s ease'
            }}
          >
            AzeemLab
          </Link>


          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => link.children && setOpenDropdown(link.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {link.children ? (
                  // Dropdown menu item with clickable parent
                  <div>
                    <Link
                      href={link.href}
                      className={`relative flex items-center gap-1 text-neutral-dark hover:text-accent transition-colors font-medium ${isParentActive(link) ? 'text-accent' : ''}`}
                    >
                      {link.label}
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openDropdown === link.label ? 'rotate-180' : ''}`} />
                      {isParentActive(link) && (
                        <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent" />
                      )}
                    </Link>

                    {openDropdown === link.label && (
                      <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                        {link.children?.map((child, idx) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={`block px-4 py-2.5 text-sm transition-colors ${isActiveLink(child.href)
                              ? 'bg-accent/10 text-accent font-medium'
                              : 'text-neutral-dark hover:bg-gray-50 hover:text-accent'
                              } ${idx === (link.children?.length ?? 0) - 1 ? 'border-t border-gray-100 mt-1 pt-3 font-medium' : ''}`}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  // Regular link
                  <Link
                    href={link.href}
                    className={`relative text-neutral-dark hover:text-accent transition-colors font-medium ${isActiveLink(link.href) ? 'text-accent' : ''}`}
                  >
                    {link.label}
                    {isActiveLink(link.href) && (
                      <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent" />
                    )}
                  </Link>
                )}
              </div>
            ))}
            {/* <ThemeToggle /> */}
            <Button href="/contact" size="sm">
              Start Project
            </Button>
          </div>

          {/* Mobile Controls */}
          <div className="lg:hidden flex items-center gap-3">
            {/* <ThemeToggle /> */}
            <button
              className="text-neutral-dark focus:outline-none z-50 relative active:scale-95 transition-transform"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span
                  className={`w-full h-0.5 bg-current origin-center transition-all duration-300 ${
                    isMenuOpen ? 'rotate-45 translate-y-2' : ''
                  }`}
                />
                <span
                  className={`w-full h-0.5 bg-current transition-opacity duration-200 ${
                    isMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`w-full h-0.5 bg-current origin-center transition-all duration-300 ${
                    isMenuOpen ? '-rotate-45 -translate-y-2' : ''
                  }`}
                />
              </div>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <>
              {/* Backdrop */}
              <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm lg:hidden animate-in fade-in duration-200"
                onClick={() => setIsMenuOpen(false)}
                style={{ top: 0 }}
              />

              {/* Menu Panel */}
              <div className="fixed right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-2xl lg:hidden overflow-y-auto animate-in slide-in-from-right duration-300">
                <div className="flex flex-col h-full p-8 pt-24">
                    {/* Navigation Links */}
                    <nav className="flex-1 space-y-2">
                      {navLinks.map((link, index) => (
                        <div key={link.href} className="animate-in slide-in-from-right-2 duration-200" style={{ animationDelay: `${index * 50}ms` }}>
                          {link.children ? (
                            // Accordion item for items with children
                            <div>
                              <div className="space-y-1">
                                {/* Parent link - clickable */}
                                <Link
                                  href={link.href}
                                  className={`block py-3 px-4 rounded-lg font-medium transition-colors ${isParentActive(link)
                                    ? 'bg-accent text-white'
                                    : 'text-neutral-dark hover:bg-neutral-light'
                                    }`}
                                  onClick={() => setIsMenuOpen(false)}
                                >
                                  {link.label}
                                </Link>
                                
                                {/* Toggle for children */}
                                <button
                                  onClick={() => setExpandedMobile(expandedMobile === link.label ? null : link.label)}
                                  className="w-full flex items-center justify-between py-2 px-4 rounded-lg text-sm font-medium text-neutral-dark hover:bg-neutral-light/50 transition-colors"
                                >
                                  <span>View All {link.label}</span>
                                  <ChevronDown
                                    className={`w-4 h-4 transition-transform duration-200 ${expandedMobile === link.label ? 'rotate-180' : ''
                                      }`}
                                  />
                                </button>
                              </div>

                              {expandedMobile === link.label && (
                                <div className="overflow-hidden animate-in slide-in-from-top-2 duration-200">
                                  <div className="pl-4 pt-2 space-y-1">
                                    {link.children.map((child) => (
                                      <Link
                                        key={child.href}
                                        href={child.href}
                                        className={`block py-2 px-4 rounded-lg text-sm transition-colors ${isActiveLink(child.href)
                                          ? 'bg-accent/10 text-accent font-medium'
                                          : 'text-neutral-dark hover:bg-neutral-light/50'
                                          }`}
                                        onClick={() => setIsMenuOpen(false)}
                                      >
                                        {child.label}
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          ) : (
                            // Regular link
                            <Link
                              href={link.href}
                              className={`block py-3 px-4 rounded-lg font-medium transition-colors ${isActiveLink(link.href)
                                ? 'bg-accent text-white'
                                : 'text-neutral-dark hover:bg-neutral-light'
                                }`}
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {link.label}
                            </Link>
                          )}
                        </div>
                      ))}
                    </nav>

                    {/* CTA Button */}
                    <div className="pt-6 border-t border-gray-200">
                      <Button
                        href="/contact"
                        size="lg"
                        className="w-full"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Start Project
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            )}
        </div>
      </nav>
    </header>
  );
};
