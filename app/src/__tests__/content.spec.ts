/*
 * Testing concept (MYSL-2, data level):
 * `src/data/content.ts` holds all copy of the page, so the MYSL-2 update is locked in here:
 * the 17 feature ids and PRO flags, the five new screenshot ids, the WebP files in
 * `public/screenshots/` (both sizes present, no orphaned old files), the three PRO price
 * plans with the price note, and the FAQ answer that repeats the prices instead of the old
 * "no subscription" claim. Rendering is covered in the component specs.
 */
import { existsSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import {
  faq,
  features,
  planRows,
  PLAY_STORE_URL,
  PRICE_NOTE,
  pricePlans,
  PRIVACY_LAST_UPDATED,
  screenshots,
  steps,
} from '@/data/content'

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
      'standby-modes',
      'automatic-triggers',
      'flexible-layout',
      'night-mode',
      'flip-clock',
      'picture-frame',
      'native-standby',
      'simulate',
      'alpha-channel',
      'transparency',
      'interactive-widgets',
      'remember-state',
      'widget-browser',
      'manage-widgets',
      'feedback',
    ])
  })

  it('marks only the PRO-gated features as PRO', () => {
    expect(features.filter((feature) => feature.pro).map((feature) => feature.id)).toEqual([
      'standby-modes',
      'automatic-triggers',
      'flexible-layout',
      'night-mode',
      'flip-clock',
      'picture-frame',
    ])
  })

  it.each(screenshots.flatMap((shot) => [`${shot.id}-480`, `${shot.id}-960`]))(
    'ships the screenshot file %s.webp',
    (file) => {
      expect(existsSync(resolve(publicDir, 'screenshots', `${file}.webp`))).toBe(true)
    },
  )

  it('lists the five current app screenshots in order', () => {
    expect(screenshots.map((shot) => shot.id)).toEqual([
      'standby',
      'modes',
      'mode-editor',
      'choose-widget',
      'feedback',
    ])
  })

  it('ships no screenshot files beyond the 480 and 960 px versions of the gallery', () => {
    expect(readdirSync(resolve(publicDir, 'screenshots')).sort()).toEqual(
      screenshots.flatMap((shot) => [`${shot.id}-480.webp`, `${shot.id}-960.webp`]).sort(),
    )
  })

  it('describes every screenshot with alt text', () => {
    expect(screenshots.every((shot) => shot.alt.length > 20)).toBe(true)
  })

  it('provides steps, plan rows and FAQ entries', () => {
    expect([steps.length, planRows.length, faq.length].every((count) => count > 0)).toBe(true)
  })
})

describe('pricePlans', () => {
  it('offers the monthly, yearly and lifetime plans in this order', () => {
    expect(pricePlans.map((plan) => plan.id)).toEqual(['monthly', 'yearly', 'lifetime'])
  })

  it('shows the German Google Play prices in English format', () => {
    expect(pricePlans.map((plan) => plan.price)).toEqual(['€0.99', '€7.99', '€19.99'])
  })

  it('names the billing period of every plan', () => {
    expect(pricePlans.map((plan) => plan.period)).toEqual(['per month', 'per year', 'one-time'])
  })

  it.each(['monthly', 'yearly'])('mentions the 7-day free trial for the %s plan', (id) => {
    expect(pricePlans.find((plan) => plan.id === id)?.note).toContain('7-day free trial')
  })

  it('tells that the lifetime plan is no subscription', () => {
    expect(pricePlans.find((plan) => plan.id === 'lifetime')?.note).toBe('No subscription')
  })

  it('states that prices are German prices incl. VAT', () => {
    expect(PRICE_NOTE).toBe(
      'Prices in Germany incl. VAT. Google Play shows the price for your country.',
    )
  })
})

describe('faq', () => {
  const pricingAnswer = faq.find((entry) => entry.question === 'Is myStandby free?')?.answer

  it.each(['€0.99 per month', '€7.99 per year', '7-day free trial', '€19.99 once'])(
    'repeats "%s" in the pricing answer',
    (fragment) => {
      expect(pricingAnswer).toContain(fragment)
    },
  )

  it('no longer claims that there is no subscription', () => {
    expect(faq.map((entry) => entry.answer).join(' ')).not.toMatch(/no subscription/i)
  })

  it('explains what happens when a PRO subscription ends', () => {
    expect(faq.map((entry) => entry.question)).toContain(
      'What happens if my PRO subscription ends?',
    )
  })
})

describe('privacy policy date', () => {
  it('is updated for the subscription change', () => {
    expect(PRIVACY_LAST_UPDATED).toBe('19 October 2026')
  })
})
