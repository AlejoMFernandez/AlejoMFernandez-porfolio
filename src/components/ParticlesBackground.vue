<script setup>
const options = {
  fullScreen: {
    enable: false
  },
  background: {
    color: {
      value: 'transparent'
    }
  },
  fpsLimit: 60,
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: 'grab'
      },
      resize: true
    },
    modes: {
      grab: {
        distance: 140,
        links: {
          opacity: 0.3
        }
      }
    }
  },
  particles: {
    color: {
      value: '#888888'
    },
    links: {
      color: '#888888',
      distance: 150,
      enable: false,
      opacity: 0.15,
      width: 1
    },
    move: {
      direction: 'none',
      enable: true,
      outModes: {
        default: 'out'
      },
      random: true,
      speed: 0.3,
      straight: false
    },
    number: {
      density: {
        enable: true,
        area: 1000
      },
      value: 80
    },
    opacity: {
      value: {
        min: 0.1,
        max: 0.5
      },
      animation: {
        enable: true,
        speed: 0.5,
        minimumValue: 0.1,
        sync: false
      }
    },
    shape: {
      type: 'circle'
    },
    size: {
      value: {
        min: 1,
        max: 2.5
      }
    }
  },
  detectRetina: true
}
</script>

<template>
  <vue-particles
    id="tsparticles"
    class="particles-bg"
    :options="options"
  />
</template>

<style scoped>
.particles-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
}
</style>
