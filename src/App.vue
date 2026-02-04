<script setup>
import { RouterView, useRoute } from 'vue-router'
import { computed } from 'vue'
import NavBar from './components/NavBar.vue'
import ParticlesBackground from './components/ParticlesBackground.vue'

const route = useRoute()

// El header se oculta solo en la vista de detalle del proyecto
const showNavBar = computed(() => {
  return !route.path.startsWith('/proyecto/')
})
</script>

<template>
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
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
