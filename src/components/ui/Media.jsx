import { useState } from 'react'

export default function Media({
  src,
  alt = '',
  className = '',
  imgClassName = '',
  label,
  rounded = 'rounded-none',
  width,
  height,
  priority = false,
}) {
  const [failed, setFailed] = useState(false)
  const showImage = src && !failed

  return (
    <div className={`relative overflow-hidden bg-cream-200 ${rounded} ${className}`}>
      {showImage ? (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          fetchPriority={priority ? 'high' : 'auto'}
          onError={() => setFailed(true)}
          className={`h-full w-full object-cover ${imgClassName}`}
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-cream-200 p-6 text-center">
          <span className="font-display text-lg italic text-ink/40">
            {label || 'Add photo'}
          </span>
          <span className="h-px w-10 bg-ink/15" />
        </div>
      )}
    </div>
  )
}
