import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '@/App.vue'
import { faq, features, PLAY_STORE_URL, screenshots } from '@/data/content'

describe('App', () => {
  const wrapper = mount(App)

  it('renders the hero headline', () => {
    expect(wrapper.get('h1').text()).toContain('Unlock the true power of Android standby')
  })

  it('renders a card for every feature', () => {
    expect(wrapper.findAll('.feature-card')).toHaveLength(features.length)
  })

  it('shows every screenshot in the gallery', () => {
    expect(wrapper.findAll('.gallery__item')).toHaveLength(screenshots.length)
  })

  it('renders every FAQ entry', () => {
    expect(wrapper.findAll('.faq__item')).toHaveLength(faq.length)
  })

  it('links to Google Play from header, hero, PRO, CTA and footer', () => {
    expect(wrapper.findAll(`a[href="${PLAY_STORE_URL}"]`)).toHaveLength(5)
  })

  it('provides the in-page navigation targets', () => {
    expect(
      ['#features', '#screenshots', '#pro', '#faq'].every((id) => wrapper.find(id).exists()),
    ).toBe(true)
  })
})
