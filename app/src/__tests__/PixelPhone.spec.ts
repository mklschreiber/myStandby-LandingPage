import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import PixelPhone from '@/components/PixelPhone.vue'

const mountPhone = (eager = false) =>
  mount(PixelPhone, { props: { screenshot: 'home', alt: 'Home screen', eager } })

describe('PixelPhone', () => {
  it('renders the screenshot with responsive sources', () => {
    const img = mountPhone().get('img')

    expect(img.attributes('srcset')).toBe(
      '/screenshots/home-480.webp 480w, /screenshots/home-960.webp 960w',
    )
  })

  it('uses the given alt text', () => {
    expect(mountPhone().get('img').attributes('alt')).toBe('Home screen')
  })

  it('lazy-loads by default', () => {
    expect(mountPhone().get('img').attributes('loading')).toBe('lazy')
  })

  it('loads eagerly when requested', () => {
    expect(mountPhone(true).get('img').attributes('loading')).toBe('eager')
  })

  it('renders the punch-hole camera and side buttons', () => {
    const wrapper = mountPhone()

    expect([
      wrapper.findAll('.pixel__camera').length,
      wrapper.findAll('.pixel__button').length,
    ]).toEqual([1, 2])
  })
})
