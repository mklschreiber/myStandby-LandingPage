<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    screenshot: string
    alt: string
    eager?: boolean
    sizes?: string
  }>(),
  { eager: false, sizes: '(max-width: 768px) 60vw, 320px' },
)

const base = import.meta.env.BASE_URL
const src = computed(() => `${base}screenshots/${props.screenshot}-480.webp`)
const srcset = computed(
  () =>
    `${base}screenshots/${props.screenshot}-480.webp 480w, ${base}screenshots/${props.screenshot}-960.webp 960w`,
)
</script>

<template>
  <figure class="pixel">
    <span class="pixel__button pixel__button--power" aria-hidden="true" />
    <span class="pixel__button pixel__button--volume" aria-hidden="true" />
    <div class="pixel__body">
      <div class="pixel__screen">
        <img
          class="pixel__image"
          :src="src"
          :srcset="srcset"
          :sizes="sizes"
          :alt="alt"
          width="1280"
          height="2856"
          :loading="eager ? 'eager' : 'lazy'"
          decoding="async"
        />
        <span class="pixel__camera" aria-hidden="true" />
      </div>
    </div>
  </figure>
</template>

<style scoped>
/* Proportions modelled on the Pixel 11 Pro: flat rails, uniform slim bezels, centred punch-hole. */
.pixel {
  position: relative;
  container-type: inline-size;
  width: 100%;
  margin: 0;
}

.pixel__body {
  position: relative;
  padding: 3.4cqw;
  border-radius: 14cqw;
  background:
    linear-gradient(145deg, #3a3d47 0%, #1b1d24 35%, #121318 65%, #2b2e37 100%);
  box-shadow:
    inset 0 0 0 0.6cqw #4a4e5a,
    inset 0 0 0 1.1cqw #15161b,
    0 40px 80px -20px rgba(0, 0, 0, 0.75),
    0 18px 36px -18px rgba(0, 0, 0, 0.6);
}

.pixel__screen {
  position: relative;
  overflow: hidden;
  aspect-ratio: 1280 / 2856;
  border-radius: 10.8cqw;
  background: #000;
}

.pixel__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.pixel__camera {
  position: absolute;
  top: 2.3cqw;
  left: 50%;
  width: 3.6cqw;
  height: 3.6cqw;
  border-radius: 50%;
  transform: translateX(-50%);
  background: radial-gradient(circle at 35% 35%, #2a3350 0%, #07080c 55%, #000 100%);
  box-shadow: 0 0 0 0.35cqw #0c0d11;
}

.pixel__button {
  position: absolute;
  right: -0.9cqw;
  width: 1.4cqw;
  border-radius: 0 0.8cqw 0.8cqw 0;
  background: linear-gradient(90deg, #1e2027, #4a4e5a);
}

.pixel__button--power {
  top: 21%;
  height: 9%;
}

.pixel__button--volume {
  top: 33%;
  height: 15%;
}
</style>
