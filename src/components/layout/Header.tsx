'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react';
import { navLinks } from '@/lib/navigation';
import styles from './SiteLayout.module.css';
import { stripLocale } from '@/i18n/config';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = stripLocale(usePathname());
  const menuButton = useRef<HTMLButtonElement>(null);
  const navigation = useRef<HTMLElement>(null);
  const active = (href: string) => href === '/' ? pathname === '/' : pathname.startsWith(href);
  const closeMenus = () => {
    setIsOpen(false);
    navigation.current?.querySelectorAll('details[open]').forEach(detail => detail.removeAttribute('open'));
  };
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        navigation.current?.querySelectorAll('details[open]').forEach(detail => detail.removeAttribute('open'));
        menuButton.current?.focus();
      }
    };
    const onOutside = (event: PointerEvent) => {
      if (!navigation.current?.contains(event.target as Node)) {
        setIsOpen(false);
        navigation.current?.querySelectorAll('details[open]').forEach(detail => detail.removeAttribute('open'));
      }
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onOutside);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onOutside);
    };
  }, []);

  return (
    <header className={styles.header}>
      <nav className={`container ${styles.nav}`} aria-label="Main navigation" ref={navigation}>
        <Link href="/" className={styles.logo} aria-label="AzeemLab home" onClick={closeMenus}><span className={styles.logoMark}><Image src="/brand-mark.svg" alt="" width={34} height={34} priority /></span>azeemlab<span className={styles.logoDot}>.</span></Link>
        <button ref={menuButton} className={styles.menuButton} type="button" onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen} aria-controls="site-navigation" aria-label={isOpen ? 'Close navigation' : 'Open navigation'}>{isOpen ? <X size={22} /> : <Menu size={22} />}</button>
        <div id="site-navigation" className={`${styles.links} ${isOpen ? styles.linksOpen : ''}`}>
          {navLinks.filter(link => link.href !== '/contact').map(link => link.children ? (
            <details key={link.href} className={styles.dropdown}>
              <summary className={active(link.href) ? styles.active : ''}>{link.label}<ChevronDown size={13} /></summary>
              <div className={styles.dropdownPanel}><Link href={link.href} onClick={closeMenus}>All services <ArrowUpRight size={14} /></Link>{link.children.map(child => <Link key={child.href} href={child.href} onClick={closeMenus} aria-current={pathname === child.href ? 'page' : undefined}>{child.label}</Link>)}</div>
            </details>
          ) : <Link key={link.href} href={link.href} className={active(link.href) ? styles.active : ''} aria-current={pathname === link.href ? 'page' : undefined} onClick={closeMenus}>{link.label}</Link>)}
          <Link href="/contact" className={styles.contactButton} onClick={closeMenus}>Let’s talk <ArrowUpRight size={16} /></Link>
        </div>
      </nav>
    </header>
  );
};
