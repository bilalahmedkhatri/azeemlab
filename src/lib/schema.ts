import { Organization, WebSite, Service, FAQPage, BreadcrumbList } from 'schema-dts';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://azeemlab.vercel.app';

export const organizationSchema: Organization = {
  '@type': 'Organization',
  '@id': `${siteUrl}/#organization`,
  name: 'Azeem Lab',
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  sameAs: [
    'https://twitter.com/AzeemLab',
    'https://linkedin.com/company/AzeemLab',
    'https://github.com/AzeemLab',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+92-321-300-9321',
    contactType: 'customer service',
    email: 'bilalahmedkhatri@outlook.com',
    availableLanguage: ['English'],
  },
  address: [
    {
      '@type': 'PostalAddress',
      streetAddress: 'Srednyaya Pereyaslavskaya Street, 14с1',
      addressCountry: 'RU',
      addressLocality: 'Moscow',
      addressRegion: 'Moscow',
    },
    {
      '@type': 'PostalAddress',
      streetAddress: 'Shahray-e-Faisal Fortune Tower, 1705 SQFT',
      addressCountry: 'PK',
      addressLocality: 'Karachi',
      addressRegion: 'Sindh',
    },
  ],
};

export const websiteSchema: WebSite = {
  '@type': 'WebSite',
  '@id': `${siteUrl}/#website`,
  url: siteUrl,
  name: 'Azeem Lab',
  description: 'Transform your vision into powerful digital solutions with custom web design, development, and branding services.',
  publisher: {
    '@id': `${siteUrl}/#organization`,
  },
};

export const servicesSchema: Service[] = [
  {
    '@type': 'Service',
    name: 'Web Design & Development',
    description: 'Custom websites that convert visitors into customers',
    provider: {
      '@id': `${siteUrl}/#organization`,
    },
    serviceType: 'Web Development',
    areaServed: 'Worldwide',
  },
  {
    '@type': 'Service',
    name: 'UI/UX Design',
    description: 'Beautiful interfaces that users love',
    provider: {
      '@id': `${siteUrl}/#organization`,
    },
    serviceType: 'Design',
    areaServed: 'Worldwide',
  },
  {
    '@type': 'Service',
    name: 'Branding & Identity',
    description: 'Stand out with a memorable brand',
    provider: {
      '@id': `${siteUrl}/#organization`,
    },
    serviceType: 'Branding',
    areaServed: 'Worldwide',
  },
  {
    '@type': 'Service',
    name: 'E-Commerce Solutions',
    description: 'Online stores that drive sales',
    provider: {
      '@id': `${siteUrl}/#organization`,
    },
    serviceType: 'E-Commerce Development',
    areaServed: 'Worldwide',
  },
];

export function createFAQSchema(faqs: { question: string; answer: string }[]): FAQPage {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function createBreadcrumbSchema(items: { name: string; url: string }[]): BreadcrumbList {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.url}`,
    })),
  };
}

export function injectSchema(schema: Organization | WebSite | Service | FAQPage | BreadcrumbList | Service[]) {
  let schemaWithContext: Record<string, unknown>;
  
  if (Array.isArray(schema)) {
    schemaWithContext = {
      '@context': 'https://schema.org',
      '@graph': schema,
    };
  } else {
    schemaWithContext = {
      '@context': 'https://schema.org',
      ...(schema as unknown as Record<string, unknown>),
    };
  }
  
  return {
    __html: JSON.stringify(schemaWithContext),
  };
}
