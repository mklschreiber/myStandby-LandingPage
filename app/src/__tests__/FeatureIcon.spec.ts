/*
 * Testing concept (MYSL-2, component level):
 * MYSL-2 adds five icons (modes, trigger, contrast, photo, touch). `IconName` is a type only,
 * so the full list is repeated here (checked against the type with `satisfies`), and every
 * icon used by a feature card must render at least one SVG path.
 */
import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import FeatureIcon from '@/components/icons/FeatureIcon.vue'
import { features } from '@/data/content'
import type { IconName } from '@/types/content'

const iconNames = [
  'widgets',
  'stack',
  'layout',
  'standby',
  'play',
  'moon',
  'brightness',
  'history',
  'search',
  'edit',
  'clock',
  'feedback',
  'modes',
  'trigger',
  'contrast',
  'photo',
  'touch',
] satisfies IconName[]

const pathsOf = (name: IconName) =>
  mount(FeatureIcon, { props: { name } })
    .findAll('path')
    .map((path) => path.attributes('d'))

describe('FeatureIcon', () => {
  it.each(iconNames)('renders at least one path for the icon %s', (name) => {
    expect(pathsOf(name).length).toBeGreaterThan(0)
  })

  it.each(iconNames)('gives every path of the icon %s a drawing command', (name) => {
    expect(pathsOf(name).every((d) => !!d?.trim())).toBe(true)
  })

  it.each(features.map((feature) => [feature.id, feature.icon] as const))(
    'renders the icon of the feature %s (%s)',
    (_id, icon) => {
      expect(pathsOf(icon).length).toBeGreaterThan(0)
    },
  )

  it('draws a distinct shape for every icon', () => {
    expect(new Set(iconNames.map((name) => pathsOf(name).join('|'))).size).toBe(iconNames.length)
  })

  it('is hidden from assistive technology', () => {
    expect(mount(FeatureIcon, { props: { name: 'modes' } }).attributes('aria-hidden')).toBe(
      'true',
    )
  })
})
