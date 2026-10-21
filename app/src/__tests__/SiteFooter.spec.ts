import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import SiteFooter from '@/components/SiteFooter.vue'

/*
 * Testing concept (MYSL-3 Fix Imprint):
 * The footer imprint link must point to exactly
 * https://www.michaelschreiber.net/#/imprint. The tests mount the real footer
 * (component level, jsdom) and select the link by the literal URL string, not
 * by the imported IMPRINT_URL constant, so a wrong constant fails the tests.
 * They check the label, the new-tab behavior of the external link, and that
 * the old broken /impressum URL is gone.
 */
const IMPRINT_SELECTOR = 'a[href="https://www.michaelschreiber.net/#/imprint"]'

describe('SiteFooter', () => {
  const wrapper = mount(SiteFooter)

  it('links to the own privacy policy page', () => {
    expect(wrapper.find('a[href="/privacy/"]').text()).toBe('Privacy Policy')
  })

  it('opens the privacy policy in the same tab', () => {
    expect(wrapper.get('a[href="/privacy/"]').attributes('target')).toBeUndefined()
  })

  it('no longer links to software-lab.io', () => {
    expect(wrapper.html()).not.toContain('software-lab')
  })

  it('links the label "Imprint" to https://www.michaelschreiber.net/#/imprint', () => {
    expect(wrapper.get(IMPRINT_SELECTOR).text()).toBe('Imprint')
  })

  it('opens the imprint in a new tab', () => {
    expect(wrapper.get(IMPRINT_SELECTOR).attributes('target')).toBe('_blank')
  })

  it('opens the imprint with rel="noopener noreferrer"', () => {
    expect(wrapper.get(IMPRINT_SELECTOR).attributes('rel')).toBe('noopener noreferrer')
  })

  it('no longer links to the broken /impressum page', () => {
    expect(wrapper.html()).not.toContain('impressum')
  })
})
