'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { Button } from '../ui/Button';
import { useScrolled } from '@/hooks/useAnimations';
import { navLinks } from '@/lib/navigation';

/* ================= BRAND LOGO ================= */
const Logo: React.FC<{ small?: boolean }> = ({ small = false }) => {
  return (
    <Link href="/" className="flex items-center gap-3 group select-none">

      {/* ICON - Code Brackets with Gradient */}
      <div
        className={`relative flex items-center justify-center
        ${small ? 'w-10 h-10' : 'w-12 h-12'}`}
      >
        {/* Outer Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-indigo-500/20 
          rounded-lg blur-sm group-hover:blur-md transition-all" />
        
        {/* Main Icon Container */}
        <div className="relative bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-600 
          rounded-lg p-2 shadow-md group-hover:shadow-lg transition-all">
          
          {/* Code Brackets Symbol */}
          <svg 
            className={`${small ? 'w-6 h-6' : 'w-8 h-8'} text-white`}
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" 
              d="M17.25 6.75L22.5 12l-5.25 5.25M6.75 17.25L1.5 12l5.25-5.25M14.25 3.75l-4.5 16.5" />
          </svg>
        </div>
      </div>

      {/* TEXT */}
      <div className="leading-tight">
        <div
          className={`font-extrabold uppercase tracking-wide
          bg-clip-text text-transparent
          bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600
          transition-all duration-300 group-hover:from-violet-700 
          group-hover:via-purple-700 group-hover:to-indigo-700
          ${small ? 'text-xl' : 'text-3xl'}`}
          style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
        >
          AzeemLab
        </div>

        <div
          className={`text-[10px] uppercase tracking-[0.25em] text-gray-500
          group-hover:text-gray-600 transition-colors
          ${small ? 'hidden' : 'block'}`}
        >
          Digital Powerhouse
        </div>
      </div>
    </Link>
  );
};

/* ================= HEADER ================= */
export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);

  const pathname = usePathname();
  const isScrolled = useScrolled(50);

  useEffect(() => {
    setIsMenuOpen(false);
    setExpandedMobile(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const isActiveLink = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  const isParentActive = (link: typeof navLinks[0]) =>
    isActiveLink(link.href) ||
    link.children?.some((child) => isActiveLink(child.href));

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300
      ${isScrolled
        ? 'bg-white/60 backdrop-blur-xl shadow-sm py-3'
        : 'bg-transparent py-5'
      }`}
    >
      <nav className="container mx-auto px-6">
        <div className="flex items-center justify-between">

          {/* LOGO */}
          <Logo small={isScrolled} />

          {/* DESKTOP NAV */}
          <div className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() =>
                  link.children && setOpenDropdown(link.label)
                }
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {link.children ? (
                  <>
                    <Link
                      href={link.href}
                      className={`flex items-center gap-1 font-medium transition-colors
                      ${isParentActive(link)
                        ? 'text-indigo-600'
                        : 'text-gray-800'
                      }`}
                    >
                      {link.label}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform
                        ${openDropdown === link.label ? 'rotate-180' : ''}`}
                      />
                    </Link>

                    {openDropdown === link.label && (
                      <div className="absolute top-full mt-2 w-64 rounded-xl bg-white shadow-lg border p-2">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={`block px-4 py-2 rounded-md text-sm transition
                            ${isActiveLink(child.href)
                              ? 'bg-indigo-50 text-indigo-600 font-medium'
                              : 'hover:bg-gray-100'
                            }`}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={link.href}
                    className={`font-medium transition-colors
                    ${isActiveLink(link.href)
                      ? 'text-indigo-600'
                      : 'text-gray-800'
                    }`}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}

            <Button href="/contact" size="sm">
              Start Project
            </Button>
          </div>

          {/* MOBILE BUTTON */}
          <button
            className="lg:hidden text-gray-800 text-2xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>
        </div>
      </nav>
    </header>
  );
};