<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { darkRoutes, navItems, type NavItem } from '../data/nav'

const route = useRoute()
const compact = ref(false)
const open = ref(false)
const dark = computed(() => darkRoutes.has(String(route.name ?? '')))

const desktopQuery = window.matchMedia('(min-width: 861px)')

function onScroll() {
  compact.value = window.scrollY > 12
}

function onKey(event: KeyboardEvent) {
  if (event.key === 'Escape') closeMenu()
}

function onDesktopChange() {
  if (desktopQuery.matches) closeMenu()
}

function closeMenu() {
  open.value = false
}

function toggleMenu() {
  open.value = !open.value
}

function isCurrent(item: NavItem) {
  if (item.id === 'worlds') return route.name === 'worlds' || route.name === 'world'
  return route.name === item.id
}

function syncBodyLock() {
  document.body.style.overflow = open.value && !desktopQuery.matches ? 'hidden' : ''
}

watch(
  () => route.fullPath,
  () => {
    closeMenu()
  },
)

watch(open, () => {
  syncBodyLock()
})

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKey)
  desktopQuery.addEventListener('change', onDesktopChange)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKey)
  desktopQuery.removeEventListener('change', onDesktopChange)
  document.body.style.overflow = ''
})
</script>

<template>
  <header
    class="site-header"
    :class="{
      'site-header--compact': compact,
      'site-header--dark': dark,
      'site-header--open': open,
    }"
  >
    <div class="wrap site-header__bar">
      <RouterLink class="site-header__brand" to="/" @click="closeMenu">
        <span class="site-header__mark" aria-hidden="true"></span>
        <span class="site-header__brand-copy">
          <span class="site-header__brand-title">Мікс світів</span>
        </span>
      </RouterLink>

      <button
        type="button"
        class="site-header__menu-btn"
        :aria-expanded="open"
        aria-controls="site-nav"
        @click="toggleMenu"
      >
        {{ open ? 'Закрити' : 'Меню' }}
      </button>

      <nav
        id="site-nav"
        class="site-header__nav"
        :class="{ 'site-header__nav--open': open }"
      >
        <RouterLink
          v-for="item in navItems"
          :key="item.id"
          class="site-header__link"
          :to="item.to"
          :aria-current="isCurrent(item) ? 'page' : undefined"
          @click="closeMenu"
        >
          {{ item.label }}
        </RouterLink>
      </nav>
    </div>

    <button
      v-if="open"
      type="button"
      class="site-header__scrim"
      aria-label="Закрити меню"
      @click="closeMenu"
    ></button>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 40;
  min-height: var(--header-h);
  background: rgba(238, 243, 246, 0.92);
  color: var(--ink);
  border-bottom: 1px solid var(--line);
  backdrop-filter: blur(12px);
  transition:
    background 0.3s var(--ease),
    color 0.3s var(--ease),
    box-shadow 0.3s var(--ease),
    border-color 0.3s var(--ease);
}

.site-header--compact,
.site-header--open {
  box-shadow: 0 10px 24px rgba(16, 24, 32, 0.08);
}

.site-header--dark {
  background: rgba(16, 24, 32, 0.94);
  color: var(--cream);
  border-bottom-color: var(--line-light);
  --mark-line: var(--ion);
}

.site-header__bar {
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: var(--header-h);
  gap: 1rem;
}

.site-header__brand {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  color: inherit;
  text-decoration: none;
  transition: opacity 0.2s var(--ease);
}

.site-header__brand:hover {
  opacity: 0.78;
}

.site-header__mark {
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 0.25rem;
  background: linear-gradient(120deg, var(--copper) 0 50%, var(--void) 50% 100%);
}

.site-header__brand-copy {
  display: flex;
  flex-direction: column;
  line-height: 1.05;
}

.site-header__brand-title {
  font-family: var(--display);
  font-size: 0.98rem;
  font-weight: 700;
  letter-spacing: -0.03em;
}

.site-header__brand-year {
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  opacity: 0.7;
}

.site-header__menu-btn {
  display: none;
  align-items: center;
  justify-content: center;
  min-height: 2.4rem;
  padding: 0.35rem 0.85rem;
  border: 1.5px solid currentColor;
  border-radius: var(--radius);
  background: transparent;
  color: inherit;
  cursor: pointer;
  transition:
    background 0.2s var(--ease),
    color 0.2s var(--ease);
}

.site-header__nav {
  display: flex;
  align-items: center;
  gap: 1.15rem;
}

.site-header__link {
  position: relative;
  color: inherit;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.96rem;
  transition: opacity 0.2s var(--ease);
}

.site-header__link:hover {
  opacity: 0.82;
}

.site-header__link::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -0.28rem;
  width: 100%;
  height: 2px;
  background: var(--mark-line, var(--copper));
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.2s var(--ease);
}

.site-header__link:hover::after,
.site-header__link[aria-current='page']::after {
  transform: scaleX(1);
}

.site-header__scrim {
  display: none;
}

@media (max-width: 860px) {
  .site-header__menu-btn {
    display: inline-flex;
  }

  .site-header__menu-btn:active {
    background: var(--ink);
    color: var(--cream);
  }

  .site-header--dark .site-header__menu-btn:active {
    background: var(--cream);
    color: var(--void);
  }

  .site-header__nav {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    z-index: 3;
    flex-direction: column;
    align-items: stretch;
    gap: 0.15rem;
    margin: 0;
    padding: 0.55rem 1.25rem 0.85rem;
    background: rgba(238, 243, 246, 0.98);
    border-bottom: 1px solid var(--line);
    box-shadow: 0 14px 24px rgba(16, 24, 32, 0.1);
  }

  .site-header--dark .site-header__nav {
    background: rgba(16, 24, 32, 0.98);
    border-bottom-color: var(--line-light);
    box-shadow: 0 14px 24px rgba(0, 0, 0, 0.35);
  }

  .site-header__nav--open {
    display: flex;
  }

  .site-header__link {
    display: block;
    padding: 0.85rem 0;
    font-size: 1.05rem;
  }

  .site-header__link::after {
    display: none;
  }

  .site-header__link[aria-current='page'] {
    color: var(--copper-deep);
  }

  .site-header--dark .site-header__link[aria-current='page'] {
    color: var(--ion);
  }

  .site-header__scrim {
    display: block;
    position: fixed;
    inset: var(--header-h) 0 0;
    z-index: 1;
    border: 0;
    margin: 0;
    padding: 0;
    background: rgba(16, 24, 32, 0.32);
    cursor: pointer;
  }
}
</style>
