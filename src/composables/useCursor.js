import { onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'

/**
 * Custom magnetic cursor composable.
 * Mount the <CursorFollow /> component in App.vue, then call useCursor() there.
 */
export function useCursor() {
  let dotX, dotY, ringX, ringY
  let dot, ring

  const onMouseMove = (e) => {
    dotX(e.clientX)
    dotY(e.clientY)
    ringX(e.clientX)
    ringY(e.clientY)
  }

  const onEnterLink = () => {
    gsap.to(ring, { scale: 2.2, opacity: 0.5, duration: 0.35, ease: 'power2.out' })
    gsap.to(dot, { scale: 0.3, duration: 0.2 })
  }

  const onLeaveLink = () => {
    gsap.to(ring, { scale: 1, opacity: 0.8, duration: 0.35, ease: 'power2.out' })
    gsap.to(dot, { scale: 1, duration: 0.2 })
  }

  const onEnterProject = () => {
    gsap.to(ring, { scale: 3.5, opacity: 0.35, duration: 0.4, ease: 'power2.out' })
    gsap.to(dot, { scale: 0, duration: 0.2 })
  }

  const addListeners = () => {
    document.querySelectorAll('a, button, .nav-link, .cta-link, .see-all-btn').forEach(el => {
      el.addEventListener('mouseenter', onEnterLink)
      el.addEventListener('mouseleave', onLeaveLink)
    })
    document.querySelectorAll('.featured-card, .project-row, .bento-card').forEach(el => {
      el.addEventListener('mouseenter', onEnterProject)
      el.addEventListener('mouseleave', onLeaveLink)
    })
  }

  onMounted(() => {
    // Only desktop
    if (window.matchMedia('(pointer: coarse)').matches) return

    dot = document.querySelector('.cursor-dot')
    ring = document.querySelector('.cursor-ring')
    if (!dot || !ring) return

    // Hide at start — will appear on first move
    gsap.set([dot, ring], { autoAlpha: 0 })

    dotX = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'none' })
    dotY = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'none' })
    ringX = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3.out' })
    ringY = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3.out' })

    const firstMove = (e) => {
      gsap.to([dot, ring], { autoAlpha: 1, duration: 0.3 })
      onMouseMove(e)
      window.removeEventListener('mousemove', firstMove)
      window.addEventListener('mousemove', onMouseMove)
      addListeners()
    }

    window.addEventListener('mousemove', firstMove)
    document.documentElement.style.cursor = 'none'
  })

  onUnmounted(() => {
    window.removeEventListener('mousemove', onMouseMove)
    document.documentElement.style.cursor = ''
  })
}
