import { services } from './data';

export type NavLink = {
  href: string;
  label: string;
  children?: {
    href: string;
    label: string;
  }[];
};

// Generate services navigation items from data
const servicesNavItems = services.map(service => ({
  href: `/services/${service.slug}`,
  label: service.title,
}));

export const navLinks: NavLink[] = [
  { href: '/', label: 'Home' },
  { 
    href: '/services', 
    label: 'Services',
    children: servicesNavItems
  },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/process', label: 'Process' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];
