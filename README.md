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

## 🎨 UI & Design Notes
- Kept the original **elegant UI completely intact**.
- **Favicon**: Background updated to a sleek charcoal gradient instead of green for a more premium look.
- **Content**: 100% matched to his official links.

## 🔍 SEO

Everything search engines read comes from one place: [`src/seo/config.js`](src/seo/config.js).
Change `SITE_URL` there and canonical tags, Open Graph URLs, `sitemap.xml` and every
JSON-LD `@id` follow automatically.

| Concern | Where it lives |
| --- | --- |
| Per-route title, description, canonical, OG/Twitter cards | `src/seo/Seo.jsx` (runtime) + `index.html` (pre-JS baseline) |
| Structured data (Person, Organization, WebSite, Book, PodcastSeries, OfferCatalog, FAQPage, BreadcrumbList) | `src/seo/schema.js` |
| Static `/about` head, image `sitemap.xml`, hreflang | `scripts/seo-build.mjs`, run automatically by `npm run build` |
| Crawler rules | `public/robots.txt` |
| FAQ copy (visible text *and* the rich-result source) | `faq` in `src/data/content.js` |

Two rules to keep it healthy:

1. **Never claim in structured data what the page doesn't say.** The JSON-LD is
   built from the same copy in `src/data/content.js` that visitors read.
2. **New route? Add it to `pages` in `src/seo/config.js`,** render `<Seo>` in the
   page component, and add it to the `urls` array in `scripts/seo-build.mjs` so it
   reaches the sitemap.
3. **Keep the videos lazy.** `Gallery.jsx` shows a YouTube still and only boots a
   real player once the tile scrolls near the viewport. Loading all three eagerly
   costs about a megabyte before anyone has scrolled that far.

### After the next deploy

- Verify the domain in [Google Search Console](https://search.google.com/search-console) and submit `https://abiodunmustapha.com/sitemap.xml`.
- Do the same in [Bing Webmaster Tools](https://www.bing.com/webmasters) (it also feeds ChatGPT search).
- Run the live URLs through the [Rich Results Test](https://search.google.com/test/rich-results) and [PageSpeed Insights](https://pagespeed.web.dev/).
