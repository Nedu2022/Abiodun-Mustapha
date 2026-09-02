import { readFile, readdir, stat } from 'node:fs/promises'
import { resolve, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = resolve(root, 'dist')
const ORIGIN = 'https://abiodunmustapha.com'

const results = []
const check = (group, name, ok, detail = '') => results.push({ group, name, ok, detail })

const read = (p) => readFile(resolve(dist, p), 'utf8')
const exists = async (p) => {
  try {
    await stat(resolve(dist, p))
    return true
  } catch {
    return false
  }
}

async function htmlPages() {
  const found = []
  const walk = async (rel) => {
    for (const entry of await readdir(resolve(dist, rel), { withFileTypes: true })) {
      const next = rel ? join(rel, entry.name) : entry.name
      if (entry.isDirectory()) {
        if (['assets', 'images'].includes(entry.name)) continue
        await walk(next)
      } else if (entry.name === 'index.html' || next === '404.html') {
        found.push(next)
      }
    }
  }
  await walk('')
  return found.sort()
}

const tag = (html, re) => {
  const m = html.match(re)
  return m ? m[1].trim() : null
}
const metaOf = (html, attr, key) => {
  const a = html.match(new RegExp(`<meta[^>]*${attr}="${key}"[^>]*content="([^"]*)"`, 'i'))
  if (a) return a[1]
  const b = html.match(new RegExp(`<meta[^>]*content="([^"]*)"[^>]*${attr}="${key}"`, 'i'))
  return b ? b[1] : null
}
const urlFor = (page) => {
  if (page === '404.html') return null
  const path = page.replace(/index\.html$/, '').replace(/\/$/, '')
  return path ? `${ORIGIN}/${path}` : `${ORIGIN}/`
}

const pages = await htmlPages()
const indexable = pages.filter((p) => p !== '404.html')

const titles = new Map()
const descriptions = new Map()

for (const page of pages) {
  const html = await read(page)
  const label = page.replace('/index.html', '') || '/'
  const title = tag(html, /<title>([\s\S]*?)<\/title>/i)
  const desc = metaOf(html, 'name', 'description')
  const canonical = tag(html, /<link[^>]*rel="canonical"[^>]*href="([^"]*)"/i)
  const robots = metaOf(html, 'name', 'robots')
  const is404 = page === '404.html'
  check('Metadata', `${label} has a title`, Boolean(title))
  if (!is404) {
    check(
      'Metadata',
      `${label} title length 15-65`,
      Boolean(title) && title.length >= 15 && title.length <= 65,
      title ? `${title.length} chars` : ''
    )
  }
  check('Metadata', `${label} has a description`, Boolean(desc))
  if (!is404) {
    check(
      'Metadata',
      `${label} description length 70-165`,
      Boolean(desc) && desc.length >= 70 && desc.length <= 165,
      desc ? `${desc.length} chars` : ''
    )
  }
  if (title) titles.set(label, title)
  if (desc) descriptions.set(label, desc)

  if (!is404) {
    check('Indexing', `${label} canonical is absolute https`, Boolean(canonical?.startsWith(ORIGIN)))
    check(
      'Indexing',
      `${label} canonical is self-referencing`,
      canonical === urlFor(page),
      canonical || 'missing'
    )
    check('Indexing', `${label} is indexable`, Boolean(robots?.startsWith('index')), robots || '')
  } else {
    check('Indexing', '404 page is noindex', Boolean(robots?.includes('noindex')), robots || '')
  }

  const alternates = [...html.matchAll(/<link[^>]*rel="alternate"[^>]*hreflang="([^"]*)"[^>]*href="([^"]*)"/gi)]
  if (!is404) {
    check(
      'Indexing',
      `${label} hreflang points at itself`,
      alternates.length === 2 && alternates.every(([, , href]) => href === urlFor(page)),
      alternates.map(([, lang]) => lang).join(', ')
    )
  }

  for (const key of ['og:title', 'og:description', 'og:url', 'og:image', 'og:type', 'og:site_name']) {
    check('Social', `${label} has ${key}`, Boolean(metaOf(html, 'property', key)))
  }
  check(
    'Social',
    `${label} og:image is absolute`,
    Boolean(metaOf(html, 'property', 'og:image')?.startsWith('https://'))
  )
  for (const key of ['twitter:card', 'twitter:title', 'twitter:description', 'twitter:image']) {
    check('Social', `${label} has ${key}`, Boolean(metaOf(html, 'name', key)))
  }
  if (!is404) {
    check('Social', `${label} og:url matches canonical`, metaOf(html, 'property', 'og:url') === canonical)
  }

  const ld = html.match(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/i)
  if (!is404) {
    check('Schema', `${label} has JSON-LD`, Boolean(ld))
    if (ld) {
      let graph = null
      try {
        graph = JSON.parse(ld[1])
      } catch {
        graph = null
      }
      check('Schema', `${label} JSON-LD parses`, Boolean(graph))
      if (graph) {
        const nodes = graph['@graph'] || [graph]
        const defined = new Set(nodes.map((n) => n['@id']).filter(Boolean))
        const referenced = []
        const walkRefs = (value) => {
          if (Array.isArray(value)) return value.forEach(walkRefs)
          if (value && typeof value === 'object') {
            const keys = Object.keys(value)
            if (keys.length === 1 && keys[0] === '@id') referenced.push(value['@id'])
            else Object.values(value).forEach(walkRefs)
          }
        }
        walkRefs(nodes)
        const dangling = referenced.filter((id) => !defined.has(id))
        check('Schema', `${label} every @id reference resolves`, dangling.length === 0, dangling.join(' '))

        const posting = nodes.find((n) => n['@type'] === 'BlogPosting')
        if (posting) {
          for (const field of ['headline', 'datePublished', 'dateModified', 'author', 'image']) {
            check('Schema', `${label} BlogPosting has ${field}`, Boolean(posting[field]))
          }
        }
      }
    }
  }

  const fallbacks = [...html.matchAll(/<noscript>([\s\S]*?)<\/noscript>/gi)].map((m) => m[1])
  const article = fallbacks.find((f) => f.includes('<h1'))
  check('Content', `${label} has pre-JS content`, Boolean(article), article ? `${article.length} chars` : '')
  if (article) {
    const h1s = [...article.matchAll(/<h1[^>]*>/gi)].length
    check('Content', `${label} has exactly one h1`, h1s === 1, `${h1s} found`)
    const imgs = [...article.matchAll(/<img[^>]*>/gi)].map((m) => m[0])
    const missingAlt = imgs.filter((img) => !/alt="[^"]+"/i.test(img))
    check('Content', `${label} fallback images have alt text`, missingAlt.length === 0, `${imgs.length} images`)
  }

  if (!is404) {
    check(
      'Performance',
      `${label} preloads its LCP image`,
      /<link rel="preload" as="image"/i.test(html)
    )
    check(
      'Performance',
      `${label} fonts are non-blocking`,
      /fonts\.googleapis\.com[^>]*media="print"/i.test(html)
    )
  }
  check('Content', `${label} declares lang`, /<html[^>]*lang="en"/i.test(html))
  check('Content', `${label} has a viewport`, Boolean(metaOf(html, 'name', 'viewport')))
}

