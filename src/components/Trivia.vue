<template>
  <section id="trivia" class="section-trivia" tabindex="-1">
    <div class="content">
      <div class="header-tag">
        <span>🏰 El reto del reino</span>
      </div>

      <h2 class="title">¿Conoces el reino de Santiago?</h2>
      <p class="subtitle">¡Responde las preguntas y gana tu lugar entre los caballeros del reino!</p>

      <!-- Quiz Card Container -->
      <div class="quiz-card" v-if="!showResult">
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }"></div>
        </div>

        <div class="question-header">
          <span class="q-number">Pregunta {{ currentQuestion + 1 }} de {{ questions.length }}</span>
          <h3 class="q-title">{{ questions[currentQuestion].question }}</h3>
        </div>

        <div class="options-list">
          <button
            v-for="(option, index) in questions[currentQuestion].options"
            :key="index"
            class="option-btn"
            :class="{
              'selected': selectedAnswer === index,
              'correct': answered && index === questions[currentQuestion].correct,
              'wrong': answered && selectedAnswer === index && index !== questions[currentQuestion].correct
            }"
            :disabled="answered"
            @click="selectOption(index)"
          >
            <span class="opt-letter">{{ ['A', 'B', 'C', 'D'][index] }}</span>
            <span class="opt-text">{{ option }}</span>
          </button>
        </div>

        <div class="quiz-footer" v-if="answered">
          <p class="feedback-msg" :class="selectedAnswer === questions[currentQuestion].correct ? 'msg-correct' : 'msg-wrong'">
            {{ selectedAnswer === questions[currentQuestion].correct ? '¡Acertaste! El reino celebra tu ingenio. 👑' : '¡Buen intento! La aventura continúa. 🏰' }}
          </p>
          <button class="next-btn" @click="nextQuestion">
            {{ currentQuestion + 1 < questions.length ? 'Siguiente Pregunta ➔' : 'Ver Resultados 🏆' }}
          </button>
        </div>
      </div>

      <!-- Result Card -->
      <div class="quiz-card result-card" v-else>
        <div class="result-icon">🏆</div>
        <h3>¡Has completado el reto del reino!</h3>
        <p class="score-text">Obtuviste <span>{{ score }}</span> de <span>{{ questions.length }}</span> aciertos.</p>

        <div class="badge-result">
          <p v-if="score === questions.length">👑 ¡Gran caballero del reino de Santiago! 👑</p>
          <p v-else-if="score >= Math.ceil(questions.length / 2)">🛡️ ¡Valiente guardián del castillo!</p>
          <p v-else>🏰 ¡Bienvenido a la aventura! Santiago te espera para celebrar.</p>
        </div>

        <div class="prize-box">
          <p class="prize-title">🎁 ¡Los primeros 5 en enviar su resultado ganan un premio el día de la fiesta!</p>
          <input
            v-model="guestName"
            class="name-input"
            type="text"
            placeholder="Escribe tu nombre"
            maxlength="40"
          />
          <a
            class="wa-btn"
            :class="{ 'is-disabled': !guestName.trim() }"
            :href="guestName.trim() ? whatsappUrl : undefined"
            target="_blank"
            rel="noopener"
            @click="!guestName.trim() && $event.preventDefault()"
          >
            Enviar mis resultados por WhatsApp
          </a>
        </div>

        <button class="restart-btn" @click="restartQuiz">
          🔄 Jugar de nuevo
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const WHATSAPP = '525579958505'

