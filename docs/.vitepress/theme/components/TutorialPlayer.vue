<script setup>
/*
  Interactive new-player tutorial, as a VitePress component.
  Content lives in ../data/tutorialContent.js; assets are imported from the
  shared docs/assets/images so nothing is duplicated. No backend: the whole
  walkthrough runs client-side and ends by handing over to the web client.
*/
import { ref, computed, nextTick, onMounted } from 'vue'
import { TUTORIAL } from '../data/tutorialContent.js'
import logoImg from '../../../assets/images/mume_logo.jpg'
import mapImg from '../../../assets/images/tutorial-map.png'
import descImg from '../../../assets/images/tutorial-desc.png'

// Where the tutorial hands over: the MMapper web client.
const PLAY_URL = 'https://mume.org/play/browser'
const MAP_SECTION = 'Playing the game'

const BANNER =
`                    ***  MUME IX  ***

                  In progress at FIRE
               (Free Internet Roleplay Experiences)
               Hosted at HEIG-VD (www.heig-vd.ch)

        Adapted from J.R.R. Tolkien's Middle-earth world and
                maintained by CryHavoc, Manwe, and Nada.

If you have never played MUME before, type NEW to create a new character,
or ? for help.

By what name do you wish to be known?
Account password:
Available commands:

  create        - Create a new character
  play <name>   - Play the character <name>
  help          - Display help about these commands
  menu          - Display this menu
  quit          - Leave the account menu; logs you out

Account>`

const lessons = TUTORIAL.lessons
const total = lessons.length

const idx = ref(0)
const log = ref([])
const learned = ref([])
const finished = ref(false)
const awaitingExample = ref(false)
const entry = ref('')

const logEl = ref(null)
const inputEl = ref(null)

const stepLabel = computed(() => `${Math.min(idx.value + 1, total)} of ${total}`)

// Commands grouped by the section they were taught in, for the side sheet.
const sheetGroups = computed(() => {
  const groups = []
  for (const c of learned.value) {
    let g = groups.find(x => x.section === c.section)
    if (!g) { g = { section: c.section, items: [] }; groups.push(g) }
    g.items.push(c)
  }
  return groups
})

function scrollLog() {
  nextTick(() => { const el = logEl.value; if (el) el.scrollTop = el.scrollHeight })
}

function learn(L) {
  for (const t of (L.teach || [])) {
    if (!learned.value.some(x => x.c === t.c && x.section === L.section))
      learned.value.push({ c: t.c, d: t.d, section: L.section })
  }
}

function showLesson() {
  const L = lessons[idx.value]
  if (!L) { showEnd(); return }
  log.value.push({
    kind: 'lesson',
    section: L.section,
    title: L.title,
    body: L.body || [],
    teach: L.teach || [],
    ask: L.practice ? { cmd: L.practice.ask } : null,
    map: L.section === MAP_SECTION
  })
  learn(L)
  scrollLog()
}

function showEnd() {
  finished.value = true
  log.value.push({ kind: 'end' })
  scrollLog()
}

function handover() {
  log.value.push({ kind: 'handover' })
  scrollLog()
}

function dumpSheet() {
  if (!learned.value.length) {
    log.value.push({ kind: 'error', text: 'You have not been shown any commands yet.' })
  } else {
    log.value.push({ kind: 'sheetdump', groups: sheetGroups.value.map(g => ({ ...g })) })
  }
  scrollLog()
}

function submit() {
  const raw = entry.value.trim()
  const cmd = raw.toLowerCase()
  entry.value = ''
  if (raw) { log.value.push({ kind: 'echo', text: raw }); }

  if (cmd === 'commands') { dumpSheet(); return }
  if (cmd === 'skip') { skip(); return }
  if (cmd === 'tutorial') { restart(); return }

  if (finished.value) { handover(); return }

  // After an example response, any Enter carries on to the next lesson.
  if (awaitingExample.value) { awaitingExample.value = false; idx.value++; showLesson(); return }

  const L = lessons[idx.value]
  const p = L && L.practice

  if (!p) { idx.value++; showLesson(); return }
  if (!cmd) { log.value.push({ kind: 'error', text: p.hint || ('Type: ' + p.ask) }); scrollLog(); return }

  const ok = (p.accept || [p.ask]).some(a => a.toLowerCase() === cmd)
  if (ok) {
    if (L.example) {
      const body = L.example.replace(/^>[^\n]*\n?/, '')
      log.value.push({ kind: 'example', body })
      awaitingExample.value = true
      scrollLog()
    } else {
      idx.value++
      showLesson()
    }
  } else {
    log.value.push({ kind: 'error', text: 'MUME does not know that one here. ' + (p.hint || ('Try: ' + p.ask)) })
    scrollLog()
  }
}

