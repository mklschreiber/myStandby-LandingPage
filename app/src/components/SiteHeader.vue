<script setup lang="ts">
import AppLogo from './AppLogo.vue'
import PlayStoreButton from './PlayStoreButton.vue'
import { HOME_PATH } from '@/data/content'

const links = [
  { href: `${HOME_PATH}#features`, label: 'Features' },
  { href: `${HOME_PATH}#screenshots`, label: 'Screenshots' },
  { href: `${HOME_PATH}#pro`, label: 'PRO' },
  { href: `${HOME_PATH}#faq`, label: 'FAQ' },
]
</script>

<template>
  <header class="site-header">
    <div class="container site-header__inner">
      <a :href="HOME_PATH" class="site-header__home" aria-label="myStandby home">
        <AppLogo :size="34" />
      </a>
      <nav class="site-header__nav" aria-label="Main">
        <a v-for="link in links" :key="link.href" :href="link.href">{{ link.label }}</a>
      </nav>
      <PlayStoreButton class="site-header__cta" />
    </div>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 10;
  border-bottom: 1px solid var(--color-border);
  background: rgba(11, 13, 23, 0.72);
  backdrop-filter: blur(16px) saturate(140%);
  -webkit-backdrop-filter: blur(16px) saturate(140%);
}

.site-header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  min-height: 68px;
}

.site-header__home {
  text-decoration: none;
}

.site-header__nav {
  display: flex;
  gap: 32px;
}

.site-header__nav a {
  color: var(--color-text-muted);
  font-size: 0.9375rem;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s ease;
}

.site-header__nav a:hover {
  color: var(--color-text);
}

@media (max-width: 860px) {
  .site-header__nav {
    display: none;
  }
}

@media (max-width: 420px) {
  .site-header__cta {
    display: none;
  }
}
</style>
