import { Service, CaseStudy, TeamMember } from '@/types';
import { Palette, Wand2, TrendingUp, ShoppingCart, Bot } from 'lucide-react';

// ─── SERVICES ──────────────────────────────────────────────────────────────────
// SEO Changes:
//   - web-design: title, description, and process step updated to include
//     "responsive web design", "front end development", and UK/NY geo signals
//   - branding: minor description tweak for clarity
//   - seo: unchanged (already well-described)
//   - ecommerce: unchanged

export const services: Service[] = [
  {
    id: '1',
    slug: 'web-design',
    // CHANGED: added "responsive web design" + "front end development" naturally
    title: 'Responsive Web Design & Front End Development',
    description:
      'Beautiful, responsive websites built with best-in-class front end development techniques — turning visitors into customers for UK, US, and global businesses.',
    icon: Palette,
    problem:
      'Your website looks outdated on mobile and desktop, failing to engage visitors — leading to high bounce rates and lost revenue.',
    solution:
      'We create modern, responsive web designs that follow industry best practices. Our front end development approach guides visitors through an intentional journey, increasing engagement and conversions.',
    process: [
      { title: 'Discover', description: 'We research your audience, competitors, and goals' },
      { title: 'Design', description: 'Create responsive mockups and prototypes for your approval' },
      // CHANGED: "responsive" added to reinforce the keyword
      { title: 'Develop', description: 'Build a fast, responsive, SEO-optimised site using proven front end development techniques' },
      { title: 'Deploy', description: 'Launch with training, support, and ongoing performance monitoring' },
    ],
    // NEW: FAQ entries for the web-design page — rendered in /services/web-design
    faq: [
      {
        question: 'What is responsive web design?',
        answer:
          'Responsive web design is the practice of building websites that automatically adjust their layout, images, and content to fit any screen size — from mobile phones to large desktop monitors. It ensures every visitor gets a great experience, regardless of device.',
      },
      {
        question: 'What are the basics of responsive web design?',
        answer:
          'The basics include fluid grid layouts, flexible images, and CSS media queries. These three responsive web design techniques allow a single codebase to serve all screen sizes without separate mobile and desktop versions.',
      },
      {
        question: 'Do you offer responsive web design in the UK?',
        answer:
          'Yes. We provide responsive web design services to businesses across the UK, including London, Manchester, and Birmingham, as well as New York and international clients.',
      },
      {
        question: 'What makes AzeemLab the best responsive web design service?',
        answer:
          'Every site we build scores 90+ on Google Lighthouse, is tested on real devices, and is backed by our results-focused process. We combine responsive web design best practices with conversion-rate optimisation to deliver measurable ROI.',
      },
    ],
    // NEW: location data used to generate /services/web-design/london and /new-york pages
    locationPages: [
      {
        slug: 'london',
        city: 'London',
        headline: 'Responsive Web Design Services in London',
        description:
          'AzeemLab delivers expert responsive web design for London-based businesses. From startups in Shoreditch to established firms in the City, we build fast, mobile-first websites that convert.',
      },
      {
        slug: 'new-york',
        city: 'New York',
        headline: 'Responsive Web Design Services in New York',
        description:
          'Serving New York businesses with premium responsive web design and front end development. We understand the NYC market and build sites that stand out in a competitive digital landscape.',
      },
      {
        slug: 'uk',
        city: 'UK',
        headline: 'Responsive Web Design Services Across the UK',
        description:
          'We are a UK-focused responsive web design agency trusted by businesses across England, Scotland, and Wales. Remote-first, results-driven, and available for projects of every size.',
      },
    ],
    // NEW: downloadable resource for "responsive web design pdf" keyword
    leadMagnet: {
      title: 'Free Responsive Web Design Best Practices Guide (PDF)',
      description:
        'Download our free 2026 guide covering responsive web design basics, techniques, and a step-by-step checklist used on every AzeemLab project.',
      fileName: 'azeemlab-responsive-web-design-guide-2026.pdf',
      ctaText: 'Download Free PDF Guide',
    },
  },
  {
    id: '2',
    slug: 'branding',
    title: 'Strategic Brand Identity',
    description: 'Stand out with a memorable brand that resonates with your audience',
    icon: Wand2,
    problem:
      'Your brand lacks cohesion and fails to communicate your unique value, making it hard to stand out in a crowded market.',
    solution:
      'We develop comprehensive brand identities that capture your essence and create emotional connections with your target audience.',
    process: [
      { title: 'Discovery', description: 'Deep dive into your mission, values, and audience' },
      { title: 'Strategy', description: 'Define positioning, personality, and messaging' },
      { title: 'Design', description: 'Create logo, colors, typography, and visual assets' },
      { title: 'Guidelines', description: 'Deliver brand book with usage standards' },
    ],
  },
  {
    id: '3',
    slug: 'seo',
    title: 'SEO & Digital Marketing',
    description: 'Get found by customers actively searching for your services',
    icon: TrendingUp,
    problem:
      'Your website is invisible on search engines, missing out on valuable organic traffic and qualified leads.',
    solution:
      'We implement data-driven SEO strategies that improve rankings, increase traffic, and drive measurable business growth.',
    process: [
      { title: 'Audit', description: 'Analyze current performance and opportunities' },
      { title: 'Strategy', description: 'Keyword research and competitive analysis' },
      { title: 'Optimize', description: 'On-page and technical SEO improvements' },
      { title: 'Monitor', description: 'Track results and continuously refine' },
    ],
  },
  {
    id: '4',
    slug: 'ecommerce',
    title: 'E-commerce Solutions',
    description: 'Powerful online stores that maximize sales and customer satisfaction',
    icon: ShoppingCart,
    problem:
      'Your online store has a clunky checkout process and poor mobile experience, causing cart abandonment.',
    solution:
      'We build streamlined e-commerce platforms with intuitive navigation, secure payments, and conversion-focused design.',
    process: [
      { title: 'Plan', description: 'Define product catalog and customer journey' },
      { title: 'Design', description: 'Create shopping experience and checkout flow' },
      { title: 'Integrate', description: 'Connect payment, shipping, and inventory systems' },
      { title: 'Launch', description: 'Test thoroughly and go live with confidence' },
    ],
  },
  {
    id: '5',
    slug: 'ai-integration-services',
    title: 'AI Integration Services & Business Automation',
    description:
      'Custom AI integration services for businesses looking to automate workflows, deploy AI chatbots, connect APIs, and improve operational efficiency.',
    icon: Bot,
    problem:
      'Businesses waste time on repetitive tasks, fragmented workflows, and manual customer support processes that limit growth and efficiency.',
    solution:
      'We integrate AI tools, chatbots, automation workflows, and APIs into your existing systems so your business can operate faster, smarter, and more efficiently.',
    process: [
      {
        title: 'Audit',
        description:
          'Analyze your workflows, business systems, and customer journey to identify automation opportunities',
      },
      {
        title: 'Strategy',
        description:
          'Define the best AI tools, APIs, and automation architecture for your business goals',
      },
      {
        title: 'Integrate',
        description:
          'Implement AI integrations including chatbots, CRM automations, APIs, and workflow systems',
      },
      {
        title: 'Optimize',
        description:
          'Monitor, test, and refine your AI systems for performance, reliability, and ROI',
      },
    ],
    faq: [
      {
        question: 'What is AI integration?',
        answer:
          'AI integration connects artificial intelligence tools with your website, CRM, workflows, or business systems to automate tasks and improve efficiency.',
      },
      {
        question: 'How can AI be integrated into a website?',
        answer:
          'AI can be integrated through chatbots, lead qualification systems, recommendation engines, automation workflows, and analytics tools.',
      },
      {
        question: 'Do you offer AI integration services for small businesses?',
        answer:
          'Yes. We provide scalable AI integration services for startups, agencies, e-commerce stores, and enterprise businesses.',
      },
      {
        question: 'What AI tools do you integrate?',
        answer:
          'We work with OpenAI, Claude, Gemini, automation platforms, CRMs, APIs, and custom business systems.',
      },
    ],
    locationPages: [
      {
        slug: 'london',
        city: 'London',
        headline: 'AI Integration Services in London',
        description:
          'AzeemLab helps London businesses automate operations with AI chatbots, workflow automation, API integrations, and business AI systems.',
      },
      {
        slug: 'new-york',
        city: 'New York',
        headline: 'AI Integration Services in New York',
        description:
          'Custom AI integration services for New York businesses including chatbot deployment, automation systems, and AI-powered workflows.',
      },
    ],
  },
];

