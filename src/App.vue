<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import SiteFooter from './components/SiteFooter.vue'
import SiteHeader from './components/SiteHeader.vue'

const route = useRoute()
let observer: IntersectionObserver | undefined

function bindReveal() {
  observer?.disconnect()
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.classList.add('is-visible')
        observer?.unobserve(entry.target)
      }
    },
    { rootMargin: '0px 0px 20% 0px', threshold: 0 },
  )

  document.querySelectorAll('[data-reveal]').forEach((node) => {
    if (!(node instanceof HTMLElement)) return
    const box = node.getBoundingClientRect()
    const inView = box.top < window.innerHeight * 0.96 && box.bottom > 0
    if (inView) {
      node.classList.add('is-visible')
      return
    }
    observer?.observe(node)
  })
}

function focusMain() {
  document.getElementById('content')?.focus()
}

onMounted(() => {
  bindReveal()
})

watch(
  () => route.fullPath,
  async () => {
    await nextTick()
    bindReveal()
  },
)

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<template>
  <button type="button" class="skip" @click="focusMain">До вмісту</button>
  <SiteHeader />
  <main id="content" tabindex="-1">
    <RouterView v-slot="{ Component }">
      <Transition name="page" mode="out-in" @after-enter="bindReveal">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </main>
  <SiteFooter />
</template>
