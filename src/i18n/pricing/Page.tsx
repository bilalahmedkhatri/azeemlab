import Link from '@/i18n/Link';
import { ArrowDown, ArrowUpRight, Check, Info } from 'lucide-react';
import { services } from '@/lib/data';
import { absoluteUrl, createPageMetadata, siteUrl } from '@/lib/site';
import { JSONLD } from '@/components/SEO/JSONLD';
import home from '@/components/sections/AgencyHome.module.css';
import styles from './page.module.css';
import { getLocale } from 'next-intl/server';
import { localizedPath, type Locale } from '@/i18n/config';
import { languageAlternates } from '@/i18n/urls';
import { pricingTranslator } from './messages';
import messages from './messages/en.json';

const pricingPath = '/pricing/plan_detail/business';
export async function generateMetadata() {
  const locale = await getLocale();
  const t = pricingTranslator(locale);
  const metadata = createPageMetadata(localizedPath(locale as Locale, pricingPath), t(messages[0]), t(messages[1]));
  return { ...metadata, alternates: { canonical: localizedPath(locale as Locale, pricingPath), languages: languageAlternates(pricingPath) } };
}

export default async function BusinessPricingPage() {
  const locale = await getLocale() as Locale;
  const t = pricingTranslator(locale);
  // Current commercial starting rates; initial research is in docs/pricing-benchmarks.md.
  const scope: Record<string, { title: string; price: number; label: string; description: string; included: string[]; extras: string }> = {
    'web-design': {
      title: t("Web design & development"), price: 1200, label: t("Business website package"),
      description: t("A professional website with room for your business to grow."),
      included: [t("Up to 10 responsive pages"), t("CMS integration and blog setup"), t("On-page and technical SEO setup"), t("AI feature scoped during discovery"), t("Up to 5 revision rounds"), t("Website handover and launch guidance")],
      extras: t("Extra pages, custom dashboards, multilingual content, advanced integrations and additional revisions increase the quote."),
    },
    branding: {
      title: t("Branding & visual identity"), price: 250, label: t("One-time starter identity project"),
      description: t("A clear, consistent visual identity for your business."),
      included: [t("Brand discovery and one visual direction"), t("One logo concept and final export files"), t("Colour palette and typography selection"), t("Essential brand usage sheet and 2 revision rounds")],
      extras: t("Additional concepts, packaging, print collateral, social templates and extra revisions are scoped separately."),
    },
    seo: {
      title: t("SEO & digital marketing"), price: 200, label: t("One-time starter SEO audit"),
      description: t("Help customers discover and understand your services."),
      included: [t("Technical and indexability review of up to 5 pages"), t("Keyword mapping for those 5 pages"), t("Page titles, descriptions and heading review"), t("Prioritised recommendations and measurement plan"), t("Delivery within 5 to 7 business days")],
      extras: t("More pages, new content, implementation work and ongoing campaigns increase the quote. Ad spend is separate; rankings are not guaranteed."),
    },
    ecommerce: {
      title: t("E-commerce development"), price: 900, label: t("One-time starter store setup"),
      description: t("An online store built around a clear buying journey."),
      included: [t("Theme-based storefront with up to 5 pages"), t("Up to 20 client-supplied products and 3 categories"), t("One standard payment gateway and basic shipping setup"), t("Checkout testing, 2 revision rounds and handover")],
      extras: t("Product volume, custom filters, subscriptions, stock sync and additional payment or shipping integrations affect the price."),
    },
    'ai-integrations': {
      title: t("AI integrations"), price: 500, label: t("One-time basic AI feature setup"),
      description: t("Add a focused AI feature to your website or product."),
      included: [t("One use case with client-supplied FAQ content"), t("One basic text chatbot on an existing website"), t("One server-side AI provider connection"), t("Basic testing, fallback and handover guidance")],
      extras: t("Multiple data sources, document search, custom actions, more channels and advanced evaluation increase the quote. AI usage fees are separate."),
    },
    'ai-automation': {
      title: t("AI workflow automation"), price: 800, label: t("One-time simple workflow setup"),
      description: t("Connect your tools and reduce repetitive manual work."),
      included: [t("One simple workflow with up to 3 steps"), t("One trigger and up to 2 connected tools"), t("Field mapping and a basic failure notification"), t("Normal-path and error testing with handover notes")],
      extras: t("More workflows, branching logic, custom APIs, data migration and ongoing monitoring increase the quote. Platform subscriptions are separate."),
    },
  };

  const url = absoluteUrl(localizedPath(locale, pricingPath));
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage', '@id': `${url}#webpage`, url,
        name: t("Business Service Pricing & Starting Rates | AzeemLab"), inLanguage: locale,
        isPartOf: { '@id': `${siteUrl}/#website` },
        about: { '@id': `${siteUrl}/#organization` },
        mainEntity: { '@id': `${url}#services` },
        breadcrumb: { '@id': `${url}#breadcrumb` },
      },
      {
        '@type': 'BreadcrumbList', '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: t("Home"), item: absoluteUrl(localizedPath(locale, '/')) },
          { '@type': 'ListItem', position: 2, name: t("Services"), item: absoluteUrl(localizedPath(locale, '/services')) },
          { '@type': 'ListItem', position: 3, name: t("Business service pricing"), item: url },
        ],
      },
      {
        '@type': 'ItemList', '@id': `${url}#services`, name: t("AzeemLab service starting rates in USD"),
        numberOfItems: services.length,
        itemListElement: services.map((service, index) => ({
          '@type': 'ListItem', position: index + 1, item: { '@id': `${url}#${service.slug}` },
        })),
      },
      ...services.map(service => {
        const plan = scope[service.slug];
        return {
          '@type': 'Service', '@id': `${url}#${service.slug}`, name: plan.title,
          url: `${url}#${service.slug}`,
          description: `${plan.description} ${t("What is included")}: ${plan.included.join('; ')}. ${plan.extras}`,
          provider: { '@id': `${siteUrl}/#organization` },
          offers: {
            '@type': 'Offer', name: plan.label, url: `${url}#${service.slug}`,
            description: t("One-time starting fee for the listed scope. Final pricing increases with requirements and is agreed before work begins. Separate running costs may apply."),
            priceSpecification: {
              '@type': 'PriceSpecification', minPrice: plan.price, priceCurrency: 'USD',
            },
          },
        };
      }),
    ],
  };
  return (
    <div className={`${home.home} ${styles.page}`}>
      <JSONLD id="business-pricing-schema" data={structuredData} />
      <section className={`container ${styles.hero}`} aria-labelledby="pricing-title">
        <nav aria-label={t("Breadcrumb")} className={styles.breadcrumb}><ol><li><Link href="/">{t("Home")}</Link></li><li><Link href="/services">{t("Services")}</Link></li><li aria-current="page">{t("Business service pricing")}</li></ol></nav>
        <div className={styles.topline}><span className={home.eyebrow}><span className={home.dot} /> {t("BUSINESS SERVICE PRICING")}</span><span>{t("All prices in USD")}</span></div>
        <div className={styles.heroGrid}>
          <div>
            <h1 id="pricing-title">{t("Business service pricing.")}<br /><span>{t("A plan built around you.")}</span></h1>
            <p className={styles.intro}>{t("Compare AzeemLab starting rates for web design, branding, SEO, e-commerce, AI integrations and workflow automation. See what is included before requesting your quote. All starting rates are one-time project fees in USD.")}</p>
            <a href="#service-pricing" className={home.primary}>{t("Explore service pricing")}<ArrowDown size={16} aria-hidden="true" /></a>
          </div>
          <aside className={styles.featured} aria-label={t("Business website starting price")}>
            <span className={styles.tag}>{t("BUSINESS WEBSITE")}</span>
            <p className={styles.starting}>{t("Starting from")}</p>
            <p className={styles.heroPrice}>$1,200 <span>{t("USD")}</span></p>
            <p>{t("Up to 10 pages, CMS, blog, SEO setup and an agreed AI feature.")}</p>
            <Link href="/contact" className={styles.featuredLink}>{t("Discuss your website")}<ArrowUpRight size={18} aria-hidden="true" /></Link>
            <small>{t("Website package only. Other services are quoted separately.")}</small>
          </aside>
        </div>
        <div className={styles.notice}><Info size={21} aria-hidden="true" /><p><strong>{t("Starting prices, tailored to your requirements.")}</strong> {t("The final price can increase with your scope, features, integrations, content, revisions and delivery needs. We confirm the deliverables and total quote with you before work begins.")}</p></div>
      </section>

      <section id="service-pricing" className={`container ${styles.services}`} aria-labelledby="services-title">
        <div className={styles.sectionHeading}><div><span className={home.eyebrow}>{t("CHOOSE WHAT YOU NEED")}</span><h2 id="services-title">{t("Our services. Your next step.")}</h2></div><p>{t("Each service is scoped individually. Included items below describe the starting scope; your proposal confirms quantities and deliverables.")}</p></div>
        <div className={styles.grid}>
          {services.map((service, index) => {
            const plan = scope[service.slug];
            const Icon = service.icon;
            return (
              <article key={service.slug} id={service.slug} className={styles.card}>
                <div className={styles.cardTop}><Icon size={23} aria-hidden="true" /><span>0{index + 1}</span></div>
                <h3><Link href={`/services/${service.slug}`}>{plan.title}</Link></h3><p className={styles.description}>{plan.description}</p>
                <div className={styles.priceBlock}>
                  <span>{t("Starting from")}</span>
                  <p className={styles.price}>${plan.price.toLocaleString('en-US')} <small>{t("USD")}</small></p>
                  <span>{plan.label}</span>
                </div>
                <h4>{t("What is included")}</h4>
                <ul>{plan.included.map(item => <li key={item}><Check size={16} aria-hidden="true" /><span>{item}</span></li>)}</ul>
                <div className={styles.extras}><h4>{t("What can increase the price?")}</h4><p>{plan.extras}</p></div>
                <Link className={styles.cardLink} href="/contact">{t("Discuss this service")}<ArrowUpRight size={16} aria-hidden="true" /></Link>
              </article>
            );
          })}
        </div>
      </section>

      <section className={`container ${styles.details}`} aria-labelledby="before-title">
        <div><span className={home.eyebrow}>{t("BEFORE WE GET STARTED")}</span><h2 id="before-title">{t("Know exactly what you are paying for.")}</h2><p>{t("A starting price is a guide to the initial scope. It is not a fixed price for every project or a bundle of all six services.")}</p></div>
        <div className={styles.faqs}>
          <details open><summary>{t("How is my final price decided?")}</summary><p>{t("Share your goals, required pages or workflows, integrations, content and preferred deadline. We review the requirements and provide a quote with an agreed scope. Additional requests can increase the price and are agreed before the extra work starts.")}</p></details>
          <details><summary>{t("Are there any separate running costs?")}</summary><p>{t("Domains, hosting, paid themes or plugins, third-party subscriptions, payment processing, advertising and AI/API usage are separate unless explicitly included in your proposal. Any applicable taxes and billing schedule are confirmed in the quote.")}</p></details>
          <details><summary>{t("Can I combine more than one service?")}</summary><p>{t("Yes. Tell us which services you need and we will prepare a combined proposal. The website starting price does not include a separate branding project, SEO campaign, online store or automation project.")}</p></details>
          <details><summary>{t("What happens after I enquire?")}</summary><p>{t("We clarify your requirements, confirm deliverables, pricing and milestones, and share a proposal for your approval. Sending an enquiry does not start paid work.")}</p></details>
        </div>
      </section>

      <section className={`container ${home.cta}`} aria-labelledby="contact-title"><div className={home.ctaBox}><span className={home.eyebrow}>{t("LET’S DEFINE YOUR PROJECT")}</span><h2 id="contact-title">{t("Your goals.")}<br />{t("A clear proposal.")}</h2><div className={home.ctaBottom}><p>{t("Tell us what you need. We will confirm the scope and price.")}</p><Link href="/contact" className={home.whiteButton}>{t("Get my project quote")}<ArrowUpRight size={18} aria-hidden="true" /></Link></div></div></section>
    </div>
  );
}
