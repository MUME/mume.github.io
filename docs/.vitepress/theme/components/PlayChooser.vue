<script setup>
import { ref, onMounted } from 'vue'
import { withBase } from 'vitepress'

// destination for the "first time" path — the interactive tutorial (external app)
const tutorialUrl = 'https://mume-preview.mume-idea-submission.workers.dev'
const fellowship = withBase('/assets/images/fellowship_bw.jpg')

const expanded = ref(false)
const bgRef = ref(null)

function toggleMore() {
  expanded.value = !expanded.value
  if (expanded.value) {
    setTimeout(() => {
      const md = document.querySelector('.play-chooser .more-details')
      if (md) md.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }, 320)
  }
}
function tilt(e) {
  const card = e.currentTarget
  const r = card.getBoundingClientRect()
  const x = (e.clientX - r.left) / r.width - 0.5
  const y = (e.clientY - r.top) / r.height - 0.5
  card.style.transform = `translateY(-6px) scale(1.015) rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 7).toFixed(2)}deg)`
}
function untilt(e) { e.currentTarget.style.transform = '' }

onMounted(() => {
  const bg = bgRef.value
  if (!bg) return
  for (let i = 0; i < 24; i++) {
    const el = document.createElement('div')
    el.className = 'pc-ember'
    const s = 2 + Math.random() * 3
    el.style.width = el.style.height = s + 'px'
    el.style.left = Math.random() * 100 + '%'
    el.style.setProperty('--dx', (Math.random() * 120 - 60) + 'px')
    el.style.animationDuration = (6 + Math.random() * 7) + 's'
    el.style.animationDelay = (Math.random() * 8) + 's'
    bg.appendChild(el)
  }
})
</script>

<template>
  <div class="play-chooser">
    <div class="pc-bg" ref="bgRef"><img class="fell" :src="fellowship" alt=""></div>

    <div class="enter">
      <h1>Enter MUME</h1>
      <p class="q">Welcome to MUME. <b>Which road is yours?</b></p>

      <div class="choices">
        <div class="choice first" @mousemove="tilt" @mouseleave="untilt">
          <span class="corner"></span>
          <div class="ico">🌱</div>
          <h2>I'm new to the game...</h2>
          <p>Take the guided tour to understand the nuances of MUME &mdash; from character creation, movement and the map to staying alive &mdash; then step into the real thing.</p>
          <a class="go" :href="tutorialUrl">Begin the tutorial</a>
          <p class="note">You can retake this tutorial at any time.</p>
        </div>
        <div class="choice acct" @mousemove="tilt" @mouseleave="untilt">
          <span class="corner"></span>
          <div class="ico">⚔️</div>
          <h2>I have an account</h2>
          <p>If you already have an account, click here to enter and play through our immersive web-based client, complete with map and music!</p>
          <a class="go" href="https://mume.org/play/browser" rel="external">Play now</a>
        </div>
      </div>

      <div class="everyway">
        <button class="more-toggle" :class="{ open: expanded }" :aria-expanded="expanded" @click="toggleMore">Every way to play<span class="car">⌄</span></button>
        <div class="more-details" :class="{ open: expanded }" :style="{ maxHeight: expanded ? '3000px' : '0px' }">
          <div class="inner">
            <div class="ways3">
              <div class="way">
                <div class="badge">A</div>
                <h3>MMapper Web</h3>
                <p>The least-friction way in: a real-time map right in your browser, no install required. Jump straight in, or take the tutorial first.</p>
                <a class="waybtn" href="https://mume.org/play/browser" rel="external">Play in browser</a>
                <p class="fine">Older browser? Try the <a href="https://mume.org/play/browser-legacy">legacy client</a>.</p>
              </div>
              <div class="way">
                <div class="badge">B</div>
                <h3>MMapper Desktop</h3>
                <p>The powerful choice most players use. Installs on your computer and shows your position in Middle-earth on a live map.</p>
                <a class="waybtn" href="https://mume.github.io/MMapper/" target="_blank" rel="noopener">Download MMapper</a>
              </div>
              <div class="way">
                <div class="badge">C</div>
                <h3>MUD client</h3>
                <p>The retro route. Point any MUD client at <b>mume.org</b> port <b>4242</b>, and run MMapper alongside it in a separate window.</p>
                <a class="waybtn" href="https://www.mudlet.org" target="_blank" rel="noopener">Download Mudlet</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- Not scoped: JS-created embers need these rules too. Everything is namespaced under .play-chooser. -->
