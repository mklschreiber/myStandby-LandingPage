<script setup lang="ts">
import { PLAY_STORE_URL } from '@/data/content'
import GooglePlayIcon from './icons/GooglePlayIcon.vue'

withDefaults(defineProps<{ size?: 'md' | 'lg' }>(), { size: 'md' })
</script>

<template>
  <a
    class="play-button"
    :class="`play-button--${size}`"
    :href="PLAY_STORE_URL"
    target="_blank"
    rel="noopener noreferrer"
  >
    <GooglePlayIcon class="play-button__icon" />
    <span class="play-button__text">
      <span class="play-button__caption">Get it on</span>
      <span class="play-button__store">Google Play</span>
    </span>
  </a>
</template>

<style scoped>
.play-button {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 18px 8px 14px;
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: var(--radius-sm);
  background: #000;
  color: #fff;
  text-decoration: none;
  line-height: 1.1;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.play-button:hover {
  transform: translateY(-2px);
  border-color: rgba(255, 255, 255, 0.45);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.45);
}

.play-button__icon {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
}

.play-button__text {
  display: flex;
  flex-direction: column;
}

.play-button__caption {
  font-size: 0.6875rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  opacity: 0.85;
}

.play-button__store {
  font-size: 1.125rem;
  font-weight: 600;
}

.play-button--lg {
  padding: 12px 26px 12px 20px;
  gap: 14px;
  border-radius: var(--radius-md);
}

.play-button--lg .play-button__icon {
  width: 32px;
  height: 32px;
}

.play-button--lg .play-button__caption {
  font-size: 0.75rem;
}

.play-button--lg .play-button__store {
  font-size: 1.375rem;
}
</style>