// ─── CASE STUDIES ──────────────────────────────────────────────────────────────
// SEO Changes:
//   - GreenLife: solution copy now mentions "responsive web design techniques" and
//     "mobile-first front end development" naturally in the solution field
//   - QuantumLeap: solution copy references "responsive" and "front end"
//   - Others: unchanged

export const caseStudies: CaseStudy[] = [
  {
    id: '1',
    slug: 'quantumleap-ai-platform',
    title: 'QuantumLeap AI Platform',
    client: 'QuantumLeap',
    category: 'Web Application',
    heroImage: '/static/portfolio/Quantum_ai.png',
    challenge:
      "QuantumLeap needed a scalable platform to showcase their complex AI models. Their initial MVP was slow, not intuitive, and couldn't handle user traffic.",
    // CHANGED: added "responsive" and "front end development" naturally
    solution:
      'We engineered a high-performance Next.js application with a custom dashboard for real-time data visualisation. The front end development was completely overhauled — responsive web design techniques ensured the platform worked flawlessly across desktop, tablet, and mobile.',
    results: [
      { metric: 'User Engagement', value: '+160%', description: 'Increase in daily active users' },
      { metric: 'Performance', value: '98/100', description: 'Lighthouse performance score' },
      { metric: 'Lead Conversion', value: '+75%', description: 'Increase in demo requests' },
    ],
    images: [
      '/images/case-studies/quantum-1.jpg',
      '/images/case-studies/quantum-2.jpg',
    ],
    testimonial: {
      quote:
        'AzeemLab delivered a world-class platform that exceeded our expectations. Their expertise in both design and engineering is unmatched.',
      author: 'Jane Doe',
      position: 'CTO',
      company: 'QuantumLeap',
    },
  },
  {
    id: '2',
    slug: 'greenlife-ecommerce',
    title: 'GreenLife E-commerce Platform',
    client: 'GreenLife',
    category: 'E-commerce',
    heroImage: '/static/portfolio/greenlight.png',
    challenge:
      'GreenLife had a high cart abandonment rate (78%) due to a complicated checkout process and poor mobile experience.',
    // CHANGED: added "responsive web design" and "front end development" to solution naturally
    solution:
      'We rebuilt their e-commerce platform using responsive web design techniques and modern front end development practices. A streamlined checkout, improved mobile responsiveness, and integrated inventory management reduced friction at every step — with a focus on performance and user experience.',
    results: [
      { metric: 'Cart Abandonment', value: '-52%', description: 'Reduction in abandoned carts' },
      { metric: 'Mobile Sales', value: '+267%', description: 'Increase in mobile conversions' },
      { metric: 'Revenue', value: '+180%', description: 'Overall revenue growth' },
    ],
    images: ['/static/portfolio/greenlight.png'],
    testimonial: {
      quote:
        'Our revenue more than doubled within 3 months of launching the new site. The investment paid for itself many times over.',
      author: 'Michael Chen',
      position: 'Founder',
      company: 'GreenLife',
    },
  },
  {
    id: '9',
    slug: 'ai-letter-generator',
    title: 'AI Letter Generator Platform',
    client: 'www.ailettergen.com',
    category: 'AI Application',
    heroImage: '/static/portfolio/ailettergen.jpeg',
    challenge:
      'Students and professionals struggled to craft compelling professional letters, spending hours writing and revising cover letters, recommendation letters, and formal correspondence.',
    solution:
      'Built an AI-powered letter generation platform with intelligent analysis, customisable templates, and instant generation. Features include multi-language support, professional formatting, and tailored suggestions based on user details and opportunities. The platform is fully deployed and generating significant traffic.',
    results: [
      { metric: 'Website Traffic', value: 'High', description: 'Consistent organic traffic' },
      { metric: 'Time Saved', value: '98%', description: 'Faster letter creation' },
      { metric: 'User Satisfaction', value: '4.9/5', description: 'Average user rating' },
    ],
    images: ['/static/portfolio/ailettergen.jpeg'],
    testimonial: {
      quote:
        'This platform has revolutionised how people create professional letters. The AI advisor is incredibly intelligent and the results are outstanding.',
      author: 'Sarah Mitchell',
      position: 'Product Director',
      company: 'AI Letter Generator',
    },
  },
  {
    id: '10',
    slug: 'blog-platform',
    title: 'Modern Blog Platform',
    client: 'Confidential Client',
    category: 'Content Platform',
    heroImage: '/static/portfolio/blog.jpeg',
    challenge:
      'Client needed a modern, high-performance blog platform with excellent SEO capabilities, fast loading times, and an intuitive content management system to engage readers and grow their audience.',
    solution:
      'Developed a cutting-edge blog platform with optimised performance, responsive design, and advanced SEO features. Implemented efficient content delivery, social sharing integration, and analytics tracking. Currently in final testing phase before full production launch.',
    results: [
      { metric: 'Page Load Speed', value: '1.2s', description: 'Average page load time' },
      { metric: 'SEO Score', value: '95/100', description: 'Google Lighthouse score' },
      { metric: 'Status', value: 'Testing', description: 'Final QA in progress' },
    ],
    images: ['/static/portfolio/blog.jpeg'],
    testimonial: {
      quote:
        'The platform exceeds our expectations in terms of performance and user experience. The attention to detail in both design and functionality is outstanding.',
      author: 'Project Manager',
      position: 'Content Director',
      company: 'Confidential',
    },
  },
  {
    id: '11',
    slug: 'linkedin-automation-bot',
    title: 'LinkedIn Automation Bot',
    client: 'Enterprise Client Portal',
    category: 'AI Automation',
    heroImage: '/static/portfolio/linkedin.webp',
    challenge:
      'Business professionals needed an efficient way to automate LinkedIn networking activities, manage connections, and maintain consistent engagement without spending hours on manual tasks.',
    solution:
      'Created an intelligent LinkedIn automation bot with smart connection management, automated messaging workflows, and engagement tracking. Features include personalised outreach, activity scheduling, and analytics dashboard. Currently deployed and operational on client portal.',
    results: [
      { metric: 'Time Saved', value: '85%', description: 'Reduction in manual tasks' },
      { metric: 'Connections', value: '+320%', description: 'Increase in network growth' },
      { metric: 'Status', value: 'Active', description: 'Live on client portal' },
    ],
    images: ['/static/portfolio/linkedin.webp'],
    testimonial: {
      quote:
        'This bot has transformed our LinkedIn networking strategy. The automation is intelligent and helps us maintain authentic connections while saving countless hours.',
      author: 'Marketing Agency',
      position: 'Lead Strategist',
      company: 'Enterprise Client',
    },
  },
  {
    id: '12',
    slug: 'social-media-automation-suite',
    title: 'AI Social Media Automator',
    client: 'Marketing Operations',
    category: 'AI & Automation',
    heroImage: '/static/portfolio/automation.webp',
    challenge:
      'Managing multiple social media platforms like Facebook and Instagram manually was time-consuming and inefficient for consistent brand growth.',
    solution:
      'Developed a robust automation tool using Puppeteer and AI to schedule posts, manage engagement, and automate repetitive interactions across platforms.',
    results: [
      { metric: 'Efficiency', value: '90%', description: 'Reduction in manual posting' },
      { metric: 'Engagement', value: '+150%', description: 'Increase in organic reach' },
      { metric: 'Uptime', value: '24/7', description: 'Continuous operation' },
    ],
    images: [
      '/static/portfolio/automation-1.webp',
      '/static/portfolio/automation-2.webp',
    ],
    testimonial: {
      quote:
        'The AI automation suite has completely streamlined our social media workflow. It feels like having a dedicated team working around the clock.',
      author: 'Digital Lead',
      position: 'Operations Manager',
      company: 'Social Growth Ltd',
    },
  },
  {
    id: '15',
    slug: 'sikander-arts-karachi',
    title: 'Sikander Arts | Professional Painting Contractor',
    client: 'Sikander Arts',
    category: 'Full Stack Development & 3D Tools',
    heroImage: '/static/portfolio/sikanderart.jpeg',
    challenge:
      'A leading painting contractor in Karachi needed a digital platform to showcase their premium services and provide clients with accurate, interactive cost estimations.',
    solution:
      'Developed a high-performance website featuring an interactive 3D room visualiser and a custom cost estimator. Built with Next.js and Tailwind CSS for a premium, professional user experience tailored for the local market.',
    results: [
      { metric: 'Location', value: 'Karachi', description: 'Primary service area' },
      { metric: 'Feature', value: '3D Tool', description: 'Interactive estimation' },
      { metric: 'Status', value: 'Live', description: 'Client ready' },
    ],
    images: [
      '/static/portfolio/sikanderart.jpeg',
      '/static/portfolio/sikanderart.jpeg',
    ],
    testimonial: {
      quote:
        'The 3D estimator has revolutionised how we interact with our clients in Karachi. It brings a new level of professionalism to the painting industry.',
      author: 'Sikander',
      position: 'Founder',
      company: 'Sikander Arts',
    },
  },
  {
    id: '16',
    slug: 'te-kairiri-motors',
    title: 'Te Kairiri Motors | Premium Japanese Vehicle Export Platform',
    client: 'Te Kairiri Motors',
    category: 'Full Stack Development & Automotive Export',
    heroImage: '/static/portfolio/tekairiri-hero.jpeg',
    challenge:
      'Breaking into international automotive export markets requires far more than a listings page. Te Kairiri Motors faced a multi-front challenge: building cross-border buyer trust without a physical showroom, communicating vehicle condition accurately across language and cultural barriers, handling multi-currency pricing with real-time exchange rate sensitivity, and competing against established Japanese exporters with decade-long reputations.',
    solution:
      'Built a full-stack export platform using Next.js 15 (App Router) and Tailwind CSS v4 with a premium, trust-first design language. Firebase Data Connect powers the GraphQL backend for real-time inventory sync. A custom WhatsApp microservice on Google Cloud Run handles buyer communication with session persistence via MongoDB Atlas RemoteAuth.',
    internationalChallenges: [
      {
        region: 'Pakistan',
        challenge:
          'High import duties (up to 100%+ on engine size), documentation distrust, and preference for WhatsApp-first communication over web forms.',
        solution:
          'Integrated WhatsApp microservice as primary CTA. Built a duty estimator tool based on CC and vehicle age.',
      },
      {
        region: 'New Zealand / Australia',
        challenge:
          'Strict compliance with NZTA/JEVIC inspection standards, left-hand drive import bans, and mandatory odometer verification.',
        solution:
          'Surfaced JEVIC inspection scores, compliance badges, and NZ Import Standard filters directly on listing cards.',
      },
      {
        region: 'UK / EU (Upcoming)',
        challenge:
          'Right-hand drive import regulations post-Brexit, IVA testing requirements, and competitive JDM enthusiast market.',
        solution:
          'Planned dedicated subdomain via Turborepo monorepo targeting JDM-specific makes/models with spec sheets and enthusiast-grade detail pages.',
      },
    ],
    results: [
      { metric: 'Markets', value: '4+', description: 'NZ, AU, PK & expanding to UK/EU' },
      { metric: 'Messaging', value: 'WhatsApp', description: 'Cloud Run microservice' },
      { metric: 'Lighthouse Score', value: '94/100', description: 'Performance avg across pages' },
      { metric: 'Status', value: 'Live', description: 'Actively expanding' },
    ],
    seoAndTraffic: {
      targetKeywords: [
        'Japanese used cars export',
        'buy car from Japan NZ',
        'import car from Japan Pakistan',
        'JDM cars for sale UK',
        'Japanese vehicle exporter',
        'auction grade cars Japan',
      ],
      estimatedMonthlyVisits: '2,400–4,800 (organic, 3-month projection post-launch)',
      topTrafficSources: ['Organic Search', 'WhatsApp Referrals', 'Facebook Automotive Groups', 'Direct'],
      metaTitle: 'Te Kairiri Motors — Premium Japanese Car Export | NZ, AU, PK',
      metaDescription:
        'Buy auction-grade Japanese vehicles shipped directly to New Zealand, Australia, and Pakistan. Browse live stock, get instant WhatsApp quotes.',
    },
    rating: {
      overall: 4.8,
      breakdown: {
        uiDesign: 4.9,
        performance: 4.7,
        trustAndCredibility: 4.8,
        mobileExperience: 4.9,
        buyerCommunication: 5.0,
      },
      reviewCount: 12,
      platform: 'Internal QA + Beta User Reviews',
    },
    images: [
      '/static/portfolio/tekairiri-hero.jpeg',
      '/static/portfolio/tekairiri-listings.jpeg',
      '/static/portfolio/tekairiri-vehicle-detail.jpeg',
      '/static/portfolio/tekairiri-whatsapp.jpeg',
      '/static/portfolio/tekairiri-mobile.jpeg',
    ],
    testimonial: {
      quote:
        'The platform transformed how we connect Japanese inventory with international buyers. The WhatsApp integration alone doubled our response rate — buyers in Pakistan get answers in minutes, not days.',
      author: 'Te Kairiri Team',
      position: 'Founder',
      company: 'Te Kairiri Motors',
    },
    tags: ['International Trade'],
    marketFocus: ['New Zealand', 'Australia', 'Pakistan', 'UK / EU (upcoming)'],
  },
];

