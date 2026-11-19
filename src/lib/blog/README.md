# Reusable PostgreSQL blog reader

## Preserve static and database articles together

The nine existing static articles remain active editorial pages. Their original
URLs, full body sections, images, source links and localized SEO are preserved
in `components/blog/StaticBlogPost.tsx`. The shared detail route checks static
slugs first, without a database request, then resolves other slugs through
`components/blog/DatabaseBlogPost.tsx` and the existing published-only reader.
Both sources appear in the listing, sitemap and `llms.txt`. Static and DB cards
share publication-date ordering and a maximum of 12 cards per listing page.
`listBlogPage` selects 13 lightweight references to detect a next page, then
loads only the selected DB records. It never runs a total-count query. Numbered
pagination shows groups of ten with previous/next arrows and no total-page
display. Only previously reached pages and the verified immediate next page
are enabled; unknown future pages remain disabled. A DB outage
does not remove static detail pages or static discovery URLs.

If a database record has the same slug as a static article, it is available at
`/{locale}/blog/posts/{slug}`. Its listing, canonical, social and discovery URLs
use that path. The static article keeps `/{locale}/blog/{slug}`. Existing
non-colliding database articles retain their current URLs. No stored articles
are renamed, overwritten or deleted. Database articles still have independent
locale records; static translations keep reciprocal language alternates.

Run `node --import tsx --test scripts/blog-coexistence.test.ts` for collision
policy checks and `node --import tsx scripts/check-blog-coexistence.ts` against
the running local app for static body, URL, listing and discovery checks.

Article endings include four latest-article image/title cards after the author
profile on DB articles and after the existing content on static articles. The
shared server component combines up to five published DB candidates in the
selected locale with existing localized static articles, sorts by publication
date, and excludes only the current article URL. Same-slug static/DB articles
remain distinct. Missing covers use the existing site image. On a DB outage,
static cards remain available. No browser-side database access is introduced.

## Official Tiptap media nodes

The active admin editor now emits official `image`, `audio` and `youtube` nodes.
Image/audio nodes retain Tiptap's default attributes, without a custom `asset_id`.
The reader resolves their `src` against this app's `blog_assets.public_url` in
one batch, then applies the existing media-origin and MIME checks. It never
renders uploaded media from an unresolved client-supplied URL.

Uploaded videos and generic attachments are standard paragraph/text/link
content. A standalone registered video link is rendered with native controls;
ordinary links remain links. Legacy `custom*` media nodes are still readable for
existing records; no records were rewritten. The active admin converts them in
memory on load and writes official nodes only after an explicit Save.

The backend and editor changes must be restarted/deployed together before
saving this new representation. Other apps still need their own consumer
adapters. Image URLs in pasted documents must be registered assets in that app;
standard `image` syntax alone does not authorize arbitrary external media.

The media handling described here supersedes the older asset-ID-only notes
below. No tests, type/lint checks, builds or browser checks were run for this
change.

This app reads its own PostgreSQL database directly. It never calls the admin
dashboard, gateway `authorized_apps`, or central users/memberships tables.
Existing cards, article layout, `ContentVisual`, buttons, metadata helper and
escaped `JSONLD` component remain the UI adapters.

## Setup

Social previews use `seo.ts`: each published article emits its own title,
description, canonical URL, language, author, dates and cover image through
Open Graph and X card tags. Cover URLs are public originals with MIME type,
alt text and known dimensions; missing or unlisted covers use `/og-image.png`.
Platform preview layout is controlled by the receiving platform.

To verify the deployed response, run `node scripts/check-blog-social.mjs` with
`CHECK_ORIGIN=https://www.azeemlab.com` and optionally `CHECK_BLOG_PATH`.
The script checks initial HTML head metadata as Facebook, X and LinkedIn bots
and verifies that the selected image is public. Its default origin is localhost.
Deploy the current reader with the database settings and `BLOG_MEDIA_ORIGINS`
before expecting live previews to match local results. Once the deployed URL
passes, refresh the exact URL in Meta's Sharing Debugger if its old preview
remains cached. A share button cannot repair an article URL serving a not-found
page. Production was observed returning HTTP 200 with “Post Not Found” metadata
on 2026-10-25; this observation is separate from local validation.

