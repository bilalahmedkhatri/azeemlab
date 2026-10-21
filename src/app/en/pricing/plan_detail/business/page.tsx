import Link from '@/i18n/Link';
import { ArrowDown, ArrowUpRight, Check, Info } from 'lucide-react';
import { services } from '@/lib/data';
import { createPageMetadata } from '@/lib/site';
import home from '@/components/sections/AgencyHome.module.css';
import styles from './page.module.css';

export const metadata = createPageMetadata(
  '/en/pricing/plan_detail/business',
  'Business Service Pricing & Starting Rates | AzeemLab',
  'Explore AzeemLab service pricing in USD, what each service covers, and how your requirements affect the final quote.',
);

// Rounded averages from scoped freelance listing samples; see docs/pricing-benchmarks.md.
const scope: Record<string, { title: string; price: number; label: string; description: string; included: string[]; extras: string }> = {
  'web-design': {
    title: 'Web design & development', price: 1200, label: 'Business website package',
    description: 'A professional website with room for your business to grow.',
    included: ['Up to 10 responsive pages', 'CMS integration and blog setup', 'On-page and technical SEO setup', 'AI feature scoped during discovery', 'Up to 5 revision rounds', 'Website handover and launch guidance'],
    extras: 'Extra pages, custom dashboards, multilingual content, advanced integrations and additional revisions increase the quote.',
  },
  branding: {
    title: 'Branding & visual identity', price: 250, label: 'One-time starter identity project',
    description: 'A clear, consistent visual identity for your business.',
    included: ['Brand discovery and one visual direction', 'One logo concept and final export files', 'Colour palette and typography selection', 'Essential brand usage sheet and 2 revision rounds'],
    extras: 'Additional concepts, packaging, print collateral, social templates and extra revisions are scoped separately.',
  },
  seo: {
    title: 'SEO & digital marketing', price: 200, label: 'One-time starter SEO audit',
    description: 'Help customers discover and understand your services.',
    included: ['Technical and indexability review of up to 5 pages', 'Keyword mapping for those 5 pages', 'Page titles, descriptions and heading review', 'Prioritised recommendations and measurement plan'],
    extras: 'More pages, new content, implementation work and ongoing campaigns increase the quote. Ad spend is separate; rankings are not guaranteed.',
  },
  ecommerce: {
    title: 'E-commerce development', price: 500, label: 'One-time starter store setup',
    description: 'An online store built around a clear buying journey.',
    included: ['Theme-based storefront with up to 5 pages', 'Up to 20 client-supplied products and 3 categories', 'One standard payment gateway and basic shipping setup', 'Checkout testing, 2 revision rounds and handover'],
    extras: 'Product volume, custom filters, subscriptions, stock sync and additional payment or shipping integrations affect the price.',
  },
  'ai-integrations': {
    title: 'AI integrations', price: 350, label: 'One-time basic AI feature setup',
    description: 'Add a focused AI feature to your website or product.',
    included: ['One use case with client-supplied FAQ content', 'One basic text chatbot on an existing website', 'One server-side AI provider connection', 'Basic testing, fallback and handover guidance'],
    extras: 'Multiple data sources, document search, custom actions, more channels and advanced evaluation increase the quote. AI usage fees are separate.',
  },
  'ai-automation': {
    title: 'AI workflow automation', price: 500, label: 'One-time simple workflow setup',
    description: 'Connect your tools and reduce repetitive manual work.',
    included: ['One simple workflow with up to 3 steps', 'One trigger and up to 2 connected tools', 'Field mapping and a basic failure notification', 'Normal-path and error testing with handover notes'],
    extras: 'More workflows, branching logic, custom APIs, data migration and ongoing monitoring increase the quote. Platform subscriptions are separate.',
  },
};

