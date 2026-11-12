<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { blend, epochs, forces, type MixPiece } from '../data/mixer'

const epochId = ref('')
const forceId = ref('')
const woven = ref(false)

const epoch = computed(() => epochs.find((item) => item.id === epochId.value) ?? null)
const force = computed(() => forces.find((item) => item.id === forceId.value) ?? null)
const ready = computed(() => Boolean(epoch.value && force.value))
const result = computed(() => (epoch.value && force.value ? blend(epoch.value, force.value) : null))

watch([epochId, forceId], () => {
  woven.value = false
})

function chooseEpoch(item: MixPiece) {
  epochId.value = epochId.value === item.id ? '' : item.id
}

function chooseForce(item: MixPiece) {
  forceId.value = forceId.value === item.id ? '' : item.id
}

function weave() {
  if (!ready.value) return
  woven.value = true
}

function unravel() {
  epochId.value = ''
  forceId.value = ''
  woven.value = false
}
</script>

<template>
  <section class="atelier">
    <div class="wrap">
      <div data-reveal>
        <p class="kicker">Верстат</p>
        <h1 class="atelier__title">Зіткай свій світ</h1>
        <p class="lead prose atelier__lead">
          Спочатку вибери "звичайне", потім "чуже". Натисни "Зіткати", коли обидві частини
          стоять у верстаті. Доти світу ще немає.
        </p>
      </div>

      <div class="atelier__loom" data-reveal>
        <button
          type="button"
          class="atelier__slot"
          :class="{ 'atelier__slot--filled': epoch }"
          @click="epochId = ''"
        >
          <span class="atelier__slot-label">Перша частина</span>
          <strong class="atelier__slot-value">{{ epoch?.label ?? 'Порожньо' }}</strong>
          <i v-if="epoch" class="atelier__slot-swatch" :style="{ background: epoch.wash }"></i>
        </button>
        <p class="atelier__seam" aria-hidden="true">шов</p>
        <button
          type="button"
          class="atelier__slot"
          :class="{ 'atelier__slot--filled': force }"
          @click="forceId = ''"
        >
          <span class="atelier__slot-label">Друга частина</span>
          <strong class="atelier__slot-value">{{ force?.label ?? 'Порожньо' }}</strong>
          <i
            v-if="force"
            class="atelier__slot-swatch"
            :style="{ background: force.accent }"
          ></i>
        </button>
      </div>

      <div class="atelier__trays">
        <fieldset class="atelier__tray">
          <legend class="atelier__legend">Звичайне</legend>
          <div class="atelier__threads">
            <button
              v-for="item in epochs"
              :key="item.id"
              type="button"
              class="atelier__thread"
              :aria-pressed="epochId === item.id"
              @click="chooseEpoch(item)"
            >
              <i
                class="atelier__thread-swatch"
                :style="{ background: item.wash, boxShadow: `inset 0 0 0 3px ${item.accent}` }"
              ></i>
              {{ item.label }}
            </button>
          </div>
        </fieldset>
        <fieldset class="atelier__tray">
          <legend class="atelier__legend">Чуже</legend>
          <div class="atelier__threads">
            <button
              v-for="item in forces"
              :key="item.id"
              type="button"
              class="atelier__thread"
              :aria-pressed="forceId === item.id"
              @click="chooseForce(item)"
            >
              <i
                class="atelier__thread-swatch"
                :style="{ background: item.wash, boxShadow: `inset 0 0 0 3px ${item.accent}` }"
              ></i>
              {{ item.label }}
            </button>
          </div>
        </fieldset>
      </div>

      <div class="atelier__actions">
        <button
          type="button"
          class="atelier__weave"
          :disabled="!ready || woven"
          @click="weave"
        >
          {{ woven ? 'Готово' : 'Зіткати' }}
        </button>
        <button
          v-if="epoch || force"
          type="button"
          class="atelier__reset"
          @click="unravel"
        >
          Почати знову
        </button>
      </div>

      <article
        v-if="woven && result && epoch && force"
        :key="`${epoch.id}-${force.id}`"
        class="atelier__poster"
        :style="{ '--a': epoch.wash, '--b': force.wash, '--accent': force.accent }"
        aria-live="polite"
      >
        <div class="atelier__poster-field" aria-hidden="true"></div>
        <div class="atelier__poster-copy">
          <p class="kicker">Результат</p>
          <h2 class="atelier__poster-title">{{ result.title }}</h2>
          <p>{{ result.text }}</p>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.atelier {
  padding: 4.5rem 0 5rem;
  background:
    radial-gradient(800px 360px at 100% 0%, rgba(94, 234, 212, 0.1), transparent 55%),
    var(--void);
  color: var(--cream);
}

.atelier__title {
  font-size: clamp(2.7rem, 6vw, 5rem);
  max-width: 10ch;
}

.atelier__lead {
  color: #d5deea;
}

