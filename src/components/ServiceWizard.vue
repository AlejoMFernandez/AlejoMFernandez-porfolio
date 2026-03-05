<script setup>
import { ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({ open: Boolean })
const emit  = defineEmits(['update:open', 'result'])

const { locale } = useI18n()

// ── Services (same order everywhere) ────────────────────────────────────────
const SERVICES = ['Landing Page', 'ABM', 'Web App', 'Intranet', 'E-commerce']

// ── Quiz data (bilingual) ─────────────────────────────────────────────────
// scores array = [Landing, ABM, WebApp, Intranet, Ecommerce]
const QUESTIONS = {
  es: [
    {
      text: '¿Cuál es tu objetivo principal?',
      answers: [
        { text: 'Mostrar mi negocio o marca en internet',        scores: [3, 0, 0, 0, 0] },
        { text: 'Gestionar datos: clientes, productos, pedidos', scores: [0, 3, 0, 0, 0] },
        { text: 'Ofrecer funcionalidades interactivas',          scores: [0, 0, 3, 0, 0] },
        { text: 'Organizar procesos internos de mi empresa',     scores: [0, 0, 0, 3, 0] },
        { text: 'Vender productos directamente por internet',    scores: [0, 0, 0, 0, 3] },
      ],
    },
    {
      text: '¿Quiénes van a usar tu proyecto?',
      answers: [
        { text: 'El público en general, cualquiera',     scores: [3, 0, 0, 0, 1] },
        { text: 'Solo yo y mi equipo de trabajo',        scores: [0, 2, 0, 2, 0] },
        { text: 'Clientes registrados con cuenta propia', scores: [0, 1, 2, 0, 1] },
        { text: 'Solo empleados de la empresa',          scores: [0, 1, 0, 3, 0] },
        { text: 'Compradores / consumidores',            scores: [1, 0, 0, 0, 3] },
      ],
    },
    {
      text: '¿Los usuarios van a poder cargar o modificar datos?',
      answers: [
        { text: 'No, solo verán información',                     scores: [3, 0, 0, 0, 0] },
        { text: 'Sí, gestionar registros básicos (ABM)',          scores: [0, 3, 0, 0, 0] },
        { text: 'Sí, flujos complejos y lógica avanzada',        scores: [0, 0, 3, 0, 0] },
        { text: 'Sí, procesos internos y control de accesos',    scores: [0, 1, 0, 3, 0] },
        { text: 'Sí, comprar y gestionar sus pedidos',           scores: [0, 0, 0, 0, 3] },
      ],
    },
    {
      text: '¿Tiene alguna de estas características especiales?',
      answers: [
        { text: 'Necesito vender productos (físicos o digitales)',   scores: [0, 0, 0, 0, 3] },
        { text: 'Control de roles: quién puede ver qué',            scores: [0, 1, 1, 3, 0] },
        { text: 'Un portfolio o catálogo visual atractivo',         scores: [3, 0, 0, 0, 0] },
        { text: 'Reportes, métricas y dashboards de datos',         scores: [0, 2, 2, 1, 0] },
        { text: 'Integraciones con APIs o servicios externos',      scores: [0, 0, 3, 0, 1] },
      ],
    },
    {
      text: '¿Qué nivel de complejidad técnica buscás?',
      answers: [
        { text: 'Algo rápido, bonito y efectivo',              scores: [3, 0, 0, 0, 0] },
        { text: 'Tablas, formularios y gestión de registros',  scores: [0, 3, 0, 0, 0] },
        { text: 'Lógica avanzada, flujos e integraciones',     scores: [0, 0, 3, 0, 0] },
        { text: 'Acceso privado y seguridad interna',          scores: [0, 0, 0, 3, 0] },
        { text: 'Carrito, pagos y gestión de stock',           scores: [0, 0, 0, 0, 3] },
      ],
    },
  ],
  en: [
    {
      text: 'What is your main goal?',
      answers: [
        { text: 'Showcase my business or brand online',           scores: [3, 0, 0, 0, 0] },
        { text: 'Manage data: clients, products, orders',         scores: [0, 3, 0, 0, 0] },
        { text: 'Offer interactive features to my users',         scores: [0, 0, 3, 0, 0] },
        { text: 'Organize my company\'s internal processes',      scores: [0, 0, 0, 3, 0] },
        { text: 'Sell products directly online',                 scores: [0, 0, 0, 0, 3] },
      ],
    },
    {
      text: 'Who will use your project?',
      answers: [
        { text: 'The general public, anyone',            scores: [3, 0, 0, 0, 1] },
        { text: 'Only me and my work team',              scores: [0, 2, 0, 2, 0] },
        { text: 'Registered clients with their accounts', scores: [0, 1, 2, 0, 1] },
        { text: 'Only company employees',                scores: [0, 1, 0, 3, 0] },
        { text: 'Shoppers / consumers',                  scores: [1, 0, 0, 0, 3] },
      ],
    },
    {
      text: 'Will users be able to add or edit data?',
      answers: [
        { text: 'No, they will only view information',           scores: [3, 0, 0, 0, 0] },
        { text: 'Yes, manage basic records (CRUD)',              scores: [0, 3, 0, 0, 0] },
        { text: 'Yes, complex flows and advanced logic',        scores: [0, 0, 3, 0, 0] },
        { text: 'Yes, internal processes and access control',   scores: [0, 1, 0, 3, 0] },
        { text: 'Yes, purchase and manage their orders',        scores: [0, 0, 0, 0, 3] },
      ],
    },
    {
      text: 'Does it have any of these special characteristics?',
      answers: [
        { text: 'I need to sell products (physical or digital)',  scores: [0, 0, 0, 0, 3] },
        { text: 'Role-based access: who can see what',           scores: [0, 1, 1, 3, 0] },
        { text: 'An attractive visual portfolio or catalogue',   scores: [3, 0, 0, 0, 0] },
        { text: 'Reports, metrics and data dashboards',          scores: [0, 2, 2, 1, 0] },
        { text: 'Integrations with external APIs or services',   scores: [0, 0, 3, 0, 1] },
      ],
    },
    {
      text: 'What level of technical complexity do you need?',
      answers: [
        { text: 'Something quick, beautiful and effective',       scores: [3, 0, 0, 0, 0] },
        { text: 'Tables, forms and record management',            scores: [0, 3, 0, 0, 0] },
        { text: 'Advanced logic, flows and integrations',         scores: [0, 0, 3, 0, 0] },
        { text: 'Private access and internal security',           scores: [0, 0, 0, 3, 0] },
        { text: 'Shopping cart, payments and stock management',   scores: [0, 0, 0, 0, 3] },
      ],
    },
  ],
}

const DESCRIPTIONS = {
  es: {
    'Landing Page': 'Un sitio limpio, atractivo y rápido para presentar tu marca o negocio al mundo.',
    'ABM':          'Un sistema para gestionar registros: altas, bajas y modificaciones de datos.',
    'Web App':      'Una aplicación web completa con lógica avanzada, flujos e integraciones.',
    'Intranet':     'Un sistema privado para la gestión interna de tu empresa con control de accesos.',
    'E-commerce':   'Una tienda online para vender productos, gestionar pagos y pedidos.',
  },
  en: {
    'Landing Page': 'A clean, attractive and fast site to present your brand or business to the world.',
    'ABM':          'A system to manage records: create, update and delete data.',
    'Web App':      'A complete web application with advanced logic, flows and integrations.',
    'Intranet':     'A private system for your company\'s internal management with access control.',
    'E-commerce':   'An online store to sell products, manage payments and orders.',
  },
}

const UI = {
  es: {
    title:    '¿No sabés bien qué necesitás?',
    subtitle: 'Respondé estas preguntas y te ayudo a encontrarlo.',
    question: 'Pregunta',
    of:       'de',
    back:     'Anterior',
    restart:  'Volver a empezar',
    result:   '¡Encontramos tu solución!',
    resultSub:'Basándonos en tus respuestas, lo que mejor se adapta a tu proyecto es:',
    breakdown:'¿Cómo llegamos a esta conclusión?',
    useThis:  'Usar esta recomendación',
    close:    'Cerrar',
  },
  en: {
    title:    "Not sure what you need?",
    subtitle: 'Answer these questions and I\'ll help you find out.',
    question: 'Question',
    of:       'of',
    back:     'Previous',
    restart:  'Start over',
    result:   'We found your solution!',
    resultSub:'Based on your answers, what best suits your project is:',
    breakdown:'How did we reach this conclusion?',
    useThis:  'Use this recommendation',
    close:    'Close',
  },
}

// ── State ────────────────────────────────────────────────────────────────────
const step       = ref(0)   // 0 = not started (show intro), 1-5 = questions, 6 = result
const answers    = ref([])  // selected answer index per question
const scores     = ref([0, 0, 0, 0, 0])

const questions  = computed(() => QUESTIONS[locale.value] ?? QUESTIONS.es)
const ui         = computed(() => UI[locale.value] ?? UI.es)
const descs      = computed(() => DESCRIPTIONS[locale.value] ?? DESCRIPTIONS.es)
const totalSteps = computed(() => questions.value.length)

const currentQuestion = computed(() => questions.value[step.value - 1])

const resultIndex = computed(() => {
  const max = Math.max(...scores.value)
  return scores.value.indexOf(max)
})
const resultService = computed(() => SERVICES[resultIndex.value])
const maxScore      = computed(() => Math.max(...scores.value) || 1)

function selectAnswer(answerIdx) {
  const q = currentQuestion.value
  const s = [...scores.value]
  // remove previous answer for this question if re-answering
  if (answers.value[step.value - 1] !== undefined) {
    const prev = q.answers[answers.value[step.value - 1]].scores
    prev.forEach((v, i) => { s[i] -= v })
  }
  // add new scores
  q.answers[answerIdx].scores.forEach((v, i) => { s[i] += v })
  scores.value = s
  answers.value[step.value - 1] = answerIdx

  if (step.value < totalSteps.value) {
    step.value++
  } else {
    step.value = totalSteps.value + 1 // show result
  }
}

function goBack() {
  if (step.value <= 1) { step.value = 0; return }
  // undo scores of current question
  const prev = answers.value[step.value - 1]
  if (prev !== undefined) {
    const q = questions.value[step.value - 1]
    const s = [...scores.value]
    q.answers[prev].scores.forEach((v, i) => { s[i] -= v })
    scores.value = s
  }
  step.value--
}

function restart() {
  step.value  = 0
  answers.value = []
  scores.value  = [0, 0, 0, 0, 0]
}

function useResult() {
  emit('result', resultService.value)
  closeWizard()
}

function closeWizard() {
  emit('update:open', false)
}

// reset when re-opened
watch(() => props.open, (val) => {
  if (val) restart()
})
</script>

<template>
  <Teleport to="body">
    <Transition name="wizard-fade">
      <div v-if="open" class="wizard-backdrop" @click.self="closeWizard">
        <div class="wizard-modal">

          <!-- ── Header ── -->
          <div class="wizard-header">
            <div class="wizard-header-top">
              <span class="wizard-tag">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
                {{ ui.title }}
              </span>
              <button class="wizard-close" @click="closeWizard" :aria-label="ui.close">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>

            <!-- Progress bar (only during questions) -->
            <div v-if="step >= 1 && step <= totalSteps" class="wizard-progress">
              <div class="wizard-progress-bar" :style="{ width: ((step - 1) / totalSteps * 100) + '%' }"></div>
            </div>
          </div>

          <!-- ── Step 0: Intro ── -->
          <Transition name="wizard-slide" mode="out-in">
            <div v-if="step === 0" key="intro" class="wizard-content wizard-intro">
              <img
                :src="'/images/stickerpensativo.png'"
                alt="sticker"
                class="sticker-img"
                width="250"
                @error="e => e.target.style.display = 'none'"
                style="margin-bottom: 15px;"
              />              
              <h2 class="wizard-title" style="margin-bottom: 0px;">{{ ui.title }}</h2>
              <p class="wizard-subtitle">{{ ui.subtitle }}</p>
              <button class="wizard-start-btn" @click="step = 1">
                {{ locale === 'en' ? "Let's go!" : '¡Arrancamos!' }}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </button>
            </div>

            <!-- ── Steps 1-5: Questions ── -->
            <div v-else-if="step >= 1 && step <= totalSteps" :key="'q' + step" class="wizard-content">
              <p class="wizard-step-label">{{ ui.question }} {{ step }} {{ ui.of }} {{ totalSteps }}</p>
              <h2 class="wizard-title">{{ currentQuestion.text }}</h2>
              <div class="wizard-answers">
                <button
                  v-for="(ans, idx) in currentQuestion.answers"
                  :key="idx"
                  class="wizard-answer"
                  :class="{ selected: answers[step - 1] === idx }"
                  @click="selectAnswer(idx)"
                >
                  <span class="wizard-answer-letter">{{ String.fromCharCode(65 + idx) }}</span>
                  <span class="wizard-answer-text">{{ ans.text }}</span>
                  <svg class="wizard-answer-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </button>
              </div>
              <button v-if="step > 1" class="wizard-back-btn" @click="goBack">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
                {{ ui.back }}
              </button>
            </div>

            <!-- ── Result ── -->
            <div v-else key="result" class="wizard-content wizard-result">
              <h2 class="wizard-title" style="margin-bottom: 5px;">{{ ui.result }}</h2>
              <p class="wizard-subtitle" style="margin-bottom: 5px;">{{ ui.resultSub }}</p>

              <div class="wizard-result-pill">{{ resultService }}</div>
              <p class="wizard-result-desc">{{ descs[resultService] }}</p>

              <!-- Breakdown bars -->
              <div class="wizard-breakdown">
                <p class="wizard-breakdown-label">{{ ui.breakdown }}</p>
                <div class="wizard-bars">
                  <div v-for="(svc, idx) in SERVICES" :key="svc" class="wizard-bar-row">
                    <span class="wizard-bar-name" :class="{ winner: idx === resultIndex }">{{ svc }}</span>
                    <div class="wizard-bar-track">
                      <div
                        class="wizard-bar-fill"
                        :class="{ winner: idx === resultIndex }"
                        :style="{ width: (scores[idx] / maxScore * 100) + '%' }"
                      ></div>
                    </div>
                    <span class="wizard-bar-score" :class="{ winner: idx === resultIndex }">{{ scores[idx] }}</span>
                  </div>
                </div>
              </div>

              <div class="wizard-result-actions">
                <button class="wizard-use-btn" @click="useResult">
                  {{ ui.useThis }}
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                </button>
                <button class="wizard-back-btn" @click="restart">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.5"/></svg>
                  {{ ui.restart }}
                </button>
              </div>
            </div>
          </Transition>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* ── Backdrop ── */
.wizard-backdrop {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

/* ── Modal ── */
.wizard-modal {
  width: 100%;
  max-width: 540px;
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  max-height: 90vh;
}

/* ── Header ── */
.wizard-header {
  padding: 20px 24px 0;
  flex-shrink: 0;
}

.wizard-header-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.wizard-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--accent-color);
}

