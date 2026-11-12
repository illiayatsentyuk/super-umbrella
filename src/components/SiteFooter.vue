<script setup lang="ts">
import { navItems } from '../data/nav'
</script>

<template>
  <footer class="site-footer">
    <div class="wrap site-footer__grid">
      <div>
        <p class="site-footer__title">Мікс світів</p>
        <p class="site-footer__year">Поєднай непоєднуване</p>
      </div>
      <nav class="site-footer__nav" aria-label="Розділи сторінки">
        <RouterLink
          v-for="item in navItems"
          :key="item.id"
          class="site-footer__link"
          :to="item.to"
        >
          {{ item.label }}
        </RouterLink>
      </nav>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  margin-top: auto;
  flex-shrink: 0;
  background: var(--void);
  color: var(--cream);
  padding: 3rem 0 2.5rem;
}

.site-footer__grid {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) auto;
  gap: 2rem;
  align-items: start;
}

.site-footer__title {
  font-family: var(--display);
  font-size: 1.6rem;
  font-weight: 700;
  letter-spacing: -0.03em;
}

.site-footer__year {
  margin-top: 0.35rem;
  color: var(--ion);
  font-weight: 500;
}

.site-footer__nav {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.site-footer__link {
  color: inherit;
  text-decoration: none;
  transition:
    color 0.2s var(--ease),
    transform 0.2s var(--ease);
}

.site-footer__link:hover {
  color: var(--ion);
  transform: translateX(3px);
}

@media (max-width: 700px) {
  .site-footer__grid {
    grid-template-columns: 1fr;
  }
}
</style>
