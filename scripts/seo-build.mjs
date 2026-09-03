import { execFileSync } from 'node:child_process'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = resolve(root, 'dist')

const { SITE_URL, pages, absolute, person } = await import(
  new URL('../src/seo/config.js', import.meta.url).href
)

const { about, speaking, credentials, site } = await import(
  new URL('../src/data/content.js', import.meta.url).href
)

function gitDate(...paths) {
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cs', '--', ...paths], {
      cwd: root,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim()
    if (/^\d{4}-\d{2}-\d{2}$/.test(out)) return out
  } catch {
    return null
  }
  return null
}

const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

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

function setAlternates(html, url) {
  return html.replace(
    /(<link[^>]*rel="alternate"[^>]*hreflang="[^"]*"[^>]*href=")[^"]*(")/gi,
    `$1${esc(url)}$2`
  )
}

function setNoscript(html, inner) {
  let replaced = false
  return html.replace(/<noscript>[\s\S]*?<\/noscript>/gi, (match) => {
    if (replaced || !match.includes('<h1')) return match
    replaced = true
    return `<noscript>\n      ${inner}\n    </noscript>`
  })
}

function setOgType(html, type) {
  return html.replace(/(<meta[^>]*property="og:type"[^>]*content=")[^"]*(")/i, `$1${type}$2`)
}

function setArticleMeta(html, post) {
  const tags = (post.tags || [])
    .map((tag) => `    <meta property="article:tag" content="${esc(tag)}" />`)
    .join('\n')
  const block = [
    `    <meta property="article:published_time" content="${esc(post.publishedAt)}" />`,
    `    <meta property="article:modified_time" content="${esc(post.updatedAt || post.publishedAt)}" />`,
    `    <meta property="article:author" content="${esc(person.name)}" />`,
    `    <meta property="article:section" content="${esc((post.tags || [])[0] || 'Personal development')}" />`,
    tags,
  ]
    .filter(Boolean)
    .join('\n')
  return html.replace('</head>', `${block}\n  </head>`)
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

const posts = JSON.parse(
  await readFile(new URL('../src/data/posts.json', import.meta.url), 'utf8')
)

const published = posts
  .filter((post) => post.status === 'published' && post.publishedAt)
  .filter((post) => new Date(post.publishedAt).getTime() <= Date.now())
  .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))

const PERSON_ID = `${SITE_URL}/#person`
const BLOG_ID = `${SITE_URL}/blog#blog`

function blockToHtml(block) {
  if (block.type === 'heading') return `<h2>${esc(block.text || '')}</h2>`
  if (block.type === 'quote') return `<blockquote><p>${esc(block.text || '')}</p></blockquote>`
  if (block.type === 'divider') return '<hr>'
  if (block.type === 'list') {
    return `<ul>${(block.items || []).map((i) => `<li>${esc(i)}</li>`).join('')}</ul>`
  }
  if (block.type === 'image') {
    const caption = block.caption ? `<figcaption>${esc(block.caption)}</figcaption>` : ''
    return `<figure><img src="${esc(block.src || '')}" alt="${esc(block.alt || '')}">${caption}</figure>`
  }
  return `<p>${esc(block.text || '')}</p>`
}

function articleHtml(post) {
  return [
    `<h1>${esc(post.title)}</h1>`,
    `<p><em>${esc(post.excerpt)}</em></p>`,
    `<p>By ${esc(person.name)}, <time datetime="${esc(post.publishedAt)}">${esc(post.publishedAt)}</time></p>`,
    ...(post.body || []).map(blockToHtml),
    '<p><a href="/blog">More writing by Dr. Abiodun Mustapha</a></p>',
  ].join('\n      ')
}

function indexHtml() {
  const items = published
    .map(
      (post) =>
        `<li><a href="/blog/${esc(post.slug)}">${esc(post.title)}</a> &mdash; ${esc(post.excerpt)}</li>`
    )
    .join('\n        ')
  return [
    '<h1>Writing by Dr. Abiodun Mustapha</h1>',
    `<p>${esc(pages.blog.description)}</p>`,
    `<ul>\n        ${items}\n      </ul>`,
  ].join('\n      ')
}

function wordCount(post) {
  return (post.body || [])
    .map((b) => (b.type === 'list' ? (b.items || []).join(' ') : b.text || b.caption || ''))
    .join(' ')
    .split(/\s+/)
    .filter(Boolean).length
}

function postGraph(post) {
  const url = absolute(`/blog/${post.slug}`)
  return {
    '@type': 'BlogPosting',
    '@id': `${url}#post`,
    headline: post.title,
    description: post.seoDescription || post.excerpt,
    url,
    image: post.cover ? absolute(post.cover) : undefined,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    keywords: (post.tags || []).join(', '),
    wordCount: wordCount(post),
    articleSection: (post.tags || [])[0],
    inLanguage: 'en',
    author: { '@id': PERSON_ID },
    publisher: { '@id': PERSON_ID },
    isPartOf: { '@id': BLOG_ID },
    mainEntityOfPage: { '@id': `${url}#webpage` },
  }
}

function crumbs(trail) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absolute(item.path),
    })),
  }
}

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

