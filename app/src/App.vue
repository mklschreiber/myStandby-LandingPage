<script setup lang="ts">
import SiteHeader from './components/SiteHeader.vue'
import HeroSection from './components/HeroSection.vue'
import FeatureGrid from './components/FeatureGrid.vue'
import ScreenshotGallery from './components/ScreenshotGallery.vue'
import StepsSection from './components/StepsSection.vue'
import ProSection from './components/ProSection.vue'
import FaqSection from './components/FaqSection.vue'
import CtaSection from './components/CtaSection.vue'
import SiteFooter from './components/SiteFooter.vue'
</script>

<template>
  <SiteHeader />
  <main>
    <HeroSection />
    <FeatureGrid />
    <ScreenshotGallery />
    <StepsSection />
    <ProSection />
    <FaqSection />
    <CtaSection />
  </main>
  <SiteFooter />
</template>