.atelier__loom {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 0.8rem;
  align-items: stretch;
  margin-top: 2rem;
}

.atelier__slot {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.45rem;
  min-height: 9rem;
  padding: 1.1rem 1.15rem;
  border: 1.5px dashed rgba(247, 250, 252, 0.3);
  border-radius: var(--radius);
  background: rgba(247, 250, 252, 0.04);
  color: inherit;
  text-align: left;
  cursor: pointer;
  overflow: hidden;
  transition:
    border-color 0.2s var(--ease),
    transform 0.2s var(--ease),
    background 0.2s var(--ease);
}

.atelier__slot-label {
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ion);
}

.atelier__slot-value {
  font-family: var(--display);
  font-size: 1.35rem;
  letter-spacing: -0.03em;
}

.atelier__slot-swatch {
  position: absolute;
  right: -1.5rem;
  bottom: -2rem;
  width: 7rem;
  height: 7rem;
  border-radius: 50%;
}

.atelier__slot--filled {
  border-style: solid;
  border-color: rgba(247, 250, 252, 0.5);
  background: rgba(247, 250, 252, 0.07);
}

.atelier__slot:hover {
  transform: translateY(-3px);
  border-color: rgba(94, 234, 212, 0.55);
  background: rgba(247, 250, 252, 0.09);
}

.atelier__seam {
  align-self: center;
  margin: 0;
  font-family: var(--display);
  font-size: 0.95rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--copper);
}

.atelier__trays {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.4rem;
  margin-top: 1.8rem;
}

.atelier__tray {
  margin: 0;
  padding: 0;
  border: 0;
  min-width: 0;
}

.atelier__legend {
  margin-bottom: 0.75rem;
  font-family: var(--display);
  font-size: 1.15rem;
}

.atelier__threads {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.atelier__thread {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  width: 100%;
  min-height: 2.8rem;
  padding: 0.35rem 0.7rem;
  border: 0;
  border-radius: var(--radius);
  background: var(--void-raised);
  color: var(--cream);
  text-align: left;
  cursor: pointer;
  box-shadow: inset 0 0 0 1px var(--line-light);
  transition:
    transform 0.2s var(--ease),
    background 0.2s var(--ease),
    box-shadow 0.2s var(--ease);
}

.atelier__thread-swatch {
  width: 1.15rem;
  height: 1.15rem;
  border-radius: 50%;
  flex: none;
}

.atelier__thread:hover {
  transform: translateX(4px);
  box-shadow:
    inset 0 0 0 1px rgba(94, 234, 212, 0.4),
    0 8px 16px rgba(0, 0, 0, 0.18);
}

.atelier__thread[aria-pressed='true'] {
  background: var(--cream);
  color: var(--ink);
}

.atelier__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
  margin-top: 1.5rem;
}

.atelier__weave,
.atelier__reset {
  min-height: 2.75rem;
  padding: 0.5rem 1.1rem;
  border-radius: var(--radius);
  border: 0;
  font-weight: 600;
  cursor: pointer;
  transition:
    transform 0.2s var(--ease),
    background 0.2s var(--ease),
    color 0.2s var(--ease),
    box-shadow 0.2s var(--ease);
}

.atelier__weave {
  background: var(--cream);
  color: var(--ink);
}

.atelier__weave:hover:not(:disabled) {
  transform: translateY(-2px);
  background: var(--ion);
  color: var(--void);
  box-shadow: 0 10px 20px rgba(94, 234, 212, 0.2);
}

.atelier__weave:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.atelier__reset {
  background: transparent;
  color: var(--cream);
  box-shadow: inset 0 0 0 1.5px rgba(247, 250, 252, 0.4);
}

.atelier__reset:hover {
  transform: translateY(-2px);
  background: rgba(247, 250, 252, 0.08);
  box-shadow: inset 0 0 0 1.5px rgba(94, 234, 212, 0.55);
}

.atelier__poster {
  display: grid;
  grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
  margin-top: 1.6rem;
  overflow: hidden;
  border-radius: calc(var(--radius) + 0.2rem);
  animation: rise 0.28s var(--ease);
}

.atelier__poster-field {
  min-height: 16rem;
  background:
    linear-gradient(115deg, var(--a) 0 42%, var(--accent) 42% 46%, var(--b) 46% 100%);
}

.atelier__poster-copy {
  padding: 1.5rem 1.4rem 1.6rem;
  background: var(--cream);
  color: var(--ink);
}

.atelier__poster-title {
  margin: 0.35rem 0 0.75rem;
  font-size: clamp(1.6rem, 3vw, 2.4rem);
}

@media (max-width: 800px) {
  .atelier__loom,
  .atelier__trays,
  .atelier__poster {
    grid-template-columns: 1fr;
  }

  .atelier__seam {
    justify-self: center;
  }
}
</style>
