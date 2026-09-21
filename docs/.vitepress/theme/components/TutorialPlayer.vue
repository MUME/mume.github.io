<script setup lang="ts">
/*
  Interactive new-player tutorial component driven dynamically by chapter Markdown files.
  Streamlined terminal output: immediate MUD output execution without extra pauses.
  Enhanced pagination & auto-scroll: aligns scroll view to top of new content blocks/lesson text.
  Defers chapter completion on final step output so large MUD responses can be read/paged through.
*/
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useData, useRoute, useRouter, withBase } from 'vitepress'
import { data as rawChapters } from '../../../play/tutorial/chapters.data.js'
import { formatInlineMarkdown } from '../utils/markdown'
import { normalizeChapterPath, findChapterByPath, Chapter } from '../utils/tutorial'
import { isOverflowActive } from '../utils/pager'

const allChapters = rawChapters as Chapter[]

const PLAY_HUB_URL = '/play/'
const BROWSER_PLAY_URL = '/play/browser'
const NEWCOMERS_URL = '/resources/newcomers'

const router = useRouter()
const route = useRoute()
const { site, frontmatter } = useData()

function formatMarkdown(text: string | null | undefined): string {
  return formatInlineMarkdown(text, withBase)
}

const currentChapterObj = computed(() => {
  const norm = normalizeChapterPath(route.path, site.value?.base || '/')
  return findChapterByPath(allChapters, norm) || allChapters[0]
})

const chapterNum = computed(() => currentChapterObj.value ? currentChapterObj.value.chapterNum : 1)
const totalChapters = computed(() => allChapters.length)
const chapterTitle = computed(() => frontmatter.value?.title || currentChapterObj.value?.title || 'Tutorial')

const currentIndex = computed(() => allChapters.findIndex(c => c.chapterNum === chapterNum.value))

const prevChapterUrl = computed(() => {
  const idx = currentIndex.value
  return idx > 0 ? allChapters[idx - 1].url : null
})

const nextChapterObj = computed(() => {
  const idx = currentIndex.value
  return idx >= 0 && idx < allChapters.length - 1 ? allChapters[idx + 1] : null
})

const nextChapterUrl = computed(() => {
  return nextChapterObj.value ? nextChapterObj.value.url : null
})

const teachList = computed(() => frontmatter.value?.teach || currentChapterObj.value?.teach || [])

// Multi-step in-chapter practice steps
const stepsList = computed(() => {
  const rawSteps = frontmatter.value?.steps || currentChapterObj.value?.steps
  if (rawSteps && rawSteps.length) {
    return rawSteps.map(s => ({
      ask: s.ask || null,
      text: s.story || s.beat || s.event || s.text || s.narrative || null,
      note: s.note || null,
      accept: s.accept || (s.ask ? [s.ask] : []),
      hint: s.hint || (s.ask ? `Type: ${s.ask}` : null),
      response: s.response || s.example || null
    }))
  }
  if (frontmatter.value?.practice || currentChapterObj.value?.practice) {
    const pr = frontmatter.value?.practice || currentChapterObj.value?.practice
    return [{
      ask: pr,
      text: null,
      note: frontmatter.value?.note || currentChapterObj.value?.note || null,
      accept: frontmatter.value?.accept || currentChapterObj.value?.accept || [pr],
      hint: frontmatter.value?.hint || currentChapterObj.value?.hint || `Type: ${pr}`,
      response: frontmatter.value?.response || frontmatter.value?.example || currentChapterObj.value?.response || currentChapterObj.value?.example || null
    }]
  }
  return []
})

const subStepIdx = ref(0)
const currentSubStep = computed(() => stepsList.value[subStepIdx.value] || null)

// Driven 100% dynamically from chapter frontmatter
const mumeResponses = computed(() => frontmatter.value?.responses || currentChapterObj.value?.responses || {})

const log = ref<any[]>([])
const finished = ref(false)
const pendingChapterCompletion = ref(false)
const entry = ref('')
const isSheetOpen = ref(false)
const isExpanded = ref(false)
const isModalOpen = ref(false)
const activeModalImage = ref<{ src: string; alt: string } | null>(null)

function openModal() {
  isModalOpen.value = true
}

function closeModal() {
  isModalOpen.value = false
}

function openImageModal(src: string, alt = '') {
  activeModalImage.value = { src, alt }
}

function closeImageModal() {
  activeModalImage.value = null
}

function handleLogClick(e: MouseEvent) {
  const target = e.target as HTMLElement
  if (target && target.tagName === 'IMG' && target.classList.contains('tut-img-embed')) {
    const img = target as HTMLImageElement
    openImageModal(img.src, img.alt)
  }
}

function toggleExpand() {
  if (typeof document === 'undefined') return

  if (!isExpanded.value) {
    isExpanded.value = true
    document.body.style.overflow = 'hidden'
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(() => {})
    }
    if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
      isSheetOpen.value = true
    }
  } else {
    isExpanded.value = false
    document.body.style.overflow = ''
    if (document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen().catch(() => {})
    }
  }
}

function handleFullscreenChange() {
  if (typeof document === 'undefined') return
  if (!document.fullscreenElement && isExpanded.value) {
    isExpanded.value = false
    document.body.style.overflow = ''
  }
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    if (activeModalImage.value) {
      closeImageModal()
      return
    }
    if (isExpanded.value) {
      if (!document.fullscreenElement) {
        toggleExpand()
      }
      return
    }
  }

  // Intercept Space or PageDown for paging if output overflow is active and input is empty or unfocused
  if (isScrollOverflowActive.value && !isScrolling.value) {
    const isInputFocused = typeof document !== 'undefined' && document.activeElement === inputEl.value
    if ((e.key === 'PageDown' || e.key === ' ') && (!isInputFocused || !entry.value.trim())) {
      e.preventDefault()
      pageForward()
    }
  }
}

const logEl = ref<HTMLElement | null>(null)
const inputEl = ref<HTMLInputElement | null>(null)

// Pager state management
const isScrollOverflowActive = ref(false)
const isScrolling = ref(false)
let scrollEndTimer: any = null

function updatePagerState() {
  const container = logEl.value
  isScrollOverflowActive.value = isOverflowActive(container)
}

function handleMediaLoad() {
  updatePagerState()
}

function handleScroll() {
  isScrolling.value = true
  if (scrollEndTimer) clearTimeout(scrollEndTimer)
  scrollEndTimer = setTimeout(() => {
    isScrolling.value = false
    updatePagerState()
  }, 150)
}

function pageForward(preventFocus = false) {
  const container = logEl.value
  if (!container) return
  const pageStep = Math.max(100, container.clientHeight - 40)
  container.scrollBy({ top: pageStep, behavior: 'smooth' })
  setTimeout(() => {
    updatePagerState()
    if (!preventFocus) {
      focusInput()
    }
  }, 300)
}

