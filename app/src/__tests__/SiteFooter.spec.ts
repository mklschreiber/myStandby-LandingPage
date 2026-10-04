import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import SiteFooter from '@/components/SiteFooter.vue'

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
})
