---
layout: page
title: Interactive Tutorial
---

<script setup>
import { onMounted } from 'vue'
import { withBase } from 'vitepress'

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.location.replace(withBase('/play/tutorial/1-welcome'))
  }
})
</script>

<div style="text-align: center; padding: 4rem 1rem;">
  <p>Loading interactive tutorial...</p>
</div>
