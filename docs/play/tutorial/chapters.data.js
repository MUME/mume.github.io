import { createContentLoader } from 'vitepress'

export default createContentLoader('play/tutorial/*.md', {
  transform(raw) {
    return raw
      .filter(page => {
        const filename = page.url.split('/').pop().replace(/\.html$/, '')
        return /^\d+-/.test(filename)
      })
      .map(page => {
        const filename = page.url.split('/').pop().replace(/\.html$/, '')
        const numMatch = filename.match(/^(\d+)-/)
        const chapterNum = numMatch ? parseInt(numMatch[1], 10) : 99
        return {
          url: page.url,
          filename,
          chapterNum,
          title: page.frontmatter.title || filename,
          description: page.frontmatter.description || '',
          teach: page.frontmatter.teach || [],
          steps: page.frontmatter.steps || [],
          practice: page.frontmatter.practice || null,
          accept: page.frontmatter.accept || [],
          hint: page.frontmatter.hint || null,
          example: page.frontmatter.example || null,
          responses: page.frontmatter.responses || {}
        }
      })
      .sort((a, b) => a.chapterNum - b.chapterNum)
  }
})
