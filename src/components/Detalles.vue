<script setup>
import { party, mapsUrl } from '../event'
</script>

<template>
  <section id="detalles" class="section-detalles" tabindex="-1">
    <div class="content">
      <div class="header-tag">
        <span>¿Dónde & Cuándo?</span>
      </div>
      
      <h2 class="title">Detalles de la Fiesta</h2>
      <p class="subtitle">¡El reino está de fiesta! Acompáñanos en esta aventura medieval.</p>

      <div class="cards-grid">
        <!-- Card Fecha -->
        <div class="info-card">
          <div class="icon-box red">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
          </div>
          <div class="card-details">
            <h3>Fecha</h3>
            <p class="highlight">{{ party.date }}</p>
            
          </div>
        </div>

        <!-- Card Hora -->
        <div class="info-card">
          <div class="icon-box blue">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
          </div>
          <div class="card-details">
            <h3>Horario</h3>
            <p class="highlight">{{ party.time }}</p>
            <p class="sub-detail">¡Llega a tiempo para la diversión!</p>
          </div>
        </div>

        <!-- Card Lugar -->
        <div class="info-card full-width">
          <div class="icon-box red">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
          </div>
          <div class="card-details">
            <h3>Ubicación</h3>
            <p class="highlight">{{ party.city }}</p>
            <p class="sub-detail">{{ party.street }}</p>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="actions">
        <a :href="mapsUrl" target="_blank" rel="noopener" class="btn btn-secondary">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
            <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/>
            <line x1="8" y1="2" x2="8" y2="18"/>
            <line x1="16" y1="6" x2="16" y2="22"/>
          </svg>
          Ver en Google Maps
        </a>
        <a href="https://wa.me/525579958505?text=Hola%2C%20confirmo%20mi%20asistencia%20al%20cumplea%C3%B1os%20n%C3%BAmero%202%20de%20Santiago!" target="_blank" rel="noopener" class="btn btn-primary">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
          </svg>
          Confirmar Asistencia
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-detalles {
  position: relative;
  min-height: 100dvh;
  height: auto;
  width: 100%;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  padding: 5rem 3rem 3rem;
  box-sizing: border-box;
}

.content {
  max-width: 720px;
  padding: clamp(1rem, 3vw, 2rem);
  border-radius: 24px;
  background: rgba(250, 245, 229, .96);
  box-shadow: 0 16px 45px #10241d40;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.header-tag {
  background: #ff4d4d;
  color: #ffffff;
  padding: 0.35rem 1rem;
  border-radius: 9999px;
  font-weight: 700;
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
  box-shadow: 0 4px 12px rgba(255, 77, 77, 0.3);
}

.title {
  font-size: 2.5rem;
  font-weight: 800;
  font-family: 'Fredoka', sans-serif;
  color: #0284c7;
  margin-bottom: 0.25rem;
  text-shadow: 0 2px 0 #ffffff, 0 4px 10px rgba(2, 132, 199, 0.15);
}

.subtitle {
  color: #334155;
  font-size: 1rem;
  margin-bottom: 1.5rem;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  width: 100%;
  margin-bottom: 1.5rem;
}

.info-card {
  background: #ffffff;
  border-radius: 18px;
  padding: 1.2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  text-align: left;
  border: 2px solid #e0f2fe;
  box-shadow: 0 6px 18px rgba(2, 132, 199, 0.06);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.info-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 24px rgba(2, 132, 199, 0.12);
}

.info-card.full-width {
  grid-column: span 2;
}

.icon-box {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.icon-box.red {
  background: #fee2e2;
  color: #ff4d4d;
}

.icon-box.blue {
  background: #e0f2fe;
  color: #0284c7;
}

.icon-box svg {
  width: 26px;
  height: 26px;
}

.card-details h3 {
  font-size: 0.85rem;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
}

.card-details .highlight {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1e293b;
  margin-top: 0.1rem;
}

.card-details .sub-detail {
  font-size: 0.85rem;
  color: #64748b;
}

.actions {
  display: flex;
  gap: 1rem;
  width: 100%;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.4rem;
  border-radius: 9999px;
  font-weight: 700;
  text-decoration: none;
  font-size: 0.95rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.btn-primary {
  background: #ff4d4d;
  color: #ffffff;
  box-shadow: 0 6px 18px rgba(255, 77, 77, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 22px rgba(255, 77, 77, 0.4);
}

.btn-secondary {
  background: #ffffff;
  color: #0284c7;
  border: 2px solid #7dd3fc;
  box-shadow: 0 4px 12px rgba(56, 189, 248, 0.15);
}

.btn-secondary:hover {
  transform: translateY(-2px);
  background: #f0f9ff;
}

@media (max-width: 580px) {
  .cards-grid {
    grid-template-columns: 1fr;
  }
  .info-card.full-width {
    grid-column: span 1;
  }
  .actions {
    flex-direction: column;
  }
  .btn {
    width: 100%;
    justify-content: center;
  }
}

.title { font-size: clamp(1.7rem, 5vw, 2.5rem); }
.content { min-width: 0; }

/* Medieval invitation theme */
.content {
  border: 1px solid #b8a477;
  background:
    repeating-linear-gradient(12deg, #79502008 0 1px, transparent 1px 5px),
    rgba(247, 237, 211, .96);
  box-shadow: 0 18px 48px #14251d55, inset 0 0 28px #9d754426;
}
.header-tag { background: #536b50; color: #fff5dc; box-shadow: 0 4px 12px #263b2944; }
.title {
  font-family: 'Great Vibes', 'Segoe Script', cursive;
  font-weight: 400;
  font-size: clamp(2.5rem, 8vw, 4rem);
  color: #7f2929;
  text-shadow: 0 1px #fff8e7, 0 3px 8px #6b472733;
}
.subtitle, .card-details .highlight { color: #3f4938; }
.info-card {
  background: #fff8e8c7;
  border: 1px solid #c7b37e;
  border-radius: 10px;
  box-shadow: 0 6px 16px #5d492525;
}
.info-card:hover { box-shadow: 0 9px 20px #5d492538; }
.icon-box.red, .icon-box.blue { background: #e1d3ad; color: #7f2929; border: 1px solid #c3a86d; }
.card-details h3 { color: #6b674e; font-family: Georgia, serif; }
.card-details .sub-detail { color: #6a6654; }
.btn { border-radius: 8px; font-family: Georgia, serif; }
.btn-primary { background: #8a302e; color: #fff5dc; box-shadow: 0 6px 18px #5d202044; }
.btn-primary:hover { box-shadow: 0 8px 22px #5d20205c; }
.btn-secondary { background: #667b5d; color: #fff5dc; border: 1px solid #87957a; box-shadow: 0 4px 12px #283b2b44; }
.btn-secondary:hover { background: #536b50; }
</style>
