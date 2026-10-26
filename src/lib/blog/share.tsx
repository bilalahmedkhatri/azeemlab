import { Mail } from 'lucide-react';
import { FaFacebookF, FaLinkedinIn, FaWhatsapp, FaXTwitter } from 'react-icons/fa6';
import { blogUrl } from './config';

const shareLabels: Record<string, string> = {
  en: 'Share article', ru: 'Поделиться статьёй', nl: 'Artikel delen',
  fr: 'Partager cet article', es: 'Compartir artículo', 'pt-BR': 'Compartilhar artigo',
  'zh-Hans': '分享文章', ko: '글 공유', ja: '記事を共有',
};

export function BlogShareLinks({ locale, slug, title }: { locale: string; slug: string; title: string }) {
  const url = blogUrl(locale, slug);
  const encodedUrl = encodeURIComponent(url);
  const text = encodeURIComponent(`${title}\n${url}`);
  const label = shareLabels[locale] || shareLabels.en;
  const links = [
    { name: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, icon: FaFacebookF },
    { name: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`, icon: FaLinkedinIn },
    { name: 'X', href: `https://x.com/intent/tweet?url=${encodedUrl}&text=${encodeURIComponent(title)}`, icon: FaXTwitter },
    { name: 'WhatsApp', href: `https://wa.me/?text=${text}`, icon: FaWhatsapp },
    { name: 'Email', href: `mailto:?subject=${encodeURIComponent(title)}&body=${text}`, icon: Mail },
  ];

  return <nav aria-label={label} className="mb-8 flex flex-wrap gap-3 2xl:absolute 2xl:right-full 2xl:mr-6 2xl:top-0 2xl:flex-col 2xl:flex-nowrap">
    {links.map(({ name, href, icon: Icon }) => <a key={name} href={href} aria-label={`${label}: ${name}`} title={`${label}: ${name}`} target={name === 'Email' ? undefined : '_blank'} rel={name === 'Email' ? undefined : 'noopener noreferrer'} className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gray-300 bg-white text-neutral-dark transition-colors hover:border-neutral-dark hover:bg-neutral-light focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-dark"><Icon aria-hidden="true" size={21} /></a>)}
  </nav>;
}
