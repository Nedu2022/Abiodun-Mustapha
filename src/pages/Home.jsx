import Seo from '../seo/Seo'
import { pages } from '../seo/config'
import {
  bookSchema,
  faqSchema,
  graph,
  organizationSchema,
  personSchema,
  podcastSchema,
  servicesSchema,
  webPageSchema,
  websiteSchema,
} from '../seo/schema'
import { faq, services } from '../data/content'
import Preloader from '../components/Preloader'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Story from '../components/Story'
import Book from '../components/Book'
import Services from '../components/Services'
import Podcast from '../components/Podcast'
import Speaking from '../components/Speaking'
import Events from '../components/Events'
import Community from '../components/Community'
import Gallery from '../components/Gallery'
import LatestWriting from '../components/blog/LatestWriting'
import Faq from '../components/Faq'
import Footer from '../components/Footer'

const homeJsonLd = graph([
  websiteSchema(),
  webPageSchema({ ...pages.home, type: 'WebPage' }),
  personSchema(),
  organizationSchema(),
  bookSchema(),
  podcastSchema(),
  servicesSchema(services.items),
  faqSchema(faq.items),
])

export default function Home() {
  return (
    <>
      <Seo {...pages.home} image={pages.home.image} jsonLd={homeJsonLd} type="profile" />
      <Preloader />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-charcoal focus:px-5 focus:py-3 focus:text-[13px] focus:text-cream"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <Story />
        <Book />
        <Services />
        <Podcast />
        <Speaking />
        <Events />
        <Community />
        <Gallery />
        <LatestWriting />
        <Faq />
      </main>
      <Footer />
    </>
  )
}
