import { SITE_URL, absolute, pages, person } from './config'
import { graph, personSchema, websiteSchema } from './schema'
import { plainText, publishedPosts, readingTime } from '../lib/posts'

const PERSON_ID = `${SITE_URL}/#person`
const BLOG_ID = `${SITE_URL}/blog#blog`

export function postUrl(post) {
  return absolute(`/blog/${post.slug}`)
}

export function safeImage(cover) {
  if (!cover || cover.startsWith('data:')) return null
  return cover
}

export function withBrand(title) {
  const cleanName = person.name.replace(/\./g, '')
  const branded = `${title} ${cleanName}`
  return branded.length <= 65 ? branded : title
}

export function postSeo(post) {
  return {
    path: `/blog/${post.slug}`,
    title: post.seoTitle || withBrand(post.title),
    description: post.seoDescription || post.excerpt,
    image: safeImage(post.cover) || undefined,
    imageAlt: post.coverAlt || post.title,
    noindex: post.status !== 'published',
  }
}

export function blogSchema() {
  return {
    '@type': 'Blog',
    '@id': BLOG_ID,
    url: absolute('/blog'),
    name: `${person.name} on purpose, discipline and work`,
    description: pages.blog.description,
    inLanguage: 'en',
    author: { '@id': PERSON_ID },
    publisher: { '@id': PERSON_ID },
  }
}

export function postWebPage(post) {
  const url = postUrl(post)
  return {
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: post.title,
    description: post.excerpt,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    inLanguage: 'en',
  }
}

export function blogPostingSchema(post) {
  const url = postUrl(post)
  return {
    '@type': 'BlogPosting',
    '@id': `${url}#post`,
    headline: post.title,
    description: post.seoDescription || post.excerpt,
    url,
    image: safeImage(post.cover) ? absolute(safeImage(post.cover)) : undefined,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    keywords: (post.tags || []).join(', '),
    wordCount: plainText(post).split(/\s+/).filter(Boolean).length,
    timeRequired: `PT${readingTime(post)}M`,
    articleSection: (post.tags || [])[0],
    inLanguage: 'en',
    author: { '@id': PERSON_ID },
    publisher: { '@id': PERSON_ID },
    isPartOf: { '@id': BLOG_ID },
    mainEntityOfPage: { '@id': `${url}#webpage` },
  }
}

function breadcrumb(trail) {
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

export const blogListJsonLd = graph([
  websiteSchema(),
  blogSchema(),
  personSchema(),
  {
    '@type': 'CollectionPage',
    '@id': `${absolute('/blog')}#webpage`,
    url: absolute('/blog'),
    name: pages.blog.title,
    description: pages.blog.description,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    inLanguage: 'en',
  },
  {
    '@type': 'ItemList',
    itemListElement: publishedPosts.map((post, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: postUrl(post),
      name: post.title,
    })),
  },
  breadcrumb([
    { name: 'Home', path: '/' },
    { name: 'Writing', path: '/blog' },
  ]),
])

export function postJsonLd(post) {
  return graph([
    websiteSchema(),
    blogSchema(),
    postWebPage(post),
    blogPostingSchema(post),
    personSchema(),
    breadcrumb([
      { name: 'Home', path: '/' },
      { name: 'Writing', path: '/blog' },
      { name: post.title, path: `/blog/${post.slug}` },
    ]),
  ])
}
