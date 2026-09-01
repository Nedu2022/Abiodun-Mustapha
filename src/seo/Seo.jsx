import { useEffect } from 'react'
import { SITE_URL, absolute, DEFAULT_OG_IMAGE, person } from './config'

// Tiny, dependency-free replacement for react-helmet: it rewrites the document
// head on every route change so each URL has its own title, description,
// canonical and social card. Tags it owns are marked data-seo="1" and cleared
// on unmount, so routes can never inherit each other's metadata.
const OWNED = 'data-seo'

function upsert(selector, create) {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = create()
    el.setAttribute(OWNED, '1')
    document.head.appendChild(el)
  }
  return el
}

function meta(attr, key, content) {
  if (!content) return
  const el = upsert(`meta[${attr}="${key}"]`, () => {
    const m = document.createElement('meta')
    m.setAttribute(attr, key)
    return m
  })
  el.setAttribute('content', content)
}

function link(rel, href, extra = {}) {
  if (!href) return
  const attrs = Object.entries(extra)
  const suffix = attrs.map(([k, v]) => `[${k}="${v}"]`).join('')
  const el = upsert(`link[rel="${rel}"]${suffix}`, () => {
    const l = document.createElement('link')
    l.setAttribute('rel', rel)
    attrs.forEach(([k, v]) => l.setAttribute(k, v))
    return l
  })
  el.setAttribute('href', href)
}

export default function Seo({
  title,
  description,
  path = '/',
  image,
  imageAlt,
  type = 'website',
  jsonLd,
  noindex = false,
}) {
  useEffect(() => {
    const url = absolute(path)
    const img = absolute(image || DEFAULT_OG_IMAGE.path)

    document.title = title
    meta('name', 'description', description)
    meta('name', 'author', person.name)
    meta(
      'name',
      'robots',
      noindex
        ? 'noindex, nofollow'
        : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
    )
    link('canonical', url)
    // The site is English-only, so every URL points at itself and doubles as
    // the x-default. Stated explicitly, it stops Google guessing.
    link('alternate', url, { hreflang: 'en' })
    link('alternate', url, { hreflang: 'x-default' })

    meta('property', 'og:type', type)
    meta('property', 'og:site_name', person.name)
    meta('property', 'og:locale', 'en_US')
    meta('property', 'og:title', title)
    meta('property', 'og:description', description)
    meta('property', 'og:url', url)
    meta('property', 'og:image', img)
    meta('property', 'og:image:alt', imageAlt || DEFAULT_OG_IMAGE.alt)

    meta('name', 'twitter:card', 'summary_large_image')
    meta('name', 'twitter:title', title)
    meta('name', 'twitter:description', description)
    meta('name', 'twitter:image', img)
    meta('name', 'twitter:image:alt', imageAlt || DEFAULT_OG_IMAGE.alt)

    // Structured data is replaced wholesale rather than merged: stale nodes
    // from a previous route are worse than no nodes at all.
    document.head.querySelectorAll('script[data-seo-jsonld]').forEach((s) => s.remove())
    if (jsonLd) {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.setAttribute('data-seo-jsonld', '1')
      script.textContent = JSON.stringify(jsonLd)
      document.head.appendChild(script)
    }
  }, [title, description, path, image, imageAlt, type, noindex, jsonLd])

  return null
}

export { SITE_URL }
