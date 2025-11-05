import { Service, CaseStudy, TeamMember } from '@/types';
import { Palette, Wand2, TrendingUp, ShoppingCart } from 'lucide-react';

export const services: Service[] = [
  {
    id: '1',
    slug: 'web-design',
    title: 'High-Converting Web Design',
    description: 'Beautiful, responsive websites that turn visitors into customers',
    icon: Palette,
    problem: 'Your website looks outdated and fails to engage visitors, leading to high bounce rates and lost opportunities.',
    solution: 'We create modern, user-focused designs that guide visitors through an intentional journey, increasing engagement and conversions.',
    process: [
      { title: 'Discover', description: 'We research your audience, competitors, and goals' },
      { title: 'Design', description: 'Create mockups and prototypes for your approval' },
      { title: 'Develop', description: 'Build a fast, responsive, SEO-optimized site' },
      { title: 'Deploy', description: 'Launch and provide training and support' },
    ],
    pricing: [
      {
        name: 'Basic',
        price: '$2,999',
        features: ['5-page website', 'Responsive design', 'Basic SEO', '30-day support'],
      },
      {
        name: 'Pro',
        price: '$5,999',
        features: ['10-page website', 'Advanced animations', 'CMS integration', 'SEO optimization', '90-day support'],
        highlighted: true,
      },
      {
        name: 'Enterprise',
        price: 'Custom',
        features: ['Unlimited pages', 'Custom functionality', 'E-commerce', 'Ongoing support', 'Priority updates'],
      },
    ],
  },
  {
    id: '2',
    slug: 'branding',
    title: 'Strategic Brand Identity',
    description: 'Stand out with a memorable brand that resonates with your audience',
    icon: Wand2,
    problem: 'Your brand lacks cohesion and fails to communicate your unique value, making it hard to stand out in a crowded market.',
    solution: 'We develop comprehensive brand identities that capture your essence and create emotional connections with your target audience.',
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
    problem: 'Your website is invisible on search engines, missing out on valuable organic traffic and qualified leads.',
    solution: 'We implement data-driven SEO strategies that improve rankings, increase traffic, and drive measurable business growth.',
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
    problem: 'Your online store has a clunky checkout process and poor mobile experience, causing cart abandonment.',
    solution: 'We build streamlined e-commerce platforms with intuitive navigation, secure payments, and conversion-focused design.',
    process: [
      { title: 'Plan', description: 'Define product catalog and customer journey' },
      { title: 'Design', description: 'Create shopping experience and checkout flow' },
      { title: 'Integrate', description: 'Connect payment, shipping, and inventory systems' },
      { title: 'Launch', description: 'Test thoroughly and go live with confidence' },
    ],
  },
];

