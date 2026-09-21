/**
 * Utility functions for tutorial routing and chapter calculations.
 */

export enum PlayerState {
  AWAITING_COMMAND = 'AWAITING_COMMAND',
  PAGING_OUTPUT = 'PAGING_OUTPUT',
  PLAYING_BEAT = 'PLAYING_BEAT',
  CHAPTER_COMPLETE = 'CHAPTER_COMPLETE'
}

export interface Chapter {
  chapterNum: number
  title: string
  url: string
  filename: string
  teach?: Array<{ command: string; desc: string }>
  steps?: any[]
  practice?: string
  [key: string]: any
}

/**
 * Normalizes route path to match chapter URLs, removing base prefix and trailing slashes.
 */
export function normalizeChapterPath(rawPath: string | undefined, basePrefix: string = '/'): string {
  if (!rawPath) return '/'
  let currentPath = rawPath.replace(/\.html$/, '').replace(/\/$/, '')
  const base = basePrefix || '/'
  const basePath = base.replace(/\/$/, '')
  if (base !== '/' && basePath && (currentPath === basePath || currentPath.startsWith(basePath + '/'))) {
    currentPath = '/' + currentPath.slice(basePath.length).replace(/^\//, '')
  }
  return currentPath || '/'
}

/**
 * Finds current chapter object from all chapters list.
 */
export function findChapterByPath(chapters: Chapter[], normalizedPath: string): Chapter | null {
  if (!chapters || !chapters.length) return null
  return chapters.find(c => c.url === normalizedPath || normalizedPath.endsWith(c.filename)) || chapters[0] || null
}
