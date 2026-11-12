<script setup lang="ts">
import PrinciplesSection from '../components/PrinciplesSection.vue'
</script>

<template>
  <div class="manifest">
    <section class="section manifest__intro">
      <div class="wrap" data-reveal>
        <h1 class="manifest__title">Маніфест змішування</h1>
        <p class="lead prose">
          Збери кадр з двох світів, які зазвичай не зустрічаються. Можна змішати епоху з
          матеріалом або культуру з вигадкою. Шов між ними має бути видно.
        </p>
        <p class="prose manifest__next">
          Один точний збіг важить більше за купу ефектів без характеру.
        </p>
      </div>
    </section>
    <PrinciplesSection />
  </div>
</template>

<style scoped>
.manifest__intro {
  padding-bottom: 1.5rem;
}

.manifest__title {
  font-size: clamp(2.6rem, 6vw, 4.8rem);
  max-width: 12ch;
}

.manifest__next {
  margin-top: 1rem;
}
</style>
