import React from 'react';
import Link from 'next/link';

/* ========= FOOTER LOGO (SAME AS HEADER) ========= */
const FooterLogo: React.FC = () => {
  return (
    <Link href="/" className="flex items-center gap-3 group select-none">
      {/* ICON - Code Brackets with Gradient */}
      <div className="relative w-10 h-10">
        {/* Outer Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-indigo-500/20 
          rounded-lg blur-sm group-hover:blur-md transition-all" />
        
        {/* Main Icon Container */}
        <div className="relative bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-600 
          rounded-lg p-2 shadow-md group-hover:shadow-lg transition-all">
          
          {/* Code Brackets Symbol */}
          <svg 
            className="w-6 h-6 text-white"
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
          className="font-extrabold uppercase tracking-wide
          bg-clip-text text-transparent
          bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600
          text-2xl group-hover:from-violet-700 
          group-hover:via-purple-700 group-hover:to-indigo-700 transition-all"
          style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
        >
          AzeemLab
        </div>
      </div>
    </Link>
  );
};

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white text-black">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* About Column */}
          <div>
            {/* LOGO REPLACED HERE */}
            <FooterLogo />

            <p className="text-black mt-4">
              Digital Growth, Simplified. We help businesses thrive online with expert web design, branding, and marketing.
            </p>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="font-heading font-semibold mb-4 text-black">
              Services
            </h4>
            <ul className="space-y-2">
              {['Web Design', 'Branding', 'SEO & Marketing', 'E-commerce'].map((service, i) => (
                <li key={i}>
                  <Link
                    href={`/services/${service.toLowerCase().replace(/ & /g,'-').replace(/ /g,'-')}`}
                    className="text-black hover:text-accent transition-colors"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-heading font-semibold mb-4 text-black">
              Company
            </h4>
            <ul className="space-y-2">
              {['About Us', 'Portfolio', 'Careers', 'Contact'].map((page, i) => (
                <li key={i}>
                  <Link
                    href={`/${page.toLowerCase().replace(/ /g,'-')}`}
                    className="text-black hover:text-accent transition-colors"
                  >
                    {page}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="font-heading font-semibold mb-4 text-black">
              Get in Touch
            </h4>
            <ul className="space-y-2 text-black">
              <li>Email: bilalahmedkhatri@outlook.com</li>
              <li>Phone: +92 (321) 300-9321</li>

              {/* Social Icons */}
              <li className="flex space-x-4 mt-4">
                {/* LinkedIn */}
                <a href="https://www.linkedin.com/company/azeem-lab/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full transition-transform transform hover:scale-105">
                  <svg className="w-6 h-6 text-[#0077B5]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>

                {/* Facebook */}
                <a href="https://www.facebook.com/azeemlab.0" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full transition-transform transform hover:scale-105">
                  <svg className="w-6 h-6 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>

                {/* Instagram */}
                <a href="https://www.instagram.com/azeem.lab/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full transition-transform transform hover:scale-105">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                    <defs>
                      <radialGradient id="instagram-gradient" cx="30%" cy="107%" r="150%">
                        <stop offset="0%" style={{stopColor: '#fdf497'}} />
                        <stop offset="5%" style={{stopColor: '#fdf497'}} />
                        <stop offset="45%" style={{stopColor: '#fd5949'}} />
                        <stop offset="60%" style={{stopColor: '#d6249f'}} />
                        <stop offset="90%" style={{stopColor: '#285AEB'}} />
                      </radialGradient>
                    </defs>
                    <path fill="url(#instagram-gradient)" d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z" />
                  </svg>
                </a>

                {/* X (Twitter) */}
                <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full transition-transform transform hover:scale-105">
                  <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-300 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-black">
          <p>&copy; {currentYear} AzeemLab. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-accent transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-accent transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};