// ─── TEAM ───────────────────────────────────────────────────────────────────────
// Unchanged — team data does not affect target keywords

export const teamMembers: TeamMember[] = [
  {
    name: 'Bilal Ahmed',
    position: 'Founder & CEO',
    bio: 'Visionary leader with 4+ years of experience in digital innovation and strategic business development. Passionate about transforming ideas into successful digital products.',
    image: '/images/team/azeem.jpg',
    social: {
      linkedin: 'https://www.linkedin.com/in/bilalahmeddev/',
      twitter: 'https://x.com/bilalahmed_dev',
      github: 'https://github.com/bilalahmedkhatri',
    },
  },
  {
    name: 'Usman Ghani',
    position: 'Project Manager',
    bio: 'Organised, detail-oriented project manager who keeps teams on track and clients delighted. Ensures every project is delivered on time and exceeds expectations.',
    image: '/images/team/jessica.jpg',
    social: {
      // linkedin: 'https://linkedin.com/in/jessicawilliams',
    },
  },
  {
    name: 'Muhammad Talat',
    position: 'UI/UX Designer',
    bio: 'Award-winning designer with a keen eye for detail and user-centred design principles. Creates beautiful, intuitive interfaces that users love.',
    image: '/images/team/david.jpg',
    // social: {
    //   linkedin: 'https://linkedin.com/in/davidchen',
    //   twitter: 'https://twitter.com/davidchen',
    // },
  },
];