function flushPager() {
  const container = logEl.value
  if (!container) return
  container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' })
  setTimeout(updatePagerState, 300)
}

const stepLabel = computed(() => `Chapter ${chapterNum.value} of ${totalChapters.value}`)

let autoAdvanceTimer: any = null
function clearAutoAdvanceTimer() {
  if (autoAdvanceTimer) {
    clearTimeout(autoAdvanceTimer)
    autoAdvanceTimer = null
  }
}

function focusInput() {
  if (typeof window !== 'undefined') {
    setTimeout(() => {
      if (inputEl.value) inputEl.value.focus()
    }, 50)
  }
}

function navigateToUrl(url: string | null) {
  if (!url) return
  clearAutoAdvanceTimer()
  const targetUrl = withBase(url)
  if (router && router.go) {
    router.go(targetUrl).catch(() => {
      if (typeof window !== 'undefined') window.location.href = targetUrl
    })
  } else if (typeof window !== 'undefined') {
    window.location.href = targetUrl
  }
}

/**
 * Scroll log to align with the top of the newest block if it overflows,
 * ensuring large outputs (like info or long lesson text) are readable from the start.
 */
function scrollLogToLatestBlock() {
  if (typeof window !== 'undefined') {
    setTimeout(() => {
      const container = logEl.value
      if (!container) return
      const blocks = container.querySelectorAll('.tut-block')
      if (blocks.length > 0) {
        const lastBlock = blocks[blocks.length - 1] as HTMLElement
        const containerRect = container.getBoundingClientRect()
        const blockRect = lastBlock.getBoundingClientRect()

        // If block is taller than or overflows the viewport, align scroll to top of that block
        if (blockRect.height > containerRect.height - 40 && typeof lastBlock.scrollIntoView === 'function') {
          lastBlock.scrollIntoView({ behavior: 'smooth', block: 'start' })
        } else if (typeof container.scrollTo === 'function') {
          container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' })
        }
      } else if (typeof container.scrollTo === 'function') {
        container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' })
      }
      setTimeout(updatePagerState, 200)
    }, 60)
  }
}

function goToStep(targetIdx: number) {
  clearAutoAdvanceTimer()
  if (targetIdx < 0) targetIdx = 0
  if (targetIdx >= stepsList.value.length) targetIdx = Math.max(0, stepsList.value.length - 1)

  subStepIdx.value = targetIdx
  finished.value = false
  pendingChapterCompletion.value = false
  entry.value = ''

  const newLog: any[] = []
  const firstSub = stepsList.value[0] || null

  newLog.push({
    kind: 'lesson',
    chapterNum: chapterNum.value,
    title: chapterTitle.value,
    teach: teachList.value,
    note: firstSub ? firstSub.note : null,
    ask: firstSub ? firstSub.ask : null
  })

  for (let i = 0; i < targetIdx; i++) {
    const step = stepsList.value[i]
    if (step) {
      if (step.ask) {
        newLog.push({ kind: 'echo', text: step.ask })
        let rawRes = step.response || step.example || mumeResponses.value[step.ask.toLowerCase()] || ''
        if (!rawRes && step.accept && step.accept.length) {
          for (const alias of step.accept) {
            if (mumeResponses.value[alias.toLowerCase()]) {
              rawRes = mumeResponses.value[alias.toLowerCase()]
              break
            }
          }
        }
        const body = rawRes ? rawRes.replace(/^>[^\n]*\n?/, '') : ''
        if (body) {
          newLog.push({ kind: 'example', body })
        }
      } else if (step.text || step.response) {
        newLog.push({
          kind: 'story',
          body: step.text || step.response
        })
      }

      const nextSub = stepsList.value[i + 1]
      if (nextSub && nextSub.ask) {
        newLog.push({
          kind: 'prompt_next',
          stepIndex: i + 1,
          totalSteps: stepsList.value.length,
          note: nextSub.note || null,
          ask: nextSub.ask
        })
      }
    }
  }

  log.value = newLog
  scrollLogToLatestBlock()

  const curSub = stepsList.value[targetIdx] || null
  if (curSub && !curSub.ask && (curSub.text || curSub.response)) {
    log.value.push({
      kind: 'story',
      body: curSub.text || curSub.response
    })
    scrollLogToLatestBlock()
    checkAndScheduleAutoAdvance()
  } else {
    focusInput()
  }
}

function checkAndScheduleAutoAdvance() {
  clearAutoAdvanceTimer()
  // Give DOM a tick to calculate scrollHeight
  setTimeout(() => {
    updatePagerState()
    if (isScrollOverflowActive.value) {
      // Content overflows terminal viewport: pause auto-advance so user can read/page
      return
    }
    autoAdvanceTimer = setTimeout(() => {
      advanceSubStep()
    }, 300)
  }, 100)
}

function renderStepLog() {
  goToStep(0)
}

function completeChapter() {
  finished.value = true
  pendingChapterCompletion.value = false
  log.value.push({
    kind: 'chapter_complete',
    chapterNum: chapterNum.value,
    title: chapterTitle.value,
    nextUrl: nextChapterUrl.value
  })
  scrollLogToLatestBlock()
}

function advanceNext() {
  if (nextChapterUrl.value) {
    navigateToUrl(nextChapterUrl.value)
  } else {
    completeChapter()
  }
}

function advanceSubStep() {
  clearAutoAdvanceTimer()
  if (subStepIdx.value < stepsList.value.length - 1) {
    subStepIdx.value++
    const nextSub = stepsList.value[subStepIdx.value] || null

    if (nextSub && nextSub.ask) {
      log.value.push({
        kind: 'prompt_next',
        stepIndex: subStepIdx.value,
        totalSteps: stepsList.value.length,
        note: nextSub.note || null,
        ask: nextSub.ask
      })
      scrollLogToLatestBlock()
      focusInput()
    } else if (nextSub && (nextSub.text || nextSub.response)) {
      log.value.push({
        kind: 'story',
        body: nextSub.text || nextSub.response
      })
      scrollLogToLatestBlock()
      checkAndScheduleAutoAdvance()
    }
  } else {
    // Reached final step: set pendingChapterCompletion so response outputs in full before completion box
    pendingChapterCompletion.value = true
    setTimeout(() => {
      updatePagerState()
      if (!isScrollOverflowActive.value) {
        completeChapter()
      }
    }, 150)
  }
}

function prevSubStep() {
  if (subStepIdx.value > 0) {
    goToStep(subStepIdx.value - 1)
  } else if (prevChapterUrl.value) {
    navigateToUrl(prevChapterUrl.value)
  }
}

