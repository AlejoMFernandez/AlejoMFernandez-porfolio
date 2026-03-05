<script setup>
import { ref, onMounted, onUnmounted, computed, useTemplateRef, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { gsap } from 'gsap'
import personal from '../data/personal.json'
import { useLocalized } from '../composables/useLocalized.js'
import Footer from '../components/Footer.vue'
import ServiceWizard from '../components/ServiceWizard.vue'

const { t, tm } = useI18n()
const { l } = useLocalized()

const form = ref({ name: '', email: '', service: '', message: '' })
// status: 'idle' | 'sending' | 'sent' | 'error'
const status = ref('idle')
const dropdownOpen = ref(false)
const wizardOpen = ref(false)
const showCelebration = ref(false)
const validationError = ref('')

const services = computed(() => tm('contact.services'))

function selectService(svc) {
  form.value.service = svc
  dropdownOpen.value = false
}

function handleClickOutside(e) {
  if (!e.target.closest('.custom-select')) dropdownOpen.value = false
}

function onWizardResult(svc) {
  form.value.service = svc
}

watch(form, () => { validationError.value = '' }, { deep: true })

const contactLeft = useTemplateRef('contactLeft')
const contactRight = useTemplateRef('contactRight')

const triggers = []

// ── Form submission via Formspree ────────────────────────────────────────────
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mwvrerwl'

async function handleSubmit() {
  if (status.value === 'sending' || status.value === 'sent') return

  // Validación manual (el form tiene novalidate por el custom dropdown)
  validationError.value = ''
  if (!form.value.name.trim() || !form.value.email.trim() || !form.value.service || !form.value.message.trim()) {
    validationError.value = t('contact.validationError')
    return
  }

  status.value = 'sending'
  try {
    const res = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        _subject: `[Portfolio] ${form.value.service} — ${form.value.name}`,
        name: form.value.name,
        email: form.value.email,
        service: form.value.service,
        message: form.value.message,
      }),
    })
    if (res.ok) {
      status.value = 'sent'
      form.value = { name: '', email: '', service: '', message: '' }
      showCelebration.value = true
      setTimeout(() => { showCelebration.value = false }, 7000)
    } else {
      status.value = 'error'
    }
  } catch {
    status.value = 'error'
  }
}

