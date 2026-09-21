/**
 * Utility functions for inline markdown formatting in tutorial elements.
 */

export type WithBaseFn = (url: string) => string

/**
 * Formats inline markdown strings into HTML safely.
 * Supports:
 * - HTML entity escaping for & < >
 * - Embedded images: ![alt](src) with lazy loading, aspect ratio placeholders, and lightbox triggers
 * - Links: [text](url)
 * - Bold: **text** or __text__
 * - Italics: *text* or _text_
 * - Inline code: `code`
 * - Line breaks: \n -> <br>
 */
export function formatInlineMarkdown(text: string | null | undefined, withBaseFn: WithBaseFn = (url) => url): string {
  if (!text) return ''

  // Escape HTML entities
  let safe = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  // Images: ![alt](src)
  safe = safe.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_match, alt, src) => {
    const cleanAlt = alt.replace(/"/g, '&quot;')
    let cleanSrc = src.trim().replace(/"/g, '&quot;')

    if (!/^(?:https?:\/\/|data:)/i.test(cleanSrc)) {
      if (cleanSrc.includes('assets/')) {
        cleanSrc = '/assets/' + cleanSrc.split('assets/')[1]
      }

      if (cleanSrc.startsWith('/') && typeof withBaseFn === 'function') {
        cleanSrc = withBaseFn(cleanSrc)
      }
    }

    return `<span class="tut-img-container"><img src="${cleanSrc}" alt="${cleanAlt}" class="tut-img-embed" loading="lazy" onload="this.dispatchEvent(new Event('load', { bubbles: true }))" /></span>`
  })

  // Links: [text](url)
  safe = safe.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_match, linkText, url) => {
    const cleanText = linkText
    const trimmed = url.trim()

    // Validate safe schemes: http, https, mailto, relative paths, or hash anchors
    const isHttp = /^https?:\/\//i.test(trimmed)
    const isMailto = /^mailto:/i.test(trimmed)
    const isRelativeOrHash = /^(?:\/|\.\.|\.|\#)/.test(trimmed)

    if (!isHttp && !isMailto && !isRelativeOrHash) {
      return cleanText
    }

    let finalUrl = trimmed
    if (finalUrl.startsWith('/') && typeof withBaseFn === 'function') {
      finalUrl = withBaseFn(finalUrl)
    }

    // Escape URL for HTML attribute insertion
    const escapedUrl = finalUrl
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')

    return `<a href="${escapedUrl}" ${isHttp ? 'target="_blank" rel="noopener noreferrer"' : ''} class="tut-link">${cleanText}</a>`
  })

  // Bold: **text** or __text__
  safe = safe.replace(/(\*\*|__)(.*?)\1/g, '<strong>$2</strong>')

  // Italics: *text* or _text_
  safe = safe.replace(/(?<!\w)(\*|_)(.*?)\1(?!\w)/g, '<em>$2</em>')

  // Code: `code`
  safe = safe.replace(/`([^`]+)`/g, '<code class="tut-cmd-inline">$1</code>')

  // Newlines
  return safe.replace(/\n/g, '<br>')
}
