import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import PostCard from './PostCard'
import { publishedPosts } from '../../lib/posts'

export default function LatestWriting() {
  const posts = publishedPosts.slice(0, 3)
  if (posts.length === 0) return null

  return (
    <section id="writing" className="scroll-mt-24 bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Writing"
            title="Long-form,"
            accent="in my own words"
            intro="The frameworks I teach, written out in full. New pieces twice a month."
          />
          <Reveal delay={0.1}>
            <Link
              to="/blog"
              className="group inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.14em] text-green transition-colors hover:text-green-deep"
            >
              All writing
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={0.05 * i}>
              <PostCard post={post} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
