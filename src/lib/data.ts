import { Service, CaseStudy, TeamMember } from '@/types';

export const services: Service[] = [
  {
    id: '1',
    slug: 'web-design',
    title: 'High-Converting Web Design',
    description: 'Beautiful, responsive websites that turn visitors into customers',
    icon: '🎨',
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
    icon: '✨',
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
    icon: '📈',
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
    icon: '🛒',
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
    slug: 'techstart-rebrand',
    title: 'TechStart Complete Rebrand',
    client: 'TechStart Inc.',
    category: 'Branding',
    heroImage: '/images/case-studies/techstart-hero.jpg',
    challenge: 'TechStart was struggling to differentiate themselves in a saturated SaaS market. Their outdated brand failed to communicate their innovative solutions.',
    solution: 'We developed a fresh, modern brand identity that emphasized their cutting-edge technology and customer-first approach. This included logo redesign, new color palette, typography system, and comprehensive brand guidelines.',
    results: [
      { metric: 'Brand Recognition', value: '+156%', description: 'Increase in brand awareness' },
      { metric: 'Lead Quality', value: '+89%', description: 'Higher quality inbound leads' },
      { metric: 'Customer Trust', value: '+124%', description: 'Improved trust metrics' },
    ],
    images: [
      '/images/case-studies/techstart-1.jpg',
      '/images/case-studies/techstart-2.jpg',
      '/images/case-studies/techstart-3.jpg',
    ],
    testimonial: {
      quote: 'The rebrand transformed our entire business. We finally have a visual identity that matches the quality of our product.',
      author: 'Sarah Johnson',
      position: 'CEO',
      company: 'TechStart Inc.',
    },
  },
  {
    id: '2',
    slug: 'greenlife-ecommerce',
    title: 'GreenLife E-commerce Platform',
    client: 'GreenLife Organics',
    category: 'E-commerce',
    heroImage: '/images/case-studies/greenlife-hero.jpg',
    challenge: 'GreenLife had a high cart abandonment rate (78%) due to a complicated checkout process and poor mobile experience.',
    solution: 'We rebuilt their e-commerce platform with a streamlined checkout, improved mobile responsiveness, and integrated inventory management. Focus on user experience and performance.',
    results: [
      { metric: 'Cart Abandonment', value: '-52%', description: 'Reduction in abandoned carts' },
      { metric: 'Mobile Sales', value: '+267%', description: 'Increase in mobile conversions' },
      { metric: 'Revenue', value: '+180%', description: 'Overall revenue growth' },
    ],
    images: [
      '/images/case-studies/greenlife-1.jpg',
      '/images/case-studies/greenlife-2.jpg',
    ],
    testimonial: {
      quote: 'Our revenue more than doubled within 3 months of launching the new site. The investment paid for itself many times over.',
      author: 'Michael Chen',
      position: 'Founder',
      company: 'GreenLife Organics',
    },
  },
  {
    id: '3',
    slug: 'lawfirm-seo',
    title: 'Law Firm SEO Campaign',
    client: 'Anderson & Associates',
    category: 'SEO',
    heroImage: '/images/case-studies/lawfirm-hero.jpg',
    challenge: 'Anderson & Associates was invisible online, ranking on page 5+ for all their target keywords and receiving minimal organic leads.',
    solution: 'Comprehensive SEO overhaul including technical optimization, content strategy, local SEO, and link building campaign focused on legal industry keywords.',
    results: [
      { metric: 'Organic Traffic', value: '+425%', description: 'Increase in organic visitors' },
      { metric: 'Page 1 Rankings', value: '32', description: 'Keywords ranking on page 1' },
      { metric: 'Quality Leads', value: '+310%', description: 'More consultation requests' },
    ],
    images: [
      '/images/case-studies/lawfirm-1.jpg',
    ],
    testimonial: {
      quote: 'We went from invisible to dominating our local market. The quality of leads has been exceptional.',
      author: 'Robert Anderson',
      position: 'Partner',
      company: 'Anderson & Associates',
    },
  },
];

export const teamMembers: TeamMember[] = [
  {
    name: 'Alex Morgan',
    position: 'Founder & Creative Director',
    bio: 'With 12+ years in digital design, Alex leads our creative vision and ensures every project exceeds expectations.',
    image: '/images/team/alex.jpg',
    social: {
      linkedin: 'https://linkedin.com/in/alexmorgan',
      twitter: 'https://twitter.com/alexmorgan',
    },
  },
  {
    name: 'Jordan Lee',
    position: 'Lead Developer',
    bio: 'Jordan specializes in building lightning-fast, scalable web applications using modern technologies.',
    image: '/images/team/jordan.jpg',
    social: {
      linkedin: 'https://linkedin.com/in/jordanlee',
      github: 'https://github.com/jordanlee',
    },
  },
  {
    name: 'Taylor Smith',
    position: 'SEO Strategist',
    bio: 'Taylor has helped dozens of businesses dominate search rankings and drive qualified organic traffic.',
    image: '/images/team/taylor.jpg',
    social: {
      linkedin: 'https://linkedin.com/in/taylorsmith',
    },
  },
  {
    name: 'Casey Rivera',
    position: 'Brand Strategist',
    bio: 'Casey crafts compelling brand stories that resonate with audiences and drive emotional connections.',
    image: '/images/team/casey.jpg',
    social: {
      linkedin: 'https://linkedin.com/in/caseyrivera',
    },
  },
];