function skip() {
  lessons.forEach(learn)
  idx.value = total
  showEnd()
}

function restart() {
  idx.value = 0
  learned.value = []
  finished.value = false
  awaitingExample.value = false
  log.value = [{ kind: 'banner', text: BANNER }]
  showLesson()
  focusInput()
}

function focusInput() {
  nextTick(() => { const el = inputEl.value; if (el) el.focus() })
}

onMounted(() => {
  log.value = [{ kind: 'banner', text: BANNER }]
  showLesson()
})
</script>

<template>
  <div class="tut">
    <div class="tut-frame">
      <div class="tut-head">
        <img class="tut-logo" :src="logoImg" alt="MUME" />
        <div class="tut-heading">
          <span class="tut-title">New player tutorial</span>
          <span class="tut-sub">Your first hour in Middle-earth</span>
        </div>
        <div class="tut-progress" v-if="!finished">
          <span class="tut-ticks">
            <span v-for="i in total" :key="i"
                  class="tut-tick"
                  :class="{ done: i - 1 < idx, now: i - 1 === idx }"></span>
          </span>
          <span class="tut-step">{{ stepLabel }}</span>
        </div>
      </div>

      <div class="tut-body">
        <div class="tut-term">
          <div class="tut-log" ref="logEl">
            <div v-for="(b, i) in log" :key="i" class="tut-block">
              <pre v-if="b.kind === 'banner'" class="tut-banner">{{ b.text }}</pre>

              <template v-else-if="b.kind === 'lesson'">
                <hr class="tut-rule" />
                <div class="tut-eyebrow">{{ b.section }}</div>
                <h3 class="tut-h">{{ b.title }}</h3>
                <p v-for="(line, j) in b.body" :key="j" class="tut-line">{{ line }}</p>

                <dl v-if="b.teach.length" class="tut-teach">
                  <template v-for="(t, k) in b.teach" :key="k">
                    <dt>{{ t.c }}</dt><dd>{{ t.d }}</dd>
                  </template>
                </dl>

                <div v-if="b.map" class="tut-panels">
                  <figure><img :src="mapImg" alt="Live map of Middle-earth" /><figcaption>The map</figcaption></figure>
                  <figure><img :src="descImg" alt="Room description and view" /><figcaption>The description</figcaption></figure>
                </div>

                <p class="tut-ask" v-if="b.ask">Type <span class="tut-cmd">{{ b.ask.cmd }}</span> to carry on.</p>
                <p class="tut-ask" v-else>Press Enter to carry on.</p>
              </template>

              <p v-else-if="b.kind === 'echo'" class="tut-echo">&gt; {{ b.text }}</p>

              <template v-else-if="b.kind === 'example'">
                <p class="tut-exlead">Here's an example of what you'll see:</p>
                <pre class="tut-example">{{ b.body }}</pre>
                <p class="tut-ask">Press Enter to carry on.</p>
              </template>

              <p v-else-if="b.kind === 'error'" class="tut-err">{{ b.text }}</p>

              <div v-else-if="b.kind === 'sheetdump'" class="tut-dump">
                <template v-for="(g, gi) in b.groups" :key="gi">
                  <div class="tut-grp">{{ g.section }}</div>
                  <dl><template v-for="(c, ci) in g.items" :key="ci"><dt>{{ c.c }}</dt><dd>{{ c.d }}</dd></template></dl>
                </template>
              </div>

              <template v-else-if="b.kind === 'end'">
                <hr class="tut-rule" />
                <div class="tut-eyebrow">Ready</div>
                <h3 class="tut-h">Create your character</h3>
                <p class="tut-line">That is everything you need for your first hour.</p>
                <p class="tut-line">Your command sheet stays with you. Type <span class="tut-cmd">commands</span> for it, or <span class="tut-cmd">tutorial</span> to run this again while you are still new.</p>
                <a class="tut-enter" :href="PLAY_URL" rel="external">Enter MUME</a>
                <p class="tut-note">Opens the web client. You can retake this tutorial at any time.</p>
              </template>

              <template v-else-if="b.kind === 'handover'">
                <hr class="tut-rule" />
                <h3 class="tut-h">Off you go</h3>
                <p class="tut-line">The <a :href="PLAY_URL" rel="external">web client</a> is where you drop into the account prompt and begin. Good luck out there.</p>
              </template>
            </div>
          </div>

          <div class="tut-prompt">
            <span class="tut-caret">&gt;</span>
            <input ref="inputEl" v-model="entry" @keydown.enter.prevent="submit"
                   autocomplete="off" spellcheck="false"
                   :placeholder="finished ? 'type tutorial to replay' : 'type here, then press Enter'"
                   aria-label="Type a command" />
          </div>
        </div>

        <aside class="tut-sheet">
          <div class="tut-sheet-bar">Command sheet</div>
          <div class="tut-sheet-body">
            <p v-if="!learned.length" class="tut-empty">Commands appear here as you learn them.</p>
            <template v-else>
              <template v-for="(g, gi) in sheetGroups" :key="gi">
                <div class="tut-grp">{{ g.section }}</div>
                <dl><template v-for="(c, ci) in g.items" :key="ci"><dt>{{ c.c }}</dt><dd>{{ c.d }}</dd></template></dl>
              </template>
            </template>
          </div>
        </aside>
      </div>

      <div class="tut-controls">
        <button v-if="!finished" class="tut-ghost" @click="skip">Skip to the end</button>
        <button v-else class="tut-ghost" @click="restart">Run the tutorial again</button>
      </div>
    </div>
  </div>
