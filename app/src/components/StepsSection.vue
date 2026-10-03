<script setup lang="ts">
import { steps } from '@/data/content'
</script>

<template>
  <section id="how-it-works" class="section steps">
    <div class="container">
      <div class="section-heading">
        <span class="eyebrow">How it works</span>
        <h2>Set up in under a minute</h2>
      </div>
      <ol class="steps__list">
        <li v-for="(step, index) in steps" :key="step.title" class="step">
          <span class="step__number" aria-hidden="true">{{ index + 1 }}</span>
          <h3>{{ step.title }}</h3>
          <p>{{ step.description }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.steps__list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 230px), 1fr));
  gap: 20px;
  margin: 0;
  padding: 0;
  list-style: none;
  counter-reset: step;
}

.step {
  padding: 28px;
  border-top: 2px solid rgba(148, 185, 255, 0.35);
}

.step__number {
  display: inline-grid;
  place-items: center;
  width: 40px;
  height: 40px;
  margin-bottom: 18px;
  border-radius: 50%;
  background: rgba(148, 185, 255, 0.12);
  color: var(--color-brand-light);
  font-weight: 800;
}

.step h3 {
  font-size: 1.1875rem;
}

.step p {
  margin-top: 8px;
  color: var(--color-text-muted);
  font-size: 0.9875rem;
}
</style>
