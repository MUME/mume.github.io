<script setup>
import { withBase } from 'vitepress'

defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  },
  body: {
    type: String,
    default: ''
  },
  actionText: {
    type: String,
    required: true
  },
  actionHref: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: 'fa-compass'
  },
  variant: {
    type: String,
    default: 'gold' // 'gold' | 'blue'
  }
})
</script>

<template>
  <aside class="mume-callout" :class="`variant-${variant}`">
    <div class="callout-icon-box" v-if="icon">
      <i :class="['fa', icon]" aria-hidden="true"></i>
    </div>
    <div class="callout-content">
      <div v-if="subtitle" class="callout-subtitle">{{ subtitle }}</div>
      <h3 class="callout-title">{{ title }}</h3>
      <p v-if="body" class="callout-body">{{ body }}</p>
      <slot></slot>
    </div>
    <div class="callout-action">
      <a :href="actionHref.startsWith('http') ? actionHref : withBase(actionHref)" class="callout-btn">
        {{ actionText }}
        <i class="fa fa-chevron-right" aria-hidden="true"></i>
      </a>
    </div>
  </aside>
</template>

<style scoped>
.mume-callout {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  background: linear-gradient(135deg, #0b0d14 0%, #111420 100%);
  border: 1px solid rgba(215, 166, 63, 0.35);
  border-radius: 10px;
  padding: 1.25rem 1.5rem;
  margin: 1.5rem 0;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.35);
  box-sizing: border-box;
  max-width: 100%;
}

.variant-blue {
  border-color: rgba(116, 169, 190, 0.35);
}

@media (max-width: 650px) {
  .mume-callout {
    flex-direction: column;
    align-items: stretch;
    padding: 1rem 1.25rem;
  }
  .callout-action {
    width: 100%;
    margin-top: 0.75rem;
  }
  .callout-btn {
    width: 100%;
    justify-content: center;
    white-space: normal;
    text-align: center;
    padding: 0.5em 1em;
    font-size: 1rem;
  }
}

.callout-icon-box {
  font-size: 2.2rem;
  color: darkgoldenrod;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.variant-blue .callout-icon-box {
  color: #74a9be;
}

.callout-content {
  flex: 1;
  min-width: 0;
}

.callout-subtitle {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: goldenrod;
  margin-bottom: 0.25rem;
}

.variant-blue .callout-subtitle {
  color: #74a9be;
}

.callout-title {
  font-family: 'Kelt', serif;
  font-size: 1.3rem;
  color: #f4dd94;
  margin: 0 0 0.25rem 0;
  line-height: 1.25;
  word-break: break-word;
}

.callout-body {
  font-size: 0.9rem;
  color: #c4c8d0;
  margin: 0;
  line-height: 1.45;
  word-break: break-word;
}

.callout-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: darkgoldenrod;
  color: white !important;
  font-family: 'Kelt', serif;
  font-size: 1.1rem;
  padding: 0.5em 1.5em;
  border-radius: 3.75rem;
  text-decoration: none !important;
  white-space: nowrap;
  box-shadow: 1px 5px 10px 0px rgba(184, 134, 11, 0.5);
  transition: color 0.2s ease;
  min-height: 44px;
  box-sizing: border-box;
  max-width: 100%;
}

.variant-blue .callout-btn {
  background-color: darkgoldenrod;
  color: white !important;
}

.callout-btn:hover, .callout-btn:focus-visible {
  color: #3a3a3a !important;
  text-decoration: none !important;
}

.variant-blue .callout-btn:hover, .variant-blue .callout-btn:focus-visible {
  color: #3a3a3a !important;
  text-decoration: none !important;
}

.callout-btn:focus-visible {
  outline: 2px solid #ffffff;
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  .callout-btn {
    transition: none !important;
    transform: none !important;
  }
}
</style>