</template>

<style>
.tut { margin: 1.5rem 0 2rem; }
.tut-frame { border: 1px solid rgba(215,166,63,.35); border-radius: 12px; background: #0b0b0d; overflow: hidden; box-shadow: 0 18px 50px rgba(0,0,0,.45); }

.tut-head { display: flex; align-items: center; gap: 14px; padding: 12px 16px; border-bottom: 1px solid rgba(215,166,63,.25); background: linear-gradient(180deg,#15130c,#0b0b0d); }
.tut-logo { width: 40px; height: 40px; border-radius: 50%; object-fit: cover; flex: none; }
.tut-heading { display: flex; flex-direction: column; line-height: 1.15; margin-right: auto; }
.tut-title { font-family: 'Kelt', serif; color: #f4dd94; font-size: 22px; }
.tut-sub { color: #9a927f; font-size: 12.5px; }
.tut-progress { display: flex; align-items: center; gap: 10px; }
.tut-ticks { display: inline-flex; gap: 4px; }
.tut-tick { width: 8px; height: 8px; border-radius: 50%; background: #2a2a2a; transition: background .3s; }
.tut-tick.done { background: #a9812a; }
.tut-tick.now { background: #f4dd94; box-shadow: 0 0 8px rgba(244,221,148,.6); }
.tut-step { color: #9a927f; font-size: 12.5px; white-space: nowrap; }

.tut-body { display: grid; grid-template-columns: 1fr 260px; gap: 0; }
@media (max-width: 720px) { .tut-body { grid-template-columns: 1fr; } }

.tut-term { display: flex; flex-direction: column; min-width: 0; }
.tut-log { height: 460px; overflow-y: auto; padding: 6px 18px 14px; scroll-behavior: smooth; }
.tut-block { }
.tut-banner { font-family: 'DejaVu Sans Mono', Menlo, Consolas, monospace; font-size: 12px; color: #8f8f8f; white-space: pre-wrap; margin: 8px 0 4px; }
.tut-rule { border: 0; border-top: 1px solid #23262e; margin: 20px 0 14px; }
.tut-eyebrow { text-transform: uppercase; letter-spacing: .14em; font-size: 11px; color: #b8860b; margin-bottom: 4px; }
.tut-h { font-family: 'Kelt', serif; color: #e6d79a; font-size: 26px; margin: 0 0 .4em; border: 0; padding: 0; }
.tut-line { color: #cdc7b8; font-size: 15px; line-height: 1.6; margin: 0 0 12px; }
.tut-teach { display: grid; grid-template-columns: max-content 1fr; gap: 4px 16px; margin: 4px 0 14px; padding: 12px 14px; background: #101216; border: 1px solid #23262e; border-radius: 8px; }
.tut-teach dt { color: #d8b04a; font-family: 'DejaVu Sans Mono', Menlo, Consolas, monospace; font-size: 13px; }
.tut-teach dd { color: #9a9a9a; margin: 0; font-size: 13.5px; }
.tut-panels { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin: 6px 0 16px; }
@media (max-width: 520px) { .tut-panels { grid-template-columns: 1fr; } }
.tut-panels figure { margin: 0; }
.tut-panels img { width: 100%; border: 1px solid #23262e; border-radius: 8px; display: block; }
.tut-panels figcaption { color: #8f8a7d; font-size: 12px; margin-top: 6px; text-align: center; }
.tut-ask { color: #7fb0c8; font-size: 14px; margin: 4px 0 2px; }
.tut-cmd { font-family: 'DejaVu Sans Mono', Menlo, Consolas, monospace; color: #f4dd94; background: rgba(184,134,11,.12); padding: 1px 6px; border-radius: 4px; }
.tut-echo { font-family: 'DejaVu Sans Mono', Menlo, Consolas, monospace; color: #cfcfcf; margin: 10px 0 2px; }
.tut-exlead { color: #9a927f; font-size: 13px; margin: 8px 0 4px; }
.tut-example { font-family: 'DejaVu Sans Mono', Menlo, Consolas, monospace; font-size: 12.5px; color: #b9d3c2; white-space: pre-wrap; background: #06120c; border: 1px solid #17301f; border-radius: 8px; padding: 12px 14px; margin: 0 0 8px; }
.tut-err { color: #d98a7f; font-size: 14px; margin: 8px 0; }
.tut-dump { margin: 8px 0; }

.tut-enter { display: inline-block; font-family: 'Kelt', serif; font-size: 22px; background: darkgoldenrod; color: #fff; padding: .35em 1.4em; border-radius: 40px; box-shadow: 0 6px 18px rgba(0,0,0,.5); text-decoration: none; margin: 6px 0 8px; transition: transform .2s, box-shadow .2s; }
.tut-enter:hover { color: #fff; text-decoration: none; transform: scale(1.04); box-shadow: 0 9px 24px rgba(0,0,0,.6); }
.tut-note { color: #8f8a7d; font-size: 12.5px; margin: 4px 0 6px; }

.tut-prompt { display: flex; align-items: center; gap: 8px; border-top: 1px solid #23262e; padding: 12px 18px; background: #08080a; }
.tut-caret { color: #d8b04a; font-family: 'DejaVu Sans Mono', Menlo, Consolas, monospace; }
.tut-prompt input { flex: 1; background: transparent; border: none; outline: none; color: #eaeaea; font-family: 'DejaVu Sans Mono', Menlo, Consolas, monospace; font-size: 14px; }
.tut-prompt input::placeholder { color: #5f5f5f; }

.tut-sheet { border-left: 1px solid #23262e; background: #08090c; display: flex; flex-direction: column; }
@media (max-width: 720px) { .tut-sheet { border-left: 0; border-top: 1px solid #23262e; } }
.tut-sheet-bar { color: #d8b04a; font-family: 'Kelt', serif; font-size: 18px; padding: 12px 14px 8px; border-bottom: 1px solid #1c1e24; }
.tut-sheet-body { padding: 10px 14px 14px; overflow-y: auto; max-height: 472px; }
.tut-empty { color: #7d7d7d; font-size: 13px; }
.tut-grp { color: #7d7d7d; border-bottom: 1px solid #242424; padding-bottom: 3px; margin: 12px 0 8px; font-size: 11.5px; text-transform: uppercase; letter-spacing: .08em; }
.tut-sheet-body dl, .tut-dump dl { display: grid; grid-template-columns: max-content 1fr; gap: 3px 12px; margin: 0; }
.tut-sheet-body dt, .tut-dump dt { color: #d8b04a; font-family: 'DejaVu Sans Mono', Menlo, Consolas, monospace; font-size: 12.5px; }
.tut-sheet-body dd, .tut-dump dd { color: #9a9a9a; margin: 0; font-size: 12.5px; }

.tut-controls { border-top: 1px solid #23262e; padding: 10px 16px; text-align: right; background: #0b0b0d; }
.tut-ghost { background: none; border: 1px solid #b8860b; color: #d7a63f; border-radius: 30px; padding: 7px 16px; font-size: 13px; cursor: pointer; font-family: 'Merriweather', serif; transition: background .2s, color .2s; }
.tut-ghost:hover { background: rgba(184,134,11,.12); color: #f4dd94; }
</style>
