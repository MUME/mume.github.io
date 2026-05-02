import { defineConfig } from 'vitepress'

const base = (process.env.VITE_BASE || '/').replace(/\/+$/, '/')
const normalizedBase = base.startsWith('/') ? base : `/${base}`

export default defineConfig({
  title: "MUME Community",
  description: "Explore the MUME community: official Discord, Elvenrunes, open-source mapping tools like MMapper, and player-developed clients for Multi-Users in Middle-earth.",
  cleanUrls: true,
  base: normalizedBase,
  outDir: '../dist',
  sitemap: {
    hostname: process.env.VITE_HOSTNAME || 'https://docs.mume.org'
  },
  head: [
    ['link', { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  ],
  themeConfig: {
    nav: [
      { text: 'Home', link: 'https://mume.org' },
      {
        text: 'Community',
        items: [
          { text: 'Discord', link: 'https://discord.gg/XkZN55am9a' },
          { text: 'Elvenrunes', link: 'https://elvenrunes.com' },
          { text: 'Open Source', link: '/opensource' },
          { text: 'Links', link: '/links' },
          { text: 'Interviews', link: '/interviews/' },
          { text: 'Wiki', link: 'https://mume.org/wiki/' }
        ]
      }
    ]
  },
  vite: {
    define: {
      __LAST_UPDATED__: JSON.stringify(process.env.VITE_LAST_UPDATED || 'May 2024')
    }
  }
})
