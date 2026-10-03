<script setup lang="ts">
import AppLogo from './AppLogo.vue'
import PlayStoreButton from './PlayStoreButton.vue'
</script>

<template>
  <section class="section cta">
    <div class="container">
      <div class="cta__card">
        <AppLogo :size="64" class="cta__logo" />
        <h2>Don't let your screen go to waste</h2>
        <p>Download myStandby and create your ultimate smart display today.</p>
        <PlayStoreButton size="lg" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta {
  padding-top: 0;
}

.cta__card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: clamp(40px, 7vw, 80px) clamp(20px, 5vw, 48px);
  border-radius: calc(var(--radius-lg) + 8px);
  background:
    radial-gradient(circle at 20% 0%, rgba(255, 255, 255, 0.22), transparent 45%),
    linear-gradient(135deg, #7d9cf0 0%, #3f51b5 100%);
  box-shadow: var(--shadow-glow);
  text-align: center;
}

.cta__logo :deep(.app-logo__name) {
  font-size: 1.75rem;
}

.cta h2 {
  max-width: 640px;
  font-size: clamp(1.875rem, 4.5vw, 2.875rem);
  font-weight: 800;
}

.cta p {
  max-width: 520px;
  color: rgba(255, 255, 255, 0.88);
  font-size: 1.125rem;
}
</style>
