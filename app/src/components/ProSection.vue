<script setup lang="ts">
import { planRows } from '@/data/content'
import CheckIcon from './icons/CheckIcon.vue'
import PixelPhone from './PixelPhone.vue'
import PlayStoreButton from './PlayStoreButton.vue'
</script>

<template>
  <section id="pro" class="section pro">
    <div class="container pro__inner">
      <div class="pro__copy">
        <span class="eyebrow">Free &amp; PRO</span>
        <h2>Free to start. <span class="gradient-text">PRO</span> when you want more.</h2>
        <p>
          All core features are free and without ads. A single one-time purchase unlocks PRO — no
          subscription, and it is restored automatically from Google Play when you reinstall.
        </p>
        <table class="plan-table">
          <thead>
            <tr>
              <th scope="col"><span class="visually-hidden">Feature</span></th>
              <th scope="col">Free</th>
              <th scope="col" class="plan-table__pro">PRO</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in planRows" :key="row.label">
              <th scope="row">{{ row.label }}</th>
              <td v-for="(value, index) in [row.free, row.pro]" :key="index">
                <template v-if="typeof value === 'string'">{{ value }}</template>
                <template v-else-if="value">
                  <CheckIcon class="plan-table__check" />
                  <span class="visually-hidden">Included</span>
                </template>
                <template v-else>
                  <span class="plan-table__dash" aria-hidden="true">–</span>
                  <span class="visually-hidden">Not included</span>
                </template>
              </td>
            </tr>
          </tbody>
        </table>
        <PlayStoreButton class="pro__cta" />
      </div>
      <div class="pro__device">
        <PixelPhone screenshot="settings" alt="myStandby settings screen" sizes="(max-width: 860px) 60vw, 300px" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.pro__inner {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr);
  align-items: center;
  gap: clamp(40px, 6vw, 88px);
  padding: clamp(28px, 5vw, 64px);
  border: 1px solid var(--color-border);
  border-radius: calc(var(--radius-lg) + 8px);
  background:
    radial-gradient(circle at 100% 0%, rgba(148, 185, 255, 0.18), transparent 50%),
    var(--color-bg-elevated);
}

.pro h2 {
  font-size: clamp(2rem, 4.2vw, 2.75rem);
}

.pro__copy > p {
  margin-top: 18px;
  color: var(--color-text-muted);
  font-size: 1.0625rem;
}

.plan-table {
  width: 100%;
  margin-top: 32px;
  border-collapse: collapse;
  font-size: 0.9875rem;
}

.plan-table th,
.plan-table td {
  padding: 12px 8px;
  border-bottom: 1px solid var(--color-border);
}

.plan-table thead th {
  color: var(--color-text-muted);
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.plan-table tbody th {
  font-weight: 500;
  text-align: left;
}

.plan-table td {
  width: 72px;
  text-align: center;
  font-weight: 600;
}

.plan-table__pro {
  color: var(--color-accent) !important;
}

.plan-table__check {
  width: 20px;
  height: 20px;
  margin-inline: auto;
  color: var(--color-brand-light);
}

.plan-table__dash {
  color: var(--color-text-subtle);
}

.pro__cta {
  margin-top: 32px;
}

.pro__device {
  width: min(300px, 100%);
  justify-self: center;
}

@media (max-width: 860px) {
  .pro__inner {
    grid-template-columns: minmax(0, 1fr);
  }

  .pro__device {
    width: min(260px, 70%);
    justify-self: center;
  }
}
</style>
