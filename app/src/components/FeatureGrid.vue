<script setup lang="ts">
import { features } from '@/data/content'
import FeatureIcon from './icons/FeatureIcon.vue'
</script>

<template>
  <section id="features" class="section features">
    <div class="container">
      <div class="section-heading">
        <span class="eyebrow">Features</span>
        <h2>Everything your standby screen was missing</h2>
        <p>
          myStandby removes the limits of the default Android standby mode and gives you full
          control over what you see while your phone charges.
        </p>
      </div>
      <ul class="features__grid">
        <li v-for="feature in features" :key="feature.id" class="feature-card">
          <span class="feature-card__icon">
            <FeatureIcon :name="feature.icon" />
          </span>
          <h3>
            {{ feature.title }}
            <span v-if="feature.pro" class="feature-card__pro">PRO</span>
          </h3>
          <p>{{ feature.description }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.features__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr));
  gap: 20px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.feature-card {
  position: relative;
  padding: 28px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  transition:
    transform 0.25s ease,
    background 0.25s ease,
    border-color 0.25s ease;
}

.feature-card:hover {
  transform: translateY(-4px);
  border-color: rgba(148, 185, 255, 0.3);
  background: var(--color-surface-hover);
}

.feature-card__icon {
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  margin-bottom: 20px;
  border-radius: 14px;
  background: var(--gradient-brand);
  box-shadow: 0 8px 24px rgba(63, 81, 181, 0.4);
  color: #fff;
}

.feature-card__icon svg {
  width: 24px;
  height: 24px;
}

.feature-card h3 {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  font-size: 1.1875rem;
  font-weight: 700;
}

.feature-card p {
  margin-top: 10px;
  color: var(--color-text-muted);
  font-size: 0.9875rem;
}

.feature-card__pro {
  padding: 2px 8px;
  border-radius: var(--radius-pill);
  background: rgba(198, 182, 255, 0.16);
  color: var(--color-accent);
  font-size: 0.6875rem;
  font-weight: 800;
  letter-spacing: 0.08em;
}
</style>
