// ---------------------------------------------------------------------------
// Post-build SEO pass.
//
// Vite ships a single index.html, which means every route would be served with
// the home page's <head>. Crawlers that don't execute JavaScript, and every
// social scraper (LinkedIn, WhatsApp, X, Slack), never see the metadata React
// writes at runtime, so /about would share the home page's title, description
// and canonical. That is a duplicate-content signal on the two most important
// URLs on the site.
//
// This script solves it statically: it stamps a real dist/about/index.html with
// its own head, then writes the sitemap. Both Vercel and Netlify check the
// filesystem before applying the SPA rewrite, so the static file wins and the
// React router still takes over on the client.
// ---------------------------------------------------------------------------
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = resolve(root, 'dist')

const { SITE_URL, pages, absolute } = await import(
  new URL('../src/seo/config.js', import.meta.url).href
)

const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

/** Rewrites the content="" of a meta tag, whichever order its attributes sit in. */
function setMeta(html, attr, key, value) {
  const k = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const after = new RegExp(`(<meta[^>]*${attr}="${k}"[^>]*content=")[^"]*(")`, 'i')
  if (after.test(html)) return html.replace(after, `$1${esc(value)}$2`)
  const before = new RegExp(`(<meta[^>]*content=")[^"]*("[^>]*${attr}="${k}")`, 'i')
  if (before.test(html)) return html.replace(before, `$1${esc(value)}$2`)
  return html.replace('</head>', `    <meta ${attr}="${key}" content="${esc(value)}" />\n  </head>`)
}

function setCanonical(html, url) {
  return html.replace(
    /(<link[^>]*rel="canonical"[^>]*href=")[^"]*(")/i,
    `$1${esc(url)}$2`
  )
}

// The hreflang alternates have to move with the canonical, or /about would tell
// Google that the English version of itself lives on the home page.
function setAlternates(html, url) {
  return html.replace(
    /(<link[^>]*rel="alternate"[^>]*hreflang="[^"]*"[^>]*href=")[^"]*(")/gi,
    `$1${esc(url)}$2`
  )
}

function setJsonLd(html, json) {
  const block = `<script type="application/ld+json" data-seo-jsonld="1">\n${JSON.stringify(
    json,
    null,
    2
  )}\n    </script>`
  return html.replace(
    /<script type="application\/ld\+json" data-seo-jsonld="1">[\s\S]*?<\/script>/i,
    block
  )
}

const PERSON_ID = `${SITE_URL}/#person`

// The Person, Organization and WebSite nodes are lifted straight out of the
// built index.html rather than restated here, so /about resolves its @id
// references to real nodes instead of dangling pointers, and there is still
// only one definition of who he is.
function baseNodes(shell) {
  const match = shell.match(
    /<script type="application\/ld\+json" data-seo-jsonld="1">([\s\S]*?)<\/script>/i
  )
  if (!match) return []
  try {
    const parsed = JSON.parse(match[1])
    return (parsed['@graph'] || []).filter((n) =>
      ['Person', 'Organization', 'WebSite'].includes(n['@type'])
    )
  } catch {
    return []
  }
}

const aboutGraph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfilePage',
      '@id': `${absolute(pages.about.path)}#webpage`,
      url: absolute(pages.about.path),
      name: pages.about.title,
      description: pages.about.description,
      inLanguage: 'en',
      about: { '@id': PERSON_ID },
      isPartOf: { '@id': `${SITE_URL}/#website` },
      mainEntity: { '@id': PERSON_ID },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'About', item: absolute(pages.about.path) },
      ],
    },
  ],
}

