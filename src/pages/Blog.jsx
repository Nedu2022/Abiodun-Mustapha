import { useMemo, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Reveal from '../components/ui/Reveal'
import PostCard from '../components/blog/PostCard'
import Seo from '../seo/Seo'
import { pages } from '../seo/config'
import { blogListJsonLd } from '../seo/blogSchema'
import { blogMeta, publishedPosts } from '../lib/posts'

export default function Blog() {
  const [tag, setTag] = useState('All')

  const tags = useMemo(() => {
    const found = new Set()
    publishedPosts.forEach((post) => (post.tags || []).forEach((t) => found.add(t)))
    return ['All', ...found]
  }, [])

  const visible = tag === 'All' ? publishedPosts : publishedPosts.filter((p) => (p.tags || []).includes(tag))
  const [lead, ...rest] = visible

  return (
    <>
      <Seo {...pages.blog} jsonLd={blogListJsonLd} />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-charcoal focus:px-5 focus:py-3 focus:text-[13px] focus:text-cream"
      >
        Skip to content
      </a>
      <Navbar dark />
      <main id="main">
        <header className="bg-charcoal pb-16 pt-36 text-cream sm:pt-40">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <span className="eyebrow text-gold">{blogMeta.eyebrow}</span>
            <h1 className="mt-5 max-w-3xl font-display text-4xl leading-[1.05] sm:text-5xl md:text-[3.4rem]">
              {blogMeta.title} <span className="accent text-gold">{blogMeta.accent}</span>
            </h1>
            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-cream/70">{blogMeta.intro}</p>
          </div>
        </header>

        <section className="bg-cream py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            {tags.length > 2 && (
              <div className="mb-12 flex flex-wrap gap-2">
                {tags.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTag(t)}
                    className={`rounded-full border px-4 py-2 text-[12px] font-medium uppercase tracking-[0.12em] transition-colors ${
                      t === tag
                        ? 'border-green bg-green text-cream'
                        : 'border-line text-ink-soft hover:border-green hover:text-green'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            )}

            {visible.length === 0 && (
              <p className="font-display text-xl italic text-ink-soft">
                Nothing here yet. The first piece is being written.
              </p>
            )}

            {lead && (
              <Reveal className="border-b border-line pb-14">
                <PostCard post={lead} featured />
              </Reveal>
            )}

            {rest.length > 0 && (
              <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((post, i) => (
                  <Reveal key={post.slug} delay={0.05 * i}>
                    <PostCard post={post} />
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
