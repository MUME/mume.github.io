import { describe, it, expect } from 'vitest'
import { formatInlineMarkdown } from '../docs/.vitepress/theme/utils/markdown'
import { normalizeChapterPath, findChapterByPath } from '../docs/.vitepress/theme/utils/tutorial'
import { isOverflowActive } from '../docs/.vitepress/theme/utils/pager'

describe('markdown utility', () => {
  it('formats inline code, bold, italics, and line breaks', () => {
    const raw = 'Type `score` to check **HP** and *Mana*\nLine 2'
    const html = formatInlineMarkdown(raw)
    expect(html).toContain('<code class="tut-cmd-inline">score</code>')
    expect(html).toContain('<strong>HP</strong>')
    expect(html).toContain('<em>Mana</em>')
    expect(html).toContain('<br>')
  })

  it('formats embedded images with lazy loading', () => {
    const raw = '![Example Image](/assets/images/test.png)'
    const html = formatInlineMarkdown(raw, (url) => `/mume${url}`)
    expect(html).toContain('loading="lazy"')
    expect(html).toContain('src="/mume/assets/images/test.png"')
    expect(html).toContain('alt="Example Image"')
  })

  it('formats links properly', () => {
    const raw = 'Read [Newcomers Hub](/resources/newcomers) or [MUME](https://mume.org)'
    const html = formatInlineMarkdown(raw, (url) => `/mume${url}`)
    expect(html).toContain('href="/mume/resources/newcomers"')
    expect(html).toContain('href="https://mume.org"')
    expect(html).toContain('target="_blank"')
  })
})

describe('tutorial path utility', () => {
  it('normalizes route path by removing base prefix and trailing slash', () => {
    expect(normalizeChapterPath('/pr-123/play/tutorial/5-vitals-stats/', '/pr-123/')).toBe('/play/tutorial/5-vitals-stats')
    expect(normalizeChapterPath('/play/tutorial/1-orientation.html', '/')).toBe('/play/tutorial/1-orientation')
  })

  it('finds current chapter by path', () => {
    const chapters = [
      { chapterNum: 1, title: 'Orientation', url: '/play/tutorial/1-orientation', filename: '1-orientation.md' },
      { chapterNum: 5, title: 'Vitals', url: '/play/tutorial/5-vitals-stats', filename: '5-vitals-stats.md' }
    ]
    const found = findChapterByPath(chapters as any, '/play/tutorial/5-vitals-stats')
    expect(found?.chapterNum).toBe(5)
  })
})

describe('pager utility', () => {
  it('detects scroll overflow correctly', () => {
    const mockContainer = {
      scrollHeight: 800,
      clientHeight: 400,
      scrollTop: 0
    } as any

    expect(isOverflowActive(mockContainer)).toBe(true)

    mockContainer.scrollTop = 380
    expect(isOverflowActive(mockContainer)).toBe(false)
  })
})