1. Install dependencies (`npm install`). `postgres` is the only added runtime
   dependency; this checkout had no PostgreSQL client or connection helper.
2. Add the server-only entries from the root `.env.example` to `.env.local` or
   deployment settings. Configure the **AzeemLab** database, preferably using an
   existing SELECT-only role. Never use `NEXT_PUBLIC_` for the connection URL.
3. Set `BLOG_MEDIA_ORIGINS` to the exact HTTPS B2/CDN origins in this database's
   `blog_assets.public_url` values. Restart after changing environment/image
   settings. Unlisted media is omitted. No B2 keys/uploads/signing are required.
   For this app's current bucket, the origin is
   `https://blogpost001.s3.eu-central-003.backblazeb2.com`.
   Configure it in deployment settings too; `.env.local` is not deployed.
4. For a **new empty dedicated database only**, a database owner can manually
   apply `schema.sql`. It is a fresh-database snapshot of the backend's current v3 schema, including its
   `blog_schema_version` marker for admin migration compatibility. The app
   never imports or executes it. Do not execute it against existing tables;
   leave existing schema upgrades to the admin's migration owner. No permissions
   or existing records are modified by this integration.
5. Start the app through its existing dev/build commands when ready. Those
   commands regenerate `src/generated` from the English source routes. They
   have deliberately **not** been run for this task.

The authoritative sources are D:/AIModels_SearchAPIS/app/blog/schema.py,
migrations/schema_v1.py, schema_v2.py, schema_v3.py and their Alembic revisions.
schema.sql now provisions a new empty database at blog_0003, including nullable
blog_assets.uploaded_by_membership_id, its index and blog_posts.author_description.
Uploader attribution has no central membership foreign key and is unused by the reader.
Asset alt text is alt_text; sizes are BIGINT, IDs INTEGER, content/metadata JSONB
and timestamps TIMESTAMPTZ. Never apply this snapshot to an existing database.

On 2026-10-28 read-only inspection of information_schema.columns and the schema
marker confirmed these columns/types and revision blog_0003 in the configured DB.
The URL uses a recognizable pooler host; prepared statements are already disabled.
No tables, records or permissions were changed. This inspection does not verify
SELECT-only grants or sustained connection reliability.

The consumer requires only the database, TLS/pooler, site URL and media-origin
settings shown in .env.example. No B2 credentials or uploads are needed.
Existing .env.local is left intact.

## Module boundaries and reuse

Inline image attribution follows the admin's saved document format: an image
followed immediately by an `Image credit:` / `License:` paragraph is displayed
as one figure with a styled caption area, including its source/license links.
This also applies inside table cells and to legacy image nodes. Asset captions
remain visible above the credit. Credits are not invented when absent; ordinary
following article paragraphs remain separate. No stored document is rewritten.

### Optional article information blocks

The author profile uses the post's stored name, designation, allowlisted avatar
and nullable author_description snapshot (up to 4,000 characters). Older records
can use metadata_json.author_description. Missing descriptions/designations are
hidden and missing avatars display initials. The admin must save changed profile
values into the post snapshot. No central users/memberships lookup, author table
or guessed biography is involved.

The source route `src/app/blog/[slug]/page.tsx` currently comments out
“Article at a glance” and “Article details”. Keep them hidden until wanted;
remove the surrounding JSX comments to show them, then run `npm run locales:compile`
to regenerate localized routes. Do not edit `src/generated` directly.

- `post.relatedKeywords` currently contains the database category name, falling
  back to the title. It is not a stored SEO keyword list or primary question.
- `post.ctaText` / `post.ctaHref` are adapter defaults: “Discuss your project”
  and `/contact`. The sidebar already shows these in a working link/button.
