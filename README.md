# Dr. Abiodun Mustapha Portfolio

![Abiodun Mustapha Cover](/public/images/speaking-tedx.jpg)

A premium, editorial personal-brand site for **Dr. Abiodun Mustapha**, built to showcase his life's work as a Personal Development Expert, Educator, Author, and Transformational Speaker. 

From the streets of Oshodi to global impact, this portfolio embodies his journey and provides immediate access to his resources, books, and teachings.

## 🔗 Official Links
All content and links reflect his official Linktree and LinkedIn profiles:
- **Medium Story**: [From Oshodi to Purpose](https://medium.com/@abiodunmustapha11/from-the-streets-of-oshodi-to-academic-scholarship-the-inspiring-story-of-a-young-boy-bf5d35c147a8)
- **Book**: [30 Lessons Life Taught Me Before 30 (Amazon)](https://www.amazon.com/dp/B088QT8B9W) | [Selar Store](https://selar.co/m/AbiodunMustapha)
- **Podcast**: [Growth Secrets Podcast](https://podcasts.google.com/feed/aHR0cHM6Ly9hbmNob3IuZm0vcy8yOGM1MDMwMC9wb2RjYXN0L3Jzcw?ep=14)
- **YouTube**: [Abiodun Mustapha Channel](https://www.youtube.com/channel/UC4KuhzkY8SNEbEUD78LBo6w)
- **Community**: [Growth Hub Africa (Telegram)](https://t.me/growthhubafrica)
- **Free Resources**: [Purpose Challenge](http://t.me/purposechallenge) | [Free Purpose Book](http://bit.ly/freepurposebook) | [Productizing Your Knowledge](http://bit.ly/ProductizingYourKnowledge) | [Localization Ebook](https://sendfox.com/lp/1we5r0)
- **Booking**: [WhatsApp (Speaking/Training)](https://api.whatsapp.com/send?phone=2348148560609)
- **LinkedIn**: [Abiodun Mustapha](https://www.linkedin.com/in/abiodunmustapha/)
- **Linktree**: [linktr.ee/abiodunmustapha](https://linktr.ee/abiodunmustapha)

## 📸 Gallery & Moments

![Speaking](/public/images/speaking-white.jpg)
![Events](/public/images/speaking-agbada.jpg)

## 🛠 Tech Stack

- **React 19 (Vite)**
- **Tailwind CSS v4**
- **Framer Motion** for scroll reveals, animations, and transitions.

## 🚀 Getting Started

```bash
npm install
npm run dev
```

To build for production (e.g. Vercel deployment):
```bash
npm run build
```

Before deploying, check the SEO output. This fails the command if anything regressed:
```bash
npm run audit
```

## 🎨 UI & Design Notes
- Kept the original **elegant UI completely intact**.
- **Favicon**: Background updated to a sleek charcoal gradient instead of green for a more premium look.
- **Content**: 100% matched to his official links.

## ✍️ Blog & Writing Studio

Posts live in [`src/data/posts.json`](src/data/posts.json) and are the source of truth
for the site, the sitemap and the RSS feed.

| Piece | Where |
| --- | --- |
| Post data and helpers (reading time, related, slugify) | `src/data/posts.json`, `src/lib/posts.js` |
| `/blog` index and `/blog/:slug` post pages | `src/pages/Blog.jsx`, `src/pages/Post.jsx` |
| Content block renderer (text, heading, image, quote, list, divider) | `src/components/blog/PostBody.jsx` |
| Editor at `/admin` | `src/pages/Admin.jsx`, `src/components/admin/` |

**Publishing today.** The studio has no backend. Save keeps work in that browser's
`localStorage`; to put a post on the live site, click **Export**, replace
`src/data/posts.json` with the downloaded file, and deploy.

**Connecting a real CMS.** `src/lib/posts.js` is the only module that knows where posts
come from. Swapping its JSON import for a Sanity or Supabase fetch, plus the matching
read in `scripts/seo-build.mjs`, removes the export step. The editor, the renderer and
the whole SEO layer keep working untouched.

## 🔍 SEO

Everything search engines read comes from one place: [`src/seo/config.js`](src/seo/config.js).
Change `SITE_URL` there and canonical tags, Open Graph URLs, `sitemap.xml` and every
JSON-LD `@id` follow automatically.

| Concern | Where it lives |
| --- | --- |
| Per-route title, description, canonical, hreflang, OG/Twitter cards | `src/seo/Seo.jsx` (runtime) + `index.html` (pre-JS baseline) |
| Structured data for the marketing pages | `src/seo/schema.js` |
| Structured data for the blog (`Blog`, `BlogPosting`, breadcrumbs) | `src/seo/blogSchema.js` |
| Static pages for `/about`, `/blog`, every post, plus `404.html`, `rss.xml` and the image sitemap | `scripts/seo-build.mjs`, run by `npm run build` |
| Crawler rules | `public/robots.txt` |
| FAQ copy (visible text *and* the rich-result source) | `faq` in `src/data/content.js` |

### The audit

`npm run audit` builds the site and runs [`scripts/seo-audit.mjs`](scripts/seo-audit.mjs)
over the output: 232 checks across every generated page covering indexability, title and
description length, canonical and hreflang self-reference, Open Graph and Twitter cards,
JSON-LD parsing and `@id` resolution, pre-JavaScript content, LCP preloads and the feeds.
It exits non-zero on failure, so it works as a deploy gate.

### Rules to keep it healthy

1. **Never claim in structured data what the page doesn't say.** The JSON-LD is built
   from the same copy in `src/data/content.js` and `src/data/posts.json` that visitors read.
2. **New route?** Add it to `pages` in `src/seo/config.js`, render `<Seo>` in the page
   component, and add it to `scripts/seo-build.mjs` so it gets a static head and a
   sitemap entry. Anything not prerendered will 404 in production.
3. **Only `/admin` uses the SPA rewrite.** Every other page is a real file, which is what
   makes wrong URLs return a genuine 404 instead of a soft one. Don't widen the rewrite
   in `vercel.json` or `public/_redirects` without regenerating the pages.
4. **Keep the videos lazy.** `Gallery.jsx` shows a YouTube still and only boots a real
   player once the tile scrolls near the viewport. Loading all three eagerly costs about
   a megabyte before anyone has scrolled that far.
5. **Titles stay under 65 characters.** The site name is appended to post titles only
   when the result still fits; the audit enforces this.

### After the next deploy

- Verify the domain in [Google Search Console](https://search.google.com/search-console) and submit `https://abiodunmustapha.com/sitemap.xml`.
- Do the same in [Bing Webmaster Tools](https://www.bing.com/webmasters) (it also feeds ChatGPT search).
- Run the live URLs through the [Rich Results Test](https://search.google.com/test/rich-results) and [PageSpeed Insights](https://pagespeed.web.dev/).
