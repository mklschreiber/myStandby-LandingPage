<script setup lang="ts">
import type { IconName } from '@/types/content'

defineProps<{ name: IconName }>()

const paths: Record<IconName, string[]> = {
  widgets: ['M4 4h6v6H4z', 'M14 4h6v6h-6z', 'M4 14h6v6H4z', 'M17 14v6', 'M14 17h6'],
  stack: ['M12 3 3 8l9 5 9-5-9-5Z', 'm3 13 9 5 9-5', 'm3 17.5 9 5 9-5'],
  layout: ['M4 4h16v16H4z', 'M4 9.33h16', 'M4 14.67h16'],
  standby: ['M5 7h14a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z', 'M8 10.5v2l1.5 1', 'M14 10h4', 'M14 12h4', 'M14 14h4'],
  play: ['M7 4.5v15L19 12 7 4.5Z'],
  moon: ['M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z'],
  brightness: ['M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z', 'M12 2v2', 'M12 20v2', 'm4.93 4.93 1.41 1.41', 'm17.66 17.66 1.41 1.41', 'M2 12h2', 'M20 12h2', 'm6.34 17.66-1.41 1.41', 'm19.07 4.93-1.41 1.41'],
  history: ['M3 12a9 9 0 1 0 3-6.7L3 8', 'M3 3v5h5', 'M12 7v5l3 2'],
  search: ['M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z', 'm20 20-4-4'],
  edit: ['M4 20h4L19 9l-4-4L4 16v4Z', 'm13.5 6.5 4 4'],
  clock: ['M4 5h7v14H4z', 'M13 5h7v14h-7z', 'M4 12h16'],
  feedback: ['M4 5h16v11H8l-4 4V5Z', 'M8 9h8', 'M8 12h5'],
  modes: ['M7 3h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z', 'M9 21h8a4 4 0 0 0 4-4V9', 'M9 7h6', 'M9 11h6'],
  trigger: ['M12 21a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z', 'M12 9v4l2.5 1.5', 'M5 3 2 6', 'm22 6-3-3'],
  contrast: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M12 3v18', 'M12 7.5h7', 'M12 12h9', 'M12 16.5h7'],
  photo: ['M4 5h16v14H4z', 'm4 16 5-5 4 4 2-2 5 5', 'M15 10a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0Z'],
  touch: ['M9 11V5a2 2 0 0 1 4 0v6', 'M13 10a2 2 0 0 1 4 0v1', 'M17 11a2 2 0 0 1 4 0v3a7 7 0 0 1-7 7h-1a7 7 0 0 1-5.6-2.8L4 14.5a2 2 0 0 1 3.2-2.4L9 14'],
}
</script>

<template>
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path v-for="d in paths[name]" :key="d" :d="d" />
  </svg>
</template>
