<script setup lang="ts">
import type { World } from '../data/worlds'
import PlaceholderFrame from './PlaceholderFrame.vue'

defineProps<{
  world: World
}>()
</script>

<template>
  <RouterLink class="world-card" :to="{ name: 'world', params: { id: world.id } }">
    <PlaceholderFrame :src="world.image" :alt="world.alt" />
    <div class="world-card__body">
      <h3 class="world-card__title">{{ world.title }}</h3>
      <p class="world-card__text">{{ world.text }}</p>
    </div>
  </RouterLink>
</template>

<style scoped>
.world-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  border-radius: var(--radius);
  background: var(--void-raised);
  color: inherit;
  text-decoration: none;
  box-shadow: inset 0 0 0 1px var(--line-light);
  transition:
    transform 0.22s var(--ease),
    box-shadow 0.22s var(--ease),
    background 0.22s var(--ease);
}

.world-card:hover {
  transform: translateY(-5px);
  background: #203040;
  box-shadow:
    0 18px 36px rgba(0, 0, 0, 0.3),
    inset 0 0 0 1px rgba(94, 234, 212, 0.28);
}

.world-card__body {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  padding: 1rem 1rem 1.15rem;
}

.world-card__title {
  font-size: 1.2rem;
}

.world-card__text {
  color: #d5deea;
}
</style>
