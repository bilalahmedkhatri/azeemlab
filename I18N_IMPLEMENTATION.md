# AzeemLab multilingual implementation

Implemented 20 October 2026. English remains the source copy; the site now has English, Russian, Dutch, French, Spanish, Brazilian Portuguese, Simplified Chinese, Korean and Japanese editions.

## Routes and loading

- Explicit editions: `/en`, `/ru`, `/nl`, `/fr`, `/es`, `/pt-BR`, `/zh-Hans`, `/ko`, `/ja`. Original service, location, project and article slugs are retained.
- Unprefixed requests receive a temporary 307: saved `AZEEMLAB_LOCALE` choice, then trusted Vercel country, then weighted browser language, then English. Explicit locale URLs always win.
- Country mappings: RU→ru, NL→nl, FR→fr, ES→es, BR/PT→pt-BR, CN→zh-Hans, KR→ko, JP→ja. Geographic signals are used only when `VERCEL=1`; they are presentation preferences, never authorization.
- APIs, Next assets and extension-bearing assets/discovery files bypass locale redirects. Existing legacy about/SEO redirects are retained, including their prefixed equivalents.
- The native header dropdown retains the page, query and anchor. Its POST saves a host-only, HttpOnly, SameSite=Lax cookie for one year, Secure in production. Language choices do not prefetch other editions.

## Shared source and translation maintenance

`scripts/localize.mjs` compiles the existing shared English pages/components/content into isolated locale modules under ignored `src/generated/`. The English root shell and loading template are preserved in `src/templates/`. The compiler reuses layout, components, IDs, URLs and interaction code; translated copies are generated artifacts rather than independently maintained page implementations.

There are 1,782 extracted source messages per locale. Saved catalogs are in `translations/`. Ordinary `pnpm dev` and `pnpm build` compile these checked-in catalogs without contacting a translation provider; missing entries fail compilation. English is not substituted for a missing supported-language entry. `next-intl` provides the validated request locale and client locale context with an empty messages object; complete catalogs are not serialized into a client provider.

Each filesystem locale imports its own generated module registry. A combined multi-locale registry was tested and rejected because Next preloaded unrelated client chunks. Initial HTML/RSC and referenced JavaScript checks now find the selected homepage copy and none of the other eight locale sentinels.

To update copy:

1. Edit the shared English source, preserving technical IDs and URLs.
2. Run `pnpm locales:extract` and review the source catalog changes. Display-copy extraction uses TypeScript syntax/context; new content patterns should be reviewed when introduced.
3. Supply the new entries in every translated catalog. The explicit authoring command `node scripts/localize.mjs --translate` can generate missing machine translations from public editorial strings; it is never part of the normal build or request path.
4. Run `pnpm build` and the checks below. Do not edit generated locale modules directly.

The initial catalogs are machine translations. Placeholder completeness, protected brand names, rendered routes and loading isolation were checked; native-speaker editorial review of long-form, legal and technical translations has not been performed. Numeric phrasing can follow the target language (for example, “more than 4” for “4+”). User-entered text, lead-report data, API identities, client project names, existing screenshots and third-party documents are not automatically translated.

## SEO and security controls

- The sitemap contains 333 language URLs for 37 public pages, with reciprocal alternates and English `x-default`. Pages set self-canonicals, HTML language, Open Graph locale, translated metadata and localized structured-data URLs. `llms.txt` links all editions and uses explicit English source URLs.
- Locale values are an exact allowlist. Untrusted values never choose filesystem import paths. Explicit routes overwrite client-supplied internal locale headers.
- The language endpoint requires a same-origin POST, limits its request payload and validates the locale. It accepts no redirect destination; navigation is constructed from the browser's existing same-origin URL.
- Negotiated redirects use private/no-store caching. Explicit editions have distinct URLs; current dynamic responses also report private/no-store caching. Locale state is request-scoped.
- Translation values are emitted as escaped strings. Template substitutions come from the trusted English source, and JSON-LD retains script-context escaping. No browser translation widget or visitor-time translation API was added.
- `.vercelignore` excludes local environment files, service-account JSON, keys, GSC exports, private tooling/session directories, generated modules and local reports. Catalog JSON and the existing public sample report are explicit exceptions. Vercel rebuilds locale modules from source and catalogs.

Research references: [Next.js internationalization](https://nextjs.org/docs/app/guides/internationalization), [next-intl server/client boundaries](https://next-intl.dev/docs/environments/server-client-components), [Vercel geolocation](https://vercel.com/kb/guide/geo-ip-headers-geolocation-vercel-functions), [Google localized versions](https://developers.google.com/search/docs/specialty/international/localized-versions), [OWASP redirect validation](https://cheatsheetseries.owasp.org/cheatsheets/Unvalidated_Redirects_and_Forwards_Cheat_Sheet.html). Country-first negotiation is the requested behavior; direct language URLs remain accessible rather than being forced back by geolocation.

## Verification

- Local production build and Vercel Linux production build: passed, including TypeScript.
- `npx tsx --test scripts/i18n.test.ts scripts/seo-audit.test.ts`: 10 passed. Enquiry delivery tests use a mocked gateway; no live enquiries were sent.
- `npx tsx scripts/check-localized.ts`: all 333 local production URLs returned 200 with the matching HTML language, self-canonical, one H1 and ten alternate links. Evidence: `artifacts/i18n-http-check.json`.
- `node scripts/check-localized-bundles.mjs`: all nine initial HTML/RSC plus referenced client bundle sets passed locale-sentinel isolation. Evidence: `artifacts/i18n-bundle-check.json`.
- Real browser: Russian→French dropdown, mobile French menu, Simplified Chinese at 390px, loaded hero image, saved-choice restoration with query/hash, and Russian tablet navigation at 900px checked. No width overflow was observed in these checks.
- Hosted authenticated Vercel checks: all nine language homepages, canonicals/alternates, cookie precedence, query preservation, private/no-store redirect, explicit language URL and preview noindex passed. Evidence: `artifacts/i18n-preview-check.json`.
- Physical access from Russia was not tested. RU detection is covered by the country/preference tests; live Vercel routing and cache behavior were checked through authenticated preview requests.

Preview: https://azeemlab-qwrljx559-bilalahmedkhatrioutlookcoms-projects.vercel.app/en. This is a protected preview deployment; production was not promoted. Vercel adds `X-Robots-Tag: noindex` to this preview. Existing Vercel analytics scripts return 404 on the local production server, where the Vercel platform endpoints are unavailable; these were not i18n rendering errors.

For local HTTP/bundle verification the default origin is `http://localhost:3100`; set `CHECK_ORIGIN` for another port. Hosted verification can be repeated with `scripts/check-i18n-preview.ps1 -Preview <preview-url>` through the authenticated Vercel CLI. No protection bypass token is stored in this repository or in the test evidence.
