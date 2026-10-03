<script setup lang="ts">
import PixelPhone from './PixelPhone.vue'
import PlayStoreButton from './PlayStoreButton.vue'
import { screenshots } from '@/data/content'

const standby = screenshots.find((shot) => shot.id === 'standby')!
const previews = screenshots.find((shot) => shot.id === 'widget-previews')!
</script>

<template>
  <section id="top" class="hero">
    <div class="hero__glow" aria-hidden="true" />
    <div class="container hero__inner">
      <div class="hero__copy">
        <span class="eyebrow">Standby mode for Android</span>
        <h1>
          Unlock the true power of <span class="gradient-text">Android standby</span>
        </h1>
        <p class="hero__lead">
          myStandby turns your phone into a smart display while it charges. Put any widget you love
          on the native standby screen and design a nightstand that is uniquely yours.
        </p>
        <div class="hero__actions">
          <PlayStoreButton size="lg" />
          <a class="hero__secondary" href="#features">Explore features →</a>
        </div>
        <ul class="hero__facts">
          <li>Free download</li>
          <li>No ads</li>
          <li>Android 10+</li>
        </ul>
      </div>
      <div class="hero__devices">
        <div class="hero__phone hero__phone--back">
          <PixelPhone
            :screenshot="previews.id"
            :alt="previews.alt"
            eager
            sizes="(max-width: 860px) 45vw, 260px"
          />
        </div>
        <div class="hero__phone hero__phone--front">
          <PixelPhone
            :screenshot="standby.id"
            :alt="standby.alt"
            eager
            sizes="(max-width: 860px) 55vw, 320px"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  overflow: hidden;
  padding-block: clamp(48px, 8vw, 104px) clamp(64px, 9vw, 120px);
}

.hero__glow {
  position: absolute;
  inset: -20% -10% auto auto;
  width: min(900px, 120vw);
  aspect-ratio: 1;
  background:
    radial-gradient(circle at 60% 40%, rgba(148, 185, 255, 0.28), transparent 55%),
    radial-gradient(circle at 30% 70%, rgba(63, 81, 181, 0.35), transparent 60%);
  filter: blur(20px);
  pointer-events: none;
}

.hero__inner {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr);
  align-items: center;
  gap: clamp(40px, 6vw, 80px);
}

.hero h1 {
  font-size: clamp(2.5rem, 6vw, 4.25rem);
  font-weight: 800;
  letter-spacing: -0.035em;
}

.hero__lead {
  max-width: 560px;
  margin-top: 24px;
  color: var(--color-text-muted);
  font-size: clamp(1.0625rem, 1.6vw, 1.25rem);
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px 28px;
  margin-top: 36px;
}

.hero__secondary {
  color: var(--color-text);
  font-weight: 600;
  text-decoration: none;
  opacity: 0.85;
  transition: opacity 0.2s ease;
}

.hero__secondary:hover {
  opacity: 1;
}

.hero__facts {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 24px;
  margin: 32px 0 0;
  padding: 0;
  color: var(--color-text-subtle);
  font-size: 0.9375rem;
  list-style: none;
}

.hero__facts li::before {
  content: '✓';
  margin-right: 8px;
  color: var(--color-brand-light);
  font-weight: 700;
}

.hero__devices {
  position: relative;
  display: flex;
  justify-content: center;
  min-height: 0;
  padding-right: 12%;
}

.hero__phone--front {
  position: relative;
  z-index: 1;
  width: min(320px, 58%);
  animation: float 7s ease-in-out infinite;
}

.hero__phone--back {
  position: absolute;
  top: 9%;
  right: 0;
  width: min(260px, 46%);
  opacity: 0.7;
  transform: rotate(6deg);
  filter: saturate(0.9);
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-14px);
  }
}

@media (max-width: 860px) {
  .hero__inner {
    grid-template-columns: minmax(0, 1fr);
    text-align: center;
  }

  .hero__lead {
    margin-inline: auto;
  }

  .hero__actions,
  .hero__facts {
    justify-content: center;
  }

  .hero__devices {
    width: 100%;
    max-width: 440px;
    margin-inline: auto;
  }
}
</style>