// ─── PAGE METADATA ──────────────────────────────────────────────────────────────
// SEO Changes:
//   - home:     NEW entry — added to cover homepage keywords
//   - about:    updated description to include "front end development agency"
//   - services: updated keywords to include all target keywords
//   - web-design: NEW sub-page entry with all RWD keywords

export const pageMetadata = {
  // NEW: homepage meta (was missing — this is a critical SEO gap)
  home: {
    title: 'AzeemLab | Responsive Web Design & Front End Development Agency',
    description:
      'AzeemLab is a responsive web design and front end development agency serving UK, London, New York, and global clients. We build high-converting websites, brands, and digital strategies.',
    keywords:
      'responsive web design uk, responsive web design london, front end development agency, front end development service, web design agency, digital growth',
  },

  about: {
    // CHANGED: "front end development agency" added to title and description
    title: 'About AzeemLab — Front End Development Agency | Our Story & Mission',
    description:
      'AzeemLab is a front end development agency dedicated to transparency and innovation. We combine responsive web design best practices with conversion-focused strategy to deliver real growth for our clients.',
    keywords:
      'about azeem lab, front end development agency, digital agency team, our values, company mission, transparency, innovation, partnership',
  },

  services: {
    title: 'Our Services — Responsive Web Design, Front End Development & SEO',
    description:
      'Expert digital services: responsive web design for UK & US businesses, strategic branding, SEO & digital marketing, and e-commerce solutions. Transform your business online.',
    // CHANGED: all target keywords added
    keywords:
      'responsive web design uk, responsive web design services, front end development service, front end development agency, front end development company, web design services, branding agency, SEO services, e-commerce solutions, digital marketing',
  },

  // NEW: dedicated /services/web-design page meta
  webDesign: {
    title: 'Responsive Web Design Services UK — Best Practices & Results | AzeemLab',
    description:
      'AzeemLab delivers the best responsive web design services for UK, London, and New York businesses. We apply proven responsive web design techniques and front end development best practices to every project.',
    keywords:
      'responsive web design uk, responsive web design london, responsive web design new york, best responsive web design services, responsive web design best practices, responsive web design techniques, responsive web design basics, responsive web design definition, front end development service',
  },

  portfolio: {
    title: 'Portfolio — Success Stories & Case Studies',
    description:
      'Explore our proven results: +160% engagement, +267% mobile conversions, +180% revenue growth. See how we help businesses thrive with real case studies.',
    keywords:
      'portfolio, case studies, success stories, client work, responsive web design examples, AI projects, e-commerce results',
  },

  pricing: {
    title: 'Pricing Plans — Starter, Business & Enterprise Packages',
    description:
      'Transparent pricing from $500–$2000+. Choose Starter (3 pages), Business (10 pages + AI), or Enterprise (unlimited + full AI suite). No hidden fees.',
    keywords:
      'web design pricing, package plans, affordable websites, business pricing, enterprise solutions, transparent costs',
  },

  careers: {
    title: 'Careers — Join Our Team at AzeemLab',
    description:
      'Join a team that values innovation, collaboration, and growth. Explore career opportunities at AzeemLab and help us build exceptional digital experiences.',
    keywords:
      'careers, jobs, hiring, web developer jobs, designer jobs, digital agency careers, remote work',
  },

  contact: {
    title: 'Contact Us — Get in Touch with AzeemLab',
    description:
      'Ready to transform your digital presence? Contact us for a free 30-minute consultation. Email: bilalahmed@azeemlab.com | Phone: +92 321 300 93 21',
    keywords:
      'contact us, get in touch, free consultation, project inquiry, contact digital agency, email contact',
  },

  process: {
    title: 'Our Process — How We Work & Deliver Results',
    description:
      'Discover our proven 4-step process: Discover, Design, Develop, Deploy. Transparent collaboration, clear milestones, and exceptional results every time.',
    keywords:
      'work process, development process, project workflow, responsive web design process, how we work, methodology',
  },

  privacy: {
    title: 'Privacy Policy — How We Protect Your Data',
    description:
      'Your privacy matters. Read our privacy policy to understand how AzeemLab collects, uses, and protects your personal information.',
    keywords:
      'privacy policy, data protection, GDPR, personal information, privacy rights, data security',
  },

  terms: {
    title: 'Terms of Service — Website Terms & Conditions',
    description:
      "Read our terms of service to understand the rules, rights, and responsibilities when using AzeemLab's website and services.",
    keywords:
      'terms of service, terms and conditions, legal terms, service agreement, website terms',
  },

  aiIntegration: {
    title: 'AI Integration Services | Business Automation & AI Solutions | AzeemLab',
    description:
      'AzeemLab offers AI integration services including chatbots, workflow automation, API integrations, and business AI solutions for startups and growing companies.',
    keywords:
      'ai integration services, ai systems integration, ai chatbot integration, business ai automation, ai integration in marketing, ai integration in finance, ai integration in healthcare',
  },
};

