import { ExternalLink } from 'lucide-react'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'
import { gallery } from '../data/content'

// Ambient, always-on preview: the embed autoplays muted on a silent loop with
// every control stripped out (no seek bar, no pause, no keyboard shortcuts).
// It's a moving photograph, not a player — the iframe itself is inert
// (pointer-events-none) and a transparent link sits on top, so the one thing
// a click can do is open the real video on YouTube.
function VideoTile({ id, title }) {
  if (!id) {
    return (
      <div className="flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-line bg-cream-200 p-6 text-center">
        <span className="font-display text-lg italic text-ink/40">Add video</span>
        <span className="h-px w-10 bg-ink/15" />
      </div>
    )
  }

  // Plain youtube.com (not the nocookie domain) — nocookie strips all session
  // context, and an always-anonymous request is what tends to trip YouTube's
  // "sign in to confirm you're not a bot" wall on the embed itself.
  const src = `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&disablekb=1&fs=0&iv_load_policy=3&modestbranding=1&rel=0&playsinline=1`
  // `t=0s` forces YouTube to start at the beginning instead of resuming
  // wherever the viewer last left off (their app/web history does this by
  // default, on both mobile and desktop).
  const url = `https://www.youtube.com/watch?v=${id}&t=0s`

  return (
    <div className="group relative aspect-video w-full overflow-hidden rounded-2xl bg-charcoal shadow-lg shadow-charcoal/10 ring-1 ring-charcoal/5">
      {/* Zoomed past 100% so the wrapper's overflow-hidden crops out
          YouTube's own play/pause and "watch on YouTube" corner chrome —
          controls=0 hides the control bar but not that logo mark. */}
      <iframe
        className="pointer-events-none h-full w-full scale-[1.16]"
        src={src}
        title={title}
        allow="autoplay; encrypted-media"
        tabIndex={-1}
      />
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        aria-label={`Watch "${title}" on YouTube`}
        className="absolute inset-0 flex items-end bg-charcoal/0 transition-colors duration-300 group-hover:bg-charcoal/30"
      >
        <span className="flex w-full items-center justify-between gap-2 bg-gradient-to-t from-charcoal/90 to-transparent px-4 pb-3 pt-10 text-left">
          <span className="text-[13px] font-medium leading-snug text-cream">{title}</span>
          <ExternalLink className="h-4 w-4 flex-none text-cream/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </span>
      </a>
    </div>
  )
}

export default function Gallery() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-[92rem] px-5 sm:px-10">
        <SectionHeading
          eyebrow={gallery.eyebrow}
          title={gallery.title}
          accent={gallery.accent}
          intro={gallery.intro}
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {gallery.videos.map((v, i) => (
            <Reveal key={i} delay={0.08 * i}>
              <VideoTile id={v.id} title={v.title} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
