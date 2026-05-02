<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useData, useRoute, withBase } from 'vitepress'
import gandalfImg from './gandalf_200.jpg'
import footerGandalf from '../../assets/images/gandalf.jpg'
import footerHorseman from '../../assets/images/horsemannight.jpg'
import './mume.css'

const { site, page, frontmatter } = useData()
const vpRoute = useRoute()

const isMenuOpen = ref(false)
const navbarRef = ref(null)
const gandalfRef = ref(null)

const lastUpdated = __LAST_UPDATED__

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

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
    <label class="toggle" for="toggle" @click="toggleMenu">
      <i class="fa fa-bars" aria-hidden="true"></i> <span>Menu</span>
    </label>
    <input class="toggle" id="toggle" type="checkbox" :checked="isMenuOpen" @change="isMenuOpen = $event.target.checked"/>

    <nav id="navbar" ref="navbarRef" role="navigation" aria-label="Main">
      <ul>
        <li>
          <a href="https://mume.org/">
            <i class="fa fa-home" aria-hidden="true" title="Home"></i>
            <span class="sr-only">Home</span>
          </a>
        </li>
        <li class="has_children">
          <a href="https://mume.org/about/">About<span class="caret down"></span></a>
          <ul>
            <li><a href="https://mume.org/help/features">Features</a></li>
            <li><a href="https://mume.org/about/history">History</a></li>
          </ul>
        </li>
        <li>
          <a href="https://mume.org/play/">Play<img alt="Play" height="16" width="16" style="padding-left:4px; vertical-align:-10%;" :src="withBase('/favicon.ico')"></a>
        </li>
        <li class="has_children">
          <a :href="withBase('/')" :class="{ current: vpRoute.path === '/' || vpRoute.path === '/index.html' || vpRoute.path.startsWith(withBase('/opensource')) || vpRoute.path.startsWith(withBase('/links')) || vpRoute.path.startsWith(withBase('/interviews')) }">Community<span class="caret down"></span></a>
          <ul>
            <li><a href="https://discord.gg/XkZN55am9a" target="_blank" rel="noopener">Discord <i class="fa fa-external-link" aria-hidden="true"></i></a></li>
            <li><a href="https://elvenrunes.com" target="_blank" rel="noopener">Elvenrunes <i class="fa fa-external-link" aria-hidden="true"></i></a></li>
            <li><a :href="withBase('/opensource')" :class="{ current: vpRoute.path.startsWith(withBase('/opensource')) }">Open Source</a></li>
            <li><a :href="withBase('/links')" :class="{ current: vpRoute.path.startsWith(withBase('/links')) }">Links</a></li>
            <li><a :href="withBase('/interviews')" :class="{ current: vpRoute.path.startsWith(withBase('/interviews')) }">Interviews</a></li>
            <li><a href="https://mume.org/wiki/">Wiki</a></li>
          </ul>
        </li>
        <li class="has_children">
          <a href="https://mume.org/news/">News<span class="caret down"></span></a>
          <ul>
            <li><a href="https://mume.org/news/war">War</a></li>
            <li><a href="https://mume.org/news/game/">Game News</a></li>
            <li><a href="https://mume.org/news/web" rel="nofollow">Web News</a></li>
          </ul>
        </li>
        <li class="has_children">
          <a href="https://mume.org/resources/">Resources<span class="caret down"></span></a>
          <ul>
            <li><a href="https://mume.org/resources/newcomers">Newcomers</a></li>
            <li><a href="https://mume.org/help/">Help</a></li>
            <li><a href="https://mume.org/rules/">Rules</a></li>
            <li><a href="https://mume.org/dictionary/">Dictionary</a></li>
            <li><a href="https://mume.org/resources/boards/">Boards</a></li>
            <li><a href="https://mume.org/download/" rel="nofollow">Download</a></li>
            <li><a href="https://mume.org/restricted/" rel="nofollow">Restricted</a></li>
          </ul>
        </li>
        <li>
          <a href="https://mume.org/search" rel="nofollow">
            <i class="fa fa-search" aria-hidden="true" title="Search"></i>
            <span class="sr-only">Search</span>
          </a>
        </li>
      </ul>
    </nav>

    <img id="gandalf" ref="gandalfRef" :src="gandalfImg" alt="Gandalf" width="45" height="45">

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
        <p>
          <a rel="alternate" type="application/rss+xml" href="https://mume.org/Import/News/rss.xml"><i class="fa fa-rss-square" aria-hidden="true" title="RSS"></i></a>
          Do you like MUME? Tell others on
          <a href="https://www.mudconnect.com/cgi-bin/search.cgi?mode=mud_listing&mud=MUME+-+Multi+Users+In+Middle+Earth" target="_blank" rel="noopener">The Mud Connector</a>.
        </p>
        <p>
          <a href="https://www.facebook.com/MUMEMUD/"><i class="fa fa-facebook-square" aria-hidden="true" title="Facebook"></i></a>
          Web site maintained by Manw&euml; and the <a href="https://mume.org/about/ainur">Valar</a>.
          Last updated {{ lastUpdated }}.
        </p>
        <p>
          MUME is hosted at <a href="https://www.heig-vd.ch" target="_blank" rel="noopener">HEIG-VD</a> (School of Engineering and Management Vaud, Switzerland).
        </p>
        <aside>
          MUME&rsquo;s logo is based on John Howe&rsquo;s
          &ldquo;<a :href="footerGandalf">Gandalf</a>&rdquo; and
          &ldquo;<a :href="footerHorseman">Horseman in the Night</a>&rdquo; by
          Renea, Vair&euml;, and Manw&euml;.
        </aside>
      </div>
    </footer>
  </div>
</template>
