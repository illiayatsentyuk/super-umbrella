<script setup lang="ts">
const doors = [
  {
    to: '/svity',
    index: '01',
    title: 'Світи',
    text: 'Вісім прикладів. Відкрий будь-який і подивись, що з чим змішано.',
    tone: 'moss',
  },
  {
    to: '/verstat',
    index: '02',
    title: 'Верстат',
    text: 'Вибери дві частини й натисни "Зіткати". Доти готового світу ще немає.',
    tone: 'void',
  },
  {
    to: '/manifest',
    index: '03',
    title: 'Маніфест',
    text: 'Реалізм тут не оцінюють. Важливіше, щоб у кадрі було видно твій почерк.',
    tone: 'copper',
  },
]
</script>

<template>
  <section class="section page-doors">
    <div class="wrap">
      <ul class="page-doors__list">
        <li
          v-for="(door, index) in doors"
          :key="door.to"
          class="page-doors__item"
          data-reveal
          :style="{ '--d': `${index * 80}ms` }"
        >
          <RouterLink
            class="page-doors__link"
            :class="`page-doors__link--${door.tone}`"
            :to="door.to"
          >
            <span class="page-doors__index">{{ door.index }}</span>
            <strong class="page-doors__title">{{ door.title }}</strong>
            <p class="page-doors__text">{{ door.text }}</p>
          </RouterLink>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.page-doors {
  padding-top: 0;
}

.page-doors__list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.9rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.page-doors__link {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  min-height: 14rem;
  padding: 1.25rem 1.2rem 1.35rem;
  border-radius: calc(var(--radius) + 0.15rem);
  text-decoration: none;
  transition:
    transform 0.22s var(--ease),
    box-shadow 0.22s var(--ease),
    filter 0.22s var(--ease);
}

.page-doors__link:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow);
  filter: brightness(1.05);
}

.page-doors__link:hover .page-doors__title {
  letter-spacing: -0.01em;
}

.page-doors__index {
  font-family: var(--display);
  font-size: 0.95rem;
  letter-spacing: 0.08em;
}

.page-doors__title {
  font-family: var(--display);
  font-size: 1.8rem;
  letter-spacing: -0.03em;
  transition: letter-spacing 0.22s var(--ease);
}

.page-doors__link--moss {
  background: var(--moss-deep);
  color: var(--cream);
}

.page-doors__link--void {
  background: var(--void);
  color: var(--cream);
}

.page-doors__link--moss .page-doors__index,
.page-doors__link--void .page-doors__index {
  color: var(--ion);
}

.page-doors__link--copper {
  background: var(--cream);
  color: var(--ink);
  box-shadow: inset 0 0 0 1px var(--line);
}

.page-doors__link--copper .page-doors__index {
  color: var(--copper);
}

@media (max-width: 800px) {
  .page-doors__list {
    grid-template-columns: 1fr;
  }
}
</style>
