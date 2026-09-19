<script setup>
import { withBase } from 'vitepress'

defineProps({
  title: {
    type: String,
    default: 'Welcome to MUME'
  },
  newTitle: {
    type: String,
    default: "I'm New to MUME"
  },
  newDesc: {
    type: String,
    default: 'Learn basic commands, movement, and survival tips with our interactive walkthrough.'
  },
  newActionText: {
    type: String,
    default: 'Start Interactive Tutorial'
  },
  newHref: {
    type: String,
    default: '/play/tutorial/'
  },
  expTitle: {
    type: String,
    default: "I'm an Experienced Player"
  },
  expDesc: {
    type: String,
    default: 'Jump straight into Middle-earth using MMapper Web, MMapper Desktop, or Mudlet.'
  },
  expActionText: {
    type: String,
    default: 'Choose Client & Play'
  },
  expHref: {
    type: String,
    default: '#browser'
  }
})

function resolveHref(url) {
  if (!url || url.startsWith('#') || url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }
  return withBase(url)
}

function handleExpClick(e, href) {
  if (href.startsWith('#')) {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }
}
</script>

<template>
  <div class="mume-choice-container" role="region" aria-label="Choose your player journey">
    <div class="mume-choice-card new-player">
      <div class="choice-badge">Recommended for Newcomers</div>
      <h3 class="choice-title">{{ newTitle }}</h3>
      <p class="choice-desc">{{ newDesc }}</p>
      <a :href="resolveHref(newHref)" class="choice-btn primary-btn">
        {{ newActionText }}
        <i class="fa fa-arrow-right" aria-hidden="true"></i>
      </a>
    </div>

    <div class="mume-choice-card experienced-player">
      <div class="choice-badge exp-badge">Veterans & Returning</div>
      <h3 class="choice-title">{{ expTitle }}</h3>
      <p class="choice-desc">{{ expDesc }}</p>
      <a :href="resolveHref(expHref)" class="choice-btn secondary-btn" @click="e => handleExpClick(e, expHref)">
        {{ expActionText }}
        <i class="fa fa-arrow-down" aria-hidden="true"></i>
      </a>
    </div>
  </div>
</template>

<style scoped>
.mume-choice-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin: 1.5rem 0 2.5rem;
}

@media (max-width: 720px) {
  .mume-choice-container {
    grid-template-columns: 1fr;
  }
}

.mume-choice-card {
  background: #0a0d15;
  border: 1px solid rgba(215, 166, 63, 0.35);
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  position: relative;
}

.mume-choice-card:hover, .mume-choice-card:focus-within {
  transform: translateY(-4px);
  border-color: darkgoldenrod;
  box-shadow: 0 12px 32px rgba(184, 134, 11, 0.25);
}

.choice-badge {
  display: inline-block;
  align-self: flex-start;
  font-size: 0.75rem;
  font-family: 'Kelt', serif;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  background: rgba(184, 134, 11, 0.15);
  color: #f4dd94;
  border: 1px solid rgba(212, 160, 23, 0.4);
  padding: 0.25rem 0.6rem;
  border-radius: 20px;
  margin-bottom: 0.75rem;
}

.choice-badge.exp-badge {
  background: rgba(116, 169, 190, 0.15);
  color: #74a9be;
  border-color: rgba(116, 169, 190, 0.4);
}

.choice-title {
  font-family: 'Kelt', serif;
  font-size: 1.4rem;
  color: #f4dd94;
  margin: 0 0 0.5rem 0;
  line-height: 1.3;
}

.choice-desc {
  font-size: 0.925rem;
  color: #d1d5db;
  line-height: 1.5;
  margin: 0 0 1.25rem 0;
  flex-grow: 1;
}

.choice-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: 'Kelt', serif;
  font-size: 1.15rem;
  padding: 0.5em 1.5em;
  border-radius: 3.75rem;
  text-decoration: none !important;
  font-weight: normal;
  transition: background-color 0.2s ease, color 0.2s ease;
  cursor: pointer;
  min-height: 44px;
  box-shadow: 1px 5px 10px 0px rgba(184, 134, 11, 0.5);
  color: white !important;
  box-sizing: border-box;
  max-width: 100%;
  text-align: center;
}

@media (max-width: 480px) {
  .choice-btn {
    font-size: 1rem;
    padding: 0.5em 1em;
    white-space: normal;
  }
}

.primary-btn {
  background-color: darkgoldenrod;
  border: none;
}

.primary-btn:hover, .primary-btn:focus-visible {
  background-color: darkgoldenrod;
  color: #3a3a3a !important;
  text-decoration: none !important;
}

.secondary-btn {
  background-color: rgba(10, 13, 21, 0.75);
  border: 2px solid darkgoldenrod;
  color: white !important;
}

.secondary-btn:hover, .secondary-btn:focus-visible {
  background-color: darkgoldenrod;
  color: #3a3a3a !important;
  text-decoration: none !important;
}

.choice-btn:focus-visible {
  outline: 2px solid #ffffff;
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  .mume-choice-card, .choice-btn {
    transition: none !important;
    transform: none !important;
  }
}
</style>
