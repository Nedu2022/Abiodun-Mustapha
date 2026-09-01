import Media from '../ui/Media'

function Block({ block }) {
  if (block.type === 'heading') {
    return (
      <h2 className="mt-12 font-display text-[1.7rem] leading-tight text-ink sm:text-[2rem]">
        {block.text}
      </h2>
    )
  }

  if (block.type === 'quote') {
    return (
      <figure className="my-10 border-l-2 border-gold pl-6">
        <blockquote className="font-display text-xl italic leading-snug text-ink/85 sm:text-2xl">
          {block.text}
        </blockquote>
        {block.cite && (
          <figcaption className="mt-3 text-[13px] uppercase tracking-[0.14em] text-ink-faint">
            {block.cite}
          </figcaption>
        )}
      </figure>
    )
  }

  if (block.type === 'image') {
    return (
      <figure className="my-10">
        <Media
          src={block.src}
          alt={block.alt || ''}
          label="Add image"
          className="aspect-[3/2]"
        />
        {block.caption && (
          <figcaption className="mt-3 text-[13px] italic text-ink-soft">{block.caption}</figcaption>
        )}
      </figure>
    )
  }

  if (block.type === 'list') {
    return (
      <ul className="mt-6 flex flex-col gap-3 pl-0">
        {(block.items || []).map((item, i) => (
          <li key={i} className="flex gap-4">
            <span className="mt-[0.6em] h-1.5 w-1.5 flex-none rounded-full bg-gold" />
            <span className="text-[17px] leading-[1.75] text-ink-soft">{item}</span>
          </li>
        ))}
      </ul>
    )
  }

  if (block.type === 'divider') {
    return <hr className="my-12 border-0 border-t border-line" />
  }

  return <p className="mt-6 text-[17px] leading-[1.8] text-ink-soft">{block.text}</p>
}

export default function PostBody({ body = [] }) {
  return (
    <div className="max-w-[68ch]">
      {body.map((block, i) => (
        <Block key={i} block={block} />
      ))}
    </div>
  )
}
