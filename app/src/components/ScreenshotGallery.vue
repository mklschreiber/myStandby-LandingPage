<script setup lang="ts">
import { screenshots } from '@/data/content'
import PixelPhone from './PixelPhone.vue'
</script>

<template>
  <section id="screenshots" class="section gallery">
    <div class="container">
      <div class="section-heading">
        <span class="eyebrow">Screenshots</span>
        <h2>See myStandby in action</h2>
        <p>Shown on a Google Pixel 11 Pro.</p>
      </div>
    </div>
    <div class="gallery__track" tabindex="0" aria-label="App screenshots">
      <figure v-for="shot in screenshots" :key="shot.id" class="gallery__item">
        <PixelPhone :screenshot="shot.id" :alt="shot.alt" sizes="(max-width: 768px) 62vw, 220px" />
        <figcaption>
          <strong>{{ shot.title }}</strong>
          <span>{{ shot.description }}</span>
        </figcaption>
      </figure>
    </div>
  </section>
</template>

<style scoped>
.gallery {
  background:
    radial-gradient(ellipse 60% 45% at 50% 50%, rgba(63, 81, 181, 0.2), transparent 100%),
    var(--color-bg);
}

.gallery__track {
  display: flex;
  gap: clamp(20px, 3vw, 32px);
  max-width: var(--container);
  margin-inline: auto;
  padding: 8px var(--gutter) 24px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-padding-inline: var(--gutter);
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
}

.gallery__item {
  flex: 0 0 min(62vw, 240px);
  margin: 0;
  scroll-snap-align: start;
}

.gallery__item figcaption {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 24px;
  text-align: center;
}

.gallery__item strong {
  font-size: 1.0625rem;
}

.gallery__item span {
  color: var(--color-text-muted);
  font-size: 0.9375rem;
  line-height: 1.5;
}

@media (min-width: 1100px) {
  .gallery__track {
    justify-content: space-between;
    overflow-x: visible;
  }

  .gallery__item {
    flex-basis: 192px;
  }
}
</style>