onMounted(() => {
  const leftChildren = contactLeft.value ? Array.from(contactLeft.value.children) : []
  const rightChildren = contactRight.value ? Array.from(contactRight.value.children) : []
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
  if (leftChildren.length)  tl.from(leftChildren,  { y: 70, opacity: 0, duration: 0.9, stagger: 0.13 })
  if (rightChildren.length) tl.from(rightChildren, { y: 60, opacity: 0, duration: 0.85, stagger: 0.1 }, '-=0.55')
  triggers.push(tl)
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  triggers.forEach(t => t.kill())
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div class="contact-view">
    <section class="contact-section">
      <div class="contact-container" style="margin-top: 40px;">

        <!-- ── LEFT ─────────────────────────────────────── -->
        <div class="contact-left" ref="contactLeft">

          <h1 class="contact-heading">{{ t('contact.heading') }}</h1>

          <p class="contact-desc">{{ t('contact.description') }}</p>

          <div class="contact-info-block">
            <a :href="`mailto:${personal.email}`" class="info-item info-link">
              <span class="info-label">Email</span>
              <span class="info-value">{{ personal.email }}</span>
            </a>

            <a
              v-if="personal.redes?.whatsapp"
              :href="personal.redes.whatsapp"
              target="_blank"
              class="info-item info-link"
            >
              <span class="info-label">WhatsApp</span>
              <span class="info-value">{{ personal.telefono }}</span>
            </a>

          </div>

          <div class="social-row">
            <a v-if="personal.redes?.github"    :href="personal.redes.github"    target="_blank" class="social-pill">GitHub</a>
            <a v-if="personal.redes?.linkedin"  :href="personal.redes.linkedin"  target="_blank" class="social-pill">LinkedIn</a>
            <a v-if="personal.redes?.instagram" :href="personal.redes.instagram" target="_blank" class="social-pill">Instagram</a>
            <a v-if="personal.redes?.upwork"    :href="personal.redes.upwork"    target="_blank" class="social-pill">Upwork</a>
          </div>
        </div>

        <!-- ── DIVIDER ───────────────────────────────────── -->
        <div class="contact-divider" aria-hidden="true"></div>

        <!-- ── RIGHT ────────────────────────────────────── -->
        <div class="contact-right" ref="contactRight">
          <form class="contact-form" @submit.prevent="handleSubmit" novalidate>

            <div class="form-row">
              <div class="field">
                <label class="field-label">{{ t('contact.fieldName') }}</label>
                <input
                  v-model="form.name"
                  type="text"
                  class="field-input"
                  :placeholder="t('contact.placeholderName')"
                  required
                />
              </div>
              <div class="field">
                <label class="field-label">{{ t('contact.fieldEmail') }}</label>
                <input
                  v-model="form.email"
                  type="email"
                  class="field-input"
                  :placeholder="t('contact.placeholderEmail')"
                  required
                />
              </div>
            </div>

            <div class="field">
              <label class="field-label">{{ t('contact.fieldService') }}</label>
              <div class="custom-select" :class="{ open: dropdownOpen }">
                <button
                  type="button"
                  class="custom-select-trigger"
                  @click.stop="dropdownOpen = !dropdownOpen"
                >
                  <span :class="{ placeholder: !form.service }">
                    {{ form.service || t('contact.placeholderService') }}
                  </span>
                  <svg class="select-arrow" :class="{ rotated: dropdownOpen }" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>
                <ul v-show="dropdownOpen" class="custom-select-list">
                  <li
                    v-for="svc in services"
                    :key="svc"
                    class="custom-select-option"
                    :class="{ selected: form.service === svc }"
                    @click.stop="selectService(svc)"
                  >
                    {{ svc }}
                  </li>
                </ul>
              </div>
            </div>

            <button type="button" class="wizard-trigger" @click="wizardOpen = true">
              {{ t('contact.wizardTrigger') }}
            </button>

            <div class="field">
              <label class="field-label">{{ t('contact.fieldMessage') }}</label>
              <textarea
                v-model="form.message"
                class="field-textarea"
                :placeholder="t('contact.placeholderMessage')"
                rows="6"
                required
              ></textarea>
            </div>

            <!-- Status feedback -->
            <p v-if="validationError" class="form-feedback form-error">
              {{ validationError }}
            </p>
            <p v-if="status === 'sent'" class="form-feedback form-success">
              {{ t('contact.msgSent') }}
            </p>
            <p v-if="status === 'error'" class="form-feedback form-error">
              {{ t('contact.msgError') }}
            </p>

            <button
              type="submit"
              class="submit-btn"
              :class="{ sending: status === 'sending', sent: status === 'sent' }"
              :disabled="status === 'sending' || status === 'sent'"
            >
              <span v-if="status === 'idle'">{{ t('contact.submit') }}</span>
              <span v-else-if="status === 'sending'">{{ t('contact.submitting') }}</span>
              <span v-else-if="status === 'sent'">{{ t('contact.submitted') }}</span>
              <span v-else>{{ t('contact.submit') }}</span>
              <svg v-if="status !== 'sending' && status !== 'sent'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="7" y1="17" x2="17" y2="7"/>
                <polyline points="7 7 17 7 17 17"/>
              </svg>
            </button>

          </form>
        </div>

      </div>
    </section>

    <ServiceWizard v-model:open="wizardOpen" @result="onWizardResult" />

    <Teleport to="body">
      <Transition name="celebration-fade">
        <div v-if="showCelebration" class="celebration-overlay" @click.self="showCelebration = false">
          <div class="celebration-card">
            <div class="confetti-wrap" aria-hidden="true">
              <span v-for="i in 18" :key="i" class="confetti-piece" :style="`--i:${i}`"></span>
            </div>
            <div class="celebration-sticker">
              <img
                :src="'/images/stickercontento.png'"
                alt="sticker"
                class="sticker-img"
                width="100%"
                @error="e => e.target.style.display = 'none'"
              />
            </div>
            <p class="celebration-title">{{ t('contact.submitted') }}</p>
            <p class="celebration-body">{{ t('contact.msgSent') }}</p>
            <button class="celebration-close" @click="showCelebration = false">OK!</button>
          </div>
        </div>
      </Transition>
    </Teleport>

    <Footer />
  </div>
</template>

<style scoped>
/* ── Layout ──────────────────────────────────────────────── */
.contact-view {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.contact-section {
  flex: 1;
  padding: 140px 48px 100px;
}

.contact-container {
  max-width: 1080px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1px 1fr;
  gap: 0 64px;
  align-items: start;
}

/* ── Left col ────────────────────────────────────────────── */
.contact-left {
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding-right: 16px;
}

.eyebrow {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--accent-color);
}

.eyebrow-dot {
  width: 7px;
  height: 7px;
  background: var(--accent-color);
  border-radius: 50%;
  flex-shrink: 0;
}

.contact-heading {
  font-size: clamp(2.4rem, 5vw, 4rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.1;
  color: var(--text-primary);
}

.contact-desc {
  font-size: 1rem;
  line-height: 1.65;
  color: var(--text-secondary);
  max-width: 380px;
}

/* Info block */
.contact-info-block {
  display: flex;
  flex-direction: column;
  border-top: 1px solid var(--border-color);
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 14px 0;
  border-bottom: 1px solid var(--border-color);
  text-decoration: none;
  color: inherit;
}

.info-link {
  cursor: pointer;
  transition: color 0.2s;
}

.info-link:hover .info-value {
  color: var(--accent-color);
}

.info-label {
  font-size: 0.72rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-tertiary);
}

.info-value {
  font-size: 0.95rem;
  color: var(--text-primary);
  transition: color 0.2s;
}

/* Social pills */
.social-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.social-pill {
  display: inline-block;
  padding: 6px 16px;
  border: 1px solid var(--border-color);
  border-radius: 100px;
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--text-secondary);
  text-decoration: none;
  transition: border-color 0.2s, color 0.2s;
}

.social-pill:hover {
  border-color: var(--accent-color);
  color: var(--accent-color);
}

/* ── Divider ─────────────────────────────────────────────── */
.contact-divider {
  width: 1px;
  background: var(--border-color);
  align-self: stretch;
  min-height: 480px;
}

/* ── Right col / Form ────────────────────────────────────── */
.contact-right {
  padding-left: 16px;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field-label {
  font-size: 0.72rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-tertiary);
}

.field-input,
.field-textarea {
  width: 100%;
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--border-color);
  border-radius: 0;
  padding: 10px 0;
  font-size: 0.95rem;
  font-family: inherit;
  color: var(--text-primary);
  outline: none;
  transition: border-color 0.2s;
  box-sizing: border-box;
}

