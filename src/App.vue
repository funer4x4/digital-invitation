<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import CityBackground from './components/CityBackground.vue'
import Portada from './components/Portada.vue'
import Detalles from './components/Detalles.vue'
import Regalos from './components/Regalos.vue'
import Trivia from './components/Trivia.vue'
import soundtrack from './assets/audio/watermelon_beats-medieval-folk-music-505203.mp3'

const audioRef = ref(null)
const musicEnabled = ref(true)
const musicPending = ref(false)
const musicError = ref(false)

function removeMusicListeners() {
  document.removeEventListener('click', startSoundtrack)
  document.removeEventListener('keydown', startSoundtrack)
}

async function playMusic() {
  if (!audioRef.value || !musicEnabled.value || musicPending.value) return
  musicPending.value = true
  musicError.value = false
  audioRef.value.volume = 0.35
  try {
    await audioRef.value.play()
    if (!musicEnabled.value) audioRef.value?.pause()
    else removeMusicListeners()
  } catch (error) {
    // A blocked autoplay is retried on the first permitted user interaction.
    musicError.value = error.name !== 'NotAllowedError' && error.name !== 'AbortError'
  } finally {
    musicPending.value = false
  }
}

function startSoundtrack() {
  if (musicEnabled.value) playMusic()
}

function disableMusic() {
  musicEnabled.value = false
  removeMusicListeners()
  audioRef.value?.pause()
}

// Secciones para la navegación lateral por anclas
const sections = [
  { id: 'portada', label: 'Portada' },
  { id: 'detalles', label: 'Detalles' },
  { id: 'regalos', label: 'Regalos' },
  { id: 'trivia', label: 'Trivia' }
]

const activeSection = ref('portada')
const containerRef = ref(null)
let observer = null

// Cambiar la sección activa manualmente al hacer clic
function setActive(id) {
  const container = containerRef.value
  const section = document.getElementById(id)
  if (!container || !section) return
  activeSection.value = id
  const top = section.getBoundingClientRect().top - container.getBoundingClientRect().top + container.scrollTop
  container.scrollTo({ top, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
  section.focus({ preventScroll: true })
}

// Configurar IntersectionObserver para detectar la sección visible en el scroll-snap
onMounted(() => {
  document.addEventListener('click', startSoundtrack)
  document.addEventListener('keydown', startSoundtrack)
  playMusic()
  const options = {
    root: containerRef.value,
    threshold: [0.1, 0.3, 0.6] // Detecta cuando al menos el 60% de la sección es visible
  }

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        activeSection.value = entry.target.id
      }
    })
  }, options)

  sections.forEach((sec) => {
    const el = document.getElementById(sec.id)
    if (el) observer.observe(el)
  })
})

onUnmounted(() => {
  removeMusicListeners()
  audioRef.value?.pause()
  if (observer) observer.disconnect()
})
</script>

<template>
  <div class="app-wrapper">
    <!-- One persistent player for the entire invitation. -->
    <audio
      ref="audioRef"
      :src="soundtrack"
      loop
      preload="auto"
      @error="musicError = true"
    ></audio>
    <button
      class="music-toggle"
      type="button"
      :aria-label="musicEnabled ? 'Desactivar música' : 'Música desactivada'"
      :aria-pressed="musicEnabled"
      :disabled="!musicEnabled"
      :title="musicError ? 'No se pudo cargar la música' : musicEnabled ? 'Desactivar música' : 'Música desactivada'"
      @click.stop="disableMusic"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M11 5 6 9H3v6h3l5 4Z" />
        <path v-if="musicEnabled" d="M15 8a6 6 0 0 1 0 8M18 5a10 10 0 0 1 0 14" />
        <path v-else d="m16 9 5 6m0-6-5 6" />
      </svg>
    </button>
    <!-- Paisaje medieval con ambientes de mañana, tarde y noche -->
    <CityBackground />

    <!-- Contenedor principal con scroll vertical estricto (scroll-snap-type: y mandatory) -->
    <main class="snap-container" ref="containerRef">
      <Portada @show-details="setActive('detalles')" />
      <Detalles />
      <Regalos />
      <Trivia />
    </main>
  </div>
</template>

