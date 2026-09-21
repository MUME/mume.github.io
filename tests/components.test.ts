import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import CookieConsent from '../docs/.vitepress/theme/components/CookieConsent.vue'
import MumeCallout from '../docs/.vitepress/theme/components/MumeCallout.vue'
import MumeChoice from '../docs/.vitepress/theme/components/MumeChoice.vue'
import MumeQuote from '../docs/.vitepress/theme/components/MumeQuote.vue'
import MumeSession from '../docs/.vitepress/theme/components/MumeSession.vue'
import MumeCommandGuide from '../docs/.vitepress/theme/components/MumeCommandGuide.vue'

// Mock VitePress useData and withBase
vi.mock('vitepress', () => ({
  useData: () => ({
    site: { value: { base: '/' } },
    frontmatter: { value: {} }
  }),
  useRoute: () => ({ path: '/play/tutorial/5-vitals-stats' }),
  useRouter: () => ({ go: vi.fn() }),
  withBase: (url: string) => url
}))

describe('CookieConsent.vue', () => {
  it('renders consent banner when mounted without consent', async () => {
    localStorage.clear()
    const wrapper = mount(CookieConsent)
    // Wait for onMounted tick
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain('cookies')
  })

  it('hides consent banner when accepted', async () => {
    localStorage.clear()
    const wrapper = mount(CookieConsent)
    await wrapper.vm.$nextTick()
    const btn = wrapper.find('.btn-accept')
    expect(btn.exists()).toBe(true)
    await btn.trigger('click')
    expect(localStorage.getItem('mume_cookie_consent')).toBe('granted')
  })
})

describe('MumeCallout.vue', () => {
  it('renders title and slot content', () => {
    const wrapper = mount(MumeCallout, {
      props: {
        title: 'Ranger Advice',
        actionText: 'Explore',
        actionHref: '/resources'
      },
      slots: { default: 'Travel carefully through the West.' }
    })
    expect(wrapper.text()).toContain('Ranger Advice')
    expect(wrapper.text()).toContain('Travel carefully through the West.')
    expect(wrapper.classes()).toContain('variant-gold')
  })
})

describe('MumeChoice.vue', () => {
  it('renders title and choices with primary styling', () => {
    const wrapper = mount(MumeChoice)
    expect(wrapper.text()).toContain('Interactive Tutorial')
    expect(wrapper.find('a').exists()).toBe(true)
  })
})

describe('MumeQuote.vue', () => {
  it('renders quote text and cite attribution', () => {
    const wrapper = mount(MumeQuote, {
      props: { cite: 'Gandalf' },
      slots: { default: 'All we have to decide is what to do with the time that is given us.' }
    })
    expect(wrapper.find('cite').text()).toContain('Gandalf')
    expect(wrapper.text()).toContain('All we have to decide')
  })
})

describe('MumeSession.vue', () => {
  it('renders session container and slot content', () => {
    const wrapper = mount(MumeSession, {
      slots: { default: '<span class="command">look</span>' }
    })
    expect(wrapper.find('.mume-session').exists()).toBe(true)
    expect(wrapper.html()).toContain('look')
  })
})

describe('MumeCommandGuide.vue', () => {
  it('filters commands by category tab', async () => {
    const wrapper = mount(MumeCommandGuide)
    expect(wrapper.find('.command-table').exists()).toBe(true)
    const filterTabs = wrapper.findAll('.filter-tab')
    const gearTab = filterTabs.find(b => b.text().includes('Gear & Inventory'))
    if (gearTab) {
      await gearTab.trigger('click')
      expect(wrapper.text()).toContain('equipment')
    }
  })
})