.field-input::placeholder,
.field-textarea::placeholder {
  color: var(--text-tertiary);
}

.field-input:focus,
.field-textarea:focus {
  border-bottom-color: var(--accent-color);
}

/* Custom select */
.custom-select {
  position: relative;
}

.custom-select-trigger {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--border-color);
  border-radius: 0;
  padding: 10px 0;
  font-size: 0.95rem;
  font-family: inherit;
  color: var(--text-primary);
  cursor: pointer;
  text-align: left;
  transition: border-color 0.2s;
}

.custom-select-trigger:focus {
  outline: none;
  border-bottom-color: var(--accent-color);
}

.custom-select.open .custom-select-trigger {
  border-bottom-color: var(--accent-color);
}

.custom-select-trigger .placeholder {
  color: var(--text-tertiary);
}

.select-arrow {
  flex-shrink: 0;
  color: var(--text-tertiary);
  transition: transform 0.2s ease;
}

.select-arrow.rotated {
  transform: rotate(180deg);
}

.custom-select-list {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  z-index: 100;
  list-style: none;
  margin: 0;
  padding: 6px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(12px);
}

.custom-select-option {
  padding: 10px 12px;
  font-size: 0.93rem;
  color: var(--text-secondary);
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}

.custom-select-option:hover {
  background: var(--bg-tertiary);
  color: var(--text-primary);
}

.custom-select-option.selected {
  color: var(--accent-color);
  font-weight: 500;
}

.field-textarea {
  resize: vertical;
  min-height: 120px;
}

/* Feedback messages */
.form-feedback {
  font-size: 0.875rem;
  padding: 10px 14px;
  border-radius: 8px;
  margin: 0;
}

