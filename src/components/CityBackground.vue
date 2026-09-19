<template>
  <div class="city-background" :class="currentMode">
    <div class="illustrated-landscape" aria-hidden="true">
      <img class="scene scene-day" :class="{ visible: currentMode === 'day' }" src="/backgrounds/medieval-morning.jpg" alt="" width="1536" height="1024" fetchpriority="high" />
      <img class="scene scene-sunset" :class="{ visible: currentMode === 'sunset' }" src="/backgrounds/medieval-sunset.jpg" alt="" width="1536" height="1024" />
      <img class="scene scene-night" :class="{ visible: currentMode === 'night' }" src="/backgrounds/medieval-night.jpg" alt="" width="1536" height="1024" />
      <div class="scene-shade"></div>
    </div>

    <!-- Floating Time Selector Widget (Auto 🕒 | Día ☀️ | Tarde 🌅 | Noche 🌙) -->
    <Teleport to="body">
    <div class="time-widget-wrapper" :class="currentMode">
      <div class="time-widget" aria-label="Cambiar horario del fondo">
        <button
          class="time-btn auto-btn"
          :class="{ active: isAutoMode }"
          :aria-pressed="isAutoMode"
          @click="resetAutoMode"
          title="Detectar automáticamente según la hora local"
        >
          <span class="icon">🕒</span>
          <span class="label">Auto</span>
        </button>
        <button
          class="time-btn"
          :class="{ active: !isAutoMode && currentMode === 'day' }"
          :aria-pressed="!isAutoMode && currentMode === 'day'"
          @click="setMode('day')"
          title="Modo Día"
        >
          <span class="icon">☀️</span>
          <span class="label">Día</span>
        </button>
        <button
          class="time-btn"
          :class="{ active: !isAutoMode && currentMode === 'sunset' }"
          :aria-pressed="!isAutoMode && currentMode === 'sunset'"
          @click="setMode('sunset')"
          title="Modo Tarde (Ocaso)"
        >
          <span class="icon">🌅</span>
          <span class="label">Tarde</span>
        </button>
        <button
          class="time-btn"
          :class="{ active: !isAutoMode && currentMode === 'night' }"
          :aria-pressed="!isAutoMode && currentMode === 'night'"
          @click="setMode('night')"
          title="Modo Noche"
        >
          <span class="icon">🌙</span>
          <span class="label">Noche</span>
        </button>
      </div>
    </div>
    </Teleport>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const currentMode = ref(getTimeModeFromHour()) // 'day' | 'sunset' | 'night'
const isAutoMode = ref(true)
let timer = null

function getTimeModeFromHour() {
  const hour = new Date().getHours()
  if (hour >= 7 && hour < 18) {
    return 'day'
  } else if (hour >= 18 && hour < 20) {
    return 'sunset'
  } else {
    return 'night'
  }
}

function setMode(mode) {
  currentMode.value = mode
  isAutoMode.value = false
}

function resetAutoMode() {
  isAutoMode.value = true
  currentMode.value = getTimeModeFromHour()
}

onMounted(() => {
  currentMode.value = getTimeModeFromHour()
  timer = setInterval(() => {
    if (isAutoMode.value) {
      currentMode.value = getTimeModeFromHour()
    }
  }, 60000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
.city-background {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
  transition: background 0.8s ease;
}

/* Floating Time Selector Widget */
.time-widget-wrapper {
  position: fixed;
  top: 0.8rem;
  left: 1rem;
  z-index: 1001;
  pointer-events: auto;
}

.time-widget {
  display: flex;
  align-items: center;
  gap: 0.12rem;
  padding: 0.18rem;
  background: rgba(255, 255, 255, 0.82);
  backdrop-filter: blur(12px);
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.9);
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.4s ease;
}

.time-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.18rem;
  min-height: 32px;
  padding: 0.2rem 0.48rem;
  border: none;
  background: transparent;
  border-radius: 9999px;
  font-family: 'Fredoka', sans-serif;
  font-weight: 700;
  font-size: 0.68rem;
  color: #475569;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  outline: none;
}

.time-btn .icon {
  font-size: 0.78rem;
}

.time-btn:hover {
  color: #0284c7;
  transform: translateY(-1px);
}

.time-btn.active {
  background: #0284c7;
  color: #ffffff;
  box-shadow: 0 2px 7px rgba(2, 132, 199, 0.3);
}

/* Full scene variants share composition for a gentle change of light. */
.illustrated-landscape { position: absolute; inset: 0; background: #34483e; }
.scene {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 65% center;
  opacity: 0;
  transition: opacity 1.5s ease;
}
.scene.visible { opacity: 1; }
.scene-shade {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, #10251b08, transparent 35%, #0b171f26);
  pointer-events: none;
}
.time-widget { background: #f4eedde6; border-color: #d7d3b8; }
.time-btn { color: #4b5e49; }
.time-btn:hover { color: #293f2c; }
.time-btn.active { background: #526b51; box-shadow: 0 3px 12px #233e2940; }
.time-btn:focus-visible { outline: 2px solid #9b4937; outline-offset: 2px; }
.time-widget-wrapper.night .time-widget { background: #152637e6; border-color: #627987; }
.time-widget-wrapper.night .time-btn { color: #e9e5d5; }
.time-widget-wrapper.night .time-btn.active { background: #476277; }
.time-widget-wrapper.sunset .time-btn.active { background: #936443; }
@media (max-width: 640px) {
  .scene { object-position: 78% center; }
  .time-widget-wrapper { top: .8rem; left: .8rem; }
  .time-btn { padding: .35rem .55rem; font-size: .75rem; }
  .time-btn .label { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .scene { transition: none; }
}
</style>
