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
})