export const caseStudies: CaseStudy[] = [
  {
    id: '1',
    slug: 'quantumleap-ai-platform',
    title: 'QuantumLeap AI Platform',
    client: 'QuantumLeap',
    category: 'Web Application',
    heroImage: '/static/portfolio/Quantum_ai.png',
    challenge: 'QuantumLeap needed a scalable platform to showcase their complex AI models. Their initial MVP was slow, not intuitive, and couldn\'t handle user traffic.',
    solution: 'We engineered a high-performance Next.js application with a custom dashboard for real-time data visualization. The UI/UX was completely overhauled for simplicity and to guide users to key features.',
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
      quote: 'SooooLab delivered a world-class platform that exceeded our expectations. Their expertise in both design and engineering is unmatched.',
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
    challenge: 'GreenLife had a high cart abandonment rate (78%) due to a complicated checkout process and poor mobile experience.',
    solution: 'We rebuilt their e-commerce platform with a streamlined checkout, improved mobile responsiveness, and integrated inventory management. Focus on user experience and performance.',
    results: [
      { metric: 'Cart Abandonment', value: '-52%', description: 'Reduction in abandoned carts' },
      { metric: 'Mobile Sales', value: '+267%', description: 'Increase in mobile conversions' },
      { metric: 'Revenue', value: '+180%', description: 'Overall revenue growth' },
    ],
    images: [
      '/static/portfolio/greenlight.png'
    ],
    testimonial: {
      quote: 'Our revenue more than doubled within 3 months of launching the new site. The investment paid for itself many times over.',
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
    heroImage: '/portfolio/ailettergen.jpeg',
    challenge: 'Students and professionals struggled to craft compelling professional letters, spending hours writing and revising cover letters, recommendation letters, and formal correspondence.',
    solution: 'Built an AI-powered letter generation platform with intelligent analysis, customizable templates, and instant generation. Features include multi-language support, professional formatting, and tailored suggestions based on user details and opportunities. The platform is fully deployed and generating significant traffic.',
    results: [
      { metric: 'Website Traffic', value: 'High', description: 'Consistent organic traffic' },
      { metric: 'Time Saved', value: '98%', description: 'Faster letter creation' },
      { metric: 'User Satisfaction', value: '4.9/5', description: 'Average user rating' },
    ],
    images: [
      '/portfolio/ailettergen.jpeg',
    ],
    testimonial: {
      quote: 'This platform has revolutionized how people create professional letters. The AI advisor is incredibly intelligent and the results are outstanding. The website generates excellent traffic and engagement.',
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
    challenge: 'Client needed a modern, high-performance blog platform with excellent SEO capabilities, fast loading times, and an intuitive content management system to engage readers and grow their audience.',
    solution: 'Developed a cutting-edge blog platform with optimized performance, responsive design, and advanced SEO features. Implemented efficient content delivery, social sharing integration, and analytics tracking. Currently in final testing phase before full production launch.',
    results: [
      { metric: 'Page Load Speed', value: '1.2s', description: 'Average page load time' },
      { metric: 'SEO Score', value: '95/100', description: 'Google Lighthouse score' },
      { metric: 'Status', value: 'Testing', description: 'Final QA in progress' },
    ],
    images: [
      '/static/portfolio/blog.jpeg',
    ],
    testimonial: {
      quote: 'The platform exceeds our expectations in terms of performance and user experience. The attention to detail in both design and functionality is outstanding.',
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
    challenge: 'Business professionals needed an efficient way to automate LinkedIn networking activities, manage connections, and maintain consistent engagement without spending hours on manual tasks.',
    solution: 'Created an intelligent LinkedIn automation bot with smart connection management, automated messaging workflows, and engagement tracking. Features include personalized outreach, activity scheduling, and analytics dashboard. Currently deployed and operational on client portal.',
    results: [
      { metric: 'Time Saved', value: '85%', description: 'Reduction in manual tasks' },
      { metric: 'Connections', value: '+320%', description: 'Increase in network growth' },
      { metric: 'Status', value: 'Active', description: 'Live on client portal' },
    ],
    images: [
      '/static/portfolio/linkedin.webp',
    ],
    testimonial: {
      quote: 'This bot has transformed our LinkedIn networking strategy. The automation is intelligent and helps us maintain authentic connections while saving countless hours.',
      author: 'Marketing Agency',
      position: 'Lead Strategist',
      company: 'Enterprise Client',
    },
  },
];

export const teamMembers: TeamMember[] = [
  {
    name: 'Muhammad Azeem',
    position: 'Founder & CEO',
    bio: 'Visionary leader with 10+ years of experience in digital innovation and strategic business development. Passionate about transforming ideas into successful digital products.',
    image: '/images/team/azeem.jpg',
    social: {
      linkedin: 'https://linkedin.com/in/muhammedazeem',
      twitter: 'https://twitter.com/SooooLab',
      github: 'https://github.com/SooooLab',
    },
  },
  {
    name: 'Sarah Johnson',
    position: 'Lead Full-Stack Developer',
    bio: 'Expert in modern web technologies including Next.js, React, Node.js, and cloud architecture. Builds scalable applications that deliver exceptional user experiences.',
    image: '/images/team/sarah.jpg',
    social: {
      linkedin: 'https://linkedin.com/in/sarahjohnson',
      github: 'https://github.com/sarahjohnson',
    },
  },
  {
    name: 'David Chen',
    position: 'UI/UX Designer',
    bio: 'Award-winning designer with a keen eye for detail and user-centered design principles. Creates beautiful, intuitive interfaces that users love.',
    image: '/images/team/david.jpg',
    social: {
      linkedin: 'https://linkedin.com/in/davidchen',
      twitter: 'https://twitter.com/davidchen',
    },
  },
  {
    name: 'Emily Rodriguez',
    position: 'AI & Backend Specialist',
    bio: 'Specializes in AI integration, machine learning, and backend development using Python, Django, and FastAPI. Brings intelligent solutions to complex problems.',
    image: '/images/team/emily.jpg',
    social: {
      linkedin: 'https://linkedin.com/in/emilyrodriguez',
      github: 'https://github.com/emilyrodriguez',
    },
  },
  {
    name: 'Michael Park',
    position: 'DevOps Engineer',
    bio: 'Cloud infrastructure expert ensuring seamless deployments, scalability, and 99.9% uptime. Proficient in AWS, Azure, Docker, and Kubernetes.',
    image: '/images/team/michael.jpg',
    social: {
      linkedin: 'https://linkedin.com/in/michaelpark',
      github: 'https://github.com/michaelpark',
    },
  },
  {
    name: 'Jessica Williams',
    position: 'Project Manager',
    bio: 'Organized, detail-oriented project manager who keeps teams on track and clients delighted. Ensures every project is delivered on time and exceeds expectations.',
    image: '/images/team/jessica.jpg',
    social: {
      linkedin: 'https://linkedin.com/in/jessicawilliams',
    },
  },
];

// Page Metadata for SEO
export const pageMetadata = {
  about: {
    title: 'About Us - Our Story, Values & Mission',
    description: 'Meet Azeem Lab - a digital agency dedicated to transparency, innovation, and results-driven solutions. Learn about our values, mission, and commitment to your success.',
    keywords: 'about azeem lab, digital agency team, our values, company mission, transparency, innovation, partnership',
  },
  services: {
    title: 'Our Services - Web Design, Branding, SEO & E-commerce',
    description: 'Expert digital services: high-converting web design, strategic branding, SEO & digital marketing, and e-commerce solutions. Transform your business online.',
    keywords: 'web design services, branding agency, SEO services, e-commerce solutions, digital marketing, custom websites, brand identity',
  },
  portfolio: {
    title: 'Portfolio - Success Stories & Case Studies',
    description: 'Explore our proven results: +160% engagement, +267% mobile conversions, +180% revenue growth. See how we help businesses thrive with real case studies.',
    keywords: 'portfolio, case studies, success stories, client work, web design examples, AI projects, e-commerce results',
  },
  pricing: {
    title: 'Pricing Plans - Starter, Business & Enterprise Packages',
    description: 'Transparent pricing from $500-$2000+. Choose Starter (3 pages), Business (10 pages + AI), or Enterprise (unlimited + full AI suite). No hidden fees.',
    keywords: 'web design pricing, package plans, affordable websites, business pricing, enterprise solutions, transparent costs',
  },
  careers: {
    title: 'Careers - Join Our Team at Azeem Lab',
    description: 'Join a team that values innovation, collaboration, and growth. Explore career opportunities at Azeem Lab and help us build exceptional digital experiences.',
    keywords: 'careers, jobs, hiring, web developer jobs, designer jobs, digital agency careers, remote work',
  },
  contact: {
    title: 'Contact Us - Get in Touch with Azeem Lab',
    description: 'Ready to transform your digital presence? Contact us for a free 30-minute consultation. Email: bilalahmedkhatri@outlook.com | Phone: +92 321 300 93 21',
    keywords: 'contact us, get in touch, free consultation, project inquiry, contact digital agency, email contact',
  },
  process: {
    title: 'Our Process - How We Work & Deliver Results',
    description: 'Discover our proven 4-step process: Discover, Design, Develop, Deploy. Transparent collaboration, clear milestones, and exceptional results every time.',
    keywords: 'work process, development process, project workflow, design process, how we work, methodology',
  },
  privacy: {
    title: 'Privacy Policy - How We Protect Your Data',
    description: 'Your privacy matters. Read our privacy policy to understand how Azeem Lab collects, uses, and protects your personal information.',
    keywords: 'privacy policy, data protection, GDPR, personal information, privacy rights, data security',
  },
  terms: {
    title: 'Terms of Service - Website Terms & Conditions',
    description: 'Read our terms of service to understand the rules, rights, and responsibilities when using Azeem Lab\'s website and services.',
    keywords: 'terms of service, terms and conditions, legal terms, service agreement, website terms',
  },
};
