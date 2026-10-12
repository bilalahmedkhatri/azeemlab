# AzeemLab SEO, GEO and client acquisition audit

Reviewed 12 October 2026. Scope: all six GSC exports in `gsc/`, the supplied screenshots, both supplied PageSpeed reports, current public homepage and local source/build. Changes below are local and have not been deployed. Source spreadsheets were read without editing. This audit does not establish lead attribution or promise rankings.

## What the evidence shows

The clearest problem is limited relevant discovery, followed by mobile loading and enquiry reliability. A Lighthouse SEO score of 100 checks selected technical rules; it does not measure competitive visibility, client intent, authority or sales.

### Search performance: 10 July–9 October 2026

Source: [Performance workbook](D:/azeemlab/gsc/azeemlab.com-Performance-on-Search-2026-10-12.xlsx), Chart A1:E93. Totals calculated from the 92 daily rows:

| Metric | Result | Interpretation |
| --- | ---: | --- |
| Clicks | 3 | Too few to assess acquisition or conversion rates |
| Impressions | 175 | Limited discovery in this period |
| CTR | 1.71% | 3 / 175; do not benchmark confidently on this sample |
| Impression-weighted average position | 25.54 | Computed from rounded daily positions; not a single keyword rank |
| Desktop | 3 clicks / 121 impressions | Device sheet A2:E2 |
| Mobile | 0 clicks / 54 impressions | Device sheet A3:E3; lack of clicks does not prove slow loading caused it |

Visible queries mainly concern Azeem names: “azeem digital” (18 impressions, position 40.5), “azeem studio digital lab” (14, 34.86), “azeem lab” (11, 6.73). “linkedin automation bot” has only 2 impressions at position 26. These are from Queries A2:E10. The visible query rows contain 62 impressions and zero clicks; the chart contains 175 impressions and 3 clicks. GSC hides some queries and aggregates dimensions differently. It is incorrect to assign the three clicks to the visible brand queries.

Pages A2:E13: careers has 2 clicks/13 impressions; contact 1/39; homepage 0/91; services 0/19; legacy about-us 0/13. Careers clicks are not evidence of buyer leads. E-commerce (3 impressions, position 7.33), branding (1, 8) and Sikander Arts (11, 11.82) are weak early signals to support existing commercial pages and proof, rather than creating dozens of new pages. Page-level impressions sum differently from chart totals; do not add them to the headline total. Countries show Pakistan 1/52, US 0/31 and UK 0/28; China 2/2 at position 104.5. Neither country nor device proves the visitor's intent.

### Indexing, crawling and HTTPS

| Source | Export evidence | Action |
| --- | --- | --- |
| [pages.xlsx](D:/azeemlab/gsc/pages.xlsx), Chart A85:D85 | Latest chart row: 4 October, 17 indexed / 6 not indexed | Historical snapshot, not today's live state |
| pages.xlsx, Critical issues A2:D4 | 4 redirected URLs, 1 404, 1 crawled currently not indexed | Redirected old URLs can be correct; URL-level issue exports are needed to identify the specific 404 and excluded page |
| [indexed pages.xlsx](D:/azeemlab/gsc/indexed%20pages.xlsx), Table | 17 URLs including /about-us and /services/seo-marketing | Preserve migrations through permanent redirects; use current destinations in sitemap/internal links |
| [crawl stats.xlsx](D:/azeemlab/gsc/crawl%20stats.xlsx), Hosts table / Response table | 193 requests across three hosts; 60.62% 200, 18.65% 302, 14.51% 301, 5.70% 404, 0.52% DNS error | Examine redirect chains and error URL examples; do not remove necessary host redirects |
| [http.xlsx](D:/azeemlab/gsc/http.xlsx), Chart | 7 October: 0 non-HTTPS / 11 HTTPS; no issue rows | Export filename does not indicate an HTTP problem |
| [http pages.xlsx](D:/azeemlab/gsc/http%20pages.xlsx), Table | 11 HTTPS URLs | Different reporting coverage from the 17 indexed URLs; not proof six pages are insecure |

The live-test screenshot says the homepage can be crawled/indexed and declares the www canonical. It does not prove Google's selected canonical or successful indexing. The sitemap screenshot shows success with 18 discovered URLs and a last-read date of 28 May. The new local sitemap includes all current service, location, project and article routes.

The links screenshot reports 2 external links; the Ahrefs screenshot reports 767 referring domains, DR 0 and zero organic keywords/traffic. These are different datasets and dates/coverage. Do not treat 767 as verified valuable backlinks or infer spam from this discrepancy alone. Inspect linking URLs, relevance and genuine referrals before any backlink action. No links were submitted or disavowed.

