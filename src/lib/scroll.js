const REDUCED = '(prefers-reduced-motion: reduce)'

export function prefersReducedMotion() {
  return Boolean(window.matchMedia?.(REDUCED).matches)
}

export function forceTop() {
  const root = document.documentElement
  const previous = root.style.scrollBehavior
  root.style.scrollBehavior = 'auto'
  window.scrollTo(0, 0)
  root.scrollTop = 0
  if (document.body) document.body.scrollTop = 0
  root.style.scrollBehavior = previous
}

export function animateToTop(duration = 420) {
  return new Promise((resolve) => {
    const start = window.scrollY
    if (start <= 0 || prefersReducedMotion()) {
      forceTop()
      resolve()
      return
    }

    const root = document.documentElement
    const previous = root.style.scrollBehavior
    root.style.scrollBehavior = 'auto'
    const startedAt = performance.now()

    const step = (now) => {
      const progress = Math.min(1, (now - startedAt) / duration)
      const eased = 1 - (1 - progress) ** 3
      window.scrollTo(0, Math.round(start * (1 - eased)))
      if (progress < 1) {
        requestAnimationFrame(step)
        return
      }
      forceTop()
      root.style.scrollBehavior = previous
      resolve()
    }

    requestAnimationFrame(step)
  })
}
