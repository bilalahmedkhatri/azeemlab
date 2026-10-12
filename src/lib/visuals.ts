export type SiteVisual = { src: string; alt: string; caption: string; width: number; height: number };
const visual = (name: string, alt: string, caption: string): SiteVisual => ({ src: `/images/insights/${name}.webp`, alt, caption, width: 1200, height: 800 });
export const agencyVisual: SiteVisual = {
  src: '/images/agency/responsive-web-design-ai-integration.webp', width: 1200, height: 800,
  alt: 'Illustration of a responsive website on desktop and phone connected to an AI chatbot and workflow tools',
  caption: 'Responsive websites, useful AI integrations and connected business workflows.',
};
export const serviceVisuals: Record<string, SiteVisual> = {
  'web-design': visual('responsive-website-layout', 'Illustration of the same website layout adapted to a desktop browser and a phone', 'One responsive website, adapted for desktop and mobile visitors.'),
  branding: visual('brand-identity-system', 'Illustration of a geometric brand mark, coordinated colour palette and consistent page elements', 'A consistent visual identity connects your logo, colour palette and everyday design.'),
  seo: visual('technical-seo-review', 'Illustration of a search results page alongside a technical website review checklist', 'Search visibility starts with useful pages and a technically accessible website.'),
  ecommerce: visual('ecommerce-checkout', 'Illustration of an online store product grid beside a checkout and order confirmation', 'Help customers move from product discovery to a clear checkout journey.'),
  'ai-integrations': visual('ai-chatbot-knowledge-flow', 'Diagram showing knowledge documents connected to an AI assistant and a website chat conversation', 'An AI website assistant connects approved knowledge with customer questions; scope includes human handoff.'),
  'ai-automation': visual('business-workflow-automation', 'Diagram of an incoming task connected to a processing step, approval and linked business tools', 'Connect inputs, business tools and review steps in a practical automation workflow.'),
};
export const articleVisuals: Record<string, SiteVisual> = {
  'responsive-web-design-basics-guide': serviceVisuals['web-design'],
  'responsive-web-design-techniques': visual('responsive-layout-techniques', 'Diagram comparing a two-column desktop layout with a stacked mobile layout', 'Flexible layouts reorganize the same content as the available screen space changes.'),
  'responsive-web-design-best-practices-pdf': visual('website-launch-checklist', 'Illustration of a website preview beside four completed launch checklist items', 'Review layout, performance, search access and the enquiry journey before launch.'),
  'what-is-ai-integration-service': serviceVisuals['ai-integrations'],
  'generative-ai-web-development-2026': agencyVisual,
  'ai-website-builder-vs-custom-development': visual('website-builder-vs-custom', 'Illustration comparing a uniform template layout with a more customized website arrangement', 'Compare a template approach with a custom layout against your actual project requirements.'),
  'ai-automation-for-business-guide': serviceVisuals['ai-automation'],
  'ai-development-agency-how-to-choose': visual('project-discovery-checklist', 'Illustration of a project evaluation checklist and a discovery conversation', 'Discuss scope, ownership, support and evidence before choosing a development partner.'),
  'ai-agents-for-business-september-2026-guide': agencyVisual,
};
