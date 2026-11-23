# AGENTS.md — Development Log & Project Insights

This document maintains important context, bug fixes, architecture decisions, and codebase updates for AI agents and developers working on the AzeemLab project.

---

## 📅 Updates & Bug Fixes (November 2026)

### 7. Analytics Scripts Centralization & Production-Only Guard
* **Files:**
  - [`src/components/AnalyticsScripts.tsx`](file:///d:/azeemlab/src/components/AnalyticsScripts.tsx)
  - [`src/templates/RootLayout.tsx`](file:///d:/azeemlab/src/templates/RootLayout.tsx)
  - [`src/app/layout.tsx`](file:///d:/azeemlab/src/app/layout.tsx)
* **Changes:**
  1. **Created `AnalyticsScripts.tsx`** as a centralized server component (no `'use client'`) that imports and renders all 4 analytics tools: Google Tag Manager (GTM), Google Analytics 4 (GA4), Microsoft Clarity, and Ahrefs Analytics.
  2. **Production-only guard:** Added `if (!isProd) return null` using `process.env.NODE_ENV === 'production'` check — analytics scripts are **never injected in development**.
  3. **Fixed GTM snippet:** Replaced incorrect `gtm.js` async URL with the proper GTM inline initialization snippet (`(function(w,d,s,l,i){...})`).
  4. **Cleaned `RootLayout.tsx`:** Removed all direct inline `<Script>` tags; only `<AnalyticsScripts />` remains inside `<head>`.
  5. **Fixed TypeScript error in `src/app/layout.tsx`:** Removed stray semicolon after `</html>;` which caused `TS1005: ')' expected` and `TS1128` errors.
  6. **Zero TypeScript errors confirmed:** `pnpm exec tsc --noEmit` exits with code 0.
* **Env Variables (`.env.local`):**
  - `NEXT_PUBLIC_GA_ID` — Google Analytics 4 measurement ID
  - `NEXT_PUBLIC_GTM_ID` — Google Tag Manager container ID
  - `NEXT_PUBLIC_CLARITY_ID` — Microsoft Clarity project ID
  - `NEXT_PUBLIC_AHREF_ID` — Ahrefs Analytics site key

---

### 1. Database Query Fix: Blog Articles Not Loading (Silent Fallback)
* **File:** [`src/lib/blog/queries.ts`](file:///d:/azeemlab/src/lib/blog/queries.ts)
* **Issue:**  
  The blog listing page was failing to load articles from the PostgreSQL database, falling back to 9 hardcoded static posts and displaying the message *"More articles are temporarily unavailable. Please try again shortly."*
* **Root Cause:**  
  `JSON.stringify` was called on the `staticPosts` seeds array before passing it as a query parameter `$2`. In `postgres.js`, passing a string parameter caused PostgreSQL to treat `$2::jsonb` as a JSON string scalar (`jsonb_typeof = 'string'`). Consequently, `jsonb_to_recordset($2::jsonb)` threw `PostgresError: cannot call jsonb_to_recordset on a non-array (Code: 22023)`.
* **Fix Applied:**  
  - Removed `JSON.stringify()` on `seeds` so the raw JavaScript array is passed directly to the driver.
  - Updated the SQL query from `jsonb_to_recordset($2::jsonb)` to `jsonb_to_recordset($2)` since `postgres.js` natively serializes JS arrays/objects into PostgreSQL JSONB.

---

### 2. Card Component Padding Enhancement
* **File:** [`src/components/ui/Card.tsx`](file:///d:/azeemlab/src/components/ui/Card.tsx)
* **Issue:**  
  `<Card>` had hardcoded padding options (`'sm' | 'md' | 'lg'`) defaulting to `md` (`p-6`). Passing utility classes like `p-0!` or `!p-0` did not cleanly remove padding across all render contexts, preventing blog cover images from bleeding to card edges.
* **Fix Applied:**  
  - Added `'none'` to `CardProps['padding']`.
  - Added `none: 'p-0'` to `paddingStyles`.
  - Allowed cards to cleanly disable padding by passing `padding="none"`.

---

### 3. Blog Card Image Aspect Ratio & Edge-to-Edge Layout
* **File:** [`src/app/blog/page.tsx`](file:///d:/azeemlab/src/app/blog/page.tsx)
* **Issues:**  
  1. Images had mismatched aspect ratios and heights (`w-full h-auto`), making the card grid uneven.
  2. Next.js runtime error occurred when both `fill` and `width`/`height` props were supplied to `<Image />`.
  3. Posts without a cover image (`cover_asset_id: null`) left blank space at the top of the card.
  4. Extra card padding caused images to look boxed rather than modern edge-to-edge cover cards.
* **Fix Applied:**  
  - Used `<Card padding="none">`.
  - Wrapped cover images in a fixed container: `<div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">`.
  - Configured `<Image fill className="object-cover transition-transform duration-300 group-hover:scale-105" />` (removed conflicting `width` and `height` properties).
  - Added a reliable fallback `post.visual?.src || '/og-image.png'` so cards without cover images maintain clean UI alignment.
  - Wrapped the text content below the image inside `<div className="p-6 flex-1 flex flex-col">`.

---

### 4. Smart Dynamic Pagination
* **File:** [`src/components/blog/BlogPagination.tsx`](file:///d:/azeemlab/src/components/blog/BlogPagination.tsx)
* **Issue:**  
  Pagination was generating a static range of 10 numbers `[1, 2, ..., 10]`. Even when only 15 articles existed (2 pages total), numbers `3` through `10` were displayed as disabled gray boxes on screen.
* **Fix Applied:**  
  - Removed static 10-page generation and fake disabled spans.
  - Implemented dynamic page calculation based on verified availability (`maxPage = page + (nextAvailable ? 1 : 0)`).
  - Auto-hides pagination when total content fits on a single page (`page === 1 && !nextAvailable`).
  - Displays only legitimate, clickable pages (e.g., `< [ 1 ] [ 2 ] >`).

---

### 5. Modern SEO, AEO & GEO Rendering for Blog Posts
* **Files:**
  - [`src/lib/blog/seo.ts`](file:///d:/azeemlab/src/lib/blog/seo.ts)
  - [`src/lib/blog/types.ts`](file:///d:/azeemlab/src/lib/blog/types.ts)
  - [`src/lib/blog/queries.ts`](file:///d:/azeemlab/src/lib/blog/queries.ts)
  - [`scripts/blog-social.test.ts`](file:///d:/azeemlab/scripts/blog-social.test.ts)
* **Feature:**  
  Implemented support for modern additive SEO, AEO (Answer Engine Optimization), and GEO (Generative Engine Optimization) fields from API V1.1 (`blog_details_json.seo` and mirrored in `metadata_json`).
* **Implementation Details:**  
  1. **Title & Description Fallback Hierarchy:**
     - Title (`title`, `openGraph.title`, `twitter.title`):  
       `post.blog_details_json?.seo?.seo_title || post.metadata_json?.seo_title || post.metadata_json?.title || post.title`
     - Description (`description`, `openGraph.description`, `twitter.description`):  
       `post.blog_details_json?.seo?.meta_description || post.metadata_json?.meta_description || post.metadata_json?.description || post.excerpt`
  2. **Meta Keywords Tag:**
     - Extracted `primary_keyword` and `secondary_keywords`, trimmed whitespace, and deduplicated into an array passed to Next.js `metadata.keywords`.
  3. **Schema.org Structured Data (`BlogPosting`):**
     - Set `headline` to the resolved SEO title.
     - Set `description` to the resolved meta description.
     - Appended `keywords: keywordsList.join(', ')` when keywords exist.
     - Added entity relationship `about: { "@type": "Thing", "name": primaryKeyword }` when `primary_keyword` exists.
  4. **Safety & Zero Regression:**
     - Fully backwards compatible with older posts where `seo` fields are null (falls back cleanly to `post.title` and `post.excerpt`).
     - Added comprehensive unit tests in `scripts/blog-social.test.ts` covering priority hierarchies, keyword extraction, and Schema.org entity relationships.

---

### 6. Career Page: Vacancies State & "No Open Positions" Status
* **Files:**
  - [`src/components/careers/CareersClientPage.tsx`](file:///d:/azeemlab/src/components/careers/CareersClientPage.tsx)
  - `translations/*.json` (all 9 locales)
* **Change:**  
  Cleared the active vacancies list and replaced the job listing cards with a clean, branded "No Open Positions Right Now" state message.
* **Details:**  
  - Emptied `jobListings` array.
  - Added a responsive empty-state card under `#openings` with a briefcase badge, friendly message indicating no current openings, and a "Get in Touch" CTA button leading to `/contact`.
  - Added localized strings for all 9 supported languages (en, es, fr, ja, ko, nl, pt-BR, ru, zh-Hans) and ran `node scripts/localize.mjs`.
