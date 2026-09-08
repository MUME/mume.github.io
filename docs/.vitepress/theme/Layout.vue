<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useData, useRoute, withBase } from 'vitepress'
import CookieConsent from './components/CookieConsent.vue'
import gandalfImg from './gandalf_90.gif'
import gandalfImg2x from './gandalf_90@2x.gif'
import './mume.css'

const { site, page, frontmatter } = useData()
const vpRoute = useRoute()

const isActive = (path, exact = false) => {
  const target = withBase(path)
  const current = vpRoute.path

  if (exact) {
    return current === target || (target === '/' && (current === '/' || current === '/index.html'))
  }

  if (target === '/') return current === '/' || current === '/index.html'

  const normalizedTarget = target.endsWith('/') ? target : target + '/'
  const normalizedCurrent = current.endsWith('/') ? current : current + '/'

  return normalizedCurrent.startsWith(normalizedTarget)
}

const isMenuOpen = ref(false)
const navbarRef = ref(null)
const gandalfRef = ref(null)

const lastUpdated = __LAST_UPDATED__

let prevScrollpos = 0

const handleScroll = () => {
  const currentScrollPos = window.scrollY
  const width = (window.innerWidth > 0) ? window.innerWidth : screen.width
  const navbar = navbarRef.value
  const gandalf = gandalfRef.value

  if (prevScrollpos > currentScrollPos || prevScrollpos < 10 || width <= 650) {
    if (navbar) navbar.style.top = "0"
    if (gandalf) gandalf.style.top = (width <= 650) ? "10px" : "22px"
  } else {
    if (navbar) navbar.style.top = "-70px"
    if (gandalf) gandalf.style.top = "-86px"
  }
  prevScrollpos = currentScrollPos
}

onMounted(() => {
  prevScrollpos = window.scrollY
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div class="theme-container">
    <label class="toggle" for="toggle">
      <i class="fa fa-bars" aria-hidden="true"></i> <span>Menu</span>
    </label>
    <input class="toggle" id="toggle" type="checkbox" v-model="isMenuOpen"/>

    <nav id="navbar" ref="navbarRef" role="navigation" aria-label="Main">
      <ul>
        <li>
          <a href="https://mume.org/" target="_self" rel="external">
            <i class="fa fa-home" aria-hidden="true" title="Home"></i>
            <span class="sr-only">Home</span>
          </a>
        </li>
        <li class="has_children">
          <a :href="withBase('/about/')" :class="{ current: isActive('/about') }">About<span class="caret down"></span></a>
          <ul>
            <li><a :href="withBase('/about/features')" :class="{ current: isActive('/about/features') }">Features</a></li>
            <li><a :href="withBase('/about/history')" :class="{ current: isActive('/about/history') }">History</a></li>
          </ul>
        </li>
        <li>
          <a :href="withBase('/play/')" :class="{ current: isActive('/play') }">Play<img alt="Play" height="16" width="16" style="padding-left:4px; vertical-align:-10%;" :src="withBase('/favicon.ico')"></a>
        </li>
        <li class="has_children">
          <a :href="withBase('/')" :class="{ current: isActive('/', true) || isActive('/community') }">Community<span class="caret down"></span></a>
          <ul>
            <li><a href="https://discord.gg/XkZN55am9a" target="_blank" rel="noopener">Discord <i class="fa fa-external-link" aria-hidden="true"></i></a></li>
            <li><a href="https://elvenrunes.com" target="_blank" rel="noopener">Elvenrunes <i class="fa fa-external-link" aria-hidden="true"></i></a></li>
            <li><a :href="withBase('/opensource')" :class="{ current: isActive('/opensource') }">Open Source</a></li>
            <li><a :href="withBase('/links')" :class="{ current: isActive('/links') }">Links</a></li>
            <li><a :href="withBase('/community/interviews/')" :class="{ current: isActive('/community/interviews') }">Interviews</a></li>
            <li><a href="https://docs.mume.org/wiki/" target="_self" rel="external">Wiki</a></li>
          </ul>
        </li>
        <li class="has_children">
          <a :href="withBase('/news/')" :class="{ current: isActive('/news') }">News<span class="caret down"></span></a>
          <ul>
            <li><a href="https://mume.org/news/war" target="_self" rel="external">War</a></li>
            <li><a href="https://mume.org/news/game/" target="_self" rel="external">Game News</a></li>
            <li><a :href="withBase('/news/web')" :class="{ current: isActive('/news/web', true) }">Web News</a></li>
          </ul>
        </li>
        <li class="has_children">
          <a :href="withBase('/resources/')" :class="{ current: isActive('/resources') }">Resources<span class="caret down"></span></a>
          <ul>
            <li><a :href="withBase('/resources/newcomers')" :class="{ current: isActive('/resources/newcomers') }">Newcomers</a></li>
            <li><a href="https://mume.org/help/" target="_self" rel="external">Help</a></li>
            <li><a href="https://mume.org/rules/" target="_self" rel="external">Rules</a></li>
            <li><a href="https://mume.org/dictionary/" target="_self" rel="external">Dictionary</a></li>
            <li><a :href="withBase('/resources/boards/')" :class="{ current: isActive('/resources/boards') }">Boards</a></li>
            <li><a href="https://mume.org/download/" target="_self" rel="external">Download</a></li>
            <li><a href="https://mume.org/restricted/" target="_self" rel="external">Restricted</a></li>
          </ul>
        </li>
        <li>
          <a href="https://mume.org/search" target="_self" rel="external">
            <i class="fa fa-search" aria-hidden="true" title="Search"></i>
            <span class="sr-only">Search</span>
          </a>
        </li>
      </ul>
    </nav>

    <a :href="withBase('/')">
      <img id="gandalf" ref="gandalfRef" :src="gandalfImg" :srcset="`${gandalfImg} 1x, ${gandalfImg2x} 2x`" alt="Gandalf" width="90" height="90">
    </a>

    <div class="content">
      <div v-if="page.isNotFound" class="not-found">
        <h1>404 - Page Not Found</h1>
        <img alt="Durin's Bane - a Balrog within the Mines of Moria"
             class="center"
             style="width: 160px; max-width: 100%; padding: 50px;"
             src="/assets/images/balrog.png">
        <p class="center">"You cannot pass," he said.</p>
        <p class="center"><a :href="withBase('/')">Return to the Shire (Home)</a></p>
      </div>
      <Content v-else />
    </div>

    <footer role="contentinfo">
      <div class="footer">
        <a rel="alternate" type="application/rss+xml" href="https://mume.org/Import/News/rss.xml"><i class="fa fa-rss-square" aria-hidden="true" title="RSS"></i></a>
        <a href="https://www.facebook.com/MUMEMUD/"><i class="fa fa-facebook-square" aria-hidden="true" title="Facebook"></i></a>
        Do you like MUME? Tell others on
        <a href="https://www.mudconnect.com/cgi-bin/search.cgi?mode=mud_listing&mud=MUME+-+Multi+Users+In+Middle+Earth" target="_blank" rel="noopener">The Mud Connector</a>.
        <br>
        Web site maintained by the Community and the <a href="https://mume.org/about/ainur" target="_self" rel="external">Valar</a> on <a href="https://github.com/mume/mume.github.io">GitHub</a>.
        Last updated {{ lastUpdated }}.
        <br>
        MUME is hosted at <a href="https://www.heig-vd.ch" target="_blank" rel="noopener">HEIG-VD</a> (School of Engineering and Management Vaud, Switzerland).
      </div>
    </footer>

    <!-- Cookie Consent Banner Component -->
    <CookieConsent />
  </div>
</template>
