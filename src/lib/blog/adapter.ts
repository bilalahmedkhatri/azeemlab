import { documentHeadings, documentText, type DocNode } from './document';
import { mediaUrl } from './urls';
import type { PostRow } from './types';

// Existing AzeemLab cards/detail layout consume this view model. Another app
// can replace this adapter without changing queries or the document renderer.
export function postView(post: PostRow, document: DocNode | null = null) {
  const storedWords = post.metadata_json?.word_count;
  const words = document ? documentText(document).split(/\s+/).filter(Boolean).length : typeof storedWords === 'number' && Number.isFinite(storedWords) && storedWords >= 0 ? Math.min(storedWords, 200000) : 0;
  const cover = post.cover;
  const coverUrl = cover && cover.media_type.startsWith('image/') && cover.media_type !== 'image/svg+xml' ? mediaUrl(cover.public_url) : undefined;
  return {
    ...post, publishDate: post.published_at.toISOString(), modifiedDate: post.updated_at.toISOString(),
    readTime: words ? `${Math.max(1, Math.ceil(words / 200))} min read` : undefined,
    visual: cover && coverUrl ? { src: coverUrl, alt: cover.alt_text || post.title, width: cover.width || 1200, height: cover.height || 800, caption: cover.caption || '' } : null,
    avatar: mediaUrl(post.author_avatar_url),
    authorDescription: typeof post.metadata_json?.author_description === 'string' ? post.metadata_json.author_description.trim().slice(0, 4000) : '',
    sections: documentHeadings(document),
    relatedKeywords: [post.category_name || post.title],
    ctaText: 'Discuss your project', ctaHref: '/contact',
    internalLinks: [{ href: '/services', text: 'Explore our services' }, { href: '/contact', text: 'Discuss your project' }],
  };
}
