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
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Preloader />
      <Navbar />
      <main>
        <Hero />
        <Story />
        <Book />
        <Services />
        <Podcast />
        <Speaking />
        <Events />
        <Community />
        <Gallery />
      </main>
      <Footer />
    </>
  )
}
