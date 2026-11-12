<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  src: string
  alt: string
}>()

const failed = ref(false)
</script>

<template>
  <figure class="placeholder">
    <div class="placeholder__media">
      <img
        v-if="!failed"
        class="placeholder__image"
        :src="src"
        :alt="alt"
        width="800"
        height="600"
        @error="failed = true"
      />
    </div>
  </figure>
</template>

<style scoped>
.placeholder {
  position: relative;
  margin: 0;
  overflow: hidden;
  background: var(--parchment-deep);
}

.placeholder__media {
  aspect-ratio: 4 / 3;
  overflow: hidden;
}

.placeholder__image,
.placeholder__miss {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.28s var(--ease);
}

.placeholder__miss {
  display: grid;
  place-items: center;
  background:
    linear-gradient(145deg, var(--moss), var(--void)),
    var(--void);
  color: var(--cream);
  font-weight: 700;
}

.placeholder__caption {
  position: absolute;
  left: 0.75rem;
  bottom: 0.75rem;
  padding: 0.28rem 0.55rem;
  border-radius: var(--radius);
  background: rgba(16, 24, 32, 0.72);
  color: var(--cream);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.04em;
}

:global(.world-card:hover) .placeholder__image,
:global(.theme__story:hover) .placeholder__image {
  transform: scale(1.06);
}
</style>