- `post.publishDate` comes from the database's `published_at`. Use a formatted
  date as in the article header, retaining the ISO value in `time.dateTime`.
- Audience and editorial note text in these optional blocks are fixed page
  copy, not per-article database fields. There is no admin input for them yet.

If per-article questions, audiences or calls to action are needed, agree a
metadata contract with the admin and map it in `adapter.ts` before showing it;
the current blocks do not automatically read arbitrary metadata keys.

| Files | Responsibility / changes in another app |
| --- | --- |
| `database.ts` | Connection only: environment URL, TLS, pool limits and timeouts. Reuse an existing app client here if available. |
| `schema.sql` | Manual empty-database provisioning, aligned with authoritative admin v3 schema; never automatic. |
| `queries.ts`, `types.ts` | Published-only reads, parameterized locale/slug/category, joined list covers/categories, one batched content-assets query. Usually unchanged. |
| `document.ts`, `renderer.tsx`, `urls.ts` | Bounded validation, React rendering, media and YouTube URL safety. Usually unchanged. Styles can be adapted. |
| `config.ts` | App origin, route base, supported locales, pagination and media origin configuration. Change these for the target app. |
| `adapter.ts`, `ui.tsx` | Map rows into existing application UI, local navigation labels and CTA links. Replace for another application's components. |
| `seo.ts` | Adapter to the app's metadata helper; rebuild metadata from the published row and validate stored canonical. Change helper imports in another app. |

Copy this folder, install `postgres`, and wire the target app's existing pages to
`listPosts`, `getPost`, `postView`, `BlogContent` and `postSeo`. Its own sitemap
can use `publishedIndex`. Keep server-only imports out of client components.
The framework-specific `connection()` calls opt reads into request-time
rendering; replace those if reusing outside Next.js.

AzeemLab's configured English base is `https://www.azeemlab.com/en/blog`.
Other existing locale listing routes query only their matching database locale;
they do not fall back to English articles. Articles are **not** translations of
one another merely because their slugs match: article metadata and sitemap emit
only the record's own locale alternate. The listing retains existing site locale
rules. Unsupported locales, drafts, archived, missing and wrong-locale articles
reach `notFound()` from both the page and metadata path. Backend slugs are used
unchanged (URL encoding only).

Listing supports `?page=2&category=category-slug`, using existing buttons for
pagination. Default size 12, maximum 48, page maximum 10,000. A category filter
is retained while paging; no category management UI was added.

## Reliability and content handling

- `prepare: false` on every connection avoids named prepared statement reuse
  with PgBouncer/transaction poolers (including SQLSTATE 42P05). Pooler mode can
  be declared with `BLOG_DATABASE_POOLER=true`; hostname and port hints are also
  recognized. This is configuration, **not** evidence that a live pooler was
  tested. TLS certificate verification stays enabled; disable TLS only for
  trusted local development. Connect timeout 5 seconds, idle 20 seconds, maximum
  connection lifetime 300 seconds, pool 3 pooled / 5 direct connections.
  Driver reference: https://github.com/porsager/postgres#all-postgres-options
- Every read runs in a read-only transaction. Transaction-local statement
  timeout is 8 seconds and lock timeout 2 seconds, avoiding pooler-incompatible
  startup parameters. No schema or data writes occur.
- No cross-request database content cache: changes become visible on the next
  server request (revalidation interval **0 seconds**). React `cache()` only
  deduplicates detail/metadata reads within a request. Existing open browser
  tabs require refresh/navigation; do not add a CDN cache in front of these
  responses without an explicit invalidation policy.
- Database/configuration failures throw a sanitized `BlogUnavailableError`
  instead of returning an empty success, false 404, or old mock posts. They use
  the application's Next error path. A true empty published listing has an
  explicit empty state. No database/API credentials are sent to the browser.
  Development errors include a safe failure code and a configuration hint;
  production messages remain generic. Missing `BLOG_DATABASE_URL` is reported
  directly, without hiding it behind a second generic query error. Raw driver
  messages, SQL parameters and connection strings are never attached as causes.