const questions = [
  {
    question: '¿Cuántos años cumple Santiago?',
    options: ['1 año', '2 años', '3 años'],
    correct: 1
  },
  {
    question: '¿Cómo se llama el hermano de Santiago?',
    options: ['Mateo', 'Emiliano', 'Sebastián'],
    correct: 2
  },
  {
    question: '¿Cuál es el superhéroe favorito de Santiago?',
    options: ['Spiderman', 'Batman', 'Superman'],
    correct: 0
  },
  {
    question: '¿Cuál es el programa favorito de Santiago?',
    options: ['Sheriff Labrador', 'Bob Esponja', 'Pocoyó'],
    correct: 2
  },
  {
    question: '¿Cómo se porta Santiago en una fiesta?',
    options: [
      'Tranquilo y calladito, sentado en su silla',
      'Travieso, chillón y nada tranquilo 😂',
      'Dormidito todo el rato'
    ],
    correct: 1
  },
  {
    question: 'Si se escucha un grito por toda la casa, ¿quién fue?',
    options: [
      'Nadie, la casa está en silencio',
      'El fantasma del castillo',
      'Santiago, seguro 🕷️'
    ],
    correct: 2
  },
  {
    question: '¿Cuál es el resultado de resolver la ecuación x - 5 = 3?',
    options: ['x = 2', 'x = -2', 'x = 8', 'x = 15'],
    correct: 2
  },
  {
    question: '¿Cómo se escribe en lenguaje algebraico "el doble de un número aumentado en 4"?',
    options: ['2x + 4', 'x² + 4', '2(x + 4)', 'x/2 + 4'],
    correct: 0
  }
]

const currentQuestion = ref(0)
const selectedAnswer = ref(null)
const answered = ref(false)
const score = ref(0)
const showResult = ref(false)
const guestName = ref('')

