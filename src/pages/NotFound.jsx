import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Seo from '../seo/Seo'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Dr. Abiodun Mustapha' },
  { to: '/blog', label: 'Writing' },
]

export default function NotFound() {
  return (
    <>
      <Seo
        path="/404"
        title="Page not found | Dr. Abiodun Mustapha"
        description="That page does not exist on this site."
        noindex
      />
      <Navbar dark />
      <main id="main" className="flex min-h-svh flex-col justify-center bg-charcoal text-cream">
        <div className="mx-auto w-full max-w-2xl px-5 py-32 sm:px-8">
          <span className="eyebrow text-gold">404</span>
          <h1 className="mt-5 font-display text-4xl leading-[1.05] sm:text-5xl">
            That page does not <span className="accent text-gold">exist</span>
          </h1>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-cream/70">
            The link may be old, or the address may have a typo in it. Here is where most people were
            trying to go.
          </p>
          <ul className="mt-10 flex flex-col border-t border-cream/12">
            {links.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="block border-b border-cream/12 py-4 font-display text-xl text-cream transition-colors hover:text-gold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer hideCta />
    </>
  )
}
