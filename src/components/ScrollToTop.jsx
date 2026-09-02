import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { forceTop } from '../lib/scroll'

export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useLayoutEffect(() => {
    if (hash) {
      const target = document.querySelector(hash)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return undefined
      }
    }

    forceTop()
    const frame = requestAnimationFrame(forceTop)
    return () => cancelAnimationFrame(frame)
  }, [pathname, hash])

  return null
}
