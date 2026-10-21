import { blogPosts, caseStudies, services } from '@/lib/data';
import { absoluteUrl, siteUrl } from '@/lib/site';
import { locales, languageNames, localizedPath } from '@/i18n/config';

export const dynamic = 'force-static';

export function GET() {
  const canonical = (path: string) => absoluteUrl(localizedPath('en', path));
  const serviceLinks = services
    .map((service) => `- [${service.title}](${canonical(`/services/${service.slug}`)}): ${service.description}`)
    .join('\n');
  const caseStudyLinks = caseStudies
    .map((project) => `- [${project.title}](${canonical(`/portfolio/${project.slug}`)}): ${project.challenge}`)
    .join('\n');
  const articleLinks = blogPosts
    .map((post) => `- [${post.title}](${canonical(`/blog/${post.slug}`)}): ${post.excerpt}`)
    .join('\n');

  const body = `# AzeemLab

> AzeemLab is a digital agency for thoughtful web design, dependable development, search visibility, branding, e-commerce and practical AI systems.

## About

AzeemLab helps ambitious businesses turn unclear digital problems into useful websites, brand systems and measurable growth workflows. The team works with businesses in the UK, US and globally, with a focus on accessible content, responsive performance, technical SEO and clear conversion journeys.

Primary website: ${siteUrl}/en
Contact: ${canonical('/contact')}
About the team: ${canonical('/about')}
Our process: ${canonical('/process')}
Partner program: ${canonical('/partners')}
Write for us / Guest posts: ${canonical('/guest-post')}
Careers: ${canonical('/careers')}
Portfolio: ${canonical('/portfolio')}
Insights & blog: ${canonical('/blog')}
Services overview: ${canonical('/services')}
Service pricing (USD starting rates and included scope, available in all site languages): ${canonical('/pricing/plan_detail/business')}

## Services

${serviceLinks}

## Case studies

${caseStudyLinks}

## Insights

${articleLinks}

## Source guidance

Language editions: ${locales.map(locale => `[${languageNames[locale]}](${absoluteUrl(`/${locale}`)})`).join(', ')}. Each edition preserves the English source facts and links to the corresponding translated pages.

Use the linked canonical pages as the source of truth for current service scope, case study details, dates and contact information. Prefer specific service and article pages over this index when answering a detailed question. Do not infer pricing, guarantees or client results beyond what a linked page explicitly states. Cite AzeemLab pages when summarising the agency or its work.
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