.wizard-close {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-secondary);
  border: none;
  border-radius: 50%;
  color: var(--text-secondary);
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
  flex-shrink: 0;
}

.wizard-close:hover {
  background: var(--bg-tertiary);
  color: var(--text-primary);
}

/* Progress bar */
.wizard-progress {
  height: 3px;
  background: var(--border-color);
  border-radius: 2px;
  overflow: hidden;
}

.wizard-progress-bar {
  height: 100%;
  background: var(--accent-color);
  border-radius: 2px;
  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* ── Content area ── */
.wizard-content {
  padding: 24px 24px 28px;
  overflow-y: auto;
  flex: 1;
}

.wizard-step-label {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-tertiary);
  margin-bottom: 12px;
}

.wizard-title {
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--text-primary);
  line-height: 1.3;
  margin-bottom: 20px;
}

.wizard-subtitle {
  font-size: 0.92rem;
  color: var(--text-secondary);
  line-height: 1.55;
  margin-bottom: 24px;
}

/* ── Intro ── */
.wizard-intro {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.wizard-intro-emoji,
.wizard-result-emoji {
  font-size: 2.5rem;
  margin-bottom: 12px;
  line-height: 1;
}

.wizard-start-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 13px 28px;
  background: var(--text-primary);
  color: var(--bg-primary);
  border: none;
  border-radius: 100px;
  font-size: 0.9rem;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.2s;
  margin-top: 4px;
}

