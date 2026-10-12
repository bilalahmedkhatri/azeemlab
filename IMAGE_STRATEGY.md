# Image placement and search context

Implemented 12 October 2026; local revision, not deployed.

| Placement | Visual | Purpose |
| --- | --- | --- |
| Homepage hero | Original responsive website, phone, chatbot and connected tools illustration | Quickly explains the website and AI offer |
| Homepage service cards | Six service-specific illustrations | Makes the service menu easier to scan |
| Six service detail pages | Responsive layout, brand system, SEO review, checkout, knowledge flow and workflow diagrams | Adds context beside the service description with a visible explanatory caption |
| Blog listing | Relevant covers for all eight articles | Helps visitors choose a guide by topic |
| Eight article pages | Topic illustration and caption after the article heading | Supports the answer and makes the reading experience more visual |
| Portfolio | Existing actual project screenshots | Preserves real project evidence rather than inventing client previews |

Assets are centralized in [visuals.ts](D:/azeemlab/src/lib/visuals.ts). The eleven published WebP files are in `public/images/agency/` and `public/images/insights/`. The ten diagram SVGs remain editable source files. The generated homepage image uses the built-in imagegen tool; diagrams were drawn as native SVG and exported with Sharp. Illustrations are not claims of completed client work.

Each image has a descriptive filename, specific alt text, explicit 1200×800 dimensions and responsive `sizes`. Homepage hero is preloaded; below-the-fold service/card visuals are lazy loaded. Hero is approximately 34 KiB; diagrams are approximately 5–6 KiB each before the Next.js responsive image variants. No heavy third-party stock image requests were added.

Service, homepage and article previews now use relevant images in Open Graph/Twitter metadata. Articles include the visible image in Article JSON-LD; the homepage identifies its primary image. The existing sitemap includes image entries for these pages and available project screenshots. All URLs use the preferred canonical origin.

Google recommends crawlable HTML image elements, relevant surrounding text, useful alt descriptions and optimized files. Image choice in search remains automated; these changes improve discovery/context without guaranteeing rankings or AI citations. [Google image SEO guidance](https://developers.google.com/search/docs/appearance/google-images), [image sitemap documentation](https://developers.google.com/search/docs/crawling-indexing/sitemaps/image-sitemaps).

Next useful additions are owner-supplied project walkthrough screenshots showing a genuine mobile/desktop flow, approved workflow demos and authentic team/workspace photos. These should have permission and verifiable context. Avoid invented offices, client logos, results graphs or generated people presented as team members.

## Generation prompt

Built-in imagegen prompt: “Create one original wide editorial illustration for AzeemLab digital agency website hero, landscape 3:2. Premium restrained modern 3D paper and ceramic design on very light warm grey background, charcoal and muted lavender accents matching minimalist monochrome agency branding. Main subject: a beautifully arranged large browser window with abstract responsive website layout, a smaller mobile device in front at left, an AI knowledge/chat module at right and connected workflow nodes behind. Clear coherent perspective, soft studio shadows, spacious composition, no gradients or bright saturated colors. No text, lettering, logos, numbers, client brands, fake testimonials, human faces or dashboard performance metrics. Real illustrative content, not screenshot of a finished website. Fill composition with visual objects with generous margins and no cropping of devices. Intended as lightweight homepage image illustrating responsive web design and AI integration.”

Published derivative: [responsive-web-design-ai-integration.webp](D:/azeemlab/public/images/agency/responsive-web-design-ai-integration.webp). The original generated PNG is preserved in Codex's generated_images folder; the application uses the optimized project copy.

## Verification

Production build and TypeScript checks passed. The image audit verified 21 sitemap image references, all 17 referenced assets (11 new illustrations and 6 existing project screenshots), 21 sized/described image placements, contextual social previews and structured image URLs. The responsive Next.js image endpoint returned an image successfully. All 36 sitemap page checks passed. Browser checks confirmed the homepage hero and article cover loaded on mobile with no horizontal overflow. Evidence: `artifacts/image-check.json`, `artifacts/images-home-preview.png` and `artifacts/images-mobile-preview.png`.
