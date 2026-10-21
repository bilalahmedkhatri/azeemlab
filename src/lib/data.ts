import { Service, CaseStudy, TeamMember } from '@/types';
import { Palette, Wand2, TrendingUp, ShoppingCart, Brain, Zap } from 'lucide-react';

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
      'Beautiful, responsive websites built with best-in-class front end development techniques -turning visitors into customers for UK, US, and global businesses.',
    icon: Palette,
    problem:
      'Your website looks outdated on mobile and desktop, failing to engage visitors -leading to high bounce rates and lost revenue.',
    solution:
      'We create modern, responsive web designs that follow industry best practices. Our front end development approach guides visitors through an intentional journey, increasing engagement and conversions.',
    process: [
      { title: 'Discover', description: 'We research your audience, competitors, and goals' },
      { title: 'Design', description: 'Create responsive mockups and prototypes for your approval' },
      // CHANGED: "responsive" added to reinforce the keyword
      { title: 'Develop', description: 'Build a fast, responsive, SEO-optimised site using proven front end development techniques' },
      { title: 'Deploy', description: 'Launch with training, support, and ongoing performance monitoring' },
    ],
    // UPDATED: location pages -fully expanded with 10+ local business issues per city,
    // written as paragraph-form prose per Google E-E-A-T and Helpful Content standards.
    // Each description field is intentionally long-form to power a dedicated page template.
    // The `issues` array provides structured paragraph blocks for the "local challenges" section.
    // The `metaTitle` and `metaDescription` fields feed <head> tags on each location page.
    locationPages: [
      {
        slug: 'london',
        city: 'London',
        headline: 'Responsive Web Design Services in London',

        metaTitle: 'Responsive Web Design London -AzeemLab | Mobile-First, UK GDPR-Compliant',
        metaDescription:
          'AzeemLab delivers responsive web design for London businesses -from Shoreditch startups to City firms. Mobile-first, Lighthouse 90+, UK GDPR-compliant. Book a free consultation today.',

        // ── SEO-optimised images ──────────────────────────────────────────────
        // All sourced from Unsplash (Unsplash Licence -free for commercial use, no attribution required).
        // File names are descriptive for Google Image search indexing.
        // alt text includes geo-modified keyword + service type per Google image SEO best practices.
        // width/height prevent Cumulative Layout Shift (CLS) -a Core Web Vitals signal.
        // loading: 'eager' on hero (above fold), 'lazy' on all others.
        images: [
          {
            // Hero image -renders directly below H1, above the first paragraph
            src: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200&q=80',
            localPath: '/images/location/london-skyline-web-design-agency.webp',
            alt: 'London skyline viewed from the Thames -AzeemLab responsive web design services for London businesses',
            caption: 'AzeemLab serves businesses across London -from Canary Wharf to Shoreditch and beyond.',
            width: 1200,
            height: 630,
            loading: 'eager',
            fetchpriority: 'high',
            // Schema.org ImageObject -used in JSON-LD for Google rich results
            schema: {
              '@type': 'ImageObject',
              contentUrl: 'https://www.azeemlab.com/images/location/london-skyline-web-design-agency.webp',
              description: 'London skyline -AzeemLab responsive web design services for London businesses',
              license: 'https://unsplash.com/license',
              creditText: 'Photo by Benjamin Davies on Unsplash',
            },
            // Unsplash attribution (good practice even though not required by licence)
            credit: 'Photo by Benjamin Davies on Unsplash',
            unsplashUrl: 'https://unsplash.com/photos/london-thames-river-Oja2ty_9ZLM',
          },
          {
            // Mid-page image -placed after the "issues" section opener, before mobile issues paragraph
            src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80',
            localPath: '/images/location/mobile-first-web-design-london-business.webp',
            alt: 'Developer reviewing a responsive website on a laptop and mobile device -mobile-first web design for London businesses',
            caption: 'Every AzeemLab site is tested on real devices used by London consumers -not just in browser emulators.',
            width: 900,
            height: 500,
            loading: 'lazy',
            fetchpriority: 'auto',
            schema: {
              '@type': 'ImageObject',
              contentUrl: 'https://www.azeemlab.com/images/location/mobile-first-web-design-london-business.webp',
              description: 'Mobile-first responsive web design for London businesses',
              license: 'https://unsplash.com/license',
              creditText: 'Photo by Carlos Muza on Unsplash',
            },
            credit: 'Photo by Carlos Muza on Unsplash',
            unsplashUrl: 'https://unsplash.com/photos/laptop-analytics-hpjSkU2UYSU',
          },
          {
            // Placed after the Google/SEO section -illustrates search visibility concept
            src: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=900&q=80',
            localPath: '/images/location/seo-performance-london-website-design.webp',
            alt: 'Google Analytics dashboard on a laptop screen -SEO and performance optimisation for London business websites',
            caption: 'We configure Google Analytics 4, Search Console, and structured data on every London project from day one.',
            width: 900,
            height: 500,
            loading: 'lazy',
            fetchpriority: 'auto',
            schema: {
              '@type': 'ImageObject',
              contentUrl: 'https://www.azeemlab.com/images/location/seo-performance-london-website-design.webp',
              description: 'SEO performance dashboard for London business website',
              license: 'https://unsplash.com/license',
              creditText: 'Photo by Fabian Irsara on Unsplash',
            },
            credit: 'Photo by Fabian Irsara on Unsplash',
            unsplashUrl: 'https://unsplash.com/photos/laptop-with-data-charts-67l-QujB14w',
          },
          {
            // Placed after the process section -illustrates collaborative design work
            src: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=900&q=80',
            localPath: '/images/location/web-design-process-figma-london-agency.webp',
            alt: 'Designer working on a UI mockup in Figma -responsive web design process used by AzeemLab for London clients',
            caption: 'Our London web design process begins in Figma -high-fidelity mockups reviewed and approved before any code is written.',
            width: 900,
            height: 500,
            loading: 'lazy',
            fetchpriority: 'auto',
            schema: {
              '@type': 'ImageObject',
              contentUrl: 'https://www.azeemlab.com/images/location/web-design-process-figma-london-agency.webp',
              description: 'Web design process for London clients using Figma',
              license: 'https://unsplash.com/license',
              creditText: 'Photo by Balázs Kétyi on Unsplash',
            },
            credit: 'Photo by Balázs Kétyi on Unsplash',
            unsplashUrl: 'https://unsplash.com/photos/person-designing-ui-9vSBTAWfSRQ',
          },
          {
            // Placed at the bottom near the CTA -illustrates successful business / growth outcome
            src: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&q=80',
            localPath: '/images/location/london-business-growth-web-design-results.webp',
            alt: 'London business professional reviewing website performance results -AzeemLab web design outcomes for London clients',
            caption: 'Our London clients see measurable results -higher search rankings, faster load times, and more qualified leads.',
            width: 900,
            height: 500,
            loading: 'lazy',
            fetchpriority: 'auto',
            schema: {
              '@type': 'ImageObject',
              contentUrl: 'https://www.azeemlab.com/images/location/london-business-growth-web-design-results.webp',
              description: 'London business professional reviewing web design results',
              license: 'https://unsplash.com/license',
              creditText: 'Photo by Christina @ wocintechchat.com on Unsplash',
            },
            credit: 'Photo by Christina @ wocintechchat.com on Unsplash',
            unsplashUrl: 'https://unsplash.com/photos/woman-laptop-office-0Zx1bDv5BNY',
          },
        ],

        // ── Page content -all paragraphs in render order ─────────────────────
        // `description` (hero intro) + former `issues` are merged into a single
        // `paragraphs` array so the page template can render them sequentially
        // with images interleaved at the positions defined by `imageAfterIndex`.
        // Nothing from the original content has been removed -every sentence is preserved.
        paragraphs: [
          // ── Hero intro block (was: description) ──
          {
            id: 'intro-1',
            imageAfterIndex: null, // hero image is placed ABOVE this paragraph by the template
            text: 'London is one of the most competitive business environments on the planet, home to over one million small and medium-sized enterprises competing for attention across every industry imaginable. Whether you are a fintech startup in Canary Wharf, a creative agency in Shoreditch, a professional services firm in the City of London, a retail brand serving customers from Hackney to Hammersmith, a hospitality business in Soho, or a technology company scaling from a co-working space in King\'s Cross -your website is the first impression that either earns or loses the sale. In a city where a potential client can find five competitors within a one-mile radius and compare all of them on their phone before they have finished their morning coffee, the gap between a high-performing website and a mediocre one is measured directly in revenue.',
          },
          {
            id: 'intro-2',
            imageAfterIndex: null,
            text: 'AzeemLab is a responsive web design and front end development agency that builds fast, mobile-first, conversion-focused websites for London businesses who are serious about digital growth. We are not a generalist agency that takes every project that comes through the door. We specialise in building websites that are technically excellent, visually authoritative, strategically structured for search visibility, and designed around the real decision-making behaviour of the customers your London business is trying to win. Every site we deliver scores 90 or above on Google Lighthouse across all four audit categories -performance, accessibility, best practices, and SEO. Every site is tested on real devices used by London consumers, not just in browser emulators. Every site is built to comply with UK GDPR by default, with consent management, privacy policy, and data flow documentation included as standard deliverables. And every site is engineered to perform in the hyper-competitive search landscape that London businesses face every single day.',
          },
          {
            id: 'intro-3',
            imageAfterIndex: null,
            text: 'We work in UK timezone. Our project management communicates in BST and GMT, which means that when you send a message in the morning, you receive a response before lunch -not a day later because of a time zone gap. We understand the London market because we have worked in it, studied it, and tracked the digital behaviour of London consumers across multiple sectors. We know that a law firm in Mayfair needs a different visual register than a streetwear brand in Shoreditch. We know that a restaurant in Borough Market competes for Google rankings differently than a SaaS company in Vauxhall. We know that a business selling professional services to the financial sector needs a website that communicates institutional credibility, while a creative studio in Dalston needs one that communicates originality and taste. This market understanding is built into how we approach every London project -not applied as a finishing touch after the build is done.',
          },
          {
            id: 'intro-4',
            imageAfterIndex: null,
            text: 'London\'s digital landscape in 2026 is more demanding than at any point in the city\'s business history. The explosion of AI-generated content has flooded every niche with low-quality information, making it harder for businesses with genuinely valuable expertise to stand out on search. Google\'s December 2025 core update specifically penalised sites with generic, templated, or thin content -rewarding instead the sites that demonstrate real first-hand experience, genuine expertise, and content that serves a clear user need. The introduction of AI Overviews into UK search results means that an increasing proportion of searches are answered directly by Google without the user clicking through to any website at all -and the businesses that appear in those AI-generated answers are those whose sites are structured with proper schema markup, clear topical authority, and content that directly answers the questions London consumers are actually asking. Meanwhile, Core Web Vitals have been a confirmed Google ranking signal since 2021, and in London\'s competitive keywords, the difference between a site that passes and one that fails is often the difference between a position on page one and a position on page three.',
          },
          {
            id: 'intro-5',
            imageAfterIndex: null,
            text: 'At AzeemLab, we address all of this -not as a series of optional add-ons, but as the foundation of every London web project we take on. The sites we build are architected for the 2026 search environment, not the 2019 one. They are structured for AI Overview inclusion, equipped with LocalBusiness and FAQPage schema as standard, built on a Next.js foundation that delivers server-side rendering and sub-two-second load times globally, and designed with the content depth and internal linking structure that Google\'s quality signals require. When we say we build websites that perform in London\'s competitive digital environment, we mean it in a very specific, technical, measurable sense -and we can show you the data to prove it.',
          },
          {
            id: 'intro-6',
            imageAfterIndex: null,
            text: 'The businesses we work with in London range from early-stage startups that need a professional web presence to launch credibly, to established firms that have outgrown their existing site and need a rebuild that reflects where the business is now rather than where it was five years ago. We work with businesses in professional services, technology, hospitality, retail, education, healthcare, creative industries, financial services, property, and e-commerce. What they share is a recognition that their website is a business asset, not a cost -and a desire to work with a team that treats it that way.',
          },

          // ── Issues section (was: issues[]) -heading rendered as H2 by template ──
          {
            id: 'issues-heading',
            isHeading: true,
            headingLevel: 2,
            text: 'Why London Businesses Struggle Online -And How We Fix It',
          },
          {
            id: 'issue-1',
            imageAfterIndex: 1, // renders images[1] (mobile devices photo) after this paragraph
            heading: 'Websites that look broken on the devices Londoners actually use',
            text: 'The overwhelming majority of web traffic in London now comes from mobile devices -iPhones on the Tube, Android handsets on lunch breaks, tablets in coffee shops in Bermondsey and Brixton. Yet a significant proportion of London business websites were built five or more years ago on desktop-first platforms that were never designed to adapt. Text overlaps navigation menus. Images are cropped incorrectly. Buttons are too small to tap. Forms are impossible to complete without a mouse. The result is an immediate, silent loss of customers who simply close the tab and move on to a competitor. AzeemLab builds every London website mobile-first -meaning the mobile experience is designed and tested first, and the desktop version scales up from there, not the other way around. Our responsive web design process uses fluid grid layouts, flexible images, and modern CSS techniques that ensure your site looks and performs flawlessly on every device your customers use.',
          },
          {
            id: 'issue-2',
            imageAfterIndex: null,
            heading: 'Slow page speed in a city that moves fast',
            text: 'London consumers have some of the fastest mobile connections in Europe -and some of the least patience for slow websites. Research consistently shows that users abandon pages that take more than three seconds to load, and in London\'s competitive market, those users go directly to your nearest competitor. The culprits are almost always the same: uncompressed images, render-blocking JavaScript, poorly configured hosting, and themes loaded with features the business never uses. AzeemLab addresses every one of these at the foundation level, not as an afterthought. We use Next.js with server-side rendering, Vercel\'s Edge Network for global content delivery, next/image for automatic WebP compression and lazy loading, and code-splitting to ensure only the JavaScript your page actually needs is loaded. The result is a Lighthouse performance score of 90 or above and a real-world load time that keeps London visitors engaged from the first second.',
          },
          {
            id: 'issue-3',
            imageAfterIndex: 2, // renders images[2] (analytics dashboard) after this paragraph
            heading: 'UK GDPR compliance gaps that expose businesses to ICO enforcement',
            text: 'Since the UK\'s departure from the EU, UK GDPR has been enforced independently by the Information Commissioner\'s Office -and the ICO has made clear that it does not consider small business size a mitigating factor in enforcement decisions. Yet the majority of London SME websites we audit are non-compliant in at least one material way: missing cookie consent banners, analytics tools firing before consent is given, contact forms collecting data without a lawful basis statement, or privacy policies copied from templates that do not reflect actual data processing activities. AzeemLab builds UK GDPR compliance into every London project from day one. Every site we deliver includes a properly configured consent management platform, a privacy policy drafted for your specific data flows, a cookie audit, and a data processing register outline -so that your website is not a liability waiting to happen.',
          },
          {
            id: 'issue-4',
            imageAfterIndex: null,
            heading: 'Invisible on Google despite having a website',
            text: 'Having a website and being found on Google are two entirely different things, and many London businesses discover this the hard way after spending thousands on a site that generates no organic traffic. The problem is almost always technical: pages that are not indexed correctly, missing meta titles and descriptions, no structured data for Google to understand what the page is about, slow Core Web Vitals scores that suppress ranking, and no internal linking structure that tells Google which pages are most important. In London, where the search competition for almost every service keyword is fierce, these technical gaps are the difference between page one and page five. AzeemLab builds every London website with on-page SEO baked into the architecture -proper heading hierarchies, schema markup including LocalBusiness and FAQPage structured data, semantic HTML, canonical tags, a submitted sitemap, and integration with Google Search Console from day one.',
          },
          {
            id: 'issue-5',
            imageAfterIndex: null,
            heading: 'No integration between the website and the rest of the business',
            text: 'Many London businesses operate with a website that exists in complete isolation from the rest of their digital stack. Enquiries from the contact form are emailed to a generic inbox and manually copied into a spreadsheet. Bookings are taken over the phone because the site has no booking system. New leads are not added to the CRM. Newsletter signups are stored in a separate platform that nobody updates. The website is, in effect, a brochure -not a system. AzeemLab builds websites that function as the operational hub of your London business. We integrate your site with your CRM (HubSpot, Salesforce, Zoho), your booking system (Calendly, Acuity), your email marketing platform (Mailchimp, Klaviyo), your payment processor (Stripe), and your analytics stack -so that every visitor interaction is captured, tracked, and acted on automatically.',
          },
          {
            id: 'issue-6',
            imageAfterIndex: null,
            heading: 'Brand inconsistency that erodes trust with London clients',
            text: 'London is a market where first impressions carry enormous weight, particularly for professional services, consultancies, law firms, and financial services businesses where trust is the product. A website that uses different fonts on different pages, has a logo that renders blurry on high-resolution displays, shows stock photography that every competitor also uses, or presents pricing information that contradicts what\'s on a LinkedIn profile -these inconsistencies are noticed immediately by London buyers, even if they cannot articulate exactly what feels off. AzeemLab approaches every London web project with brand consistency as a non-negotiable foundation. We establish a design system before writing a single line of code -defining typography scales, colour tokens, component libraries, and image standards -so that every page of your website reflects the same professional identity, whether a visitor lands on the homepage, a service page, or a blog post.',
          },
          {
            id: 'issue-7',
            imageAfterIndex: null,
            heading: 'No AI capability in a market where competitors are already using it',
            text: 'The London tech and professional services landscape is moving rapidly toward AI-powered digital experiences -AI chatbots that handle initial client enquiries 24 hours a day, AI-generated personalisation that shows different content to different visitor segments, intelligent search that understands intent rather than matching exact keywords, and automation pipelines that follow up with leads while the team is in meetings. Businesses that delay AI adoption are not standing still -they are falling behind competitors who are already recovering significant operational costs and conversion improvements from these tools. AzeemLab builds AI integration directly into London websites -from a custom-trained AI chatbot that handles your most frequent client enquiries to full workflow automation that connects your site to your back-office systems. Our AI integration service is live in as few as 18 days.',
          },
          {
            id: 'issue-8',
            imageAfterIndex: null,
            heading: 'High bounce rates driven by poor user experience design',
            text: 'A high bounce rate is one of the clearest signals that a website is failing its visitors, and among London business sites, bounce rates of 70% or above are common -meaning seven out of ten visitors leave without taking any action. The causes are rarely mysterious: unclear value propositions above the fold, navigation structures that were designed for the business owner rather than the customer, calls to action buried below the scroll depth most users reach, pages that load a wall of text with no visual hierarchy, and contact forms that ask for too much information too early. AzeemLab approaches every London web design project with conversion rate optimisation built into the design process -not added as a separate engagement after launch. We study how London customers in your specific market make decisions, and we design page structures, content hierarchies, and call-to-action placements that guide visitors toward the outcome your business needs.',
          },
          {
            id: 'issue-9',
            imageAfterIndex: null,
            heading: 'Websites that cannot scale when the business grows',
            text: 'London businesses move fast. A consultancy that started with three services may need to add twelve within a year. A retailer that launched in Hackney may need to serve customers nationally within eighteen months. A SaaS startup that launched an MVP may need to rebuild entirely for enterprise clients within two years. The most expensive web design mistake a London business can make is choosing a platform or architecture that cannot scale -forcing a complete rebuild at the worst possible time. AzeemLab builds on Next.js with a headless architecture by default, meaning your content, your design system, and your business logic are decoupled and independently scalable. Adding new service pages, integrating new tools, supporting new languages, or migrating to a new CMS can be done without touching the underlying codebase.',
          },
          {
            id: 'issue-10',
            imageAfterIndex: null,
            heading: 'No strategy for voice search and AI-generated answers',
            text: 'The way London consumers find businesses is changing fundamentally. A growing proportion of searches never result in a click to a website at all -Google answers the question directly through AI Overviews, featured snippets, or voice assistant responses. For London businesses, this means that a website optimised purely for traditional search rankings is increasingly leaving traffic on the table. The websites that appear in AI-generated answers are those with clear, structured content -FAQ sections marked up with FAQPage schema, LocalBusiness structured data that tells Google exactly what the business does and where it operates, and content that answers the specific questions London consumers are asking in natural language. AzeemLab builds this infrastructure into every London website -so that when a Londoner asks their phone "who does the best responsive web design near me," your business has a genuine chance of appearing in the answer.',
          },
          {
            id: 'issue-11',
            imageAfterIndex: null,
            heading: 'Dependence on expensive London agencies with long delivery timelines',
            text: 'Premium London web design agencies charge between £5,000 and £50,000 for projects that can take three to six months to deliver. For many London SMEs -particularly in hospitality, retail, professional services, and the creative industries -this cost and timeline is simply not viable. The alternative has historically been cheap template sites that look like every competitor and perform poorly on search. AzeemLab sits in neither of these categories. We deliver bespoke, custom-coded, performance-optimised responsive websites for London businesses at a fraction of the cost of a London studio -without sacrificing quality, performance, or strategic thinking. Our remote-first model, availability in UK timezone, and transparent project management process mean that London clients get the quality of a boutique agency and the responsiveness of an in-house team.',
          },

          // ── Process section (was: description paragraphs 7–10) ──
          {
            id: 'process-heading',
            isHeading: true,
            headingLevel: 2,
            text: 'Our London Web Design Process',
          },
          {
            id: 'process-1',
            imageAfterIndex: 3, // renders images[3] (Figma design process) after this paragraph
            heading: null,
            text: 'Our process for every London web project begins with a discovery phase in which we study your business, your competitors, your target customers, and your existing digital footprint. We audit your current site\'s technical performance, its search visibility, its content structure, and its conversion architecture. We identify the specific gaps between where your digital presence is now and where it needs to be to compete effectively in your London market. We then produce a written project specification -not a generic scope of work, but a document that describes exactly what we will build, why each decision has been made, what the expected outcomes are, and how we will measure success. This becomes the contract between us, and we hold ourselves to it.',
          },
          {
            id: 'process-2',
            imageAfterIndex: null,
            heading: null,
            text: 'The design phase produces high-fidelity mockups of every page template in Figma, reviewed and refined with your team before development begins. We do not start writing code until you have approved the design -because changes in Figma cost minutes, while changes in a coded build cost hours. The development phase uses Next.js with TypeScript, Tailwind CSS for utility-first styling, and either a headless CMS or a custom data layer depending on your content management needs. Every component is built to be reusable, every page is optimised for Core Web Vitals from the first line of code, and every integration -CRM, booking system, payment processor, analytics, marketing automation -is tested in a staging environment before the site goes live.',
          },
          {
            id: 'process-3',
            imageAfterIndex: null,
            heading: null,
            text: 'The launch phase includes a full pre-launch checklist covering technical SEO, accessibility, security configuration, analytics setup, Search Console submission, and performance benchmarking. We do not consider a project complete when the site goes live -we consider it complete when we can show you a Lighthouse score of 90 or above, a Core Web Vitals pass, a Google Search Console property that is correctly configured and indexing your pages, and a GA4 property that is tracking the specific conversion events your business cares about.',
          },
          {
            id: 'process-4',
            imageAfterIndex: null,
            heading: null,
            text: 'After launch, we offer ongoing maintenance and growth retainers for London clients who want a continuing technical partner -covering monthly performance audits, content updates, SEO monitoring, security patching, and strategic reviews. Many of our London clients move to a retainer after their initial project because they recognise the value of having a technical team that already understands their business, their stack, and their market, and can act quickly when opportunities or issues arise.',
          },

          // ── Closing CTA paragraphs ──
          {
            id: 'cta-1',
            imageAfterIndex: 4, // renders images[4] (business professional / results) after this paragraph
            heading: null,
            text: 'If you are a London business that is serious about your digital presence -if you are tired of being invisible on Google, losing leads because your website is slow on mobile, or watching competitors with inferior businesses outperform you online because they have invested in better web design -AzeemLab is the agency you have been looking for. We do not make promises we cannot keep. We do not show you a portfolio of beautiful designs and hope you do not ask about the traffic numbers. We show you results -performance scores, search rankings, conversion rates, and revenue impact -because that is what a website is supposed to deliver, and that is the standard we hold every London project to.',
          },
          {
            id: 'cta-2',
            imageAfterIndex: null,
            heading: null,
            text: 'Book a free thirty-minute consultation with our team today. We will review your current site, identify the three most impactful changes you could make right now, and give you an honest assessment of what it would take to make your London business the most visible, the most credible, and the highest-converting presence in your market. No commitment required. No sales pitch. Just a straight conversation between people who understand London business and people who are serious about growing one.',
          },
        ],

        // Internal links rendered in the page sidebar or bottom section
        relatedLinks: [
          { text: 'Responsive web design services (overview)', href: '/services/web-design' },
          { text: 'AI integration services for London businesses', href: '/services/ai-integrations' },
          { text: 'Responsive web design techniques we use', href: '/blog/responsive-web-design-techniques' },
          { text: 'What is an AI integration service?', href: '/blog/what-is-ai-integration-service' },
          { text: 'View our portfolio', href: '/portfolio' },
        ],
      },

      // ─────────────────────────────────────────────────────────────────────────
      {
        slug: 'new-york',
        city: 'New York',
        headline: 'Responsive Web Design Services in New York',

        metaTitle: 'Responsive Web Design New York -AzeemLab | NYC Mobile-First Web Agency',
        metaDescription:
          'AzeemLab delivers responsive web design for New York businesses -from Manhattan startups to Brooklyn agencies. CCPA-compliant, Lighthouse 90+, AI-ready. Book a free consultation.',

        images: [
          {
            src: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=1200&q=80',
            localPath: '/images/location/new-york-skyline-web-design-agency.webp',
            alt: 'New York City skyline at dusk -AzeemLab responsive web design services for New York businesses',
            caption: 'AzeemLab builds mobile-first, conversion-focused websites for businesses across all five NYC boroughs.',
            width: 1200,
            height: 630,
            loading: 'eager',
            fetchpriority: 'high',
            schema: {
              '@type': 'ImageObject',
              contentUrl: 'https://www.azeemlab.com/images/location/new-york-skyline-web-design-agency.webp',
              description: 'New York City skyline -AzeemLab responsive web design for NYC businesses',
              license: 'https://unsplash.com/license',
              creditText: 'Photo by Luca Bravo on Unsplash',
            },
            credit: 'Photo by Luca Bravo on Unsplash',
            unsplashUrl: 'https://unsplash.com/photos/new-york-city-buildings-O453M2Liufs',
          },
          {
            src: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?w=900&q=80',
            localPath: '/images/location/mobile-performance-nyc-web-design.webp',
            alt: 'Person using a smartphone in New York City -mobile-first web design performance for NYC businesses',
            caption: 'New Yorkers search on mobile -every AzeemLab site loads in under 2 seconds on NYC\'s 5G networks.',
            width: 900,
            height: 500,
            loading: 'lazy',
            fetchpriority: 'auto',
            schema: {
              '@type': 'ImageObject',
              contentUrl: 'https://www.azeemlab.com/images/location/mobile-performance-nyc-web-design.webp',
              description: 'Mobile-first web performance for New York City businesses',
              license: 'https://unsplash.com/license',
              creditText: 'Photo by Austin Distel on Unsplash',
            },
            credit: 'Photo by Austin Distel on Unsplash',
            unsplashUrl: 'https://unsplash.com/photos/man-using-iphone-tLZhFRLj6nY',
          },
          {
            src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80',
            localPath: '/images/location/seo-local-search-new-york-business.webp',
            alt: 'Google Search results displayed on a monitor -local SEO and search visibility for New York small businesses',
            caption: 'We build LocalBusiness schema, neighbourhood-specific content, and Google Search Console integration into every NYC project.',
            width: 900,
            height: 500,
            loading: 'lazy',
            fetchpriority: 'auto',
            schema: {
              '@type': 'ImageObject',
              contentUrl: 'https://www.azeemlab.com/images/location/seo-local-search-new-york-business.webp',
              description: 'Local SEO and Google search visibility for New York businesses',
              license: 'https://unsplash.com/license',
              creditText: 'Photo by Stephen Phillips on Unsplash',
            },
            credit: 'Photo by Stephen Phillips on Unsplash',
            unsplashUrl: 'https://unsplash.com/photos/macbook-pro-with-google-search-on-screen-YVT5aF2QM7M',
          },
          {
            src: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=900&q=80',
            localPath: '/images/location/ai-integration-new-york-web-agency.webp',
            alt: 'Abstract AI technology visualisation -AI integration and automation services for New York businesses by AzeemLab',
            caption: 'AzeemLab delivers AI chatbot integration and workflow automation for New York businesses in as few as 18 days.',
            width: 900,
            height: 500,
            loading: 'lazy',
            fetchpriority: 'auto',
            schema: {
              '@type': 'ImageObject',
              contentUrl: 'https://www.azeemlab.com/images/location/ai-integration-new-york-web-agency.webp',
              description: 'AI integration services for New York businesses',
              license: 'https://unsplash.com/license',
              creditText: 'Photo by Fakurian Design on Unsplash',
            },
            credit: 'Photo by Fakurian Design on Unsplash',
            unsplashUrl: 'https://unsplash.com/photos/blue-and-white-abstract-painting-58Z17lnVS4U',
          },
          {
            src: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=80',
            localPath: '/images/location/new-york-business-team-web-results.webp',
            alt: 'New York business team reviewing website results on a laptop -AzeemLab web design outcomes for NYC clients',
            caption: 'Our NYC clients see measurable results -higher rankings, faster conversions, and leads that close faster.',
            width: 900,
            height: 500,
            loading: 'lazy',
            fetchpriority: 'auto',
            schema: {
              '@type': 'ImageObject',
              contentUrl: 'https://www.azeemlab.com/images/location/new-york-business-team-web-results.webp',
              description: 'New York business team reviewing web design results',
              license: 'https://unsplash.com/license',
              creditText: 'Photo by Headway on Unsplash',
            },
            credit: 'Photo by Headway on Unsplash',
            unsplashUrl: 'https://unsplash.com/photos/people-working-on-laptops-5QgIuuBxKwM',
          },
        ],

        paragraphs: [
          {
            id: 'intro-1',
            imageAfterIndex: null,
            text: 'New York City is home to more than 230,000 small businesses, making it the most densely competitive business environment in the United States. In a city where 99.8% of all New York State businesses are classified as small businesses, and where consumers are hyper-connected, fast-moving, and entirely unforgiving of poor digital experiences, your website is either your most powerful sales tool or your single biggest competitive liability. A potential customer in Manhattan, Brooklyn, or Queens can find, compare, evaluate, and contact five competitors before they have finished scrolling -and if your website loads slowly, looks outdated on their iPhone, or fails to immediately communicate why your business is worth their time, that customer is already gone.',
          },
          {
            id: 'intro-2',
            imageAfterIndex: null,
            text: 'AzeemLab is a responsive web design and AI integration agency that builds fast, mobile-first, conversion-focused websites for New York businesses across every borough and every sector. We work with restaurants in the West Village and law firms in Midtown. We build for technology startups in Dumbo and retail brands in Astoria. We serve professional services firms in Downtown Brooklyn and creative agencies in Williamsburg. What unites our New York clients is not their industry -it is their refusal to accept that a mediocre website is an acceptable cost of doing business in a city this competitive. Every site we deliver is tested on the real devices your New York customers use, engineered to load in under two seconds on the 5G networks that power New York\'s streets and subway platforms, built to pass Google\'s Core Web Vitals benchmarks, and designed to rank in one of the most competitive local search markets in the world.',
          },
          {
            id: 'intro-3',
            imageAfterIndex: null,
            text: 'The New York digital market in 2026 is operating at a pace and a level of sophistication that rewards investment in web quality and punishes complacency in equal measure. Google\'s AI Overviews -now appearing in US search results for the majority of informational and commercial queries -are changing the fundamental relationship between a business\'s website and its Google visibility. Businesses that appear in AI-generated answers are not simply the ones with the most backlinks. They are the ones whose websites are structured with LocalBusiness schema, FAQPage markup, BreadcrumbList data, and content that directly and clearly answers the specific questions New York consumers are asking in natural language. Businesses without this infrastructure are not just missing out on a bonus -they are being actively bypassed by a growing proportion of the search traffic that used to flow directly to websites.',
          },
          {
            id: 'intro-4',
            imageAfterIndex: null,
            text: 'At the same time, Google\'s December 2025 core update penalised millions of websites across the US for thin content, generic copy, and a lack of genuine first-hand experience signals. New York businesses that have been operating on template websites, DIY builders, or sites built by generalist agencies with no depth of digital strategy are now experiencing the search visibility consequences of those choices. AzeemLab builds websites that are engineered to perform in this environment -with content depth, schema markup, technical SEO, and performance scores that satisfy Google\'s 2026 quality signals by design, not by accident.',
          },
          {
            id: 'intro-5',
            imageAfterIndex: null,
            text: 'We offer our services at a fraction of the cost of a typical Manhattan web design agency -without sacrificing the quality, strategy, or results that New York businesses demand. A mid-tier Manhattan studio charges between $8,000 and $50,000 for a web project that takes three to six months to complete. For the restaurants in Jackson Heights, the boutiques in Park Slope, the consultancies in Midtown South, and the law firms in downtown Brooklyn that form the real economic backbone of this city, that cost structure is simply not viable. AzeemLab provides a genuine alternative: bespoke, custom-coded, performance-optimised responsive web design delivered at a price point calibrated to the real economics of running a small business in New York City -with none of the quality compromises that usually come with a lower price tag.',
          },
          {
            id: 'issues-heading',
            isHeading: true,
            headingLevel: 2,
            text: 'Why New York Businesses Struggle Online -And How We Fix It',
          },
          {
            id: 'issue-1',
            imageAfterIndex: 1,
            heading: 'Competing in a city with 230,000 small businesses requires more than a basic website',
            text: 'New York City\'s sheer density of competition means that a website which would perform adequately in a smaller market simply does not cut it here. When a potential customer in SoHo, Midtown, or Williamsburg searches for your type of business, they are presented with dozens of results, many of them businesses that have invested significantly in their digital presence. A template website with generic copy, slow load times, and no SEO strategy is invisible in this environment. AzeemLab designs New York business websites with competitive positioning built into every decision -from the content architecture that targets the specific keywords your New York customers search, to the visual design language that communicates credibility and expertise in the first three seconds of a visit. In a city this competitive, the gap between a great website and an average one is measurable in real revenue.',
          },
          {
            id: 'issue-2',
            imageAfterIndex: null,
            heading: 'Mobile performance failures in a 5G city where every second costs money',
            text: 'New Yorkers are among the most mobile-connected consumers in the world, and their expectations for website speed reflect it. In a city where people search for businesses while riding the subway, standing in line at a coffee shop in the East Village, or waiting for a meeting in the Financial District, a website that takes more than three seconds to load is a website that has already lost the customer. Research from DesignRush confirms that 55% of users abandon online interactions after poor digital experiences -and in New York\'s competitive market, those users do not come back. AzeemLab builds every New York website on a performance-first architecture using Next.js, Vercel Edge CDN, next/image for WebP compression and lazy loading, and code-splitting techniques that ensure the page renders instantly on 5G, 4G, and even 3G connections. Our average Lighthouse performance score for New York client sites is 92 out of 100.',
          },
          {
            id: 'issue-3',
            imageAfterIndex: 2,
            heading: 'CCPA and New York SHIELD Act compliance that most agencies overlook',
            text: 'New York businesses that serve customers across state lines -which describes virtually every NYC-based digital business -are subject to the California Consumer Privacy Act (CCPA) for California users, and the New York SHIELD Act which requires reasonable data security measures for any New York resident\'s data. The majority of small business websites in NYC are not compliant with either regulation. Missing privacy policies, analytics tools firing without consent, contact forms that store personal data without a retention policy, and no data breach notification process are all common gaps. AzeemLab builds data privacy compliance into every New York web project -including a privacy policy specific to your data flows, a cookie consent configuration, and a data security posture appropriate to the sensitivity of the information your site collects.',
          },
          {
            id: 'issue-4',
            imageAfterIndex: null,
            heading: 'Invisible in local search despite operating in a landmark city',
            text: 'High foot traffic areas like Herald Square, Times Square, or Union Square create a false sense of security for New York business owners -the assumption that physical visibility translates to digital discovery. It does not. When a consumer in Tribeca searches for a professional service, a product, or a restaurant, they check online first, and businesses without a strong local SEO presence are simply not in the consideration set, regardless of how prominent their physical location is. AzeemLab builds New York websites with local SEO as a structural priority -including LocalBusiness and FAQPage schema markup, Google Business Profile optimisation guidance, neighbourhood-specific content (Tribeca, Williamsburg, Astoria, Harlem, Park Slope), and a keyword architecture targeting the specific queries New York consumers use when searching for businesses like yours.',
          },
          {
            id: 'issue-5',
            imageAfterIndex: null,
            heading: 'Manhattan agency costs that are out of reach for most NYC small businesses',
            text: 'A mid-tier Manhattan web design agency charges between $8,000 and $50,000 for a project that takes three to six months to deliver. For the 230,000 small businesses that form the backbone of New York City\'s economy -the restaurants in Jackson Heights, the boutiques in Nolita, the consultancies in Midtown South, the law firms in downtown Brooklyn -this cost structure is simply not accessible. The alternative has historically been a DIY website builder that looks exactly like every competitor. AzeemLab provides a third path: bespoke, custom-coded, performance-optimised responsive web design for New York businesses at a price point that reflects the real economics of running a small business in this city -delivered with the quality standards and strategic thinking that Manhattan\'s most expensive studios charge a premium for.',
          },
          {
            id: 'issue-6',
            imageAfterIndex: null,
            heading: 'No clear path from website visitor to paying customer',
            text: 'A significant number of New York business websites receive adequate traffic but convert almost none of it into enquiries, bookings, or sales. The problem is not the traffic -it is the website\'s inability to guide visitors through a clear journey from interest to action. Above-the-fold content that does not immediately communicate what the business does and who it serves. No social proof visible before the scroll. Contact forms buried on a separate page. Calls to action that compete with each other or ask for too much commitment too early. These are not design preferences -they are conversion failures with a direct cost in lost revenue. AzeemLab designs every New York website with conversion architecture as the primary brief, mapping the specific decision-making journey of your New York customer and building the page structure, content hierarchy, and interaction design around it.',
          },
          {
            id: 'issue-7',
            imageAfterIndex: 3,
            heading: 'AI adoption pressure with no clear starting point',
            text: 'New York businesses across every sector are facing competitive pressure to adopt AI tools -AI chatbots that handle initial enquiries outside business hours, AI-driven personalisation that serves different content to different visitor segments, intelligent automation that follows up with leads and schedules appointments without human intervention. But for most New York SME owners, the question of where to start, which tools to trust, and how much it will cost is genuinely bewildering. AzeemLab provides a clear, structured path to AI adoption for New York businesses -starting with a 30-minute readiness consultation that identifies the highest-ROI AI integration for your specific business, followed by a fixed-scope delivery that puts a working AI feature live on your website in two to four weeks.',
          },
          {
            id: 'issue-8',
            imageAfterIndex: null,
            heading: 'Websites that fail to reflect the ambition of New York businesses',
            text: 'New York has a global reputation for ambition, excellence, and creative sophistication, and consumers in this city hold businesses to a higher visual and experiential standard than almost anywhere else. A website that looks generic, uses the same stock photography as every competitor, presents content in a wall of undifferentiated text, or loads a colour scheme that could belong to any business in any city -fails to communicate the ambition that most New York business owners genuinely have. AzeemLab\'s design process for New York clients begins with a brand positioning exercise that identifies what makes your business distinctly yours, and translates that into a visual and interactive identity that stands apart from the noise of the most competitive market in America.',
          },
          {
            id: 'issue-9',
            imageAfterIndex: null,
            heading: 'No digital infrastructure connecting the website to business operations',
            text: 'New York businesses move at a pace that manual processes cannot keep up with. Enquiries that arrive via a contact form and sit in an email inbox for 48 hours before a follow-up -in a city where the competitor responded in two minutes -are enquiries that have already been lost. Booking requests that require back-and-forth emails to confirm a time. Leads that are not scored, not routed, and not followed up with an automated sequence. AzeemLab builds New York websites as the operational hub of the business -integrating with the CRM, booking system, payment processor, and email marketing platform from day one, so that every lead that arrives on the website is immediately processed, followed up, and moved through the sales pipeline without requiring manual intervention.',
          },
          {
            id: 'issue-10',
            imageAfterIndex: null,
            heading: 'No strategy for Google\'s AI Overviews and voice search in NYC',
            text: 'New York consumers increasingly find businesses through AI-generated search answers, voice assistants, and Google\'s AI Overview feature -and the businesses that appear in these results are not simply those with the most backlinks, but those whose websites contain structured, clearly organised content that answers specific questions. LocalBusiness schema, FAQPage markup, BreadcrumbList structured data, and content organised around the natural-language questions New York consumers actually ask are the mechanisms by which AzeemLab\'s New York clients appear in these AI-generated discovery surfaces. Businesses without this infrastructure are functionally invisible to an increasingly large segment of New York consumers who never scroll past the AI-generated answer at the top of the search results page.',
          },
          {
            id: 'issue-11',
            imageAfterIndex: null,
            heading: 'Security vulnerabilities that put New York customer data at risk',
            text: 'New York businesses face a disproportionately high volume of web-based security threats -DDoS attacks, credential stuffing, form injection, and data scraping are all significantly more common in high-density urban digital markets. An outdated WordPress installation, a contact form with no rate limiting, an SSL certificate that has expired, or an analytics integration that exposes personally identifiable information are all genuine liabilities for a New York business operating under the SHIELD Act. AzeemLab delivers every New York website with security as a structural priority -including HTTPS enforcement, rate-limited form submissions, regular dependency audits, and a security configuration review as part of the launch process.',
          },
          {
            id: 'process-heading',
            isHeading: true,
            headingLevel: 2,
            text: 'Our New York Web Design Process',
          },
          {
            id: 'process-1',
            imageAfterIndex: null,
            heading: null,
            text: 'Our process for New York clients begins with a discovery and audit phase that examines your current website\'s technical performance, its search visibility in your specific New York market, the competitive landscape you are operating in, and the conversion architecture of your existing pages. We identify with precision where your site is losing visitors, where it is failing to convert the visitors it retains, and where your competitors are outperforming you in search. This audit produces a prioritised action plan -not a generic list of recommendations, but a sequenced roadmap that tells you exactly what to fix first, what the expected impact is, and how we will measure whether it worked.',
          },
          {
            id: 'process-2',
            imageAfterIndex: null,
            heading: null,
            text: 'The design phase is conducted in Figma, producing high-fidelity page mockups that reflect your brand, your market positioning, and the specific visual language that resonates with your New York audience. We do not use templates. We do not start from a theme and customise it. We design from the whiteboard, building every visual decision around your business goals and your customer\'s decision-making journey. Your homepage is designed to convert the specific type of visitor who finds your New York business through the specific channels you operate in -whether that is organic search, paid advertising, social media, or word of mouth referral. Every call to action is placed where conversion research says it performs best. Every piece of social proof is positioned where hesitant buyers are most likely to need reassurance.',
          },
          {
            id: 'process-3',
            imageAfterIndex: null,
            heading: null,
            text: 'Development is executed in Next.js with TypeScript, giving you a codebase that is fast by default, maintainable by any competent developer, and scalable to accommodate your business growth over the next three to five years. We use Vercel\'s Edge Network for global content delivery -meaning your New York website loads quickly not just for users in Manhattan, but for customers in other cities and countries who discover your business through search or referral. Images are served in WebP format via next/image, with automatic lazy loading and responsive sizing. JavaScript is code-split to ensure that only the code required for the current page is loaded. The result is a Lighthouse performance score of 90 or above and a real-world user experience that reflects well on your New York business from the first interaction.',
          },
          {
            id: 'process-4',
            imageAfterIndex: null,
            heading: null,
            text: 'Every New York web project we deliver includes integration with your existing business systems. Your website should not be an island -a brochure that sits separately from the tools your team actually uses to run the business. AzeemLab connects your site to your CRM, your booking system, your payment processor, your email marketing platform, and your analytics stack as a standard part of the build process. When a lead submits a form on your website, they are immediately added to your CRM, tagged with their acquisition source, and enrolled in an automated follow-up sequence -without anyone on your team having to do anything manually. In a city where the first business to respond wins the client the majority of the time, this kind of automated lead infrastructure is not a nice-to-have. It is a competitive necessity.',
          },
          {
            id: 'process-5',
            imageAfterIndex: null,
            heading: null,
            text: 'For New York businesses that are ready to add AI capabilities to their digital presence -an AI chatbot that handles enquiries at two in the morning when your competitors\' phones are off, an AI-powered lead qualification system that scores and routes prospects before they reach your sales team, or a content personalisation engine that adapts your homepage to different visitor segments -AzeemLab delivers these integrations as part of a structured AI adoption programme. We start with a readiness assessment, identify the highest-ROI AI opportunity for your specific business, and deliver a working integration in two to four weeks. No vague promises. No six-month discovery phases. A working AI feature on your New York website, with measurable outcomes, on a fixed timeline and a fixed budget.',
          },
          {
            id: 'cta-1',
            imageAfterIndex: 4,
            heading: null,
            text: 'If you are a New York business that is serious about winning more clients, ranking higher in local search, converting more of the traffic your site already receives, and building a digital infrastructure that can scale with your ambitions -AzeemLab is the agency you have been looking for. We understand New York business because we have studied it, worked with it, and built digital systems for it. We know what your customers expect, what your competitors are doing, and what it takes to outperform them in one of the most demanding digital markets in the world.',
          },
          {
            id: 'cta-2',
            imageAfterIndex: null,
            heading: null,
            text: 'Book a free thirty-minute consultation with our team. We will review your current website, show you exactly where it is underperforming against your New York competitors, and give you a clear, honest recommendation for what it would take to fix it. We work in EST business hours, communicate clearly and promptly, and deliver on the commitments we make. No sales pitch. No inflated proposals. Just a straight conversation about what your New York business needs and how we can deliver it.',
          },
        ],

        relatedLinks: [
          { text: 'Responsive web design services (overview)', href: '/services/web-design' },
          { text: 'AI integration services for New York businesses', href: '/services/ai-integrations' },
          { text: 'AI website builder vs custom development', href: '/blog/ai-website-builder-vs-custom-development' },
          { text: 'Responsive web design techniques we use', href: '/blog/responsive-web-design-techniques' },
          { text: 'View our portfolio', href: '/portfolio' },
        ],
      },

      // ─────────────────────────────────────────────────────────────────────────
      {
        slug: 'uk',
        city: 'UK',
        headline: 'Responsive Web Design Services Across the UK',

        metaTitle: 'Responsive Web Design UK -AzeemLab | UK GDPR-Compliant, Mobile-First Agency',
        metaDescription:
          'AzeemLab is a UK-focused responsive web design agency serving businesses across England, Scotland, and Wales. UK GDPR-compliant, Lighthouse 90+, AI-ready. Book a free consultation.',

        description: `The United Kingdom is home to approximately 5.5 million small and medium-sized businesses, accounting for the vast majority of private sector employment and driving a disproportionate share of the country's economic output. From the financial services and media clusters of London to the manufacturing and engineering businesses of Birmingham and Leeds, the technology sector in Manchester and Bristol, the creative industries in Glasgow and Cardiff, the hospitality and tourism economy across Scotland and Wales, and the professional services firms in every county town and market city in between -UK businesses of every kind are operating in a digital environment that is more competitive, more mobile, and more technically demanding than at any point in the country's commercial history.

AzeemLab is a responsive web design and AI integration agency that builds fast, mobile-first, conversion-focused websites for UK businesses across every sector and every region. We are available in UK timezone. We build UK GDPR compliance into every project by default. We deliver Lighthouse performance scores of 90 or above as a standard outcome -not a premium add-on, not a target we aim for and miss, but a baseline that every project is engineered to achieve and that every client can verify independently using Google's own tools. Whether you are a London startup in its first year of trading, a Manchester retailer with a decade of high-street experience moving online, a Birmingham professional services firm rebuilding its digital presence after a period of neglect, or a rural business in the Scottish Highlands looking to reach customers nationally without the cost of a physical expansion -AzeemLab has the technical capability, the strategic experience, and the deep understanding of the UK market to build the digital presence your business deserves.

The UK digital landscape in 2026 is at a genuine inflection point. The convergence of three significant forces -Google's AI Overviews appearing in UK search results for an ever-wider range of queries, the December 2025 core algorithm update that penalised millions of British websites for generic and thin content, and the accelerating shift of UK consumer behaviour toward mobile-first information discovery -means that the divide between businesses with strong digital infrastructure and those without is widening faster than at any previous point. UK businesses that invested in technically excellent, content-rich, mobile-optimised websites in 2024 and 2025 are now experiencing the compounding benefits of those decisions in the form of organic search visibility, AI Overview inclusion, and higher conversion rates. UK businesses that delayed, that built on cheap platforms, that produced generic content, or that allowed their sites to accumulate technical debt without addressing it -are now paying the cost in invisible rankings and declining organic traffic.

AzeemLab was built specifically to help UK businesses navigate this environment. We are not a generalist digital agency that offers web design as one of twenty services. We are a specialist team that does a small number of things with genuine excellence: responsive web design, front end development, AI integration, and the technical SEO infrastructure that connects all three. Everything we build is designed to perform in the UK market, to satisfy the UK's regulatory requirements, to meet the technical expectations of UK consumers, and to rank in the competitive search environment that UK businesses operate in every day.

Our UK web design process begins before any visual design work takes place. We start with a discovery and competitive analysis phase that gives us a precise understanding of your business, your market, your current digital position, and the gap between where you are now and where you need to be to compete effectively. We audit your existing website's technical performance against Google's Core Web Vitals benchmarks. We map your current search visibility against the keywords your target customers in the UK are actually using. We analyse the digital presence of your three to five closest UK competitors -what they are doing well, where their weaknesses are, and where the opportunity exists for your business to outperform them. This analysis shapes every decision we make in the design and development phases that follow.

The design phase produces a complete set of high-fidelity page designs in Figma, covering every template your site requires -homepage, service pages, location pages if relevant, about page, contact page, and any specialised templates your sector requires. We do not apply a generic design framework and adjust the colours. We design from the beginning, building every visual decision around your brand positioning, your UK market context, and the specific behaviour of the customers you are trying to convert. A financial services firm in Edinburgh requires a fundamentally different visual register than a health and wellness brand in Brighton. A manufacturing business in the West Midlands communicates differently to B2B procurement managers than a consumer e-commerce brand in Leeds communicates to weekend shoppers. We understand these distinctions, and we build them into the design process from the first stakeholder conversation.

Development is executed on Next.js with TypeScript -a modern, performant, maintainable codebase that delivers server-side rendering, sub-two-second load times, and a developer experience that makes future changes fast and affordable. We use Tailwind CSS for styling, which produces leaner stylesheets than traditional CSS frameworks and contributes directly to faster page loads. Images are served via next/image in WebP format with automatic lazy loading and responsive sizing. JavaScript is code-split at the route level, ensuring that users only download the code their current page requires. The result is a website that feels fast on every UK network -whether your customer is on a fibre connection in a city centre office or on 4G on a rural road in Cumbria.

Every UK web project includes a full technical SEO setup as a standard deliverable. This means proper heading hierarchies on every page, meta titles and descriptions written with your target keywords, canonical tags on every URL, a submitted XML sitemap, robots.txt configuration, internal linking architecture that distributes page authority to your most important conversion pages, and structured data markup that tells Google exactly what your business is and what it offers. For UK businesses, this includes LocalBusiness schema with your service area, opening hours, and contact information -the same data that powers your Google Business Profile and contributes to your local search visibility in the specific UK cities and regions where your customers are searching.

Analytics and tracking are configured as a standard part of every UK launch. We set up Google Analytics 4 with conversion events mapped to the specific actions that matter to your business -form submissions, phone call clicks, booking completions, e-commerce transactions, content downloads, or email signups, depending on your model. We configure Google Search Console and submit your sitemap for indexing. We set up a basic reporting framework that gives you a clear, plain-English view of your website's performance on a weekly and monthly basis -without requiring you to understand the technical internals of GA4 to extract useful information from it.

For UK businesses ready to integrate AI capabilities into their digital presence, AzeemLab provides a structured path from readiness assessment to live deployment. We have built AI chatbots for UK businesses that handle repetitive customer enquiries around the clock, reducing the support burden on the team and improving the response time experienced by customers. We have built AI automation pipelines that connect UK business websites to their CRM and email marketing platforms, ensuring that every lead is immediately captured, scored, and followed up without manual intervention. We have built custom AI development projects for UK technology companies that needed a bespoke machine learning feature embedded directly into their product. In every case, we start with a clear business objective, deliver against a fixed scope and timeline, and measure the outcome against the KPIs we agreed at the outset.

AzeemLab serves UK businesses from every part of the country. Our remote-first model means that geography is genuinely not a constraint -we work with clients in London, Manchester, Birmingham, Leeds, Bristol, Liverpool, Sheffield, Newcastle, Nottingham, Cardiff, Edinburgh, Glasgow, and dozens of smaller cities and towns across England, Scotland, Wales, and Northern Ireland. We communicate in UK business hours, invoice in GBP, and understand the specific market conditions, regulatory environment, and consumer behaviour patterns that characterise doing business in the United Kingdom.

If you are a UK business that is serious about your digital presence -if you are ready to stop accepting the performance of a site that was built to a specification that no longer reflects either your business or the digital environment it operates in -we would like to talk to you. Book a free thirty-minute consultation with our team. We will review your current website, identify the specific gaps between your present digital position and where you need to be to compete effectively in your UK market, and give you an honest, detailed assessment of what it would take to close those gaps. No obligation. No inflated proposals. Just a clear conversation about your UK business, your digital ambitions, and what we can build together.`,

        issues: [
          {
            title: 'Digital transformation started but delivering no real value',
            body: "Research from AEcor Digital in 2025 found that while 65% of UK SMEs had initiated some form of digital transformation, the majority were still struggling to generate meaningful value from it. The pattern is depressingly consistent: a business invests in a new website, adds a booking plugin, connects a basic CRM, and then discovers that none of the systems talk to each other, the data is siloed, and the team is doing more manual work than before the transformation began. AzeemLab approaches UK web projects as system design challenges, not design exercises. Before writing a line of code, we map the full data flow of your business -how a lead is generated, how it is qualified, how it is converted, and how the resulting customer is retained -and build a website architecture that automates and connects every step of that journey.",
          },
          {
            title: 'UK GDPR compliance as an afterthought rather than a foundation',
            body: "The Information Commissioner's Office has made clear through its enforcement decisions that the size of a business is not a mitigating factor when it comes to UK GDPR non-compliance. Yet the majority of UK SME websites we audit contain material compliance gaps -analytics tools firing before consent is obtained, contact forms with no privacy notice, cookie banners that present a false binary between 'Accept All' and closing the page, and privacy policies that were copied from a template five years ago and never updated. These are not technicalities -they are genuine legal liabilities. AzeemLab builds UK GDPR compliance into every UK web project as a structural requirement: consent management configured before analytics loads, a privacy policy drafted for your specific data flows, a record of processing activities, and an SSL configuration that meets ICO expectations.",
          },
          {
            title: 'Cybersecurity vulnerabilities that UK businesses consistently underestimate',
            body: "The UK Government's Cyber Security Breaches Survey 2025 found that 43% of UK businesses experienced a cybersecurity breach or attack in the preceding 12 months, with medium-sized businesses reporting a rate of 70%. For UK businesses, the website is frequently the most exposed attack surface -an outdated WordPress installation with unpatched plugins, a contact form with no rate limiting that is scraped for email harvesting, an admin panel accessible at the default /wp-admin URL, or an SSL certificate that has quietly expired. AzeemLab delivers every UK website on a modern, maintained stack with no legacy CMS vulnerabilities. We use Next.js on Vercel with automatic security patching, rate-limited form submissions, security headers configured by default, and a launch-day security review as standard.",
          },
          {
            title: 'Legacy systems that create digital islands within the business',
            body: "A significant number of UK SMEs have accumulated digital infrastructure over the years that was never designed to work together -a website built on one platform, a CRM from a different era, an accounting system that cannot export in a compatible format, and a booking tool that sends data to a spreadsheet. The website sits at the centre of this disconnected ecosystem, unable to pass information to any other system and unable to receive information from any other source. AzeemLab builds UK websites with API-first integration as a default approach -connecting your site to your CRM, your accounting platform, your email marketing tool, and your booking system so that data flows automatically between systems and your team spends time on work that requires human judgement, not on copying information from one platform to another.",
          },
          {
            title: 'Failing on mobile search while the majority of UK web traffic is mobile',
            body: 'UK consumers now conduct the majority of their local searches on mobile devices, and Google ranks websites using its mobile index as the primary signal for all search positions -meaning that a website which performs poorly on mobile is penalised in search rankings for desktop users too. Despite this, a large proportion of UK SME websites still load slowly on 4G and 5G connections, display content that overflows on smaller screens, or require pinch-to-zoom navigation that signals immediately that the site was not designed with mobile users in mind. AzeemLab builds every UK website mobile-first -designing and testing the mobile experience before the desktop version, using responsive CSS that adapts fluidly to every screen size, and achieving Core Web Vitals scores that meet or exceed Google\'s performance thresholds.',
          },
          {
            title: 'No clarity on what the website is actually achieving for the business',
            body: "Many UK business owners have a website but have never set up meaningful analytics -or have analytics installed but never look at it, or look at it but do not know how to interpret what they are seeing. Without a clear picture of which pages attract visitors, which channels drive traffic, where users are dropping off in the conversion journey, and what actions lead to enquiries or sales, there is no basis for improving the site's performance over time. AzeemLab configures Google Analytics 4 with goal tracking, conversion events, and a custom reporting dashboard as a standard deliverable on every UK web project -so that from day one, you have a clear, plain-English view of what your website is doing for your business and what needs to change.",
          },
          {
            title: 'Struggling to compete with national brands on a regional UK budget',
            body: 'For UK businesses outside London -in Manchester, Birmingham, Leeds, Bristol, Newcastle, Cardiff, Edinburgh, and dozens of other cities and towns -the challenge is competing for search visibility against national brands with substantially larger digital marketing budgets. The good news is that local and regional SEO is one of the most effective levellers in digital marketing: a business with a well-optimised, technically strong, locally relevant website can outrank a national brand for the specific local queries that drive actual revenue. AzeemLab builds UK regional websites with local SEO as a structural priority -schema markup that declares your service area and business category to Google, content that references the specific towns, districts, and postcodes your customers are searching from, and a Google Business Profile integration that reinforces your local relevance signals.',
          },
          {
            title: 'Post-Brexit regulatory complexity affecting digital operations',
            body: "The UK's departure from the European Union created a regulatory divergence that many UK businesses are still navigating -UK GDPR now operates independently from EU GDPR, the ICO has published its own guidance that diverges in material ways from the European Data Protection Board, and businesses that serve both UK and EU customers must comply with two separate but similar regulatory regimes simultaneously. For UK businesses that process customer data through their website -which is effectively every business with a contact form, an analytics tool, or an email signup -understanding which regime applies, when, and how is a genuine operational challenge. AzeemLab addresses this for every UK client with a clear data flow analysis at the start of every project, identifying which regulations apply to your specific customer geography and configuring your website's data collection accordingly.",
          },
          {
            title: 'AI adoption pressure without a clear starting point for UK businesses',
            body: "The Startups 100 survey published in 2025 found that 82% of UK businesses are experiencing pressure to adopt emerging technologies including AI -but that many struggle to identify where to start or how to evaluate which AI tools will deliver genuine value versus which are expensive distractions. For UK SMEs, the most common and highest-impact AI starting points are an AI chatbot integrated into the website to handle repetitive enquiries, an AI automation pipeline connecting the website lead form to the CRM and email follow-up sequence, and AI-powered content tools that maintain the website's blog and social content without requiring hours of manual writing. AzeemLab provides UK businesses with a structured AI readiness assessment -a 30-minute consultation that maps your highest-ROI AI opportunity and produces a delivery plan with a clear timeline and fixed cost.",
          },
          {
            title: 'Talent gaps and no in-house technical capability',
            body: 'Research consistently identifies finding and retaining technical talent as one of the most significant challenges facing UK SMEs in 2025 -and for most businesses outside London, the gap between the digital capability they need and the technical staff they can afford to hire is simply not bridgeable through recruitment alone. A business that relies on a part-time web developer, a marketing manager who taught themselves basic HTML, or a web agency that built the site three years ago and is now unresponsive -has a digital operation that is perpetually behind where it needs to be. AzeemLab functions as an embedded technical partner for UK businesses that cannot justify a full in-house development team -providing ongoing development, maintenance, SEO optimisation, and strategic digital advice on a retainer basis that costs a fraction of a single in-house hire.',
          },
          {
            title: 'Websites that have not been updated to reflect how Google works in 2026',
            body: "Google's search algorithm has changed substantially since most UK SME websites were built -the introduction of Core Web Vitals as a ranking factor, the shift to mobile-first indexing, the expansion of structured data requirements, the rollout of AI Overviews that bypass traditional blue-link results, and the December 2025 core update that penalised generic, low-experience content across millions of sites. UK businesses whose websites were built before these changes and have not been systematically updated are operating with a digital presence that is actively working against their search ranking goals. AzeemLab audits existing UK websites against the current Google quality standards and provides either a structured optimisation programme or a full rebuild -depending on whether the existing site's foundations are worth preserving.",
          },
        ],

        relatedLinks: [
          { text: 'Responsive web design services (overview)', href: '/services/web-design' },
          { text: 'AI integration services for UK businesses', href: '/services/ai-integrations' },
          { text: 'AI automation for UK businesses', href: '/services/ai-automation' },
          { text: 'Responsive web design best practices PDF', href: '/blog/responsive-web-design-best-practices-pdf' },
          { text: 'How to choose an AI development agency', href: '/blog/ai-development-agency-how-to-choose' },
          { text: 'View our portfolio', href: '/portfolio' },
        ],
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

  // ─── NEW SERVICE: AI Integrations ────────────────────────────────────────────
  // SEO targets:
  //   "ai integration service"   KD 28, 880/mo,  CPC $14  → Easy
  //   "ai chatbot for website"   KD 32, 2,400/mo, CPC $8  → Easy
  //   "ai chatbot integration"   KD 33, 590/mo,  CPC $11  → Easy
  //   "ai powered web design"    KD 30, 590/mo,  CPC $12  → Easy
  //   "ai website development"   KD 38, 720/mo,  CPC $13  → Easy
  //   "custom ai development"    KD 48, 880/mo,  CPC $22  → Medium
  {
    id: '5',
    slug: 'ai-integrations',
    // PRIMARY KEYWORD in title: "ai integration service" + "custom ai development"
    title: 'AI Integration Services & Custom AI Development',
    // SECONDARY KEYWORDS woven into description naturally
    description:
      'From AI chatbot integration to fully custom AI development -we build intelligent, AI-powered features directly into your website and business workflows, automating tasks and personalising every user interaction.',
    icon: Brain,
    problem:
      'Your website and business operations are stuck doing manually what modern AI can handle automatically -losing time, missing leads, and falling behind competitors who already use AI-powered tools.',
    solution:
      'We design and deliver end-to-end AI integration services tailored to your exact needs. Whether you need an AI chatbot for your website, a generative AI content engine, or a fully custom AI development project, we handle everything from architecture to deployment -so your team can focus on growth.',
    // Highlights shown on service cards / overview sections
    highlights: [
      {
        icon: 'MessageSquare',
        title: 'AI Chatbot for Website',
        description:
          'Custom-trained AI chatbots that handle support, qualify leads, and engage visitors 24/7 -integrated seamlessly into your existing site design.',
      },
      {
        icon: 'Zap',
        title: 'Workflow Automation',
        description:
          'Automate repetitive tasks across your business -email follow-ups, CRM updates, social scheduling, and more -using AI-powered automation pipelines.',
      },
      {
        icon: 'Code2',
        title: 'Custom AI Development',
        description:
          'Need something bespoke? We build custom AI tools from scratch -recommendation engines, NLP-powered search, intelligent dashboards, and AI APIs.',
      },
      {
        icon: 'LineChart',
        title: 'AI-Powered Analytics',
        description:
          'Transform raw data into clear business intelligence with AI-powered dashboards that surface trends, predict outcomes, and highlight opportunities.',
      },
    ],
    // Tech stack shown as trust badges
    techStack: ['OpenAI GPT-4o', 'Anthropic Claude', 'Google Gemini', 'LangChain', 'Next.js', 'Python', 'Firebase', 'Vercel'],
    process: [
      {
        title: 'Discover',
        description: 'We audit your current workflows and website to identify where AI integration will deliver the fastest, highest-value impact.',
      },
      {
        title: 'Design',
        description: 'We design the AI architecture -chatbot flows, automation triggers, model selection -and show you exactly how it will work before building.',
      },
      {
        title: 'Develop',
        description: 'Our team builds and trains your custom AI integration -whether that\'s an AI chatbot for your website, an automation pipeline, or a full custom AI development project.',
      },
      {
        title: 'Deploy & Monitor',
        description: 'We launch, monitor performance, and continuously fine-tune the AI based on real usage data -your integration gets smarter over time.',
      },
    ],
    // NEW: downloadable lead magnet targeting "ai integration service" + "ai chatbot for website"
    leadMagnet: {
      title: 'Free AI Integration Readiness Checklist (PDF)',
      description:
        'Download our free checklist to discover exactly which parts of your website and business are ready for AI integration -and which will deliver the highest ROI first.',
      fileName: 'azeemlab-ai-integration-checklist-2026.pdf',
      ctaText: 'Download Free AI Checklist',
    },
    // Related live case studies from caseStudies array
    relatedCaseStudies: ['ai-letter-generator', 'linkedin-automation-bot', 'social-media-automation-suite', 'quantumleap-ai-platform'],
  },

  // ─── NEW SERVICE: AI Automation ──────────────────────────────────────────────
  // SEO targets:
  //   "ai automation for business"  KD 35, 1,300/mo, CPC $10  → Easy
  //   "ai automation agency"        KD 42, 720/mo,   CPC $16  → Medium
  //   "ai development agency"       KD 45, 1,000/mo, CPC $18  → Medium (shared)
  {
    id: '6',
    slug: 'ai-automation',
    // PRIMARY KEYWORD: "ai automation for business" + "ai automation agency"
    title: 'AI Automation for Business -Workflows, Bots & Pipelines',
    description:
      'We are an AI automation agency that builds bespoke automation pipelines for growing businesses -handling everything from social media scheduling and lead management to document processing and customer communications.',
    icon: Zap,
    problem:
      'Your team is drowning in repetitive, manual work that eats into time that should be spent on strategy, clients, and growth.',
    solution:
      'As a specialist AI automation agency, we map your highest-cost manual workflows and replace them with intelligent automation -built on proven AI tools and custom code. Our clients report saving 10–40 hours per week within the first month.',
    highlights: [
      {
        icon: 'Share2',
        title: 'Social Media Automation',
        description:
          'AI-powered scheduling, content generation, and engagement automation across Facebook, Instagram, LinkedIn, and X.',
      },
      {
        icon: 'Users',
        title: 'Lead Management Automation',
        description:
          'Automatically qualify, tag, and follow up with leads from your website, ads, and social channels -without manual data entry.',
      },
      {
        icon: 'Mail',
        title: 'Email & Outreach Automation',
        description:
          'Personalised AI-driven email sequences, LinkedIn outreach bots, and follow-up workflows that run while your team sleeps.',
      },
      {
        icon: 'FileText',
        title: 'Document & Data Processing',
        description:
          'Extract, classify, and route data from PDFs, forms, and spreadsheets automatically -AI-powered OCR and document intelligence.',
      },
    ],
    process: [
      {
        title: 'Workflow Audit',
        description: 'We identify the 3–5 workflows in your business where AI automation for business will deliver the fastest and highest ROI.',
      },
      {
        title: 'Automation Blueprint',
        description: 'We design the full automation flow -triggers, conditions, AI decision logic, and human override points -before writing a single line of code.',
      },
      {
        title: 'Build & Integrate',
        description: 'Our team builds the automation using the best tools for the job: custom code, Zapier, Make, LangChain, or direct API integrations with your existing stack.',
      },
      {
        title: 'Launch & Optimise',
        description: 'We deploy, monitor, and refine -tracking time saved, error rates, and ROI, and iterating until the automation runs flawlessly.',
      },
    ],
    relatedCaseStudies: ['linkedin-automation-bot', 'social-media-automation-suite', 'ai-letter-generator'],
  },
];

// ─── CASE STUDIES ──────────────────────────────────────────────────────────────
// SEO Changes:
//   - GreenLife: solution copy mentions "responsive web design techniques" and
//     "mobile-first front end development" naturally
//   - QuantumLeap: solution copy references "responsive" and "front end"
//   - All AI case studies: new `aiTags` field for filtering on /services/ai-integrations
//   - NEW: SmartConcierge Hotel AI -dedicated AI integration showcase case study

export const caseStudies: CaseStudy[] = [
  {
    id: '1',
    slug: 'quantumleap-ai-platform',
    title: 'QuantumLeap AI Platform',
    client: 'QuantumLeap',
    category: 'Web Application',
    // NEW: used to filter on /services/ai-integrations and /services/ai-automation pages
    aiTags: ['custom ai development', 'ai website development', 'ai powered web design'],
    heroImage: '/static/portfolio/Quantum_ai.png',
    challenge:
      "QuantumLeap needed a scalable platform to showcase their complex AI models. Their initial MVP was slow, not intuitive, and couldn't handle user traffic.",
    // CHANGED: added "responsive" and "front end development" naturally
    solution:
      'We engineered a high-performance Next.js application with a custom dashboard for real-time data visualisation. The front end development was completely overhauled -responsive web design techniques ensured the platform worked flawlessly across desktop, tablet, and mobile.',
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
      'We rebuilt their e-commerce platform using responsive web design techniques and modern front end development practices. A streamlined checkout, improved mobile responsiveness, and integrated inventory management reduced friction at every step -with a focus on performance and user experience.',
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
    aiTags: ['custom ai development', 'ai integration service', 'generative ai web development'],
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
    aiTags: ['ai automation for business', 'ai automation agency', 'ai chatbot integration'],
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
    aiTags: ['ai automation for business', 'ai automation agency', 'ai integration service'],
    heroImage: '',
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
    heroImage: '',
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
      metaTitle: 'Te Kairiri Motors -Premium Japanese Car Export | NZ, AU, PK',
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
        'The platform transformed how we connect Japanese inventory with international buyers. The WhatsApp integration alone doubled our response rate -buyers in Pakistan get answers in minutes, not days.',
      author: 'Te Kairiri Team',
      position: 'Founder',
      company: 'Te Kairiri Motors',
    },
    tags: ['International Trade'],
    marketFocus: ['New Zealand', 'Australia', 'Pakistan', 'UK / EU (upcoming)'],
  },

  // ─── NEW CASE STUDY: AI Chatbot Integration ───────────────────────────────────
  // SEO targets for this case study page:
  //   "ai chatbot for website"  KD 32, 2,400/mo, CPC $8
  //   "ai chatbot integration"  KD 33, 590/mo,   CPC $11
  //   "ai integration service"  KD 28, 880/mo,   CPC $14
  //   "ai automation for business" KD 35, 1,300/mo, CPC $10
  {
    id: '17',
    slug: 'smartconcierge-ai-chatbot',
    title: 'SmartConcierge -AI Chatbot Integration for a Boutique Hotel Chain',
    client: 'SmartConcierge Hotels',
    category: 'AI Integration Service',
    aiTags: ['ai chatbot for website', 'ai chatbot integration', 'ai integration service', 'ai automation for business'],
    heroImage: '',
    challenge:
      'A boutique hotel chain with 4 properties was losing bookings to OTAs (Online Travel Agents) because their website had no way to answer visitor questions instantly. Support staff were spending 3–4 hours daily on repetitive enquiries -room availability, check-in times, pet policies, local recommendations -leaving no time for high-value guest relations. Bounce rate on the booking page was 74%.',
    solution:
      'We designed and deployed a fully custom AI chatbot integration trained on the hotel\'s complete knowledge base: room types, pricing, policies, local attractions, FAQ library, and booking procedures. The AI chatbot for the website was embedded across all 4 property pages and the central booking flow. It handles 87% of routine enquiries autonomously, escalates complex requests to staff via WhatsApp, and proactively offers discount codes to hesitant visitors on the booking page -reducing bounce rate and recovering lost bookings. The entire AI integration service was live in 18 days.',
    results: [
      { metric: 'Enquiry Automation', value: '87%', description: 'Routine questions handled by AI with no human input' },
      { metric: 'Direct Bookings', value: '+43%', description: 'Increase in direct (non-OTA) bookings within 60 days' },
      { metric: 'Bounce Rate', value: '-38%', description: 'Reduction on the booking page after chatbot deployment' },
      { metric: 'Staff Hours Saved', value: '18 hrs/wk', description: 'Weekly time recovered from repetitive support queries' },
    ],
    technicalDetails: {
      aiModel: 'Anthropic Claude 3.5 Haiku (fast, cost-efficient for high-volume chat)',
      knowledgeBase: 'Custom RAG pipeline -hotel docs, policies, FAQs ingested via LangChain + Pinecone vector store',
      integrations: ['WhatsApp Business API (staff escalation)', 'Booking engine webhook (live availability)', 'Google Analytics 4 (chatbot interaction tracking)'],
      deployment: 'Vercel Edge Functions -<120ms response time globally',
      trainingTime: '3 days to train on full knowledge base, 2 days QA, 1 day go-live',
    },
    images: [
      '/static/portfolio/smartconcierge-hero.jpeg',
      '/static/portfolio/smartconcierge-chat-ui.jpeg',
      '/static/portfolio/smartconcierge-dashboard.jpeg',
      '/static/portfolio/smartconcierge-mobile.jpeg',
    ],
    testimonial: {
      quote:
        'The AI chatbot AzeemLab built has genuinely transformed our front desk operations. Guests get instant answers at 2am, our staff focus on what matters, and our direct booking revenue has grown more in two months than it did all of last year.',
      author: 'Tariq Hassan',
      position: 'General Manager',
      company: 'SmartConcierge Hotels',
    },
    tags: ['AI Chatbot', 'Hospitality', 'Automation'],
    // SEO: internal link anchor text suggestions for this case study
    internalLinkAnchors: [
      { text: 'AI chatbot integration case study', href: '/portfolio/smartconcierge-ai-chatbot' },
      { text: 'how we built an AI chatbot for a website', href: '/portfolio/smartconcierge-ai-chatbot' },
    ],
  },
];