<style>
.play-chooser { position: relative; padding-top: .5rem; }
.play-chooser .pc-bg { position: absolute; inset: 0; z-index: 0; pointer-events: none; overflow: hidden; }
.play-chooser .pc-bg .fell { position: absolute; left: 50%; top: 34%; transform: translate(-50%, -50%); width: min(1100px, 150vw); opacity: .07; filter: grayscale(1) contrast(1.1); -webkit-mask: radial-gradient(60% 60% at 50% 50%, #000 40%, transparent 78%); mask: radial-gradient(60% 60% at 50% 50%, #000 40%, transparent 78%); }
.play-chooser .pc-ember { position: absolute; bottom: -12px; border-radius: 50%; background: radial-gradient(circle, #ffd98a, #d7a63f 60%, transparent 70%); opacity: 0; animation: pc-rise linear infinite; }
@keyframes pc-rise { 0% { opacity: 0; transform: translateY(0); } 12% { opacity: .75; } 100% { opacity: 0; transform: translateY(-98vh) translateX(var(--dx)); } }
@keyframes pc-up { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: translateY(0); } }

.play-chooser .enter { position: relative; z-index: 1; max-width: 900px; margin: 0 auto; text-align: center; }
.play-chooser h1 { font-family: 'Kelt'; color: #f4dd94; font-size: clamp(40px, 8vw, 78px); margin: 0 0 .12em; text-align: center; text-shadow: 0 4px 30px rgba(215, 166, 63, .25); opacity: 0; animation: pc-up .8s ease .1s forwards; border: 0; }
.play-chooser .q { font-size: clamp(16px, 2.3vw, 20px); color: #cfc9bb; margin: 0 0 28px; opacity: 0; animation: pc-up .8s ease .24s forwards; }
.play-chooser .q b { color: #f4dd94; font-style: italic; }

.play-chooser .choices { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; text-align: center; }
@media (max-width: 680px) { .play-chooser .choices { grid-template-columns: 1fr; } }
.play-chooser .choice { position: relative; padding: 30px 24px 26px; background: linear-gradient(160deg, #15130c, #0b0b0d); border: 1px solid rgba(215, 166, 63, .35); clip-path: polygon(0 0, calc(100% - 22px) 0, 100% 22px, 100% 100%, 22px 100%, 0 calc(100% - 22px)); transform: translateY(24px); opacity: 0; transition: transform .25s cubic-bezier(.2, .8, .2, 1), box-shadow .25s, border-color .25s; animation: pc-up .8s ease forwards; }
.play-chooser .choice:nth-child(1) { animation-delay: .4s; }
.play-chooser .choice:nth-child(2) { animation-delay: .52s; }
.play-chooser .choice::before { content: ""; position: absolute; inset: 0; pointer-events: none; mix-blend-mode: screen; opacity: 0; transition: opacity .3s; background: linear-gradient(115deg, transparent 40%, rgba(255, 240, 200, .14) 50%, transparent 60%); }
.play-chooser .choice:hover { transform: translateY(-6px) scale(1.015); border-color: #d7a63f; box-shadow: 0 24px 60px rgba(0, 0, 0, .6); }
.play-chooser .choice:hover::before { opacity: 1; }
.play-chooser .choice .ico { font-size: 34px; line-height: 1; margin-bottom: 10px; text-align: center; }
.play-chooser .choice h2 { font-family: 'Kelt'; font-size: clamp(24px, 4vw, 32px); margin: .1em 0 .3em; border: 0; padding: 0; text-align: center; }
.play-chooser .choice p { font-size: 14.5px; color: #c4beb0; margin: 0 0 18px; min-height: 44px; }
.play-chooser .choice .go { display: flex; align-items: center; justify-content: center; width: max-content; max-width: 100%; margin: .2em auto 0; gap: 8px; font-family: 'Kelt'; font-size: 22px; padding: .3em 1.2em; border-radius: 40px; background: var(--dg, darkgoldenrod); color: #fff; box-shadow: 0 5px 16px rgba(0, 0, 0, .5); text-decoration: none; transition: gap .2s, transform .2s, box-shadow .2s; }
.play-chooser .choice .go:hover { text-decoration: none; color: #fff; }
.play-chooser .choice:hover .go { gap: 16px; transform: scale(1.06); box-shadow: 0 8px 22px rgba(0, 0, 0, .6); }
.play-chooser .choice .note { font-size: 12px; color: #8f8a7d; margin: 12px 0 0; min-height: 0; text-align: center; }
.play-chooser .choice.first { --dg: #a9812a; }
.play-chooser .choice.first h2 { color: #e6d79a; }
.play-chooser .choice.first .ico { color: #ffd98a; }
.play-chooser .choice.acct { --dg: #9c3a2a; border-color: rgba(196, 80, 58, .4); }
.play-chooser .choice.acct h2 { color: #e8b48f; }
.play-chooser .choice.acct .ico { color: #f0a17f; }
.play-chooser .choice.acct:hover { border-color: #c4503a; }
.play-chooser .corner { position: absolute; top: 0; right: 0; width: 22px; height: 22px; background: linear-gradient(135deg, transparent 49%, rgba(215, 166, 63, .5) 50%); }

.play-chooser .everyway { text-align: center; margin: 34px 0 10px; }
.play-chooser .more-toggle { font-family: 'Merriweather', serif; background: none; border: 1px solid #b8860b; color: #d7a63f; border-radius: 30px; padding: 9px 20px; font-size: 15px; cursor: pointer; transition: background .2s, color .2s; }
.play-chooser .more-toggle:hover { background: rgba(184, 134, 11, .12); color: #f4dd94; }
.play-chooser .more-toggle .car { display: inline-block; transition: transform .25s; margin-left: 6px; }
.play-chooser .more-toggle.open .car { transform: rotate(180deg); }
.play-chooser .more-details { max-height: 0; overflow: hidden; transition: max-height .5s ease; text-align: left; }
.play-chooser .more-details .inner { padding-top: 18px; }
.play-chooser .ways3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; text-align: center; }
@media (max-width: 720px) { .play-chooser .ways3 { grid-template-columns: 1fr; } }
.play-chooser .way { background: linear-gradient(160deg, #12141a, #0b0c10); border: 1px solid #23262e; border-radius: 12px; padding: 24px 18px; display: flex; flex-direction: column; align-items: center; transition: border-color .2s, transform .2s; }
.play-chooser .way:hover { border-color: rgba(215, 166, 63, .5); transform: translateY(-3px); }
.play-chooser .way .badge { width: 36px; height: 36px; border-radius: 50%; border: 1px solid #b8860b; color: #d7a63f; font-family: 'Kelt'; font-size: 22px; display: flex; align-items: center; justify-content: center; margin-bottom: 12px; }
.play-chooser .way h3 { font-family: 'Kelt'; color: #d9b45a; font-size: 23px; margin: .1em 0 .5em; border: 0; padding: 0; }
.play-chooser .way p { font-size: 14px; color: #bdb8aa; margin: 0 0 18px; line-height: 1.55; }
.play-chooser .way p:not(.fine) { flex: 1; }
.play-chooser .way .waybtn { display: inline-block; font-family: 'Kelt'; font-size: 19px; background: darkgoldenrod; color: #fff; padding: .4em 1.25em; border-radius: 30px; box-shadow: 0 4px 12px rgba(0, 0, 0, .5); text-decoration: none; transition: transform .2s, box-shadow .2s; white-space: normal; }
.play-chooser .way .waybtn:hover { color: #fff; text-decoration: none; transform: scale(1.05); box-shadow: 0 7px 18px rgba(0, 0, 0, .6); }
.play-chooser .way .fine { font-size: 12px; color: #8f8a7d; margin: 12px 0 0; }
.play-chooser .way .fine a { color: #c79a3a; }
</style>
