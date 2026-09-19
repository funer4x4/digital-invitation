<template>
  <section id="portada" class="section-portada" tabindex="-1">

    <div class="content">
      <!-- Interactive 3D Envelope Container -->
      <div 
        class="envelope-wrapper" 
        :class="{ 'is-open': isOpen }" 
      >
        <button v-if="!isOpen" class="envelope-trigger" type="button" aria-label="Abrir sobre de invitaci&oacute;n" @click="openEnvelope"></button>
        <!-- Back of envelope -->
        <div class="envelope-back"></div>

        <!-- Invitation Letter inside -->
        <div class="invitation-letter" :inert="!isOpen" :aria-hidden="!isOpen">
          <div class="letter-badge">👑</div>
          <h2 class="letter-title">¡Santiago Cumple 2!</h2>
          <p class="letter-subtitle">¡Acompáñame a celebrar entre castillos y caballeros!</p>
          <div class="letter-tag">{{ party.date }}</div>
        </div>

        <div class="card-burst" aria-hidden="true">
          <span v-for="spark in 16" :key="spark" class="card-burst-ray" :style="{ '--ray': `${spark * 22.5}deg` }"></span>
          <span v-for="spark in 5" :key="`star-${spark}`" class="card-burst-star" :class="`card-burst-star-${spark}`">✦</span>
          <span class="card-burst-glow"></span>
        </div>

        <!-- Textured sage paper and diagonal folds -->
        <div class="envelope-pocket">
          <svg class="pocket-v-line" viewBox="0 0 320 210" preserveAspectRatio="none">
            <rect width="320" height="210" fill="#8d9e88" filter="url(#parchment-grain)" />
            <path d="M0 210L160 89L320 210 M0 50L160 126L320 50" fill="none" stroke="#4c634d" stroke-opacity=".3" stroke-width="0.8" />
          </svg>
        </div>

        <!-- Broad flap inspired by a traditional rectangular envelope -->
        <div class="envelope-flap">
          <svg class="flap-svg" viewBox="0 0 320 205" preserveAspectRatio="none">
            <defs>
              <linearGradient id="parchment-flap" x1="0" y1="0" x2="0.3" y2="1">
                <stop offset="0" stop-color="#94a28e" />
                <stop offset="0.5" stop-color="#8c9e87" />
                <stop offset="1" stop-color="#7c9076" />
              </linearGradient>
              <filter id="parchment-grain">
                <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="3" stitchTiles="stitch" />
                <feColorMatrix type="saturate" values="0" />
                <feComponentTransfer><feFuncA type="linear" slope="0.2" /></feComponentTransfer>
                <feBlend in="SourceGraphic" mode="multiply" />
              </filter>
            </defs>
            <polygon points="0 0, 320 0, 320 78, 160 204, 0 78" fill="url(#parchment-flap)" stroke="#536b50" stroke-width="1.5" stroke-linejoin="round" filter="url(#parchment-grain)" />
          </svg>
          <div class="envelope-inscription" aria-hidden="true">
            <span class="envelope-name">Santiago</span>
          </div>
        </div>

        <!-- Red wax seal with an impressed initial -->
        <div class="wax-seal">
          <div class="seal-inner">
            <span class="seal-monogram" aria-hidden="true">S</span>
            <span>ABRIR</span>
          </div>
        </div>
      </div>
      <div v-if="!isOpen" class="countdown" role="timer" aria-label="Tiempo restante para el cumplea&ntilde;os" aria-live="off">
        <span class="countdown-sparkles" aria-hidden="true">
          <span v-for="spark in 5" :key="spark" class="sparkle"></span>
        </span>
        <p class="countdown-heading">{{ countdown.finished ? '&iexcl;Lleg&oacute; el gran d&iacute;a!' : 'Falta poco para celebrar' }}</p>
        <div class="countdown-units">
          <div v-for="unit in countdownUnits" :key="unit.key" class="countdown-unit">
            <span class="countdown-value">{{ String(countdown[unit.key]).padStart(2, '0') }}</span>
            <span class="countdown-label">{{ unit.label }}</span>
          </div>
        </div>
        <p class="countdown-date">03 de octubre de 2026 &middot; 3:00 p. m.</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { party, getCountdown } from '../event'
const emit = defineEmits(['show-details', 'open'])

