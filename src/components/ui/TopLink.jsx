import { useCallback, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const MAX_WAIT = 900
const AT_TOP = 4

export default function TopLink({ to, children, onClick, ...rest }) {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const frames = useRef([])

  useEffect(
    () => () => {
      frames.current.forEach((id) => cancelAnimationFrame(id))
      frames.current = []
    },
    []
  )

  const handleClick = useCallback(
    (event) => {
      onClick?.(event)
      if (event.defaultPrevented) return
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return
      }

      const scrollLocked = document.body.style.overflow === 'hidden'
      const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

      if (scrollLocked || reducedMotion || window.scrollY < AT_TOP) return

      event.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })

      const startedAt = performance.now()
      const step = () => {
        const settled = window.scrollY < AT_TOP
        const timedOut = performance.now() - startedAt > MAX_WAIT
        if (settled || timedOut) {
          if (to !== pathname) navigate(to)
          return
        }
        frames.current.push(requestAnimationFrame(step))
      }
      frames.current.push(requestAnimationFrame(step))
    },
    [navigate, onClick, pathname, to]
  )

  return (
    <Link to={to} onClick={handleClick} {...rest}>
      {children}
    </Link>
  )
}