function submit() {
  const raw = entry.value.trim()
  const cmd = raw.toLowerCase()

  // Handle Pager Mode when input is empty and overflow is active
  if (isScrollOverflowActive.value && !raw) {
    pageForward()
    return
  }

  // If pending chapter completion and user hits Enter at end of scroll
  if (pendingChapterCompletion.value && !finished.value && !isScrollOverflowActive.value) {
    completeChapter()
    entry.value = ''
    focusInput()
    return
  }

  entry.value = ''

  if (finished.value) {
    if (nextChapterUrl.value) {
      navigateToUrl(nextChapterUrl.value)
    } else {
      openModal()
    }
    focusInput()
    return
  }

  if (isScrollOverflowActive.value) {
    flushPager()
  }

  if (raw) { log.value.push({ kind: 'echo', text: raw }) }

  if (cmd === 'skip') { advanceNext(); focusInput(); return }
  if (cmd === 'tutorial') { navigateToUrl(allChapters[0]?.url || '/play/tutorial/1-orientation'); focusInput(); return }

  const curStep = currentSubStep.value

  if (!curStep) {
    if (cmd && mumeResponses.value[cmd]) {
      log.value.push({ kind: 'example', body: mumeResponses.value[cmd] })
      scrollLogToLatestBlock()
    } else {
      advanceNext()
    }
    focusInput()
    return
  }

  if (!cmd) {
    log.value.push({ kind: 'error', text: curStep.hint || (`Type: ${curStep.ask || 'command'}`) })
    scrollLogToLatestBlock()
    focusInput()
    return
  }

  const accept = curStep.accept || (curStep.ask ? [curStep.ask] : [])
  const ok = accept.some(a => a.toLowerCase() === cmd)

  if (ok) {
    const rawRes = curStep.response || curStep.example || mumeResponses.value[cmd] || ''
    const body = rawRes ? rawRes.replace(/^>[^\n]*\n?/, '') : ''
    if (body) {
      log.value.push({ kind: 'example', body })
    }
    scrollLogToLatestBlock()
    advanceSubStep()
  } else if (mumeResponses.value[cmd]) {
    log.value.push({ kind: 'example', body: mumeResponses.value[cmd] })
    log.value.push({ kind: 'error', text: 'Good try! To proceed in this step, ' + (curStep.hint || (`try: ${curStep.ask || 'the required command'}`)) })
    scrollLogToLatestBlock()
  } else {
    log.value.push({ kind: 'error', text: 'MUME does not know that one here. ' + (curStep.hint || (`Try: ${curStep.ask || 'the required command'}`)) })
    scrollLogToLatestBlock()
  }
  focusInput()
}

watch(() => route.path, () => {
  renderStepLog()
}, { immediate: true })

let logResizeObserver: any = null

onMounted(() => {
  if (typeof window !== 'undefined') {
    renderStepLog()
    if (window.innerWidth >= 1024) {
      isSheetOpen.value = true
    }
    focusInput()
    window.addEventListener('keydown', handleKeydown)
    document.addEventListener('fullscreenchange', handleFullscreenChange)

    if (logEl.value && typeof ResizeObserver !== 'undefined') {
      logResizeObserver = new ResizeObserver(() => {
        updatePagerState()
      })
      logResizeObserver.observe(logEl.value)
    }
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('keydown', handleKeydown)
    document.removeEventListener('fullscreenchange', handleFullscreenChange)
    if (logResizeObserver) {
      logResizeObserver.disconnect()
      logResizeObserver = null
    }
    if (isExpanded.value && typeof document !== 'undefined') {
      document.body.style.overflow = ''
    }
  }
})
</script>

