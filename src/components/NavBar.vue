<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { gsap } from 'gsap'
import { toggleLanguage as switchLang } from '../locales'
import { useLocalized } from '../composables/useLocalized.js'
import personal from '../data/personal.json'

const { t, locale } = useI18n()
const { l } = useLocalized()

const handleToggleLanguage = () => {
  switchLang()
}

const route = useRoute()
const isMenuOpen = ref(false)
const isScrolled = ref(false)
const menuRef = ref(null)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
  
  if (isMenuOpen.value) {
    document.body.style.overflow = 'hidden'
    gsap.fromTo('.menu-overlay', 
      { clipPath: 'circle(0% at calc(100% - 40px) 40px)' },
      { clipPath: 'circle(150% at calc(100% - 40px) 40px)', duration: 0.6, ease: 'power3.inOut' }
    )
    gsap.from('.menu-link', {
      y: 40,
      opacity: 0,
      stagger: 0.1,
      delay: 0.2,
      ease: 'power3.out'
    })
  } else {
    document.body.style.overflow = ''
    gsap.to('.menu-overlay', {
      clipPath: 'circle(0% at calc(100% - 40px) 40px)',
      duration: 0.5,
      ease: 'power3.inOut'
    })
  }
}

const closeMenu = () => {
  if (isMenuOpen.value) {
    isMenuOpen.value = false
    document.body.style.overflow = ''
    gsap.to('.menu-overlay', {
      clipPath: 'circle(0% at calc(100% - 40px) 40px)',
      duration: 0.5,
      ease: 'power3.inOut'
    })
  }
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.body.style.overflow = ''
})
</script>

<template>
  <header class="navbar" :class="{ scrolled: isScrolled }">
    <nav class="nav-container">
      <!-- Logo / Name - Left side -->
      <RouterLink to="/" class="nav-brand" @click="closeMenu">
        <span class="brand-name">{{ personal.nombre }} {{ personal.apellido }}</span>
        <span class="brand-title">{{ l(personal.titulo) }}</span>
      </RouterLink>

      <!-- Center Navigation - Desktop -->
      <div class="nav-center desktop">
        <div class="nav-links-wrapper">
          <RouterLink 
            v-magnetic="{ strength: 0.3, scale: 1.05 }"
            to="/" 
            class="nav-link magnetic-btn" 
            :class="{ active: route.path === '/' }"
          >
            {{ t('nav.work') }}
          </RouterLink>
          <RouterLink 
            v-magnetic="{ strength: 0.3, scale: 1.05 }"
            to="/info" 
            class="nav-link magnetic-btn" 
            :class="{ active: route.path === '/info' }"
          >
            {{ t('nav.info') }}
          </RouterLink>
          <RouterLink 
            v-magnetic="{ strength: 0.3, scale: 1.05 }"
            to="/contacto" 
            class="nav-link magnetic-btn" 
            :class="{ active: route.path === '/contacto' }"
          >
            {{ t('nav.contact') }}
          </RouterLink>
        </div>
      </div>

      <!-- Right side - Language + Menu -->
      <div class="nav-right">
        <!-- Language Toggle -->
        <button 
          v-magnetic="{ strength: 0.25, scale: 1.08 }"
          class="lang-toggle magnetic-btn" 
          @click="handleToggleLanguage" 
          :title="locale === 'es' ? 'Switch to English' : 'Cambiar a Español'"
        >
          <span class="lang-option" :class="{ active: locale === 'es' }">ES</span>
          <span class="lang-divider">/</span>
          <span class="lang-option" :class="{ active: locale === 'en' }">EN</span>
        </button>

        <!-- Menu Button (Mobile) -->
        <button 
          class="menu-button" 
          :class="{ open: isMenuOpen }"
          @click="toggleMenu"
          aria-label="Menu"
        >
          <span class="menu-line"></span>
          <span class="menu-line"></span>
        </button>
      </div>
    </nav>

    <!-- Mobile Menu Overlay -->
    <div class="menu-overlay" :class="{ open: isMenuOpen }" ref="menuRef">
      <div class="menu-content">
        <nav class="menu-nav">
          <RouterLink 
            to="/" 
            class="menu-link" 
            @click="closeMenu"
          >
            <span class="menu-link-number">01</span>
            <span class="menu-link-text">{{ t('nav.work') }}</span>
          </RouterLink>
          <RouterLink 
            to="/info" 
            class="menu-link" 
            @click="closeMenu"
          >
            <span class="menu-link-number">02</span>
            <span class="menu-link-text">{{ t('nav.info') }}</span>
          </RouterLink>
          <RouterLink 
            to="/contacto" 
            class="menu-link" 
            @click="closeMenu"
          >
            <span class="menu-link-number">03</span>
            <span class="menu-link-text">{{ t('nav.contact') }}</span>
          </RouterLink>
        </nav>

        <div class="menu-footer">
          <button class="lang-toggle-mobile" @click="handleToggleLanguage">
            <span :class="{ active: locale === 'es' }">Español</span>
            <span class="lang-divider-mobile">|</span>
            <span :class="{ active: locale === 'en' }">English</span>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 28px 40px;
  transition: all 0.3s ease;
}