.wizard-start-btn:hover {
  opacity: 0.85;
  transform: translateY(-2px);
}

/* ── Answers ── */
.wizard-answers {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
}

.wizard-answer {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 12px 14px;
  background: var(--bg-secondary);
  border: 1px solid transparent;
  border-radius: 10px;
  cursor: pointer;
  text-align: left;
  font-family: inherit;
  font-size: 0.9rem;
  color: var(--text-secondary);
  transition: all 0.15s ease;
}

.wizard-answer:hover {
  background: var(--bg-tertiary);
  border-color: var(--border-color);
  color: var(--text-primary);
  transform: translateX(3px);
}

.wizard-answer.selected {
  background: rgba(56, 189, 248, 0.08);
  border-color: var(--accent-color);
  color: var(--text-primary);
}

.wizard-answer-letter {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--text-tertiary);
  transition: all 0.15s;
}

.wizard-answer.selected .wizard-answer-letter {
  background: var(--accent-color);
  border-color: var(--accent-color);
  color: #fff;
}

.wizard-answer-text {
  flex: 1;
}

.wizard-answer-arrow {
  flex-shrink: 0;
  color: var(--text-tertiary);
  opacity: 0;
  transition: opacity 0.15s, transform 0.15s;
}

.wizard-answer:hover .wizard-answer-arrow {
  opacity: 1;
  transform: translateX(2px);
}

