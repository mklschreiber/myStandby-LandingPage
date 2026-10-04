import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import PrivacyPolicy from '@/components/PrivacyPolicy.vue'
import { controller, FEEDBACK_RELAY_HOST } from '@/data/content'

describe('PrivacyPolicy', () => {
  const wrapper = mount(PrivacyPolicy)
  const text = wrapper.text()

  it.each(['Firebase Crashlytics', 'Google Analytics for Firebase', 'Cloudflare', 'Jira', 'Atlassian'])(
    'names the processor %s',
    (processor) => {
      expect(text).toContain(processor)
    },
  )

  it('names the feedback relay host', () => {
    expect(text).toContain(FEEDBACK_RELAY_HOST)
  })

  it('lists the controller with a mailto link', () => {
    expect(wrapper.find(`a[href="mailto:${controller.email}"]`).exists()).toBe(true)
  })

  it('links every table-of-contents entry to an existing section', () => {
    const targets = wrapper.findAll('.privacy__toc a').map((link) => link.attributes('href')!)

    expect(targets.every((href) => wrapper.find(href).exists())).toBe(true)
  })

  it('no longer references software-lab.io', () => {
    expect(wrapper.html()).not.toContain('software-lab')
  })
})
