// ---------------------------------------------------------------------------
// JSON-LD builders. Every claim here is also stated in the visible page copy.
// Google penalises structured data that describes things the page doesn't show,
// so nothing is asserted that isn't in src/data/content.js.
// ---------------------------------------------------------------------------
import {
  SITE_URL,
  absolute,
  book,
  organization,
  pages,
  person,
  podcast,
} from './config'

const PERSON_ID = `${SITE_URL}/#person`
const SITE_ID = `${SITE_URL}/#website`
const ORG_ID = `${SITE_URL}/#organization`

export const personSchema = () => ({
  '@type': 'Person',
  '@id': PERSON_ID,
  name: person.name,
  alternateName: person.alternateNames,
  honorificPrefix: person.honorificPrefix,
  givenName: person.givenName,
  familyName: person.familyName,
  jobTitle: person.jobTitle,
  description: pages.home.description,
  url: SITE_URL,
  image: absolute(person.image),
  email: `mailto:${person.email}`,
  telephone: person.telephone,
  address: {
    '@type': 'PostalAddress',
    addressLocality: person.city,
    addressCountry: person.country,
  },
  nationality: { '@type': 'Country', name: person.countryName },
  knowsAbout: person.knowsAbout,
  hasCredential: person.credentials.map((c) => ({
    '@type': 'EducationalOccupationalCredential',
    name: c,
  })),
  worksFor: { '@id': ORG_ID },
  founder: { '@id': ORG_ID },
  sameAs: person.sameAs,
})

export const organizationSchema = () => ({
  '@type': 'Organization',
  '@id': ORG_ID,
  name: organization.name,
  legalName: organization.legalName,
  description: organization.description,
  url: organization.url,
  founder: { '@id': PERSON_ID },
  areaServed: 'Africa',
})

export const websiteSchema = () => ({
  '@type': 'WebSite',
  '@id': SITE_ID,
  url: SITE_URL,
  name: person.name,
  description: pages.home.description,
  inLanguage: 'en',
  publisher: { '@id': PERSON_ID },
  copyrightHolder: { '@id': PERSON_ID },
})

export const bookSchema = () => ({
  '@type': 'Book',
  '@id': `${SITE_URL}/#book-30-lessons`,
  name: book.name,
  alternativeHeadline: book.alternativeHeadline,
  description: book.description,
  image: absolute(book.image),
  inLanguage: book.inLanguage,
  bookFormat: 'https://schema.org/EBook',
  author: { '@id': PERSON_ID },
  url: book.amazon,
  sameAs: [book.amazon, book.store],
})

export const podcastSchema = () => ({
  '@type': 'PodcastSeries',
  '@id': `${SITE_URL}/#podcast`,
  name: podcast.name,
  description: podcast.description,
  webFeed: podcast.feed,
  url: podcast.url,
  author: { '@id': PERSON_ID },
  sameAs: [podcast.url, podcast.youtube],
})

// The three ways to work with him, as a catalogue Google can surface.
export const servicesSchema = (services) => ({
  '@type': 'OfferCatalog',
  '@id': `${SITE_URL}/#services`,
  name: 'Ways to work with Dr. Abiodun Mustapha',
  itemListElement: services.map((s, i) => ({
    '@type': 'Offer',
    position: i + 1,
    itemOffered: {
      '@type': 'Service',
      name: s.title,
      description: s.desc,
      serviceType: s.tag,
      provider: { '@id': PERSON_ID },
      areaServed: 'Worldwide',
    },
  })),
})

export const faqSchema = (faqs) => ({
  '@type': 'FAQPage',
  '@id': `${SITE_URL}/#faq`,
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
})

export const breadcrumbSchema = (trail) => ({
  '@type': 'BreadcrumbList',
  itemListElement: trail.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    item: absolute(item.path),
  })),
})

export const webPageSchema = ({ path, title, description, type = 'WebPage' }) => ({
  '@type': type,
  '@id': `${absolute(path)}#webpage`,
  url: absolute(path),
  name: title,
  description,
  isPartOf: { '@id': SITE_ID },
  about: { '@id': PERSON_ID },
  primaryImageOfPage: absolute(person.image),
  inLanguage: 'en',
})

// One @graph per page keeps every node cross-referenced by @id, which is how
// Google resolves the site to a single real-world entity instead of loose bits.
export const graph = (nodes) => ({
  '@context': 'https://schema.org',
  '@graph': nodes.filter(Boolean),
})