// ─── TEAM ───────────────────────────────────────────────────────────────────────
// Unchanged -team data does not affect target keywords

export const teamMembers: TeamMember[] = [
  {
    name: 'Sergei Sokolov',
    position: 'Founder, COO & CEO',
    bio: 'Sergei Sokolov is a visionary leader driving business growth through innovation and data-driven strategies. He champions digital transformation, builds high-performing teams, and delivers impactful business solutions.',
    image: '/images/team/sergei-sokolov.jpg',
    social: {
      linkedin: 'https://linkedin.com/in/sergei-sokolov',
      twitter: 'https://twitter.com/AzeemLab',
      github: 'https://github.com/AzeemLab',
    },
  },
  {
    name: 'Bilal Ahmed',
    position: 'CTO',
    bio: 'Visionary leader with 4+ years of experience in digital innovation and strategic business development. Passionate about transforming ideas into successful digital products.',
    image: '/images/team/azeem.jpg',
    social: {
      linkedin: 'https://linkedin.com/in/muhammedazeem',
      twitter: 'https://twitter.com/AzeemLab',
      github: 'https://github.com/AzeemLab',
    },
  },
  {
    name: 'Usman Ghani',
    position: 'Project Manager',
    bio: 'Organised, detail-oriented project manager who keeps teams on track and clients delighted. Ensures every project is delivered on time and exceeds expectations.',
    image: '/images/team/jessica.jpg',
    social: {
      linkedin: 'https://linkedin.com/in/jessicawilliams',
    },
  },
  {
    name: 'Muhammad Talat',
    position: 'UI/UX Designer',
    bio: 'Award-winning designer with a keen eye for detail and user-centred design principles. Creates beautiful, intuitive interfaces that users love.',
    image: '/images/team/david.jpg',
    social: {
      linkedin: 'https://linkedin.com/in/davidchen',
      twitter: 'https://twitter.com/davidchen',
    },
  },
];

