<script setup lang="ts">
import { DEVELOPER_URL, IMPRINT_URL, PLAY_STORE_URL, PRIVACY_POLICY_URL } from '@/data/content'
import AppLogo from './AppLogo.vue'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer">
    <div class="container site-footer__inner">
      <div class="site-footer__brand">
        <AppLogo :size="28" />
        <p>© {{ year }} Michael Schreiber</p>
      </div>
      <nav class="site-footer__links" aria-label="Footer">
        <a :href="PLAY_STORE_URL" target="_blank" rel="noopener noreferrer">Google Play</a>
        <a :href="PRIVACY_POLICY_URL" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
        <a :href="IMPRINT_URL" target="_blank" rel="noopener noreferrer">Imprint</a>
        <a :href="DEVELOPER_URL" target="_blank" rel="noopener noreferrer">Developer</a>
      </nav>
    </div>
    <p class="container site-footer__legal">
      Google Play and the Google Play logo are trademarks of Google LLC. Pixel is a trademark of
      Google LLC.
    </p>
  </footer>
</template>

<style scoped>
.site-footer {
  padding-block: 40px 32px;
  border-top: 1px solid var(--color-border);
  color: var(--color-text-subtle);
  font-size: 0.9375rem;
}

.site-footer__inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.site-footer__brand {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 20px;
  color: var(--color-text-muted);
}

.site-footer__links {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 28px;
}

.site-footer__links a {
  text-decoration: none;
  transition: color 0.2s ease;
}

.site-footer__links a:hover {
  color: var(--color-text);
}

.site-footer__legal {
  margin-top: 28px;
  font-size: 0.8125rem;
}
</style>
