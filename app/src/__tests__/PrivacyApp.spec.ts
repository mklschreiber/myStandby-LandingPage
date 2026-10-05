import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import PrivacyApp from '@/PrivacyApp.vue'

describe('PrivacyApp', () => {
  const wrapper = mount(PrivacyApp)

  it('has exactly one h1 (MYSL-1 AC9)', () => {
    expect(wrapper.findAll('h1')).toHaveLength(1)
  })

  it('gives every image an alt attribute (MYSL-1 AC10)', () => {
    expect(wrapper.findAll('img').filter((img) => img.attributes('alt') === undefined)).toEqual(
      [],
    )
  })
})
