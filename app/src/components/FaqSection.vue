<script setup lang="ts">
import { faq } from '@/data/content'
</script>

<template>
  <section id="faq" class="section faq">
    <div class="container faq__inner">
      <div class="section-heading">
        <span class="eyebrow">FAQ</span>
        <h2>Questions &amp; answers</h2>
      </div>
      <div class="faq__list">
        <details v-for="entry in faq" :key="entry.question" class="faq__item">
          <summary>{{ entry.question }}</summary>
          <p>{{ entry.answer }}</p>
        </details>
      </div>
    </div>
  </section>
</template>

<style scoped>
.faq__inner {
  max-width: 820px;
}

.faq__list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.faq__item {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  transition: background 0.2s ease;
}

.faq__item[open] {
  background: var(--color-surface-hover);
}

.faq__item summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 20px 24px;
  font-size: 1.0625rem;
  font-weight: 600;
  cursor: pointer;
  list-style: none;
}

.faq__item summary::-webkit-details-marker {
  display: none;
}

.faq__item summary::after {
  content: '+';
  flex-shrink: 0;
  color: var(--color-brand-light);
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 1;
  transition: transform 0.2s ease;
}

.faq__item[open] summary::after {
  transform: rotate(45deg);
}

.faq__item p {
  padding: 0 24px 22px;
  color: var(--color-text-muted);
}
</style>
