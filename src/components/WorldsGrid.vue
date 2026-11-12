<script setup lang="ts">
import { worlds } from '../data/worlds'
import WorldCard from './WorldCard.vue'
</script>

<template>
  <section id="svity" class="section section--dark section--enter worlds-grid">
    <div class="wrap">
      <div data-reveal>
        <p class="kicker">Галерея</p>
        <h1>Вісім прикладів</h1>
      </div>

      <ul class="grid grid--cards worlds-grid__list">
        <li
          v-for="(world, index) in worlds"
          :key="world.id"
          class="worlds-grid__item"
          data-reveal
          :style="{ '--d': `${index * 50}ms` }"
        >
          <WorldCard :world="world" />
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.worlds-grid__list {
  margin: 2rem 0 0;
  padding: 0;
  list-style: none;
}
</style>
