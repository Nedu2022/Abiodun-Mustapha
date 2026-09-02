import { useCallback } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { animateToTop } from '../../lib/scroll'

export default function TopLink({ to, children, onClick, ...rest }) {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const handleClick = useCallback(
    (event) => {
      onClick?.(event)
      if (event.defaultPrevented) return
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return
      }

      event.preventDefault()

      const scrollLocked = document.body.style.overflow === 'hidden'
      if (scrollLocked) {
        document.body.style.overflow = ''
      }

      animateToTop().then(() => {
        if (to !== pathname) navigate(to)
      })
    },
    [navigate, onClick, pathname, to]
  )

  return (
    <Link to={to} onClick={handleClick} {...rest}>
      {children}
    </Link>
  )
}
