import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { services } from '@/lib/data';
import styles from './SiteLayout.module.css';
import { LanguageSwitcher } from '@/i18n/LanguageSwitcher';

export const Footer = () => (
  <footer className={styles.footer}>
    <div className="container">
      <div className={styles.footerGrid}>
        <div className={styles.footerBrand}><Link href="/" className={styles.logo} aria-label="AzeemLab home"><span className={styles.logoMark}><Image src="/brand-mark.svg" alt="" width={34} height={34} /></span>azeemlab<span className={styles.logoDot}>.</span></Link><p>Thoughtful design. Dependable development.<br />Digital growth, simplified.</p><div className={styles.socials}><a href="https://www.linkedin.com/company/azeem-lab/" target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={12} /></a><a href="https://www.instagram.com/azeem.lab/" target="_blank" rel="noopener noreferrer">Instagram <ArrowUpRight size={12} /></a><a href="https://www.facebook.com/azeemlab.0" target="_blank" rel="noopener noreferrer">Facebook <ArrowUpRight size={12} /></a></div></div>
        <div><h2>Explore</h2><ul>{[['About us', '/about'], ['Our work', '/portfolio'], ['Our process', '/process'], ['Insights', '/blog'], ['Careers', '/careers']].map(([label, href]) => <li key={href}><Link href={href}>{label}</Link></li>)}</ul></div>
        <div><h2>Expertise</h2><ul>{services.map(service => <li key={service.id}><Link href={`/services/${service.slug}`}>{service.slug === 'web-design' ? 'Web design & development' : service.title}</Link></li>)}</ul></div>
        <div><h2>Start a conversation</h2><a className={styles.email} href="mailto:bilalahmed@azeemlab.com">bilalahmed@azeemlab.com</a><ul><li><a href="tel:+923213009321">+92 (321) 300-9321</a></li></ul><Link href="/contact" className={styles.footerCta}>Tell us about your idea <ArrowUpRight size={15} /></Link></div>
      </div>
      <div className={styles.footerBottom}><p>© {new Date().getFullYear()} AzeemLab. All rights reserved.</p><div><Link href="/privacy">Privacy policy</Link><Link href="/terms">Terms of service</Link></div><LanguageSwitcher /><span>Built with purpose.</span></div>
    </div>
  </footer>
);
