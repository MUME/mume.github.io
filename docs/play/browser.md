---
title: Free browser game | Multi-Users in Middle-earth
description: MUME is a browser roleplaying game based upon J.R.R. Tolkien's Middle-earth. Explore a text-based MMORPG for free.
---

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  if (typeof window !== 'undefined') {
    if (screen.width <= 700) {
      window.location.href = 'https://docs.mume.org/play-mume/'
    } else {
      window.location.href = 'https://docs.mume.org/MMapper/demo'
    }
  }
})
</script>

<div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: calc(100vh - 140px);">
    <p>If you are not redirected automatically, please follow this <a href="https://docs.mume.org/MMapper/demo/">link</a>.</p>
</div>
