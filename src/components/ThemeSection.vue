<script setup lang="ts">
import { pairs } from '../data/theme'
import { worlds } from '../data/worlds'
import PlaceholderFrame from './PlaceholderFrame.vue'

const stories = worlds.slice(0, 4)
</script>

<template>
  <section id="tema" class="section theme">
    <div class="wrap">
      <div data-reveal>
        <p class="kicker">Пари</p>
        <h2>Дві речі в одному кадрі</h2>
        <p class="lead prose">
          Тут чотири пари і кілька світів з галереї. У кожному світі дві частини стоять поруч.
          Смолоскип біля супутника. Клас біля чужої планети.
        </p>
      </div>

      <ul class="grid grid--4 theme__pairs">
        <li
          v-for="(pair, index) in pairs"
          :key="pair.left"
          class="theme__pair"
          data-reveal
          :style="{ '--d': `${index * 70}ms` }"
        >
          <p class="theme__pair-line">
            <span>{{ pair.left }}</span>
            <span class="theme__times" aria-hidden="true">×</span>
            <span>{{ pair.right }}</span>
          </p>
          <p>{{ pair.note }}</p>
        </li>
      </ul>

      <div class="theme__stories">
        <RouterLink
          v-for="(world, index) in stories"
          :key="world.id"
          class="theme__story"
          :to="{ name: 'world', params: { id: world.id } }"
          data-reveal
          :style="{ '--d': `${index * 80}ms` }"
        >
          <PlaceholderFrame :src="world.image" :alt="world.alt" />
          <div class="theme__story-copy">
            <h3 class="theme__story-title">{{ world.title }}</h3>
            <p>{{ world.story }}</p>
            <span class="theme__open">Відкрити</span>
          </div>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.theme__pairs {
  margin: 2.2rem 0 0;
  padding: 0;
  list-style: none;
}

.theme__pair {
  padding: 1.1rem 1rem 1.2rem;
  border-radius: var(--radius);
  background: var(--cream);
  box-shadow: inset 0 0 0 1px var(--line);
  transition:
    transform 0.22s var(--ease),
    box-shadow 0.22s var(--ease),
    background 0.22s var(--ease);
}

.theme__pair:hover {
  transform: translateY(-4px);
  background: var(--cream);
  box-shadow: var(--shadow);
}

.theme__pair-line {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  align-items: baseline;
  margin-bottom: 0.55rem;
  font-family: var(--display);
  font-weight: 700;
  letter-spacing: -0.03em;
}

.theme__times {
  color: var(--copper);
}

.theme__stories {
  display: grid;
  gap: 1rem;
  margin-top: 1.2rem;
}

.theme__story {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.15fr);
  overflow: hidden;
  border-radius: var(--radius);
  background: var(--cream);
  color: inherit;
  text-decoration: none;
  box-shadow: inset 0 0 0 1px var(--line);
  transition:
    transform 0.22s var(--ease),
    box-shadow 0.22s var(--ease);
}

.theme__story:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow);
}

.theme__story:hover .theme__open {
  color: var(--copper);
  transform: translateX(4px);
}

.theme__story-copy {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.7rem;
  padding: 1.4rem 1.5rem;
}

.theme__story-title {
  font-size: 1.55rem;
}

.theme__open {
  display: inline-block;
  font-weight: 700;
  color: var(--copper-deep);
  transition:
    color 0.2s var(--ease),
    transform 0.2s var(--ease);
}

@media (max-width: 800px) {
  .theme__story {
    grid-template-columns: 1fr;
  }
}
</style>
