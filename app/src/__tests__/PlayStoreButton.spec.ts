import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import PlayStoreButton from '@/components/PlayStoreButton.vue'
import { PLAY_STORE_URL } from '@/data/content'

describe('PlayStoreButton', () => {
  it('links to Google Play', () => {
    expect(mount(PlayStoreButton).get('a').attributes('href')).toBe(PLAY_STORE_URL)
  })

  it('opens in a new tab safely', () => {
    const link = mount(PlayStoreButton).get('a')

    expect([link.attributes('target'), link.attributes('rel')]).toEqual([
      '_blank',
      'noopener noreferrer',
    ])
  })

  it('renders the large variant', () => {
    expect(mount(PlayStoreButton, { props: { size: 'lg' } }).classes()).toContain(
      'play-button--lg',
    )
  })
})