- Version 1 content supports the requested nodes and marks, including the admin's
  TableKit `table`, `tableRow`, `tableCell` and `tableHeader` nodes. Tables use
  bounded spans, column-width metadata and allowlisted alignment, and render as
  semantic HTML with a horizontally scrollable container on narrow screens.
  Validation remains limited to 1 MiB,
  200,000 text characters, 8,000 nodes, depth 24, and eight marks per text node.
  Invalid/unknown structures or versions show a controlled content notice.
  Unsafe links/embeds and missing/untrusted media are omitted. Content is React
  markup; `dangerouslySetInnerHTML` is only used by the existing `<`-escaping
  JSON-LD helper, never for article content.
- Asset IDs are resolved only from the same database. Stored asset MIME types
  must match the media node. Attachments have an explicit inert document/archive
  MIME allowlist; SVG/HTML/executable attachments are omitted. Images are
  responsive, inline media uses native controls and YouTube embeds use only
  exact allowed hosts and validated 11-character IDs. Node `src` is ignored for
  uploaded media. Avatar URLs also require an allowed media origin.
- `metadata_json` supplies bounded title/description; canonical is accepted
  only when it exactly matches this app origin and post route. Social image,
  author and timestamps come from the row/assets. Stored raw JSON-LD/HTML is
  never executed. The existing JSON-LD serializer escapes `<`.
- Sitemap combines all localized static articles with published database records
  using their real modification times. Static entries remain during a DB outage.
  Above 45,000 DB entries it explicitly requires sitemap splitting rather than
  silently truncating. `llms.txt` lists both active article sources.

## Changed integration surfaces / limitations

The listing/detail sources are `src/app/blog/page.tsx` and
`src/app/blog/[slug]/page.tsx`; `src/i18n/pages.ts` preserves article-specific
metadata instead of inventing hreflang translations. `src/app/sitemap.ts`,
`src/app/llms.txt/route.ts`, `next.config.ts`, `.gitignore`, `.env.example` and the
dependency manifest are also updated. Original static editorial data remains
an active, independent article source with its own preserved URLs.

`next.config.ts` disables streaming metadata (`htmlLimitedBots: /.*/`) so the
article's `generateMetadata` existence check completes before a loading fallback
can commit HTTP 200. This is a site-wide Next configuration: metadata must
finish before HTML starts streaming, trading some initial response latency for
correct missing-article status codes. The page and metadata share a request
cache. Preserve a pre-stream existence check when moving to another app with
streaming loading boundaries.
Next configuration reference:
https://nextjs.org/docs/app/api-reference/config/next-config-js/htmlLimitedBots

No tests, lint/type checks, builds, browser checks or database migrations were run.
The read-only catalog inspection above is separate from runtime verification.


## Integration handoff (2026-10-28)

Existing listing/detail UI, static articles, localized routes, rendering, SEO
and sitemap wiring are preserved. The combined listing now orders database posts
with equal publication timestamps by numeric ID descending.

Reads use Next.js connection() and React request-local deduplication only.
There is no shared article cache: admin changes appear on the next server request
without a revalidation delay. Open pages need navigation or refresh.
Database outages keep the existing explicit unavailable state; static articles
remain independently available.

Reuse: copy src/lib/blog, adapt config.ts (origin, routes, locales, media origins),
database.ts (target client/environment), UI adapters and seo.ts (metadata helpers).
Static coexistence imports in config.ts/latest.ts and listing seeds in queries.ts
are AzeemLab adapters; replace those for apps without this editorial data.
Wire destination listing/detail and sitemap to the reader. Apply schema.sql
manually only to an empty dedicated database; existing schemas stay under the
admin migration owner.

No tests, builds, lint/type checks or browser checks were run for this task.
Page behavior, deployment configuration, SELECT-only grants and sustained
pooler reliability remain for owner verification.
