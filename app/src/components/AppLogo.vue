<script setup lang="ts">
withDefaults(defineProps<{ size?: number }>(), { size: 36 })

const iconUrl = `${import.meta.env.BASE_URL}favicon.svg`
</script>

<template>
  <span class="app-logo">
    <img :src="iconUrl" :width="size" :height="size" alt="" />
    <span class="app-logo__name">my<strong>Standby</strong></span>
  </span>
</template>

<style scoped>
.app-logo {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.app-logo img {
  border-radius: 28%;
  box-shadow: 0 4px 18px rgba(63, 81, 181, 0.45);
}

.app-logo__name {
  font-size: 1.25rem;
  font-weight: 500;
  letter-spacing: -0.01em;
}

.app-logo__name strong {
  font-weight: 700;
}
</style>
