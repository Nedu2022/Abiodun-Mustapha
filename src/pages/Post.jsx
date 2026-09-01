import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import NotFound from './NotFound'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Button from '../components/ui/Button'
import Media from '../components/ui/Media'
import Reveal from '../components/ui/Reveal'
import PostBody from '../components/blog/PostBody'
import PostCard from '../components/blog/PostCard'
import Seo from '../seo/Seo'
import { postJsonLd, postSeo } from '../seo/blogSchema'
import { formatDate, postBySlug, readingTime, relatedPosts } from '../lib/posts'
import { site } from '../data/content'

export default function Post() {
  const { slug } = useParams()
  const post = postBySlug(slug)

  if (!post) return <NotFound />

  const related = relatedPosts(post)

  return (
    <>
      <Seo {...postSeo(post)} jsonLd={postJsonLd(post)} type="article" article={post} />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-charcoal focus:px-5 focus:py-3 focus:text-[13px] focus:text-cream"
      >
        Skip to content
      </a>
      <Navbar dark />
      <main id="main">
        <article>
          <header className="bg-charcoal pb-16 pt-36 text-cream sm:pt-40">
            <div className="mx-auto max-w-3xl px-5 sm:px-8">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.14em] text-cream/60 transition-colors hover:text-gold"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                All writing
              </Link>

              <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] font-medium uppercase tracking-[0.16em] text-gold">
                {(post.tags || []).map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
                <span className="text-cream/50">{readingTime(post)} min read</span>
              </div>

              <h1 className="mt-5 font-display text-[2.1rem] leading-[1.08] sm:text-[2.8rem] md:text-[3.2rem]">
                {post.title}
              </h1>

              <p className="mt-6 font-display text-lg italic leading-snug text-cream/70 sm:text-xl">
                {post.excerpt}
              </p>

              <div className="mt-8 flex items-center gap-4 border-t border-cream/12 pt-6">
                <Media
                  src="/images/portrait-formal.jpg"
                  alt={site.name}
                  className="h-11 w-11 flex-none"
                  rounded="rounded-full"
                />
                <div className="text-[13px] leading-tight">
                  <div className="text-cream">{site.name}</div>
                  <div className="text-cream/50">
                    <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {post.cover && (
            <div className="bg-charcoal">
              <div className="mx-auto max-w-5xl px-5 sm:px-8">
                <Media
                  src={post.cover}
                  alt={post.coverAlt || post.title}
                  label="Add cover"
                  className="aspect-[16/9] translate-y-0"
                  width={1600}
                  height={900}
                  priority
                />
              </div>
              <div className="h-16 bg-gradient-to-b from-charcoal to-cream sm:h-20" />
            </div>
          )}

          <div className="bg-cream pb-20 sm:pb-28">
            <div className="mx-auto max-w-3xl px-5 sm:px-8">
              <PostBody body={post.body} />

              <div className="mt-16 border-t border-line pt-10">
                <span className="eyebrow text-gold">Where to next</span>
                <h2 className="mt-4 max-w-lg font-display text-2xl leading-snug text-ink sm:text-3xl">
                  If this helped, the next step is a{' '}
                  <span className="accent text-green">conversation</span>
                </h2>
                <div className="mt-7">
                  <Button href={site.ctaHref} variant="primary">
                    {site.ctaLabel}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </article>

        {related.length > 0 && (
          <section className="bg-white py-16 sm:py-20">
            <div className="mx-auto max-w-6xl px-5 sm:px-8">
              <span className="eyebrow text-gold">Keep reading</span>
              <div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2">
                {related.map((item, i) => (
                  <Reveal key={item.slug} delay={0.05 * i}>
                    <PostCard post={item} />
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  )
}
