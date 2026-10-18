/*
 * Testing concept (MYSL-2, component level):
 * The hero shows the `standby` screenshot in front and the new `mode-editor` screenshot
 * behind it (replacing `widget-previews`); id and alt text come from the content data.
 */
import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import HeroSection from '@/components/HeroSection.vue'
import { screenshots } from '@/data/content'

const altOf = (id: string) => screenshots.find((shot) => shot.id === id)?.alt

describe('HeroSection', () => {
  const wrapper = mount(HeroSection)
  const front = wrapper.get('.hero__phone--front img')
  const back = wrapper.get('.hero__phone--back img')

  it('shows the standby screenshot in front', () => {
    expect(front.attributes('src')).toBe('/screenshots/standby-480.webp')
  })

  it('shows the mode editor screenshot behind it', () => {
    expect(back.attributes('src')).toBe('/screenshots/mode-editor-480.webp')
  })

  it('uses the standby alt text for the front phone', () => {
    expect(front.attributes('alt')).toBe(altOf('standby'))
  })

  it('uses the mode editor alt text for the back phone', () => {
    expect(back.attributes('alt')).toBe(altOf('mode-editor'))
  })

  it('loads both hero screenshots eagerly', () => {
    expect([front.attributes('loading'), back.attributes('loading')]).toEqual(['eager', 'eager'])
  })

  it('mentions standby modes for day and night in the lead', () => {
    expect(wrapper.get('.hero__lead').text()).toContain('standby modes for day and night')
  })

  it('keeps the price-free hero facts', () => {
    expect(wrapper.findAll('.hero__facts li').map((fact) => fact.text())).toEqual([
      'Free download',
      'No ads',
      'Android 10+',
    ])
  })
})