const whatsappUrl = computed(() => {
  const nombre = guestName.value.trim()
  const texto = `¡Hola! Soy ${nombre}. Terminé el reto del reino de Santiago y obtuve ${score.value} de ${questions.length} aciertos. 🏆`
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`
})

function selectOption(index) {
  if (answered.value) return
  selectedAnswer.value = index
  answered.value = true
  if (index === questions[currentQuestion.value].correct) {
    score.value++
  }
}

function nextQuestion() {
  if (currentQuestion.value + 1 < questions.length) {
    currentQuestion.value++
    selectedAnswer.value = null
    answered.value = false
  } else {
    showResult.value = true
  }
}

function restartQuiz() {
  currentQuestion.value = 0
  selectedAnswer.value = null
  answered.value = false
  score.value = 0
  showResult.value = false
}
</script>

<style scoped>
.section-trivia {
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
  font-size: 2.3rem;
  font-weight: 800;
  font-family: 'Fredoka', sans-serif;
  color: #0284c7;
  margin-bottom: 0.2rem;
  text-shadow: 0 2px 0 #ffffff, 0 4px 10px rgba(2, 132, 199, 0.15);
}

.subtitle {
  color: #475569;
  font-size: 0.95rem;
  margin-bottom: 1.25rem;
}

.quiz-card {
  background: #ffffff;
  border-radius: 24px;
  padding: 1.5rem;
  width: 100%;
  border: 2px solid #bae6fd;
  box-shadow: 0 10px 25px rgba(2, 132, 199, 0.08);
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: #e0f2fe;
  border-radius: 9999px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #ff4d4d;
  transition: width 0.3s ease;
}

.question-header {
  text-align: left;
}

.q-number {
  font-size: 0.8rem;
  color: #38bdf8;
  font-weight: 700;
  text-transform: uppercase;
}

.q-title {
  font-size: 1.25rem;
  color: #1e293b;
  font-weight: 700;
  margin-top: 0.2rem;
}

.options-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.option-btn {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  padding: 0.75rem 1rem;
  border-radius: 14px;
  font-size: 0.95rem;
  font-weight: 600;
  color: #334155;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
}

.option-btn:hover:not(:disabled) {
  border-color: #38bdf8;
  background: #f0f9ff;
}

.opt-letter {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: #e2e8f0;
  color: #475569;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.85rem;
  flex-shrink: 0;
}

.option-btn.correct {
  background: #dcfce7;
  border-color: #22c55e;
  color: #15803d;
}
.option-btn.correct .opt-letter {
  background: #22c55e;
  color: #ffffff;
}

.option-btn.wrong {
  background: #fee2e2;
  border-color: #ff4d4d;
  color: #b91c1c;
}
.option-btn.wrong .opt-letter {
  background: #ff4d4d;
  color: #ffffff;
}

.quiz-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.feedback-msg {
  font-weight: 700;
  font-size: 0.95rem;
}
.msg-correct { color: #16a34a; }
.msg-wrong { color: #dc2626; }

.next-btn, .restart-btn {
  background: #ff4d4d;
  color: #ffffff;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 9999px;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(255, 77, 77, 0.3);
  transition: transform 0.2s ease;
}

.next-btn:hover, .restart-btn:hover {
  transform: translateY(-2px);
}

.result-card {
  align-items: center;
  text-align: center;
  padding: 2rem 1.5rem;
}

.result-icon {
  font-size: 3.5rem;
}

.score-text {
  font-size: 1.1rem;
  color: #475569;
}
.score-text span {
  font-weight: 800;
  color: #ff4d4d;
  font-size: 1.4rem;
}

.badge-result {
  background: #f0f9ff;
  border: 2px solid #7dd3fc;
  padding: 0.75rem 1.25rem;
  border-radius: 16px;
  color: #0284c7;
  font-weight: 700;
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
.subtitle, .q-title, .score-text { color: #3f4938; }
.quiz-card {
  background: #fff8e8c7;
  border: 1px solid #c7b37e;
  border-radius: 10px;
  box-shadow: 0 8px 22px #5d49252e;
}
.progress-bar { background: #d9cda8; }
.progress-fill { background: linear-gradient(90deg, #536b50, #8a302e); }
.q-number { color: #7f2929; font-family: Georgia, serif; }
.option-btn { background: #f7efd9; border: 1px solid #c7b37e; border-radius: 8px; color: #464b3b; }
.option-btn:hover:not(:disabled) { background: #eee3c4; border-color: #7b8d6d; }
.opt-letter { background: #687b5f; color: #fff5dc; border-radius: 50%; }
.option-btn.correct { background: #dce5cf; border-color: #647a58; color: #40503a; }
.option-btn.correct .opt-letter { background: #536b50; }
.option-btn.wrong { background: #eed5cd; border-color: #93433d; color: #782d2b; }
.option-btn.wrong .opt-letter { background: #8a302e; }
.next-btn, .restart-btn { background: #8a302e; color: #fff5dc; border-radius: 8px; box-shadow: 0 4px 15px #5d202044; font-family: Georgia, serif; }
.score-text span { color: #7f2929; }
.badge-result { background: #e5dcc0; border: 1px solid #bca56c; color: #536b50; border-radius: 8px; }

/* Premio y envío por WhatsApp */
.prize-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.7rem;
  width: 100%;
  padding: 1rem;
  background: #f9edcd;
  border: 1px dashed #b8a377;
  border-radius: 8px;
  box-sizing: border-box;
}
.prize-title {
  font-family: Georgia, serif;
  font-weight: 700;
  color: #7f2929;
  font-size: 0.95rem;
}
.name-input {
  width: 100%;
  max-width: 320px;
  padding: 0.7rem 0.9rem;
  border: 1px solid #c7b37e;
  border-radius: 8px;
  background: #fffaf0;
  font-size: 1rem;
  color: #3f4938;
  box-sizing: border-box;
}
.name-input:focus { outline: 2px solid #536b50; }
.wa-btn {
  display: inline-block;
  min-height: 44px;
  line-height: 44px;
  padding: 0 1.4rem;
  background: #25803e;
  color: #ffffff;
  border-radius: 8px;
  font-weight: 700;
  text-decoration: none;
  font-family: Georgia, serif;
}
.wa-btn.is-disabled { opacity: 0.5; cursor: not-allowed; }
</style>