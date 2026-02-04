<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import personal from '../data/personal.json'

const { t } = useI18n()

const currentTime = ref('')

const updateTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString('es-AR', {
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  })
}

let timeInterval = null

onMounted(() => {
  updateTime()
  timeInterval = setInterval(updateTime, 1000)
})

onUnmounted(() => {
  if (timeInterval) clearInterval(timeInterval)
})
</script>

<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-grid">
        <!-- Info -->
        <div class="footer-section">
          <h4 class="footer-label">{{ t('footer.version') }}</h4>
          <p class="footer-text">2026 © Edition</p>
        </div>

        <!-- Local Time -->
        <div class="footer-section">
          <h4 class="footer-label">{{ t('footer.localTime') }}</h4>
          <p class="footer-text time">{{ currentTime }}</p>
        </div>

        <!-- Socials -->
        <div class="footer-section">
          <h4 class="footer-label">{{ t('footer.socials') }}</h4>
          <div class="footer-links">
            <a 
              v-if="personal.redes.github"
              :href="personal.redes.github" 
              target="_blank"
              class="footer-link"
            >
              GitHub
            </a>
            <a 
              v-if="personal.redes.linkedin"
              :href="personal.redes.linkedin" 
              target="_blank"
              class="footer-link"
            >
              LinkedIn
            </a>
            <a 
              v-if="personal.redes.twitter"
              :href="personal.redes.twitter" 
              target="_blank"
              class="footer-link"
            >
              Twitter
            </a>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p class="footer-copyright">
          {{ t('footer.designedBy') }} {{ personal.nombre }} {{ personal.apellido }}
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding: 60px 24px 40px;
  border-top: 1px solid var(--border-color);
  margin-top: 80px;
}

.footer-container {
  max-width: 1400px;
  margin: 0 auto;
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  margin-bottom: 60px;
}

.footer-label {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-tertiary);
  margin-bottom: 12px;
}

.footer-text {
  color: var(--text-secondary);
  font-size: 0.95rem;
}

.footer-text.time {
  font-variant-numeric: tabular-nums;
}

.footer-links {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.footer-link {
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.3s ease;
  width: fit-content;
}

.footer-link:hover {
  color: var(--text-primary);
}

.footer-bottom {
  padding-top: 40px;
  border-top: 1px solid var(--border-color);
  text-align: center;
}

.footer-copyright {
  color: var(--text-tertiary);
  font-size: 0.875rem;
}

@media (max-width: 768px) {
  .footer {
    padding: 40px 20px 30px;
    margin-top: 60px;
  }

  .footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: 32px;
  }

  .footer-section:last-child {
    grid-column: span 2;
  }

  .footer-links {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 16px;
  }
}
</style>
