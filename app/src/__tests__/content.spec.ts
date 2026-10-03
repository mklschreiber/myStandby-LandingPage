import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { faq, features, planRows, PLAY_STORE_URL, screenshots, steps } from '@/data/content'

const publicDir = resolve(process.cwd(), 'public')

describe('content', () => {
  it('links to the myStandby Google Play listing', () => {
    expect(PLAY_STORE_URL).toBe(
      'https://play.google.com/store/apps/details?id=io.software_lab.mystandby',
    )
  })

  it('uses unique feature ids', () => {
    expect(new Set(features.map((feature) => feature.id)).size).toBe(features.length)
  })

  it('lists every app feature', () => {
    expect(features.map((feature) => feature.id)).toEqual([
      'any-widget',
      'widget-stacks',
      'flexible-layout',
      'native-standby',
      'simulate',
      'alpha-channel',
      'dimming',
      'remember-state',
      'widget-browser',
      'manage-widgets',
      'flip-clock',
      'feedback',
    ])
  })

  it('marks only the PRO-gated features as PRO', () => {
    expect(features.filter((feature) => feature.pro).map((feature) => feature.id)).toEqual([
      'flexible-layout',
      'flip-clock',
    ])
  })

  it.each(screenshots.flatMap((shot) => [`${shot.id}-480`, `${shot.id}-960`]))(
    'ships the screenshot file %s.webp',
    (file) => {
      expect(existsSync(resolve(publicDir, 'screenshots', `${file}.webp`))).toBe(true)
    },
  )

  it('describes every screenshot with alt text', () => {
    expect(screenshots.every((shot) => shot.alt.length > 20)).toBe(true)
  })

  it('provides steps, plan rows and FAQ entries', () => {
    expect([steps.length, planRows.length, faq.length].every((count) => count > 0)).toBe(true)
  })
})