async function buildAboutPage(shell) {
  const { title, description, path, image } = pages.about
  const url = absolute(path)
  let html = shell

  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${esc(title)}</title>`)
  html = setMeta(html, 'name', 'description', description)
  html = setCanonical(html, url)
  html = setAlternates(html, url)
  html = setMeta(html, 'property', 'og:title', title)
  html = setMeta(html, 'property', 'og:description', description)
  html = setMeta(html, 'property', 'og:url', url)
  html = setMeta(html, 'property', 'og:image', absolute(image))
  html = setMeta(html, 'name', 'twitter:title', title)
  html = setMeta(html, 'name', 'twitter:description', description)
  html = setMeta(html, 'name', 'twitter:image', absolute(image))
  // The about portrait is a different shape from the home hero.
  html = html.replace(/<meta property="og:image:width"[\s\S]*?\/>\s*/i, '')
  html = html.replace(/<meta property="og:image:height"[\s\S]*?\/>\s*/i, '')
  html = html.replace(
    /<link rel="preload" as="image"[^>]*>/i,
    `<link rel="preload" as="image" href="${image}" fetchpriority="high" />`
  )
  html = setJsonLd(html, {
    ...aboutGraph,
    '@graph': [...aboutGraph['@graph'], ...baseNodes(shell)],
  })

  // Written twice on purpose. Vercel resolves a clean /about URL to about.html,
  // Netlify and most static hosts resolve it to about/index.html, and neither
  // reaches the SPA rewrite while a real file matches. Shipping both means the
  // page keeps its own <head> wherever this is deployed.
  await mkdir(resolve(dist, 'about'), { recursive: true })
  await writeFile(resolve(dist, 'about/index.html'), html, 'utf8')
  await writeFile(resolve(dist, 'about.html'), html, 'utf8')
  return 'about.html + about/index.html'
}

// Image entries are worth the extra lines: portraits and stage photography are
// how a speaker gets found in Google Images, and the captions carry the same
// keywords as the alt text on the page.
const homeImages = [
  ['/images/portrait-suit.jpg', 'Dr. Abiodun Mustapha, personal development expert, educator and speaker'],
  ['/images/portrait-bw.jpg', 'Dr. Abiodun Mustapha, who grew up in Oshodi, Lagos'],
  ['/images/speaking-tedx.jpg', 'Dr. Abiodun Mustapha speaking on the TEDx stage about purpose'],
  ['/images/book-30.jpg', 'Cover of 30 Lessons Life Taught Me Before 30 by Dr. Abiodun Mustapha'],
  ['/images/event-lightcongress.jpg', 'Dr. Abiodun Mustapha speaking at the China IECC Workshop'],
  ['/images/speaking-futureforward.jpg', 'Dr. Abiodun Mustapha organising TEDx'],
  ['/images/speaking-advance.jpg', 'Dr. Abiodun Mustapha speaking at the SHI Conference'],
  ['/images/speaking-confab.jpg', 'Dr. Abiodun Mustapha as team lead at Leadership Confab'],
  ['/images/portrait-formal.jpg', 'Dr. Abiodun Mustapha, host of the Growth Secrets podcast'],
]

const aboutImages = [
  ['/images/portrait-gesture.jpg', 'Dr. Abiodun Mustapha, founder of Growth Hub Africa and GIZ-certified business trainer'],
]

async function buildSitemap() {
  const lastmod = new Date().toISOString().slice(0, 10)
  const urls = [
    { loc: `${SITE_URL}/`, priority: '1.0', changefreq: 'weekly', images: homeImages },
    {
      loc: absolute(pages.about.path),
      priority: '0.8',
      changefreq: 'monthly',
      images: aboutImages,
    },
  ]
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${u.loc}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${u.loc}" />
${u.images
  .map(
    ([src, caption]) => `    <image:image>
      <image:loc>${absolute(src)}</image:loc>
      <image:title>${esc(caption)}</image:title>
    </image:image>`
  )
  .join('\n')}
  </url>`
  )
  .join('\n')}
</urlset>
`
  await writeFile(resolve(dist, 'sitemap.xml'), xml, 'utf8')
  return 'sitemap.xml'
}

const shell = await readFile(resolve(dist, 'index.html'), 'utf8')
const written = [await buildAboutPage(shell), await buildSitemap()]
console.log(`SEO: wrote ${written.join(', ')}`)