.form-success {
  background: rgba(52, 199, 89, 0.1);
  color: #34c759;
  border: 1px solid rgba(52, 199, 89, 0.3);
}

.form-error {
  background: rgba(255, 59, 48, 0.1);
  color: #ff3b30;
  border: 1px solid rgba(255, 59, 48, 0.3);
}

/* Submit button */
.submit-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  align-self: flex-start;
  padding: 14px 32px;
  background: var(--text-primary);
  color: var(--bg-primary);
  border: none;
  border-radius: 100px;
  font-size: 0.9rem;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.2s, background 0.3s;
}

.submit-btn:hover:not(:disabled) {
  opacity: 0.85;
  transform: translateY(-2px);
}

.submit-btn:disabled {
  cursor: default;
  opacity: 0.6;
}

.submit-btn.sent {
  background: #34c759;
  color: #fff;
  opacity: 1;
}

.submit-btn svg {
  transition: transform 0.25s ease;
}

.submit-btn:hover svg {
  transform: translate(3px, -3px);
}

/* ── Responsive ──────────────────────────────────────────── */
/* ── Wizard trigger ─────────────────────────────────────── */
.wizard-trigger {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  align-self: flex-start;
  background: none;
  border: 1px dashed var(--border-color);
  border-radius: 100px;
  padding: 6px 16px 6px 16px;
  font-size: 0.8rem;
  font-family: inherit;
  color: var(--text-secondary);
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s;
}

.wizard-trigger:hover {
  border-color: var(--accent-color);
  color: var(--accent-color);
}

/* ── Celebration overlay ─────────────────────────────────── */
.celebration-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.celebration-card {
  position: relative;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 24px;
  padding: 48px 40px 40px;
  max-width: 420px;
  width: 100%;
  text-align: center;
  overflow: hidden;
  box-shadow: 0 32px 80px rgba(0, 0, 0, 0.4);
}

/* Confetti */
.confetti-wrap {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.confetti-piece {
  position: absolute;
  top: -10%;
  left: calc(var(--i) * 5.5% + 3%);
  width: 8px;
  height: 14px;
  border-radius: 2px;
  background: hsl(calc(var(--i) * 20), 80%, 60%);
  animation: confetti-fall 1.6s ease-in calc(var(--i) * 0.07s) both;
}

@keyframes confetti-fall {
  0%   { transform: translateY(0) rotate(0deg); opacity: 1; }
  100% { transform: translateY(500px) rotate(720deg); opacity: 0; }
}

.celebration-sticker {
  position: relative;
  width: 250px;
  height: 250px;
  margin: 0 auto 20px;
}

.sticker-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 50%;
}

.celebration-emoji {
  font-size: 5rem;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.celebration-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--text-primary);
  margin: 0;
}

.celebration-body {
  font-size: 0.95rem;
  color: var(--text-secondary);
  margin-top: -5px;
  margin-bottom: 30px;
  line-height: 1.55;
}

.celebration-close {
  display: inline-block;
  padding: 12px 36px;
  background: var(--text-primary);
  color: var(--bg-primary);
  border: none;
  border-radius: 100px;
  font-size: 0.9rem;
  font-weight: 700;
  font-family: inherit;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.2s;
}

.celebration-close:hover {
  opacity: 0.85;
  transform: scale(1.04);
}

/* Transitions */
.celebration-fade-enter-active,
.celebration-fade-leave-active {
  transition: opacity 0.4s ease;
}

.celebration-fade-enter-from,
.celebration-fade-leave-to {
  opacity: 0;
}

.celebration-fade-enter-active .celebration-card {
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.celebration-fade-enter-from .celebration-card {
  transform: scale(0.75);
}

@media (max-width: 820px) {
  .contact-section {
    padding: 120px 24px 80px;
  }

  .contact-container {
    grid-template-columns: 1fr;
    gap: 56px 0;
  }

  .contact-divider {
    display: none;
  }

  .contact-left {
    padding-right: 0;
    gap: 24px;
  }

  .contact-right {
    padding-left: 0;
  }

  .contact-heading {
    font-size: clamp(2rem, 8vw, 3rem);
  }
}

@media (max-width: 480px) {
  .form-row {
    grid-template-columns: 1fr;
  }

  .contact-section {
    padding: 110px 20px 60px;
  }
}
</style>