/* ── Back button ── */
.wizard-back-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  background: none;
  border: 1px solid var(--border-color);
  border-radius: 100px;
  font-size: 0.8rem;
  font-weight: 500;
  font-family: inherit;
  color: var(--text-secondary);
  cursor: pointer;
  transition: border-color 0.15s, color 0.15s;
}

.wizard-back-btn:hover {
  border-color: var(--text-secondary);
  color: var(--text-primary);
}

/* ── Result ── */
.wizard-result {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.wizard-result-pill {
  display: inline-block;
  padding: 10px 28px;
  background: var(--accent-color);
  color: #fff;
  font-size: 1.1rem;
  font-weight: 700;
  border-radius: 100px;
  margin-bottom: 14px;
  letter-spacing: -0.01em;
}

.wizard-result-desc {
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.55;
  margin-bottom: 28px;
  max-width: 340px;
  text-align: center;
}

/* Breakdown bars */
.wizard-breakdown {
  width: 100%;
  text-align: left;
  margin-bottom: 28px;
}

.wizard-breakdown-label {
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-tertiary);
  margin-bottom: 14px;
}

.wizard-bars {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.wizard-bar-row {
  display: grid;
  grid-template-columns: 110px 1fr 28px;
  align-items: center;
  gap: 10px;
}

.wizard-bar-name {
  font-size: 0.82rem;
  color: var(--text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.wizard-bar-name.winner {
  color: var(--text-primary);
  font-weight: 600;
}

.wizard-bar-track {
  height: 6px;
  background: var(--bg-tertiary);
  border-radius: 3px;
  overflow: hidden;
}

.wizard-bar-fill {
  height: 100%;
  background: var(--border-color);
  border-radius: 3px;
  transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.wizard-bar-fill.winner {
  background: var(--accent-color);
}

.wizard-bar-score {
  font-size: 0.78rem;
  color: var(--text-tertiary);
  text-align: right;
}

.wizard-bar-score.winner {
  color: var(--accent-color);
  font-weight: 700;
}

/* ── Result actions ── */
.wizard-result-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
}

.wizard-use-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 13px 28px;
  background: var(--text-primary);
  color: var(--bg-primary);
  border: none;
  border-radius: 100px;
  font-size: 0.9rem;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.2s;
}

.wizard-use-btn:hover {
  opacity: 0.85;
  transform: translateY(-2px);
}

/* ── Transitions ── */
.wizard-fade-enter-active,
.wizard-fade-leave-active {
  transition: opacity 0.25s ease;
}
.wizard-fade-enter-from,
.wizard-fade-leave-to {
  opacity: 0;
}

.wizard-slide-enter-active,
.wizard-slide-leave-active {
  transition: opacity 0.22s ease, transform 0.22s ease;
}
.wizard-slide-enter-from {
  opacity: 0;
  transform: translateX(20px);
}
.wizard-slide-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

@media (max-width: 480px) {
  .wizard-modal {
    max-height: 95vh;
    border-radius: 16px;
  }

  .wizard-bar-row {
    grid-template-columns: 85px 1fr 24px;
  }
}
</style>
