import Link from 'next/link';
import Image from 'next/image';
import { ArrowDown, ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import { services, caseStudies } from '@/lib/data';
import styles from './AgencyHome.module.css';
import { homeFaqs } from '@/lib/search-content';
import { JSONLD } from '@/components/SEO/JSONLD';
import { createFAQSchema } from '@/lib/schema';
import { agencyVisual, serviceVisuals } from '@/lib/visuals';
import { absoluteUrl } from '@/lib/site';

const serviceNames: Record<string, string> = {
  'web-design': 'Web design & development', branding: 'Brand strategy & identity',
  seo: 'SEO & digital marketing', ecommerce: 'E-commerce experiences',
  'ai-integrations': 'AI integration', 'ai-automation': 'Workflow automation',
};
const process = [
  ['Discover', 'We start with your business, your audience, and the problem worth solving.'],
  ['Design', 'A clear direction, thoughtful interfaces, and a prototype you can explore.'],
  ['Build', 'Responsive development and practical integrations, with you in the loop.'],
  ['Launch & refine', 'A confident launch, a smooth handover, and room to keep improving.'],
];

export function AgencyHome() {
  const projects = ['sikander-arts-karachi', 'ai-letter-generator', 'quantumleap-ai-platform']
    .flatMap(slug => caseStudies.filter(project => project.slug === slug));
  return (
    <div className={styles.home}>
      <JSONLD id="home-faq-schema" data={{ "@context": "https://schema.org", ...createFAQSchema(homeFaqs) }} />
      <JSONLD id="home-page-schema" data={{ '@context': 'https://schema.org', '@type': 'WebPage', url: absoluteUrl('/'), name: 'Web Design, AI Chatbots & Automation | AzeemLab', primaryImageOfPage: { '@type': 'ImageObject', url: absoluteUrl(agencyVisual.src), width: agencyVisual.width, height: agencyVisual.height } }} />
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className="container">
          <div className={styles.heroTop}><span className={styles.eyebrow}><span className={styles.dot} /> YOUR PARTNER IN DIGITAL GROWTH</span><span className={styles.heroNote}>Independent thinking. Lasting impact.</span></div>
          <div className={styles.heroGrid}>
            <div>
              <h1 id="hero-title">Web design.<br /><span>Smarter with AI.</span></h1>
              <p className={styles.intro}>Custom responsive websites, AI chatbots, and workflow automation for businesses ready to improve their online presence. Built for UK, US, and global teams.</p>
              <div className={styles.actions}><Link href="/contact" className={styles.primary}>Discuss your project <ArrowUpRight size={19} /></Link><Link href="#selected-work" className={styles.secondary}>Explore our work <ArrowDown size={17} /></Link></div>
              <div className={styles.heroDetails}><span><Check size={15} /> Built around your business</span><span><Check size={15} /> UK, US & global clients</span></div>
            </div>
            <figure className={styles.heroFigure}>
              <Image src={agencyVisual.src} alt={agencyVisual.alt} width={1200} height={800} sizes="(max-width: 760px) 100vw, 45vw" preload className={styles.heroImage} />
              <figcaption>{agencyVisual.caption}</figcaption>
            </figure>
          </div>
          <div className={styles.capabilities}><span>Good ideas deserve great execution.</span><div><span>STRATEGY</span><span>DESIGN</span><span>DEVELOPMENT</span><span>AI & AUTOMATION</span></div></div>
        </div>
      </section>
      <section className={styles.section} aria-labelledby="services-title"><div className="container">
        <div className={styles.sectionHeading}><div><span className={styles.eyebrow}>01 / WHAT WE DO</span><h2 id="services-title">Everything you need.<br /><span>One creative partner.</span></h2></div><div className={styles.headingAside}><p>From your first impression to the systems behind it. Digital solutions that work together.</p><Link href="/services" className={styles.textLink}>Explore all services <ArrowUpRight size={18} /></Link></div></div>
        <div className={styles.services}>{services.map((service, index) => { const Icon = service.icon; return <Link href={`/services/${service.slug}`} className={styles.service} key={service.id}><div className={styles.serviceTop}><Icon size={25} strokeWidth={1.4} /><span>0{index + 1}</span></div><div className={styles.serviceVisual}><Image src={serviceVisuals[service.slug].src} alt={serviceVisuals[service.slug].alt} width={1200} height={800} sizes="(max-width: 760px) 90vw, (max-width: 1024px) 45vw, 30vw" /></div><h3>{serviceNames[service.slug] || service.title}</h3><p>{service.description}</p><span className={styles.serviceLink}>Discover service <ArrowUpRight size={18} /></span></Link>; })}</div>
      </div></section>
      <section id="selected-work" className={`${styles.section} ${styles.workSection}`} aria-labelledby="work-title"><div className="container">
        <div className={styles.sectionHeading}><div><span className={styles.eyebrow}>02 / SELECTED WORK</span><h2 id="work-title">Ideas made <span>real.</span></h2></div><Link href="/portfolio" className={styles.textLink}>View full portfolio <ArrowUpRight size={18} /></Link></div>
        <div className={styles.projects}>{projects.map((project, index) => <Link key={project.id} href={`/portfolio/${project.slug}`} className={`${styles.project} ${index === 0 ? styles.featuredProject : ''}`}><div className={styles.projectImage}><Image src={project.heroImage} alt={`${project.client} website preview`} fill sizes={index === 0 ? '(max-width: 760px) 100vw, 60vw' : '(max-width: 760px) 100vw, 35vw'} className={styles.screenshot} /><span className={styles.projectArrow}><ArrowUpRight size={23} /></span></div><div className={styles.projectInfo}><div><span className={styles.projectCategory}>{project.category}</span><h3>{project.client === 'www.ailettergen.com' ? 'AI Letter Generator' : project.client}</h3></div><span className={styles.projectIndex}>0{index + 1}</span></div></Link>)}</div>
      </div></section>
      <section className={styles.section} aria-labelledby="approach-title"><div className="container"><div className={styles.sectionHeading}><div><span className={styles.eyebrow}>03 / HOW WE WORK</span><h2 id="approach-title">Big ambition.<br /><span>A clear path forward.</span></h2></div><div className={styles.headingAside}><p>No guesswork. Just a collaborative process that takes your project from the first conversation to launch.</p><Link href="/process" className={styles.textLink}>Meet our process <ArrowUpRight size={18} /></Link></div></div><div className={styles.process}>{process.map(([title, description], index) => <div key={title}><span className={styles.step}>0{index + 1}<ArrowRight size={18} /></span><h3>{title}</h3><p>{description}</p></div>)}</div></div></section>
      <section className={styles.about}><div className="container"><div className={styles.aboutGrid}><span className={styles.eyebrow}>A SMALL INTRODUCTION</span><div><h2>Creative minds.<br />Practical solutions.</h2><p>We’re AzeemLab, a digital partner for ambitious businesses. We connect thoughtful design with dependable development and useful AI, so your online presence works as hard as you do.</p><Link href="/about" className={styles.textLink}>Get to know AzeemLab <ArrowUpRight size={18} /></Link></div></div></div></section>
      <section className={styles.section} aria-labelledby="faq-title"><div className="container"><div className={styles.sectionHeading}><div><span className={styles.eyebrow}>BEFORE WE BEGIN</span><h2 id="faq-title">A few helpful answers.</h2></div><Link href="/contact" className={styles.textLink}>Talk through your project <ArrowUpRight size={18} /></Link></div><div className={styles.faqs}>{homeFaqs.map(faq => <details key={faq.question}><summary>{faq.question}<ArrowDown size={17} /></summary><p>{faq.answer}</p></details>)}</div></div></section>
      <section className={styles.cta}><div className="container"><div className={styles.ctaBox}><span className={styles.eyebrow}>YOUR NEXT CHAPTER STARTS HERE</span><h2>Have something<br />great in mind?</h2><div className={styles.ctaBottom}><p>Let’s give it the digital presence it deserves.</p><Link href="/contact" className={styles.whiteButton}>Tell us about your project <ArrowUpRight size={20} /></Link></div></div></div></section>
    </div>
  );
}
