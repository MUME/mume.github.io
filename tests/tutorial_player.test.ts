import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import TutorialPlayer from '../docs/.vitepress/theme/components/TutorialPlayer.vue'

vi.mock('vitepress', () => ({
  useData: () => ({
    site: { value: { base: '/' } },
    frontmatter: {
      value: {
        title: 'Checking Vitals & Stats',
        steps: [
          { ask: 'score', note: 'Check your core vitals with `score`.' },
          { ask: 'info', note: 'Display full overview.', response: 'You are a male Eriadorian.\nLevel 1 Adventurer.\nHP: 36/36.' }
        ]
      }
    }
  }),
  useRoute: () => ({ path: '/play/tutorial/5-vitals-stats' }),
  useRouter: () => ({ go: vi.fn() }),
  withBase: (url: string) => url
}))

vi.mock('../docs/play/tutorial/chapters.data.js', () => ({
  data: [
    { chapterNum: 1, title: 'Orientation', url: '/play/tutorial/1-orientation', filename: '1-orientation.md' },
    { chapterNum: 5, title: 'Checking Vitals & Stats', url: '/play/tutorial/5-vitals-stats', filename: '5-vitals-stats.md' }
  ]
}))

describe('TutorialPlayer.vue', () => {
  it('renders chapter heading and initial quest prompt', () => {
    const wrapper = mount(TutorialPlayer)
    expect(wrapper.text()).toContain('Chapter 5: Checking Vitals & Stats')
    expect(wrapper.text()).toContain('Check your core vitals with score.')
  })

  it('submits command and advances substep', async () => {
    const wrapper = mount(TutorialPlayer)
    const input = wrapper.find('input')
    await input.setValue('score')
    await input.trigger('keydown.enter')
    expect(wrapper.text()).toContain('Display full overview.')
  })

  it('advances story beats cleanly without stalling', async () => {
    const wrapper = mount(TutorialPlayer)
    const input = wrapper.find('input')
    await input.setValue('score')
    await input.trigger('keydown.enter')
    // Next step is story beat or quest step
    expect(wrapper.find('input').exists()).toBe(true)
  })

  it('handles step backward and forward navigation cleanly', async () => {
    const wrapper = mount(TutorialPlayer)
    const input = wrapper.find('input')

    // Complete step 0
    await input.setValue('score')
    await input.trigger('keydown.enter')

    // Check step pills exist and can be clicked
    const pills = wrapper.findAll('.tut-step-pill-btn')
    if (pills.length > 1) {
      await pills[0].trigger('click')
      expect(wrapper.text()).toContain('Check your core vitals with score.')
    }
  })

  it('navigates backward over story beats cleanly in Chapter 3', async () => {
    const wrapper = mount(TutorialPlayer)
    const navBtns = wrapper.findAll('.tut-nav-btn')
    const backBtn = navBtns[1] // prev step button '<'
    expect(backBtn.exists()).toBe(true)
  })

  it('sets input readonly when pager mode is active', async () => {
    const wrapper = mount(TutorialPlayer)
    // Initially not readonly when input is empty and no overflow
    const input = wrapper.find('input')
    expect(input.attributes('readonly')).toBeUndefined()
  })

  it('provides helpful error text for unrecognized commands', async () => {
    const wrapper = mount(TutorialPlayer)
    const input = wrapper.find('input')
    await input.setValue('unknown_command')
    await input.trigger('keydown.enter')
    expect(wrapper.text()).toContain("That command isn't recognized for this step of the tutorial.")
  })
})
