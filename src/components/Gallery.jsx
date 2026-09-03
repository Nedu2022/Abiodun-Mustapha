import { useEffect, useRef, useState } from 'react'
import { ExternalLink } from 'lucide-react'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'
import { gallery } from '../data/content'
import { loadVideos, fetchVideos } from '../lib/videos'

let ytApiPromise
function loadYouTubeApi() {
  if (!ytApiPromise) {
    ytApiPromise = new Promise((resolve) => {
      if (window.YT?.Player) {
        resolve(window.YT)
        return
      }
      const prev = window.onYouTubeIframeAPIReady
      window.onYouTubeIframeAPIReady = () => {
        prev?.()
        resolve(window.YT)
      }
      if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
        const tag = document.createElement('script')
        tag.src = 'https://www.youtube.com/iframe_api'
        document.head.appendChild(tag)
      }
    })
  }
  return ytApiPromise
}

function VideoTile({ id, title }) {
  const mountRef = useRef(null)
  const playerRef = useRef(null)
  const frameRef = useRef(null)

  const [inView, setInView] = useState(
    () => typeof IntersectionObserver === 'undefined'
  )

  useEffect(() => {
    const node = frameRef.current
    if (!node || inView) return undefined
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true)
          io.disconnect()
        }
      },
      { rootMargin: '300px' }
    )
    io.observe(node)
    return () => io.disconnect()
  }, [inView])

  useEffect(() => {
    if (!id || !inView || !mountRef.current) return
    let cancelled = false

    loadYouTubeApi().then((YT) => {
      if (cancelled || !mountRef.current) return
      playerRef.current = new YT.Player(mountRef.current, {
        videoId: id,
        width: '100%',
        height: '100%',
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          loop: 1,
          playlist: id,
          rel: 0,
          playsinline: 1,
          modestbranding: 1,
        },
        events: {
          onReady: (e) => {
            e.target.mute()
            e.target.playVideo()
          },
          onStateChange: (e) => {
            if (e.data === YT.PlayerState.ENDED) {
              e.target.seekTo(0)
              e.target.playVideo()
            }
          },
        },
      })
    })

    return () => {
      cancelled = true
      playerRef.current?.destroy?.()
    }
  }, [id, inView])

  if (!id) {
    return (
      <div className="flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-line bg-cream-200 p-6 text-center">
        <span className="font-display text-lg italic text-ink/40">Add video</span>
        <span className="h-px w-10 bg-ink/15" />
      </div>
    )
  }

  const url = `https://www.youtube.com/watch?v=${id}&t=0s`

  return (
    <div
      ref={frameRef}
      className="group relative aspect-video w-full overflow-hidden rounded-2xl bg-charcoal shadow-lg shadow-charcoal/10 ring-1 ring-charcoal/5"
    >
      <div className="pointer-events-none h-full w-full scale-[1.16]">
        {inView ? (
          <div ref={mountRef} className="h-full w-full" />
        ) : (

          <img
            src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
            alt={`Still from "${title}", a video by Dr. Abiodun Mustapha`}
            width={480}
            height={360}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        )}
      </div>
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
  const [videos, setVideos] = useState(loadVideos)

  useEffect(() => {
    let cancelled = false
    fetchVideos()
      .then((live) => {
        if (!cancelled && Array.isArray(live) && live.length > 0) setVideos(live)
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [])

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
          {videos.map((v, i) => (
            <Reveal key={v.id || i} delay={0.08 * i}>
              <VideoTile id={v.id} title={v.title} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