export default function BusinessPricingPage() {
  return (
    <div className={`${home.home} ${styles.page}`}>
      <section className={`container ${styles.hero}`} aria-labelledby="pricing-title">
        <div className={styles.topline}><span className={home.eyebrow}><span className={home.dot} /> BUSINESS SERVICE PRICING</span><span>All prices in USD</span></div>
        <div className={styles.heroGrid}>
          <div>
            <h1 id="pricing-title">A clear starting point.<br /><span>A plan built around you.</span></h1>
            <p className={styles.intro}>Explore our services, understand what is included, and choose the right support for your business. All starting rates are one-time project fees.</p>
            <a href="#service-pricing" className={home.primary}>Explore service pricing <ArrowDown size={16} aria-hidden="true" /></a>
          </div>
          <aside className={styles.featured} aria-label="Business website starting price">
            <span className={styles.tag}>BUSINESS WEBSITE</span>
            <p className={styles.starting}>Starting from</p>
            <p className={styles.heroPrice}>$1,200 <span>USD</span></p>
            <p>Up to 10 pages, CMS, blog, SEO setup and an agreed AI feature.</p>
            <Link href="/contact" className={styles.featuredLink}>Discuss your website <ArrowUpRight size={18} aria-hidden="true" /></Link>
            <small>Website package only. Other services are quoted separately.</small>
          </aside>
        </div>
        <div className={styles.notice}><Info size={21} aria-hidden="true" /><p><strong>Starting prices, tailored to your requirements.</strong> The final price can increase with your scope, features, integrations, content, revisions and delivery needs. We confirm the deliverables and total quote with you before work begins.</p></div>
      </section>

      <section id="service-pricing" className={`container ${styles.services}`} aria-labelledby="services-title">
        <div className={styles.sectionHeading}><div><span className={home.eyebrow}>CHOOSE WHAT YOU NEED</span><h2 id="services-title">Our services. Your next step.</h2></div><p>Each service is scoped individually. Included items below describe the starting scope; your proposal confirms quantities and deliverables.</p></div>
        <div className={styles.grid}>
          {services.map((service, index) => {
            const plan = scope[service.slug];
            const Icon = service.icon;
            return (
              <article key={service.slug} className={styles.card}>
                <div className={styles.cardTop}><Icon size={23} aria-hidden="true" /><span>0{index + 1}</span></div>
                <h3>{plan.title}</h3><p className={styles.description}>{plan.description}</p>
                <div className={styles.priceBlock}>
                  <span>Starting from</span>
                  <p className={styles.price}>${plan.price.toLocaleString('en-US')} <small>USD</small></p>
                  <span>{plan.label}</span>
                </div>
                <h4>What is included</h4>
                <ul>{plan.included.map(item => <li key={item}><Check size={16} aria-hidden="true" /><span>{item}</span></li>)}</ul>
                <div className={styles.extras}><h4>What can increase the price?</h4><p>{plan.extras}</p></div>
                <Link className={styles.cardLink} href="/contact">Discuss this service <ArrowUpRight size={16} aria-hidden="true" /></Link>
              </article>
            );
          })}
        </div>
      </section>

      <section className={`container ${styles.details}`} aria-labelledby="before-title">
        <div><span className={home.eyebrow}>BEFORE WE GET STARTED</span><h2 id="before-title">Know exactly what you are paying for.</h2><p>A starting price is a guide to the initial scope. It is not a fixed price for every project or a bundle of all six services.</p></div>
        <div className={styles.faqs}>
          <details open><summary>How is my final price decided?</summary><p>Share your goals, required pages or workflows, integrations, content and preferred deadline. We review the requirements and provide a quote with an agreed scope. Additional requests can increase the price and are agreed before the extra work starts.</p></details>
          <details><summary>Are there any separate running costs?</summary><p>Domains, hosting, paid themes or plugins, third-party subscriptions, payment processing, advertising and AI/API usage are separate unless explicitly included in your proposal. Any applicable taxes and billing schedule are confirmed in the quote.</p></details>
          <details><summary>Can I combine more than one service?</summary><p>Yes. Tell us which services you need and we will prepare a combined proposal. The website starting price does not include a separate branding project, SEO campaign, online store or automation project.</p></details>
          <details><summary>What happens after I enquire?</summary><p>We clarify your requirements, confirm deliverables, pricing and milestones, and share a proposal for your approval. Sending an enquiry does not start paid work.</p></details>
        </div>
      </section>

      <section className={`container ${home.cta}`} aria-labelledby="contact-title"><div className={home.ctaBox}><span className={home.eyebrow}>LET’S DEFINE YOUR PROJECT</span><h2 id="contact-title">Your goals.<br />A clear proposal.</h2><div className={home.ctaBottom}><p>Tell us what you need. We will confirm the scope and price.</p><Link href="/contact" className={home.whiteButton}>Get my project quote <ArrowUpRight size={18} aria-hidden="true" /></Link></div></div></section>
    </div>
  );
}
