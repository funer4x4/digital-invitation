<template>
  <section id="regalos" class="section-regalos" tabindex="-1">
    <div class="content">
      <div class="header-tag">
        <span>Sugerencias de Regalos</span>
      </div>

      <h2 class="title">Mesa de Regalos</h2>
      <p class="subtitle">
        Tu presencia es mi mejor regalo, pero si deseas hacerme un detalle:
      </p>

      <div class="gifts-grid">
        <!-- Gift Card 1: Clothes -->
        <div class="gift-card">
          <div class="gift-icon red">
            <span>👕</span>
          </div>
          <h3>Ropa & Calzado</h3>
          <p class="detail-bold">Talla Ropa: 2T - 3T</p>
          <p class="detail-sub">Talla Calzado: 14 MX</p>
        </div>

        <!-- Gift Card 2: Toys -->
        <div class="gift-card">
          <div class="gift-icon blue">
            <span>🧸</span>
          </div>
          <h3>Tesoros para jugar</h3>
          <p class="detail-bold">Lego Duplo, carritos y castillos de juguete, herramientas de trabajo, terrenos en tijuana</p>
          <p class="detail-sub">Libros para colorear y rompecabezas</p>
        </div>

        <!-- Gift Card 3: Envelope -->
        <div class="gift-card full-width">
          <div class="gift-icon red">
            <span>✉️</span>
          </div>
          <div class="envelope-info">
            <h3>Lluvia de Sobres</h3>
            <p class="detail-bold">Habrá un buzón especial el día del evento</p>
            <p class="detail-sub">¡Gracias por ser parte de mi gran aventura medieval!</p>
            <p class="detail-sub">(aceptamos vales por gomitas con chile)</p>
          </div>
        </div>
      </div>

      <div class="thank-you-box">
        <p>¡Gracias por llenar de magia el reino de Santiago! 👑✨</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-regalos {
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
  padding: 5rem 3rem 3rem 1.25rem;
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
  background: #38bdf8;
  color: #ffffff;
  padding: 0.35rem 1rem;
  border-radius: 9999px;
  font-weight: 700;
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
  box-shadow: 0 4px 12px rgba(56, 189, 248, 0.35);
}

.title {
  font-size: 2.5rem;
  font-weight: 800;
  font-family: 'Fredoka', sans-serif;
  color: #ff4d4d;
  margin-bottom: 0.25rem;
  text-shadow: 0 2px 0 #ffffff, 0 4px 10px rgba(255, 77, 77, 0.15);
}

.subtitle {
  color: #334155;
  font-size: 1rem;
  margin-bottom: 1.5rem;
  max-width: 480px;
}

.gifts-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  width: 100%;
  margin-bottom: 1.5rem;
}

.gift-card {
  background: #ffffff;
  border-radius: 20px;
  padding: 1.25rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border: 2px solid #e0f2fe;
  box-shadow: 0 6px 18px rgba(2, 132, 199, 0.06);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.gift-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 24px rgba(255, 77, 77, 0.12);
}

.gift-card.full-width {
  grid-column: span 2;
  flex-direction: row;
  text-align: left;
  gap: 1.2rem;
  padding: 1.2rem 1.5rem;
}

.gift-icon {
  width: 52px;
  height: 52px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  margin-bottom: 0.5rem;
  flex-shrink: 0;
}

.gift-card.full-width .gift-icon {
  margin-bottom: 0;
}

.gift-icon.red {
  background: #fee2e2;
}

.gift-icon.blue {
  background: #e0f2fe;
}

.gift-card h3 {
  font-size: 1.05rem;
  font-weight: 700;
  color: #0284c7;
  margin-bottom: 0.2rem;
}

.detail-bold {
  font-weight: 700;
  color: #1e293b;
  font-size: 0.95rem;
}

.detail-sub {
  font-size: 0.85rem;
  color: #64748b;
  margin-top: 0.1rem;
}

.thank-you-box {
  background: rgba(255, 255, 255, 0.9);
  padding: 0.75rem 1.5rem;
  border-radius: 9999px;
  border: 2px solid #ffccd5;
  color: #ff4d4d;
  font-weight: 700;
  font-size: 0.95rem;
  box-shadow: 0 4px 15px rgba(255, 77, 77, 0.1);
}

@media (max-width: 580px) {
  .gifts-grid {
    grid-template-columns: 1fr;
  }
  .gift-card.full-width {
    grid-column: span 1;
    flex-direction: column;
    text-align: center;
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
.subtitle, .detail-bold { color: #3f4938; }
.detail-sub { color: #6a6654; }
.gift-card {
  background: #fff8e8c7;
  border: 1px solid #c7b37e;
  border-radius: 10px;
  box-shadow: 0 6px 16px #5d492525;
}
.gift-card:hover { box-shadow: 0 9px 20px #5d492538; }
.gift-icon.red, .gift-icon.blue { background: #e1d3ad; border: 1px solid #c3a86d; }
.gift-card h3 { color: #7f2929; font-family: Georgia, serif; }
.thank-you-box {
  background: #687b5fd9;
  border: 1px solid #89957c;
  border-radius: 8px;
  color: #fff5dc;
  box-shadow: 0 4px 15px #263b2938;
  font-family: Georgia, serif;
}
</style>