function aboutNoscript() {
  const bio = about.body.map((paragraph) => `<p>${esc(paragraph)}</p>`).join('\n      ')
  const creds = about.credentials.map((item) => `<li>${esc(item)}</li>`).join('\n        ')
  const marks = credentials.map((item) => `<li>${esc(item)}</li>`).join('\n        ')
  const topics = speaking.topics.map((item) => `<li>${esc(item)}</li>`).join('\n        ')
  return [
    `<h1>${esc(person.name)}</h1>`,
    `<p><strong>${esc(person.jobTitle)}</strong></p>`,
    bio,
    '<h2>Credentials and memberships</h2>',
    `<ul>\n        ${creds}\n      </ul>`,
    '<h2>Also known for</h2>',
    `<ul>\n        ${marks}\n      </ul>`,
    '<h2>Speaking topics</h2>',
    `<ul>\n        ${topics}\n      </ul>`,
    `<p>For speaking, coaching or media enquiries, write to <a href="mailto:${esc(site.email)}">${esc(site.email)}</a>.</p>`,
    '<p><a href="/">Home</a> &middot; <a href="/blog">Writing</a></p>',
  ].join('\n      ')
}

async function buildAboutPage(shell) {
  return buildStamped(shell, {
    path: pages.about.path,
    title: pages.about.title,
    description: pages.about.description,
    image: pages.about.image,
    ogType: 'profile',
    noscript: aboutNoscript(),
    out: 'about',
    jsonLd: aboutGraph,
  })
}

async function buildNotFound(shell) {
  let html = shell
  html = html.replace(
    /<title>[\s\S]*?<\/title>/i,
    `<title>Page not found | ${esc(person.name)}</title>`
  )
  html = setMeta(
    html,
    'name',
    'description',
    'That page does not exist on this site. Try the home page, the full biography, or the writing archive instead.'
  )
  html = setMeta(html, 'name', 'robots', 'noindex, follow')
  html = setNoscript(
    html,
    [
      '<h1>Page not found</h1>',
      '<p>That page does not exist. Try one of these instead:</p>',
      '<ul>\n        <li><a href="/">Home</a></li>\n        <li><a href="/about">About Dr. Abiodun Mustapha</a></li>\n        <li><a href="/blog">Writing</a></li>\n      </ul>',
    ].join('\n      ')
  )
  await writeFile(resolve(dist, '404.html'), html, 'utf8')
  return '404.html'
}

async function writeBoth(relPath, html) {
  await mkdir(resolve(dist, relPath), { recursive: true })
  await writeFile(resolve(dist, `${relPath}/index.html`), html, 'utf8')
  await writeFile(resolve(dist, `${relPath}.html`), html, 'utf8')
}

