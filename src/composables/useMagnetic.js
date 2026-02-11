import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'

export function useMagnetic(elementRef, options = {}) {
  const {
    strength = 0.3,
    ease = 0.1,
    scale = 1.05
  } = options

  let bounds = null
  let mouse = { x: 0, y: 0 }
  let pos = { x: 0, y: 0 }
  let animationId = null

  const onMouseMove = (e) => {
    if (!bounds) return
    
    const centerX = bounds.left + bounds.width / 2
    const centerY = bounds.top + bounds.height / 2
    
    mouse.x = (e.clientX - centerX) * strength
    mouse.y = (e.clientY - centerY) * strength
  }

  const onMouseEnter = (e) => {
    if (!elementRef.value) return
    bounds = elementRef.value.getBoundingClientRect()
    
    gsap.to(elementRef.value, {
      scale: scale,
      duration: 0.3,
      ease: 'power2.out'
    })
    
    animate()
  }

  const onMouseLeave = () => {
    if (animationId) {
      cancelAnimationFrame(animationId)
      animationId = null
    }
    
    mouse = { x: 0, y: 0 }
    
    gsap.to(elementRef.value, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)'
    })
  }

  const animate = () => {
    pos.x += (mouse.x - pos.x) * ease
    pos.y += (mouse.y - pos.y) * ease
    
    gsap.set(elementRef.value, {
      x: pos.x,
      y: pos.y
    })
    
    animationId = requestAnimationFrame(animate)
  }

  const init = () => {
    if (!elementRef.value) return
    
    elementRef.value.addEventListener('mouseenter', onMouseEnter)
    elementRef.value.addEventListener('mouseleave', onMouseLeave)
    elementRef.value.addEventListener('mousemove', onMouseMove)
  }

  const destroy = () => {
    if (!elementRef.value) return
    
    if (animationId) {
      cancelAnimationFrame(animationId)
    }
    
    elementRef.value.removeEventListener('mouseenter', onMouseEnter)
    elementRef.value.removeEventListener('mouseleave', onMouseLeave)
    elementRef.value.removeEventListener('mousemove', onMouseMove)
  }

  return { init, destroy }
}

// Directive para uso más fácil
export const vMagnetic = {
  mounted(el, binding) {
    const strength = binding.value?.strength || 0.3
    const scale = binding.value?.scale || 1.05
    
    let bounds = null
    let mouse = { x: 0, y: 0 }
    let pos = { x: 0, y: 0 }
    let animationId = null

    const onMouseMove = (e) => {
      if (!bounds) return
      const centerX = bounds.left + bounds.width / 2
      const centerY = bounds.top + bounds.height / 2
      mouse.x = (e.clientX - centerX) * strength
      mouse.y = (e.clientY - centerY) * strength
    }

    const animate = () => {
      pos.x += (mouse.x - pos.x) * 0.1
      pos.y += (mouse.y - pos.y) * 0.1
      gsap.set(el, { x: pos.x, y: pos.y })
      animationId = requestAnimationFrame(animate)
    }

    const onMouseEnter = () => {
      bounds = el.getBoundingClientRect()
      gsap.to(el, { scale: scale, duration: 0.3, ease: 'power2.out' })
      animate()
    }

    const onMouseLeave = () => {
      if (animationId) cancelAnimationFrame(animationId)
      mouse = { x: 0, y: 0 }
      gsap.to(el, { x: 0, y: 0, scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.3)' })
    }

    el.addEventListener('mouseenter', onMouseEnter)
    el.addEventListener('mouseleave', onMouseLeave)
    el.addEventListener('mousemove', onMouseMove)

    el._magneticCleanup = () => {
      if (animationId) cancelAnimationFrame(animationId)
      el.removeEventListener('mouseenter', onMouseEnter)
      el.removeEventListener('mouseleave', onMouseLeave)
      el.removeEventListener('mousemove', onMouseMove)
    }
  },
  unmounted(el) {
    if (el._magneticCleanup) el._magneticCleanup()
  }
}