<template>
  <div class="tut" :class="{ 'tut-fullscreen': isExpanded }">
    <div class="tut-frame">
      <div class="tut-head">
        <div class="tut-heading">
          <span class="tut-title">Chapter {{ chapterNum }}: {{ chapterTitle }}</span>
          <span class="tut-sub">Your first hour in Middle-earth</span>
        </div>
        <div class="tut-progress">
          <span class="tut-ticks">
            <button v-for="ch in allChapters" :key="ch.chapterNum"
                    type="button"
                    class="tut-tick"
                    :class="{
                      done: ch.chapterNum < chapterNum,
                      now: ch.chapterNum === chapterNum,
                      clickable: ch.chapterNum !== chapterNum
                    }"
                    :title="'Go to Chapter ' + ch.chapterNum + ': ' + ch.title"
                    @click="navigateToUrl(ch.url)"></button>
          </span>
          <span class="tut-step">{{ stepLabel }}</span>
        </div>
        <div class="tut-actions">
          <!-- Visual Toggle Pill Switch for Commands -->
          <button type="button"
                  class="tut-toggle-pill-btn"
                  :class="{ active: isSheetOpen }"
                  :aria-expanded="isSheetOpen"
                  @click="isSheetOpen = !isSheetOpen"
                  aria-label="Toggle Command Reference Sheet">
            <i class="fa fa-book" aria-hidden="true"></i>
            <span>Commands</span>
            <span class="tut-toggle-switch">
              <span class="tut-toggle-thumb"></span>
            </span>
          </button>

          <button type="button" class="tut-action-btn tut-fullscreen-btn" @click="toggleExpand" :title="isExpanded ? 'Exit Fullscreen (Esc)' : 'Fullscreen View'" :aria-expanded="isExpanded" aria-label="Toggle Fullscreen Mode">
            <i class="fa" :class="isExpanded ? 'fa-compress' : 'fa-expand'" aria-hidden="true"></i>
            <span class="tut-btn-text">{{ isExpanded ? 'Shrink' : 'Full' }}</span>
          </button>

          <a :href="withBase(NEWCOMERS_URL)" class="tut-action-btn tut-exit-btn" title="Exit Tutorial to Newcomers Hub" aria-label="Exit Tutorial">
            <i class="fa fa-sign-out" aria-hidden="true"></i>
            <span class="tut-btn-text">Exit</span>
          </a>
        </div>
      </div>

      <div class="tut-body" :class="{ 'has-sheet': isSheetOpen }">
        <div class="tut-term">
          <div class="tut-log" ref="logEl" aria-live="polite" aria-atomic="false" @scroll="handleScroll" @load.capture="handleMediaLoad" @click="handleLogClick">
            <div v-for="(b, i) in log" :key="i" class="tut-block">
              <template v-if="b.kind === 'lesson'">
                <!-- Chapter Intro Card -->
                <div class="tut-narrative-card">
                  <div class="tut-eyebrow">CHAPTER {{ b.chapterNum }} OF {{ totalChapters }}</div>
                  <h3 class="tut-h">{{ b.title }}</h3>

                  <!-- Render markdown lesson content -->
                  <div class="tut-md-content">
                    <slot />
                  </div>
                </div>

                <!-- High-contrast Quest Action Card -->
                <div class="tut-quest-card" v-if="b.ask">
                  <div class="tut-quest-header">
                    <span class="tut-quest-badge"><i class="fa fa-compass" aria-hidden="true"></i> QUEST</span>
                    <span class="tut-quest-sub">ACTION REQUIRED</span>
                  </div>
                  <div v-if="b.note" class="tut-quest-desc" v-html="formatMarkdown(b.note)"></div>
                  <div class="tut-quest-target">
                    Type command: <span class="tut-cmd-chip">{{ b.ask }}</span>
                  </div>
                </div>
              </template>

              <template v-else-if="b.kind === 'prompt_next'">
                <!-- High-contrast Quest Action Card for Next Steps -->
                <div class="tut-quest-card">
                  <div class="tut-quest-header">
                    <span class="tut-quest-badge"><i class="fa fa-compass" aria-hidden="true"></i> QUEST</span>
                    <span class="tut-quest-sub">ACTION REQUIRED</span>
                  </div>
                  <div v-if="b.note" class="tut-quest-desc" v-html="formatMarkdown(b.note)"></div>
                  <div class="tut-quest-target">
                    Type command: <span class="tut-cmd-chip">{{ b.ask }}</span>
                  </div>
                </div>
              </template>

              <div v-else-if="b.kind === 'echo'" class="tut-echo">&gt; {{ b.text }}</div>

              <pre v-else-if="b.kind === 'example'" class="tut-example">{{ b.body }}</pre>

              <!-- Unified Story Beat Card -->
              <div v-else-if="b.kind === 'story'" class="tut-story-beat-card">
                <i class="fa fa-quote-left tut-beat-icon" aria-hidden="true"></i>
                <div class="tut-beat-body" v-html="formatMarkdown(b.body)"></div>
              </div>

              <div v-else-if="b.kind === 'error'" class="tut-err">{{ b.text }}</div>

              <template v-else-if="b.kind === 'chapter_complete'">
                <div class="tut-complete-box">
                  <div class="tut-eyebrow">Chapter {{ b.chapterNum }} Complete!</div>
                  <h3 class="tut-h">Great work mastering {{ b.title }}</h3>
                  <p class="tut-line" v-if="b.nextUrl">Ready to continue your journey into Middle-earth?</p>
                  <p class="tut-line" v-else>You have completed all chapters in the interactive tutorial!</p>

                  <div class="tut-end-actions">
                    <button v-if="b.nextUrl && nextChapterObj" type="button" class="tut-enter" @click="navigateToUrl(b.nextUrl)">
                      Continue to Chapter {{ nextChapterObj.chapterNum }}: {{ nextChapterObj.title }} &rarr;
                    </button>
                    <button v-else type="button" class="tut-enter" @click="openModal">
                      Tutorial Complete &mdash; What's Next? &rarr;
                    </button>
                  </div>
                </div>
              </template>

              <template v-else-if="b.kind === 'end'">
                <hr class="tut-rule" />
                <div class="tut-eyebrow">Congratulations!</div>
                <h3 class="tut-h">You have completed the tutorial!</h3>
                <p class="tut-line">You have mastered movement, equipment, stats, combat, scouting, skills, and resting in Middle-earth.</p>

                <div class="tut-end-actions">
                  <a class="tut-enter" :href="withBase(BROWSER_PLAY_URL)">Play MUME Now (Web Client) &rarr;</a>
                  <a class="tut-secondary-link" :href="withBase(NEWCOMERS_URL)">Explore Newcomers Guide</a>
                  <a class="tut-secondary-link" :href="withBase(PLAY_HUB_URL)">Back to Play Hub</a>
                </div>
                <p class="tut-note">You can retake any chapter at any time from the top progress bar or the Newcomers Hub.</p>
              </template>
            </div>
          </div>

          <div class="tut-prompt" :class="{ 'is-pager': isScrollOverflowActive && !isScrolling }" @click.prevent="isScrollOverflowActive && !entry ? pageForward(true) : focusInput()">
            <span class="tut-caret">&gt;</span>
            <input ref="inputEl" v-model="entry" @keydown.enter.prevent="submit"
                   autocomplete="off" spellcheck="false"
                   :placeholder="isScrollOverflowActive && !isScrolling && !entry ? `[ MORE — Press Space/Enter or Tap ]` : (finished ? (nextChapterUrl ? 'Press Enter to continue to next chapter...' : 'Tutorial complete — press Enter for options') : (pendingChapterCompletion ? 'Press Enter to complete chapter...' : 'type here, then press Enter'))"
                   aria-label="Type a command" />
            <button type="button"
                    class="tut-send-btn"
                    :class="{ 'tut-pager-btn': isScrollOverflowActive && !isScrolling && !entry }"
                    @click.stop="isScrollOverflowActive && !entry ? pageForward(true) : submit()"
                    aria-label="Send Command">
              {{ (isScrollOverflowActive && !isScrolling && !entry) ? 'More ↓' : (finished ? (nextChapterUrl ? 'Next' : 'Options') : (pendingChapterCompletion ? 'Finish' : 'Send')) }}
            </button>
          </div>
        </div>

        <!-- Command Sheet (Desktop sidebar & Mobile modal/drawer) -->
        <aside class="tut-sheet" :class="{ open: isSheetOpen }">
          <div class="tut-sheet-bar">
            <span>Command sheet</span>
            <button type="button" class="tut-sheet-close" @click="isSheetOpen = false" aria-label="Close command sheet">&times;</button>
          </div>
          <div class="tut-sheet-body">
            <!-- Active Quest Spotlight inside Command Sheet -->
            <div v-if="currentSubStep && currentSubStep.ask" class="tut-sheet-quest-spotlight">
              <div class="tut-spotlight-badge"><i class="fa fa-compass" aria-hidden="true"></i> ACTIVE QUEST</div>
              <div class="tut-spotlight-cmd">Target Command: <code>{{ currentSubStep.ask }}</code></div>
              <div v-if="currentSubStep.note" class="tut-spotlight-note" v-html="formatMarkdown(currentSubStep.note)"></div>
            </div>

            <p v-if="!teachList.length" class="tut-empty">No special commands listed for this chapter.</p>
            <template v-else>
              <div class="tut-grp">CHAPTER {{ chapterNum }} COMMANDS REFERENCE</div>
              <dl>
                <template v-for="(t, ti) in teachList" :key="ti">
                  <dt>{{ t.command }}</dt><dd>{{ t.desc }}</dd>
                </template>
              </dl>
            </template>
          </div>
        </aside>
      </div>

      <div class="tut-sheet-backdrop" v-if="isSheetOpen" @click="isSheetOpen = false"></div>

      <!-- Image Lightbox Modal Overlay -->
      <div v-if="activeModalImage" class="tut-img-modal-overlay" role="dialog" aria-modal="true" aria-label="Image Preview" @click.self="closeImageModal">
        <div class="tut-img-modal-card">
          <button type="button" class="tut-img-modal-close" @click="closeImageModal" aria-label="Close image preview">&times;</button>
          <img :src="activeModalImage.src" :alt="activeModalImage.alt" class="tut-img-modal-preview" />
          <div v-if="activeModalImage.alt" class="tut-img-modal-caption">{{ activeModalImage.alt }}</div>
        </div>
      </div>

      <!-- Modal Overlay for End of Tutorial Options -->
      <div v-if="isModalOpen" class="tut-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="tut-modal-title-id" @click.self="closeModal">
        <div class="tut-modal-card">
          <button type="button" class="tut-modal-close" @click="closeModal" aria-label="Close modal">&times;</button>
          <div class="tut-eyebrow">Tutorial Complete</div>
          <h3 id="tut-modal-title-id" class="tut-modal-title">Congratulations! What would you like to do next?</h3>
          <p class="tut-modal-desc">
            You have completed all 15 chapters of the MUME interactive tutorial. You're ready to step into Middle-earth!
          </p>

          <div class="tut-modal-buttons">
            <a class="tut-modal-btn tut-btn-primary" :href="withBase(BROWSER_PLAY_URL)">
              <i class="fa fa-gamepad" aria-hidden="true"></i> Play MUME Now (Web Client) &rarr;
            </a>

            <a class="tut-modal-btn tut-btn-secondary" :href="withBase(NEWCOMERS_URL)">
              <i class="fa fa-compass" aria-hidden="true"></i> Return to Newcomers Hub
            </a>

            <button type="button" class="tut-modal-btn tut-btn-ghost" @click="closeModal">
              Stay on this Chapter
            </button>
          </div>
        </div>
      </div>

      <div class="tut-controls">
        <div class="tut-combined-nav">
          <!-- Prev Chapter « -->
          <button type="button" class="tut-nav-btn" :disabled="!prevChapterUrl" @click="navigateToUrl(prevChapterUrl)" title="Previous Chapter («)">
            &laquo;
          </button>

          <!-- Prev Step < -->
          <button type="button" class="tut-nav-btn" :disabled="subStepIdx === 0 || stepsList.length <= 1" @click="prevSubStep" title="Previous Step (<)">
            &lsaquo;
          </button>

          <!-- Integrated Step Indicator Pills -->
          <div class="tut-step-pills" v-if="stepsList.length > 1">
            <button v-for="(st, sIdx) in stepsList" :key="sIdx"
                  type="button"
                  class="tut-step-pill tut-step-pill-btn"
                  :class="{ active: sIdx === subStepIdx, done: sIdx < subStepIdx }"
                  :title="'Jump to Step ' + (sIdx + 1) + ' of ' + stepsList.length"
                  @click="goToStep(sIdx)"></button>
          </div>
          <span v-else class="tut-ch-badge">Ch {{ chapterNum }}</span>

          <!-- Next Step > -->
          <button type="button" class="tut-nav-btn" :disabled="subStepIdx >= stepsList.length - 1 || stepsList.length <= 1" @click="advanceSubStep" title="Next Step (>)">
            &rsaquo;
          </button>

          <!-- Next Chapter » -->
          <button type="button" class="tut-nav-btn" :disabled="!nextChapterUrl" @click="navigateToUrl(nextChapterUrl)" title="Next Chapter (»)">
            &raquo;
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.tut { margin: 1.5rem 0 2rem; }
.tut-frame { border: 1px solid rgba(215,166,63,.35); border-radius: 12px; background: #0b0b0d; overflow: hidden; box-shadow: 0 18px 50px rgba(0,0,0,.45); }

/* Custom Dark Theme Scrollbars */
.tut-log::-webkit-scrollbar,
.tut-sheet-body::-webkit-scrollbar {
  width: 8px;
}
.tut-log::-webkit-scrollbar-track,
.tut-sheet-body::-webkit-scrollbar-track {
  background: #08080a;
  border-left: 1px solid #1a1b20;
}
.tut-log::-webkit-scrollbar-thumb,
.tut-sheet-body::-webkit-scrollbar-thumb {
  background: rgba(215, 166, 63, 0.3);
  border-radius: 4px;
}
.tut-log::-webkit-scrollbar-thumb:hover,
.tut-sheet-body::-webkit-scrollbar-thumb:hover {
  background: rgba(215, 166, 63, 0.6);
}

.tut-head { display: flex; align-items: center; gap: 14px; padding: 12px 16px; border-bottom: 1px solid rgba(215,166,63,.25); background: linear-gradient(180deg,#15130c,#0b0b0d); flex-wrap: wrap; }
.tut-logo { width: 40px; height: 40px; border-radius: 50%; object-fit: cover; flex: none; }
.tut-heading { display: flex; flex-direction: column; line-height: 1.15; margin-right: auto; }
.tut-title { font-family: 'Kelt', serif; color: #f4dd94; font-size: 22px; }
.tut-sub { color: #9a927f; font-size: 12.5px; }
.tut-progress { display: flex; align-items: center; gap: 10px; }
.tut-ticks { display: inline-flex; gap: 5px; align-items: center; }
.tut-tick { width: 10px; height: 10px; border-radius: 50%; background: #2a2a2a; border: none; padding: 0; cursor: default; transition: background .3s, transform .2s, box-shadow .2s; }
.tut-tick.done { background: #a9812a; }
.tut-tick.now { background: #f4dd94; box-shadow: 0 0 8px rgba(244,221,148,.6); transform: scale(1.15); }
.tut-tick.clickable { cursor: pointer; }
.tut-tick.clickable:hover { background: #ffd966; transform: scale(1.25); }
.tut-step { color: #9a927f; font-size: 12.5px; white-space: nowrap; }

.tut-actions { display: flex; align-items: center; gap: 8px; margin-left: 8px; }

@keyframes tutPulseHint {
  0% { box-shadow: 0 0 0 0 rgba(215, 166, 63, 0.4); }
  70% { box-shadow: 0 0 0 6px rgba(215, 166, 63, 0); }
  100% { box-shadow: 0 0 0 0 rgba(215, 166, 63, 0); }
}

/* Visual Toggle Pill Switch Button for Commands */
.tut-toggle-pill-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(184,134,11,.12);
  border: 1px solid rgba(215,166,63,.35);
  color: #f4dd94;
  font-size: 12.5px;
  padding: 4px 10px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.25s ease;
  user-select: none;
}
.tut-toggle-pill-btn:not(.active) {
  animation: tutPulseHint 2.5s infinite;
}
.tut-toggle-pill-btn:hover {
  background: rgba(184,134,11,.25);
  border-color: gold;
}
.tut-toggle-pill-btn.active {
  background: rgba(184,134,11,.3);
  border-color: #ffd700;
  color: #ffffff;
  box-shadow: 0 0 10px rgba(215,166,63,0.3);
}

.tut-toggle-switch {
  width: 28px;
  height: 14px;
  background: #1a1b20;
  border: 1px solid rgba(215,166,63,.4);
  border-radius: 10px;
  position: relative;
  transition: background 0.25s ease;
  display: inline-block;
}
.tut-toggle-pill-btn.active .tut-toggle-switch {
  background: darkgoldenrod;
  border-color: #ffd700;
}

.tut-toggle-thumb {
  width: 10px;
  height: 10px;
  background: #8e846b;
  border-radius: 50%;
  position: absolute;
  top: 1px;
  left: 2px;
  transition: transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275), background 0.25s;
}
.tut-toggle-pill-btn.active .tut-toggle-thumb {
  transform: translateX(12px);
  background: #ffffff;
  box-shadow: 0 0 4px rgba(255,255,255,0.8);
}

.tut-action-btn { display: inline-flex; align-items: center; gap: 6px; background: rgba(184,134,11,.15); border: 1px solid rgba(215,166,63,.35); color: #f4dd94; font-size: 12px; padding: 4px 12px; border-radius: 16px; cursor: pointer; text-decoration: none !important; transition: background .2s, color .2s, border-color .2s; }
.tut-action-btn:hover, .tut-action-btn.active { background: darkgoldenrod; color: #fff !important; border-color: gold; }
.tut-exit-btn { background: rgba(220,53,69,.15); border-color: rgba(220,53,69,.4); color: #f88; }
.tut-exit-btn:hover { background: #dc3545; color: #fff !important; border-color: #ff6b6b; }

.tut-body { display: grid; grid-template-columns: 1fr; gap: 0; transition: grid-template-columns .3s ease; }
.tut-body.has-sheet { grid-template-columns: 1fr 280px; }
@media (max-width: 720px) { .tut-body.has-sheet { grid-template-columns: 1fr; } }

@keyframes tutStreamIn {
  0% { opacity: 0; transform: translateY(8px); }
  100% { opacity: 1; transform: translateY(0); }
}

.tut-block {
  animation: tutStreamIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* Narrative Lore Card (Chapter Intros) */
.tut-narrative-card {
  position: relative;
  background: linear-gradient(180deg, rgba(25, 22, 16, 0.85), rgba(14, 15, 18, 0.95));
  border: 1px solid rgba(215, 166, 63, 0.3);
  border-radius: 10px;
  padding: 18px 20px 14px;
  margin: 8px 0 16px;
  box-shadow: inset 0 0 15px rgba(0,0,0,0.5), 0 4px 12px rgba(0,0,0,0.3);
}

.tut-card-badge {
  position: absolute;
  top: -10px;
  left: 16px;
  background: #15130c;
  border: 1px solid rgba(215, 166, 63, 0.5);
  color: #d8b04a;
  font-size: 10px;
  font-weight: bold;
  letter-spacing: 0.12em;
  padding: 2px 8px;
  border-radius: 4px;
}

/* Quest Action Card (Player Tasks) */
.tut-quest-card {
  background: linear-gradient(180deg, rgba(30, 24, 10, 0.9), rgba(18, 15, 8, 0.95));
  border: 1px solid rgba(244, 221, 148, 0.5);
  border-left: 4px solid #f4dd94;
  border-radius: 8px;
  padding: 12px 16px;
  margin: 12px 0;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.4);
}

.tut-quest-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
}

.tut-quest-badge {
  color: #f4dd94;
  font-size: 11px;
  font-weight: bold;
  letter-spacing: 0.12em;
  display: flex;
  align-items: center;
  gap: 6px;
}

.tut-quest-sub {
  color: #a89f8d;
  font-size: 10px;
  letter-spacing: 0.1em;
}

.tut-quest-desc {
  color: #ede2cd;
  font-size: 13.5px;
  line-height: 1.5;
  margin-bottom: 8px;
}

.tut-quest-target {
  color: #9a927f;
  font-size: 13px;
}

.tut-cmd-chip {
  font-family: 'DejaVu Sans Mono', Menlo, Consolas, monospace;
  color: #ffffff;
  background: rgba(184, 134, 11, 0.3);
  border: 1px solid #ffd700;
  padding: 3px 8px;
  border-radius: 4px;
  font-weight: bold;
  box-shadow: 0 0 8px rgba(255, 215, 0, 0.25);
}

.tut-cmd-inline {
  font-family: 'DejaVu Sans Mono', Menlo, Consolas, monospace;
  color: #f4dd94;
  background: rgba(184, 134, 11, 0.2);
  border: 1px solid rgba(215, 166, 63, 0.4);
  padding: 1px 5px;
  border-radius: 4px;
  font-size: 0.92em;
}

.tut-link {
  color: #f4dd94;
  text-decoration: underline;
  text-underline-offset: 2px;
  transition: color 0.2s;
}
.tut-link:hover {
  color: #ffffff;
}

/* Inline Story Beat Card */
.tut-story-beat-card {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  background: rgba(184, 134, 11, 0.06);
  border-left: 3px solid #b8860b;
  border-radius: 0 8px 8px 0;
  padding: 10px 14px;
  margin: 10px 0;
}

.tut-beat-icon {
  color: #b8860b;
  font-size: 14px;
  margin-top: 2px;
}

.tut-beat-body {
  color: #d6ccb4;
  font-style: italic;
  font-size: 13.5px;
  line-height: 1.5;
  flex: 1;
}

/* Image Lazy Loading & Placeholder Container */
.tut-img-container {
  display: block;
  min-height: 140px;
  contain-intrinsic-size: 100% 180px;
  background: rgba(15, 16, 20, 0.6);
  border-radius: 6px;
  margin: 8px 0;
  position: relative;
  overflow: hidden;
}

.tut-log img,
.tut-md-content img,
.tut-img-embed {
  max-width: 100%;
  max-height: 220px;
  height: auto;
  aspect-ratio: 16 / 9;
  object-fit: contain;
  border-radius: 6px;
  border: 1px solid rgba(215, 166, 63, 0.35);
  display: block;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  cursor: zoom-in;
  transition: transform 0.2s, border-color 0.2s;
}
.tut-img-embed:hover {
  transform: scale(1.02);
  border-color: gold;
}

/* Image Lightbox Modal */
.tut-img-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.88);
  backdrop-filter: blur(6px);
  z-index: 100001;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  animation: tutStreamIn 0.2s ease-out forwards;
}

.tut-img-modal-card {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #0b0c0f;
  border: 1px solid rgba(215, 166, 63, 0.5);
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 25px 70px rgba(0,0,0,0.9), 0 0 30px rgba(215, 166, 63, 0.2);
}

.tut-img-modal-close {
  position: absolute;
  top: -14px;
  right: -14px;
  width: 36px;
  height: 36px;
  background: #18191f;
  border: 1px solid rgba(215, 166, 63, 0.6);
  color: #f4dd94;
  font-size: 24px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  transition: background 0.2s, color 0.2s, transform 0.15s;
}
.tut-img-modal-close:hover {
  background: darkgoldenrod;
  color: #ffffff;
  transform: scale(1.1);
}

.tut-img-modal-preview {
  max-width: 85vw;
  max-height: 80vh;
  object-fit: contain;
  border-radius: 6px;
  border: 1px solid rgba(215, 166, 63, 0.3);
}

.tut-img-modal-caption {
  margin-top: 10px;
  color: #d8b04a;
  font-size: 13.5px;
  font-family: 'Kelt', serif;
  text-align: center;
}

.tut-complete-box {
  margin: 16px 0;
  padding: 16px 20px;
  background: rgba(184, 134, 11, 0.1);
  border: 1px solid rgba(215, 166, 63, 0.4);
  border-radius: 8px;
}

.tut-term { display: flex; flex-direction: column; min-width: 0; }
.tut-log { min-height: 440px; max-height: 520px; overflow-y: auto; padding: 12px 18px 16px; scroll-behavior: smooth; }
.tut-eyebrow { text-transform: uppercase; letter-spacing: .14em; font-size: 11px; color: #b8860b; margin-bottom: 4px; }
.tut-h { font-family: 'Kelt', serif; color: #e6d79a; font-size: 24px; margin: 0 0 .4em; border: 0; padding: 0; }
.tut-line { color: #cdc7b8; font-size: 14.5px; line-height: 1.6; margin: 0 0 12px; }

.tut-echo { font-family: 'DejaVu Sans Mono', Menlo, Consolas, monospace; color: #dcdcdc; margin: 12px 0 4px; font-weight: bold; }
.tut-example { font-family: 'DejaVu Sans Mono', Menlo, Consolas, monospace; font-size: 13px; line-height: 1.45; color: #b9d3c2; white-space: pre-wrap; background: #05100a; border: 1px solid #142b1c; border-radius: 6px; padding: 10px 14px; margin: 6px 0 10px; }
.tut-err { color: #e5988e; font-size: 13.5px; margin: 6px 0; }

.tut-end-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; margin: 16px 0 16px; }
.tut-enter { display: inline-block; font-family: 'Kelt', serif; font-size: 1.15rem; background: darkgoldenrod; color: white !important; padding: 0.5em 2em; border-radius: 3.75rem; box-shadow: 1px 5px 10px 0px rgba(184, 134, 11, 0.5); text-decoration: none !important; transition: color .2s; }
.tut-enter:hover, .tut-enter:focus-visible { color: #3a3a3a !important; text-decoration: none !important; }
.tut-secondary-link { display: inline-block; font-family: 'Kelt', serif; font-size: 1.05rem; background: rgba(10, 13, 21, 0.75); color: white !important; border: 2px solid darkgoldenrod; padding: 0.5em 1.5em; border-radius: 3.75rem; box-shadow: 1px 5px 10px 0px rgba(184, 134, 11, 0.5); text-decoration: none !important; transition: background-color .2s, color .2s; }
.tut-secondary-link:hover, .tut-secondary-link:focus-visible { background: darkgoldenrod; color: #3a3a3a !important; text-decoration: none !important; }
.tut-note { color: #8f8a7d; font-size: 12.5px; margin: 4px 0 6px; }

.tut-prompt { display: flex; align-items: center; gap: 8px; border-top: 1px solid #23262e; padding: 12px 18px; background: #08080a; transition: background 0.25s, border-color 0.25s; }
.tut-prompt.is-pager { background: linear-gradient(180deg, #18150c, #0a0b0e); border-top-color: rgba(215, 166, 63, 0.5); cursor: pointer; }
.tut-prompt.is-pager input::placeholder { color: #f4dd94; font-weight: bold; }
.tut-caret { color: #d8b04a; font-family: 'DejaVu Sans Mono', Menlo, Consolas, monospace; }
.tut-prompt input { flex: 1; background: transparent; border: none; outline: none; color: #eaeaea; font-family: 'DejaVu Sans Mono', Menlo, Consolas, monospace; font-size: 14px; }
.tut-prompt input::placeholder { color: #5f5f5f; }

.tut-send-btn.tut-pager-btn {
  background: #f4dd94;
  color: #111;
  box-shadow: 0 0 10px rgba(244, 221, 148, 0.4);
  animation: tutPulseHint 2s infinite;
}
.tut-send-btn.tut-pager-btn:hover {
  background: #ffffff;
  color: #000;
}

.tut-sheet { border-left: 1px solid #23262e; background: #08090c; display: none; flex-direction: column; }
.tut-body.has-sheet .tut-sheet { display: flex; }
@media (max-width: 720px) { .tut-sheet { border-left: 0; border-top: 1px solid #23262e; } }
.tut-sheet-bar { color: #d8b04a; font-family: 'Kelt', serif; font-size: 18px; padding: 12px 14px 8px; border-bottom: 1px solid #1c1e24; display: flex; justify-content: space-between; align-items: center; }
.tut-sheet-body { padding: 10px 14px 14px; overflow-y: auto; max-height: 472px; }

/* Active Quest Spotlight inside Command Sheet */
.tut-sheet-quest-spotlight {
  background: rgba(184, 134, 11, 0.12);
  border: 1px solid rgba(215, 166, 63, 0.4);
  border-radius: 8px;
  padding: 10px 12px;
  margin-bottom: 12px;
}

.tut-spotlight-badge {
  color: #f4dd94;
  font-size: 10px;
  font-weight: bold;
  letter-spacing: 0.1em;
  margin-bottom: 4px;
}

.tut-spotlight-cmd {
  color: #ffffff;
  font-size: 12.5px;
}

.tut-spotlight-cmd code {
  color: #f4dd94;
  background: rgba(0,0,0,0.4);
  padding: 1px 5px;
  border-radius: 3px;
  font-family: 'DejaVu Sans Mono', monospace;
}

.tut-spotlight-note {
  color: #b3a998;
  font-size: 11.5px;
  margin-top: 4px;
  line-height: 1.4;
}

.tut-empty { color: #7d7d7d; font-size: 13px; }
.tut-grp { color: #7d7d7d; border-bottom: 1px solid #242424; padding-bottom: 3px; margin: 12px 0 8px; font-size: 11px; text-transform: uppercase; letter-spacing: .08em; }
.tut-sheet-body dl { display: grid; grid-template-columns: max-content 1fr; gap: 3px 12px; margin: 0; }
.tut-sheet-body dt { color: #d8b04a; font-family: 'DejaVu Sans Mono', Menlo, Consolas, monospace; font-size: 12.5px; }
.tut-sheet-body dd { color: #9a9a9a; margin: 0; font-size: 12.5px; }

/* Fullscreen Expand Mode */
.tut.tut-fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  z-index: 99999;
  margin: 0;
  background: #0b0b0d;
  display: flex;
  flex-direction: column;
}

.tut.tut-fullscreen .tut-frame {
  border-radius: 0;
  border: none;
  box-shadow: none;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.tut.tut-fullscreen .tut-body {
  flex: 1;
  min-height: 0;
}

.tut.tut-fullscreen .tut-term {
  flex: 1;
  min-height: 0;
}

.tut.tut-fullscreen .tut-log {
  max-height: none;
  flex: 1;
}

.tut.tut-fullscreen .tut-sheet-body {
  max-height: calc(100vh - 120px);
}

.tut-send-btn { background: darkgoldenrod; border: none; color: #fff; font-family: 'Kelt', serif; font-size: 13px; padding: 4px 12px; border-radius: 14px; cursor: pointer; font-weight: bold; }

.tut-sheet-close { display: block; background: none; border: none; color: #9a927f; font-size: 20px; cursor: pointer; padding: 0 4px; }
.tut-sheet-close:hover { color: #f4dd94; }

/* Choice Modal Overlay */
.tut-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(4, 5, 8, 0.85);
  backdrop-filter: blur(4px);
  z-index: 100000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  animation: tutStreamIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.tut-modal-card {
  position: relative;
  width: 100%;
  max-width: 500px;
  background: linear-gradient(180deg, #161410, #0c0d10);
  border: 1px solid rgba(215, 166, 63, 0.5);
  border-radius: 16px;
  padding: 28px 24px 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8), 0 0 20px rgba(215, 166, 63, 0.15);
  color: #ede2cd;
  text-align: center;
}

.tut-modal-close {
  position: absolute;
  top: 12px;
  right: 16px;
  background: none;
  border: none;
  color: #8c826e;
  font-size: 24px;
  line-height: 1;
  cursor: pointer;
  transition: color 0.2s;
}
.tut-modal-close:hover {
  color: #f4dd94;
}

.tut-modal-title {
  font-family: 'Kelt', serif;
  font-size: 24px;
  color: #f4dd94;
  margin: 6px 0 10px;
}

.tut-modal-desc {
  font-size: 14px;
  line-height: 1.5;
  color: #b3a998;
  margin-bottom: 20px;
}

.tut-modal-buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.tut-modal-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 11px 18px;
  border-radius: 30px;
  font-family: 'Kelt', serif;
  font-size: 15px;
  font-weight: bold;
  text-decoration: none !important;
  cursor: pointer;
  transition: transform 0.15s, box-shadow 0.2s, background 0.2s, color 0.2s;
}
.tut-modal-btn:hover {
  transform: translateY(-1px);
}

.tut-btn-primary {
  background: darkgoldenrod;
  color: #ffffff !important;
  border: 1px solid gold;
  box-shadow: 0 4px 15px rgba(184, 134, 11, 0.4);
}
.tut-btn-primary:hover {
  background: #d49b13;
  color: #1a1a1a !important;
}

.tut-btn-secondary {
  background: rgba(184, 134, 11, 0.12);
  color: #f4dd94 !important;
  border: 1px solid rgba(215, 166, 63, 0.4);
}
.tut-btn-secondary:hover {
  background: rgba(184, 134, 11, 0.3);
  color: #ffffff !important;
}

.tut-btn-ghost {
  background: transparent;
  color: #8c826e !important;
  border: 1px solid transparent;
  font-family: inherit;
  font-size: 13px;
  padding: 6px;
}
.tut-btn-ghost:hover {
  color: #c7bc0a !important;
}

.tut-controls { border-top: 1px solid #23262e; padding: 10px 16px; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 10px; background: #0b0b0d; }

.tut-combined-nav { display: inline-flex; align-items: center; gap: 6px; background: #060709; border: 1px solid rgba(215,166,63,.3); padding: 4px 8px; border-radius: 24px; }

.tut-nav-btn { background: rgba(184,134,11,.12); border: 1px solid rgba(215,166,63,.25); color: #f4dd94; width: 28px; height: 28px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 18px; cursor: pointer; transition: background .2s, opacity .2s; line-height: 1; padding: 0; font-family: sans-serif; }
.tut-nav-btn:hover:not(:disabled) { background: rgba(184,134,11,.35); color: #fff; }
.tut-nav-btn:disabled { opacity: 0.25; cursor: not-allowed; }

.tut-ch-badge { color: #9a927f; font-size: 12px; padding: 0 6px; }

.tut-step-pills { display: flex; align-items: center; gap: 4px; padding: 0 6px; }
.tut-step-pill { width: 12px; height: 4px; border-radius: 2px; background: #2a2a2a; transition: background .2s, width .2s; border: none; padding: 0; }
.tut-step-pill-btn { cursor: pointer; }
.tut-step-pill-btn:hover { background: #ffd966; }
.tut-step-pill.done { background: #a9812a; }
.tut-step-pill.active { background: #f4dd94; width: 20px; box-shadow: 0 0 6px rgba(244,221,148,.5); }

@media (max-width: 720px) {
  .tut { margin: 0.5rem 0 1rem; }
  .tut-head { flex-wrap: wrap; gap: 6px 8px; padding: 8px 10px; }
  .tut-title { font-size: 18px; }
  .tut-sub { font-size: 11px; }
  .tut-progress { width: 100%; justify-content: space-between; margin-top: 2px; flex-wrap: wrap; gap: 4px; }
  .tut-ticks { gap: 3px; }
  .tut-tick { width: 8px; height: 8px; }
  .tut-narrative-card { padding: 12px 14px 10px; margin: 4px 0 10px; }
  .tut-h { font-size: 20px; }
  .tut-log { min-height: 55vh; max-height: 70vh; padding: 8px 10px 12px; }
  .tut-prompt { padding: 8px 10px; }
  .tut-controls { padding: 6px 10px; display: flex; flex-wrap: wrap; justify-content: space-between; gap: 6px; }

  .tut-sheet {
    display: none;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    max-height: 60vh;
    z-index: 1000;
    border-top: 2px solid darkgoldenrod;
    border-radius: 16px 16px 0 0;
    box-shadow: 0 -10px 30px rgba(0,0,0,0.8);
    background: #0d0e12;
  }
  .tut-sheet.open { display: flex; }
  .tut-sheet-bar { display: flex; justify-content: space-between; align-items: center; }
  .tut-sheet-backdrop { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.6); z-index: 999; }
}
</style>