async function buildStamped(
  shell,
  { path, title, description, image, jsonLd, noscript, out, ogType = 'website', article }
) {
  const url = absolute(path)
  let html = shell

  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${esc(title)}</title>`)
  html = setMeta(html, 'name', 'description', description)
  html = setCanonical(html, url)
  html = setAlternates(html, url)
  html = setMeta(html, 'property', 'og:title', title)
  html = setMeta(html, 'property', 'og:description', description)
  html = setMeta(html, 'property', 'og:url', url)
  html = setMeta(html, 'name', 'twitter:title', title)
  html = setMeta(html, 'name', 'twitter:description', description)
  html = html.replace(/<meta property="og:image:width"[\s\S]*?\/>\s*/i, '')
  html = html.replace(/<meta property="og:image:height"[\s\S]*?\/>\s*/i, '')
  if (image) {
    html = setMeta(html, 'property', 'og:image', absolute(image))
    html = setMeta(html, 'name', 'twitter:image', absolute(image))
    html = html.replace(
      /<link rel="preload" as="image"[^>]*>/i,
      `<link rel="preload" as="image" href="${image}" fetchpriority="high" />`
    )
  }
  html = setOgType(html, ogType)
  if (article) html = setArticleMeta(html, article)
  html = setNoscript(html, noscript)
  html = setJsonLd(html, { ...jsonLd, '@graph': [...jsonLd['@graph'], ...baseNodes(shell)] })

  await writeBoth(out, html)
  return `${out}.html`
}

async function buildBlog(shell) {
  const written = []

  written.push(
    await buildStamped(shell, {
      path: '/blog',
      title: pages.blog.title,
      description: pages.blog.description,
      image: pages.blog.image,
      noscript: indexHtml(),
      out: 'blog',
      ogType: 'website',
      jsonLd: {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Blog',
            '@id': BLOG_ID,
            url: absolute('/blog'),
            name: `${person.name} on purpose, discipline and work`,
            description: pages.blog.description,
            inLanguage: 'en',
            author: { '@id': PERSON_ID },
            publisher: { '@id': PERSON_ID },
          },
          {
            '@type': 'CollectionPage',
            '@id': `${absolute('/blog')}#webpage`,
            url: absolute('/blog'),
            name: pages.blog.title,
            description: pages.blog.description,
            isPartOf: { '@id': `${SITE_URL}/#website` },
            inLanguage: 'en',
          },
          crumbs([
            { name: 'Home', path: '/' },
            { name: 'Writing', path: '/blog' },
          ]),
        ],
      },
    })
  )

  for (const post of published) {
    written.push(
      await buildStamped(shell, {
        path: `/blog/${post.slug}`,
        title:
          post.seoTitle ||
          (`${post.title} Dr Abiodun Mustapha`.length <= 65
            ? `${post.title} Dr Abiodun Mustapha`
            : post.title),
        description: post.seoDescription || post.excerpt,
        image: post.cover,
        noscript: articleHtml(post),
        out: `blog/${post.slug}`,
        ogType: 'article',
        article: post,
        jsonLd: {
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Blog',
              '@id': BLOG_ID,
              url: absolute('/blog'),
              name: `${person.name} on purpose, discipline and work`,
              inLanguage: 'en',
              author: { '@id': PERSON_ID },
              publisher: { '@id': PERSON_ID },
            },
            {
              '@type': 'WebPage',
              '@id': `${absolute(`/blog/${post.slug}`)}#webpage`,
              url: absolute(`/blog/${post.slug}`),
              name: post.title,
              description: post.excerpt,
              isPartOf: { '@id': `${SITE_URL}/#website` },
              inLanguage: 'en',
            },
            postGraph(post),
            crumbs([
              { name: 'Home', path: '/' },
              { name: 'Writing', path: '/blog' },
              { name: post.title, path: `/blog/${post.slug}` },
            ]),
          ],
        },
      })
    )
  }

  return `${written.length} blog pages`
}

async function buildFeed() {
  const items = published
    .map((post) => {
      const url = absolute(`/blog/${post.slug}`)
      return `    <item>
      <title>${esc(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <description>${esc(post.excerpt)}</description>
    </item>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(person.name)}</title>
    <link>${SITE_URL}/blog</link>
    <description>${esc(pages.blog.description)}</description>
    <language>en</language>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`
  await writeFile(resolve(dist, 'rss.xml'), xml, 'utf8')
  return 'rss.xml'
}

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
  const homeMod =
    gitDate('src/pages/Home.jsx', 'src/components', 'src/data/content.js', 'index.html') || lastmod
  const aboutMod = gitDate('src/pages/About.jsx', 'src/components/About.jsx') || lastmod

  const urls = [
    { loc: `${SITE_URL}/`, priority: '1.0', changefreq: 'weekly', images: homeImages, mod: homeMod },
    {
      loc: absolute(pages.about.path),
      priority: '0.8',
      changefreq: 'monthly',
      images: aboutImages,
      mod: aboutMod,
    },
    {
      loc: absolute('/blog'),
      priority: '0.9',
      changefreq: 'weekly',
      images: [],
      mod: published[0]?.updatedAt || published[0]?.publishedAt || lastmod,
    },
    ...published.map((post) => ({
      loc: absolute(`/blog/${post.slug}`),
      priority: '0.7',
      changefreq: 'monthly',
      mod: post.updatedAt || post.publishedAt,
      images: post.cover ? [[post.cover, post.coverAlt || post.title]] : [],
    })),
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
    <lastmod>${u.mod}</lastmod>
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
const written = [
  await buildAboutPage(shell),
  await buildNotFound(shell),
  await buildBlog(shell),
  await buildFeed(),
  await buildSitemap(),
]
console.log(`SEO: wrote ${written.join(', ')}`)