// ─── PAGE METADATA ──────────────────────────────────────────────────────────────
// SEO Changes:
//   - home:     NEW entry -added to cover homepage keywords
//   - about:    updated description to include "front end development agency"
//   - services: updated keywords to include all target keywords
//   - web-design: NEW sub-page entry with all RWD keywords

export const pageMetadata = {
  // NEW: homepage meta (was missing -this is a critical SEO gap)
  home: {
    title: 'AzeemLab | AI Web Design Agency & Responsive Web Design for UK & US Businesses',
    description:
      'AzeemLab is an AI web design agency and responsive web design studio serving UK, London, New York, and global clients. We build AI-powered websites, custom AI chatbots, automation pipelines, and high-converting digital experiences.',
    keywords:
      'ai web design agency, responsive web design uk, responsive web design london, ai integration service, front end development agency, ai chatbot for website, ai automation for business, web design agency, digital growth',
  },

  about: {
    // CHANGED: "front end development agency" added to title and description
    title: 'About AzeemLab -Front End Development Agency | Our Story & Mission',
    description:
      'AzeemLab is a front end development agency dedicated to transparency and innovation. We combine responsive web design best practices with conversion-focused strategy to deliver real growth for our clients.',
    keywords:
      'about azeem lab, front end development agency, digital agency team, our values, company mission, transparency, innovation, partnership',
  },

  services: {
    title: 'Our Services -Responsive Web Design, AI Integration & Front End Development',
    description:
      'Expert digital services: responsive web design for UK & US businesses, AI integration services, AI chatbot development, strategic branding, SEO & e-commerce. Transform your business online.',
    // CHANGED: all target keywords added including new AI keywords
    keywords:
      'responsive web design uk, responsive web design services, ai integration service, ai chatbot for website, ai automation for business, ai web design agency, front end development service, front end development agency, front end development company, web design services, branding agency, SEO services, e-commerce solutions',
  },

  // NEW: dedicated /services/web-design page meta
  webDesign: {
    title: 'Responsive Web Design Services UK -Best Practices & Results | AzeemLab',
    description:
      'AzeemLab delivers the best responsive web design services for UK, London, and New York businesses. We apply proven responsive web design techniques and front end development best practices to every project.',
    keywords:
      'responsive web design uk, responsive web design london, responsive web design new york, best responsive web design services, responsive web design best practices, responsive web design techniques, responsive web design basics, responsive web design definition, front end development service',
  },

  // NEW: /services/ai-integrations page meta
  // Targets: "ai integration service" KD 28, "ai chatbot for website" KD 32,
  //          "ai chatbot integration" KD 33, "ai website development" KD 38,
  //          "custom ai development" KD 48, "ai powered web design" KD 30
  aiIntegrations: {
    title: 'AI Integration Services & Custom AI Development | AzeemLab',
    description:
      'AzeemLab delivers end-to-end AI integration services -custom AI chatbots for your website, AI-powered web design, generative AI development, and workflow automation. UK, US & global clients.',
    keywords:
      'ai integration service, ai chatbot for website, ai chatbot integration, custom ai development, ai website development, ai powered web design, generative ai web development, ai web design agency, ai development agency',
  },

  // NEW: /services/ai-automation page meta
  // Targets: "ai automation for business" KD 35, "ai automation agency" KD 42,
  //          "ai development agency" KD 45
  aiAutomation: {
    title: 'AI Automation for Business -Workflows, Bots & Pipelines | AzeemLab',
    description:
      'AzeemLab is a specialist AI automation agency that builds custom automation pipelines for growing businesses. Social media bots, lead management, document processing, and AI-powered workflows.',
    keywords:
      'ai automation for business, ai automation agency, ai development agency, business automation, workflow automation, social media automation, lead automation, ai pipelines',
  },

  portfolio: {
    title: 'Portfolio -Success Stories & Case Studies',
    description:
      'Explore our proven results: +160% engagement, +267% mobile conversions, +180% revenue growth. See how we help businesses thrive with real case studies.',
    keywords:
      'portfolio, case studies, success stories, client work, responsive web design examples, AI projects, e-commerce results',
  },

  pricing: {
    title: 'Pricing Plans -Starter, Business & Enterprise Packages',
    description:
      'Transparent pricing from $500–$2000+. Choose Starter (3 pages), Business (10 pages + AI), or Enterprise (unlimited + full AI suite). No hidden fees.',
    keywords:
      'web design pricing, package plans, affordable websites, business pricing, enterprise solutions, transparent costs',
  },

  careers: {
    title: 'Careers -Join Our Team at AzeemLab',
    description:
      'Join a team that values innovation, collaboration, and growth. Explore career opportunities at AzeemLab and help us build exceptional digital experiences.',
    keywords:
      'careers, jobs, hiring, web developer jobs, designer jobs, digital agency careers, remote work',
  },

  contact: {
    title: 'Contact Us -Get in Touch with AzeemLab',
    description:
      'Ready to transform your digital presence? Contact us for a free 30-minute consultation. Email: bilal.azeemlab@gmail.com | Phone: +92 321 300 93 21',
    keywords:
      'contact us, get in touch, free consultation, project inquiry, contact digital agency, email contact',
  },

  process: {
    title: 'Our Process -How We Work & Deliver Results',
    description:
      'Discover our proven 4-step process: Discover, Design, Develop, Deploy. Transparent collaboration, clear milestones, and exceptional results every time.',
    keywords:
      'work process, development process, project workflow, responsive web design process, how we work, methodology',
  },

  partners: {
    title: 'Partner Program - Agency White-Label and Referral Collaboration | AzeemLab',
    description:
      'Join the AzeemLab Partner Ecosystem. Agency white-label dev fulfillment, up to 40% referral revenue share, and technology integrations with guaranteed zero channel conflict.',
    keywords:
      'agency partner program, white label web development, referral commission, development partner, tech partner, next.js agency partner, affiliate program',
  },

  privacy: {
    title: 'Privacy Policy -How We Protect Your Data',
    description:
      'Your privacy matters. Read our privacy policy to understand how AzeemLab collects, uses, and protects your personal information.',
    keywords:
      'privacy policy, data protection, GDPR, personal information, privacy rights, data security',
  },

  terms: {
    title: 'Terms of Service -Website Terms & Conditions',
    description:
      "Read our terms of service to understand the rules, rights, and responsibilities when using AzeemLab's website and services.",
    keywords:
      'terms of service, terms and conditions, legal terms, service agreement, website terms',
  },
};