.navbar.scrolled {
  background: var(--bg-primary-alpha);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  padding: 16px 40px;
  box-shadow: 0 1px 0 var(--border-color);
}

.nav-container {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 20px;
}

/* Brand / Logo */
.nav-brand {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  z-index: 101;
}

.brand-name {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  letter-spacing: -0.01em;
  line-height: 1.2;
}

.brand-title {
  font-size: 0.8rem;
  color: var(--text-tertiary);
  font-weight: 400;
}

/* Center Navigation */
.nav-center {
  display: flex;
  justify-content: center;
}

.nav-links-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--bg-secondary);
  padding: 6px;
  border-radius: 50px;
}

.nav-link {
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  padding: 10px 20px;
  border-radius: 50px;
  transition: all 0.3s ease;
  position: relative;
}

.nav-link:hover {
  color: var(--text-primary);
}

.nav-link.active {
  background: var(--bg-primary);
  color: var(--text-primary);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

/* Right side */
.nav-right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
}

/* Language Toggle */
.lang-toggle {
  display: flex;
  align-items: center;
  gap: 4px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 500;
  padding: 8px 12px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.lang-toggle:hover {
  background: var(--bg-secondary);
}

.lang-option {
  color: var(--text-tertiary);
  transition: color 0.3s ease;
}

.lang-option.active {
  color: var(--text-primary);
}

.lang-divider {
  color: var(--text-tertiary);
  opacity: 0.5;
}

/* Menu Button */
.menu-button {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 44px;
  background: var(--bg-secondary);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  gap: 5px;
  z-index: 101;
  transition: all 0.3s ease;
}

.menu-line {
  width: 18px;
  height: 2px;
  background: var(--text-primary);
  border-radius: 2px;
  transition: all 0.3s ease;
}

.menu-button.open .menu-line:first-child {
  transform: rotate(45deg) translate(2.5px, 2.5px);
}

.menu-button.open .menu-line:last-child {
  transform: rotate(-45deg) translate(2.5px, -2.5px);
}

/* Menu Overlay */
.menu-overlay {
  position: fixed;
  inset: 0;
  background: var(--bg-primary);
  z-index: 99;
  clip-path: circle(0% at calc(100% - 40px) 40px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.menu-content {
  text-align: center;
  padding: 24px;
}

.menu-nav {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 60px;
}

.menu-link {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 16px;
  text-decoration: none;
  color: var(--text-primary);
}

.menu-link-number {
  font-size: 0.875rem;
  color: var(--text-tertiary);
  font-weight: 500;
}

.menu-link-text {
  font-size: clamp(2rem, 8vw, 4rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  transition: color 0.3s ease;
}

.menu-link:hover .menu-link-text {
  color: var(--accent-color);
}

.menu-footer {
  color: var(--text-tertiary);
  font-size: 0.875rem;
}

.lang-toggle-mobile {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background: var(--bg-secondary);
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  padding: 14px 24px;
  border-radius: 50px;
  color: var(--text-tertiary);
  transition: all 0.3s ease;
}

.lang-toggle-mobile span.active {
  color: var(--text-primary);
}

.lang-divider-mobile {
  opacity: 0.3;
}

@media (max-width: 768px) {
  .navbar {
    padding: 16px 20px;
  }

  .navbar.scrolled {
    padding: 12px 20px;
  }

  .nav-container {
    display: flex;
    justify-content: space-between;
  }

  .nav-center.desktop {
    display: none;
  }

  .menu-button {
    display: flex;
  }

  .lang-toggle {
    display: none;
  }

  .brand-name {
    font-size: 0.95rem;
  }

  .brand-title {
    font-size: 0.75rem;
  }
}
</style>