const isOpen = ref(false)
const now = ref(Date.now())
const countdown = computed(() => getCountdown(now.value))
const countdownUnits = [
  { key: 'days', label: 'Días' },
  { key: 'hours', label: 'Horas' },
  { key: 'minutes', label: 'Minutos' },
  { key: 'seconds', label: 'Segundos' },
]
let countdownTimer
onMounted(() => {
  now.value = Date.now()
  countdownTimer = setInterval(() => { now.value = Date.now() }, 1000)
})
onUnmounted(() => clearInterval(countdownTimer))

function openEnvelope() {
  if (isOpen.value) return
  isOpen.value = true
  emit('open')
  // Se eliminó el setTimeout automático para que el usuario pueda apreciar el sobre flotante
}

function scrollToDetails() {
  emit('show-details')
}
</script>

<style scoped>
.section-portada {
  height: 100vh;
  width: 100%;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  overflow: hidden;
  padding: 1.5rem;
  box-sizing: border-box;
}

.content {
  position: relative;
  z-index: 2;
  max-width: 500px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1rem;
}

.main-title {
  font-size: 2.8rem;
  font-weight: 800;
  font-family: 'Fredoka', sans-serif;
  color: #0284c7;
  line-height: 1.1;
  text-shadow: 0 2px 0 #ffffff, 0 4px 10px rgba(2, 132, 199, 0.15);
}

/* 3D Envelope Container */
.envelope-wrapper {
  position: relative;
  width: min(380px, 100%, 49svh);
  aspect-ratio: 1.55;
  height: auto;
  margin: 1.5rem auto 0.5rem auto;
  perspective: 1000px;
  cursor: pointer;
  user-select: none;
  animation: floatEnvelope 4s ease-in-out infinite alternate;
}

@keyframes floatEnvelope {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-6px); }
  100% { transform: translateY(0px); }
}