<style>
/* Limpieza de estilos globales para eliminar márgenes o desbordamientos */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden; /* El scroll lo gestiona el contenedor principal .snap-container */
  font-family: 'Fredoka', 'Outfit', 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
  background-color: #e0f2fe;
  color: #1e293b;
  -webkit-font-smoothing: antialiased;
}

#app {
  width: 100%;
  height: 100dvh;
  margin: 0;
  padding: 0;
  max-width: none;
}

.snap-container > section:focus { outline: none; }
</style>

<style scoped>
/* Estructura principal de la aplicación */
.music-toggle {
  position: fixed;
  bottom: max(1rem, env(safe-area-inset-bottom));
  left: 1rem;
  z-index: 1001;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  padding: 12px;
  border: 1px solid #b8a477;
  border-radius: 999px;
  background: #f7edd3ed;
  color: #40543e;
  box-shadow: 0 2px 8px #14251d26;
  cursor: pointer;
}
.music-toggle svg { width: 20px; height: 20px; flex-shrink: 0; }
.music-toggle[aria-pressed="true"] { background: #536b50cc; color: #fff5dc; }
.music-toggle:focus-visible { outline: 3px solid #b78c50; outline-offset: 3px; }
.music-toggle:disabled { cursor: default; opacity: .75; }

.app-wrapper {
  position: relative;
  width: 100%;
  height: 100dvh;
  overflow: hidden;
  background: #e0f2fe;
}

/* Contenedor principal de Scroll Snap */
.snap-container {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100dvh;
  overflow-y: scroll;
  scroll-snap-type: y proximity;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
}

/* Ocultar barra de scroll para una experiencia limpia en móvil y desktop */
.snap-container::-webkit-scrollbar {
  width: 0px;
  background: transparent;
}
.snap-container {
  scrollbar-width: none;
}

/* Menú lateral flotante de puntitos (.nav-dots) */
.nav-dots {
  position: fixed;
  right: 1.5rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
  padding: 0.8rem 0.5rem;
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(10px);
  border-radius: 9999px;
  border: 1.5px solid rgba(125, 211, 252, 0.6);
  box-shadow: 0 6px 20px rgba(2, 132, 199, 0.12);
}

.dot-link {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  text-decoration: none;
  border-radius: 50%;
  outline: none;
}

.dot-inner {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #7dd3fc;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.dot-link:hover .dot-inner {
  background-color: #ff4d4d;
  transform: scale(1.3);
}

/* Estado activo del puntito (.nav-dots .active) */
.dot-link.active .dot-inner {
  background-color: #ff4d4d;
  width: 14px;
  height: 14px;
  box-shadow: 0 0 10px rgba(255, 77, 77, 0.6);
}

.dot-link.active {
  border: 2px solid #ff4d4d;
  border-radius: 50%;
  padding: 2px;
}

/* Tooltip emergente con el nombre de la sección */
.dot-tooltip {
  position: absolute;
  right: 28px;
  background: #ffffff;
  color: #0284c7;
  font-weight: 700;
  font-size: 0.8rem;
  padding: 0.3rem 0.6rem;
  border-radius: 8px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transform: translateX(8px);
  transition: all 0.25s ease;
  box-shadow: 0 4px 12px rgba(2, 132, 199, 0.15);
  border: 1px solid #bae6fd;
}

/* Navigation uses the same sage, parchment and wax palette. */
.nav-dots {
  background: rgba(247, 237, 211, .88);
  border-color: #b8a477;
  box-shadow: 0 6px 20px #14251d3d;
}
.dot-inner { background-color: #788970; }
.dot-link:hover .dot-inner,
.dot-link.active .dot-inner { background-color: #8a302e; }
.dot-link.active { border-color: #8a302e; }
.dot-link.active .dot-inner { box-shadow: 0 0 10px #8a302e88; }
.dot-tooltip { background: #f7edd3; color: #536b50; border-color: #b8a477; font-family: Georgia, serif; }

.dot-link:hover .dot-tooltip {
  opacity: 1;
  transform: translateX(0);
}

@media (max-width: 640px) {
  .nav-dots {
    right: 0.8rem;
    gap: 0.9rem;
    padding: 0.6rem 0.4rem;
  }
  .dot-tooltip {
    display: none; /* Ocultar tooltips en dispositivos móviles pequeños */
  }
}
</style>
