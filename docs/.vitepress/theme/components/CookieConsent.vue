<template>
  <div v-if="showBanner" class="cookie-consent-banner">
    <div class="cookie-consent-content">
      <p>
        We use cookies and Google Analytics to understand site usage and improve your experience.
      </p>
      <div class="cookie-consent-actions">
        <button class="btn-accept" @click="acceptConsent">Accept</button>
        <button class="btn-decline" @click="declineConsent">Decline</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const showBanner = ref(false)

onMounted(() => {
  const savedConsent = localStorage.getItem('mume_cookie_consent')
  if (!savedConsent) {
    showBanner.value = true
  }
})

function acceptConsent() {
  localStorage.setItem('mume_cookie_consent', 'granted')
  showBanner.value = false
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('consent', 'update', {
      analytics_storage: 'granted'
    })
  }
}

function declineConsent() {
  localStorage.setItem('mume_cookie_consent', 'denied')
  showBanner.value = false
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('consent', 'update', {
      analytics_storage: 'denied'
    })
  }
}
</script>
