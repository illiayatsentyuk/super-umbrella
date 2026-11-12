<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import PlaceholderFrame from '../components/PlaceholderFrame.vue'
import { worlds } from '../data/worlds'

const route = useRoute()

const index = computed(() => worlds.findIndex((item) => item.id === route.params.id))
const world = computed(() => (index.value >= 0 ? worlds[index.value] : undefined))
const previous = computed(() =>
  index.value >= 0 ? worlds[(index.value - 1 + worlds.length) % worlds.length] : undefined,
)
const next = computed(() =>
  index.value >= 0 ? worlds[(index.value + 1) % worlds.length] : undefined,
)
const numberLabel = computed(() => {
  if (index.value < 0) return ''
  const current = String(index.value + 1).padStart(2, '0')
  const total = String(worlds.length).padStart(2, '0')
  return `${current} / ${total}`
})
</script>

<template>
  <section v-if="world" class="section world-page">
    <div class="wrap world-page__layout">
      <PlaceholderFrame :src="world.image" :alt="world.alt" />
      <div class="world-page__copy">
        <p class="kicker">{{ numberLabel }}</p>
        <h1 class="world-page__title">{{ world.title }}</h1>
        <p class="lead world-page__lead">{{ world.story }}</p>
        <ul class="world-page__threads">
          <li v-for="thread in world.threads" :key="thread" class="world-page__thread">
            {{ thread }}
          </li>
        </ul>
        <p class="world-page__quiet">{{ world.text }}</p>
        <div class="world-page__pager">
          <RouterLink
            v-if="previous"
            class="world-page__pager-link"
            :to="{ name: 'world', params: { id: previous.id } }"
          >
            ← {{ previous.title }}
          </RouterLink>
          <RouterLink
            v-if="next"
            class="world-page__pager-link"
            :to="{ name: 'world', params: { id: next.id } }"
          >
            {{ next.title }} →
          </RouterLink>
        </div>
        <RouterLink class="world-page__back" :to="{ name: 'worlds' }">Усі світи</RouterLink>
      </div>
    </div>
  </section>

  <section v-else class="section world-page world-page--missing">
    <div class="wrap world-page__missing">
      <p class="kicker">Не знайдено</p>
      <h1 class="world-page__missing-title">Цього світу в галереї немає</h1>
      <RouterLink class="btn" :to="{ name: 'worlds' }">До галереї</RouterLink>
    </div>
  </section>
</template>

<style scoped>
.world-page {
  background:
    radial-gradient(700px 320px at 0% 0%, rgba(13, 148, 136, 0.12), transparent 60%),
    var(--parchment);
}

.world-page__layout {
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
  gap: 2rem;
  align-items: center;
}

.world-page__title {
  font-size: clamp(2.4rem, 5vw, 4.4rem);
  max-width: 12ch;
}

.world-page__lead {
  max-width: 38rem;
  margin-top: 1rem;
  font-size: 1.15rem;
}

.world-page__threads {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1.3rem 0 0;
  padding: 0;
  list-style: none;
}

.world-page__thread {
  padding: 0.3rem 0.65rem;
  border-radius: var(--radius);
  background: var(--ink);
  color: var(--cream);
  font-size: 0.9rem;
  font-weight: 600;
}

.world-page__quiet {
  max-width: 36rem;
  margin-top: 1rem;
  color: var(--ink-soft);
}

.world-page__pager {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem 1.4rem;
  margin-top: 1.8rem;
}

.world-page__pager-link,
.world-page__back {
  color: var(--ink);
  font-weight: 700;
  text-decoration: none;
  transition:
    color 0.2s var(--ease),
    transform 0.2s var(--ease);
}

.world-page__pager-link:hover,
.world-page__back:hover {
  color: var(--copper-deep);
}

.world-page__pager-link:first-child:hover {
  transform: translateX(-3px);
}

.world-page__pager-link:last-child:hover,
.world-page__back:hover {
  transform: translateX(3px);
}

.world-page__back {
  display: inline-block;
  margin-top: 0.9rem;
}

.world-page__layout :deep(.placeholder) {
  transition:
    transform 0.22s var(--ease),
    box-shadow 0.22s var(--ease);
  border-radius: var(--radius);
  overflow: hidden;
}

.world-page__layout:hover :deep(.placeholder) {
  transform: translateY(-4px);
  box-shadow: var(--shadow);
}

.world-page__missing {
  display: grid;
  gap: 1rem;
  justify-items: start;
}

.world-page__missing-title {
  font-size: clamp(2.2rem, 5vw, 3.6rem);
}

@media (max-width: 860px) {
  .world-page__layout {
    grid-template-columns: 1fr;
  }
}
</style>
