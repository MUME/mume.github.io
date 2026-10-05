import { afterEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import TutorialPlayer from '../docs/.vitepress/theme/components/TutorialPlayer.vue'

const { go } = vi.hoisted(() => ({ go: vi.fn().mockResolvedValue(undefined) }))
vi.mock('vitepress', () => ({
  useData: () => ({ site: { value: { base: '/' } }, frontmatter: { value: {
    title: 'What is MUME?', steps: [{ story: 'Your first hour begins now.' }]
  } } }),
  useRoute: () => ({ path: '/play/tutorial/1-welcome' }),
  useRouter: () => ({ go }),
  withBase: (url: string) => url
}))
vi.mock('../docs/play/tutorial/chapters.data.js', () => ({ data: [
  { chapterNum: 1, title: 'What is MUME?', url: '/play/tutorial/1-welcome' },
  { chapterNum: 2, title: 'Creating your character', url: '/play/tutorial/2-character' }
] }))

afterEach(() => { vi.useRealTimers(); vi.restoreAllMocks(); go.mockClear() })

describe('Tutorial keyboard paging', () => {
  it('keeps the opening lesson at the top and pages once per Enter before completing', async () => {
    vi.useFakeTimers()
    const wrapper = mount(TutorialPlayer, { attachTo: document.body })
    const log = wrapper.get('.tut-log').element as HTMLElement
    Object.defineProperties(log, {
      clientHeight: { value: 300 },
      scrollHeight: { value: 1000 },
      scrollTop: { value: 0, writable: true }
    })
    const scrollTo = vi.fn()
    const scrollBy = vi.fn()
    log.scrollTo = scrollTo
    log.scrollBy = scrollBy
    const input = wrapper.get('input').element as HTMLInputElement
    const focus = vi.spyOn(input, 'focus')

    await vi.advanceTimersByTimeAsync(300)
    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'instant' })
    expect(scrollTo.mock.calls.every(([options]) => options.top === 0)).toBe(true)
    expect(focus).toHaveBeenCalledWith({ preventScroll: true })
    expect(wrapper.find('.tut-pager-toast').exists()).toBe(true)
    expect(wrapper.find('.tut-full-complete-btn').exists()).toBe(false)

    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }))
    expect(scrollBy).toHaveBeenCalledTimes(1)
    expect(scrollBy).toHaveBeenCalledWith({ top: 260, behavior: 'smooth' })
    expect(go).not.toHaveBeenCalled()
    input.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true, cancelable: true }))
    expect(scrollBy).toHaveBeenCalledTimes(2)

    log.scrollTop = 700
    log.dispatchEvent(new Event('scroll'))
    await vi.advanceTimersByTimeAsync(500)
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.tut-full-complete-btn').exists()).toBe(true)
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', cancelable: true }))
    expect(go).toHaveBeenCalledExactlyOnceWith('/play/tutorial/2-character')
    wrapper.unmount()
  })
})
