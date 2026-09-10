import Layout from './Layout.vue'
import MumeSession from './components/MumeSession.vue'
import MumeQuote from './components/MumeQuote.vue'
import TutorialPlayer from './components/TutorialPlayer.vue'
import { nextTick } from 'vue'

export default {
  Layout,
  enhanceApp({ app, router }) {
    app.component('MumeSession', MumeSession)
    app.component('MumeQuote', MumeQuote)
    app.component('TutorialPlayer', TutorialPlayer)

    if (typeof window !== 'undefined') {
      const GA_MEASUREMENT_ID = 'G-LL4RX9KM6Q'

      const savedConsent = localStorage.getItem('mume_cookie_consent')

      window.dataLayer = window.dataLayer || []
      function gtag() { window.dataLayer.push(arguments) }
      window.gtag = gtag

      gtag('js', new Date())

      gtag('consent', 'default', {
        analytics_storage: savedConsent === 'granted' ? 'granted' : 'denied',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied'
      })

      const script = document.createElement('script')
      script.async = true
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
      document.head.appendChild(script)

      gtag('config', GA_MEASUREMENT_ID)

      if (router) {
        router.onAfterRouteChanged = (to) => {
          nextTick(() => {
            gtag('event', 'page_view', {
              page_title: document.title,
              page_location: window.location.href,
              page_path: to,
              send_to: GA_MEASUREMENT_ID
            })
          })
        }
      }
    }
  }
}
