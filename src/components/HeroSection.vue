<template>
  <section id="hero" class="hero">
    <div class="hero__bg" aria-hidden="true">
      <span class="hero__float hero__float--a"></span>
      <span class="hero__float hero__float--b"></span>
    </div>

    <div class="wrap hero__copy">
      <h1 class="hero__title">Мікс світів</h1>
      <p class="hero__subtitle">Поєднай непоєднуване</p>
      <p class="hero__intro">
        Візьми дві речі, які в житті не стоять поруч, наприклад гілку і світлофор або дзвінок і
        два сонця. Збери з них один кадр.
      </p>
      <div class="hero__actions">
        <RouterLink class="btn" to="/svity">Дивитися світи</RouterLink>
        <RouterLink class="btn btn--ghost" to="/verstat">Відкрити верстат</RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  padding: 3.2rem 0 1.5rem;
}

.hero__bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.hero__float {
  position: absolute;
  border-radius: 50%;
  animation: drift 6s var(--ease) infinite;
}

.hero__float--a {
  width: 18rem;
  height: 18rem;
  top: -4rem;
  right: -3rem;
  background: radial-gradient(circle, rgba(13, 148, 136, 0.22), transparent 68%);
}

.hero__float--b {
  width: 14rem;
  height: 14rem;
  bottom: 0;
  left: -4rem;
  background: radial-gradient(circle, rgba(30, 95, 116, 0.2), transparent 68%);
  animation-delay: -2s;
}

.hero__copy > * {
  animation: land 0.32s var(--ease) both;
}

.hero__copy > *:nth-child(2) {
  animation-delay: 0.03s;
}

.hero__copy > *:nth-child(3) {
  animation-delay: 0.06s;
}

.hero__copy > *:nth-child(4) {
  animation-delay: 0.09s;
}

.hero__copy > *:nth-child(5) {
  animation-delay: 0.12s;
}

.hero__title {
  font-size: clamp(3rem, 8vw, 6.2rem);
}

.hero__subtitle {
  margin-top: 0.4rem;
  font-family: var(--display);
  font-size: clamp(1.25rem, 2.4vw, 1.85rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--moss);
}

.hero__intro {
  max-width: 38rem;
  margin-top: 1rem;
  font-size: 1.125rem;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

@media (prefers-reduced-motion: reduce) {
  .hero__copy > * {
    animation: none;
    opacity: 1;
    transform: none;
  }
}
</style>
