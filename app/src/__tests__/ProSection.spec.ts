/*
 * Testing concept (MYSL-2, component level):
 * The PRO section now lists three price plans with a price note, describes PRO as monthly or
 * yearly subscription or lifetime purchase (the old "one-time purchase, no subscription"
 * claim is gone) and shows the `choose-widget` screenshot taken from the content data.
 */
import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import ProSection from '@/components/ProSection.vue'
import { PRICE_NOTE, pricePlans, screenshots } from '@/data/content'

const chooseWidget = screenshots.find((shot) => shot.id === 'choose-widget')

describe('ProSection', () => {
  const wrapper = mount(ProSection)
  const planText = (index: number) => wrapper.findAll('.pro__plan')[index]?.text() ?? ''

  it('renders one card per price plan', () => {
    expect(wrapper.findAll('.pro__plan')).toHaveLength(pricePlans.length)
  })

  it('labels the plan list for assistive technology', () => {
    expect(wrapper.get('.pro__plans').attributes('aria-label')).toBe('PRO plans')
  })

  it('shows the plan names in order', () => {
    expect(wrapper.findAll('.pro__plan-name').map((name) => name.text())).toEqual([
      'Monthly',
      'Yearly',
      'Lifetime',
    ])
  })

  it('shows the plan prices in order', () => {
    expect(wrapper.findAll('.pro__plan-price').map((price) => price.text())).toEqual([
      '€0.99',
      '€7.99',
      '€19.99',
    ])
  })

  it.each(pricePlans.map((plan, index) => [plan.id, index, plan] as const))(
    'renders period and note of the %s plan',
    (_id, index, plan) => {
      expect(planText(index)).toContain(`${plan.period}${plan.note}`)
    },
  )

  it('shows the price note below the plans', () => {
    expect(wrapper.get('.pro__price-note').text()).toBe(PRICE_NOTE)
  })

  it('describes PRO as subscription with free trial or lifetime purchase', () => {
    expect(wrapper.get('.pro__copy > p').text()).toContain(
      'monthly or yearly subscription — both start with a 7-day free trial — or with a one-time lifetime purchase',
    )
  })

  it('no longer claims that PRO is no subscription in the intro', () => {
    expect(wrapper.get('.pro__copy > p').text()).not.toMatch(/no subscription/i)
  })

  it('shows the choose-widget screenshot', () => {
    expect(wrapper.get('.pro__device img').attributes('src')).toBe(
      '/screenshots/choose-widget-480.webp',
    )
  })

  it('uses the alt text of the choose-widget screenshot', () => {
    expect(wrapper.get('.pro__device img').attributes('alt')).toBe(chooseWidget?.alt)
  })

  it('keeps the Free/PRO comparison table', () => {
    expect(wrapper.find('table.plan-table').exists()).toBe(true)
  })
})
