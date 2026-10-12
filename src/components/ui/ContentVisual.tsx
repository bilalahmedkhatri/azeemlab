import Image from 'next/image';
import type { SiteVisual } from '@/lib/visuals';

export function ContentVisual({ visual, priority = false }: { visual: SiteVisual; priority?: boolean }) {
  return <figure className="my-10 overflow-hidden rounded-2xl border border-gray-200 bg-white">
    <Image src={visual.src} alt={visual.alt} width={visual.width} height={visual.height} sizes="(max-width: 768px) 100vw, 896px" priority={priority} className="w-full h-auto" />
    <figcaption className="px-5 py-4 text-sm leading-relaxed text-gray-600">{visual.caption}</figcaption>
  </figure>;
}
