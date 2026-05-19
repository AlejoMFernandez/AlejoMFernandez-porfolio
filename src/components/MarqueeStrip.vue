<script setup>
defineProps({
  direction: {
    type: String,
    default: 'left'
  },
  speed: {
    type: Number,
    default: 28
  }
})

const items = [
  'Vue.js', 'Vite', 'JavaScript', 'Laravel', 'CSS', 'PHP',
  'Tailwind', 'REST APIs', 'Azure', 'DevOps', 'SQL', 'PowerShell',
  'Git', 'Node.js', 'HTML5', 'Figma'
]
</script>

<template>
  <div class="marquee-outer" :class="{ reverse: direction === 'right' }">
    <div class="marquee-track" :style="{ '--speed': speed + 's' }">
      <div class="marquee-content" v-for="n in 2" :key="n" :aria-hidden="n === 2 ? 'true' : undefined">
        <span v-for="item in items" :key="item + n" class="marquee-item">
          <span class="marquee-text">{{ item }}</span>
          <span class="marquee-star" aria-hidden="true">✦</span>
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.marquee-outer {
  overflow: hidden;
  border-top: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
  padding: 13px 0;
  white-space: nowrap;
  mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
}

.marquee-outer.reverse .marquee-track {
  animation-direction: reverse;
}

.marquee-track {
  display: flex;
  width: max-content;
  animation: marquee-scroll var(--speed, 28s) linear infinite;
}

.marquee-outer:hover .marquee-track {
  animation-play-state: paused;
}

@keyframes marquee-scroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

.marquee-content {
  display: flex;
  align-items: center;
}

.marquee-item {
  display: inline-flex;
  align-items: center;
  gap: 18px;
  padding: 0 18px;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--text-tertiary);
  transition: color 0.2s ease;
}

.marquee-item:hover {
  color: var(--accent-color);
}

.marquee-star {
  font-size: 0.45rem;
  color: var(--accent-color);
  opacity: 0.7;
}
</style>