/* Aged paper with warm edges and fine fibers */
.envelope-back {
  position: absolute;
  inset: 0;
  background: linear-gradient(145deg, #62765d, #91a088 65%, #7a8e72);
  border-radius: 2px;
  box-shadow: 0 18px 40px #182c2540, 0 2px 5px #182c2530;
  border: 1px solid #70836a;
}

/* Folded parchment pocket */
.envelope-pocket {
  position: absolute;
  inset: 0;
  z-index: 3;
  pointer-events: none;
  border-radius: 2px;
  clip-path: polygon(0 24%, 0 100%, 100% 100%, 100% 24%, 50% 60%);
  background: #8d9e88;
  border: 1px solid #788c71;
  box-shadow: inset 0 -8px 18px #4c634d22;
}

.pocket-v-line {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

/* Hinged parchment flap */
.envelope-flap {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 64%;
  transform-origin: top center;
  transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1), z-index 0.7s step-end;
  z-index: 4;
  filter: drop-shadow(0 2px 1px #253d2b88);
}

.flap-svg {
  width: 100%;
  height: 100%;
  display: block;
}

/* Pooled red wax and recessed stamp */
.wax-seal {
  position: absolute;
  top: calc(64% - 28px);
  left: 50%;
  transform: translateX(-50%);
  z-index: 5;
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.seal-inner {
  position: relative;
  width: 74px;
  height: 72px;
  background: radial-gradient(circle at 30% 23%, #e96351 0, #ba302e 32%, #8f1d23 68%, #66151c 100%);
  border: 1px solid #882129;
  border-radius: 46% 54% 48% 52% / 53% 44% 56% 47%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 2px 6px 8px #48211366, inset 2px 3px 3px #ffaf8277, inset -3px -4px 4px #580f1a99;
  transform: rotate(-8deg);
  transition: transform .25s ease;
}
.seal-inner::before {
  content: '';
  position: absolute;
  inset: 8px;
  border: 2px solid #75151c;
  border-radius: 50%;
  box-shadow: 0 1px 1px #f6816577, inset 0 2px 3px #63101b77;
  pointer-events: none;
}
.seal-inner .seal-monogram {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 34px;
  font-style: italic;
  font-weight: 700;
  line-height: 1;
  color: #771b22;
  text-shadow: 0 1px 1px #f18a6a99, 0 -1px 1px #4b0a14;
}
.seal-inner span:last-child {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 8px;
  letter-spacing: 1.5px;
  margin-top: 3px;
  color: #f0b29a;
}
.envelope-wrapper:hover .seal-inner { transform: rotate(-3deg) scale(1.04); }
.envelope-wrapper:focus-visible { outline: 3px solid #e6bc6c; outline-offset: 10px; border-radius: 7px; }

/* Invitation Letter inside envelope */
.invitation-letter {
  position: absolute;
  left: 12px;
  right: 12px;
  top: 12px;
  height: 180px;
  background: radial-gradient(ellipse at center, #fff2d3, #e7ce9c);
  border-radius: 6px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  z-index: 2;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  border: 1px solid #b08c55;
  transition: transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), height 0.8s ease;
  transform: translateY(0);
  overflow: hidden;
}

.letter-badge {
  width: 44px;
  height: 44px;
  background: #ff4d4d;
  color: #ffffff;
  font-size: 1.8rem;
  font-weight: 800;
  font-family: 'Fredoka', sans-serif;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(255, 77, 77, 0.3);
  margin-bottom: 0.3rem;
}

.letter-title {
  font-size: 1.4rem;
  font-weight: 800;
  font-family: 'Fredoka', sans-serif;
  color: #0284c7;
  line-height: 1.1;
}

.letter-subtitle {
  font-size: 0.85rem;
  color: #334155;
  font-weight: 600;
  margin-top: 0.2rem;
}

.letter-tag {
  background: #f0f9ff;
  border: 1px solid #7dd3fc;
  color: #0284c7;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.25rem 0.6rem;
  border-radius: 9999px;
  margin-top: 0.5rem;
}

.go-details-btn {
  margin-top: 0.6rem;
  background: #ff4d4d;
  color: #ffffff;
  border: none;
  padding: 0.4rem 0.9rem;
  border-radius: 9999px;
  font-weight: 700;
  font-size: 0.8rem;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(255, 77, 77, 0.25);
  transition: transform 0.2s ease;
}

.go-details-btn:hover {
  transform: scale(1.05);
}

/* OPEN ENVELOPE ANIMATION STATE */
.envelope-wrapper {
  transition: margin-top 0.5s ease;
}

.envelope-wrapper.is-open {
  margin-top: 4.5rem;
}

.envelope-wrapper.is-open .envelope-flap {
  transform: rotateX(180deg);
  z-index: 1;
}

.envelope-wrapper.is-open .wax-seal {
  opacity: 0;
  transform: translateX(-50%) translateY(-20px);
  pointer-events: none;
}

.envelope-wrapper.is-open .invitation-letter {
  transform: translateY(-145px);
  height: 220px;
  z-index: 10;
}

/* Brief burst that follows the letter as it emerges. */
.card-burst {
  position: absolute;
  top: 57%;
  left: 50%;
  z-index: 11;
  width: 1px;
  height: 1px;
  pointer-events: none;
  opacity: 0;
  transform: translate(-50%, -50%);
}

.card-burst::before,
.card-burst::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: 0;
  width: 230px;
  height: 180px;
  background: linear-gradient(90deg, transparent 4%, #ffe98a66 34%, #fffde1cc 50%, #ffe98a66 66%, transparent 96%);
  filter: blur(12px);
  transform-origin: 50% 100%;
  opacity: 0;
}

.card-burst::before {
  transform: translate(-50%, 4px) rotate(-20deg) skewX(-12deg);
}

.card-burst::after {
  transform: translate(-50%, 4px) rotate(20deg) skewX(12deg);
}

.card-burst-glow {
  position: absolute;
  width: 150px;
  height: 78px;
  border-radius: 50%;
  background: radial-gradient(ellipse, #fffef0 0 16%, #fff6bd 38%, #ffd34d99 66%, transparent 76%);
  box-shadow: 0 0 26px 16px #ffe788, 0 0 80px 42px #ffbe3d88;
  transform: translate(-50%, -50%) scale(.2);
}

.card-burst-ray {
  position: absolute;
  width: 10px;
  height: 78px;
  border-radius: 999px;
  background: linear-gradient(to top, transparent, #ffe17a 35%, #fffde1);
  transform-origin: 50% 100%;
  box-shadow: 0 0 12px #ffe78a;
  transform: translate(-50%, -100%) rotate(var(--ray)) translateY(-18px) scaleY(.15);
}

.card-burst-star {
  position: absolute;
  color: #fff8be;
  font-size: 2rem;
  line-height: 1;
  text-shadow: 0 0 7px #fff2a1, 0 0 18px #ffb52e;
  transform: translate(-50%, -50%) scale(.1) rotate(-25deg);
}

.card-burst-star-1 { left: -82px; top: -52px; }
.card-burst-star-2 { left: 74px; top: -76px; font-size: 1.5rem; }
.card-burst-star-3 { left: -42px; top: -126px; font-size: 1.2rem; }
.card-burst-star-4 { left: 42px; top: -148px; font-size: 1.8rem; }
.card-burst-star-5 { left: 112px; top: -18px; font-size: 1.1rem; }

.envelope-wrapper.is-open .card-burst-star {
  animation: burst-star .9s cubic-bezier(.2, .8, .25, 1) .28s both;
}

.envelope-wrapper.is-open .card-burst {
  animation: burst-fade 1.15s ease-out .2s both;
}

.envelope-wrapper.is-open .card-burst::before,
.envelope-wrapper.is-open .card-burst::after {
  animation: burst-beam 1s ease-out .2s both;
}

.envelope-wrapper.is-open .card-burst-glow {
  animation: burst-glow .8s ease-out .2s both;
}

.envelope-wrapper.is-open .card-burst-ray {
  animation: burst-ray .8s cubic-bezier(.18, .8, .25, 1) .2s both;
}

@keyframes burst-fade {
  0%, 55% { opacity: 1; }
  100% { opacity: 0; }
}

@keyframes burst-glow {
  0% { transform: translate(-50%, -50%) scale(.2); opacity: 0; }
  25% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
  100% { transform: translate(-50%, -50%) scale(2.2); opacity: 0; }
}

@keyframes burst-beam {
  0% { opacity: 0; height: 30px; }
  25% { opacity: .95; }
  100% { opacity: 0; height: 220px; }
}

@keyframes burst-ray {
  0% { transform: translate(-50%, -100%) rotate(var(--ray)) translateY(-12px) scaleY(.15); opacity: 0; }
  35% { opacity: 1; }
  100% { transform: translate(-50%, -100%) rotate(var(--ray)) translateY(-92px) scaleY(1); opacity: 0; }
}

@keyframes burst-star {
  0% { opacity: 0; transform: translate(-50%, -50%) scale(.1) rotate(-25deg); }
  35% { opacity: 1; transform: translate(-50%, -50%) scale(1.2) rotate(8deg); }
  100% { opacity: 0; transform: translate(-50%, -90px) scale(.55) rotate(35deg); }
}

/* Action bar below envelope when open */
.open-action-bar {
  margin-top: 1rem;
  animation: fadeIn 0.5s ease-in forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.scroll-down-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: #ffffff;
  color: #ff4d4d;
  padding: 0.6rem 1.2rem;
  border-radius: 9999px;
  text-decoration: none;
  font-weight: 700;
  font-size: 0.9rem;
  box-shadow: 0 4px 15px rgba(255, 77, 77, 0.2);
  border: 2px solid #ffccd5;
  transition: transform 0.2s ease;
}

.scroll-down-btn:hover {
  transform: translateY(-2px);
}

.arrow-down {
  width: 18px;
  height: 18px;
  animation: bounce 1.8s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(5px); }
  60% { transform: translateY(2px); }
}

@media (max-width: 480px) {
  .envelope-wrapper {
    width: min(340px, 100%, 49svh);
    height: auto;
  }
  .envelope-wrapper.is-open {
    margin-top: 4.8rem;
  }
  .main-title {
    font-size: 2.1rem;
  }
  .invitation-letter {
    height: 165px;
    top: 10px;
  }
  .envelope-wrapper.is-open .invitation-letter {
    transform: translateY(-140px);
    height: 205px;
    z-index: 10;
  }
}

.envelope-inscription {
  position: absolute;
  inset: 10% 5% auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fffaf0;
  text-shadow: 0 1px 1px #334d3322;
  backface-visibility: hidden;
}
.envelope-name {
  font-family: 'Great Vibes', 'Segoe Script', cursive;
  font-size: clamp(42px, 9vw, 68px);
  font-weight: 400;
  line-height: 1.3;
}
.envelope-occasion {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: clamp(14px, 3.5vw, 20px);
  font-style: italic;
  letter-spacing: 1px;
}
.envelope-date {
  position: absolute;
  bottom: 6%;
  left: 0;
  width: 100%;
  z-index: 4;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: clamp(18px, 4.5vw, 25px);
  color: #fffaf0;
  pointer-events: none;
  letter-spacing: 1px;
}
.envelope-wrapper.is-open .envelope-inscription { visibility: hidden; }
@media (max-height: 650px) {
  .envelope-wrapper.is-open { margin-top: 3rem; }
  .envelope-wrapper.is-open .invitation-letter { transform: translateY(-110px); }
  .envelope-name { font-size: 42px; }
}
@media (prefers-reduced-motion: reduce) {
  .envelope-wrapper { animation: none; }
  .envelope-flap, .invitation-letter, .wax-seal { transition: none; }
  .card-burst { display: none; }
}

/* Keep the envelope and its opened card readable on short and narrow screens. */
.section-portada { min-height: 100dvh; height: auto; padding: 5rem 2.5rem; }
.envelope-wrapper { width: min(350px, 100%); margin: 0 auto; }
.envelope-wrapper.is-open { width: min(440px, 100%); margin: 0 auto; animation: none; }
.envelope-trigger { position: absolute; inset: 0; z-index: 6; background: transparent; border: 0; cursor: pointer; }
.envelope-trigger:focus-visible { outline: 3px solid #f5d28d; outline-offset: 8px; }
.invitation-letter { visibility: hidden; pointer-events: none; }
.envelope-wrapper.is-open .invitation-letter {
  visibility: visible; pointer-events: auto;
  top: 50%; left: -8px; right: -8px;
  transform: translateY(-50%);
  height: auto; max-height: calc(100dvh - 120px);
  overflow-y: auto;
  padding: clamp(1.25rem, 4vw, 2rem);
  justify-content: flex-start; gap: .65rem;
  box-shadow: 0 20px 60px #14231966;
}
.invitation-letter > * { flex-shrink: 0; }
.letter-title { font-size: clamp(1.4rem, 5vw, 1.9rem); color: #41543b; }
.letter-tag { color: #4c553e; background: #f9edcd; border-color: #b8a377; font-size: .9rem; }
.letter-time { font-size: 1.2rem; font-weight: 700; color: #852d2a; }
.letter-address { font-size: .95rem; line-height: 1.5; color: #4b493a; }
.go-details-btn { min-height: 44px; padding: .75rem 1rem; background: #913b36; }
@media (max-width: 480px) {
  .envelope-wrapper { width: min(290px, 100%); }
  .section-portada { padding-inline: 2.5rem; }
}

.content { gap: clamp(1.75rem, 4vh, 2.5rem); }
.countdown {
  position: relative;
  width: min(420px, 100%);
  padding: .5rem;
  color: #fff4d6;
  text-shadow: 0 2px 3px #15241e, 0 0 6px #15241ecc;
}
.countdown-heading { font-family: Georgia, serif; font-size: 1rem; margin-bottom: .8rem; }
.countdown-units { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: .4rem; }
.countdown-unit { display: flex; flex-direction: column; gap: .3rem; }
.countdown-value { text-shadow: 0 2px 3px #13231e, 0 0 8px #17271d, 0 0 16px #ffe6a977; font-family: Georgia, serif; font-size: clamp(1.5rem, 6vw, 2.4rem); line-height: 1; font-variant-numeric: tabular-nums; }
.countdown-label { font-size: clamp(.6rem, 2.3vw, .75rem); }
.countdown-date { margin-top: .85rem; font-size: .72rem; color: #fff4d6; }
@media (max-width: 480px) {
  .envelope-name { font-size: clamp(38px, 11vw, 54px); }
  .seal-inner { width: 62px; height: 60px; }
  .wax-seal { top: calc(64% - 24px); }
}

.envelope-name { font-size: clamp(38px, 9vw, 54px); }
.seal-inner { width: 62px; height: 60px; }
.wax-seal { top: calc(64% - 24px); }
.countdown-sparkles { position: absolute; inset: 0; pointer-events: none; }
.sparkle {
  position: absolute; width: 10px; height: 10px;
  background: #fff4ce;
  clip-path: polygon(50% 0, 61% 39%, 100% 50%, 61% 61%, 50% 100%, 39% 61%, 0 50%, 39% 39%);
  opacity: .2;
  animation: gentle-sparkle 5s ease-in-out infinite;
}
.sparkle:nth-child(1) { left: 8%; top: 28%; animation-delay: -.5s; }
.sparkle:nth-child(2) { left: 32%; top: 58%; width: 7px; height: 7px; animation-delay: -2.5s; }
.sparkle:nth-child(3) { left: 55%; top: 24%; animation-delay: -4s; }
.sparkle:nth-child(4) { right: 10%; top: 54%; width: 8px; height: 8px; animation-delay: -1.5s; }
.sparkle:nth-child(5) { right: 0; top: 15%; width: 6px; height: 6px; animation-delay: -3s; }
@keyframes gentle-sparkle {
  0%, 100% { opacity: .15; transform: scale(.6) rotate(0deg); }
  50% { opacity: .95; transform: scale(1.15) rotate(35deg); }
}
@media (prefers-reduced-motion: reduce) {
  .sparkle { animation: none; opacity: .55; }
}
</style>