check('Metadata', 'All titles are unique', new Set(titles.values()).size === titles.size)
check('Metadata', 'All descriptions are unique', new Set(descriptions.values()).size === descriptions.size)

const robotsTxt = await read('robots.txt')
check('Indexing', 'robots.txt exists', Boolean(robotsTxt))
check('Indexing', 'robots.txt allows crawling', /^Allow: \//m.test(robotsTxt))
check('Indexing', 'robots.txt blocks /admin', /Disallow: \/admin/.test(robotsTxt))
check('Indexing', 'robots.txt links the sitemap', robotsTxt.includes(`${ORIGIN}/sitemap.xml`))

const sitemap = await read('sitemap.xml')
const locs = [...sitemap.matchAll(/<loc>([^<]*)<\/loc>/g)].map((m) => m[1])
const mods = [...sitemap.matchAll(/<lastmod>([^<]*)<\/lastmod>/g)].map((m) => m[1])
check('Indexing', 'sitemap has entries', locs.length > 0, `${locs.length} URLs`)
check('Indexing', 'sitemap URLs are absolute https', locs.every((l) => l.startsWith(`${ORIGIN}/`)))
check('Indexing', 'sitemap lastmod dates are valid', mods.every((m) => /^\d{4}-\d{2}-\d{2}$/.test(m)))
check(
  'Indexing',
  'every indexable page is in the sitemap',
  indexable.every((p) => locs.includes(urlFor(p))),
  indexable.filter((p) => !locs.includes(urlFor(p))).join(' ')
)
check('Indexing', 'sitemap excludes /admin', !locs.some((l) => l.includes('/admin')))
check('Indexing', 'sitemap has image entries', sitemap.includes('<image:loc>'))

const rss = await read('rss.xml')
check('Feed', 'rss.xml exists', Boolean(rss))
check('Feed', 'rss items have guid and pubDate', /<guid/.test(rss) && /<pubDate>/.test(rss))
check('Feed', 'rss declares a self link', rss.includes('rel="self"'))

check('Indexing', '404.html is generated', await exists('404.html'))
check('Performance', 'manifest is present', await exists('site.webmanifest'))
check('Performance', 'assets are fingerprinted', (await readdir(resolve(dist, 'assets'))).every((f) => /-[A-Za-z0-9_-]{8,}\./.test(f)))

const groups = [...new Set(results.map((r) => r.group))]
let failed = 0
for (const group of groups) {
  const rows = results.filter((r) => r.group === group)
  const pass = rows.filter((r) => r.ok).length
  console.log(`\n${group}  ${pass}/${rows.length}`)
  for (const row of rows.filter((r) => !r.ok)) {
    failed += 1
    console.log(`  FAIL  ${row.name}${row.detail ? `  (${row.detail})` : ''}`)
  }
}
console.log(
  `\n${results.length - failed}/${results.length} checks passed across ${pages.length} pages`
)
process.exit(failed ? 1 : 0)
