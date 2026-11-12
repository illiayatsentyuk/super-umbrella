<script setup lang="ts">
import { principles } from '../data/theme'
</script>

<template>
  <section id="pryntsypy" class="section principles">
    <div class="wrap">
      <div data-reveal>
        <p class="kicker">Орієнтири</p>
        <h2>На що дивитися в роботі</h2>
      </div>
      <ol class="principles__list">
        <li
          v-for="(item, index) in principles"
          :key="item.index"
          class="principles__item"
          data-reveal
          :style="{ '--d': `${index * 80}ms` }"
        >
          <span class="principles__index">{{ item.index }}</span>
          <h3 class="principles__title">{{ item.title }}</h3>
          <p class="principles__text">{{ item.text }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.principles__list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
  margin: 2rem 0 0;
  padding: 0;
  list-style: none;
}

.principles__item {
  padding: 1.3rem 1.2rem 1.4rem;
  border-radius: var(--radius);
  background: rgba(247, 250, 252, 0.8);
  box-shadow: inset 0 0 0 1px var(--line);
  transition:
    transform 0.22s var(--ease),
    box-shadow 0.22s var(--ease),
    background 0.22s var(--ease);
}

.principles__item:hover {
  transform: translateY(-5px);
  background: #fff;
  box-shadow: var(--shadow);
}

.principles__index {
  display: block;
  margin-bottom: 0.8rem;
  font-family: var(--display);
  font-size: 1.8rem;
  color: var(--copper);
}

.principles__title {
  margin-bottom: 0.55rem;
  font-size: 1.35rem;
}

@media (max-width: 800px) {
  .principles__list {
    grid-template-columns: 1fr;
  }
}
</style>
