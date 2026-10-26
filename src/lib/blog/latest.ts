export type LatestBlogCard = {
  href: string; title: string; publishDate: string;
  image: { src: string; alt: string };
};

export function latestBlogCards(cards: LatestBlogCard[], currentHref: string, limit = 4) {
  return cards.filter(card => card.href !== currentHref)
    .sort((a, b) => Date.parse(b.publishDate) - Date.parse(a.publishDate) || a.href.localeCompare(b.href))
    .slice(0, limit);
}
