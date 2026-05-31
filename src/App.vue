<script setup>
import { RouterView, useRoute } from 'vue-router'
import { computed } from 'vue'
import NavBar from './components/NavBar.vue'
import ParticlesBackground from './components/ParticlesBackground.vue'
import CustomCursor from './components/CustomCursor.vue'

const route = useRoute()

// El header se oculta solo en la vista de detalle del proyecto
const showNavBar = computed(() => {
  return !route.path.startsWith('/proyecto/')
})
</script>

<template>
  <!-- Custom cursor (desktop only via CSS media query) -->
  <CustomCursor />

  <!-- Fondo de partículas sutil -->
  <ParticlesBackground />
  
  <!-- NavBar persistente (excepto en detalle de proyecto) -->
  <NavBar v-if="showNavBar" />
  
  <RouterView v-slot="{ Component }">
    <Transition name="page" mode="out-in">
      <component :is="Component" />
    </Transition>
  </RouterView>
</template>

<style>
/* Global transition styles */
.page-enter-active {
  transition: opacity 0.3s cubic-bezier(0.23, 1, 0.32, 1), transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);
}

.page-leave-active {
  transition: opacity 0.18s cubic-bezier(0.23, 1, 0.32, 1), transform 0.18s cubic-bezier(0.23, 1, 0.32, 1);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(16px) scale(0.99);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.99);
}
</style>
