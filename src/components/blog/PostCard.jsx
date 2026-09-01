import { Link } from 'react-router-dom'
import Media from '../ui/Media'
import { formatDate, readingTime } from '../../lib/posts'

export default function PostCard({ post, featured = false }) {
  return (
    <article className={featured ? 'group' : 'group flex h-full flex-col'}>
      <Link to={`/blog/${post.slug}`} className="flex h-full flex-col">
        <Media
          src={post.cover}
          alt={post.coverAlt || post.title}
          label="Add cover"
          className={featured ? 'aspect-[16/9]' : 'aspect-[3/2]'}
          imgClassName="transition-transform duration-700 group-hover:scale-105"
        />
        <div className="flex flex-1 flex-col gap-3 pt-5">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-medium uppercase tracking-[0.16em] text-gold">
            {(post.tags || []).map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
            <span className="text-ink-faint">{readingTime(post)} min read</span>
          </div>
          <h3
            className={`font-display leading-snug text-ink transition-colors group-hover:text-green ${
              featured ? 'text-[1.8rem] sm:text-[2.3rem]' : 'text-xl'
            }`}
          >
            {post.title}
          </h3>
          <p className="text-[15px] leading-relaxed text-ink-soft">{post.excerpt}</p>
          <span className="mt-auto pt-3 text-[12px] uppercase tracking-[0.14em] text-ink-faint">
            {formatDate(post.publishedAt)}
          </span>
        </div>
      </Link>
    </article>
  )
}