// ─── BLOG POSTS (NEW — needed for informational keyword targeting) ──────────────
// These objects can feed a /blog page using the same data-driven pattern  as services and caseStudies.
// as services and caseStudies. Create /app/blog/[slug]/page.tsx to render them.

export const blogPosts = [
  {
    id: 'b1',
    slug: 'responsive-web-design-basics-guide',
    // Targets: "responsive web design basics" (KD 42, 1,300/mo)
    title: 'Responsive Web Design Basics: A Complete Beginner&apos;s Guide',
    metaTitle: 'Responsive Web Design Basics: Complete Guide 2026 | AzeemLab',
    metaDescription:
      'Learn the fundamentals of responsive web design — fluid grids, flexible images, and media queries explained clearly. Includes a free PDF checklist.',
    excerpt:
      'Everything you need to know about the basics of responsive web design, written for business owners and aspiring developers alike.',
    publishDate: '2026-04-10',
    readTime: '8 min read',
    ctaText: 'See Our Responsive Web Design Services',
    ctaHref: '/services/web-design',
    relatedKeywords: ['responsive web design basics', 'responsive web design definition', 'responsive web design guide'],
    internalLinks: [
      { text: 'our responsive web design services', href: '/services/web-design' },
      { text: 'GreenLife case study', href: '/portfolio/greenlife-ecommerce' },
    ],
  },
  {
    id: 'b2',
    slug: 'responsive-web-design-techniques',
    // Targets: "responsive web design techniques" (KD 40, 1,000/mo)
    title: '7 Responsive Web Design Techniques We Use on Every Project',
    metaTitle: '7 Responsive Web Design Techniques That Actually Work | AzeemLab',
    metaDescription:
      'Discover the responsive web design techniques our front end development team applies to every client project — with real examples from our portfolio.',
    excerpt:
      'From fluid grids to container queries, these are the responsive web design techniques that separate good sites from great ones.',
    publishDate: '2026-04-18',
    readTime: '10 min read',
    ctaText: 'Get a Free Responsive Web Design Consultation',
    ctaHref: '/contact',
    relatedKeywords: ['responsive web design techniques', 'responsive web design best practices', 'front end development'],
    internalLinks: [
      { text: 'QuantumLeap AI platform case study', href: '/portfolio/quantumleap-ai-platform' },
      { text: 'GreenLife mobile results', href: '/portfolio/greenlife-ecommerce' },
      { text: 'front end development service', href: '/services/web-design' },
    ],
  },
  {
    id: 'b3',
    slug: 'responsive-web-design-best-practices-pdf',
    // Targets: "responsive web design pdf" (KD 22, 590/mo) + "responsive web design guide"
    title: 'Responsive Web Design Best Practices 2026 (Free PDF Guide)',
    metaTitle: 'Responsive Web Design Best Practices PDF — Free Download | AzeemLab',
    metaDescription:
      'Download our free responsive web design best practices PDF. 2026 edition covering basics, techniques, and a step-by-step implementation checklist.',
    excerpt:
      'Get our free PDF guide to responsive web design best practices — the same checklist our team uses on every project.',
    publishDate: '2026-05-01',
    readTime: '5 min read',
    hasFreeDownload: true,
    downloadFile: '/downloads/azeemlab-responsive-web-design-guide-2026.pdf',
    ctaText: 'Download Free PDF',
    ctaHref: '/downloads/azeemlab-responsive-web-design-guide-2026.pdf',
    relatedKeywords: ['responsive web design pdf', 'responsive web design guide', 'responsive web design best practices'],
    internalLinks: [
      { text: 'responsive web design services', href: '/services/web-design' },
    ],
  },
  {
    id: 'b4',
    slug: 'what-is-ai-integration',
    title: 'What Is AI Integration? A Complete Business Guide',
    metaTitle: 'What Is AI Integration? Business Guide 2026 | AzeemLab',
    metaDescription:
      'Learn what AI integration is, how it works, and how businesses automate workflows using AI tools, chatbots, and APIs.',
    excerpt:
      'A beginner-friendly guide explaining AI integration services and how businesses use automation to scale faster.',
    publishDate: '2026-05-07',
    readTime: '7 min read',
    ctaText: 'Explore AI Integration Services',
    ctaHref: '/services/ai-integration-services',
    relatedKeywords: [
      'what is ai integration',
      'ai integration services',
      'ai systems integration',
    ],
    internalLinks: [
      {
        text: 'AI integration services',
        href: '/services/ai-integration-services',
      },
    ],
  },
  {
    id: 'b5',
    slug: 'how-to-integrate-ai-into-your-business',
    title: 'How to Integrate AI Into Your Business',
    metaTitle: 'How to Integrate AI Into Your Business | AzeemLab',
    metaDescription:
      'Discover practical ways businesses can integrate AI tools, chatbots, workflow automation, and APIs.',
    excerpt:
      'Learn how startups and businesses can implement AI automation and integrations for growth.',
    publishDate: '2026-05-07',
    readTime: '9 min read',
    ctaText: 'Get AI Integration Help',
    ctaHref: '/contact',
    relatedKeywords: [
      'ai integration in business',
      'business ai automation',
      'ai chatbot integration',
    ],
    internalLinks: [
      {
        text: 'our AI integration services',
        href: '/services/ai-integration-services',
      },
    ],
  },
];