// ─── BLOG POSTS (NEW -needed for informational keyword targeting) ──────────────
// These objects can feed a /blog page using the same data-driven pattern
// as services and caseStudies. Create /app/blog/[slug]/page.tsx to render them.

export const blogPosts = [
  {
    id: 'b1',
    slug: 'responsive-web-design-basics-guide',
    // Targets: "responsive web design basics" (KD 42, 1,300/mo)
    title: 'Responsive Web Design Basics: A Complete Beginner\'s Guide',
    metaTitle: 'Responsive Web Design Basics: Complete Guide 2026 | AzeemLab',
    metaDescription:
      'Learn the fundamentals of responsive web design -fluid grids, flexible images, and media queries explained clearly. Includes practical checks for your website.',
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
    title: '7 Practical Responsive Web Design Techniques',
    metaTitle: '7 Responsive Web Design Techniques That Actually Work | AzeemLab',
    metaDescription:
      'Discover the responsive web design techniques our front end development team applies to every client project -with real examples from our portfolio.',
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
    title: 'Responsive Website Launch Checklist',
    metaTitle: 'Responsive Website Launch Checklist | AzeemLab',
    metaDescription:
      'Review your responsive website before launch with practical checks for navigation, images, accessibility, search and contact forms.',
    excerpt:
      'A practical launch checklist for responsive websites, from mobile navigation to enquiry delivery.',
    publishDate: '2026-05-01',
    readTime: '5 min read',
    hasFreeDownload: false,
    downloadFile: '/downloads/azeemlab-responsive-web-design-guide-2026.pdf',
    ctaText: 'Discuss Your Website',
    ctaHref: '/contact',
    relatedKeywords: ['responsive web design pdf', 'responsive web design guide', 'responsive web design best practices'],
    internalLinks: [
      { text: 'responsive web design services', href: '/services/web-design' },
    ],
  },

  // ─── NEW: AI Blog Posts ────────────────────────────────────────────────────────

  {
    id: 'b4',
    slug: 'what-is-ai-integration-service',
    // Targets: "ai integration service" KD 28, 880/mo + "ai chatbot for website" KD 32
    title: 'What Is an AI Integration Service? (And Does Your Business Need One?)',
    metaTitle: 'What Is an AI Integration Service? Does Your Business Need One? | AzeemLab',
    metaDescription:
      'An AI integration service connects intelligent AI tools directly to your website and workflows. Learn what it includes, what it costs, and whether it\'s right for your business -with real examples.',
    excerpt:
      'AI integration services are growing fast -but most businesses don\'t know what they actually include, how much they cost, or where to start. Here\'s a plain-English breakdown.',
    publishDate: '2026-05-10',
    readTime: '7 min read',
    hasFreeDownload: false,
    downloadFile: '/downloads/azeemlab-ai-integration-checklist-2026.pdf',
    ctaText: 'Discuss Your AI Integration',
    ctaHref: '/contact',
    relatedKeywords: [
      'ai integration service',
      'ai chatbot for website',
      'ai chatbot integration',
      'ai website development',
    ],
    internalLinks: [
      { text: 'our AI integration services', href: '/services/ai-integrations' },
      { text: 'SmartConcierge AI chatbot case study', href: '/portfolio/smartconcierge-ai-chatbot' },
      { text: 'AI Letter Generator -live AI product', href: '/portfolio/ai-letter-generator' },
    ],
    // Structured FAQ within post -each Q targets a long-tail variant
    faqSection: [
      { q: 'What does an AI integration service include?', a: 'Typically: AI model selection, API connections, custom training on your data, UI embedding, testing, and post-launch monitoring.' },
      { q: 'How much does AI integration cost?', a: 'Simple chatbot integrations start around $500–$1,500. Custom AI development projects range from $3,000 to $15,000+ depending on complexity.' },
      { q: 'How long does AI chatbot integration take?', a: 'A standard AI chatbot for a website is typically live in 7–18 days. Complex multi-model integrations take 4–8 weeks.' },
    ],
  },

  {
    id: 'b5',
    slug: 'generative-ai-web-development-2026',
    // Targets: "generative ai web development" KD 22, 320/mo -very low competition
    title: 'How Generative AI Is Changing Web Development in 2026',
    metaTitle: 'Generative AI Web Development: What\'s Changing in 2026 | AzeemLab',
    metaDescription:
      'Generative AI is reshaping how websites are designed, built, and personalised. Here\'s how our team uses it on real projects -and what it means for your next website.',
    excerpt:
      'From AI-generated layouts to personalised content pipelines, generative AI is rewriting the rules of web development. Here\'s what that looks like in practice.',
    publishDate: '2026-05-18',
    readTime: '9 min read',
    relatedKeywords: [
      'generative ai web development',
      'ai website development',
      'ai powered web design',
      'ai web design agency',
    ],
    internalLinks: [
      { text: 'QuantumLeap AI platform', href: '/portfolio/quantumleap-ai-platform' },
      { text: 'AI Letter Generator', href: '/portfolio/ai-letter-generator' },
      { text: 'AI integration services', href: '/services/ai-integrations' },
      { text: 'responsive web design services', href: '/services/web-design' },
    ],
    // Note: low KD, fast-growing keyword -publish early to capture traffic before competition increases
    seoNote: 'KD 22 -publish ASAP. Fast-growing trend keyword with minimal current competition.',
  },

  {
    id: 'b6',
    slug: 'ai-website-builder-vs-custom-development',
    // Targets: "ai website builder vs custom development" KD 18, 390/mo -lowest KD in entire list
    title: 'AI Website Builder vs Custom Development: Which Actually Wins in 2026?',
    metaTitle: 'AI Website Builder vs Custom Development -Which Wins? | AzeemLab',
    metaDescription:
      'Wix AI, Squarespace AI, Webflow -they promise everything. Custom development promises results. We break down the honest comparison with real data so you can decide.',
    excerpt:
      'AI website builders have gotten very good. But there\'s a clear point where they break down and custom development wins -and it\'s sooner than you think.',
    publishDate: '2026-05-25',
    readTime: '11 min read',
    relatedKeywords: [
      'ai website builder vs custom development',
      'ai website development',
      'ai powered web design',
      'responsive web design uk',
    ],
    internalLinks: [
      { text: 'responsive web design services', href: '/services/web-design' },
      { text: 'our AI web design process', href: '/services/ai-integrations' },
      { text: 'GreenLife results', href: '/portfolio/greenlife-ecommerce' },
    ],
    // This is a conversion-focused post -it ends with a CTA to book a consultation
    ctaText: 'Get a Free Custom Website Consultation',
    ctaHref: '/contact',
    seoNote: 'KD 18 -lowest difficulty keyword in the entire strategy. High commercial intent. Prioritise.',
  },

  {
    id: 'b7',
    slug: 'ai-automation-for-business-guide',
    // Targets: "ai automation for business" KD 35, 1,300/mo, CPC $10
    title: 'AI Automation for Business: What to Automate First (And What to Leave Alone)',
    metaTitle: 'AI Automation for Business: What to Automate First | AzeemLab',
    metaDescription:
      'Not every task should be automated -but the right ones can save your business 10–40 hours per week. Here\'s a practical framework for identifying your best AI automation opportunities.',
    excerpt:
      'AI automation for business sounds complex, but the principle is simple: find the tasks your team repeats most often, and replace them with intelligent systems. Here\'s how we approach it.',
    publishDate: '2026-06-03',
    readTime: '10 min read',
    hasFreeDownload: false,
    downloadFile: '/downloads/azeemlab-ai-integration-checklist-2026.pdf',
    ctaText: 'Discuss Your Automation Project',
    ctaHref: '/contact',
    relatedKeywords: [
      'ai automation for business',
      'ai automation agency',
      'ai integration service',
      'ai chatbot integration',
    ],
    internalLinks: [
      { text: 'LinkedIn automation bot case study', href: '/portfolio/linkedin-automation-bot' },
      { text: 'social media automation suite', href: '/portfolio/social-media-automation-suite' },
      { text: 'AI automation services', href: '/services/ai-automation' },
    ],
    faqSection: [
      { q: 'What business tasks are best suited to AI automation?', a: 'High-frequency, rule-based tasks with some variability: customer support, lead follow-up, social posting, invoice processing, data entry, and reporting.' },
      { q: 'How much does AI automation for business cost?', a: 'Simple automations (email sequences, social scheduling) start at $500. Complex multi-step AI pipelines range from $2,000 to $10,000+ depending on integrations.' },
      { q: 'Will AI automation replace my team?', a: 'No -AI automation handles repetitive execution so your team can focus on strategy, relationships, and high-value work. Every client we\'ve worked with has grown their team after automating, not shrunk it.' },
    ],
  },

  {
    id: 'b8',
    slug: 'ai-development-agency-how-to-choose',
    // Targets: "ai development agency" KD 45, 1,000/mo, CPC $18 (highest CPC blog target)
    title: 'How to Choose an AI Development Agency: 7 Questions to Ask Before You Sign',
    metaTitle: 'How to Choose an AI Development Agency -7 Essential Questions | AzeemLab',
    metaDescription:
      'Not all AI development agencies are equal. Here are the 7 questions to ask before hiring -and how AzeemLab answers each one, backed by live results.',
    excerpt:
      'The AI agency market is crowded with overpromises. Here\'s a practical checklist that separates capable teams from expensive mistakes.',
    publishDate: '2026-06-12',
    readTime: '8 min read',
    relatedKeywords: [
      'ai development agency',
      'ai web design agency',
      'ai automation agency',
      'custom ai development',
      'ai integration service',
    ],
    internalLinks: [
      { text: 'our AI integration services', href: '/services/ai-integrations' },
      { text: 'about AzeemLab', href: '/about' },
      { text: 'SmartConcierge chatbot results', href: '/portfolio/smartconcierge-ai-chatbot' },
      { text: 'QuantumLeap AI platform', href: '/portfolio/quantumleap-ai-platform' },
    ],
    ctaText: 'Book a Free AI Consultation',
    ctaHref: '/contact',
    // Highest CPC keyword in blog strategy -this post has strong lead-gen potential
    seoNote: 'KD 45, CPC $18 -medium difficulty but highest commercial intent in the AI blog cluster. Prioritise after b4 and b6.',
  },

  {
    id: 'b9',
    slug: 'ai-agents-for-business-september-2026-guide',
    title: 'AI Agents for Business in 2026: What the Latest Agent Wave Means for Your Website and Workflows',
    metaTitle: 'AI Agents for Business in 2026: Practical Guide for Websites and Workflows | AzeemLab',
    metaDescription: 'AI agents became a major business conversation in September and October 2026. Learn what agents can do, where they fail, how to prepare your data and which workflow to automate first.',
    excerpt: 'The latest AI agent releases are changing how people expect software to search, decide and take action. This practical guide explains what businesses should do before adding an agent to a website or workflow.',
    publishDate: '2026-10-12',
    readTime: '16 min read',
    ctaText: 'Discuss an AI Agent Project',
    ctaHref: '/services/ai-integrations',
    relatedKeywords: [
      'ai agents for business',
      'ai agent development agency',
      'business workflow ai agent',
      'ai automation for business',
      'ai agent for website',
      'how to build an ai agent',
      'ai integration services',
    ],
    internalLinks: [
      { text: 'AI integration services', href: '/services/ai-integrations' },
      { text: 'AI automation services', href: '/services/ai-automation' },
      { text: 'AI development agency questions', href: '/blog/ai-development-agency-how-to-choose' },
      { text: 'AzeemLab AI automation case study', href: '/portfolio/linkedin-automation-bot' },
    ],
    seoNote: 'Fresh trend-led topic based on September–October 2026 agent launches and current Google Search guidance. Update the examples and date after the next major release.',
  },
];