### Supplied PageSpeed baseline — deployed old homepage

Both reports were read in the browser. Both show www as the tested destination and no Chrome UX Report field data.

| Metric | [Mobile report](https://pagespeed.web.dev/analysis/https-azeemlab-com/46b0fzvhvi?form_factor=mobile&hl=en) | [Desktop report](https://pagespeed.web.dev/analysis/https-azeemlab-com/qu33aasiz9?form_factor=desktop&hl=en) |
| --- | ---: | ---: |
| Performance | 71 | 95 |
| Accessibility | 91 | 94 |
| Best practices / SEO | 100 / 100 | 100 / 100 |
| FCP | 3.5 s | 0.5 s |
| LCP | 5.1 s | 1.3 s |
| Total blocking time | 30 ms | 130 ms |
| CLS | 0 | 0 |
| Speed index | 5.2 s | 0.6 s |

Mobile: unused JavaScript approximately 121 KiB, legacy JavaScript 14 KiB, render-blocking estimate 150 ms. Desktop: unused JavaScript 124 KiB, image estimate 71 KiB, render-blocking estimate 320 ms. Accessibility audits flag unnamed links and heading order; mobile also contrast. Agentic browsing is 1/2 with an accessibility-tree issue, not a measure of Google rankings or AI citations. Reports were captured around 1:55 AM GMT+5 on 12 October. Lab runs vary; re-run against the deployed revision before claiming an improvement. Raw observations are in `artifacts/pagespeed-mobile.txt` and `artifacts/pagespeed-desktop.txt`.

The public homepage still displayed the previous design during this audit. HTTP header probing from the shell failed, so live status codes, full redirect chains and server caching were not independently verified. An older search cache showing a Vercel hostname is not reliable evidence of the current deployment configuration.

## Competitor findings and priority keyword candidates

These are service/market-overlap benchmarks, not a verified list of domains ranking against AzeemLab for a tracked keyword set. Sources are their official pages; classification and keyword priority are our inference.

| Competitor | Why relevant | What AzeemLab can improve |
| --- | --- | --- |
| [TekShove](https://tekshove.com/) | Karachi agency with web development, branding, SEO, AI automation and white-label delivery | Specific service grouping, workflow examples and clear enquiry scope |
| [Boundless Technologies](https://boundlesstech.net/) | Karachi web design, e-commerce, branding and SEO | Strong local business evidence and navigable portfolio |
| [GoodCore](https://www.goodcore.co.uk/) | UK custom software and AI integration benchmark; larger projects than a typical small studio | Detailed problem/scope/implementation case studies and discovery process |
| [Web Birds](https://webbirds.us/) | Dallas web design, commerce, custom applications and AI automation; official search result verified | Outcome-specific commerce and automation pages |
| [The Turn Group](https://www.theturngroup.com/) | US website design and AI website integration | Explain approved knowledge, customer questions, lead qualification and handoff |

Ahrefs organic-keyword and keyword-overview requests returned plan restrictions. Accordingly, no monthly search volumes, keyword difficulty, competitor rankings or traffic estimates are claimed. The CSV contains 27 candidates prioritized by commercial intent, existing capability and service overlap; its metric columns are intentionally blank. Competitor evidence supports the service theme, not the exact phrase's ranking or demand.

Start with these six commercial clusters:

1. **AI chatbot integration for website / AI chatbot development for small business** → `/services/ai-integrations`. Explain approved data, escalation, integration requirements and demo scope.
2. **AI workflow automation services / AI automation for small business** → `/services/ai-automation`. Show one verified before/after workflow and the tools involved.
3. **Responsive website design for small business / custom web development services** → `/services/web-design`. Show mobile examples, stack and enquiry journey.
4. **Website redesign services UK** → existing UK route. Describe remote collaboration honestly, with no invented local office.
5. **E-commerce website development services** → `/services/ecommerce`. Show store scope and verified integrations.
6. **Web design and development Karachi** → core design page initially. Verify address and actual local service delivery before a dedicated local campaign.

Supporting articles target decision questions, not generic keyword repetition. Each cluster has one primary page; related terms belong in helpful headings/copy, not separate near-identical landing pages. Do not target competitor brand names in AzeemLab's service titles. Treat “linkedin automation bot” as a tiny informational signal, not the principal acquisition strategy.

## Changes implemented locally

- Refreshed homepage with a specific website/AI offer, linked services, existing project previews, project CTA, process and factual visible FAQs. Removed homepage placeholder growth figures and logo strip in the earlier UI pass.
- Added page-specific canonical URLs across static, service, location, portfolio and blog pages; removed inherited homepage canonical from the root layout. Centralized the preferred www origin and service metadata. Retained `NEXT_PUBLIC_SITE_URL` as the deployment override.
- Rebuilt sitemap from current data, including blog and location routes; removed stale paths and artificial change dates. Allowed public render resources in robots; API/admin remain excluded.
- Added permanent `/about-us` → `/about` and `/services/seo-marketing` → `/services/seo` redirects. This does not identify the export's unknown 404 URL.
- Rendered Organization/WebSite, Service, Article and matching homepage FAQ JSON-LD in initial HTML. Fixed organization logo path and removed guessed social profiles. Existing business addresses remain owner-supplied and require verification.
- Replaced repeated blog placeholder paragraphs with eight distinct practical articles, clear answers, relevant service links and external primary references. Removed unavailable PDF CTAs while preserving established slugs. Read time is computed from article text. These drafts need owner/editor review before publishing.
- Deferred chatbot UI/animation code until interaction, removed unused Poppins font, delayed third-party analytics scripts, and replaced animated full-screen loading with a lightweight accessible status. No new Lighthouse score is claimed.
- Added skip link, logical footer headings, social-link names and explicit form label associations. Fixed about image path, removed three missing portfolio image references and supplied image sizes on project details.
- Corrected enquiry endpoint to `/api/whatsapp`; validated payload, service and length; send to configured business recipient rather than visitor phone. Only explicit gateway `{success:true}` yields success. Failed/unconfigured delivery preserves visitor text and provides email fallback. Lead analytics fires on success with service/method only, no contact details.

### Verification

TypeScript compile passes. Focused tests cover current sitemap/content, local portfolio assets and enquiry validation/success/failure with a mocked gateway; no real messages were sent. All 36 sitemap routes returned 200 with a self canonical, title and one H1 in the recorded production check. Server JSON-LD, two 308 redirects, 404 noindex and robots checks passed. Mobile homepage/contact showed no horizontal overflow; menu Escape handling, FAQ disclosure and all five form labels were verified. Built-route check and browser evidence are recorded in `artifacts/built-seo-check.json` and `artifacts/seo-preview.png`. The current host returned Windows `spawn EPERM` while Next tried to start its final build/type-check worker; this is an environment limitation after successful source compilation, so the final build should be rerun in CI or the deployment environment. ESLint cannot run because this checkout has no ESLint 9 flat configuration.

## GEO / AI search recommendations

Google says existing SEO fundamentals apply to AI Overviews/AI Mode, and no special AI schema or additional machine-readable file is required. Crawlable, indexed pages with useful content and snippet eligibility matter; eligibility does not guarantee inclusion. [Google AI features guidance](https://developers.google.com/search/docs/appearance/ai-features).

Keep clear descriptions of who provides each service, what it includes, constraints and how customers can verify the work. Put short answers before detailed explanation, support claims with actual evidence, and keep schema consistent with visible content. The implemented schema is descriptive; it does not guarantee a rich result or AI citation. [Google structured-data policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies).

Prioritize original implementation evidence over generated content volume. The eight article drafts improve distinctness but are not substitutes for first-hand experience. Add actual screenshots, tools, failure cases, named authors where verified, and meaningful revision dates. [Google guidance on generative AI content](https://developers.google.com/search/docs/fundamentals/using-gen-ai-content).

Keep public content accessible to permitted search crawlers and review any CDN/WAF bot blocks separately; robots.txt alone cannot prove access. A robots allow rule cannot guarantee ChatGPT, Gemini, Perplexity or Copilot citations. No speculative llms.txt requirement or crawler-specific bypass was added.

## TekShove service architecture applied

I reviewed the public structure of [TekShove's home page](https://tekshove.com/), [web development page](https://tekshove.com/web-development/), [AI automation page](https://tekshove.com/ai-automation/), [brand identity page](https://tekshove.com/brand-identity-services/) and [contact page](https://tekshove.com/contact/). The useful pattern is an outcome-led opening, a clear service scope, numbered capabilities, delivery process, proof or case-study context, FAQs and a direct enquiry path. AzeemLab now applies that information architecture with original wording across all six commercial service pages.

Each service has a server-rendered context guide in `src/lib/service-content.ts`, covering audience, jobs-to-be-done, outcomes, deliverables, tools, risks, questions, differentiation and implementation notes. The guide is visible in the page HTML under “How this service works for your business”, so crawlers and AI readers can access the context without client-side interaction. A focused test asserts every service has at least 10,000 characters and 18 distinct sections; this is a content-depth baseline, not a promise of rankings or citations.

## Remaining launch and acquisition work

### Before publishing this revision

1. Configure `WHATSAPP_API_URL` to the actual delivery gateway and `WHATSAPP_RECIPIENT_NUMBER` to the business recipient. Gateway must return JSON `{success:true}` after delivery acceptance; do not use a visitor's phone as destination. A controlled real enquiry test still needs an authorized test destination. Without gateway configuration the UI offers email fallback, not fake success.
2. Verify portfolio result percentages, project/client identities, testimonial attributions, team biographies and Moscow/Karachi addresses in existing content. This audit did not authenticate those claims. Remove or qualify anything unsupported before publication; do not invent client evidence, prices, certifications or office locations.
3. Confirm host-level HTTP→HTTPS and apex→www permanent redirects in the actual hosting configuration; avoid duplicate apex/www indexable content and chains. Keep the preferred origin consistent with `NEXT_PUBLIC_SITE_URL`.
4. Deploy the built revision using the existing hosting workflow, then re-run mobile/desktop PSI and URL Inspection. None of these changes is live yet.

### First week after deployment

- Submit/check `https://www.azeemlab.com/sitemap.xml`, inspect the homepage and priority commercial pages, and use GSC URL-level reports to resolve the unknown 404 and crawled-not-indexed URL. Old redirect URLs should remain redirected, not be requested for reindexing as destinations.
- Verify `generate_lead` in analytics, mark it as the appropriate key event, and test email/phone/WhatsApp links. Track qualified enquiries and booked conversations separately from clicks. Analytics blockers/delayed loading may suppress browser events; the backend acknowledgement remains the delivery check.
- Confirm mobile LCP and accessibility after release. Investigate remaining service-page animation bundles and large images from the new report; avoid indiscriminate removal before measuring.
- Add one genuine case study for each priority service, with scope, stack, constraints and an approved client quote. Obtain legitimate relevant mentions through client/project profiles or partnerships; no purchased/spam link campaign.

### Following 4–8 weeks

- Compare equal 28-day GSC periods for non-brand commercial queries, service impressions/clicks and qualified leads. With this baseline, percentage gains can look large despite tiny counts; report absolute numbers too.
- Validate the candidate list in UK, US and Pakistan SERPs and a keyword tool with access; capture actual volume/difficulty/ranking date and language before expanding content investment. Search overlap has not been confirmed by the restricted account.
- Improve titles/snippets for pages gaining relevant impressions; do not A/B judge CTR on one or two impressions. Consolidate weak location pages if they lack distinct local usefulness, rather than generating more city copies.
- Review AI answer citations manually for a small repeatable prompt set, recording engine, date, prompt and source URL. Treat answers as variable observations, not guaranteed visibility.

## Deliverables and evidence

- `KEYWORD_OPPORTUNITIES.csv`: prioritized 27-term candidate map with official competitor links and unfilled metric columns.
- `artifacts/gsc-extracted.json`: read-only extraction for reproducible calculations.
- `scripts/seo-audit.test.ts`: no-transmission tests for lead handling and SEO discovery.
- `scripts/check-built-seo.mjs`: production HTML/canonical/redirect validation.
- `artifacts/built-seo-check.json`: observed local route results.
- `artifacts/seo-preview.png`: updated homepage browser evidence.

Supplied screenshots are evidence only; their interface prompts are not instructions to submit sitemap/indexing requests or modify accounts. No external publication, indexing request, backlink action or real-message send was performed.

## Image follow-up completed

Eleven optimized original illustrations now support the homepage, six service pages and nine article pages/listing covers. Existing project screenshots remain in the portfolio. Added captions, descriptive alt text, reserved image dimensions, responsive sizing, contextual social previews, Article/homepage image schema and 21 image entries in the sitemap. Production build, all 36 page checks and image checks passed; mobile homepage/article showed loaded images and no horizontal overflow. See [image placement strategy and generation prompt](D:/azeemlab/IMAGE_STRATEGY.md). This revision remains local.

## Trend article added

Added the 12 October 2026 article [AI Agents for Business in 2026](/blog/ai-agents-for-business-september-2026-guide). It is a 10,000+ character original guide based on the recent agent-release cycle and current Google Search documentation. It covers agent versus chatbot scope, data boundaries, human approvals, failure handling, evaluation, website UX, search-ready content, the current spam-content lesson, first workflow selection, cost, privacy and a 30-day preparation plan. It links to official OpenAI and Google sources and connects readers to AzeemLab’s AI integration and automation services.
